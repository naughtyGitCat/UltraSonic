namespace LrWallPaper.Services
{
    public class ExperimentJob : BackgroundService
    {
        private readonly ICaptureRepository _captureRepository;
        public ExperimentJob(ICaptureRepository captureRepository)
        {
            _captureRepository = captureRepository;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var x = await _captureRepository.GetRecentCapturesAsync();
        }
    }
}
