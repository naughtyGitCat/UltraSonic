using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/master")]
[ApiController]
public class MasterSyncController : ControllerBase
{
    private readonly FileMD5Manager _md5Manager;

    public MasterSyncController(FileMD5Manager md5Manager)
    {
        _md5Manager = md5Manager;
    }

    [HttpPost("sync")]
    public async Task<IActionResult> Sync([FromBody] List<FileMD5Entity> captures)
    {
        if (captures == null || !captures.Any()) return Ok();
        
        foreach(var c in captures)
        {
            if (string.IsNullOrEmpty(c.AgentId)) 
                c.AgentId = "local";
                
            await _md5Manager.SaveFileMD5Async(c);
        }
        
        return Ok(new { Count = captures.Count });
    }
}
