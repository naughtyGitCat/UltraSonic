namespace LrWallPaper.Services
{
    public interface ICaptureRepository
    {
        public Task<IEnumerable<HistoryCapture>> GetRecentCapturesAsync();
        public IEnumerable<HistoryCapture> GetSameDayCapturesAsync();
    }
}
