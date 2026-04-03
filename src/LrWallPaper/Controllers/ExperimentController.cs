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
    public ExperimentController(ILogger<ExperimentController> logger, FileMD5Manager md5Manager)
    {
        _logger = logger;
        _md5Manager = md5Manager;
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
}
