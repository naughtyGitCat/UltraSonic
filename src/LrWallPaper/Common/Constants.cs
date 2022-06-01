namespace LrWallPaper.Common
{
    public static class ImageSuffixes
    {
        public static readonly IEnumerable<string> CanonSuffixes = new[] { "cr2", "cr3" };
        public static readonly IEnumerable<string> CommonSuffixes = new[] { "jpg", "jpeg", "png", "bmp", "gif" };
        public static readonly IEnumerable<string> SonySuffixes = new[] { "arw", "sr2", "srf" };
        public static readonly IEnumerable<string> NikonSuffixes = new[] { "nef", "nrw" };
        public static readonly IEnumerable<string> FujiSuffixes = new[] { "raf" };
        public static readonly IEnumerable<string> PentaxSuffixes = new[] { "pef" };
        public static readonly IEnumerable<string> PanasonicSuffixes = new[] { "rw2" };
        public static readonly IEnumerable<string> OlympusSuffixes = new[] { "orf" };
    }

    public static class DeviceShotPaths
    {
        public const string Andriod = "DCIM/Camera";
        public const string Apple = "DCIM/100Apple";
    }

    public static class ArchivePaths
    {
        public const string Current = "D:/摄影";
        public const string History = "X:/摄影";
    }
}
