using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using MetadataExtractor.Formats.Exif;
using MetadataExtractor.Formats.QuickTime;

namespace LrWallPaper.Agent.Services;

/// <summary>
/// Background job that periodically scans configured local folders,
/// computes MD5 fingerprints and reads EXIF metadata for each image,
/// then pushes the catalog batch to the Master hub.
/// </summary>
public class ScanAndPushJob : BackgroundService
{
    private readonly ILogger<ScanAndPushJob> _logger;
    private readonly IConfiguration _configuration;
    private readonly AgentState _agentState;
    private readonly HttpClient _httpClient = new();

    private static readonly HashSet<string> DefaultExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".heic",
        ".dng", ".cr2", ".nef", ".arw",
        ".mp4", ".mov", ".avi", ".mkv", ".mts"
    };

    private readonly ClusterDiscoveryService _discovery;

    public ScanAndPushJob(
        ILogger<ScanAndPushJob> logger,
        IConfiguration configuration,
        AgentState agentState,
        ClusterDiscoveryService discovery)
    {
        _logger = logger;
        _configuration = configuration;
        _agentState = agentState;
        _discovery = discovery;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Wait briefly for the web host to fully start
        await Task.Delay(TimeSpan.FromSeconds(3), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            if (!_agentState.IsScanningEnabled)
            {
                await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);
                continue;
            }

            // Read configuration dynamically on each iteration so changes in appsettings.json apply immediately
            var agentId = _configuration["Agent:AgentId"];
            // Prefer SWIM-discovered Master; fallback to config
            var masterEndpoint = _discovery.GetMasterEndpoint()
                ?? _configuration["Agent:MasterEndpoint"]
                ?? "http://localhost:5281";
            _logger.LogDebug("Using Master endpoint: {Endpoint} (discovered={IsDiscovered})",
                masterEndpoint, _discovery.GetMasterEndpoint() != null);
            var scanPaths = _configuration.GetSection("Agent:ScanPaths").Get<string[]>() ?? [];
            var intervalMinutes = _configuration.GetValue("Agent:ScanIntervalMinutes", 60);
            var supportedExts = _configuration.GetSection("Agent:SupportedExtensions").Get<string[]>();
            var extensions = supportedExts != null && supportedExts.Length > 0
                ? new HashSet<string>(supportedExts, StringComparer.OrdinalIgnoreCase)
                : DefaultExtensions;

            if (string.IsNullOrEmpty(agentId))
            {
                agentId = Guid.NewGuid().ToString();
                _logger.LogWarning("No AgentId configured — generated ephemeral ID: {Id}. " +
                                   "Set Agent:AgentId in appsettings.json for persistence.", agentId);
            }

            _logger.LogInformation("Agent {Id} starting scan. Master={Master}, Paths={Paths}, Interval={Min}m",
                agentId, masterEndpoint, string.Join(";", scanPaths), intervalMinutes);

            foreach (var scanPath in scanPaths)
            {
                if (!Directory.Exists(scanPath))
                {
                    _logger.LogWarning("Scan path does not exist, skipping: {Path}", scanPath);
                    continue;
                }

                _logger.LogInformation("Begin scanning: {Path}", scanPath);

                var batch = new List<object>();

                foreach (var filePath in EnumerateImageFiles(scanPath, extensions))
                {
                    if (stoppingToken.IsCancellationRequested) break;

                    try
                    {
                        var md5 = ComputeMD5(filePath);
                        var exif = ReadExif(filePath);

                        batch.Add(new
                        {
                            FileFullPath = filePath,
                            FilePath = Path.GetDirectoryName(filePath) ?? "",
                            FileName = Path.GetFileName(filePath),
                            CameraMaker = exif.CameraMaker ?? "",
                            CameraModel = exif.CameraModel ?? "",
                            LensModel = exif.LensModel ?? "",
                            AgentId = agentId,
                            FileSize = exif.FileSize ?? new FileInfo(filePath).Length,
                            FileMD5 = md5,
                            CaptureTime = exif.PhotoDateTime ?? File.GetLastWriteTime(filePath),
                            Latitude = exif.Latitude,
                            Longitude = exif.Longitude
                        });

                        // Flush in chunks of 100
                        if (batch.Count >= 100)
                        {
                            await PushBatch(masterEndpoint, batch, stoppingToken);
                            batch.Clear();
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to process: {File}", filePath);
                    }
                }

                // Push remaining
                if (batch.Count > 0)
                {
                    await PushBatch(masterEndpoint, batch, stoppingToken);
                }

                _logger.LogInformation("Scan complete for {Path}", scanPath);
            }

            _logger.LogInformation("Next scan in {Min} minutes.", intervalMinutes);
            await Task.Delay(TimeSpan.FromMinutes(intervalMinutes), stoppingToken);
        }
    }

    private async Task PushBatch(string masterEndpoint, List<object> batch, CancellationToken ct)
    {
        var url = $"{masterEndpoint.TrimEnd('/')}/api/master/sync";
        try
        {
            var response = await _httpClient.PostAsJsonAsync(url, batch, ct);
            _logger.LogInformation("Pushed {Count} records to Master — HTTP {Status}",
                batch.Count, (int)response.StatusCode);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to push batch to Master at {Url}", url);
        }
    }

    private static IEnumerable<string> EnumerateImageFiles(string root, HashSet<string> extensions)
    {
        IEnumerable<string> files;
        try
        {
            files = Directory.EnumerateFiles(root, "*.*", SearchOption.AllDirectories);
        }
        catch (UnauthorizedAccessException)
        {
            yield break;
        }

        foreach (var f in files)
        {
            if (extensions.Contains(Path.GetExtension(f)))
            {
                yield return f;
            }
        }
    }

    private static string ComputeMD5(string filePath)
    {
        using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
        var hash = MD5.HashData(stream);
        var sb = new StringBuilder(hash.Length * 2);
        foreach (var b in hash) sb.Append(b.ToString("x2"));
        return sb.ToString();
    }

    /// <summary>
    /// Lightweight EXIF reader mirroring Master's EXIFHelper but self-contained.
    /// </summary>
    private static ExifResult ReadExif(string file)
    {
        try
        {
            var ext = Path.GetExtension(file).ToLowerInvariant();
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);

            if (ext is ".mov" or ".mp4")
            {
                var qtMeta = directories.OfType<QuickTimeMetadataHeaderDirectory>().FirstOrDefault();
                var qtTrack = directories.OfType<QuickTimeTrackHeaderDirectory>().FirstOrDefault();
                var fileMeta2 = directories.OfType<MetadataExtractor.Formats.FileSystem.FileMetadataDirectory>().FirstOrDefault();
                var (qtLat, qtLng) = ParseQuickTimeGps(qtMeta);
                return new ExifResult
                {
                    CameraMaker = qtMeta?.GetDescription(QuickTimeMetadataHeaderDirectory.TagMake),
                    CameraModel = qtMeta?.GetDescription(QuickTimeMetadataHeaderDirectory.TagModel),
                    PhotoDateTime = ParseQuickTimeDate(qtMeta, qtTrack, fileMeta2),
                    FileSize = ParseFileSize(fileMeta2?.GetDescription(MetadataExtractor.Formats.FileSystem.FileMetadataDirectory.TagFileSize)),
                    Latitude = qtLat,
                    Longitude = qtLng
                };
            }

            var ifd0 = directories.FirstOrDefault(d => d.Name == "Exif IFD0");
            var subIfd = directories.FirstOrDefault(d => d.Name == "Exif SubIFD");
            var fileMeta = directories.FirstOrDefault(d => d.Name == "File");
            var gpsDir = directories.OfType<GpsDirectory>().FirstOrDefault();
            var geoLocation = gpsDir?.GetGeoLocation();

            return new ExifResult
            {
                CameraMaker = ifd0?.Tags.FirstOrDefault(t => t.Name == "Make")?.Description,
                CameraModel = ifd0?.Tags.FirstOrDefault(t => t.Name == "Model")?.Description,
                LensModel = subIfd?.Tags.FirstOrDefault(t => t.Name == "Lens Model")?.Description,
                PhotoDateTime = ParseExifDate(ifd0?.Tags.FirstOrDefault(t => t.Name == "Date/Time")?.Description),
                FileSize = ParseFileSize(fileMeta?.Tags.FirstOrDefault(t => t.Name == "File Size")?.Description),
                Latitude = geoLocation?.Latitude,
                Longitude = geoLocation?.Longitude
            };
        }
        catch
        {
            return new ExifResult();
        }
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

    private static DateTime? ParseQuickTimeDate(
        QuickTimeMetadataHeaderDirectory? qtMeta,
        QuickTimeTrackHeaderDirectory? qtTrack,
        MetadataExtractor.Formats.FileSystem.FileMetadataDirectory? fileMeta)
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
            var fileDate = fileMeta?.GetDescription(MetadataExtractor.Formats.FileSystem.FileMetadataDirectory.TagFileModifiedDate);
            if (!string.IsNullOrEmpty(fileDate))
                return DateTime.ParseExact(fileDate, "ddd MMM dd HH:mm:ss zzz yyyy",
                    System.Globalization.CultureInfo.CurrentCulture);
        }
        catch { }
        return null;
    }

    private static (double? lat, double? lng) ParseQuickTimeGps(QuickTimeMetadataHeaderDirectory? qtMeta)
    {
        try
        {
            var raw = qtMeta?.GetDescription(QuickTimeMetadataHeaderDirectory.TagGpsLocation);
            if (string.IsNullOrEmpty(raw)) return (null, null);
            var matches = Regex.Matches(raw, @"[+\-]\d+(\.\d+)?");
            if (matches.Count >= 2)
                return (double.Parse(matches[0].Value), double.Parse(matches[1].Value));
        }
        catch { }
        return (null, null);
    }

    private record ExifResult
    {
        public string? CameraMaker { get; init; }
        public string? CameraModel { get; init; }
        public string? LensModel { get; init; }
        public DateTime? PhotoDateTime { get; init; }
        public long? FileSize { get; init; }
        public double? Latitude { get; init; }
        public double? Longitude { get; init; }
    }
}
