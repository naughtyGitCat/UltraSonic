using LrWallPaper.Services;

namespace LrWallPaper.Jobs;

public class MasterReplicationJob : BackgroundService
{
    private readonly MasterReplicationService _replicationService;
    private readonly ClusterDiscoveryService _discovery;
    private readonly ILogger<MasterReplicationJob> _logger;
    private readonly HttpClient _httpClient;

    public MasterReplicationJob(
        MasterReplicationService replicationService,
        ClusterDiscoveryService discovery,
        ILogger<MasterReplicationJob> logger,
        IHttpClientFactory httpClientFactory)
    {
        _replicationService = replicationService;
        _discovery = discovery;
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("ClusterClient");
        _httpClient.Timeout = TimeSpan.FromSeconds(30);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("MasterReplicationJob starting. Listening for gossip events...");

        try
        {
            await foreach (var payload in _replicationService.ReadAllAsync(stoppingToken))
            {
                // Get peer Masters from SWIM cluster discovery
                var peerMasters = _discovery.GetPeerMasters();
                if (peerMasters.Count == 0) continue;

                foreach (var peer in peerMasters)
                {
                    var targetUrl = $"{peer.HttpEndpoint.TrimEnd('/')}/api/master/sync?is_republished=true";

                    try
                    {
                        var response = await _httpClient.PostAsJsonAsync(targetUrl, payload, stoppingToken);
                        if (!response.IsSuccessStatusCode)
                        {
                            _logger.LogWarning("Failed to replicate {Count} items to {Peer}. Status: {Status}",
                                payload.Count, peer.HttpEndpoint, response.StatusCode);
                        }
                        else
                        {
                            _logger.LogInformation("Successfully replicated {Count} items to peer Master: {Peer}",
                                payload.Count, peer.HttpEndpoint);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error replicating {Count} items to {Peer}",
                            payload.Count, peer.HttpEndpoint);
                    }
                }
            }
        }
        catch (OperationCanceledException)
        {
            // Expected on shutdown
        }
        catch (Exception ex)
        {
            _logger.LogCritical(ex, "MasterReplicationJob encountered a fatal error.");
        }
    }
}
