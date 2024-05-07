namespace LrWallPaper.Helpers
{
    public record DeviceFingerprint
    {
        public string Name { set; get; }
        public interface IDeviceHelper
        {
            public object GetMobilePhoneInfo();
        }
    }

    public class DeviceHelper
    {
        private object GetAndriodInfo() 
        {
            throw new NotImplementedException();
        }
        private object GetIOSInfo()
        {
                throw new NotImplementedException();
        }
    }
}

