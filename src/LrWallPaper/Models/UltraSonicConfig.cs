namespace LrWallPaper.Models;

public class UltraSonicConfig
{
    public LocalScanConfig LocalScan { get; set; } = new();
    public AppleImportConfig AppleImport { get; set; } = new();
    public LightroomConfig Lightroom { get; set; } = new();
    public ArchivePathsConfig ArchivePaths { get; set; } = new();
    public RecognitionConfig Recognition { get; set; } = new();
    public FaceRecognitionConfig FaceRecognition { get; set; } = new();
    public BackupConfig Backup { get; set; } = new();
}

public class RecognitionConfig
{
    public string Provider { get; set; } = "Claude";
    public Dictionary<string, string> ApiKeys { get; set; } = new()
    {
        ["Claude"] = "",
        ["OpenAI"] = "",
        ["Gemini"] = ""
    };
    public Dictionary<string, string> Models { get; set; } = new()
    {
        ["Claude"] = "claude-sonnet-4-20250514",
        ["OpenAI"] = "gpt-4o",
        ["Gemini"] = "gemini-2.0-flash"
    };
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

public class FaceRecognitionConfig
{
    public string Provider { get; set; } = "Claude";
    public bool AutoDetect { get; set; } = false;
    public double ConfidenceThreshold { get; set; } = 0.7;
}

public class BackupConfig
{
    public bool Enabled { get; set; } = false;
    public string Provider { get; set; } = "115";
    public string Cookie { get; set; } = "";
    public string RemoteBasePath { get; set; } = "/UltraSonic";
    public bool AutoBackup { get; set; } = false;
    public int MaxConcurrentUploads { get; set; } = 2;
    public int SyncIntervalMinutes { get; set; } = 60;
}
