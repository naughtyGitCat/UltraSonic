
using LrWallPaper.Models;
using Netimobiledevice.Usbmuxd;
using Netimobiledevice;
using Netimobiledevice.Afc;
using Netimobiledevice.Lockdown;
using LrWallPaper.Helpers;
using LrWallPaper.Services;

namespace LrWallPaper.Jobs
{
    public class SyncAppleJob : BackgroundService
    {
        private readonly ILogger<SyncAppleJob> _logger;
        private readonly FileMD5Manager _fileRecordManager;
        public SyncAppleJob(FileMD5Manager fileMD5Manager,ILogger<SyncAppleJob> logger) 
        {
            _logger = logger;
            _fileRecordManager = fileMD5Manager;
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
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested) 
            {
                foreach (var device in GetCurrentAppleDevices()) 
                {
                    using var lockdownClient = MobileDevice.CreateUsingUsbmux(device.DeviceId);
                    using var afc = new AfcService(lockdownClient);
                    var iosProductName = lockdownClient.ProductFriendlyName;
                    var directories = afc.GetDirectoryList();
                    var files = afc.LsDirectory("DCIM", depth: 2);
                    foreach (var file in files)
                    {
                        _logger.LogDebug("file: {f}",file);
                        if (afc.IsDir(file)) continue; 
                        var filename = Path.GetFileName(file);
                        var fileInfo = afc.GetFileInfo(file);
                        var existSameNameFiles = await _fileRecordManager.GetFileMD5EntityAsync(filename);
                        if (existSameNameFiles.Any(esf => esf.FileSize.ToString() == fileInfo["st_size"].ToString() && esf.FileName == filename))
                        {
                            _logger.LogDebug("file {cf} already exist", file);
                            continue;
                        }
                        try
                        {
                            var tmpFile = @$"F:\{filename}";
                            afc.Pull(file, tmpFile);
                            var tmpExif = EXIFHelper.GetEXIFInfo(@$"F:\{filename}");
                            if (tmpExif.CameraMaker == "Apple" && tmpExif.CameraModel == iosProductName)
                            {
                                _logger.LogInformation("this is a picture shot by this phone");
                                if (tmpExif.PhotoDateTime is null) continue;
                                var targetFile = Path.Join(@"D:\Photograph", tmpExif.PhotoDateTime.Value.Year.ToString(), $"{tmpExif.PhotoDateTime}:yyyy-MM-dd", filename);
                                Directory.Move(tmpFile, targetFile);
                                // calc target file exif and md5 save to db
                            }
                            Directory.Delete(tmpFile, true);
                        }
                        catch (Exception e)
                        {
                            _logger.LogWarning(e, "pull file {f} failed",file);
                        }
                        finally
                        {
                            // remove tmp file
                        }
                        
                    }
                }
                await Task.Delay(new TimeSpan(0, 1, 1),stoppingToken);
            }
        }
    }
}
