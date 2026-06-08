using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;
namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExperimentController : ControllerBase
{
    private readonly ILogger<ExperimentController> _logger;
    private readonly FileMD5Manager _md5Manager;
    private readonly AgentManager _agentManager;
    public ExperimentController(ILogger<ExperimentController> logger, FileMD5Manager md5Manager, AgentManager agentManager)
    {
        _logger = logger;
        _md5Manager = md5Manager;
        _agentManager = agentManager;
    }

    [HttpGet("{days:int}")]
    public async Task<object> Get(int days)
    {
        return await _md5Manager.GetRecentCapturesAsync(new TimeSpan(days, 0, 0, 0));
    }

    [HttpGet("page")]
    public async Task<object> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 30)
    {
        return await _md5Manager.GetPagedCapturesAsync(page, pageSize);
    }

    [HttpGet("filters")]
    public async Task<object> GetFilters()
    {
        return await _md5Manager.GetFilterOptionsAsync();
    }

    [HttpGet("gallery")]
    public async Task<object> GetGallery(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 30,
        [FromQuery] string? cameraMaker = null, [FromQuery] string? cameraModel = null,
        [FromQuery] string? fileType = null, [FromQuery] string? agentId = null,
        [FromQuery] DateTime? dateFrom = null, [FromQuery] DateTime? dateTo = null,
        [FromQuery] bool? hasGps = null, [FromQuery] string? mediaType = null,
        [FromQuery] long? tagId = null)
    {
        return await _md5Manager.GetFilteredPagedCapturesAsync(
            page, pageSize, cameraMaker, cameraModel, fileType, agentId, dateFrom, dateTo, hasGps, mediaType, tagId);
    }

    [HttpGet("detail/{id:long}")]
    public async Task<IActionResult> GetDetail(long id)
    {
        var capture = await _md5Manager.GetCaptureByIdAsync(id);
        if (capture == null) return NotFound();
        return Ok(capture);
    }

    /// <summary>
    /// Find the Live Photo MOV companion for a given HEIC/JPG file.
    /// Returns the MOV record if found, 404 otherwise.
    /// </summary>
    [HttpGet("live-photo/{id:long}")]
    public async Task<IActionResult> GetLivePhotoMov(long id)
    {
        var capture = await _md5Manager.GetCaptureByIdAsync(id);
        if (capture == null) return NotFound();

        var ext = Path.GetExtension(capture.FileName).ToLowerInvariant();
        if (ext is not (".heic" or ".jpg" or ".jpeg")) return NotFound();

        // Look for same-name .MOV in same directory
        var baseName = Path.GetFileNameWithoutExtension(capture.FileName);
        var movName = baseName + ".MOV";
        var candidates = await _md5Manager.GetFilesByFolderAsync(capture.FilePath, capture.AgentId);
        var mov = candidates.FirstOrDefault(f =>
            f.FileName.Equals(movName, StringComparison.OrdinalIgnoreCase) &&
            f.FileName != capture.FileName);

        if (mov == null) return NotFound();
        return Ok(mov);
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        var capture = await _md5Manager.GetCaptureByIdAsync(id);
        if (capture == null) return NotFound();
        await DeletePhysicalFile(capture);
        DeleteCache(capture.FileMD5);
        await _md5Manager.DeleteByIdAsync(id);
        return Ok();
    }

    [HttpDelete("agent/{agentId}")]
    public async Task<IActionResult> DeleteByAgent(string agentId)
    {
        var count = await _md5Manager.DeleteByAgentIdAsync(agentId);
        _logger.LogInformation("Deleted {Count} records for agent {AgentId}", count, agentId);

        // Trigger rescan on agent
        var agents = await _agentManager.GetAllAgentsAsync();
        var agent = agents.FirstOrDefault(a => a.Id == agentId);
        if (agent != null && !string.IsNullOrEmpty(agent.Endpoint))
        {
            try
            {
                var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(5) };
                await client.PostAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/rescan", null);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to trigger rescan on agent {AgentId}", agentId);
            }
        }
        return Ok(new { deleted = count });
    }

    // --- Folder APIs ---

    [HttpGet("folders")]
    public async Task<object> GetFolders([FromQuery] string? agentId = null)
    {
        return await _md5Manager.GetFoldersAsync(agentId);
    }

    [HttpGet("folder-files")]
    public async Task<object> GetFolderFiles([FromQuery] string path, [FromQuery] string? agentId = null)
    {
        return await _md5Manager.GetFilesByFolderAsync(path, agentId);
    }

    [HttpPost("move")]
    public async Task<IActionResult> MoveFiles([FromBody] MoveRequest request)
    {
        var files = await _md5Manager.GetFilesByIdsAsync(request.FileIds);
        if (files.Count == 0) return NotFound();

        var moved = 0;
        foreach (var file in files)
        {
            var targetPath = Path.Combine(request.TargetPath, file.FileName);
            try
            {
                if (string.IsNullOrEmpty(file.AgentId) || file.AgentId == "local")
                {
                    Directory.CreateDirectory(request.TargetPath);
                    if (System.IO.File.Exists(file.FileFullPath))
                    {
                        System.IO.File.Move(file.FileFullPath, targetPath, overwrite: false);
                        await _md5Manager.RenameFileAsync(file.Id, request.TargetPath, file.FileName);
                        moved++;
                    }
                }
                else
                {
                    var agents = await _agentManager.GetAllAgentsAsync();
                    var agent = agents.FirstOrDefault(a => a.Id == file.AgentId);
                    if (agent != null)
                    {
                        var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(30) };
                        var resp = await client.PostAsJsonAsync(
                            $"{agent.Endpoint.TrimEnd('/')}/api/agent/move",
                            new { sourcePath = file.FileFullPath, targetPath });
                        if (resp.IsSuccessStatusCode)
                        {
                            await _md5Manager.RenameFileAsync(file.Id, request.TargetPath, file.FileName);
                            moved++;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to move {File}", file.FileFullPath);
            }
        }
        return Ok(new { moved, total = files.Count });
    }

    // ---------- cross-node transfer (agent-to-agent, orchestrated by Master) ----------
    // Source is read from THIS master machine's local disk (BARONCELLI = master).
    // Each file is streamed to the target agent's /api/agent/receive, hashed in
    // flight, verified against the agent's returned MD5, the catalog row is
    // re-pointed, and (optionally) the source is deleted — only after the
    // content match. Disk-driven (covers files not in the catalog too).
    private static TransferState? _transfer;

    [HttpGet("transfer/status")]
    public IActionResult TransferStatus() =>
        Ok(_transfer ?? new TransferState { State = "idle" });

    [HttpPost("transfer")]
    public IActionResult StartTransfer([FromBody] TransferRequest req)
    {
        if (_transfer is { State: "running" })
            return Conflict(new { error = "a transfer is already running", _transfer.Processed, _transfer.Total });
        if (!Directory.Exists(req.SourceRoot))
            return NotFound(new { error = "source root not found: " + req.SourceRoot });

        var st = new TransferState { State = "running", SourceRoot = req.SourceRoot, TargetRoot = req.TargetRoot, TargetAgentId = req.TargetAgentId, StartedAt = DateTime.Now };
        _transfer = st;
        _ = Task.Run(() => RunTransfer(req, st));
        return Ok(new { message = "transfer started", req.SourceRoot, req.TargetRoot, req.TargetAgentId, req.DeleteSource });
    }

    private async Task RunTransfer(TransferRequest req, TransferState st)
    {
        try
        {
            var agents = await _agentManager.GetAllAgentsAsync();
            var target = agents.FirstOrDefault(a => a.Id == req.TargetAgentId);
            if (target == null || string.IsNullOrEmpty(target.Endpoint))
            { st.State = "error"; st.LastError = "target agent not found"; return; }

            var files = Directory.GetFiles(req.SourceRoot, "*", SearchOption.AllDirectories);
            st.Total = files.Length;
            using var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromMinutes(60) };

            foreach (var src in files)
            {
                st.CurrentFile = src;
                try
                {
                    var rel = Path.GetRelativePath(req.SourceRoot, src);
                    // Normalize separators to the OS-canonical form (backslash on
                    // Windows). Directory.GetFiles on a forward-slash root yields
                    // mixed separators; the catalog stores backslash. Without this,
                    // RepointFileAsync's WHERE fullpath=@src matches 0 rows, the row
                    // stays at the old path, and the archive deletion-watcher
                    // tombstones it when the source is deleted (treats a move as a
                    // delete). Normalizing makes the repoint land so no tombstone.
                    var srcNorm = Path.GetFullPath(src);
                    var targetPath = Path.GetFullPath(Path.Combine(req.TargetRoot, rel));
                    var url = $"{target.Endpoint.TrimEnd('/')}/api/agent/receive?path={Uri.EscapeDataString(targetPath)}";

                    string srcMd5;
                    ReceiveResult? rr;
                    using (var fs = new FileStream(src, FileMode.Open, FileAccess.Read, FileShare.Read, 1 << 20))
                    using (var hashing = new HashingReadStream(fs))
                    {
                        var content = new StreamContent(hashing);
                        content.Headers.ContentLength = fs.Length;
                        var resp = await client.PostAsync(url, content);
                        if (!resp.IsSuccessStatusCode)
                        { st.Failed++; st.AddFailure($"{src} HTTP {(int)resp.StatusCode}"); continue; }
                        rr = await resp.Content.ReadFromJsonAsync<ReceiveResult>();
                        srcMd5 = hashing.Md5Hex;
                    }

                    if (rr is null || !rr.ok || !string.Equals(rr.md5, srcMd5, StringComparison.OrdinalIgnoreCase))
                    { st.Failed++; st.AddFailure($"{src} MD5 mismatch (src={srcMd5} dst={rr?.md5})"); continue; }

                    await _md5Manager.RepointFileAsync(srcNorm, targetPath, req.TargetAgentId);
                    if (req.DeleteSource)
                    {
                        try { System.IO.File.Delete(src); }
                        catch (Exception ex) { _logger.LogWarning(ex, "transfer: source delete failed {Src}", src); }
                    }
                    st.Moved++; st.MovedBytes += rr.size;
                }
                catch (Exception ex)
                {
                    st.Failed++; st.AddFailure($"{src} {ex.Message}");
                    _logger.LogWarning(ex, "transfer: failed {Src}", src);
                }
                finally { st.Processed++; }
            }
            st.State = st.Failed == 0 ? "completed" : "completed_with_errors";
            st.CurrentFile = null;
            st.EndedAt = DateTime.Now;
        }
        catch (Exception ex)
        {
            st.State = "error"; st.LastError = ex.Message; st.EndedAt = DateTime.Now;
            _logger.LogError(ex, "transfer run failed");
        }
    }

    [HttpDelete("folder")]
    public async Task<IActionResult> DeleteFolder([FromQuery] string path, [FromQuery] string? agentId = null)
    {
        var files = await _md5Manager.GetFilesByFolderAsync(path, agentId);
        var deleted = 0;
        foreach (var file in files)
        {
            await DeletePhysicalFile(file);
            DeleteCache(file.FileMD5);
            await _md5Manager.DeleteByIdAsync(file.Id);
            deleted++;
        }
        return Ok(new { deleted });
    }

    private async Task DeletePhysicalFile(FileMD5Entity capture)
    {
        if (string.IsNullOrEmpty(capture.AgentId) || capture.AgentId == "local")
        {
            try { if (System.IO.File.Exists(capture.FileFullPath)) System.IO.File.Delete(capture.FileFullPath); }
            catch (Exception ex) { _logger.LogWarning(ex, "Failed to delete local file {Path}", capture.FileFullPath); }
        }
        else
        {
            var agents = await _agentManager.GetAllAgentsAsync();
            var agent = agents.FirstOrDefault(a => a.Id == capture.AgentId);
            if (agent != null && !string.IsNullOrEmpty(agent.Endpoint))
            {
                try
                {
                    var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(10) };
                    await client.DeleteAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/file?path={Uri.EscapeDataString(capture.FileFullPath)}");
                }
                catch (Exception ex) { _logger.LogWarning(ex, "Failed to notify Agent to delete {Path}", capture.FileFullPath); }
            }
        }
    }

    private static void DeleteCache(string? fileMd5)
    {
        if (string.IsNullOrEmpty(fileMd5)) return;
        var cachePath = Path.Combine(AppContext.BaseDirectory, "cache", $"{fileMd5}.jpg");
        try { if (System.IO.File.Exists(cachePath)) System.IO.File.Delete(cachePath); } catch { }
    }
}

public class MoveRequest
{
    public List<long> FileIds { get; set; } = [];
    public string TargetPath { get; set; } = "";
}

public class TransferRequest
{
    public string SourceRoot { get; set; } = "";      // master-local path, e.g. D:\Photograph\2025
    public string TargetAgentId { get; set; } = "";   // destination agent
    public string TargetRoot { get; set; } = "";      // path on the target agent, e.g. J:\Photograph\2025
    public bool DeleteSource { get; set; }            // delete source only after verified content match
}

public class TransferState
{
    public string State { get; set; } = "idle";       // idle|running|completed|completed_with_errors|error
    public string? SourceRoot { get; set; }
    public string? TargetRoot { get; set; }
    public string? TargetAgentId { get; set; }
    public int Total { get; set; }
    public int Processed { get; set; }
    public int Moved { get; set; }
    public int Failed { get; set; }
    public long MovedBytes { get; set; }
    public string? CurrentFile { get; set; }
    public string? LastError { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
    public List<string> Failures { get; } = [];
    public void AddFailure(string f) { if (Failures.Count < 200) Failures.Add(f); }
}

public record ReceiveResult(bool ok, string md5, long size, string? path, string? error);

// Wraps a read stream and computes MD5 of everything read. Read Md5Hex after the
// stream is fully consumed (i.e. after the HTTP POST completes).
public sealed class HashingReadStream : Stream
{
    private readonly Stream _inner;
    private readonly System.Security.Cryptography.IncrementalHash _hash =
        System.Security.Cryptography.IncrementalHash.CreateHash(System.Security.Cryptography.HashAlgorithmName.MD5);
    private string? _hex;
    public HashingReadStream(Stream inner) { _inner = inner; }
    // Finalize at EOF (n==0), BEFORE HttpClient disposes the request content
    // (which disposes this stream + the hash). Md5Hex returns the captured value.
    private void Finalize0(int n) { if (n == 0 && _hex is null) _hex = Convert.ToHexString(_hash.GetHashAndReset()).ToLowerInvariant(); }
    public string Md5Hex => _hex ?? throw new InvalidOperationException("stream not fully read yet");
    public override int Read(byte[] buffer, int offset, int count)
    { int n = _inner.Read(buffer, offset, count); if (n > 0) _hash.AppendData(buffer, offset, n); else Finalize0(n); return n; }
    public override async ValueTask<int> ReadAsync(Memory<byte> buffer, CancellationToken ct = default)
    { int n = await _inner.ReadAsync(buffer, ct); if (n > 0) _hash.AppendData(buffer.Span[..n]); else Finalize0(n); return n; }
    public override bool CanRead => true;
    public override bool CanSeek => false;
    public override bool CanWrite => false;
    public override long Length => _inner.Length;
    public override long Position { get => _inner.Position; set => throw new NotSupportedException(); }
    public override void Flush() => _inner.Flush();
    public override long Seek(long o, SeekOrigin x) => throw new NotSupportedException();
    public override void SetLength(long v) => throw new NotSupportedException();
    public override void Write(byte[] b, int o, int c) => throw new NotSupportedException();
    protected override void Dispose(bool disposing) { if (disposing) { _inner.Dispose(); _hash.Dispose(); } base.Dispose(disposing); }
}
