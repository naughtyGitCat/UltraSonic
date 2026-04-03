namespace LrWallPaper.Models;

public class UltraSonicConfig
{
    public LocalScanConfig LocalScan { get; set; } = new();
    public AppleImportConfig AppleImport { get; set; } = new();
    public LightroomConfig Lightroom { get; set; } = new();
    public ArchivePathsConfig ArchivePaths { get; set; } = new();
}

public class LocalScanConfig
{
    public List<string> RootDirectories { get; set; } = new();
    public List<string> SkipDirectories { get; set; } = new();
}

public class AppleImportConfig
{
    public string TempDirectory { get; set; } = "";
    public string ArchiveDirectory { get; set; } = "";
}

public class LightroomConfig
{
    public string CatalogPath { get; set; } = "";
}

public class ArchivePathsConfig
{
    public string Current { get; set; } = "";
    public string History { get; set; } = "";
}
