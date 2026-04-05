using NPoco;
using Microsoft.Data.Sqlite;
using System.Security.Cryptography;
using System.Data.Common;
using Newtonsoft.Json;
namespace LrWallPaper.Services
{
    [TableName("file_info")]
    public record FileMD5Entity
    {
        [Column("id")]
        public long Id { get; set; }
        [Column("fullpath")]
        public string FileFullPath => Path.Join(FilePath, FileName);
        [Column("filepath")]
        public string FilePath { get; set; }
        [Column("filename")]
        public string FileName { get; set; }
        [Column("camera_maker")]
        public string CameraMaker { get; set; }

        [Column("camera_model")]
        public string CameraModel { get; set; }

        [Column("lens_model")]
        public string LensModel { get; set; }
        
        [Column("agent_id")]
        public string? AgentId { get; set; }

        [Column("latitude")]
        public double? Latitude { get; set; }

        [Column("longitude")]
        public double? Longitude { get; set; }

        [Column("file_size")]
        public long FileSize { get; set; }

        [Column("file_md5")]
        public string FileMD5 { get; set; }
        [Column("capture_time")]
        public DateTime CaptureTime { get; set; }
        [Column("create_time")]
        public DateTime CreateTime { get; set; }
        [Column("update_time")]
        public DateTime UpdateTime { get; set; }
    }
    public class FileMD5Manager
    {
        private readonly ILogger<FileMD5Manager> _logger;
        private readonly string _connectionString;

        private IDatabase OpenDb() => new Database(_connectionString, DatabaseType.SQLite, SqliteFactory.Instance);

        public FileMD5Manager(ILogger<FileMD5Manager> logger)
        {
            _logger = logger;
            var dbPath = Path.Combine(AppContext.BaseDirectory, "ultrasonic.db");
            _connectionString = $"Data Source={dbPath}";
            using var db = OpenDb();
            PrepareTable(db);
        }

        private void PrepareTable(IDatabase db)
        {
            var sql = """
                  CREATE TABLE IF NOT EXISTS file_info (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  fullpath TEXT NOT NULL,
                  filepath TEXT NOT NULL,
                  filename TEXT NOT NULL,
                  camera_maker TEXT NOT NULL,
                  camera_model TEXT NOT NULL,
                  lens_model TEXT NOT NULL,
                  agent_id TEXT NULL,
                  file_size INTEGER NOT NULL,
                  file_md5 TEXT NOT NULL,
                  capture_time DATETIME NOT NULL,
                  create_time DATETIME NOT NULL,
                  update_time DATETIME NOT NULL,
                  UNIQUE (fullpath),
                  UNIQUE (filepath, filename),
                  UNIQUE (filename, file_md5)
                );

                CREATE TABLE IF NOT EXISTS agent_info (
                  id TEXT PRIMARY KEY,
                  name TEXT NOT NULL,
                  endpoint TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS tags (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL UNIQUE,
                  category TEXT NOT NULL DEFAULT ''
                );

                CREATE TABLE IF NOT EXISTS file_tags (
                  file_id INTEGER NOT NULL,
                  tag_id INTEGER NOT NULL,
                  PRIMARY KEY (file_id, tag_id),
                  FOREIGN KEY (file_id) REFERENCES file_info(id) ON DELETE CASCADE,
                  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
                );
                """;
            db.Execute(sql);

            try { db.Execute("ALTER TABLE file_info ADD COLUMN agent_id TEXT NULL;"); } catch {}
            try { db.Execute("UPDATE file_info SET agent_id = 'local' WHERE agent_id IS NULL;"); } catch {}
            try { db.Execute("ALTER TABLE file_info ADD COLUMN latitude REAL NULL;"); } catch {}
            try { db.Execute("ALTER TABLE file_info ADD COLUMN longitude REAL NULL;"); } catch {}
        }

        public async Task SaveFileMD5Async(FileMD5Entity file) 
        {
            var sql = $"""
                INSERT OR REPLACE INTO 
                file_info (fullpath,filepath,filename,camera_maker,camera_model,lens_model,agent_id,file_size,file_md5,capture_time,create_time,update_time)
                VALUES ('{file.FileFullPath}', '{file.FilePath}', '{file.FileName}','{file.CameraMaker}', '{file.CameraModel}', '{file.LensModel}','{file.AgentId}','{file.FileSize}', '{file.FileMD5}','{file.CaptureTime:yyyy-MM-dd HH:mm:ss}', '{DateTime.Now:yyyy-MM-dd HH:mm:ss}',  '{DateTime.Now:yyyy-MM-dd HH:mm:ss}')

                """;
            _logger.LogInformation(file.ToString());
            _logger.LogInformation( sql );
            var pSQL = """
                               INSERT OR REPLACE INTO
                                file_info
                                (fullpath,filepath,filename,camera_maker,camera_model,lens_model,agent_id,latitude,longitude,file_size,file_md5,capture_time,create_time,update_time)
                                VALUES
                                (
                                    @fullpath,
                                    @filepath,
                                    @filename,
                                    @camera_maker,
                                    @camera_model,
                                    @lens_model,
                                    @agent_id,
                                    @latitude,
                                    @longitude,
                                    @file_size,
                                    @file_md5,
                                    @capture_time,
                                    @create_time,
                                    @update_time
                                )
                """;
            /*   using var conn = _database.Connection;
               conn.Open();
               if (conn is null)
               {
                   throw new Exception("conn is null");
               }*/
            using var conn = new SqliteConnection(_connectionString);
             conn.Open();
            // var cmd = _database.CreateCommand(conn, commandType: System.Data.CommandType.Text, pSQL);
            var cmd = conn.CreateCommand();
            cmd.CommandText = pSQL;
            cmd.Parameters.Add(new SqliteParameter("@fullpath", file.FileFullPath));
            cmd.Parameters.Add(new SqliteParameter("@filepath", file.FilePath));
            cmd.Parameters.Add(new SqliteParameter("@filename", file.FileName));
            cmd.Parameters.Add(new SqliteParameter("@camera_maker", file.CameraMaker));
            cmd.Parameters.Add(new SqliteParameter("@camera_model", file.CameraModel));
            cmd.Parameters.Add(new SqliteParameter("@lens_model", file.LensModel));
            cmd.Parameters.Add(new SqliteParameter("@agent_id", file.AgentId ?? "local"));
            cmd.Parameters.Add(new SqliteParameter("@latitude", file.Latitude.HasValue ? file.Latitude.Value : DBNull.Value));
            cmd.Parameters.Add(new SqliteParameter("@longitude", file.Longitude.HasValue ? file.Longitude.Value : DBNull.Value));
            cmd.Parameters.Add(new SqliteParameter("@file_size", file.FileSize==0?(object)0:file.FileSize));
            cmd.Parameters.Add(new SqliteParameter("@file_md5", file.FileMD5));
            cmd.Parameters.Add(new SqliteParameter("@capture_time", $"{file.CaptureTime:yyyy-MM-dd HH:mm:ss}"));
            cmd.Parameters.Add(new SqliteParameter("@create_time", $"{DateTime.Now:yyyy-MM-dd HH:mm:ss}"));
            cmd.Parameters.Add(new SqliteParameter("@update_time", $"{DateTime.Now:yyyy-MM-dd HH:mm:ss}"));

            await cmd.ExecuteNonQueryAsync();
            // await _database.ExecuteAsync(MySqlConnector.MySqlHelper.EscapeString(sql));
        }

        public async Task SaveFileMD5Async(string filepath,  string filename, string md5)
        {
            using var db = OpenDb();
            var sql = $"""
                INSERT OR REPLACE INTO
                file_info (fullpath,filepath,filename,md5,create_time,update_time)
                VALUES ('{Path.Join(filepath, filename)}', '{filepath}', '{filename.Replace("@", "@@")}', '{md5}', '{DateTime.Now:yyyy-MM-dd HH:mm:ss}',  '{DateTime.Now:yyyy-MM-dd HH:mm:ss}')
                """;
            await db.ExecuteAsync(sql);
        }

        public async Task SaveFileMD5Async(string fullpath, string md5)
        {
            using var db = OpenDb();
            var filepath = Path.GetDirectoryName(fullpath);
            var filename = Path.GetFileName(fullpath);
            var sql = $"""
                INSERT OR REPLACE INTO
                file_info (fullpath,filepath,filename,md5,create_time,update_time)
                VALUES ('{Path.Join(filepath, filename)}', '{filepath}', '{filename.Replace("@", "@@")}', '{md5}', '{DateTime.Now:yyyy-MM-dd HH:mm:ss}',  '{DateTime.Now:yyyy-MM-dd HH:mm:ss}')
                """;
            await db.ExecuteAsync(sql);
        }

        public async Task<string> GetFileMD5Async(string filepath, string filename)
        {
            using var db = OpenDb();
            var sql = $"""
                SELECT
                    md5
                FROM
                    file_info
                WHERE
                    fullpath='{Path.Join(filepath, filename.Replace("@", "@@"))}'
                """;
            return (await db.FetchAsync<string>(sql)).First();
        }

        public async Task<List<FileMD5Entity>> GetFileMD5EntityAsync(string filepath, string filename)
        {
            using var db = OpenDb();
            var sql = $"""
                SELECT
                    *
                FROM
                    file_info
                WHERE
                    fullpath='{Path.Join(filepath, filename.Replace("@", "@@"))}'
                """;
            return await db.FetchAsync<FileMD5Entity>(sql);
        }

        public async Task<List<FileMD5Entity>> GetFileMD5EntityAsync(string filename)
        {
            using var db = OpenDb();
            var sql = $"""
                SELECT
                    *
                FROM
                    file_info
                WHERE
                    filename=@0
                """;
            return await db.FetchAsync<FileMD5Entity>(sql, filename);
        }

        public async Task DeleteFileMD5Async(string filepath, string filename)
        {
            using var db = OpenDb();
            var sql = $"""
                DELETE FROM
                    file_info
                WHERE
                    fullpath='{Path.Join(filepath, filename.Replace("@", "@@"))}'
                """;
            await db.ExecuteAsync(sql);
        }

        public async Task<List<FileMD5Entity>> GetPagedCapturesAsync(int page, int pageSize)
        {
            using var db = OpenDb();
            var sql = "SELECT * FROM file_info ORDER BY capture_time DESC LIMIT @0 OFFSET @1";
            return await db.FetchAsync<FileMD5Entity>(sql, pageSize, (page - 1) * pageSize);
        }

        // Regex to strip iCloud disambiguation suffixes: IMG_001(2).HEIC -> IMG_001, .HEIC
        private static readonly System.Text.RegularExpressions.Regex ICloudSuffixRegex = new(
            @"^(.+?)\s?\(\d+\)(\.\w+)$",
            System.Text.RegularExpressions.RegexOptions.Compiled);

        public async Task<bool> FileExistsAsync(string filename, long fileSize)
        {
            using var db = OpenDb();
            // 1. Exact match: same filename + size
            var sql = "SELECT COUNT(1) FROM file_info WHERE filename = @0 AND file_size = @1";
            var count = await db.ExecuteScalarAsync<int>(sql, filename, fileSize);
            if (count > 0) return true;

            // 2. Fuzzy match: check if an iCloud variant exists (with or without (N) suffix)
            //    e.g. iPhone has IMG_001.HEIC, iCloud synced as IMG_001(2).HEIC — or vice versa
            var baseName = filename;
            var ext = Path.GetExtension(filename);
            var nameNoExt = Path.GetFileNameWithoutExtension(filename);

            // If filename HAS a suffix like (2), try without it
            var match = ICloudSuffixRegex.Match(filename);
            if (match.Success)
            {
                baseName = match.Groups[1].Value + match.Groups[2].Value;
                count = await db.ExecuteScalarAsync<int>(sql, baseName, fileSize);
                if (count > 0) return true;
            }

            // If filename has NO suffix, try with common (N) variants
            var likeSql = "SELECT COUNT(1) FROM file_info WHERE filename LIKE @0 AND file_size = @1";
            var pattern = $"{nameNoExt}(%){ext}";
            count = await db.ExecuteScalarAsync<int>(likeSql, pattern, fileSize);
            return count > 0;
        }

        public async Task<List<FileMD5Entity>> GetRecentCapturesAsync(TimeSpan offset)
        {
            using var db = OpenDb();
            var since = DateTime.Now - offset;
            var sql = "SELECT * FROM file_info WHERE capture_time >= @0 ORDER BY capture_time DESC";
            return await db.FetchAsync<FileMD5Entity>(sql, since.ToString("yyyy-MM-dd HH:mm:ss"));
        }

        public async Task<object> GetFilterOptionsAsync()
        {
            using var db = OpenDb();
            var makers = await db.FetchAsync<string>("SELECT DISTINCT camera_maker FROM file_info WHERE camera_maker != '' ORDER BY camera_maker");
            var models = await db.FetchAsync<string>("SELECT DISTINCT camera_model FROM file_info WHERE camera_model != '' ORDER BY camera_model");
            var agents = await db.FetchAsync<string>("SELECT DISTINCT agent_id FROM file_info ORDER BY agent_id");
            // Use REPLACE to strip everything before the last dot: e.g. "IMG(2).HEIC" -> ".heic"
            var types = await db.FetchAsync<string>(
                "SELECT DISTINCT LOWER(SUBSTR(filename, LENGTH(RTRIM(filename, REPLACE(filename, '.', ''))))) AS ext FROM file_info WHERE INSTR(filename, '.') > 0 ORDER BY ext");
            return new { cameraMakers = makers, cameraModels = models, fileTypes = types, agentIds = agents };
        }

        private static readonly string[] PhotoExts = [".jpg",".jpeg",".png",".heic",".bmp",".gif",".webp",".cr2",".cr3",".nef",".nrw",".arw",".sr2",".srf",".dng",".raf",".pef",".rw2",".orf"];
        private static readonly string[] VideoExts = [".mp4",".mov",".avi",".mkv",".mts"];

        public async Task<List<FileMD5Entity>> GetFilteredPagedCapturesAsync(
            int page, int pageSize,
            string? cameraMaker, string? cameraModel,
            string? fileType, string? agentId,
            DateTime? dateFrom, DateTime? dateTo,
            bool? hasGps, string? mediaType = null,
            long? tagId = null)
        {
            using var db = OpenDb();
            var conditions = new List<string>();
            var parameters = new List<object>();
            var idx = 0;

            if (!string.IsNullOrEmpty(cameraMaker)) { conditions.Add($"camera_maker = @{idx}"); parameters.Add(cameraMaker); idx++; }
            if (!string.IsNullOrEmpty(cameraModel)) { conditions.Add($"camera_model = @{idx}"); parameters.Add(cameraModel); idx++; }
            if (!string.IsNullOrEmpty(fileType)) { conditions.Add($"LOWER(filename) LIKE @{idx}"); parameters.Add($"%{fileType.ToLower()}"); idx++; }
            if (!string.IsNullOrEmpty(agentId)) { conditions.Add($"agent_id = @{idx}"); parameters.Add(agentId); idx++; }
            if (dateFrom.HasValue) { conditions.Add($"capture_time >= @{idx}"); parameters.Add(dateFrom.Value.ToString("yyyy-MM-dd 00:00:00")); idx++; }
            if (dateTo.HasValue) { conditions.Add($"capture_time <= @{idx}"); parameters.Add(dateTo.Value.ToString("yyyy-MM-dd 23:59:59")); idx++; }
            if (hasGps == true) { conditions.Add("latitude IS NOT NULL AND longitude IS NOT NULL"); }
            if (tagId.HasValue) { conditions.Add($"id IN (SELECT file_id FROM file_tags WHERE tag_id = @{idx})"); parameters.Add(tagId.Value); idx++; }

            if (mediaType == "photo")
            {
                var likes = PhotoExts.Select((e, i) => { parameters.Add($"%{e}"); return $"LOWER(filename) LIKE @{idx + i}"; });
                conditions.Add($"({string.Join(" OR ", likes)})");
                idx += PhotoExts.Length;
            }
            else if (mediaType == "video")
            {
                var likes = VideoExts.Select((e, i) => { parameters.Add($"%{e}"); return $"LOWER(filename) LIKE @{idx + i}"; });
                conditions.Add($"({string.Join(" OR ", likes)})");
                idx += VideoExts.Length;
            }

            var where = conditions.Count > 0 ? "WHERE " + string.Join(" AND ", conditions) : "";
            parameters.Add(pageSize);
            parameters.Add((page - 1) * pageSize);

            var sql = $"SELECT * FROM file_info {where} ORDER BY capture_time DESC LIMIT @{idx} OFFSET @{idx + 1}";
            return await db.FetchAsync<FileMD5Entity>(sql, parameters.ToArray());
        }

        public async Task<FileMD5Entity?> GetCaptureByIdAsync(long id)
        {
            using var db = OpenDb();
            return (await db.FetchAsync<FileMD5Entity>("SELECT * FROM file_info WHERE id = @0", id)).FirstOrDefault();
        }

        public async Task DeleteByIdAsync(long id)
        {
            using var db = OpenDb();
            await db.ExecuteAsync("DELETE FROM file_info WHERE id = @0", id);
        }

        public async Task RenameFileAsync(long id, string newFilePath, string newFileName)
        {
            using var conn = new SqliteConnection(_connectionString);
            conn.Open();
            var cmd = conn.CreateCommand();
            cmd.CommandText = "UPDATE file_info SET fullpath = @fullpath, filepath = @filepath, filename = @filename, update_time = @update_time WHERE id = @id";
            cmd.Parameters.Add(new SqliteParameter("@fullpath", Path.Join(newFilePath, newFileName)));
            cmd.Parameters.Add(new SqliteParameter("@filepath", newFilePath));
            cmd.Parameters.Add(new SqliteParameter("@filename", newFileName));
            cmd.Parameters.Add(new SqliteParameter("@update_time", $"{DateTime.Now:yyyy-MM-dd HH:mm:ss}"));
            cmd.Parameters.Add(new SqliteParameter("@id", id));
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<List<FileMD5Entity>> GetFilesWithDuplicateSuffix()
        {
            using var db = OpenDb();
            // Match filenames like IMG_001(1).JPG, IMG_001(2).HEIC, IMG_001_1.JPG, IMG_001_2.CR2
            var sql = "SELECT * FROM file_info WHERE filename GLOB '*([0-9]*)*.*' OR filename GLOB '*_[0-9].*' OR filename GLOB '*_[0-9][0-9].*'";
            return await db.FetchAsync<FileMD5Entity>(sql);
        }

        public async Task<FileMD5Entity?> FindByFullPathAsync(string fullpath)
        {
            using var db = OpenDb();
            return (await db.FetchAsync<FileMD5Entity>("SELECT * FROM file_info WHERE fullpath = @0", fullpath)).FirstOrDefault();
        }

        public async Task<int> DeleteByAgentIdAsync(string agentId)
        {
            using var db = OpenDb();
            return await db.ExecuteAsync("DELETE FROM file_info WHERE agent_id = @0", agentId);
        }

        public async Task<List<FolderSummary>> GetFoldersAsync(string? agentId)
        {
            using var db = OpenDb();
            var where = !string.IsNullOrEmpty(agentId) ? "WHERE agent_id = @0" : "";
            var sql = $"SELECT filepath, agent_id as agentId, COUNT(*) as fileCount, SUM(file_size) as totalSize FROM file_info {where} GROUP BY filepath, agent_id ORDER BY filepath";
            return !string.IsNullOrEmpty(agentId)
                ? await db.FetchAsync<FolderSummary>(sql, agentId)
                : await db.FetchAsync<FolderSummary>(sql);
        }

        public async Task<List<FileMD5Entity>> GetFilesByFolderAsync(string path, string? agentId)
        {
            using var db = OpenDb();
            if (!string.IsNullOrEmpty(agentId))
                return await db.FetchAsync<FileMD5Entity>("SELECT * FROM file_info WHERE filepath = @0 AND agent_id = @1 ORDER BY filename", path, agentId);
            return await db.FetchAsync<FileMD5Entity>("SELECT * FROM file_info WHERE filepath = @0 ORDER BY filename", path);
        }

        public async Task<List<FileMD5Entity>> GetFilesByIdsAsync(List<long> ids)
        {
            using var db = OpenDb();
            var placeholders = string.Join(",", ids.Select((_, i) => $"@{i}"));
            var sql = $"SELECT * FROM file_info WHERE id IN ({placeholders})";
            return await db.FetchAsync<FileMD5Entity>(sql, ids.Cast<object>().ToArray());
        }
    }

    [TableName("folder_summary")]
    public record FolderSummary
    {
        [Column("filepath")]
        public string FilePath { get; set; } = "";
        [Column("agentId")]
        public string? AgentId { get; set; }
        [Column("fileCount")]
        public int FileCount { get; set; }
        [Column("totalSize")]
        public long TotalSize { get; set; }
    }
}
