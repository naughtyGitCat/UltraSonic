using Netimobiledevice.Usbmuxd;
namespace LrWallPaper.Helpers
{
    public record DeviceFingerprint
    {
        public string Name { set; get; }
    }
    
    public interface IDeviceHelper
    {
        public object GetMobilePhoneInfo();
    }

    public class DeviceHelper
    {
        private object GetAndroidInfo() 
        {
            throw new NotImplementedException();
        }
        private object GetIOSInfo()
        {
            // https://github.com/artehe/Netimobiledevice
            var devices = Usbmux.GetDeviceList();
            Console.WriteLine($"There's {devices.Count} devices connected");
            foreach (var device in devices) {
                Console.WriteLine($"Device found: {device.DeviceId} - {device.Serial}");
            }
            return null;
        }
    }
}

