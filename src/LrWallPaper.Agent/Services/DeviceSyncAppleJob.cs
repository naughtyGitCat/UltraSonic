using System.Net.Http.Json;
using System.Reflection;
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
    private readonly HttpClient _httpClient = new();

    public DeviceSyncAppleJob(ILogger<DeviceSyncAppleJob> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
        _httpClient.ApplyServiceKey(_configuration);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            var masterEndpoint = _configuration["Agent:MasterEndpoint"] ?? "http://localhost:5281";
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
                foreach (var device in GetAppleDevices())
                {
                    await SyncDeviceAsync(device, masterEndpoint, agentId, tempDir, archiveDir, stoppingToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Apple device sync failed");
            }

            await Task.Delay(new TimeSpan(1, 5, 8), stoppingToken);
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
                // iOS screenshots are PNG — skip to avoid unnecessary download (EXIF check below is backup)
                if (Path.GetExtension(filename).Equals(".png", StringComparison.OrdinalIgnoreCase)) continue;

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

                    // Cheap device-match precheck: read only the file head via AFC
                    // and parse EXIF Make/Model. Saves the full bulk download for
                    // files not shot by this device (e.g. AirDrop'd content).
                    // Returns: true=match, false=mismatch, null=undetermined.
                    var headMatch = TryIsShotByThisDevice(afc, file, productName, tempDir);
                    if (headMatch == false)
                    {
                        _logger.LogDebug("Not shot by this device (head-EXIF), skipping: {File}", file);
                        continue;
                    }
                    // null falls through to the full pull + post-pull recheck below
                    // (covers cases where head bytes had no EXIF or partial-read failed).

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

    // --------------- partial-pull device match (root-cause fix for pull-then-discard) ---------------

    // Netimobiledevice's AfcService exposes FileOpen / FileClose publicly but
    // keeps FileRead non-public. We reach it via reflection so we can sample a
    // small file head (EXIF) without downloading the whole file. If the package
    // ever changes shape, every helper here returns null / false-positive-safe
    // values, and the caller falls back to the original full-pull path.
    private static MethodInfo? _afcFileOpen;
    private static MethodInfo? _afcFileRead;
    private static MethodInfo? _afcFileClose;
    private static bool _reflectInitialized;
    private const int HeadSampleBytes = 2 * 1024 * 1024; // 2 MB is enough for HEIC/JPEG/iPhone-MOV (fast-start moov)

    private static void EnsureReflection()
    {
        if (_reflectInitialized) return;
        _reflectInitialized = true;
        var t = typeof(AfcService);
        _afcFileOpen  = t.GetMethod("FileOpen",  BindingFlags.Instance | BindingFlags.Public);
        _afcFileRead  = t.GetMethod("FileRead",  BindingFlags.Instance | BindingFlags.NonPublic);
        _afcFileClose = t.GetMethod("FileClose", BindingFlags.Instance | BindingFlags.Public);
    }

    private byte[]? TryReadRemoteHead(AfcService afc, string remotePath, int maxBytes)
    {
        EnsureReflection();
        if (_afcFileOpen is null || _afcFileRead is null || _afcFileClose is null) return null;
        try
        {
            // FileOpen(string path, string mode) -> ulong handle; "r" = read
            var handleObj = _afcFileOpen.Invoke(afc, [remotePath, "r"]);
            if (handleObj is not ulong handle) return null;
            try
            {
                using var ms = new MemoryStream();
                const int chunk = 64 * 1024;
                while (ms.Length < maxBytes)
                {
                    var part = _afcFileRead.Invoke(afc, [handle, (ulong)chunk]) as byte[];
                    if (part is null || part.Length == 0) break;
                    ms.Write(part, 0, part.Length);
                }
                return ms.ToArray();
            }
            finally
            {
                try { _afcFileClose.Invoke(afc, [handle]); } catch { /* best-effort */ }
            }
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "AFC partial-read unavailable; will fall back to full pull");
            return null;
        }
    }

    private bool? TryIsShotByThisDevice(AfcService afc, string remotePath, string productName, string tempDir)
    {
        var head = TryReadRemoteHead(afc, remotePath, HeadSampleBytes);
        if (head is null || head.Length < 1024) return null;

        // Persist the sample to a sniff file so we can reuse MediaHelpers.ReadExif (path-based).
        var sniff = Path.Combine(tempDir, ".sniff_" + Guid.NewGuid().ToString("N") + Path.GetExtension(remotePath));
        try
        {
            Directory.CreateDirectory(tempDir);
            File.WriteAllBytes(sniff, head);
            var exif = MediaHelpers.ReadExif(sniff);
            if (string.IsNullOrEmpty(exif.CameraMaker) || string.IsNullOrEmpty(exif.CameraModel))
                return null; // undetermined — head didn't contain a parseable Make/Model
            return exif.CameraMaker == "Apple" && exif.CameraModel == productName;
        }
        catch
        {
            return null;
        }
        finally
        {
            try { File.Delete(sniff); } catch { /* best-effort */ }
        }
    }

    private record FileExistsResponse(bool Exists);
}
