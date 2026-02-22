
using LrWallPaper.Models;
using Netimobiledevice.Usbmuxd;
using Netimobiledevice;
using Netimobiledevice.Afc;
using Netimobiledevice.Lockdown;
using LrWallPaper.Helpers;
using LrWallPaper.Services;
using Newtonsoft.Json;

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
                catch (Exception e)
                {
                    _logger.LogError(e, "Error initializing Apple device: {DeviceSerial}", device.Serial);
                    continue;
                }
            }
            return all;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested) 
            {
                await Task.Delay(8, stoppingToken);
                foreach (var device in GetCurrentAppleDevices()) 
                {
                    using var lockdownClient = MobileDevice.CreateUsingUsbmux(device.DeviceId!);
                    using var afc = new AfcService(lockdownClient);
                    var iosProductName = lockdownClient.ProductFriendlyName;
                    var directories = afc.GetDirectoryList();
                    var files = afc.LsDirectory("DCIM", depth: 2);
                    foreach (var file in files)
                    {
                        _logger.LogDebug("loop handling ios file: {f}",file);
                        if (afc.IsDir(file)) continue; 
                        var filename = Path.GetFileName(file);

                        // DCIM seems contains .AAE file
                        // https://fileinfo.com/extension/aae
                        // An AAE file is a record of the edits a user has made to an image in the iOS version of Apple Photos. It is used to non-destructively transfer edits from iOS to macOS, so a user can revert their image to its original form if needed. AAE files are stored alongside the images whose edits they contain.
                        // we ignore this delta file
                        if (filename.ToLower().EndsWith(".aae")) continue;

                        var fileInfo = afc.GetFileInfo(file);
                        var existSameNameFiles = await _fileRecordManager.GetFileMD5EntityAsync(filename);
                        if (existSameNameFiles.Any(esf => (Convert.ToUInt64(esf.FileSize) == fileInfo["st_size"].AsIntegerNode().Value) && (esf.FileName == filename)))
                        {
                            _logger.LogDebug("file {cf} already exist", file);
                            continue;
                        }
                        var tmpFile = @$"F:\{filename}";
                        try
                        {
                            _logger.LogDebug("now pull file {i} from ios to tmp file {t}", file, tmpFile);
                            afc.Pull(file, tmpFile);
                            var tmpExif = Path.GetExtension(@$"F:\{filename}").ToLower() == ".mov" ? AppleLivePhotoHelper.GetLiveQuickTimeInfo(@$"F:\{filename}") : EXIFHelper.GetEXIFInfo(@$"F:\{filename}");
                            if (tmpExif.CameraMaker == "Apple" && tmpExif.CameraModel == iosProductName)
                            {
                                _logger.LogInformation("this is a picture shot by this phone");
                                if (tmpExif.PhotoDateTime is null) continue;
                                var targetFile = Path.Join(@"D:\Photograph", tmpExif.PhotoDateTime.Value.Year.ToString(), $"{tmpExif.PhotoDateTime:yyyy-MM-dd}", filename);
                                _logger.LogDebug("tmpFile: {t}, targetFile: {g}", tmpFile, targetFile);
                                Directory.CreateDirectory(Path.GetDirectoryName(targetFile));
                                File.Move(tmpFile, targetFile);
                                var targetMD5 =FileHelper.GetMD5(targetFile);
                                await _fileRecordManager.SaveFileMD5Async(new FileMD5Entity
                                {
                                    FilePath = Path.GetDirectoryName(targetFile),
                                    FileName = Path.GetFileName(targetFile),
                                    CameraMaker = tmpExif.CameraMaker,
                                    CameraModel = iosProductName,
                                    LensModel = tmpExif.LensModel??"",
                                    FileSize = tmpExif.FileSize??0,
                                    FileMD5 = targetMD5,
                                    CaptureTime=tmpExif.PhotoDateTime??DateTime.MinValue
                                });
                            }
                            _logger.LogDebug("try to remove tmp file {t}", tmpFile);
                            if (File.Exists(tmpFile))
                            {
                                File.Delete(tmpFile);
                            }
                        }
                        catch (Exception e)
                        {
                            _logger.LogWarning(e, "pull file {f} failed",file);
                            throw;
                        }
                        finally
                        {
                            // comment for debug pull file DCIM/105APPLE/IMG_5780.MOV failed
                            //_logger.LogDebug("try to remove tmp file {t}", tmpFile);
                            //if (File.Exists(tmpFile))
                            //{
                            //    File.Delete(tmpFile);
                            //}
                        }

                    }
                }
                await Task.Delay(new TimeSpan(1, 5, 8),stoppingToken);
            }
        }
    }
}
