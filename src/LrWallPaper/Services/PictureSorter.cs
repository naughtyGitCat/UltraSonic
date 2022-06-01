using LrWallPaper.Helpers;
namespace LrWallPaper.Services
{
    public interface IPictureSorter
    {

    }
    /// <summary>
    /// 把一堆扁平分布的图片文件用年月日目录进行分类
    /// </summary>
    public class PictureSorter
    {
        private readonly ILogger<PictureSorter> _logger;
        public PictureSorter(ILogger<PictureSorter> logger)
        {
            _logger = logger;
        }

        public async Task SortAsync(string[] originPaths, string targetPath, bool recursively, bool parallel)
        {
            if (parallel)
            {
                await Task.WhenAll(originPaths.Select(originPath => SortAsync(originPath, targetPath, recursively)));
            }
            else
            {
                foreach (var originPath in originPaths)
                {
                    await SortAsync(originPath, targetPath, recursively);
                }
            }
        }

        public Task SortAsync(string originPath, string targetPath, bool recursively)
        {
            var files = recursively ? FileHelper.GetFilesRecursively(originPath) : Directory.GetFiles(originPath, "*.*");
            foreach (var file in files)
            {
                var exif = EXIFHelper.GetEXIFInfo(file);
                exif.PhotoDateTime ??= DateTime.MinValue;
                var targetSubPath = Path.Combine(targetPath, $"{exif.PhotoDateTime!}:yyyy-MM-dd");
                var d = Directory.CreateDirectory(targetSubPath);
                // TODO: 优化检查文件存在的方式,加测试
                d.GetFiles(file);
                throw new NotImplementedException();
            }
            File.Move(originPath, targetPath);
            throw new NotImplementedException();
        }
    }

    public enum DuplicateStrategy
    {
        Skip,
        PreserveOrigin,
        PreserveTarget,
        PreserveLater,
        PreserveOlder,
        PreserveBigger,
        PreserveSmaller
    }
}
