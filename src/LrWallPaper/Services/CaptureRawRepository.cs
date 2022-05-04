using MetadataExtractor;
using Microsoft.Extensions.Logging;
using System.Linq;
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


        private IEnumerable<string> GetFilesRecursively(string directory)
        {
            IEnumerable<string> files = Array.Empty<string>();
            files = files.Union(System.IO.Directory.GetFiles(directory, "*.*"));
            var dirs = System.IO.Directory.GetDirectories(directory, "*.*");
            foreach (var d in dirs)
            {
                files = files.Union(GetFilesRecursively(d));
            }
            return files;
        }

        public Task<IEnumerable<HistoryCapture>> GetRecentCapturesAsync()
        {
            foreach (var dir in _directories)
            {
                var files = GetFilesRecursively(dir);
                foreach (var f in files)
                {
                    _logger.LogInformation(f);
                    if (Path.GetFileName(f).StartsWith(".")) continue;
                    if (f.EndsWith(".DS_Store")) continue;
                    if (f.ToLower().EndsWith(".jpg")) continue;
                    if (f.ToLower().EndsWith(".mp4")) continue;
                    if (f.ToLower().Contains(".7z")) continue;
                    if (f.ToLower().Contains(".pages")) continue;
                    if (f.ToLower().Contains(".psd")) continue;
                    if (f.ToLower().Contains(".db")) continue;
                    if (f.ToLower().Contains(".lrcat")) continue;
                    var directories = ImageMetadataReader.ReadMetadata(f);
                    foreach (var info in directories)
                    {
                        _logger.LogInformation(JsonConvert.SerializeObject(info.Tags.Select(i=>i.Name), Formatting.Indented));
                        // _logger.LogInformation(f + JsonConvert.SerializeObject(info, Formatting.Indented));
                    }
                    break;
                }
            }
            throw new NotImplementedException();
        }
    }
}
