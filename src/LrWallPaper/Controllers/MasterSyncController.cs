using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/master")]
[ApiController]
public class MasterSyncController : ControllerBase
{
    private readonly FileMD5Manager _md5Manager;
    private readonly MasterReplicationService _replicationService;

    public MasterSyncController(FileMD5Manager md5Manager, MasterReplicationService replicationService)
    {
        _md5Manager = md5Manager;
        _replicationService = replicationService;
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
}
