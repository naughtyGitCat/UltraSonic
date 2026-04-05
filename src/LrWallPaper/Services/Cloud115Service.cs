using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using LrWallPaper.Models;

namespace LrWallPaper.Services;

public class Cloud115FileInfo
{
    public string FileId { get; set; } = "";
    public string FileName { get; set; } = "";
    public long FileSize { get; set; }
    public string PickCode { get; set; } = "";
    public string Sha1 { get; set; } = "";
    public string Cid { get; set; } = ""; // Parent directory ID
}

public class Cloud115Service
{
    private readonly ILogger<Cloud115Service> _logger;
    private readonly HttpClient _http;
    private string _cookie = "";

    private const string UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
    private const string ApiBase = "https://webapi.115.com";
    private const string UploadBase = "https://uplb.115.com/4.0";

    public Cloud115Service(ILogger<Cloud115Service> logger)
    {
        _logger = logger;
        var handler = new HttpClientHandler
        {
            UseProxy = false,
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate,
            UseCookies = false
        };
        _http = new HttpClient(handler) { Timeout = TimeSpan.FromSeconds(120) };
        _http.DefaultRequestHeaders.Add("User-Agent", UserAgent);
    }

    public void SetCookie(string cookie)
    {
        _cookie = cookie;
    }

    /// <summary>
    /// Test connection by getting user info
    /// </summary>
    public async Task<(bool ok, string message)> TestConnectionAsync()
    {
        if (string.IsNullOrEmpty(_cookie)) return (false, "Cookie not configured");
        try
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"{ApiBase}/files?aid=1&cid=0&limit=1&show_dir=1");
            request.Headers.Add("Cookie", _cookie);
            var resp = await _http.SendAsync(request);
            var json = await resp.Content.ReadAsStringAsync();
            var doc = JsonNode.Parse(json);
            var state = doc?["state"]?.GetValue<bool>() ?? false;
            if (state)
            {
                var count = doc?["count"]?.GetValue<int>() ?? 0;
                return (true, $"Connected. Root has {count} items.");
            }
            var errMsg = doc?["error"]?.GetValue<string>() ?? "Unknown error";
            return (false, errMsg);
        }
        catch (Exception ex) { return (false, ex.Message); }
    }

    /// <summary>
    /// List files in a directory
    /// </summary>
    public async Task<List<Cloud115FileInfo>> ListFilesAsync(string cid = "0", int limit = 100)
    {
        var request = new HttpRequestMessage(HttpMethod.Get,
            $"{ApiBase}/files?aid=1&cid={cid}&limit={limit}&show_dir=1&o=user_ptime&asc=0");
        request.Headers.Add("Cookie", _cookie);

        var resp = await _http.SendAsync(request);
        var json = await resp.Content.ReadAsStringAsync();
        var doc = JsonNode.Parse(json);

        var result = new List<Cloud115FileInfo>();
        var data = doc?["data"]?.AsArray();
        if (data == null) return result;

        foreach (var item in data)
        {
            result.Add(new Cloud115FileInfo
            {
                FileId = item?["fid"]?.GetValue<string>() ?? item?["cid"]?.GetValue<string>() ?? "",
                FileName = item?["n"]?.GetValue<string>() ?? "",
                FileSize = item?["s"]?.GetValue<long>() ?? 0,
                PickCode = item?["pc"]?.GetValue<string>() ?? "",
                Sha1 = item?["sha"]?.GetValue<string>() ?? "",
                Cid = cid
            });
        }
        return result;
    }

    /// <summary>
    /// Create a directory, returns CID
    /// </summary>
    public async Task<string?> CreateDirectoryAsync(string name, string parentCid = "0")
    {
        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["pid"] = parentCid,
            ["cname"] = name
        });

        var request = new HttpRequestMessage(HttpMethod.Post, $"{ApiBase}/files/add");
        request.Headers.Add("Cookie", _cookie);
        request.Content = content;

        var resp = await _http.SendAsync(request);
        var json = await resp.Content.ReadAsStringAsync();
        var doc = JsonNode.Parse(json);
        var state = doc?["state"]?.GetValue<bool>() ?? false;
        if (!state)
        {
            _logger.LogWarning("Failed to create directory {Name}: {Json}", name, json);
            // Directory might already exist, try to find it
            return await FindDirectoryAsync(name, parentCid);
        }
        return doc?["cid"]?.GetValue<string>();
    }

    /// <summary>
    /// Find a directory by name in parent
    /// </summary>
    public async Task<string?> FindDirectoryAsync(string name, string parentCid = "0")
    {
        var request = new HttpRequestMessage(HttpMethod.Get,
            $"{ApiBase}/files?aid=1&cid={parentCid}&limit=1000&show_dir=1&type=0");
        request.Headers.Add("Cookie", _cookie);

        var resp = await _http.SendAsync(request);
        var json = await resp.Content.ReadAsStringAsync();
        var doc = JsonNode.Parse(json);
        var data = doc?["data"]?.AsArray();
        if (data == null) return null;

        foreach (var item in data)
        {
            var n = item?["n"]?.GetValue<string>();
            if (n == name)
                return item?["cid"]?.GetValue<string>();
        }
        return null;
    }

    /// <summary>
    /// Ensure a directory path exists (e.g., "/UltraSonic/2024/01")
    /// Returns the CID of the deepest directory
    /// </summary>
    public async Task<string> EnsureDirectoryPathAsync(string path)
    {
        var parts = path.Trim('/').Split('/', StringSplitOptions.RemoveEmptyEntries);
        var currentCid = "0";
        foreach (var part in parts)
        {
            var found = await FindDirectoryAsync(part, currentCid);
            if (found != null)
            {
                currentCid = found;
            }
            else
            {
                var created = await CreateDirectoryAsync(part, currentCid);
                currentCid = created ?? throw new Exception($"Failed to create directory: {part}");
            }
        }
        return currentCid;
    }

    /// <summary>
    /// Upload a file using SHA1 rapid upload (秒传)
    /// If rapid upload fails, falls back to normal upload
    /// </summary>
    public async Task<(bool ok, string? pickCode, string message)> UploadFileAsync(
        string localPath, string targetCid, string? sha1 = null, CancellationToken ct = default)
    {
        if (!File.Exists(localPath))
            return (false, null, "File not found");

        var fileInfo = new FileInfo(localPath);
        var fileName = fileInfo.Name;
        var fileSize = fileInfo.Length;

        // Calculate SHA1 if not provided
        sha1 ??= await ComputeSha1Async(localPath, ct);

        _logger.LogInformation("Uploading {File} ({Size} bytes, SHA1: {Sha1}) to CID {Cid}",
            fileName, fileSize, sha1, targetCid);

        // Step 1: Try rapid upload (秒传)
        try
        {
            var (rapid, pickCode, msg) = await TryRapidUploadAsync(fileName, fileSize, sha1, targetCid, ct);
            if (rapid)
            {
                _logger.LogInformation("Rapid upload succeeded for {File}, pickCode: {PickCode}", fileName, pickCode);
                return (true, pickCode, "Rapid upload");
            }
            _logger.LogInformation("Rapid upload not available for {File}: {Msg}, falling back to normal upload", fileName, msg);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Rapid upload check failed for {File}", fileName);
        }

        // Step 2: Normal upload via form post
        try
        {
            var (ok, pickCode, msg) = await NormalUploadAsync(localPath, fileName, fileSize, targetCid, ct);
            return (ok, pickCode, msg);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Normal upload failed for {File}", fileName);
            return (false, null, ex.Message);
        }
    }

    private async Task<(bool ok, string? pickCode, string message)> TryRapidUploadAsync(
        string fileName, long fileSize, string sha1, string targetCid, CancellationToken ct)
    {
        var target = $"U_1_{targetCid}";
        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["fileid"] = sha1.ToUpperInvariant(),
            ["filename"] = fileName,
            ["filesize"] = fileSize.ToString(),
            ["target"] = target
        });

        var request = new HttpRequestMessage(HttpMethod.Post, $"{UploadBase}/initupload.php");
        request.Headers.Add("Cookie", _cookie);
        request.Content = content;

        var resp = await _http.SendAsync(request, ct);
        var json = await resp.Content.ReadAsStringAsync(ct);
        var doc = JsonNode.Parse(json);

        var status = doc?["status"]?.GetValue<int>() ?? 0;
        if (status == 2) // Rapid upload success
        {
            var pickCode = doc?["pickcode"]?.GetValue<string>();
            return (true, pickCode, "OK");
        }

        return (false, null, $"Status: {status}");
    }

    private async Task<(bool ok, string? pickCode, string message)> NormalUploadAsync(
        string localPath, string fileName, long fileSize, string targetCid, CancellationToken ct)
    {
        var target = $"U_1_{targetCid}";

        using var fileStream = File.OpenRead(localPath);
        using var formContent = new MultipartFormDataContent();

        formContent.Add(new StringContent(target), "target");
        formContent.Add(new StringContent(fileName), "filename");
        formContent.Add(new StreamContent(fileStream), "file", fileName);

        var request = new HttpRequestMessage(HttpMethod.Post, $"{UploadBase}/upload.php");
        request.Headers.Add("Cookie", _cookie);
        request.Content = formContent;

        var resp = await _http.SendAsync(request, ct);
        var json = await resp.Content.ReadAsStringAsync(ct);
        _logger.LogDebug("Upload response: {Json}", json);

        var doc = JsonNode.Parse(json);
        var state = doc?["state"]?.GetValue<bool>() ?? false;
        if (state)
        {
            var pickCode = doc?["data"]?["pickcode"]?.GetValue<string>();
            return (true, pickCode, "Uploaded");
        }

        var error = doc?["message"]?.GetValue<string>() ?? json;
        return (false, null, error);
    }

    private static async Task<string> ComputeSha1Async(string filePath, CancellationToken ct)
    {
        using var sha1 = SHA1.Create();
        using var stream = File.OpenRead(filePath);
        var hash = await sha1.ComputeHashAsync(stream, ct);
        return Convert.ToHexStringLower(hash);
    }
}
