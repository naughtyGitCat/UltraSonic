using LrWallPaper.Services;

namespace LrWallPaper.Jobs;

public class MasterReplicationJob : BackgroundService
{
    private readonly MasterReplicationService _replicationService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<MasterReplicationJob> _logger;
    private readonly HttpClient _httpClient;

    public MasterReplicationJob(
        MasterReplicationService replicationService,
        IConfiguration configuration,
        ILogger<MasterReplicationJob> logger,
        IHttpClientFactory httpClientFactory)
    {
        _replicationService = replicationService;
        _configuration = configuration;
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
                var peers = _configuration.GetSection("MasterCluster:Peers").Get<string[]>() ?? Array.Empty<string>();
                if (peers.Length == 0) continue;

                foreach (var peer in peers)
                {
                    if (string.IsNullOrWhiteSpace(peer)) continue;

                    var targetUrl = $"{peer.TrimEnd('/')}/api/master/sync?is_republished=true";
                    
                    try
                    {
                        var response = await _httpClient.PostAsJsonAsync(targetUrl, payload, stoppingToken);
                        if (!response.IsSuccessStatusCode)
                        {
                            _logger.LogWarning("Failed to replicate {Count} items to {Peer}. Status: {Status}", 
                                payload.Count, peer, response.StatusCode);
                        }
                        else
                        {
                            _logger.LogInformation("Successfully replicated {Count} items to peer: {Peer}", payload.Count, peer);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error replicating {Count} items to {Peer}", payload.Count, peer);
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
