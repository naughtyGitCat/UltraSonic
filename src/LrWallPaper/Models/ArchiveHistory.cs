namespace LrWallPaper.Models
{
    public record ArchiveHistory
    {
        public string? ArchiveSource { get;set; }
        public string? ArchiveDevice { get;set; }
        public DateTime? CreateTime { get;set; }  
        public string? CreateBy { get;set; }

        public string? FileName { get;set; }
        public string? FilePath { get;set; } 

        public string? FileExtension { get;set; }  
        public DateTime? FileUpdateTime { get;set; }
        public DateTime? FileExifTime { get; set; }

        // 导入位置
        public string? ArchivePath { get;set; }
    }
}
