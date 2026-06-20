using System.Globalization;
using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

/// <summary>
/// Binary-ingest endpoint for the iOS companion app (UltraSonic.iOS).
///
/// Master NEVER stores media on its own disk — physical storage lives on Agent
/// nodes, and Master may not even run on the media-archive machine. This endpoint
/// is therefore a thin streaming PROXY, symmetric to the <c>GET /api/image</c>
/// agent-forwarding path: it dedupe-guards against the catalog, resolves the
/// configured archive Agent, and forwards the multipart upload to that Agent's
/// <c>POST /api/agent/ingest</c>. The Agent writes the bytes to its own archive
/// disk and pushes metadata back through the normal <c>/api/master/sync</c> path,
/// so the iOS upload is indistinguishable from a device-sync record downstream
/// (and the catalog's <c>agent_id</c> correctly points at the agent that holds
/// the file, which is what the image proxy needs to serve it later).
///
/// The phone only ever talks to Master via <see cref="MobileIngestRequest"/>;
/// it does its camera-vs-received filtering on-device (PhotoKit
/// <c>PHAsset.sourceType == .typeUserLibrary</c>) and prechecks
/// <c>/api/master/file-exists</c> before uploading.
/// </summary>
[Route("api/master")]
[ApiController]
public class MobileIngestController : ControllerBase
{
    private readonly FileMD5Manager _md5Manager;
    private readonly AgentManager _agentManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<MobileIngestController> _logger;

    public MobileIngestController(
        FileMD5Manager md5Manager,
        AgentManager agentManager,
        IConfiguration configuration,
        ILogger<MobileIngestController> logger)
    {
        _md5Manager = md5Manager;
        _agentManager = agentManager;
        _configuration = configuration;
        _logger = logger;
    }

    /// <summary>
    /// Accepts one media asset (multipart/form-data) and forwards it to the archive
    /// Agent. Returns the Agent's JSON verbatim once stored, <c>{ skipped = true }</c>
    /// when the asset already exists (dedupe), or 502/503 if no Agent could store it.
    /// </summary>
    [HttpPost("ingest")]
    [DisableRequestSizeLimit]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> Ingest([FromForm] MobileIngestRequest request, CancellationToken ct)
    {
        var file = request.File;
        if (file == null || file.Length == 0)
            return BadRequest(new { error = "file is required" });

        var fileName = string.IsNullOrWhiteSpace(request.FileName)
            ? Path.GetFileName(file.FileName)
            : Path.GetFileName(request.FileName);
        if (string.IsNullOrWhiteSpace(fileName))
            return BadRequest(new { error = "fileName is required" });

        var size = file.Length;

        // Dedupe before moving any bytes off the phone's connection to an Agent —
        // same contract the Agent uses (filename + size, with iCloud-suffix fuzzing).
        if (await _md5Manager.FileExistsAsync(fileName, size))
        {
            _logger.LogDebug("iOS ingest skipped (already in Master catalog): {File}", fileName);
            return Ok(new { skipped = true, reason = "exists", fileName });
        }

        // Master holds no media — resolve the storage Agent and forward to it.
        var agent = await ResolveTargetAgentAsync();
        if (agent is null)
            return StatusCode(503, new
            {
                error = "no archive agent available; set UltraSonic:MobileIngest:TargetAgentId, "
                      + "or register exactly one Agent"
            });

        // Stream the file from the framework-buffered request straight into the
        // forwarded multipart body — never fully resident in Master's memory.
        using var content = new MultipartFormDataContent();
        content.Add(new StreamContent(file.OpenReadStream()), "file", fileName);

        void Field(string name, string? value)
        {
            if (!string.IsNullOrEmpty(value)) content.Add(new StringContent(value), name);
        }

        Field("fileName", fileName);
        Field("cameraMaker", request.CameraMaker);
        Field("cameraModel", request.CameraModel);
        Field("lensModel", request.LensModel);
        Field("captureTime", (request.CaptureTime ?? DateTime.Now).ToString("yyyy-MM-ddTHH:mm:ss"));
        if (request.Latitude is { } lat) Field("latitude", lat.ToString(CultureInfo.InvariantCulture));
        if (request.Longitude is { } lon) Field("longitude", lon.ToString(CultureInfo.InvariantCulture));
        Field("sourceType", request.SourceType ?? "userLibrary");
        // Multi-tenancy: tag the file with the authenticated uploader (when Auth:Enabled).
        // Unauthenticated (LAN/homelab) → no owner, stored as shared/legacy.
        var ownerId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(ownerId)) Field("ownerUserId", ownerId);

        using var client = new HttpClient(new HttpClientHandler { UseProxy = false })
        {
            Timeout = TimeSpan.FromHours(1) // large videos over LAN
        };
        try
        {
            var resp = await client.PostAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/ingest", content, ct);
            var bodyText = await resp.Content.ReadAsStringAsync(ct);
            if (!resp.IsSuccessStatusCode)
            {
                _logger.LogWarning("iOS ingest: agent {Agent} returned {Status}: {Body}",
                    agent.Id, (int)resp.StatusCode, bodyText);
                return StatusCode(502, new { error = "archive agent rejected upload", status = (int)resp.StatusCode, detail = bodyText });
            }
            _logger.LogInformation("iOS ingest forwarded {File} ({Size} bytes) -> agent {Agent}", fileName, size, agent.Id);
            return Content(bodyText, "application/json");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "iOS ingest: failed forwarding {File} to agent {Agent}", fileName, agent.Id);
            return StatusCode(502, new { error = "failed to reach archive agent", detail = ex.Message });
        }
    }

    /// <summary>
    /// Pick the Agent that should archive iOS uploads: the configured
    /// <c>UltraSonic:MobileIngest:TargetAgentId</c>, else the sole registered Agent.
    /// Returns null when the target can't be determined (caller responds 503).
    /// </summary>
    private async Task<AgentEntity?> ResolveTargetAgentAsync()
    {
        var agents = (await _agentManager.GetAllAgentsAsync())
            .Where(a => !string.IsNullOrEmpty(a.Endpoint))
            .ToList();
        if (agents.Count == 0) return null;

        var targetId = _configuration["UltraSonic:MobileIngest:TargetAgentId"];
        if (!string.IsNullOrWhiteSpace(targetId))
            return agents.FirstOrDefault(a => a.Id == targetId);

        return agents.Count == 1 ? agents[0] : null;
    }
}

/// <summary>Multipart form payload for <see cref="MobileIngestController.Ingest"/>.</summary>
public class MobileIngestRequest
{
    /// <summary>The raw media bytes (HEIC/JPEG/MOV/MP4...).</summary>
    public IFormFile? File { get; set; }

    /// <summary>Original filename, e.g. IMG_1234.HEIC. Falls back to the uploaded file's name.</summary>
    public string? FileName { get; set; }

    public string? CameraMaker { get; set; }
    public string? CameraModel { get; set; }
    public string? LensModel { get; set; }

    /// <summary>PHAsset.creationDate. Drives the yyyy/yyyy-MM-dd archive folder.</summary>
    public DateTime? CaptureTime { get; set; }

    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    /// <summary>PHAsset.sourceType label (e.g. "userLibrary"), recorded for provenance.</summary>
    public string? SourceType { get; set; }

    /// <summary>Logical source id stored in the catalog. Defaults to "ios".</summary>
    public string? AgentId { get; set; }
}
