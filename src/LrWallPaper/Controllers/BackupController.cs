using LrWallPaper.Models;
using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BackupController : ControllerBase
{
    private readonly ILogger<BackupController> _logger;
    private readonly FileMD5Manager _md5Manager;
    private readonly BackupManager _backupManager;
    private readonly Cloud115Service _cloud115;
    private readonly UltraSonicConfig _config;

    public BackupController(ILogger<BackupController> logger, FileMD5Manager md5Manager,
        BackupManager backupManager, Cloud115Service cloud115, UltraSonicConfig config)
    {
        _logger = logger;
        _md5Manager = md5Manager;
        _backupManager = backupManager;
        _cloud115 = cloud115;
        _config = config;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        return Ok(await _backupManager.GetStatsAsync());
    }

    [HttpGet("recent")]
    public async Task<IActionResult> GetRecent([FromQuery] int limit = 50)
    {
        var tasks = await _backupManager.GetRecentTasksAsync(limit: limit);
        // Enrich with file info
        var result = new List<object>();
        foreach (var t in tasks)
        {
            var file = await _md5Manager.GetCaptureByIdAsync(t.FileId);
            result.Add(new
            {
                t.Id, t.FileId, t.Provider, t.RemotePath, t.Status,
                t.ErrorMessage, t.LastAttempt, t.CompletedAt,
                fileName = file?.FileName, filePath = file?.FilePath
            });
        }
        return Ok(result);
    }

    [HttpPost("test")]
    public async Task<IActionResult> TestConnection()
    {
        _cloud115.SetCookie(_config.Backup.Cookie);
        var (ok, message) = await _cloud115.TestConnectionAsync();
        return Ok(new { ok, message });
    }

    /// <summary>
    /// Queue specific files for backup
    /// </summary>
    [HttpPost("queue")]
    public async Task<IActionResult> QueueFiles([FromBody] BackupQueueRequest req)
    {
        var queued = 0;
        foreach (var fileId in req.FileIds)
        {
            var existing = await _backupManager.GetTaskForFileAsync(fileId);
            if (existing?.Status == "completed") continue;
            await _backupManager.CreateOrUpdateTaskAsync(fileId, "115", "pending");
            queued++;
        }
        return Ok(new { queued, total = req.FileIds.Count });
    }

    /// <summary>
    /// Queue all un-backed files
    /// </summary>
    [HttpPost("queue-all")]
    public async Task<IActionResult> QueueAll([FromQuery] int limit = 500)
    {
        var unbackedIds = await _backupManager.GetUnbackedFileIdsAsync(limit: limit);
        var queued = 0;
        foreach (var fileId in unbackedIds)
        {
            await _backupManager.CreateOrUpdateTaskAsync(fileId, "115", "pending");
            queued++;
        }
        return Ok(new { queued });
    }

    /// <summary>
    /// Upload specific files immediately (sync)
    /// </summary>
    [HttpPost("upload")]
    public async Task<IActionResult> UploadNow([FromBody] BackupQueueRequest req)
    {
        _cloud115.SetCookie(_config.Backup.Cookie);
        var results = new List<object>();

        foreach (var fileId in req.FileIds)
        {
            var capture = await _md5Manager.GetCaptureByIdAsync(fileId);
            if (capture == null) { results.Add(new { fileId, error = "Not found" }); continue; }

            // Only support local files for now
            if (!string.IsNullOrEmpty(capture.AgentId) && capture.AgentId != "local")
            {
                results.Add(new { fileId, error = "Remote agent files not supported yet" });
                continue;
            }

            if (!System.IO.File.Exists(capture.FileFullPath))
            {
                results.Add(new { fileId, error = "File not found on disk" });
                continue;
            }

            try
            {
                // Determine remote path: /UltraSonic/YYYY/MM/filename
                var date = capture.CaptureTime != default ? capture.CaptureTime : capture.CreateTime;
                var remotePath = $"{_config.Backup.RemoteBasePath.TrimEnd('/')}/{date:yyyy}/{date:MM}";
                var targetCid = await _cloud115.EnsureDirectoryPathAsync(remotePath);

                await _backupManager.CreateOrUpdateTaskAsync(fileId, "115", "uploading", remotePath);

                var (ok, pickCode, msg) = await _cloud115.UploadFileAsync(capture.FileFullPath, targetCid);

                if (ok)
                {
                    await _backupManager.CreateOrUpdateTaskAsync(fileId, "115", "completed",
                        remotePath, pickCode);
                    results.Add(new { fileId, fileName = capture.FileName, status = "completed", pickCode, method = msg });
                }
                else
                {
                    await _backupManager.CreateOrUpdateTaskAsync(fileId, "115", "failed",
                        remotePath, error: msg);
                    results.Add(new { fileId, fileName = capture.FileName, status = "failed", error = msg });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Backup upload failed for {File}", capture.FileName);
                await _backupManager.CreateOrUpdateTaskAsync(fileId, "115", "failed", error: ex.Message);
                results.Add(new { fileId, error = ex.Message });
            }
        }
        return Ok(results);
    }

    /// <summary>
    /// Process pending backup queue
    /// </summary>
    [HttpPost("process")]
    public async Task<IActionResult> ProcessQueue([FromQuery] int limit = 10)
    {
        _cloud115.SetCookie(_config.Backup.Cookie);
        var pending = await _backupManager.GetPendingTasksAsync(limit: limit);

        var processed = 0;
        var succeeded = 0;
        var failed = 0;

        foreach (var task in pending)
        {
            var capture = await _md5Manager.GetCaptureByIdAsync(task.FileId);
            if (capture == null)
            {
                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", error: "File record not found");
                failed++;
                continue;
            }

            if (!string.IsNullOrEmpty(capture.AgentId) && capture.AgentId != "local")
            {
                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", error: "Remote agent files not supported");
                failed++;
                continue;
            }

            if (!System.IO.File.Exists(capture.FileFullPath))
            {
                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", error: "File not found on disk");
                failed++;
                continue;
            }

            try
            {
                var date = capture.CaptureTime != default ? capture.CaptureTime : capture.CreateTime;
                var remotePath = $"{_config.Backup.RemoteBasePath.TrimEnd('/')}/{date:yyyy}/{date:MM}";
                var targetCid = await _cloud115.EnsureDirectoryPathAsync(remotePath);

                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "uploading", remotePath);

                var (ok, pickCode, msg) = await _cloud115.UploadFileAsync(capture.FileFullPath, targetCid);

                if (ok)
                {
                    await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "completed", remotePath, pickCode);
                    succeeded++;
                }
                else
                {
                    await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", remotePath, error: msg);
                    failed++;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Backup failed for file {Id}", task.FileId);
                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", error: ex.Message);
                failed++;
            }
            processed++;
        }

        return Ok(new { processed, succeeded, failed });
    }

    [HttpPost("retry-failed")]
    public async Task<IActionResult> RetryFailed()
    {
        await _backupManager.ClearFailedTasksAsync();
        return Ok(new { message = "Failed tasks reset to pending" });
    }

    [HttpGet("browse")]
    public async Task<IActionResult> BrowseRemote([FromQuery] string cid = "0")
    {
        _cloud115.SetCookie(_config.Backup.Cookie);
        var files = await _cloud115.ListFilesAsync(cid);
        return Ok(files);
    }
}

public class BackupQueueRequest
{
    public List<long> FileIds { get; set; } = [];
}
