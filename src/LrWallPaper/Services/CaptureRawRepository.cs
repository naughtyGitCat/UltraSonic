using MetadataExtractor;
using Microsoft.Extensions.Logging;
using System.Linq;
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
            _directories = new[] { "D:\\摄影" };                  
        }

        private bool IsPicture(string fileName)
        {
            _logger.LogInformation("check file {fileName} is picture by name", fileName);
            if (Path.GetFileName(fileName).StartsWith('.')) return false;
            if (fileName.EndsWith(".DS_Store")) return false;
            if (fileName.ToLower().EndsWith(".jpg")) return false;
            if (fileName.ToLower().EndsWith(".mp4")) return false;
            if (fileName.ToLower().EndsWith(".7z")) return false;
            if (fileName.ToLower().EndsWith(".pages")) return false;
            if (fileName.ToLower().EndsWith(".psd")) return false;
            if (fileName.ToLower().EndsWith(".db")) return false;
            if (fileName.ToLower().EndsWith(".lrcat")) return false;
            return true;
        }

        public Task<IEnumerable<HistoryCapture>> GetRecentCapturesAsync()
        {
            foreach (var dir in _directories)
            {
                var files = FileHelper.GetFilesRecursively(dir);
                foreach (var f in files)
                {
                    _logger.LogDebug("{file}",f);
                    if (Path.GetFileName(f).StartsWith('.')) continue;
                    if (f.EndsWith(".DS_Store")) continue;
                    if (f.ToLower().EndsWith(".jpg")) continue;
                    if (f.ToLower().EndsWith(".mp4")) continue;
                    if (f.ToLower().EndsWith(".7z")) continue;
                    if (f.ToLower().EndsWith(".pages")) continue;
                    if (f.ToLower().EndsWith(".psd")) continue;
                    if (f.ToLower().EndsWith(".db")) continue;
                    if (f.ToLower().EndsWith(".lrcat")) continue;
                    var directories = ImageMetadataReader.ReadMetadata(f);
                    foreach (var info in directories)
                    {
                        _logger.LogInformation("{f}",JsonConvert.SerializeObject(info.Tags.Select(i=>i.Name), Formatting.Indented));
                    }
                    break;
                }
            }
            throw new NotImplementedException();
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
