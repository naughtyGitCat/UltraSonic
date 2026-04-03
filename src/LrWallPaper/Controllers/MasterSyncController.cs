using System.Collections.Concurrent;
using System.Net.Http.Json;
using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/master")]
[ApiController]
public class MasterSyncController : ControllerBase
{
    private readonly FileMD5Manager _md5Manager;
    private readonly MasterReplicationService _replicationService;
    private readonly INotificationService _notification;
    private readonly IHttpClientFactory _httpClientFactory;

    // In-memory list of recently detected devices (cleared on sync trigger)
    private static readonly ConcurrentDictionary<string, DeviceDetectedReport> _detectedDevices = new();

    public MasterSyncController(
        FileMD5Manager md5Manager,
        MasterReplicationService replicationService,
        INotificationService notification,
        IHttpClientFactory httpClientFactory)
    {
        _md5Manager = md5Manager;
        _replicationService = replicationService;
        _notification = notification;
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet("file-exists")]
    public async Task<IActionResult> FileExists([FromQuery] string filename, [FromQuery] long size)
    {
        if (string.IsNullOrEmpty(filename)) return BadRequest();
        var exists = await _md5Manager.FileExistsAsync(filename, size);
        return Ok(new { exists });
    }

    [HttpPost("sync")]
    public async Task<IActionResult> Sync([FromBody] List<FileMD5Entity> captures, [FromQuery] bool is_republished = false)
    {
        if (captures == null || !captures.Any()) return Ok();

        foreach(var c in captures)
        {
            if (string.IsNullOrEmpty(c.AgentId))
                c.AgentId = "local";

            await _md5Manager.SaveFileMD5Async(c);
        }

        // If this is a direct push from an Agent (not republished from another Master),
        // we enqueue it to be gossip-replicated to other known Masters in the cluster
        if (!is_republished)
        {
            _replicationService.Enqueue(captures);
        }

        return Ok(new { Count = captures.Count });
    }

    /// <summary>
    /// Incremental sync endpoint: returns records updated after the given timestamp.
    /// Used for Master-to-Master pull-based sync as a fallback/catch-up mechanism.
    /// </summary>
    [HttpGet("sync/since")]
    public async Task<IActionResult> GetSince([FromQuery] DateTime since, [FromQuery] int limit = 1000)
    {
        var records = await _md5Manager.GetRecordsSinceAsync(since, limit);
        return Ok(records);
    }

    /// <summary>
    /// Generic notification relay endpoint. Agents call this to send push notifications
    /// through the Master's configured notification service (e.g. Bark).
    /// </summary>
    [HttpPost("notify")]
    public async Task<IActionResult> Notify([FromBody] NotifyRequest request)
    {
        if (string.IsNullOrEmpty(request.Title)) return BadRequest("title is required");
        var ok = await _notification.SendAsync(request.Title, request.Body ?? "", request.Group);
        return Ok(new { Sent = ok });
    }

    /// <summary>
    /// Agent reports a newly detected device. Master stores it for UI display.
    /// </summary>
    [HttpPost("device-detected")]
    public IActionResult DeviceDetected([FromBody] DeviceDetectedReport report)
    {
        _detectedDevices[report.DeviceId] = report;
        return Ok();
    }

    /// <summary>
    /// Returns devices recently detected by Agents, available for sync trigger.
    /// </summary>
    [HttpGet("devices")]
    public IActionResult GetDetectedDevices()
    {
        return Ok(_detectedDevices.Values.OrderByDescending(d => d.DetectedAt));
    }

    /// <summary>
    /// Master triggers device sync on a specific Agent.
    /// The Agent will immediately start syncing all connected devices.
    /// </summary>
    [HttpPost("trigger-sync/{agentId}")]
    public async Task<IActionResult> TriggerSync(string agentId, [FromServices] AgentManager agentManager)
    {
        var agents = await agentManager.GetAllAgentsAsync();
        var agent = agents.FirstOrDefault(a => a.Id == agentId);
        if (agent == null || string.IsNullOrEmpty(agent.Endpoint))
            return NotFound(new { Error = $"Agent '{agentId}' not found" });

        var client = _httpClientFactory.CreateClient("ClusterClient");
        try
        {
            var url = $"{agent.Endpoint.TrimEnd('/')}/api/agent/sync/trigger";
            var response = await client.PostAsync(url, null);
            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode,
                    new { Error = $"Agent returned {response.StatusCode}" });
            return Ok(new { Status = "triggered", AgentId = agentId, AgentEndpoint = agent.Endpoint });
        }
        catch (Exception ex)
        {
            return StatusCode(502, new { Error = $"Failed to reach agent: {ex.Message}" });
        }
    }
}

public record NotifyRequest
{
    public string Title { get; init; } = string.Empty;
    public string? Body { get; init; }
    public string? Group { get; init; }
}

public record DeviceDetectedReport
{
    public string AgentId { get; init; } = string.Empty;
    public string AgentEndpoint { get; init; } = string.Empty;
    public string DeviceId { get; init; } = string.Empty;
    public string DeviceName { get; init; } = string.Empty;
    public string DeviceType { get; init; } = string.Empty;
    public DateTime DetectedAt { get; init; }
}
