namespace LrWallPaper.Agent.Services;

public class AgentState
{
    public bool IsScanningEnabled { get; set; } = true;
    public bool IsRequestEnabled { get; set; } = true;

    // Scan progress tracking
    public bool IsScanning { get; set; }
    public string? CurrentFile { get; set; }
    public int FilesProcessed { get; set; }
    public int FilesTotal { get; set; }
    public DateTime? LastScanStart { get; set; }
    public DateTime? LastScanEnd { get; set; }
    public TimeSpan? LastScanDuration { get; set; }
    public DateTime? NextScanTime { get; set; }
    public string? LastError { get; set; }

    private readonly ManualResetEventSlim _rescanSignal = new(false);

    public event EventHandler? StateChanged;

    public void NotifyStateChanged()
    {
        StateChanged?.Invoke(this, EventArgs.Empty);
    }

    public void TriggerRescan() => _rescanSignal.Set();

    public bool WaitForRescan(TimeSpan timeout)
    {
        var triggered = _rescanSignal.Wait(timeout);
        if (triggered) _rescanSignal.Reset();
        return triggered;
    }
}
