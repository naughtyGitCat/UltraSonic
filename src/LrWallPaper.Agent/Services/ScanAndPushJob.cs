using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;

namespace LrWallPaper.Agent.Services;

/// <summary>
/// Background job that periodically scans configured local folders,
/// computes MD5 fingerprints and reads EXIF metadata for each image,
/// then pushes the catalog batch to the Master hub.
/// </summary>
public class ScanAndPushJob : BackgroundService
{
    private readonly ILogger<ScanAndPushJob> _logger;
    private readonly IConfiguration _configuration;
    private readonly AgentState _agentState;
    private readonly HttpClient _httpClient = new();

    private static readonly HashSet<string> DefaultExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".heic",
        ".dng", ".cr2", ".nef", ".arw",
        ".mp4", ".mov", ".avi", ".mkv", ".mts"
    };

    public ScanAndPushJob(ILogger<ScanAndPushJob> logger, IConfiguration configuration, AgentState agentState)
    {
        _logger = logger;
        _configuration = configuration;
        _agentState = agentState;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Wait briefly for the web host to fully start
        await Task.Delay(TimeSpan.FromSeconds(3), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
            if (!_agentState.IsScanningEnabled)
            {
                await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);
                continue;
            }

            // Read configuration dynamically on each iteration so changes in appsettings.json apply immediately
            var agentId = _configuration["Agent:AgentId"];
            var masterEndpoint = _configuration["Agent:MasterEndpoint"] ?? "http://localhost:5281";
            var scanPaths = _configuration.GetSection("Agent:ScanPaths").Get<string[]>() ?? [];
            var intervalMinutes = _configuration.GetValue("Agent:ScanIntervalMinutes", 60);
            var supportedExts = _configuration.GetSection("Agent:SupportedExtensions").Get<string[]>();
            var extensions = supportedExts != null && supportedExts.Length > 0
                ? new HashSet<string>(supportedExts, StringComparer.OrdinalIgnoreCase)
                : DefaultExtensions;

            if (string.IsNullOrEmpty(agentId) || agentId == "auto")
            {
                agentId = Guid.NewGuid().ToString();
                _logger.LogInformation("Generated AgentId: {Id}, persisting to appsettings.json", agentId);
                PersistAgentId(agentId);
            }

            // Auto-register with Master — resolve actual IP instead of bind address
            var bindUrl = _configuration["Urls"] ?? "http://localhost:5282";
            var uri = new Uri(bindUrl);
            var actualIp = GetLocalIpAddress();
            var agentUrl = $"{uri.Scheme}://{actualIp}:{uri.Port}";
            await RegisterWithMaster(masterEndpoint, agentId, agentUrl, stoppingToken);

            _logger.LogInformation("Agent {Id} starting scan. Master={Master}, Paths={Paths}, Interval={Min}m",
                agentId, masterEndpoint, string.Join(";", scanPaths), intervalMinutes);

            foreach (var scanPath in scanPaths)
            {
                if (!Directory.Exists(scanPath))
                {
                    _logger.LogWarning("Scan path does not exist, skipping: {Path}", scanPath);
                    continue;
                }

                _logger.LogInformation("Begin scanning: {Path}", scanPath);

                var batch = new List<object>();

                var fileCount = 0;
                foreach (var filePath in EnumerateImageFiles(scanPath, extensions))
                {
                    if (stoppingToken.IsCancellationRequested) break;

                    try
                    {
                        _logger.LogDebug("Processing: {File}", filePath);
                        var md5 = ComputeMD5(filePath);
                        var exif = ReadExif(filePath);

                        batch.Add(new
                        {
                            FileFullPath = filePath,
                            FilePath = Path.GetDirectoryName(filePath) ?? "",
                            FileName = Path.GetFileName(filePath),
                            CameraMaker = exif.CameraMaker ?? "",
                            CameraModel = exif.CameraModel ?? "",
                            LensModel = exif.LensModel ?? "",
                            AgentId = agentId,
                            Latitude = exif.Latitude,
                            Longitude = exif.Longitude,
                            FileSize = exif.FileSize ?? new FileInfo(filePath).Length,
                            FileMD5 = md5,
                            CaptureTime = exif.PhotoDateTime ?? File.GetLastWriteTime(filePath)
                        });
                        fileCount++;

                        // Flush in chunks of 100
                        if (batch.Count >= 100)
                        {
                            await PushBatch(masterEndpoint, batch, stoppingToken);
                            batch.Clear();
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to process file: {File}", filePath);
                    }
                }

                // Push remaining
                if (batch.Count > 0)
                {
                    await PushBatch(masterEndpoint, batch, stoppingToken);
                }

                _logger.LogInformation("Scan complete for {Path}, processed {Count} files", scanPath, fileCount);
            }

            _logger.LogInformation("Next scan in {Min} minutes (or on manual trigger).", intervalMinutes);

            // Wait for scheduled interval or manual rescan trigger
            _agentState.WaitForRescan(TimeSpan.FromMinutes(intervalMinutes));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ScanAndPushJob encountered an unhandled error, will retry in 60s");
                _agentState.WaitForRescan(TimeSpan.FromSeconds(60));
            }
        }
    }

    private async Task PushBatch(string masterEndpoint, List<object> batch, CancellationToken ct)
    {
        var url = $"{masterEndpoint.TrimEnd('/')}/api/master/sync";
        try
        {
            var response = await _httpClient.PostAsJsonAsync(url, batch, ct);
            _logger.LogInformation("Pushed {Count} records to Master — HTTP {Status}",
                batch.Count, (int)response.StatusCode);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to push batch to Master at {Url}", url);
        }
    }

    private async Task RegisterWithMaster(string masterEndpoint, string agentId, string agentUrl, CancellationToken ct)
    {
        var url = $"{masterEndpoint.TrimEnd('/')}/api/agent";
        try
        {
            var asm = System.Reflection.Assembly.GetExecutingAssembly();
            var ver = asm.GetCustomAttributes(typeof(System.Reflection.AssemblyInformationalVersionAttribute), false)
                .OfType<System.Reflection.AssemblyInformationalVersionAttribute>().FirstOrDefault()?.InformationalVersion ?? "unknown";
            var payload = new { id = agentId, name = Environment.MachineName, endpoint = agentUrl, version = ver };
            var response = await _httpClient.PostAsJsonAsync(url, payload, ct);
            _logger.LogInformation("Registered with Master — AgentId={Id}, Endpoint={Url}, HTTP {Status}",
                agentId, agentUrl, (int)response.StatusCode);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to register with Master at {Url}", url);
        }
    }

    private static IEnumerable<string> EnumerateImageFiles(string root, HashSet<string> extensions)
    {
        IEnumerable<string> files;
        try
        {
            files = Directory.EnumerateFiles(root, "*.*", SearchOption.AllDirectories);
        }
        catch (UnauthorizedAccessException)
        {
            yield break;
        }

        foreach (var f in files)
        {
            if (extensions.Contains(Path.GetExtension(f)))
            {
                yield return f;
            }
        }
    }

    private static string ComputeMD5(string filePath)
    {
        using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
        var hash = MD5.HashData(stream);
        var sb = new StringBuilder(hash.Length * 2);
        foreach (var b in hash) sb.Append(b.ToString("x2"));
        return sb.ToString();
    }

    /// <summary>
    /// Lightweight EXIF reader mirroring Master's EXIFHelper but self-contained.
    /// </summary>
    private static ExifResult ReadExif(string file)
    {
        try
        {
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            var ifd0 = directories.FirstOrDefault(d => d.Name == "Exif IFD0");
            var subIfd = directories.FirstOrDefault(d => d.Name == "Exif SubIFD");
            var fileMeta = directories.FirstOrDefault(d => d.Name == "File");
            var gpsDir = directories.FirstOrDefault(d => d.Name == "GPS");

            double? lat = null, lon = null;
            if (gpsDir != null)
            {
                var latTag = gpsDir.Tags.FirstOrDefault(t => t.Name == "GPS Latitude")?.Description;
                var latRef = gpsDir.Tags.FirstOrDefault(t => t.Name == "GPS Latitude Ref")?.Description;
                var lonTag = gpsDir.Tags.FirstOrDefault(t => t.Name == "GPS Longitude")?.Description;
                var lonRef = gpsDir.Tags.FirstOrDefault(t => t.Name == "GPS Longitude Ref")?.Description;
                lat = ParseGpsCoordinate(latTag, latRef);
                lon = ParseGpsCoordinate(lonTag, lonRef);
            }

            return new ExifResult
            {
                CameraMaker = ifd0?.Tags.FirstOrDefault(t => t.Name == "Make")?.Description,
                CameraModel = ifd0?.Tags.FirstOrDefault(t => t.Name == "Model")?.Description,
                LensModel = subIfd?.Tags.FirstOrDefault(t => t.Name == "Lens Model")?.Description,
                PhotoDateTime = ParseExifDate(ifd0?.Tags.FirstOrDefault(t => t.Name == "Date/Time")?.Description),
                FileSize = ParseFileSize(fileMeta?.Tags.FirstOrDefault(t => t.Name == "File Size")?.Description),
                Latitude = lat,
                Longitude = lon
            };
        }
        catch
        {
            return new ExifResult();
        }
    }

    private static DateTime? ParseExifDate(string? raw)
    {
        if (string.IsNullOrEmpty(raw)) return null;
        if (DateTime.TryParseExact(raw, "yyyy:MM:dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out var dt))
            return dt;
        return null;
    }

    private static long? ParseFileSize(string? raw)
    {
        if (string.IsNullOrEmpty(raw)) return null;
        if (long.TryParse(raw.Split(' ').First(), out var size)) return size;
        return null;
    }

    private static string GetLocalIpAddress()
    {
        try
        {
            using var socket = new System.Net.Sockets.Socket(System.Net.Sockets.AddressFamily.InterNetwork, System.Net.Sockets.SocketType.Dgram, 0);
            socket.Connect("8.8.8.8", 65530);
            return ((System.Net.IPEndPoint)socket.LocalEndPoint!).Address.ToString();
        }
        catch
        {
            return "127.0.0.1";
        }
    }

    private static void PersistAgentId(string agentId)
    {
        try
        {
            var path = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
            var json = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.Nodes.JsonObject>(File.ReadAllText(path));
            if (json?["Agent"] is System.Text.Json.Nodes.JsonObject agent)
            {
                agent["AgentId"] = agentId;
                File.WriteAllText(path, json.ToJsonString(new System.Text.Json.JsonSerializerOptions { WriteIndented = true }));
            }
        }
        catch { }
    }

    private static double? ParseGpsCoordinate(string? dms, string? reference)
    {
        if (string.IsNullOrEmpty(dms)) return null;
        // Format: "23° 7' 30.12\"" or similar
        var parts = dms.Replace("°", " ").Replace("'", " ").Replace("\"", " ")
                       .Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length < 3) return null;
        if (!double.TryParse(parts[0], out var deg) ||
            !double.TryParse(parts[1], out var min) ||
            !double.TryParse(parts[2], out var sec)) return null;
        var result = deg + min / 60.0 + sec / 3600.0;
        if (reference is "S" or "W") result = -result;
        return result;
    }

    private record ExifResult
    {
        public string? CameraMaker { get; init; }
        public string? CameraModel { get; init; }
        public string? LensModel { get; init; }
        public DateTime? PhotoDateTime { get; init; }
        public long? FileSize { get; init; }
        public double? Latitude { get; init; }
        public double? Longitude { get; init; }
    }
}
