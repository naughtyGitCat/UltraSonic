using LrWallPaper.Helpers;
namespace LrWallPaper.Services
{
    public record PictureInfo
    {
        public DateTime CaptureTime { get; set; }
        /// <summary>
        /// unit: byte
        /// </summary>
        public long FileSize { get; set; }
    }
    public interface IPictureSorter
    {
        /// <summary>
        /// 分拣文件
        /// </summary>
        /// <param name="originPath">原始目录</param>
        /// <param name="targetPath">目标位置</param>
        /// <param name="recursively">是否深入原始目录扫描</param>
        /// <param name="strategy">同名文件处理策略</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public IEnumerable<string> Sort(string originPath, string targetPath, bool recursively, DuplicateStrategy strategy);
        /// <summary>
        /// 分拣文件
        /// </summary>
        /// <param name="originPath">原始目录列表</param>
        /// <param name="targetPath">目标位置</param>
        /// <param name="recursively">是否深入原始目录扫描</param>
        /// <param name="strategy">同名文件处理策略</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public IEnumerable<string> Sort(string[] originPaths, string targetPath, bool recursively, DuplicateStrategy strategy);
    }
    /// <summary>
    /// 把一堆扁平分布的图片文件用年月日目录进行分类
    /// </summary>
    public class PictureSorter : IPictureSorter
    {
        private readonly ILogger<PictureSorter> _logger;
        public PictureSorter(ILogger<PictureSorter> logger)
        {
            _logger = logger;
        }

        public IEnumerable<string> Sort(string[] originPaths, string targetPath, bool recursively, DuplicateStrategy strategy)
        {
             return originPaths.SelectMany(originPath => Sort(originPath, targetPath, recursively, strategy));
        }

        private PictureInfo GetPhotoInfo(string photoFilePath)
        {
            var pictureInfo = new PictureInfo { };
            var exif = EXIFHelper.GetEXIFInfo(photoFilePath);
            if (exif.PhotoDateTime is null)
            {
                _logger.LogWarning("can't get capture time from exif");
            }
            pictureInfo.CaptureTime = exif.PhotoDateTime?? DateTime.MinValue;
            pictureInfo.FileSize = new FileInfo(photoFilePath).Length;
            return pictureInfo;
        }

        public IEnumerable<string> Sort(string originPath, string targetPath, bool recursively, DuplicateStrategy strategy)
        {
            List<string> duplicatedFiles = new() { };
            var originFiles = recursively ? FileHelper.GetFilesRecursively(originPath) : Directory.GetFiles(originPath, "*.*");
            foreach (var originFilePath in originFiles)
            {
                // Pay attention in this scope:
                // use path means string path
                // use directory means Directory obj

                var originPicInfo = GetPhotoInfo(originFilePath);
                var targetSubPath = Path.Combine(targetPath, $"{originPicInfo.CaptureTime:yyyy-MM-dd}");
                var targetSubDirectory = Directory.CreateDirectory(targetSubPath);
                var fileName = Path.GetFileName(originFilePath);
                // 转移到目标位置后的文件路径
                var targetFilePath = Path.Combine(targetSubDirectory.FullName, fileName);
                // TODO: 优化检查文件存在的方式,加测试
                if (File.Exists(targetFilePath))
                {
                    var targetDuplicatedPicInfo = GetPhotoInfo(targetFilePath);
                    _logger.LogDebug($"source originFilePath {originFilePath} duplicated in target path {targetSubDirectory.FullName}");
                    duplicatedFiles.Add(originFilePath);
                    switch (strategy)
                    {
                        case DuplicateStrategy.Skip:
                            _logger.LogInformation("skip copy this originPic");
                            break;
                        case DuplicateStrategy.Overwrite:
                            _logger.LogInformation($"do overwrite to {targetSubDirectory.FullName}");
                            File.Move(originFilePath, targetFilePath, true);
                            break;
                        case DuplicateStrategy.PreserveLater:
                            if (targetDuplicatedPicInfo.CaptureTime >= originPicInfo.CaptureTime)
                            {
                                _logger.LogInformation("target pic is newer than origin pic");
                                _logger.LogInformation("skip copy this originPic");
                            }
                            else
                            {
                                _logger.LogInformation($"do overwrite to {targetSubDirectory.FullName}");
                                File.Move(originFilePath, targetFilePath, true);
                            }
                            break;
                        case DuplicateStrategy.PreserveOlder:
                            if (targetDuplicatedPicInfo.CaptureTime < originPicInfo.CaptureTime)
                            {
                                
                                _logger.LogInformation("target pic is older than origin pic");
                                _logger.LogInformation("skip copy this originPic");
                            }
                            else
                            {
                                _logger.LogInformation($"do overwrite to {targetSubDirectory.FullName}");
                                File.Move(originFilePath, targetFilePath, true);
                            }
                            break;
                        case DuplicateStrategy.PreserveBigger:
                            if (targetDuplicatedPicInfo.FileSize >= originPicInfo.FileSize)
                            {
                                _logger.LogInformation("target pic is largger than origin pic");
                                _logger.LogInformation("skip copy this originPic");
                            }
                            else
                            {
                                _logger.LogInformation($"do overwrite to {targetSubDirectory.FullName}");
                                File.Move(originFilePath, targetFilePath, true);
                            }
                            break;
                        case DuplicateStrategy.PreserveSmaller:
                            if (targetDuplicatedPicInfo.FileSize < originPicInfo.FileSize)
                            {
                                _logger.LogInformation("target pic is smaller than origin pic");
                                _logger.LogInformation("skip copy this originPic");
                            }
                            else
                            {
                                _logger.LogInformation($"do overwrite to {targetSubDirectory.FullName}");
                                File.Move(originFilePath, targetFilePath, true);
                            }
                            break;
                        default:
                            _logger.LogWarning("not specified overwrite strategy");
                            _logger.LogInformation("skip copy this originPic");
                            break;
                    }
                }
                else
                {
                    _logger.LogInformation($"move {originFilePath} to {targetSubDirectory.FullName}");
                    File.Move(originFilePath, targetFilePath, true);
                };
            }
            return duplicatedFiles;
        }
    }

    public enum DuplicateStrategy
    {
        Skip,
        Overwrite,
        PreserveLater,
        PreserveOlder,
        PreserveBigger,
        PreserveSmaller
    }
}
