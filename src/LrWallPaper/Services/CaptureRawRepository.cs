using System.Globalization;
using MetadataExtractor;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Text.RegularExpressions;
using LrWallPaper.Common;
using LrWallPaper.Helpers;
using Microsoft.AspNetCore.Routing.Constraints;
using Newtonsoft.Json;
using Directory=System.IO.Directory;

namespace LrWallPaper.Services
{

    public record DateTimeTag
    {
        public string TagName { get; set; }
        public string TagDescription { get; set; }
        public string TagDirectory { get; set; }
    }
    public record DateTimeParsePattern
    {
        public string Format { get; set; }
        public Regex Pattern { get; set; }
    }
    public class CaptureRawRepository : ICaptureRepository
    {
        private readonly IEnumerable<string> _directories;
        private readonly ILogger<CaptureRawRepository> _logger;
        public CaptureRawRepository(ILogger<CaptureRawRepository> logger)
        {
            _logger = logger;
            _directories = ["D:\\AI"];                  
        }

        private bool IsPicture(string fileName)
        {
            _logger.LogDebug("check file {fileName} is picture by name", fileName);
            return !Path.GetFileName(fileName).StartsWith('.') && ImageSuffixes.PossibleSuffixes.Contains(Path.GetExtension(fileName).ToLower());
        }

        public Task<IEnumerable<HistoryCapture>> GetRecentCapturesAsync()
        {
            return Task.FromResult(GetRecentCaptures());
        }

        private DateTime ParseDateTime(string raw)
        {
            // 2022-02-22
            var r1 = new DateTimeParsePattern{Format = "yyyy-MM-dd", Pattern = new Regex("[1-9][0-9][0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])")};
            // 2022-02-22 22:22:22
            var r2 = new DateTimeParsePattern{Format = "yyyy-MM-dd HH:mm:ss", Pattern = new Regex(@"[1-9][0-9][0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])\s[0-2][0-9]:[0-5][0-9]:[0-5][0-9]")};
            // 2022:02:22 22:22:22
            var r3 = new DateTimeParsePattern{Format = "yyyy:MM:dd HH:mm:ss", Pattern = new Regex(@"[1-9][0-9][0-9][0-9]:(0[1-9]|1[0-2]):(0[1-9]|1[0-9]|2[0-9]|3[0-1])\s[0-2][0-9]:[0-5][0-9]:[0-5][0-9]")};
            var patterns = new []{r1, r2, r3};
            foreach (var pattern in patterns)
            {
                if (pattern.Pattern.Match(raw).Success) return DateTime.ParseExact(raw, pattern.Format, DateTimeFormatInfo.InvariantInfo);
            }
            throw new NotImplementedException($"string format {raw} not predefined");
        }

        private IEnumerable<HistoryCapture> GetRecentCaptures()
        {
            var captures = new List<HistoryCapture>();
            foreach (var dir in _directories)
            {
                // var files = FileHelper.GetFilesRecursively(dir, ["扫描文件", "庐山", "Lightroom Catalog.lrcat-data"]);
                var files = Directory.GetFiles(dir, "*.*", new EnumerationOptions
                {
                    MaxRecursionDepth = 2,
                    IgnoreInaccessible = true,
                    RecurseSubdirectories = true
                });
                foreach (var f in files)
                {
                    _logger.LogDebug("{f}",f);
                    if (!IsPicture(f)) continue;
                    try
                    {
                        var imageMetaDirectories = ImageMetadataReader.ReadMetadata(f);
                        var rawTimeTags = new List<DateTimeTag>();
                        foreach (var info in imageMetaDirectories)
                        {
                            // _logger.LogInformation("{f}", JsonConvert.SerializeObject(info.Tags.Select(i => i.Name), Formatting.Indented));
                            // _logger.LogInformation("{f}", JsonConvert.SerializeObject(info.Tags.Select(i => i.Name)));
                            foreach (var tag in info.Tags)
                            {
                                if (!tag.Name.Contains("Date/Time") && !tag.Name.Contains("Date/Time")) continue;
                                if (!string.IsNullOrEmpty(tag.Description))rawTimeTags.Add(new DateTimeTag{TagName = tag.Name,TagDescription = tag.Description, TagDirectory = info.Name});
                            }
                        }
                        if (!rawTimeTags.Any()) continue;
                        var times = new List<DateTime>();
                        foreach (var tag in rawTimeTags)
                        {
                            try
                            {
                                _logger.LogInformation("found new picture time prop: {f}, {tagName}={tagValue}  @ {dir}", f, tag.TagName, tag.TagDescription, tag.TagDirectory);
                                var dt = ParseDateTime(tag.TagDescription);;
                                if (times.Contains(dt)) continue;
                                _logger.LogInformation("found new picture time prop: {f}, {tagName}={tagValue}", f, tag.TagName, dt);
                                times.Add(dt);
                            }
                            catch (FormatException e)
                            {
                                _logger.LogWarning(e,"convert time related tag to datetime failed, {tagName}={tagValue} @{dir}", tag.TagName, tag.TagDescription, tag.TagDescription);
                            }
                        }
                        if (!times.Any()) continue;
                        captures.Add(new HistoryCapture
                        {
                            AbsolutePath = f,
                            CaptureTime = times.First(),
                            FileBaseName = Path.GetFileName(f),
                            FileExtension = Path.GetExtension(f)
                        });
                        _logger.LogDebug("file: {file}", f);
                    }
                    catch (Exception e)
                    {
                        if (e is IOException && e.Message.Contains(" Access to the cloud file is denied"))
                        {
                            _logger.LogWarning(e, "access to {f} failed",f);
                        }
                    }
                }
                break;
            }
            return captures;
        }

        public Task<IEnumerable<HistoryCapture>> GetSameDayCapturesAsync()
        {
            foreach (var dir in _directories)
            {
                var files = FileHelper.GetFilesRecursively(dir);
                foreach (var f in files)
                {
                    if (!IsPicture(f))continue;
                    var imageMetaDirectories = ImageMetadataReader.ReadMetadata(f);
                    foreach (var info in imageMetaDirectories)
                    {
                    }
                }
            }
            throw new NotImplementedException();
        }
    }
}
