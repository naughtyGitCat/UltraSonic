namespace LrWallPaper.Services
{
    public interface ICaptureRepository
    {
        public IEnumerable<HistoryCapture> GetAllCaptures();
        public IEnumerable<HistoryCapture> GetRecentCaptures(TimeSpan offset);
        public Task<IEnumerable<HistoryCapture>> GetRecentCapturesAsync(TimeSpan offset);
        public IEnumerable<HistoryCapture> GetSameDayCaptures();
        public Task<IEnumerable<HistoryCapture>> GetSameDayCapturesAsync();
    }
}
