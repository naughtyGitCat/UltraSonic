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

        [Column("file_size")]
        public long FileSize { get; set; }

        [Column("file_md5")]
        public string FileMD5 { get; set; }
        [Column("capture_time")]
        public DateTime CaptureTime { get; set; }
        [Column("latitude")]
        public double? Latitude { get; set; }
        [Column("longitude")]
        public double? Longitude { get; set; }
        [Column("create_time")]
        public DateTime CreateTime { get; set; }
        [Column("update_time")]
        public DateTime UpdateTime { get; set; }
    }
    public class FileMD5Manager
    {
        private readonly IDatabase _database;
        private readonly ILogger<FileMD5Manager> _logger;
        private readonly string _connectionString;
        public FileMD5Manager(ILogger<FileMD5Manager> logger) 
        {
            _logger = logger;
            var dbPath = Path.Combine(AppContext.BaseDirectory, "ultrasonic.db");
            _connectionString = $"Data Source={dbPath}";
            _database = new Database(_connectionString, DatabaseType.SQLite, SqliteFactory.Instance);
            PrepareTable();
        }

        private void PrepareTable()
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
                """;
            _database.Execute( sql );

            try { _database.Execute("ALTER TABLE file_info ADD COLUMN agent_id TEXT NULL;"); } catch {}
            try { _database.Execute("UPDATE file_info SET agent_id = 'local' WHERE agent_id IS NULL;"); } catch {}
            try { _database.Execute("ALTER TABLE file_info ADD COLUMN latitude REAL NULL;"); } catch {}
            try { _database.Execute("ALTER TABLE file_info ADD COLUMN longitude REAL NULL;"); } catch {}
        }

        public async Task SaveFileMD5Async(FileMD5Entity file) 
        {
            var pSQL = """
                               INSERT OR REPLACE INTO
                                file_info
                                (fullpath,filepath,filename,camera_maker,camera_model,lens_model,agent_id,file_size,file_md5,capture_time,latitude,longitude,create_time,update_time)
                                VALUES
                                (
                                    @fullpath,
                                    @filepath,
                                    @filename,
                                    @camera_maker,
                                    @camera_model,
                                    @lens_model,
                                    @agent_id,
                                    @file_size,
                                    @file_md5,
                                    @capture_time,
                                    @latitude,
                                    @longitude,
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
            cmd.Parameters.Add(new SqliteParameter("@file_size", file.FileSize==0?(object)0:file.FileSize));
            cmd.Parameters.Add(new SqliteParameter("@file_md5", file.FileMD5));
            cmd.Parameters.Add(new SqliteParameter("@capture_time", $"{file.CaptureTime:yyyy-MM-dd HH:mm:ss}"));
            cmd.Parameters.Add(new SqliteParameter("@latitude", file.Latitude.HasValue ? file.Latitude.Value : DBNull.Value));
            cmd.Parameters.Add(new SqliteParameter("@longitude", file.Longitude.HasValue ? file.Longitude.Value : DBNull.Value));
            cmd.Parameters.Add(new SqliteParameter("@create_time", $"{DateTime.Now:yyyy-MM-dd HH:mm:ss}"));
            cmd.Parameters.Add(new SqliteParameter("@update_time", $"{DateTime.Now:yyyy-MM-dd HH:mm:ss}"));

            await cmd.ExecuteNonQueryAsync();
            // await _database.ExecuteAsync(MySqlConnector.MySqlHelper.EscapeString(sql));
        }

        public async Task SaveFileMD5Async(string filepath,  string filename, string md5)
        {
            var sql = $"""
                INSERT OR REPLACE INTO 
                file_info (fullpath,filepath,filename,md5,create_time,update_time)
                VALUES ('{Path.Join(filepath, filename)}', '{filepath}', '{filename.Replace("@", "@@")}', '{md5}', '{DateTime.Now:yyyy-MM-dd HH:mm:ss}',  '{DateTime.Now:yyyy-MM-dd HH:mm:ss}')
                """;
            await _database.ExecuteAsync(sql);
        }

        public async Task SaveFileMD5Async(string fullpath, string md5)
        {
            var filepath = Path.GetDirectoryName(fullpath);
            var filename = Path.GetFileName(fullpath);
            var sql = $"""
                INSERT OR REPLACE INTO 
                file_info (fullpath,filepath,filename,md5,create_time,update_time)
                VALUES ('{Path.Join(filepath, filename)}', '{filepath}', '{filename.Replace("@", "@@")}', '{md5}', '{DateTime.Now:yyyy-MM-dd HH:mm:ss}',  '{DateTime.Now:yyyy-MM-dd HH:mm:ss}')
                """;
            await _database.ExecuteAsync(sql);
        }

        public async Task<string> GetFileMD5Async(string filepath, string filename) 
        {
            var sql = $"""
                SELECT
                    md5
                FROM
                    file_info
                WHERE
                    fullpath='{Path.Join(filepath, filename.Replace("@", "@@"))}'
                """;
            return (await _database.FetchAsync<string>(sql)).First();
        }

        public async Task<List<FileMD5Entity>> GetFileMD5EntityAsync(string filepath, string filename)
        {
            var sql = $"""
                SELECT
                    *
                FROM
                    file_info
                WHERE
                    fullpath='{Path.Join(filepath, filename.Replace("@", "@@"))}'
                """;
            return await _database.FetchAsync<FileMD5Entity>(sql);
        }

        public async Task<List<FileMD5Entity>> GetFileMD5EntityAsync(string filename)
        {
            var sql = $"""
                SELECT
                    *
                FROM
                    file_info
                WHERE
                    filename=@0
                """;
            
            return await _database.FetchAsync<FileMD5Entity>(sql, filename);
        }

        public async Task DeleteFileMD5Async(string filepath, string filename) 
        {
            var sql = $"""
                DELETE FROM
                    file_info
                WHERE
                    fullpath='{Path.Join(filepath, filename.Replace("@", "@@"))}'
                """;
            await _database.ExecuteAsync(sql);
        }

        public async Task<List<FileMD5Entity>> GetPagedCapturesAsync(int page, int pageSize)
        {
            var sql = "SELECT * FROM file_info ORDER BY capture_time DESC LIMIT @0 OFFSET @1";
            return await _database.FetchAsync<FileMD5Entity>(sql, pageSize, (page - 1) * pageSize);
        }

        public async Task<bool> FileExistsAsync(string filename, long fileSize)
        {
            var sql = "SELECT COUNT(1) FROM file_info WHERE filename = @0 AND file_size = @1";
            var count = await _database.ExecuteScalarAsync<int>(sql, filename, fileSize);
            return count > 0;
        }

        public async Task<List<FileMD5Entity>> GetRecentCapturesAsync(TimeSpan offset)
        {
            var since = DateTime.Now - offset;
            var sql = "SELECT * FROM file_info WHERE capture_time >= @0 ORDER BY capture_time DESC";
            return await _database.FetchAsync<FileMD5Entity>(sql, since.ToString("yyyy-MM-dd HH:mm:ss"));
        }

        public async Task<List<FileMD5Entity>> GetFilteredCapturesAsync(
            int page, int pageSize,
            int? year = null, int? month = null, int? day = null,
            string? cameraMaker = null, string? cameraModel = null,
            string? mediaType = null, string? agentId = null,
            bool? hasGps = null)
        {
            var conditions = new List<string>();
            var parameters = new List<object>();
            int idx = 0;

            if (year.HasValue) { conditions.Add($"strftime('%Y', capture_time) = @{idx}"); parameters.Add(year.Value.ToString()); idx++; }
            if (month.HasValue) { conditions.Add($"strftime('%m', capture_time) = @{idx}"); parameters.Add(month.Value.ToString("D2")); idx++; }
            if (day.HasValue) { conditions.Add($"strftime('%d', capture_time) = @{idx}"); parameters.Add(day.Value.ToString("D2")); idx++; }
            if (!string.IsNullOrEmpty(cameraMaker)) { conditions.Add($"camera_maker = @{idx}"); parameters.Add(cameraMaker); idx++; }
            if (!string.IsNullOrEmpty(cameraModel)) { conditions.Add($"camera_model = @{idx}"); parameters.Add(cameraModel); idx++; }
            if (!string.IsNullOrEmpty(agentId)) { conditions.Add($"agent_id = @{idx}"); parameters.Add(agentId); idx++; }

            if (mediaType == "photo")
                conditions.Add("lower(filename) NOT LIKE '%.mp4' AND lower(filename) NOT LIKE '%.mov' AND lower(filename) NOT LIKE '%.avi' AND lower(filename) NOT LIKE '%.mkv' AND lower(filename) NOT LIKE '%.mts'");
            else if (mediaType == "video")
                conditions.Add("(lower(filename) LIKE '%.mp4' OR lower(filename) LIKE '%.mov' OR lower(filename) LIKE '%.avi' OR lower(filename) LIKE '%.mkv' OR lower(filename) LIKE '%.mts')");

            if (hasGps == true) conditions.Add("latitude IS NOT NULL AND longitude IS NOT NULL");
            else if (hasGps == false) conditions.Add("(latitude IS NULL OR longitude IS NULL)");

            var where = conditions.Count > 0 ? "WHERE " + string.Join(" AND ", conditions) : "";
            var sql = $"SELECT * FROM file_info {where} ORDER BY capture_time DESC LIMIT @{idx} OFFSET @{idx + 1}";
            parameters.Add(pageSize);
            parameters.Add((page - 1) * pageSize);

            return await _database.FetchAsync<FileMD5Entity>(sql, parameters.ToArray());
        }

        public async Task<object> GetFilterOptionsAsync()
        {
            var years = await _database.FetchAsync<string>(
                "SELECT DISTINCT strftime('%Y', capture_time) FROM file_info WHERE capture_time IS NOT NULL ORDER BY 1 DESC");
            var cameras = await _database.FetchAsync<FileMD5Entity>(
                "SELECT DISTINCT camera_maker, camera_model FROM file_info WHERE camera_maker != '' AND camera_model != '' ORDER BY camera_maker, camera_model");
            var agents = await _database.FetchAsync<string>(
                "SELECT DISTINCT agent_id FROM file_info WHERE agent_id IS NOT NULL ORDER BY agent_id");
            var hasGpsCount = await _database.ExecuteScalarAsync<int>(
                "SELECT COUNT(1) FROM file_info WHERE latitude IS NOT NULL AND longitude IS NOT NULL");

            return new
            {
                Years = years,
                Cameras = cameras.Select(c => new { c.CameraMaker, c.CameraModel }).Distinct().ToList(),
                Agents = agents,
                HasGpsData = hasGpsCount > 0
            };
        }

        /// <summary>
        /// Returns records updated after the given timestamp (for Master-to-Master incremental sync).
        /// </summary>
        public async Task<List<FileMD5Entity>> GetRecordsSinceAsync(DateTime since, int limit = 1000)
        {
            var sql = "SELECT * FROM file_info WHERE update_time > @0 ORDER BY update_time ASC LIMIT @1";
            return await _database.FetchAsync<FileMD5Entity>(sql, since.ToString("yyyy-MM-dd HH:mm:ss"), limit);
        }
    }
}
