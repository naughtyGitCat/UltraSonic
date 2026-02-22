
using LrWallPaper.Helpers;
using LrWallPaper.Services;

namespace LrWallPaper.Jobs
{
    public class PictureMD5Job : BackgroundService
    {
        private readonly ILogger<PictureMD5Job> _logger;
        private readonly FileMD5Manager _databaseService;
        private readonly ICaptureRepository _captureRepository;
        private readonly IConfiguration _configuration;
        public PictureMD5Job(ICaptureRepository captureRepository, FileMD5Manager internalDatabaseService, ILogger<PictureMD5Job> logger, IConfiguration configuration) 
        {
            _logger = logger;
            _captureRepository = captureRepository;
            _databaseService = internalDatabaseService;
            _configuration = configuration;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            if (!_configuration.GetValue<bool>("EnableFullScan"))
            {
                _logger.LogInformation("Full scan is disabled by configuration.");
                return;
            }
            await Task.CompletedTask;
            while (!stoppingToken.IsCancellationRequested) 
            {
                var captures = _captureRepository.GetAllCaptures();
                foreach (var capture in captures) 
                {
                    try
                    {
                        var md5 = FileHelper.GetMD5(capture.AbsolutePath!);
                        _logger.LogDebug("file {f} md5 is {m}", capture.AbsolutePath, md5);
                        var exif = EXIFHelper.GetEXIFInfo(capture.AbsolutePath!);
                        await _databaseService.SaveFileMD5Async(new FileMD5Entity
                        {
                            FileName = Path.GetFileName(capture.AbsolutePath!),
                            FilePath = Path.GetDirectoryName(capture.AbsolutePath!)!,
                            CameraMaker = exif.CameraMaker??"",
                            CameraModel = exif.CameraModel??"",
                            LensModel = exif.LensModel??"",
                            FileMD5 = md5,
                            FileSize = exif.FileSize??-1,
                            CaptureTime=exif.PhotoDateTime??DateTime.MinValue
                        });
                    }
                    catch (UnauthorizedAccessException e)
                    {
                        _logger.LogWarning(e, "calc md5  failed");
                    }
                    
                }
                await Task.Delay(new TimeSpan(8,0,0), stoppingToken);
            }
        }
    }
}
