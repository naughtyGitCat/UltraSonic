using LrWallPaper.Helpers;

namespace LrWallPaper.Services;

/// A capture row used by the photo repositories. Lives in its own file (not in the
/// Windows-only BusinessJob) so it compiles in the headless/Linux build too.
public record HistoryCapture
{
    public string? FileBaseName { get; set; }
    public string? FileExtension { get; set; }
    public EXIFDigest? ExifDigest { get; set; }
    public string? AbsolutePath { get; set; }
}
