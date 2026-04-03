using System.Net.Http.Json;
using LrWallPaper.Agent.Helpers;
using Netimobiledevice;
using Netimobiledevice.Afc;
using Netimobiledevice.Lockdown;
using Netimobiledevice.Usbmuxd;

namespace LrWallPaper.Agent.Services;

/// <summary>
/// Pulls photos/videos from connected Apple (iOS) devices, archives them locally,
/// and pushes metadata to the Master node.
/// </summary>
public class DeviceSyncAppleJob : BackgroundService
{
    private readonly ILogger<DeviceSyncAppleJob> _logger;
    private readonly IConfiguration _configuration;
    private readonly ClusterDiscoveryService _discovery;
    private readonly DeviceSyncTrigger _trigger;
    private readonly HttpClient _httpClient = new();

    public DeviceSyncAppleJob(
        ILogger<DeviceSyncAppleJob> logger,
        IConfiguration configuration,
        ClusterDiscoveryService discovery,
        DeviceSyncTrigger trigger)
    {
        _logger = logger;
        _configuration = configuration;
        _discovery = discovery;
        _trigger = trigger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            var masterEndpoint = _discovery.GetMasterEndpoint()
                ?? _configuration["Agent:MasterEndpoint"]
                ?? "http://localhost:5281";
            var agentId = _configuration["Agent:AgentId"] ?? "local";
            var tempDir = _configuration["DeviceSync:AppleImport:TempDirectory"] ?? Path.GetTempPath();
            var archiveDir = _configuration["DeviceSync:AppleImport:ArchiveDirectory"] ?? "";

            if (string.IsNullOrEmpty(archiveDir))
            {
                _logger.LogWarning("DeviceSync:AppleImport:ArchiveDirectory is not configured. Skipping Apple sync.");
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
                continue;
            }

            try
            {
                var devices = GetAppleDevices().ToList();
                foreach (var device in devices)
                {
                    await SyncDeviceAsync(device, masterEndpoint, agentId, tempDir, archiveDir, stoppingToken);
                }

                if (devices.Count > 0)
                {
                    await NotifyMasterAsync(masterEndpoint,
                        "iOS 设备同步完成",
                        $"Agent [{agentId}] 完成 {devices.Count} 台 Apple 设备的同步",
                        "device-sync");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Apple device sync failed");
            }

            // Wait for next polling interval or external trigger (whichever comes first)
            await _trigger.WaitAsync(new TimeSpan(1, 5, 8), stoppingToken);
        }
    }

    private IEnumerable<string> GetAppleDevices()
    {
        List<string> serials = [];
        try
        {
            foreach (var device in Usbmux.GetDeviceList())
            {
                serials.Add(device.Serial);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to enumerate Apple devices");
        }
        return serials;
    }

    private async Task SyncDeviceAsync(string serial, string masterEndpoint, string agentId,
        string tempDir, string archiveDir, CancellationToken ct)
    {
        try
        {
            using var lockdown = MobileDevice.CreateUsingUsbmux(serial);
            using var afc = new AfcService(lockdown);
            var productName = lockdown.ProductFriendlyName;

            _logger.LogInformation("Connected to Apple device: {Serial} ({Name})", serial, productName);

            var files = afc.LsDirectory("DCIM", depth: 2);
            var batch = new List<object>();

            foreach (var file in files)
            {
                if (ct.IsCancellationRequested) break;
                if (afc.IsDir(file)) continue;

                var filename = Path.GetFileName(file);
                if (filename.StartsWith('.') || filename.EndsWith(".aae", StringComparison.OrdinalIgnoreCase)) continue;
                if (!MediaHelpers.PossibleSuffixes.Contains(Path.GetExtension(filename))) continue;

                try
                {
                    var fileInfo = afc.GetFileInfo(file);
                    var size = (long)fileInfo["st_size"].AsIntegerNode().Value;

                    // Check with Master before pulling to avoid redundant downloads
                    if (await FileExistsOnMasterAsync(masterEndpoint, filename, size))
                    {
                        _logger.LogDebug("Already on Master, skipping: {File}", file);
                        continue;
                    }

                    var tmpFile = Path.Combine(tempDir, filename);
                    _logger.LogDebug("Pulling {File} from device to {Tmp}", file, tmpFile);
                    afc.Pull(file, tmpFile);

                    try
                    {
                        var exif = MediaHelpers.ReadExif(tmpFile);
                        if (exif.CameraMaker != "Apple" || exif.CameraModel != productName)
                        {
                            _logger.LogDebug("Not shot by this device, skipping: {File}", file);
                            continue;
                        }

                        if (exif.PhotoDateTime is null) continue;

                        var targetFile = Path.Combine(
                            archiveDir,
                            exif.PhotoDateTime.Value.Year.ToString(),
                            exif.PhotoDateTime.Value.ToString("yyyy-MM-dd"),
                            filename);

                        Directory.CreateDirectory(Path.GetDirectoryName(targetFile)!);
                        File.Move(tmpFile, targetFile, overwrite: false);

                        var md5 = MediaHelpers.ComputeMD5(targetFile);
                        batch.Add(new
                        {
                            FileFullPath = targetFile,
                            FilePath = Path.GetDirectoryName(targetFile) ?? "",
                            FileName = filename,
                            CameraMaker = exif.CameraMaker ?? "",
                            CameraModel = productName ?? "",
                            LensModel = exif.LensModel ?? "",
                            AgentId = agentId,
                            FileSize = exif.FileSize ?? new FileInfo(targetFile).Length,
                            FileMD5 = md5,
                            CaptureTime = exif.PhotoDateTime.Value
                        });

                        if (batch.Count >= 20)
                        {
                            await PushBatchAsync(masterEndpoint, batch, ct);
                            batch.Clear();
                        }
                    }
                    finally
                    {
                        if (File.Exists(tmpFile)) File.Delete(tmpFile);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to process Apple file: {File}", file);
                }
            }

            if (batch.Count > 0)
                await PushBatchAsync(masterEndpoint, batch, ct);
        }
        catch (Netimobiledevice.Exceptions.FatalPairingException ex)
        {
            _logger.LogWarning(ex, "Apple device {Serial} is not paired", serial);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error syncing Apple device {Serial}", serial);
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
            _logger.LogInformation("Pushed {Count} Apple import records — HTTP {Status}",
                batch.Count, (int)response.StatusCode);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to push Apple import batch to Master");
        }
    }

    private async Task NotifyMasterAsync(string masterEndpoint, string title, string body, string group)
    {
        try
        {
            var url = $"{masterEndpoint.TrimEnd('/')}/api/master/notify";
            await _httpClient.PostAsJsonAsync(url, new { title, body, group });
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to send notification to Master");
        }
    }

    private record FileExistsResponse(bool Exists);
}
