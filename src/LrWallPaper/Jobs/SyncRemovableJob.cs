
using LrWallPaper.Models;

using MediaDevices;

using Netimobiledevice;
using Netimobiledevice.Usbmuxd;

namespace LrWallPaper.Jobs
{
    public class SyncRemovableJob : BackgroundService
    {
        private readonly RemovableDeviceDO[] _removableDevices;
        private readonly ILogger<SyncRemovableJob> _logger;
        public SyncRemovableJob(ILogger<SyncRemovableJob> logger) 
        {
            _logger = logger;
            _removableDevices = Array.Empty<RemovableDeviceDO>();
        }

        private List<RemovableDeviceDO> GetCurrentRemovableDevices()
        {
            var currentRemovableDevices = new List<RemovableDeviceDO>();
            var devices = MediaDevice.GetDevices();
            foreach (var device in devices)
            {
                if (device.Manufacturer == "Apple Inc.") continue;
                currentRemovableDevices.Add(new()
                {
                    DeviceId = "",
                    FriendlyName = device.FriendlyName,
                    Description = device.Description,
                    Manufacturer = device.Manufacturer
                });
            }
            return currentRemovableDevices;
        }

        private IEnumerable<RemovableDeviceDO> GetCurrentAppleDevices() 
        {
            var all = new List<RemovableDeviceDO>();
            var devices = Usbmux.GetDeviceList();
            foreach (var device in devices)
            {
                try
                {
                    using var lockdownClient = MobileDevice.CreateUsingUsbmux(device.Serial);
                    all.Add( new RemovableDeviceDO
                    {
                        DeviceId = device.Serial,
                        Description = lockdownClient.DeviceName,
                        FriendlyName = lockdownClient.ProductFriendlyName,
                        Manufacturer = "Apple Inc."
                    });
                }
                catch (Netimobiledevice.Exceptions.FatalPairingException e)
                {
                    _logger.LogWarning(e, "pair failed");
                    continue;
                }
            }
            return all;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested) 
            {
                var appleDevice = GetCurrentAppleDevices();
                var otherDevice = GetCurrentRemovableDevices();
                var currentRemovableDevices  = appleDevice.Union(otherDevice);
                var newDevicess =  currentRemovableDevices.Where(c=>!_removableDevices.Contains(c));
                if (newDevicess.Any()) 
                {
                    foreach (var device in newDevicess) 
                    {
                        _logger.LogInformation("new device: {d}", device);
                    }

                }
                await Task.Delay(new TimeSpan(0,0,8), stoppingToken);
            }
        }
    }
}
