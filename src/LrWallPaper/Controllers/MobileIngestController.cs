using System.Security.Cryptography;
using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

/// <summary>
/// Binary-ingest endpoint for the iOS companion app (UltraSonic.iOS).
///
/// Unlike <see cref="MasterSyncController"/>.<c>Sync</c> — which only accepts metadata
/// records for files an Agent has already placed on disk — this endpoint receives the
/// raw file bytes + metadata directly from the phone over the LAN (no Windows Agent,
/// no AFC/USB). It mirrors the Agent's archive layout (<c>ArchiveDir/yyyy/yyyy-MM-dd/filename</c>)
/// and records the same catalog + archive-history rows, so the iOS path is
/// indistinguishable from the Agent path downstream.
///
/// The iOS app is expected to do the camera-vs-received filtering on-device via PhotoKit
/// (PHAsset.sourceType == .typeUserLibrary) and to precheck /api/master/file-exists before
/// uploading, so this endpoint only ever sees genuinely-new, camera-captured assets.
/// </summary>
[Route("api/master")]
[ApiController]
public class MobileIngestController : ControllerBase
{
    private readonly FileMD5Manager _md5Manager;
    private readonly MasterReplicationService _replicationService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<MobileIngestController> _logger;

    public MobileIngestController(
        FileMD5Manager md5Manager,
        MasterReplicationService replicationService,
        IConfiguration configuration,
        ILogger<MobileIngestController> logger)
    {
        _md5Manager = md5Manager;
        _replicationService = replicationService;
        _configuration = configuration;
        _logger = logger;
    }

    /// <summary>
    /// Accepts one media asset (multipart/form-data): the file bytes plus its metadata.
    /// Returns { skipped = true } when the asset already exists (dedupe), or
    /// { saved = true, path, md5 } once archived and catalogued.
    /// </summary>
    [HttpPost("ingest")]
    [DisableRequestSizeLimit]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> Ingest([FromForm] MobileIngestRequest request, CancellationToken ct)
    {
        var file = request.File;
        if (file == null || file.Length == 0)
            return BadRequest(new { error = "file is required" });

        var fileName = string.IsNullOrWhiteSpace(request.FileName)
            ? Path.GetFileName(file.FileName)
            : Path.GetFileName(request.FileName);
        if (string.IsNullOrWhiteSpace(fileName))
            return BadRequest(new { error = "fileName is required" });

        var size = file.Length;

        // Dedupe: same contract the Agent uses (filename + size, with iCloud-suffix fuzzing).
        if (await _md5Manager.FileExistsAsync(fileName, size))
        {
            _logger.LogDebug("iOS ingest skipped (already on Master): {File}", fileName);
            return Ok(new { skipped = true, reason = "exists", fileName });
        }

        var archiveDir = _configuration["UltraSonic:AppleImport:ArchiveDirectory"];
        if (string.IsNullOrWhiteSpace(archiveDir))
            archiveDir = _configuration["UltraSonic:ArchivePaths:Current"];
        if (string.IsNullOrWhiteSpace(archiveDir))
            return StatusCode(500, new { error = "UltraSonic:AppleImport:ArchiveDirectory is not configured" });

        var captureTime = request.CaptureTime ?? DateTime.Now;

        var targetDir = Path.Combine(
            archiveDir,
            captureTime.Year.ToString(),
            captureTime.ToString("yyyy-MM-dd"));
        Directory.CreateDirectory(targetDir);

        var targetFile = Path.Combine(targetDir, fileName);

        // Disk-level guard in case the catalog and the filesystem disagree.
        if (System.IO.File.Exists(targetFile) && new FileInfo(targetFile).Length == size)
        {
            _logger.LogDebug("iOS ingest skipped (file already on disk): {File}", targetFile);
            return Ok(new { skipped = true, reason = "on-disk", fileName });
        }

        string md5;
        try
        {
            await using (var dest = new FileStream(targetFile, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                await file.CopyToAsync(dest, ct);
            }
            md5 = await ComputeMd5Async(targetFile, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "iOS ingest failed writing {File}", targetFile);
            try { if (System.IO.File.Exists(targetFile)) System.IO.File.Delete(targetFile); } catch { /* best-effort */ }
            return StatusCode(500, new { error = "failed to store file", detail = ex.Message });
        }

        var entity = new FileMD5Entity
        {
            FilePath = targetDir,
            FileName = fileName,
            CameraMaker = request.CameraMaker ?? "",
            CameraModel = request.CameraModel ?? "",
            LensModel = request.LensModel ?? "",
            AgentId = string.IsNullOrWhiteSpace(request.AgentId) ? "ios" : request.AgentId,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            FileSize = size,
            FileMD5 = md5,
            CaptureTime = captureTime
        };
        await _md5Manager.SaveFileMD5Async(entity);

        // Mirror the Agent's archive-history bookkeeping.
        try
        {
            using var db = _md5Manager.OpenDb();
            await db.InsertAsync(new ArchiveHistoryEntity
            {
                SourcePath = $"ios:{request.SourceType ?? "userLibrary"}",
                TargetPath = targetFile,
                FileName = fileName,
                FileSize = size,
                FileMD5 = md5,
                TransferMode = "upload",
                DeviceName = request.CameraModel,
                AgentId = entity.AgentId,
                AgentName = "iOS Companion",
                CameraModel = request.CameraModel,
                CaptureTime = captureTime,
                ArchivedAt = DateTime.Now
            });
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "iOS ingest: archive-history insert failed for {File}", fileName);
        }

        // Gossip-replicate to peer Masters, same as the Agent push path.
        _replicationService.Enqueue(new List<FileMD5Entity> { entity });

        _logger.LogInformation("iOS ingest stored {File} ({Size} bytes) -> {Target}", fileName, size, targetFile);
        return Ok(new { saved = true, path = targetFile, md5, fileName });
    }

    private static async Task<string> ComputeMd5Async(string path, CancellationToken ct)
    {
        await using var fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
        using var md5 = MD5.Create();
        var hash = await md5.ComputeHashAsync(fs, ct);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }
}

/// <summary>Multipart form payload for <see cref="MobileIngestController.Ingest"/>.</summary>
public class MobileIngestRequest
{
    /// <summary>The raw media bytes (HEIC/JPEG/MOV/MP4...).</summary>
    public IFormFile? File { get; set; }

    /// <summary>Original filename, e.g. IMG_1234.HEIC. Falls back to the uploaded file's name.</summary>
    public string? FileName { get; set; }

    public string? CameraMaker { get; set; }
    public string? CameraModel { get; set; }
    public string? LensModel { get; set; }

    /// <summary>PHAsset.creationDate. Drives the yyyy/yyyy-MM-dd archive folder.</summary>
    public DateTime? CaptureTime { get; set; }

    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    /// <summary>PHAsset.sourceType label (e.g. "userLibrary"), recorded for provenance.</summary>
    public string? SourceType { get; set; }

    /// <summary>Logical source id stored in the catalog. Defaults to "ios".</summary>
    public string? AgentId { get; set; }
}
