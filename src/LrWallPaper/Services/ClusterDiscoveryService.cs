using SlimCluster;
using SlimCluster.Membership;

namespace LrWallPaper.Services;

/// <summary>
/// Tracks SWIM cluster membership and maintains a live registry of discovered
/// Master and Agent nodes. Auto-registers/unregisters agents in AgentManager.
/// </summary>
public class ClusterDiscoveryService : IHostedService, IDisposable
{
    private readonly IClusterMembership _membership;
    private readonly AgentManager _agentManager;
    private readonly ILogger<ClusterDiscoveryService> _logger;
    private readonly IConfiguration _configuration;

    // Thread-safe snapshot of discovered peers (nodeId -> info)
    private readonly Dictionary<string, ClusterNodeInfo> _peers = new();
    private readonly object _lock = new();

    public ClusterDiscoveryService(
        IClusterMembership membership,
        AgentManager agentManager,
        ILogger<ClusterDiscoveryService> logger,
        IConfiguration configuration)
    {
        _membership = membership;
        _agentManager = agentManager;
        _logger = logger;
        _configuration = configuration;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _membership.MemberJoined += OnMemberJoined;
        _membership.MemberLeft += OnMemberLeft;
        _logger.LogInformation("ClusterDiscoveryService started — listening for SWIM membership events");
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
        var nodeId = e.Node.Id;
        var info = ClusterNodeInfo.Parse(nodeId);
        if (info == null)
        {
            _logger.LogWarning("Ignoring node with unparsable ID: {NodeId}", nodeId);
            return;
        }

        lock (_lock)
        {
            _peers[nodeId] = info;
        }

        _logger.LogInformation("Node joined cluster: {Role} @ {Endpoint} (id={NodeId})",
            info.Role, info.HttpEndpoint, nodeId);

        if (info.Role == ClusterNodeRole.Agent)
        {
            _ = Task.Run(async () =>
            {
                try
                {
                    await _agentManager.SaveAgentAsync(new AgentEntity
                    {
                        Id = info.NodeKey,
                        Name = $"auto:{info.NodeKey[..Math.Min(8, info.NodeKey.Length)]}",
                        Endpoint = info.HttpEndpoint
                    });
                    _logger.LogInformation("Auto-registered agent: {Endpoint}", info.HttpEndpoint);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to auto-register agent {NodeId}", nodeId);
                }
            });
        }
    }

    private void OnMemberLeft(object? sender, MemberEventArgs e)
    {
        var nodeId = e.Node.Id;
        var info = ClusterNodeInfo.Parse(nodeId);

        lock (_lock)
        {
            _peers.Remove(nodeId);
        }

        _logger.LogInformation("Node left cluster: {NodeId}", nodeId);

        if (info?.Role == ClusterNodeRole.Agent)
        {
            _ = Task.Run(async () =>
            {
                try
                {
                    await _agentManager.DeleteAgentAsync(info.NodeKey);
                    _logger.LogInformation("Auto-removed agent: {NodeKey}", info.NodeKey);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to auto-remove agent {NodeId}", nodeId);
                }
            });
        }
    }

    /// <summary>Returns a snapshot of all discovered peers.</summary>
    public List<ClusterNodeInfo> GetPeers()
    {
        lock (_lock)
        {
            return _peers.Values.ToList();
        }
    }

    /// <summary>Returns discovered peer Masters only.</summary>
    public List<ClusterNodeInfo> GetPeerMasters()
    {
        lock (_lock)
        {
            return _peers.Values.Where(p => p.Role == ClusterNodeRole.Master).ToList();
        }
    }

    public void Dispose() { }
}

public enum ClusterNodeRole
{
    Master,
    Agent
}

/// <summary>
/// Parsed from NodeId format: "{role}|{nodeKey}|{httpEndpoint}"
/// e.g. "master|DESKTOP-ABC|http://192.168.1.100:5281"
/// </summary>
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

        return new ClusterNodeInfo
        {
            Role = role,
            NodeKey = parts[1],
            HttpEndpoint = parts[2]
        };
    }

    public static string BuildNodeId(ClusterNodeRole role, string nodeKey, string httpEndpoint)
        => $"{role.ToString().ToLowerInvariant()}|{nodeKey}|{httpEndpoint}";
}
