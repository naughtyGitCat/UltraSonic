// // naughtyGitCat 2024-08-12
using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;
namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExperimentController : ControllerBase
{
    private readonly ILogger<ExperimentController> _logger;
    private readonly FileMD5Manager _md5Manager;
    private readonly AgentManager _agentManager;
    public ExperimentController(ILogger<ExperimentController> logger, FileMD5Manager md5Manager, AgentManager agentManager)
    {
        _logger = logger;
        _md5Manager = md5Manager;
        _agentManager = agentManager;
    }

    [HttpGet("{days:int}")]
    public async Task<object> Get(int days)
    {
        _logger.LogInformation("days: {d}", days);
        return await _md5Manager.GetRecentCapturesAsync(new TimeSpan(days, 0, 0, 0));
    }

    [HttpGet("page")]
    public async Task<object> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 30)
    {
        return await _md5Manager.GetPagedCapturesAsync(page, pageSize);
    }

    [HttpGet("filters")]
    public async Task<object> GetFilters()
    {
        return await _md5Manager.GetFilterOptionsAsync();
    }

    [HttpGet("gallery")]
    public async Task<object> GetGallery(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 30,
        [FromQuery] string? cameraMaker = null, [FromQuery] string? cameraModel = null,
        [FromQuery] string? fileType = null, [FromQuery] string? agentId = null,
        [FromQuery] DateTime? dateFrom = null, [FromQuery] DateTime? dateTo = null,
        [FromQuery] bool? hasGps = null)
    {
        return await _md5Manager.GetFilteredPagedCapturesAsync(
            page, pageSize, cameraMaker, cameraModel, fileType, agentId, dateFrom, dateTo, hasGps);
    }

    [HttpGet("detail/{id:long}")]
    public async Task<IActionResult> GetDetail(long id)
    {
        var capture = await _md5Manager.GetCaptureByIdAsync(id);
        if (capture == null) return NotFound();
        return Ok(capture);
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        var capture = await _md5Manager.GetCaptureByIdAsync(id);
        if (capture == null) return NotFound();

        // Delete physical file
        if (string.IsNullOrEmpty(capture.AgentId) || capture.AgentId == "local")
        {
            try
            {
                if (System.IO.File.Exists(capture.FileFullPath))
                    System.IO.File.Delete(capture.FileFullPath);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to delete local file {Path}, removing DB record only", capture.FileFullPath);
            }
        }
        else
        {
            // Notify Agent to delete
            var agents = await _agentManager.GetAllAgentsAsync();
            var agent = agents.FirstOrDefault(a => a.Id == capture.AgentId);
            if (agent != null && !string.IsNullOrEmpty(agent.Endpoint))
            {
                try
                {
                    var client = new HttpClient { Timeout = TimeSpan.FromSeconds(10) };
                    await client.DeleteAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/file?path={Uri.EscapeDataString(capture.FileFullPath)}");
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to notify Agent to delete file {Path}", capture.FileFullPath);
                }
            }
        }

        await _md5Manager.DeleteByIdAsync(id);
        return Ok();
    }
}
