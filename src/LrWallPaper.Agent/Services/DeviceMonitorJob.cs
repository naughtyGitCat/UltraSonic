using System.Net.Http.Json;
using Netimobiledevice.Usbmuxd;

namespace LrWallPaper.Agent.Services;

/// <summary>
/// Lightweight device monitor that polls for newly connected iOS devices and
/// removable drives (SD cards, cameras). When a new device appears, it notifies
/// the Master so the user can decide to trigger a sync.
/// </summary>
public class DeviceMonitorJob : BackgroundService
{
    private readonly ILogger<DeviceMonitorJob> _logger;
    private readonly IConfiguration _configuration;
    private readonly ClusterDiscoveryService _discovery;
    private readonly HttpClient _httpClient = new();

    // Previously seen devices (serial or drive name)
    private readonly HashSet<string> _knownDevices = new();

    public DeviceMonitorJob(
        ILogger<DeviceMonitorJob> logger,
        IConfiguration configuration,
        ClusterDiscoveryService discovery)
    {
        _logger = logger;
        _configuration = configuration;
        _discovery = discovery;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Delay(TimeSpan.FromSeconds(8), stoppingToken);
        _logger.LogInformation("DeviceMonitorJob started — polling for new devices");

        // Snapshot current devices on startup so we don't notify for already-connected ones
        SnapshotCurrentDevices();

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CheckForNewDevices(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Device monitor poll failed");
            }

            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }
    }

    private void SnapshotCurrentDevices()
    {
        foreach (var id in EnumerateAppleDevices())
            _knownDevices.Add(id);
        foreach (var id in EnumerateRemovableDrives())
            _knownDevices.Add(id);
    }

    private async Task CheckForNewDevices(CancellationToken ct)
    {
        var currentDevices = new HashSet<string>();
        var newDevices = new List<DeviceInfo>();

        foreach (var (id, info) in EnumerateAppleDevicesWithInfo())
        {
            currentDevices.Add(id);
            if (!_knownDevices.Contains(id))
            {
                newDevices.Add(info);
                _logger.LogInformation("New Apple device detected: {Name} ({Serial})", info.Name, id);
            }
        }

        foreach (var (id, info) in EnumerateRemovableDrivesWithInfo())
        {
            currentDevices.Add(id);
            if (!_knownDevices.Contains(id))
            {
                newDevices.Add(info);
                _logger.LogInformation("New removable drive detected: {Name} ({Id})", info.Name, id);
            }
        }

        // Detect removed devices
        var removedDevices = _knownDevices.Except(currentDevices).ToList();
        foreach (var removed in removedDevices)
        {
            _logger.LogInformation("Device disconnected: {Id}", removed);
        }

        // Update known set
        _knownDevices.Clear();
        foreach (var id in currentDevices)
            _knownDevices.Add(id);

        // Notify Master for each new device
        if (newDevices.Count > 0)
        {
            var masterEndpoint = _discovery.GetMasterEndpoint()
                ?? _configuration["Agent:MasterEndpoint"]
                ?? "http://localhost:5281";
            var agentId = _configuration["Agent:AgentId"] ?? Environment.MachineName;

            foreach (var device in newDevices)
            {
                await NotifyMasterAsync(masterEndpoint, agentId, device, ct);
            }
        }
    }

    private async Task NotifyMasterAsync(string masterEndpoint, string agentId, DeviceInfo device, CancellationToken ct)
    {
        try
        {
            var agentEndpoint = _configuration["Cluster:HttpEndpoint"]
                ?? _configuration["Urls"]
                ?? "http://localhost:5245";

            var url = $"{masterEndpoint.TrimEnd('/')}/api/master/notify";
            await _httpClient.PostAsJsonAsync(url, new
            {
                title = $"检测到{device.Type}接入",
                body = $"设备: {device.Name}\nAgent: [{agentId}]\n\n可在 Master 控制面板触发同步",
                group = "device-detected"
            }, ct);

            // Also report device to Master's device-detected endpoint
            var reportUrl = $"{masterEndpoint.TrimEnd('/')}/api/master/device-detected";
            await _httpClient.PostAsJsonAsync(reportUrl, new
            {
                AgentId = agentId,
                AgentEndpoint = agentEndpoint,
                DeviceId = device.Id,
                DeviceName = device.Name,
                DeviceType = device.Type,
                DetectedAt = DateTime.Now
            }, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to notify Master about new device");
        }
    }

    private IEnumerable<(string id, DeviceInfo info)> EnumerateAppleDevicesWithInfo()
    {
        List<(string, DeviceInfo)> result = [];
        try
        {
            foreach (var device in Usbmux.GetDeviceList())
            {
                result.Add((
                    $"apple:{device.Serial}",
                    new DeviceInfo($"apple:{device.Serial}", device.Serial, "iOS 设备")
                ));
            }
        }
        catch (Exception ex) { _logger.LogDebug(ex, "Failed to enumerate Apple devices"); }
        return result;
    }

    private IEnumerable<(string id, DeviceInfo info)> EnumerateRemovableDrivesWithInfo()
    {
        List<(string, DeviceInfo)> result = [];
        try
        {
            foreach (var drive in DriveInfo.GetDrives().Where(d => d.IsReady && d.DriveType == DriveType.Removable))
            {
                var dcimPath = Path.Combine(drive.Name, "DCIM");
                if (!Directory.Exists(dcimPath)) continue;

                var id = $"removable:{drive.Name}";
                var label = string.IsNullOrEmpty(drive.VolumeLabel) ? drive.Name : $"{drive.VolumeLabel} ({drive.Name})";
                result.Add((id, new DeviceInfo(id, label, "可移动存储")));
            }
        }
        catch (Exception ex) { _logger.LogDebug(ex, "Failed to enumerate removable drives"); }
        return result;
    }

    private IEnumerable<string> EnumerateAppleDevices()
        => EnumerateAppleDevicesWithInfo().Select(x => x.id);

    private IEnumerable<string> EnumerateRemovableDrives()
        => EnumerateRemovableDrivesWithInfo().Select(x => x.id);

    private record DeviceInfo(string Id, string Name, string Type);
}
