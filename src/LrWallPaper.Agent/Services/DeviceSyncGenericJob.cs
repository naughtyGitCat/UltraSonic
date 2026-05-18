using System.Net.Http.Json;
using LrWallPaper.Agent.Helpers;

namespace LrWallPaper.Agent.Services;

/// <summary>
/// Scans removable drives (SD cards, cameras) for DCIM folders,
/// copies new files to the local archive, and pushes metadata to the Master node.
/// </summary>
public class DeviceSyncGenericJob : BackgroundService
{
    private readonly ILogger<DeviceSyncGenericJob> _logger;
    private readonly IConfiguration _configuration;
    private readonly AgentState _state;
    private readonly HttpClient _httpClient = new();

    public DeviceSyncGenericJob(ILogger<DeviceSyncGenericJob> logger, IConfiguration configuration, AgentState state)
    {
        _logger = logger;
        _configuration = configuration;
        _state = state;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            var masterEndpoint = _configuration["Agent:MasterEndpoint"] ?? "http://localhost:5281";
            var agentId = _configuration["Agent:AgentId"] ?? "local";
            var archiveDir = _configuration["DeviceSync:GenericImport:ArchiveDirectory"] ?? "";
            var transferMode = _configuration["DeviceSync:GenericImport:TransferMode"]?.ToLower() ?? "copy";

            if (string.IsNullOrEmpty(archiveDir))
            {
                _logger.LogWarning("DeviceSync:GenericImport:ArchiveDirectory is not configured. Skipping generic device sync.");
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
                continue;
            }

            try
            {
                _logger.LogInformation("Starting generic device scan...");
                await ImportFromRemovableDrivesAsync(masterEndpoint, agentId, archiveDir, transferMode, stoppingToken);
                _logger.LogInformation("Generic device scan completed.");
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Generic device sync stopped gracefully at file boundary.");
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Generic device sync failed");
            }

            await Task.Delay(new TimeSpan(0, 5, 8), stoppingToken);
        }
    }

    private async Task ImportFromRemovableDrivesAsync(string masterEndpoint, string agentId,
        string archiveDir, string transferMode, CancellationToken ct)
    {
        var drives = DriveInfo.GetDrives()
            .Where(d => d.IsReady && d.DriveType == DriveType.Removable)
            .ToList();

        foreach (var drive in drives)
        {
            if (!drive.IsReady) continue;

            var dcimPath = Path.Combine(drive.Name, "DCIM");
            if (!Directory.Exists(dcimPath)) continue;

            var deviceName = drive.VolumeLabel ?? drive.Name.TrimEnd('\\');
            _logger.LogInformation("Found removable device with DCIM at: {Path} (label: {Label})", dcimPath, deviceName);
            var batch = new List<object>();
            var archiveRecords = new List<object>();

            _state.IsArchiving = true;
            _state.ArchiveDevice = deviceName;
            _state.ArchiveCurrentFile = null;
            _state.ArchivePhase = "scanning";
            _state.ArchiveProcessed = 0;
            _state.ArchiveStartedAt = DateTime.Now;
            _state.ArchiveLastError = null;
            _state.NotifyStateChanged();

            var aborted = false;
            try
            {
                await ProcessDirectoryAsync(dcimPath, masterEndpoint, agentId, archiveDir, transferMode, deviceName, batch, archiveRecords, ct);
            }
            catch (InsufficientArchiveSpaceException ex)
            {
                aborted = true;
                _state.ArchiveLastError = ex.Message;
                _logger.LogError("Archive aborted — {Message}", ex.Message);
            }
            finally
            {
                // Persist whatever was already archived before stopping.
                // Use a non-cancellable token so a graceful shutdown still
                // flushes bookkeeping for files already moved to disk.
                if (batch.Count > 0)
                    await PushBatchAsync(masterEndpoint, batch, CancellationToken.None);
                if (archiveRecords.Count > 0)
                    await PushArchiveHistoryAsync(masterEndpoint, archiveRecords, CancellationToken.None);

                _state.IsArchiving = false;
                _state.ArchiveCurrentFile = null;
                _state.ArchivePhase = null;
                _state.LastArchiveEnd = DateTime.Now;
                _state.LastArchiveCount = archiveRecords.Count;
                _state.NotifyStateChanged();
            }

            // Disk full: remaining drives target the same volume — stop entirely.
            if (aborted) return;
        }
    }

    private async Task ProcessDirectoryAsync(string dir, string masterEndpoint, string agentId,
        string archiveDir, string transferMode, string deviceName, List<object> batch, List<object> archiveRecords, CancellationToken ct)
    {
        // Safe boundary: stop the whole run here if a graceful shutdown was
        // requested. Any previous file's File.Move already completed (it is
        // synchronous and the token is only observed between files).
        ct.ThrowIfCancellationRequested();

        string[] files = [];
        try { files = Directory.GetFiles(dir); }
        catch (Exception ex) { _logger.LogWarning(ex, "Cannot read directory: {Dir}", dir); return; }

        foreach (var file in files)
        {
            ct.ThrowIfCancellationRequested();
            await ProcessFileAsync(file, masterEndpoint, agentId, archiveDir, transferMode, deviceName, batch, archiveRecords, ct);
            if (batch.Count >= 50)
            {
                await PushBatchAsync(masterEndpoint, batch, ct);
                batch.Clear();
            }
        }

        string[] subDirs = [];
        try { subDirs = Directory.GetDirectories(dir); }
        catch { }

        foreach (var sub in subDirs)
            await ProcessDirectoryAsync(sub, masterEndpoint, agentId, archiveDir, transferMode, deviceName, batch, archiveRecords, ct);
    }

    private async Task ProcessFileAsync(string sourceFile, string masterEndpoint, string agentId,
        string archiveDir, string transferMode, string deviceName, List<object> batch, List<object> archiveRecords, CancellationToken ct)
    {
        var filename = Path.GetFileName(sourceFile);
        var ext = Path.GetExtension(sourceFile);

        if (filename.StartsWith('.') || ext.Equals(".lrf", StringComparison.OrdinalIgnoreCase)
            || ext.Equals(".aae", StringComparison.OrdinalIgnoreCase)) return;
        if (!MediaHelpers.PossibleSuffixes.Contains(ext)) return;

        // Skip screenshots: filename pattern or directory name
        if (IsScreenshot(sourceFile, filename)) return;

        try
        {
            // Cheap dedup precheck FIRST (filename + size only, no hashing).
            // Already-archived files are skipped without ever reading their
            // multi-GB contents — this is what stops every scan cycle from
            // re-hashing the whole device.
            _state.ArchiveCurrentFile = filename;
            _state.ArchivePhase = "checking";
            _state.NotifyStateChanged();

            var size = new FileInfo(sourceFile).Length;
            if (await FileExistsOnMasterAsync(masterEndpoint, filename, size))
            {
                // Already archived. In move mode the source must not be left
                // stranded on the device — "move" semantics apply to
                // already-archived files too. Only delete the source after
                // content-verifying a local archived copy (never delete on
                // filename+size alone; a corrupt/partial archive must NOT
                // cost us the only good original).
                if (transferMode == "move"
                    && TryReclaimArchivedSource(sourceFile, filename, size, archiveDir))
                {
                    return;
                }
                _logger.LogDebug("Already on Master, skipping: {File}", sourceFile);
                return;
            }

            // Confirmed new -> now (and only now) hash it. MD5 is needed for
            // the target-collision content compare and the catalog/history
            // records below.
            _state.ArchivePhase = "hashing";
            _state.NotifyStateChanged();
            var md5 = MediaHelpers.ComputeMD5(sourceFile);

            var exif = MediaHelpers.ReadExif(sourceFile);
            var captureTime = exif.PhotoDateTime ?? File.GetCreationTime(sourceFile);
            if (captureTime == DateTime.MinValue) captureTime = DateTime.Now;

            var targetDir = Path.Combine(archiveDir, captureTime.Year.ToString(), captureTime.ToString("yyyy-MM-dd"));
            var targetFile = Path.Combine(targetDir, filename);

            if (File.Exists(targetFile))
            {
                var existingMd5 = MediaHelpers.ComputeMD5(targetFile);
                if (existingMd5 == md5)
                {
                    _logger.LogDebug("Target file exists with same MD5, skipping: {File}", targetFile);
                    return;
                }
                // Rename on collision
                targetFile = Path.Combine(targetDir,
                    $"{Path.GetFileNameWithoutExtension(filename)}_{DateTime.Now.Ticks}{ext}");
            }

            // Guard: never start a write that the target volume can't hold.
            // Disk-full is a hard stop — abort the whole run via exception.
            var targetRoot = Path.GetPathRoot(Path.GetFullPath(targetFile));
            if (!string.IsNullOrEmpty(targetRoot))
            {
                var free = new DriveInfo(targetRoot).AvailableFreeSpace;
                if (free < size)
                    throw new InsufficientArchiveSpaceException(targetFile, size, free);
            }

            _logger.LogInformation("Importing ({Mode}) {Source} → {Target}", transferMode, sourceFile, targetFile);
            _state.ArchivePhase = "moving";
            _state.NotifyStateChanged();
            Directory.CreateDirectory(targetDir);
            if (transferMode == "move")
                File.Move(sourceFile, targetFile, overwrite: false);
            else
                File.Copy(sourceFile, targetFile, overwrite: false);
            _state.ArchiveProcessed++;
            _state.NotifyStateChanged();

            batch.Add(new
            {
                FileFullPath = targetFile,
                FilePath = targetDir,
                FileName = Path.GetFileName(targetFile),
                CameraMaker = exif.CameraMaker ?? "",
                CameraModel = exif.CameraModel ?? "",
                LensModel = exif.LensModel ?? "",
                AgentId = agentId,
                FileSize = exif.FileSize ?? size,
                FileMD5 = md5,
                CaptureTime = captureTime
            });

            archiveRecords.Add(new
            {
                SourcePath = sourceFile,
                TargetPath = targetFile,
                FileName = Path.GetFileName(targetFile),
                FileSize = size,
                FileMD5 = md5,
                TransferMode = transferMode,
                DeviceName = deviceName,
                AgentId = agentId,
                AgentName = Environment.MachineName,
                CameraModel = exif.CameraModel ?? "",
                CaptureTime = captureTime,
                ArchivedAt = DateTime.Now
            });
        }
        catch (InsufficientArchiveSpaceException)
        {
            throw; // hard stop — let it unwind to abort the whole run
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to process generic device file: {File}", sourceFile);
        }
    }

    private async Task<bool> FileExistsOnMasterAsync(string masterEndpoint, string filename, long size)
    {
        try
        {
            var url = $"{masterEndpoint.TrimEnd('/')}/api/master/file-exists?filename={Uri.EscapeDataString(filename)}&size={size}";
            var result = await _httpClient.GetFromJsonAsync<FileExistsResponse>(url);
            return result?.Exists ?? false;
        }
        catch
        {
            return false;
        }
    }

    private async Task PushBatchAsync(string masterEndpoint, List<object> batch, CancellationToken ct)
    {
        var url = $"{masterEndpoint.TrimEnd('/')}/api/master/sync";
        try
        {
            var response = await _httpClient.PostAsJsonAsync(url, batch, ct);
            _logger.LogInformation("Pushed {Count} generic import records — HTTP {Status}",
                batch.Count, (int)response.StatusCode);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to push generic import batch to Master");
        }
    }

    private async Task PushArchiveHistoryAsync(string masterEndpoint, List<object> records, CancellationToken ct)
    {
        var url = $"{masterEndpoint.TrimEnd('/')}/api/master/archive-history";
        try
        {
            var response = await _httpClient.PostAsJsonAsync(url, records, ct);
            _logger.LogInformation("Pushed {Count} archive history records — HTTP {Status}",
                records.Count, (int)response.StatusCode);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to push archive history to Master");
        }
    }

    /// <summary>
    /// The file is already on Master but still physically on the source
    /// device (move mode). Find a local archived copy and, only if its
    /// content matches (MD5), delete the source so nothing is stranded.
    /// Returns true iff the source was safely deleted. A one-time hash
    /// cost per file: once deleted it is never re-checked again.
    /// </summary>
    private bool TryReclaimArchivedSource(string sourceFile, string filename, long size, string archiveDir)
    {
        try
        {
            if (string.IsNullOrEmpty(archiveDir) || !Directory.Exists(archiveDir)) return false;

            string[] candidates;
            try { candidates = Directory.GetFiles(archiveDir, filename, SearchOption.AllDirectories); }
            catch { return false; }

            var sameSize = candidates.Where(c =>
            {
                try { return new FileInfo(c).Length == size; } catch { return false; }
            }).ToList();
            if (sameSize.Count == 0) return false;

            _state.ArchivePhase = "reclaiming";
            _state.NotifyStateChanged();

            var srcMd5 = MediaHelpers.ComputeMD5(sourceFile);
            foreach (var cand in sameSize)
            {
                string candMd5;
                try { candMd5 = MediaHelpers.ComputeMD5(cand); } catch { continue; }
                if (candMd5 == srcMd5)
                {
                    File.Delete(sourceFile);
                    _logger.LogInformation("Reclaimed already-archived source (verified == {Archived}): deleted {Src}",
                        cand, sourceFile);
                    return true;
                }
            }
            // Archived copy exists by name+size but content differs: the
            // archive is corrupt/partial. Keep the source untouched.
            _logger.LogWarning("Already on Master but no content-verified local copy for {File} — source kept.", sourceFile);
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Reclaim check failed for {File} — source kept.", sourceFile);
            return false;
        }
    }

    private static bool IsScreenshot(string filePath, string filename)
    {
        var upper = filename.ToUpperInvariant();
        // Android/generic screenshot filename patterns
        if (upper.StartsWith("SCREENSHOT_") || upper.StartsWith("SCREENSHOT ") || upper.StartsWith("SCREEN_"))
            return true;
        // Huawei/Honor patterns
        if (upper.StartsWith("截屏") || upper.StartsWith("截图"))
            return true;
        // Directory-based detection: DCIM/Screenshots, Pictures/Screenshots
        var dir = Path.GetDirectoryName(filePath) ?? "";
        if (dir.Contains("Screenshot", StringComparison.OrdinalIgnoreCase))
            return true;
        return false;
    }

    private record FileExistsResponse(bool Exists);
}

/// <summary>
/// Thrown when the archive target volume cannot fit the next file.
/// Aborts the whole archive run — remaining files target the same disk.
/// </summary>
public sealed class InsufficientArchiveSpaceException(string file, long need, long free)
    : Exception($"Insufficient space to archive '{Path.GetFileName(file)}': " +
                $"need {need / 1024 / 1024} MB, target free {free / 1024 / 1024} MB")
{
    public long Need { get; } = need;
    public long Free { get; } = free;
}
