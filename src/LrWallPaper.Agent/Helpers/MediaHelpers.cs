using System.Security.Cryptography;
using System.Text;
using MetadataExtractor.Formats.FileSystem;
using MetadataExtractor.Formats.QuickTime;

namespace LrWallPaper.Agent.Helpers;

public record MediaExifResult
{
    public string? CameraMaker { get; init; }
    public string? CameraModel { get; init; }
    public string? LensModel { get; init; }
    public DateTime? PhotoDateTime { get; init; }
    public long? FileSize { get; init; }
}

public static class MediaHelpers
{
    public static readonly HashSet<string> PossibleSuffixes = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".heic",
        ".dng", ".cr2", ".cr3", ".nef", ".nrw", ".arw", ".sr2", ".srf",
        ".raf", ".pef", ".rw2", ".orf",
        ".mp4", ".mov", ".avi", ".mkv", ".mts"
    };

    public static string ComputeMD5(string filePath)
    {
        using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
        var hash = MD5.HashData(stream);
        var sb = new StringBuilder(hash.Length * 2);
        foreach (var b in hash) sb.Append(b.ToString("x2"));
        return sb.ToString();
    }

    /// <summary>
    /// Reads EXIF for images and QuickTime metadata for .MOV/.MP4 files.
    /// </summary>
    public static MediaExifResult ReadExif(string file)
    {
        try
        {
            var ext = Path.GetExtension(file).ToLowerInvariant();
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);

            if (ext == ".mov" || ext == ".mp4")
            {
                var qtMeta = directories.OfType<QuickTimeMetadataHeaderDirectory>().FirstOrDefault();
                var qtTrack = directories.OfType<QuickTimeTrackHeaderDirectory>().FirstOrDefault();
                var fileMeta = directories.OfType<FileMetadataDirectory>().FirstOrDefault();

                return new MediaExifResult
                {
                    CameraMaker = qtMeta?.GetDescription(QuickTimeMetadataHeaderDirectory.TagMake),
                    CameraModel = qtMeta?.GetDescription(QuickTimeMetadataHeaderDirectory.TagModel),
                    PhotoDateTime = ParseQuickTimeDate(qtMeta, qtTrack, fileMeta),
                    LensModel = null,
                    FileSize = ParseFileSize(fileMeta?.GetDescription(FileMetadataDirectory.TagFileSize))
                };
            }

            var ifd0 = directories.FirstOrDefault(d => d.Name == "Exif IFD0");
            var subIfd = directories.FirstOrDefault(d => d.Name == "Exif SubIFD");
            var fileDir = directories.FirstOrDefault(d => d.Name == "File");

            return new MediaExifResult
            {
                CameraMaker = ifd0?.Tags.FirstOrDefault(t => t.Name == "Make")?.Description,
                CameraModel = ifd0?.Tags.FirstOrDefault(t => t.Name == "Model")?.Description,
                LensModel = subIfd?.Tags.FirstOrDefault(t => t.Name == "Lens Model")?.Description,
                PhotoDateTime = ParseExifDate(ifd0?.Tags.FirstOrDefault(t => t.Name == "Date/Time")?.Description),
                FileSize = ParseFileSize(fileDir?.Tags.FirstOrDefault(t => t.Name == "File Size")?.Description)
            };
        }
        catch
        {
            return new MediaExifResult();
        }
    }

    private static DateTime? ParseQuickTimeDate(
        QuickTimeMetadataHeaderDirectory? qtMeta,
        QuickTimeTrackHeaderDirectory? qtTrack,
        FileMetadataDirectory? fileMeta)
    {
        try
        {
            var metaDate = qtMeta?.GetDescription(QuickTimeMetadataHeaderDirectory.TagCreationDate);
            if (!string.IsNullOrEmpty(metaDate))
                return DateTime.ParseExact(metaDate, "ddd MMM dd HH:mm:ss zzz yyyy",
                    System.Globalization.CultureInfo.CurrentCulture);

            var trackDate = qtTrack?.GetDescription(QuickTimeTrackHeaderDirectory.TagCreated);
            if (!string.IsNullOrEmpty(trackDate))
                return DateTime.ParseExact(trackDate, "ddd MMM dd HH:mm:ss yyyy",
                    System.Globalization.CultureInfo.CurrentCulture).ToLocalTime();

            var fileDate = fileMeta?.GetDescription(FileMetadataDirectory.TagFileModifiedDate);
            if (!string.IsNullOrEmpty(fileDate))
                return DateTime.ParseExact(fileDate, "ddd MMM dd HH:mm:ss zzz yyyy",
                    System.Globalization.CultureInfo.CurrentCulture);
        }
        catch { }
        return null;
    }

    private static DateTime? ParseExifDate(string? raw)
    {
        if (string.IsNullOrEmpty(raw)) return null;
        if (DateTime.TryParseExact(raw, "yyyy:MM:dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out var dt))
            return dt;
        return null;
    }

    private static long? ParseFileSize(string? raw)
    {
        if (string.IsNullOrEmpty(raw)) return null;
        if (long.TryParse(raw.Split(' ').First(), out var size)) return size;
        return null;
    }
}
