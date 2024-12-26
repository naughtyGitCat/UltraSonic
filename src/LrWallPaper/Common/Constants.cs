namespace LrWallPaper.Common
{
    public static class ImageSuffixes
    {
        public static readonly IEnumerable<string> CanonSuffixes = [".cr2", ".cr3"];
        public static readonly IEnumerable<string> CommonSuffixes = [".jpg", ".jpeg", ".png", ".bmp", ".gif", ".heic", 
            // .mov for live photo
            ".mov"];
        public static readonly IEnumerable<string> SonySuffixes = [".arw", ".sr2", ".srf"];
        public static readonly IEnumerable<string> NikonSuffixes = [".nef", ".nrw"];
        public static readonly IEnumerable<string> FujiSuffixes = [".raf"];
        public static readonly IEnumerable<string> PentaxSuffixes = [".pef"];
        public static readonly IEnumerable<string> PanasonicSuffixes = [".rw2"];
        public static readonly IEnumerable<string> OlympusSuffixes = [".orf"];
        public static readonly IEnumerable<string> PossibleSuffixes = [
            ..CanonSuffixes, 
            ..CommonSuffixes, 
            ..SonySuffixes, 
            ..NikonSuffixes, 
            ..FujiSuffixes, 
            ..PentaxSuffixes, 
            ..PanasonicSuffixes, 
            ..OlympusSuffixes];
    }

    public static class DeviceShotPaths
    {
        public const string Android = "DCIM/Camera";
        public const string Apple = "DCIM/100Apple";
    }

    public static class ArchivePaths
    {
        public const string Current = "D:/摄影";
        public const string History = "X:/摄影";
    }
}
