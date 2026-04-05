using NPoco;
using Microsoft.Data.Sqlite;

namespace LrWallPaper.Services;

[TableName("backup_tasks")]
public record BackupTaskEntity
{
    [Column("id")] public long Id { get; set; }
    [Column("file_id")] public long FileId { get; set; }
    [Column("provider")] public string Provider { get; set; } = "115";
    [Column("remote_path")] public string? RemotePath { get; set; }
    [Column("remote_id")] public string? RemoteId { get; set; }
    [Column("status")] public string Status { get; set; } = "pending";
    [Column("file_sha1")] public string? FileSha1 { get; set; }
    [Column("last_attempt")] public DateTime? LastAttempt { get; set; }
    [Column("error_message")] public string? ErrorMessage { get; set; }
    [Column("created_at")] public DateTime CreatedAt { get; set; }
    [Column("completed_at")] public DateTime? CompletedAt { get; set; }
}

public class BackupManager
{
    private readonly ILogger<BackupManager> _logger;
    private readonly string _connectionString;

    private IDatabase OpenDb() => new Database(_connectionString, DatabaseType.SQLite, SqliteFactory.Instance);

    public BackupManager(ILogger<BackupManager> logger)
    {
        _logger = logger;
        var dbPath = System.IO.Path.Combine(AppContext.BaseDirectory, "ultrasonic.db");
        _connectionString = $"Data Source={dbPath}";
    }

    public async Task<BackupTaskEntity?> GetTaskForFileAsync(long fileId, string provider = "115")
    {
        using var db = OpenDb();
        return await db.FirstOrDefaultAsync<BackupTaskEntity>(
            "SELECT * FROM backup_tasks WHERE file_id = @0 AND provider = @1", fileId, provider);
    }

    public async Task<BackupTaskEntity> CreateOrUpdateTaskAsync(long fileId, string provider, string status, string? remotePath = null, string? remoteId = null, string? sha1 = null, string? error = null)
    {
        using var db = OpenDb();
        var existing = await db.FirstOrDefaultAsync<BackupTaskEntity>(
            "SELECT * FROM backup_tasks WHERE file_id = @0 AND provider = @1", fileId, provider);

        if (existing != null)
        {
            existing.Status = status;
            existing.RemotePath = remotePath ?? existing.RemotePath;
            existing.RemoteId = remoteId ?? existing.RemoteId;
            existing.FileSha1 = sha1 ?? existing.FileSha1;
            existing.ErrorMessage = error;
            existing.LastAttempt = DateTime.Now;
            if (status == "completed") existing.CompletedAt = DateTime.Now;
            await db.UpdateAsync(existing);
            return existing;
        }

        var task = new BackupTaskEntity
        {
            FileId = fileId,
            Provider = provider,
            Status = status,
            RemotePath = remotePath,
            RemoteId = remoteId,
            FileSha1 = sha1,
            ErrorMessage = error,
            CreatedAt = DateTime.Now,
            LastAttempt = DateTime.Now
        };
        if (status == "completed") task.CompletedAt = DateTime.Now;
        await db.InsertAsync(task);
        return task;
    }

    public async Task<List<BackupTaskEntity>> GetPendingTasksAsync(string provider = "115", int limit = 50)
    {
        using var db = OpenDb();
        return await db.FetchAsync<BackupTaskEntity>(
            "SELECT * FROM backup_tasks WHERE provider = @0 AND status IN ('pending', 'failed') ORDER BY created_at LIMIT @1",
            provider, limit);
    }

    public async Task<List<long>> GetUnbackedFileIdsAsync(string provider = "115", int limit = 100)
    {
        using var db = OpenDb();
        return await db.FetchAsync<long>("""
            SELECT f.id FROM file_info f
            LEFT JOIN backup_tasks bt ON f.id = bt.file_id AND bt.provider = @0
            WHERE bt.id IS NULL
            ORDER BY f.capture_time DESC
            LIMIT @1
            """, provider, limit);
    }

    public async Task<object> GetStatsAsync(string provider = "115")
    {
        using var db = OpenDb();
        var total = await db.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM file_info");
        var backed = await db.ExecuteScalarAsync<int>(
            "SELECT COUNT(*) FROM backup_tasks WHERE provider = @0 AND status = 'completed'", provider);
        var pending = await db.ExecuteScalarAsync<int>(
            "SELECT COUNT(*) FROM backup_tasks WHERE provider = @0 AND status = 'pending'", provider);
        var uploading = await db.ExecuteScalarAsync<int>(
            "SELECT COUNT(*) FROM backup_tasks WHERE provider = @0 AND status = 'uploading'", provider);
        var failed = await db.ExecuteScalarAsync<int>(
            "SELECT COUNT(*) FROM backup_tasks WHERE provider = @0 AND status = 'failed'", provider);

        return new { totalFiles = total, backedUp = backed, pending, uploading, failed, notQueued = total - backed - pending - uploading - failed };
    }

    public async Task<List<BackupTaskEntity>> GetRecentTasksAsync(string provider = "115", int limit = 50)
    {
        using var db = OpenDb();
        return await db.FetchAsync<BackupTaskEntity>(
            "SELECT * FROM backup_tasks WHERE provider = @0 ORDER BY last_attempt DESC LIMIT @1", provider, limit);
    }

    public async Task ClearFailedTasksAsync(string provider = "115")
    {
        using var db = OpenDb();
        await db.ExecuteAsync(
            "UPDATE backup_tasks SET status = 'pending', error_message = NULL WHERE provider = @0 AND status = 'failed'", provider);
    }
}
