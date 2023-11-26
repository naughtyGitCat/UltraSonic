namespace LrWallPaper.Services
{
    public interface IDeviceService
    {
        public IEnumerable<object> GetCurrentDevices();
        public IEnumerable<object> GetHistoryDevices();
    }


    public class DeviceService : IDeviceService
    {
        private readonly ILogger<DeviceService> _logger;
        public DeviceService(ILogger<DeviceService> logger)
        {
            _logger = logger;
        }
        public IEnumerable<object> GetCurrentDevices()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<object> GetHistoryDevices()
        {
            throw new NotImplementedException();
        }
    }
}
