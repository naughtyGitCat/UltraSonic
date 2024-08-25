using LrWallPaper.Services;
using Newtonsoft.Json;
namespace LrWallPaper.Jobs
{
    public class ExperimentJob : BackgroundService
    {
        private readonly ICaptureRepository _captureRepository;
        private readonly ILogger<ExperimentJob> _logger;
        public ExperimentJob(ICaptureRepository captureRepository, ILogger<ExperimentJob> logger)
        {
            _logger = logger;
            _captureRepository = captureRepository;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var x = _captureRepository.GetRecentCaptures(new TimeSpan(7, 0, 0, 0));
            await Task.CompletedTask;
            _logger.LogInformation("{x}", JsonConvert.SerializeObject(x, Formatting.Indented));
        }
    }
}
