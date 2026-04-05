using ImageMagick;
using LrWallPaper.Models;
using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecognitionController : ControllerBase
{
    private readonly ILogger<RecognitionController> _logger;
    private readonly FileMD5Manager _md5Manager;
    private readonly TagManager _tagManager;
    private readonly UltraSonicConfig _config;

    private static readonly HashSet<string> NeedsConvert = [".heic", ".cr2", ".cr3", ".nef", ".nrw", ".arw", ".sr2", ".srf", ".dng", ".raf", ".pef", ".rw2", ".orf"];

    public RecognitionController(ILogger<RecognitionController> logger, FileMD5Manager md5Manager, TagManager tagManager, UltraSonicConfig config)
    {
        _logger = logger;
        _md5Manager = md5Manager;
        _tagManager = tagManager;
        _config = config;
    }

    [HttpGet("providers")]
    public IActionResult GetProviders()
    {
        var providers = new[] { "Claude", "OpenAI", "Gemini" }.Select(p => new
        {
            name = p,
            configured = !string.IsNullOrEmpty(_config.Recognition.ApiKeys.GetValueOrDefault(p, "")),
            model = _config.Recognition.Models.GetValueOrDefault(p, "")
        });
        return Ok(new { defaultProvider = _config.Recognition.Provider, providers });
    }

    [HttpPost("test")]
    public async Task<IActionResult> TestConnection([FromBody] TestRequest req)
    {
        try
        {
            var recognizer = ImageRecognizerFactory.Create(req.Provider, _config.Recognition);
            var (ok, message) = await recognizer.TestConnectionAsync();
            return Ok(new { ok, message });
        }
        catch (Exception ex)
        {
            return Ok(new { ok = false, message = ex.Message });
        }
    }

    [HttpPost("analyze")]
    public async Task<IActionResult> Analyze([FromBody] AnalyzeRequest req)
    {
        var provider = req.Provider ?? _config.Recognition.Provider;
        IImageRecognizer recognizer;
        try { recognizer = ImageRecognizerFactory.Create(provider, _config.Recognition); }
        catch (Exception ex) { return BadRequest(new { error = ex.Message }); }

        var results = new List<object>();
        foreach (var fileId in req.FileIds)
        {
            try
            {
                var capture = await _md5Manager.GetCaptureByIdAsync(fileId);
                if (capture == null) { results.Add(new { fileId, error = "Not found" }); continue; }

                var imageBytes = await GetImageBytes(capture);
                if (imageBytes == null) { results.Add(new { fileId, error = "Cannot read file" }); continue; }

                var tags = await recognizer.RecognizeAsync(imageBytes);
                _logger.LogInformation("Recognized {File}: {Tags}", capture.FileName, string.Join(", ", tags));

                // Auto-create and assign tags
                var tagIds = new List<long>();
                foreach (var tagName in tags)
                {
                    var tag = await _tagManager.CreateTagAsync(tagName, "auto");
                    tagIds.Add(tag.Id);
                }
                // Merge with existing tags
                var existingTags = await _tagManager.GetTagsForFileAsync(fileId);
                var allTagIds = existingTags.Select(t => t.Id).Union(tagIds).ToList();
                await _tagManager.SetFileTagsAsync(fileId, allTagIds);

                results.Add(new { fileId, fileName = capture.FileName, tags, provider });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Recognition failed for file {Id}", fileId);
                results.Add(new { fileId, error = ex.Message });
            }
        }
        return Ok(results);
    }

    [HttpPost("analyze-untagged")]
    public async Task<IActionResult> AnalyzeUntagged([FromBody] AnalyzeUntaggedRequest req)
    {
        var provider = req.Provider ?? _config.Recognition.Provider;
        var limit = req.Limit > 0 ? req.Limit : 10;

        // Find files without any tags
        var untagged = await _md5Manager.GetFilteredPagedCapturesAsync(1, limit,
            null, null, null, null, null, null, null, "photo", null);
        // Filter to only those with no tags
        var toAnalyze = new List<long>();
        foreach (var f in untagged)
        {
            var tags = await _tagManager.GetTagsForFileAsync(f.Id);
            if (tags.Count == 0) toAnalyze.Add(f.Id);
            if (toAnalyze.Count >= limit) break;
        }

        if (toAnalyze.Count == 0) return Ok(new { message = "No untagged files found", results = Array.Empty<object>() });

        // Reuse analyze logic
        var analyzeReq = new AnalyzeRequest { FileIds = toAnalyze, Provider = provider };
        return await Analyze(analyzeReq);
    }

    private async Task<byte[]?> GetImageBytes(FileMD5Entity capture)
    {
        var path = capture.FileFullPath;

        // For local files
        if (string.IsNullOrEmpty(capture.AgentId) || capture.AgentId == "local")
        {
            if (!System.IO.File.Exists(path)) return null;
            var ext = Path.GetExtension(path).ToLowerInvariant();

            // Check cache first
            var cacheDir = Path.Combine(AppContext.BaseDirectory, "cache");
            if (!string.IsNullOrEmpty(capture.FileMD5))
            {
                var cachePath = Path.Combine(cacheDir, $"{capture.FileMD5}.jpg");
                if (System.IO.File.Exists(cachePath))
                    return await System.IO.File.ReadAllBytesAsync(cachePath);
            }

            if (NeedsConvert.Contains(ext))
            {
                using var image = new MagickImage(path);
                using var ms = new MemoryStream();
                image.Write(ms, MagickFormat.Jpeg);
                return ms.ToArray();
            }
            return await System.IO.File.ReadAllBytesAsync(path);
        }

        // For remote agent files - fetch via image proxy
        try
        {
            var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(30) };
            var url = $"http://localhost:{HttpContext.Connection.LocalPort}/api/image?path={Uri.EscapeDataString(path)}&agentId={capture.AgentId}";
            return await client.GetByteArrayAsync(url);
        }
        catch { return null; }
    }
}

public record TestRequest(string Provider);
public class AnalyzeRequest
{
    public List<long> FileIds { get; set; } = [];
    public string? Provider { get; set; }
}
public class AnalyzeUntaggedRequest
{
    public string? Provider { get; set; }
    public int Limit { get; set; } = 10;
}
