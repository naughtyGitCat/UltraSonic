using LrWallPaper.Models;
using LrWallPaper.Services;

namespace LrWallPaper.Jobs;

public class CloudBackupJob : BackgroundService
{
    private readonly ILogger<CloudBackupJob> _logger;
    private readonly BackupManager _backupManager;
    private readonly FileMD5Manager _md5Manager;
    private readonly Cloud115Service _cloud115;
    private readonly UltraSonicConfig _config;

    public CloudBackupJob(ILogger<CloudBackupJob> logger, BackupManager backupManager,
        FileMD5Manager md5Manager, Cloud115Service cloud115, UltraSonicConfig config)
    {
        _logger = logger;
        _backupManager = backupManager;
        _md5Manager = md5Manager;
        _cloud115 = cloud115;
        _config = config;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("CloudBackupJob started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                if (_config.Backup is { Enabled: true, AutoBackup: true } && !string.IsNullOrEmpty(_config.Backup.Cookie))
                {
                    await ProcessBackupQueue(stoppingToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "CloudBackupJob error");
            }

            var interval = TimeSpan.FromMinutes(Math.Max(_config.Backup.SyncIntervalMinutes, 5));
            await Task.Delay(interval, stoppingToken);
        }
    }

    private async Task ProcessBackupQueue(CancellationToken ct)
    {
        _cloud115.SetCookie(_config.Backup.Cookie);

        // First, auto-queue new files if configured
        var unbacked = await _backupManager.GetUnbackedFileIdsAsync(limit: 50);
        foreach (var fileId in unbacked)
        {
            await _backupManager.CreateOrUpdateTaskAsync(fileId, "115", "pending");
        }

        // Process pending tasks
        var pending = await _backupManager.GetPendingTasksAsync(limit: _config.Backup.MaxConcurrentUploads);
        if (pending.Count == 0) return;

        _logger.LogInformation("Processing {Count} pending backup tasks", pending.Count);

        foreach (var task in pending)
        {
            if (ct.IsCancellationRequested) break;

            var capture = await _md5Manager.GetCaptureByIdAsync(task.FileId);
            if (capture == null)
            {
                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", error: "File record not found");
                continue;
            }

            if (!string.IsNullOrEmpty(capture.AgentId) && capture.AgentId != "local")
            {
                // Skip remote agent files for now
                continue;
            }

            if (!System.IO.File.Exists(capture.FileFullPath))
            {
                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", error: "File not found on disk");
                continue;
            }

            try
            {
                var date = capture.CaptureTime != default ? capture.CaptureTime : capture.CreateTime;
                var remotePath = $"{_config.Backup.RemoteBasePath.TrimEnd('/')}/{date:yyyy}/{date:MM}";
                var targetCid = await _cloud115.EnsureDirectoryPathAsync(remotePath);

                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "uploading", remotePath);

                var (ok, pickCode, msg) = await _cloud115.UploadFileAsync(capture.FileFullPath, targetCid, ct: ct);

                if (ok)
                {
                    await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "completed", remotePath, pickCode);
                    _logger.LogInformation("Backed up {File} via {Method}", capture.FileName, msg);
                }
                else
                {
                    await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", remotePath, error: msg);
                    _logger.LogWarning("Backup failed for {File}: {Msg}", capture.FileName, msg);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Backup error for file {Id}", task.FileId);
                await _backupManager.CreateOrUpdateTaskAsync(task.FileId, "115", "failed", error: ex.Message);
            }
        }
    }
}
