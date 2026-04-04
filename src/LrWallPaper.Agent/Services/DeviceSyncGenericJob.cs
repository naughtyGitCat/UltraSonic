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
    private readonly HttpClient _httpClient = new();

    public DeviceSyncGenericJob(ILogger<DeviceSyncGenericJob> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
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

            _logger.LogInformation("Found removable device with DCIM at: {Path}", dcimPath);
            var batch = new List<object>();
            await ProcessDirectoryAsync(dcimPath, masterEndpoint, agentId, archiveDir, transferMode, batch, ct);

            if (batch.Count > 0)
                await PushBatchAsync(masterEndpoint, batch, ct);
        }
    }

    private async Task ProcessDirectoryAsync(string dir, string masterEndpoint, string agentId,
        string archiveDir, string transferMode, List<object> batch, CancellationToken ct)
    {
        if (ct.IsCancellationRequested) return;

        string[] files = [];
        try { files = Directory.GetFiles(dir); }
        catch (Exception ex) { _logger.LogWarning(ex, "Cannot read directory: {Dir}", dir); return; }

        foreach (var file in files)
        {
            await ProcessFileAsync(file, masterEndpoint, agentId, archiveDir, transferMode, batch, ct);
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
            await ProcessDirectoryAsync(sub, masterEndpoint, agentId, archiveDir, transferMode, batch, ct);
    }

    private async Task ProcessFileAsync(string sourceFile, string masterEndpoint, string agentId,
        string archiveDir, string transferMode, List<object> batch, CancellationToken ct)
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
            var md5 = MediaHelpers.ComputeMD5(sourceFile);

            // Check Master for duplicate by MD5 via file-exists (filename + size)
            var size = new FileInfo(sourceFile).Length;
            if (await FileExistsOnMasterAsync(masterEndpoint, filename, size))
            {
                _logger.LogDebug("Already on Master, skipping: {File}", sourceFile);
                return;
            }

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

            _logger.LogInformation("Importing ({Mode}) {Source} → {Target}", transferMode, sourceFile, targetFile);
            Directory.CreateDirectory(targetDir);
            if (transferMode == "move")
                File.Move(sourceFile, targetFile, overwrite: false);
            else
                File.Copy(sourceFile, targetFile, overwrite: false);

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
