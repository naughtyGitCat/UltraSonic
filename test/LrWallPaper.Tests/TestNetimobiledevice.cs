// // zhangruizhi 2024-08-14
using System.Linq.Expressions;
using Netimobiledevice;
using Netimobiledevice.Afc;
using Netimobiledevice.Lockdown;
using Xunit;
using Xunit.Abstractions;
using Netimobiledevice.Usbmuxd;
using Newtonsoft.Json;
namespace LrWallPaper.Tests;

public class TestNetimobiledevice
{
    private readonly ITestOutputHelper _testOutputHelper;
    public TestNetimobiledevice(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public void GetIDeviceInfo()
    {
        var devices = Usbmux.GetDeviceList();
        _testOutputHelper.WriteLine($"There's {devices.Count} devices connected");
        foreach (var device in devices) {
            _testOutputHelper.WriteLine($"Device found: {device.DeviceId} - {device.Serial}");
            using var lockdownClient = MobileDevice.CreateUsingUsbmux(device.Serial);
            _testOutputHelper.WriteLine($"DeviceName: {lockdownClient.DeviceName}");
            _testOutputHelper.WriteLine($"OsVersion: {lockdownClient.OsVersion}");
            _testOutputHelper.WriteLine($"ProductType: {lockdownClient.ProductType}");
            _testOutputHelper.WriteLine($"ProductFriendlyName: {lockdownClient.ProductFriendlyName}");
        }
        // output:
        // There's 1 devices connected
        // Device found: 59 - 000O0O00-000O000O0000O00O
        // DeviceName: pineapple
        // OsVersion: 17.3
        // ProductType: iPhone15,2
        // ProductFriendlyName: iPhone 14 Pro
    }

    [Fact]
    public void GetFiles()
    {
        var devices = Usbmux.GetDeviceList();
        foreach (var device in devices)
        {
            using var lockdownClient = MobileDevice.CreateUsingUsbmux(device.Serial);
            using var afc = new AfcService(lockdownClient);
            var directories = afc.GetDirectoryList();
            _testOutputHelper.WriteLine($"directories: {JsonConvert.SerializeObject(directories)}");
            // directories: [".","..","Podcasts","Downloads","Books","Photos","Deferred","Music","EnhancedAudioSharedKeys","Recordings","PhotoStreamsData","Radio","ManagedPurchases","Espresso","DCIM","iTunes_Control","MediaAnalysis","PhotoData","PublicStaging","Purchases","AirFair"]
           var files = afc.LsDirectory("DCIM", depth:2);
           foreach (var file in files)
           {
               if (afc.IsDir(file))continue;
               var fileInfo = afc.GetFileInfo(file);
               _testOutputHelper.WriteLine($"{file} file info: {JsonConvert.SerializeObject(fileInfo, Formatting.Indented)}");
               // DCIM/105APPLE/IMG_5027.JPG file info: {
               //     "st_ifmt": {
               //         "Value": "S_IFREG"
               //     },
               //     "st_size": {
               //         "Value": 148864,
               //         "Unsigned": true
               //     },
               //     "st_blocks": {
               //         "Value": 296,
               //         "Unsigned": true
               //     },
               //     "st_nlink": {
               //         "Value": 1,
               //         "Unsigned": true
               //     },
               //     "st_mtime": {
               //         "Value": "2023-12-09T12:33:22.652+08:00"
               //     },
               //     "st_birthtime": {
               //         "Value": "2023-12-09T12:33:22.651+08:00"
               //     }
               // }
               break;
           }
        }
    }
}
