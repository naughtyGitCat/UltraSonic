
using LrWallPaper.Models;
using Netimobiledevice.Usbmuxd;
using Netimobiledevice;
using Netimobiledevice.Afc;
using Netimobiledevice.Lockdown;
using LrWallPaper.Helpers;

namespace LrWallPaper.Jobs
{
    public class SyncAppleJob : BackgroundService
    {
        private readonly ILogger<SyncAppleJob> _logger;
        public SyncAppleJob(ILogger<SyncAppleJob> logger) 
        {
            _logger = logger;
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
                    all.Add(new RemovableDeviceDO
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
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested) 
            {
                foreach (var device in GetCurrentAppleDevices()) 
                {
                    using var lockdownClient = MobileDevice.CreateUsingUsbmux(device.DeviceId);
                    using var afc = new AfcService(lockdownClient);
                    var directories = afc.GetDirectoryList();
                    var files = afc.LsDirectory("DCIM", depth: 2);
                    foreach (var file in files)
                    {
                        _logger.LogDebug("file: {f}",file);
                        if (afc.IsDir(file)) continue;
                        if (Path.GetFileName(file) == "IMG_0002.JPG")
                        {
                            var fileInfo = afc.GetFileInfo(file);
                            var exif=EXIFHelper.GetEXIFInfo(@"D:\Photograph\2022\2022-05-14\IMG_0002.JPG");
                            _logger.LogInformation("afc file size: {st},exif file size: {ex}", fileInfo["st_size"], exif.FileSize);
                            break;
                        }
                        // var fileInfo = afc.GetFileInfo(file); 
                    }
                    break;
                }
            }
            throw new NotImplementedException();
        }
    }
}
