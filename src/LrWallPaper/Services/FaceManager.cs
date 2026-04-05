using NPoco;
using Microsoft.Data.Sqlite;

namespace LrWallPaper.Services;

[TableName("persons")]
public record PersonEntity
{
    [Column("id")] public long Id { get; set; }
    [Column("name")] public string Name { get; set; } = "";
    [Column("avatar_file_id")] public long? AvatarFileId { get; set; }
    [Column("created_at")] public DateTime CreatedAt { get; set; }
}

[TableName("face_detections")]
public record FaceDetectionEntity
{
    [Column("id")] public long Id { get; set; }
    [Column("file_id")] public long FileId { get; set; }
    [Column("person_id")] public long? PersonId { get; set; }
    [Column("region_x")] public double RegionX { get; set; }
    [Column("region_y")] public double RegionY { get; set; }
    [Column("region_w")] public double RegionW { get; set; }
    [Column("region_h")] public double RegionH { get; set; }
    [Column("confidence")] public double Confidence { get; set; }
    [Column("created_at")] public DateTime CreatedAt { get; set; }
}

public class FaceManager
{
    private readonly ILogger<FaceManager> _logger;
    private readonly string _connectionString;

    private IDatabase OpenDb() => new Database(_connectionString, DatabaseType.SQLite, SqliteFactory.Instance);

    public FaceManager(ILogger<FaceManager> logger)
    {
        _logger = logger;
        var dbPath = System.IO.Path.Combine(AppContext.BaseDirectory, "ultrasonic.db");
        _connectionString = $"Data Source={dbPath}";
    }

    // === Person CRUD ===

    public async Task<List<PersonEntity>> GetAllPersonsAsync()
    {
        using var db = OpenDb();
        return await db.FetchAsync<PersonEntity>("SELECT * FROM persons ORDER BY name");
    }

    public async Task<PersonEntity> CreatePersonAsync(string name)
    {
        using var db = OpenDb();
        // Check if exists
        var existing = await db.FirstOrDefaultAsync<PersonEntity>("SELECT * FROM persons WHERE name = @0", name);
        if (existing != null) return existing;

        var entity = new PersonEntity { Name = name, CreatedAt = DateTime.Now };
        await db.InsertAsync(entity);
        return entity;
    }

    public async Task<PersonEntity?> GetPersonAsync(long id)
    {
        using var db = OpenDb();
        return await db.FirstOrDefaultAsync<PersonEntity>("SELECT * FROM persons WHERE id = @0", id);
    }

    public async Task UpdatePersonAsync(long id, string name, long? avatarFileId = null)
    {
        using var db = OpenDb();
        await db.ExecuteAsync("UPDATE persons SET name = @0, avatar_file_id = @1 WHERE id = @2", name, avatarFileId, id);
    }

    public async Task DeletePersonAsync(long id)
    {
        using var db = OpenDb();
        await db.ExecuteAsync("UPDATE face_detections SET person_id = NULL WHERE person_id = @0", id);
        await db.ExecuteAsync("DELETE FROM persons WHERE id = @0", id);
    }

    // === Face Detection CRUD ===

    public async Task<long> SaveFaceDetectionAsync(long fileId, FaceDetection face)
    {
        using var db = OpenDb();
        var entity = new FaceDetectionEntity
        {
            FileId = fileId,
            RegionX = face.X,
            RegionY = face.Y,
            RegionW = face.Width,
            RegionH = face.Height,
            Confidence = face.Confidence,
            CreatedAt = DateTime.Now
        };
        await db.InsertAsync(entity);
        return entity.Id;
    }

    public async Task<List<FaceDetectionEntity>> GetFacesForFileAsync(long fileId)
    {
        using var db = OpenDb();
        return await db.FetchAsync<FaceDetectionEntity>(
            "SELECT * FROM face_detections WHERE file_id = @0 ORDER BY id", fileId);
    }

    public async Task<List<object>> GetFacesWithPersonForFileAsync(long fileId)
    {
        using var db = OpenDb();
        var faces = await db.FetchAsync<FaceDetectionEntity>(
            "SELECT * FROM face_detections WHERE file_id = @0 ORDER BY id", fileId);

        var result = new List<object>();
        foreach (var f in faces)
        {
            PersonEntity? person = null;
            if (f.PersonId.HasValue)
                person = await db.FirstOrDefaultAsync<PersonEntity>("SELECT * FROM persons WHERE id = @0", f.PersonId.Value);

            result.Add(new
            {
                f.Id, f.FileId, f.PersonId,
                regionX = f.RegionX, regionY = f.RegionY, regionW = f.RegionW, regionH = f.RegionH,
                f.Confidence,
                personName = person?.Name
            });
        }
        return result;
    }

    public async Task AssignFaceToPersonAsync(long faceId, long personId)
    {
        using var db = OpenDb();
        await db.ExecuteAsync("UPDATE face_detections SET person_id = @0 WHERE id = @1", personId, faceId);
    }

    public async Task ClearFacesForFileAsync(long fileId)
    {
        using var db = OpenDb();
        await db.ExecuteAsync("DELETE FROM face_detections WHERE file_id = @0", fileId);
    }

    /// <summary>
    /// Get all files containing a specific person
    /// </summary>
    public async Task<List<long>> GetFilesByPersonAsync(long personId)
    {
        using var db = OpenDb();
        return await db.FetchAsync<long>(
            "SELECT DISTINCT file_id FROM face_detections WHERE person_id = @0", personId);
    }

    /// <summary>
    /// Get person statistics: how many faces detected per person
    /// </summary>
    public async Task<List<object>> GetPersonStatsAsync()
    {
        using var db = OpenDb();
        var persons = await db.FetchAsync<PersonEntity>("SELECT * FROM persons ORDER BY name");
        var result = new List<object>();
        foreach (var p in persons)
        {
            var count = await db.ExecuteScalarAsync<int>(
                "SELECT COUNT(*) FROM face_detections WHERE person_id = @0", p.Id);
            result.Add(new { p.Id, p.Name, p.AvatarFileId, faceCount = count });
        }

        // Also count unidentified faces
        var unidentified = await db.ExecuteScalarAsync<int>(
            "SELECT COUNT(*) FROM face_detections WHERE person_id IS NULL");
        result.Add(new { Id = (long)0, Name = "Unknown", AvatarFileId = (long?)null, faceCount = unidentified });

        return result;
    }

    /// <summary>
    /// Get total face detection stats
    /// </summary>
    public async Task<object> GetStatsAsync()
    {
        using var db = OpenDb();
        var totalFaces = await db.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM face_detections");
        var totalPersons = await db.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM persons");
        var identifiedFaces = await db.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM face_detections WHERE person_id IS NOT NULL");
        var filesWithFaces = await db.ExecuteScalarAsync<int>("SELECT COUNT(DISTINCT file_id) FROM face_detections");
        return new { totalFaces, totalPersons, identifiedFaces, unidentifiedFaces = totalFaces - identifiedFaces, filesWithFaces };
    }
}
