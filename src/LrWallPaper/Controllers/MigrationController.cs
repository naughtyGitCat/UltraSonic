using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

public class MigrationJobRequest
{
    public string SourceAgentId { get; set; } = string.Empty;
    public string TargetAgentId { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

[Route("api/[controller]")]
[ApiController]
public class MigrationController : ControllerBase
{
    private readonly ILogger<MigrationController> _logger;

    public MigrationController(ILogger<MigrationController> logger)
    {
        _logger = logger;
    }

    [HttpPost("schedule")]
    public IActionResult ScheduleMigration([FromBody] MigrationJobRequest request)
    {
        // TODO: Implement actual RPC / Orchestration to pull images from source agent 
        //       and POST to target agent via their respective endpoint.
        //       For now, we just validate the manual invocation and trace log it.
        _logger.LogInformation("Migration scheduled: {src} -> {tgt} (from {start} to {end})", 
            request.SourceAgentId, request.TargetAgentId, request.StartDate, request.EndDate);

        return Ok(new { Status = "Queued", Message = "Migration subsystem is undergoing development. Trigger logged." });
    }
}
