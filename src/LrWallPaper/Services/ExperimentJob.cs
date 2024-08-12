using Newtonsoft.Json;
namespace LrWallPaper.Services
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
            var x = _captureRepository.GetSameDayCapturesAsync();
            await Task.CompletedTask;
            _logger.LogInformation("{x}",JsonConvert.SerializeObject(x, Formatting.Indented));
        }
    }
}
