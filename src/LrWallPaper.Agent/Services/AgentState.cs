namespace LrWallPaper.Agent.Services;

public class AgentState
{
    public bool IsScanningEnabled { get; set; } = true;
    public bool IsRequestEnabled { get; set; } = true;

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
