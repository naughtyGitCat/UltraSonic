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
        [FromQuery] bool? hasGps = null, [FromQuery] string? mediaType = null)
    {
        return await _md5Manager.GetFilteredPagedCapturesAsync(
            page, pageSize, cameraMaker, cameraModel, fileType, agentId, dateFrom, dateTo, hasGps, mediaType);
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
        await DeletePhysicalFile(capture);
        await _md5Manager.DeleteByIdAsync(id);
        return Ok();
    }

    [HttpDelete("agent/{agentId}")]
    public async Task<IActionResult> DeleteByAgent(string agentId)
    {
        var count = await _md5Manager.DeleteByAgentIdAsync(agentId);
        _logger.LogInformation("Deleted {Count} records for agent {AgentId}", count, agentId);

        // Trigger rescan on agent
        var agents = await _agentManager.GetAllAgentsAsync();
        var agent = agents.FirstOrDefault(a => a.Id == agentId);
        if (agent != null && !string.IsNullOrEmpty(agent.Endpoint))
        {
            try
            {
                var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(5) };
                await client.PostAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/rescan", null);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to trigger rescan on agent {AgentId}", agentId);
            }
        }
        return Ok(new { deleted = count });
    }

    // --- Folder APIs ---

    [HttpGet("folders")]
    public async Task<object> GetFolders([FromQuery] string? agentId = null)
    {
        return await _md5Manager.GetFoldersAsync(agentId);
    }

    [HttpGet("folder-files")]
    public async Task<object> GetFolderFiles([FromQuery] string path, [FromQuery] string? agentId = null)
    {
        return await _md5Manager.GetFilesByFolderAsync(path, agentId);
    }

    [HttpPost("move")]
    public async Task<IActionResult> MoveFiles([FromBody] MoveRequest request)
    {
        var files = await _md5Manager.GetFilesByIdsAsync(request.FileIds);
        if (files.Count == 0) return NotFound();

        var moved = 0;
        foreach (var file in files)
        {
            var targetPath = Path.Combine(request.TargetPath, file.FileName);
            try
            {
                if (string.IsNullOrEmpty(file.AgentId) || file.AgentId == "local")
                {
                    Directory.CreateDirectory(request.TargetPath);
                    if (System.IO.File.Exists(file.FileFullPath))
                    {
                        System.IO.File.Move(file.FileFullPath, targetPath, overwrite: false);
                        await _md5Manager.RenameFileAsync(file.Id, request.TargetPath, file.FileName);
                        moved++;
                    }
                }
                else
                {
                    var agents = await _agentManager.GetAllAgentsAsync();
                    var agent = agents.FirstOrDefault(a => a.Id == file.AgentId);
                    if (agent != null)
                    {
                        var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(30) };
                        var resp = await client.PostAsJsonAsync(
                            $"{agent.Endpoint.TrimEnd('/')}/api/agent/move",
                            new { sourcePath = file.FileFullPath, targetPath });
                        if (resp.IsSuccessStatusCode)
                        {
                            await _md5Manager.RenameFileAsync(file.Id, request.TargetPath, file.FileName);
                            moved++;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to move {File}", file.FileFullPath);
            }
        }
        return Ok(new { moved, total = files.Count });
    }

    [HttpDelete("folder")]
    public async Task<IActionResult> DeleteFolder([FromQuery] string path, [FromQuery] string? agentId = null)
    {
        var files = await _md5Manager.GetFilesByFolderAsync(path, agentId);
        var deleted = 0;
        foreach (var file in files)
        {
            await DeletePhysicalFile(file);
            await _md5Manager.DeleteByIdAsync(file.Id);
            deleted++;
        }
        return Ok(new { deleted });
    }

    private async Task DeletePhysicalFile(FileMD5Entity capture)
    {
        if (string.IsNullOrEmpty(capture.AgentId) || capture.AgentId == "local")
        {
            try { if (System.IO.File.Exists(capture.FileFullPath)) System.IO.File.Delete(capture.FileFullPath); }
            catch (Exception ex) { _logger.LogWarning(ex, "Failed to delete local file {Path}", capture.FileFullPath); }
        }
        else
        {
            var agents = await _agentManager.GetAllAgentsAsync();
            var agent = agents.FirstOrDefault(a => a.Id == capture.AgentId);
            if (agent != null && !string.IsNullOrEmpty(agent.Endpoint))
            {
                try
                {
                    var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(10) };
                    await client.DeleteAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/file?path={Uri.EscapeDataString(capture.FileFullPath)}");
                }
                catch (Exception ex) { _logger.LogWarning(ex, "Failed to notify Agent to delete {Path}", capture.FileFullPath); }
            }
        }
    }
}

public class MoveRequest
{
    public List<long> FileIds { get; set; } = [];
    public string TargetPath { get; set; } = "";
}
