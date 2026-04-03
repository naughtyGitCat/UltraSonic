using SlimCluster.Membership;

namespace LrWallPaper.Agent.Services;

public enum ClusterNodeRole
{
    Master,
    Agent
}

public record ClusterNodeInfo
{
    public ClusterNodeRole Role { get; init; }
    public string NodeKey { get; init; } = string.Empty;
    public string HttpEndpoint { get; init; } = string.Empty;

    public static ClusterNodeInfo? Parse(string nodeId)
    {
        var parts = nodeId.Split('|', 3);
        if (parts.Length < 3) return null;
        if (!Enum.TryParse<ClusterNodeRole>(parts[0], ignoreCase: true, out var role))
            return null;
        return new ClusterNodeInfo { Role = role, NodeKey = parts[1], HttpEndpoint = parts[2] };
    }

    public static string BuildNodeId(ClusterNodeRole role, string nodeKey, string httpEndpoint)
        => $"{role.ToString().ToLowerInvariant()}|{nodeKey}|{httpEndpoint}";
}

/// <summary>
/// Agent-side cluster discovery: tracks peer nodes and exposes discovered Master endpoints.
/// When a Master is found via SWIM, the Agent can push data there instead of relying on
/// a hardcoded MasterEndpoint in config.
/// </summary>
public class ClusterDiscoveryService : IHostedService, IDisposable
{
    private readonly IClusterMembership _membership;
    private readonly ILogger<ClusterDiscoveryService> _logger;

    private readonly Dictionary<string, ClusterNodeInfo> _peers = new();
    private readonly object _lock = new();

    public ClusterDiscoveryService(
        IClusterMembership membership,
        ILogger<ClusterDiscoveryService> logger)
    {
        _membership = membership;
        _logger = logger;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _membership.MemberJoined += OnMemberJoined;
        _membership.MemberLeft += OnMemberLeft;
        _logger.LogInformation("Agent ClusterDiscoveryService started");
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _membership.MemberJoined -= OnMemberJoined;
        _membership.MemberLeft -= OnMemberLeft;
        return Task.CompletedTask;
    }

    private void OnMemberJoined(object? sender, MemberEventArgs e)
    {
        var info = ClusterNodeInfo.Parse(e.Node.Id);
        if (info == null) return;

        lock (_lock) { _peers[e.Node.Id] = info; }
        _logger.LogInformation("Discovered {Role} node: {Endpoint}", info.Role, info.HttpEndpoint);
    }

    private void OnMemberLeft(object? sender, MemberEventArgs e)
    {
        lock (_lock) { _peers.Remove(e.Node.Id); }
        _logger.LogInformation("Node left: {NodeId}", e.Node.Id);
    }

    /// <summary>
    /// Returns the HTTP endpoint of a discovered Master, or null if none found.
    /// </summary>
    public string? GetMasterEndpoint()
    {
        lock (_lock)
        {
            return _peers.Values
                .FirstOrDefault(p => p.Role == ClusterNodeRole.Master)
                ?.HttpEndpoint;
        }
    }

    public List<ClusterNodeInfo> GetPeers()
    {
        lock (_lock) { return _peers.Values.ToList(); }
    }

    public void Dispose() { }
}
