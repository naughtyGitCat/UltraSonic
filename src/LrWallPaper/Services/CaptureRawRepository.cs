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
            _logger.LogDebug("check file {fileName} is picture by name", fileName);
            return !Path.GetFileName(fileName).StartsWith('.') && ImageSuffixes.PossibleSuffixes.Contains(Path.GetExtension(fileName).ToLower());
        }

        public Task<IEnumerable<HistoryCapture>> GetRecentCapturesAsync()
        {
            return Task.FromResult(GetRecentCaptures());
        }
        
        private IEnumerable<HistoryCapture> GetRecentCaptures()
        {
            throw new NotImplementedException();
        }
        
        private IEnumerable<HistoryCapture> GetCaptures()
        {
            var captures = new List<HistoryCapture>();
            foreach (var dir in _directories)
            {
                var files = Directory.GetFiles(dir, "*.*", new EnumerationOptions
                {
                    MaxRecursionDepth = 1,
                    IgnoreInaccessible = true,
                    RecurseSubdirectories = true
                });
                foreach (var f in files)
                {
                    if (!IsPicture(f)) continue;
                    try
                    {
                        captures.Add(new HistoryCapture
                        {
                            AbsolutePath = f,
                            ExifDigest = EXIFHelper.GetEXIFInfo(f),
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
            }
            return captures;
        }

        public IEnumerable<HistoryCapture> GetSameDayCapturesAsync()
        {
            var captures = new List<HistoryCapture>();
            foreach (var dir in _directories)
            {
                var files = Directory.GetFiles(dir, "*.*", new EnumerationOptions
                {
                    MaxRecursionDepth = 1,
                    IgnoreInaccessible = true,
                    RecurseSubdirectories = true
                });
                foreach (var f in files)
                {
                    if (!IsPicture(f)) continue;
                    try
                    {
                        var imageMetaDirectories = ImageMetadataReader.ReadMetadata(f);
                        var exifDigest = EXIFHelper.GetEXIFInfo(f);
                        if (exifDigest.PhotoDateTime is not null &&exifDigest.PhotoDateTime.Value.Date == DateTime.Now.Date)
                        {
                            captures.Add(new HistoryCapture
                            {
                                AbsolutePath = f,
                                ExifDigest = exifDigest,
                                FileBaseName = Path.GetFileName(f),
                                FileExtension = Path.GetExtension(f)
                            });    
                        }
                    }
                    catch (Exception e)
                    {
                        if (e is IOException && e.Message.Contains(" Access to the cloud file is denied"))
                        {
                            _logger.LogWarning(e, "access to {f} failed",f);
                        }
                    }
                }
            }
            return captures;
        }
    }
}
