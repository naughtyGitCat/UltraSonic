using MetadataExtractor;
using Microsoft.Extensions.Logging;
using System.Linq;
using LrWallPaper.Common;
using LrWallPaper.Helpers;
using Microsoft.AspNetCore.Routing.Constraints;
using Newtonsoft.Json;

namespace LrWallPaper.Services
{
    public class CaptureRawRepository : ICaptureRepository
    {
        private readonly IEnumerable<string> _directories;
        private readonly ILogger<CaptureRawRepository> _logger;
        public CaptureRawRepository(ILogger<CaptureRawRepository> logger)
        {
            _logger = logger;
            _directories = ["D:\\"];                  
        }

        private bool IsPicture(string fileName)
        {
            _logger.LogInformation("check file {fileName} is picture by name", fileName);
            if (Path.GetFileName(fileName).StartsWith('.')) return false;
            return ImageSuffixes.PossibleSuffixes.Contains(Path.GetExtension(fileName));
        }

        public Task<IEnumerable<HistoryCapture>> GetRecentCapturesAsync()
        {
            return Task.FromResult(GetRecentCaptures());
        }

        private IEnumerable<HistoryCapture> GetRecentCaptures()
        {
            IEnumerable<HistoryCapture> captures = Array.Empty<HistoryCapture>();
            foreach (var dir in _directories)
            {
                var files = FileHelper.GetFilesRecursively(dir);
                foreach (var f in files)
                {
                    _logger.LogDebug("{f}",f);
                    if (!IsPicture(f)) continue;
                    var directories = ImageMetadataReader.ReadMetadata(f);
                    var rawTimeTags = new List<Tuple<string,string>>();
                    foreach (var info in directories)
                    {
                        // _logger.LogInformation("{f}", JsonConvert.SerializeObject(info.Tags.Select(i => i.Name), Formatting.Indented));
                        // _logger.LogInformation("{f}", JsonConvert.SerializeObject(info.Tags.Select(i => i.Name)));
                        foreach (var tag in info.Tags)
                        {
                            if (!tag.Name.ToLower().Contains("date") && !tag.Name.ToLower().Contains("time")) continue;
                            if (!string.IsNullOrEmpty(tag.Description))rawTimeTags.Add(new Tuple<string, string>(tag.Name,tag.Description));
                        }
                    }
                    if (!rawTimeTags.Any()) continue;
                    var times = new List<DateTime>();
                    foreach (var tag in rawTimeTags)
                    {
                        try
                        {
                            _logger.LogInformation("found new picture time prop: {f}, {tagName}={tagValue}", f, tag.Item1, tag.Item2);
                            var dt = Convert.ToDateTime(tag.Item2);;
                            if (times.Contains(dt)) continue;
                            _logger.LogInformation("found new picture time prop: {f}, {tagName}={tagValue}", f, tag.Item1, dt);
                            times.Add(dt);
                        }
                        catch (FormatException e)
                        {
                            _logger.LogWarning(e,"convert time related tag to datetime failed");
                        }
                    }
                    if (!times.Any()) continue;
                    captures = captures.Append(new HistoryCapture
                    {
                        AbsolutePath = f,
                        CaptureTime = times.First(),
                        FileBaseName = Path.GetFileName(f),
                        FileExtension = Path.GetExtension(f)
                    });
                    _logger.LogDebug("file: {file}", f);
                }
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
