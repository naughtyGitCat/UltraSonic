
namespace LrWallPaper.Models
{
    public record RemovableDeviceDO
    {
        public string? DeviceId { get; set; }
        public string? FriendlyName { get; set; }
        public string? Description { get; set; }
        public string? Manufacturer { get; set; }
    }

    public record RemovableDeviceConfigEntity : RemovableDeviceDO
    {
        public string? Comment { get; set; }
        public bool IsIgnore { get; set; }
    }

    public record RemovableDeviceHisotoryEntity : RemovableDeviceDO
    {
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
    }
}
