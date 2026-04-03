namespace LrWallPaper.Agent.Services;

public class AgentState
{
    public bool IsScanningEnabled { get; set; } = true;
    public bool IsRequestEnabled { get; set; } = true;

    public event EventHandler? StateChanged;

    public void NotifyStateChanged()
    {
        StateChanged?.Invoke(this, EventArgs.Empty);
    }
}
