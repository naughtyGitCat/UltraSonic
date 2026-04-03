namespace LrWallPaper.Agent.Services;

/// <summary>
/// Shared signal that allows external callers (e.g. Master via API) to trigger
/// an immediate device sync cycle without waiting for the next polling interval.
/// </summary>
public class DeviceSyncTrigger
{
    private readonly SemaphoreSlim _signal = new(0);

    /// <summary>Signal all waiting sync jobs to run now.</summary>
    public void TriggerNow()
    {
        // Release enough for both Apple and Generic jobs
        _signal.Release(2);
    }

    /// <summary>
    /// Wait for a trigger or timeout. Returns true if triggered, false if timed out.
    /// </summary>
    public async Task<bool> WaitAsync(TimeSpan timeout, CancellationToken ct)
    {
        return await _signal.WaitAsync(timeout, ct);
    }
}
