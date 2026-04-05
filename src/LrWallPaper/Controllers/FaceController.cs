using ImageMagick;
using LrWallPaper.Models;
using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FaceController : ControllerBase
{
    private readonly ILogger<FaceController> _logger;
    private readonly FileMD5Manager _md5Manager;
    private readonly FaceManager _faceManager;
    private readonly UltraSonicConfig _config;

    private static readonly HashSet<string> NeedsConvert = [".heic", ".cr2", ".cr3", ".nef", ".nrw", ".arw", ".sr2", ".srf", ".dng", ".raf", ".pef", ".rw2", ".orf"];

    public FaceController(ILogger<FaceController> logger, FileMD5Manager md5Manager, FaceManager faceManager, UltraSonicConfig config)
    {
        _logger = logger;
        _md5Manager = md5Manager;
        _faceManager = faceManager;
        _config = config;
    }

    /// <summary>
    /// Detect faces in specified files
    /// </summary>
    [HttpPost("detect")]
    public async Task<IActionResult> Detect([FromBody] FaceDetectRequest req)
    {
        var provider = req.Provider ?? _config.FaceRecognition.Provider;
        IFaceDetector detector;
        try { detector = FaceDetectorFactory.Create(provider, _config.Recognition); }
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

                // Clear old detections for re-detect
                await _faceManager.ClearFacesForFileAsync(fileId);

                var faces = await detector.DetectFacesAsync(imageBytes);
                _logger.LogInformation("Face detection {File}: {Count} faces found", capture.FileName, faces.Count);

                var savedFaces = new List<object>();
                foreach (var face in faces)
                {
                    if (face.Confidence < _config.FaceRecognition.ConfidenceThreshold) continue;
                    var faceId = await _faceManager.SaveFaceDetectionAsync(fileId, face);
                    savedFaces.Add(new
                    {
                        id = faceId,
                        x = face.X, y = face.Y, width = face.Width, height = face.Height,
                        confidence = face.Confidence,
                        description = face.Description
                    });
                }

                results.Add(new { fileId, fileName = capture.FileName, facesDetected = savedFaces.Count, faces = savedFaces, provider });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Face detection failed for file {Id}", fileId);
                results.Add(new { fileId, error = ex.Message });
            }
        }
        return Ok(results);
    }

    /// <summary>
    /// Get faces detected in a file
    /// </summary>
    [HttpGet("file/{fileId:long}")]
    public async Task<IActionResult> GetFacesForFile(long fileId)
    {
        var faces = await _faceManager.GetFacesWithPersonForFileAsync(fileId);
        return Ok(faces);
    }

    /// <summary>
    /// Assign a face detection to a person (create person if name given)
    /// </summary>
    [HttpPost("{faceId:long}/assign")]
    public async Task<IActionResult> AssignFace(long faceId, [FromBody] AssignFaceRequest req)
    {
        long personId;
        if (req.PersonId.HasValue)
        {
            personId = req.PersonId.Value;
        }
        else if (!string.IsNullOrWhiteSpace(req.PersonName))
        {
            var person = await _faceManager.CreatePersonAsync(req.PersonName.Trim());
            personId = person.Id;
        }
        else
        {
            return BadRequest(new { error = "Provide personId or personName" });
        }

        await _faceManager.AssignFaceToPersonAsync(faceId, personId);
        return Ok(new { faceId, personId });
    }

    // === Person endpoints ===

    [HttpGet("persons")]
    public async Task<IActionResult> GetPersons()
    {
        return Ok(await _faceManager.GetAllPersonsAsync());
    }

    [HttpPost("persons")]
    public async Task<IActionResult> CreatePerson([FromBody] CreatePersonRequest req)
    {
        var person = await _faceManager.CreatePersonAsync(req.Name);
        return Ok(person);
    }

    [HttpPut("persons/{id:long}")]
    public async Task<IActionResult> UpdatePerson(long id, [FromBody] UpdatePersonRequest req)
    {
        await _faceManager.UpdatePersonAsync(id, req.Name, req.AvatarFileId);
        return Ok();
    }

    [HttpDelete("persons/{id:long}")]
    public async Task<IActionResult> DeletePerson(long id)
    {
        await _faceManager.DeletePersonAsync(id);
        return Ok();
    }

    /// <summary>
    /// Get files containing a specific person
    /// </summary>
    [HttpGet("persons/{personId:long}/files")]
    public async Task<IActionResult> GetPersonFiles(long personId)
    {
        var fileIds = await _faceManager.GetFilesByPersonAsync(personId);
        return Ok(fileIds);
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        return Ok(await _faceManager.GetStatsAsync());
    }

    [HttpGet("person-stats")]
    public async Task<IActionResult> GetPersonStats()
    {
        return Ok(await _faceManager.GetPersonStatsAsync());
    }

    private async Task<byte[]?> GetImageBytes(FileMD5Entity capture)
    {
        var path = capture.FileFullPath;

        if (string.IsNullOrEmpty(capture.AgentId) || capture.AgentId == "local")
        {
            if (!System.IO.File.Exists(path)) return null;
            var ext = Path.GetExtension(path).ToLowerInvariant();

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

        try
        {
            var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(30) };
            var url = $"http://localhost:{HttpContext.Connection.LocalPort}/api/image?path={Uri.EscapeDataString(path)}&agentId={capture.AgentId}";
            return await client.GetByteArrayAsync(url);
        }
        catch { return null; }
    }
}

public class FaceDetectRequest
{
    public List<long> FileIds { get; set; } = [];
    public string? Provider { get; set; }
}

public class AssignFaceRequest
{
    public long? PersonId { get; set; }
    public string? PersonName { get; set; }
}

public class CreatePersonRequest
{
    public string Name { get; set; } = "";
}

public class UpdatePersonRequest
{
    public string Name { get; set; } = "";
    public long? AvatarFileId { get; set; }
}
