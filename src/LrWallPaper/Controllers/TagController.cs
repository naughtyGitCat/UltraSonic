using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TagController : ControllerBase
{
    private readonly TagManager _tagManager;

    public TagController(TagManager tagManager)
    {
        _tagManager = tagManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _tagManager.GetAllTagsAsync());
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        return Ok(await _tagManager.GetTagStatsAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTagRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Name)) return BadRequest();
        var tag = await _tagManager.CreateTagAsync(req.Name.Trim(), req.Category?.Trim() ?? "");
        return Ok(tag);
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        await _tagManager.DeleteTagAsync(id);
        return Ok();
    }

    /// <summary>Get tags for a specific file</summary>
    [HttpGet("file/{fileId:long}")]
    public async Task<IActionResult> GetFileTags(long fileId)
    {
        return Ok(await _tagManager.GetTagsForFileAsync(fileId));
    }

    /// <summary>Set tags for a file (replace all)</summary>
    [HttpPut("file/{fileId:long}")]
    public async Task<IActionResult> SetFileTags(long fileId, [FromBody] SetFileTagsRequest req)
    {
        await _tagManager.SetFileTagsAsync(fileId, req.TagIds);
        return Ok();
    }

    /// <summary>Add a single tag to a file</summary>
    [HttpPost("file/{fileId:long}/{tagId:long}")]
    public async Task<IActionResult> AddTagToFile(long fileId, long tagId)
    {
        await _tagManager.AddTagToFileAsync(fileId, tagId);
        return Ok();
    }

    /// <summary>Remove a tag from a file</summary>
    [HttpDelete("file/{fileId:long}/{tagId:long}")]
    public async Task<IActionResult> RemoveTagFromFile(long fileId, long tagId)
    {
        await _tagManager.RemoveTagFromFileAsync(fileId, tagId);
        return Ok();
    }

    /// <summary>Batch: add tag to multiple files</summary>
    [HttpPost("batch")]
    public async Task<IActionResult> BatchTag([FromBody] BatchTagRequest req)
    {
        await _tagManager.AddTagToFilesAsync(req.FileIds, req.TagId);
        return Ok(new { tagged = req.FileIds.Count });
    }
}

public record CreateTagRequest(string Name, string? Category);
public record SetFileTagsRequest(List<long> TagIds);
public record BatchTagRequest(List<long> FileIds, long TagId);
