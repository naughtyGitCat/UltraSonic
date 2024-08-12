// // zhangruizhi 2024-08-12
using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;
namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ExperimentController : ControllerBase
{
    private readonly ICaptureRepository _captureRepository;
    private readonly ILogger<ExperimentController> _logger;
    public ExperimentController(ICaptureRepository captureRepository, ILogger<ExperimentController> logger)
    {
        _logger = logger;
        _captureRepository = captureRepository;
    }

    [HttpGet("{days:int}")]
    public object Get(int days)
    {
        return _captureRepository.GetRecentCaptures(new TimeSpan(days, 0,0,0));
    }
}
