using NPoco;
using Microsoft.Data.Sqlite;

namespace LrWallPaper.Services;

[TableName("tags")]
public record TagEntity
{
    [Column("id")]
    public long Id { get; set; }
    [Column("name")]
    public string Name { get; set; } = "";
    [Column("category")]
    public string Category { get; set; } = "";
}

public class TagManager
{
    private readonly string _connectionString;

    private IDatabase OpenDb() => new Database(_connectionString, DatabaseType.SQLite, SqliteFactory.Instance);

    public TagManager()
    {
        var dbPath = Path.Combine(AppContext.BaseDirectory, "ultrasonic.db");
        _connectionString = $"Data Source={dbPath}";
    }

    // --- Tag CRUD ---

    public async Task<List<TagEntity>> GetAllTagsAsync()
    {
        using var db = OpenDb();
        return await db.FetchAsync<TagEntity>("SELECT * FROM tags ORDER BY category, name");
    }

    public async Task<TagEntity> CreateTagAsync(string name, string category = "")
    {
        using var db = OpenDb();
        // Return existing if already exists
        var existing = (await db.FetchAsync<TagEntity>("SELECT * FROM tags WHERE name = @0", name)).FirstOrDefault();
        if (existing != null) return existing;

        await db.ExecuteAsync("INSERT INTO tags (name, category) VALUES (@0, @1)", name, category);
        return (await db.FetchAsync<TagEntity>("SELECT * FROM tags WHERE name = @0", name)).First();
    }

    public async Task DeleteTagAsync(long tagId)
    {
        using var db = OpenDb();
        await db.ExecuteAsync("DELETE FROM file_tags WHERE tag_id = @0", tagId);
        await db.ExecuteAsync("DELETE FROM tags WHERE id = @0", tagId);
    }

    // --- File-Tag Association ---

    public async Task AddTagToFileAsync(long fileId, long tagId)
    {
        using var db = OpenDb();
        await db.ExecuteAsync("INSERT OR IGNORE INTO file_tags (file_id, tag_id) VALUES (@0, @1)", fileId, tagId);
    }

    public async Task RemoveTagFromFileAsync(long fileId, long tagId)
    {
        using var db = OpenDb();
        await db.ExecuteAsync("DELETE FROM file_tags WHERE file_id = @0 AND tag_id = @1", fileId, tagId);
    }

    public async Task<List<TagEntity>> GetTagsForFileAsync(long fileId)
    {
        using var db = OpenDb();
        return await db.FetchAsync<TagEntity>(
            "SELECT t.* FROM tags t JOIN file_tags ft ON t.id = ft.tag_id WHERE ft.file_id = @0 ORDER BY t.name", fileId);
    }

    public async Task SetFileTagsAsync(long fileId, List<long> tagIds)
    {
        using var db = OpenDb();
        await db.ExecuteAsync("DELETE FROM file_tags WHERE file_id = @0", fileId);
        foreach (var tagId in tagIds)
            await db.ExecuteAsync("INSERT OR IGNORE INTO file_tags (file_id, tag_id) VALUES (@0, @1)", fileId, tagId);
    }

    // --- Batch tagging ---

    public async Task AddTagToFilesAsync(List<long> fileIds, long tagId)
    {
        using var db = OpenDb();
        foreach (var fileId in fileIds)
            await db.ExecuteAsync("INSERT OR IGNORE INTO file_tags (file_id, tag_id) VALUES (@0, @1)", fileId, tagId);
    }

    // --- Query: files by tag ---

    public async Task<List<long>> GetFileIdsByTagAsync(long tagId)
    {
        using var db = OpenDb();
        return await db.FetchAsync<long>("SELECT file_id FROM file_tags WHERE tag_id = @0", tagId);
    }

    // --- Stats ---

    public async Task<List<object>> GetTagStatsAsync()
    {
        using var db = OpenDb();
        var sql = @"SELECT t.id, t.name, t.category, COUNT(ft.file_id) as file_count
                    FROM tags t LEFT JOIN file_tags ft ON t.id = ft.tag_id
                    GROUP BY t.id ORDER BY t.category, t.name";
        return await db.FetchAsync<dynamic>(sql);
    }
}
