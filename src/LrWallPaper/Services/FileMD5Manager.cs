using NPoco;
using System.Data.SQLite;
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
            _database = new Database(_connectionString, DatabaseType.SQLite, SQLiteFactory.Instance);
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
                                (fullpath,filepath,filename,camera_maker,camera_model,lens_model,agent_id,file_size,file_md5,capture_time,create_time,update_time)
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
            using var conn = new SQLiteConnection(_connectionString);
             conn.Open();
            // var cmd = _database.CreateCommand(conn, commandType: System.Data.CommandType.Text, pSQL);
            var cmd = conn.CreateCommand();
            cmd.CommandText = pSQL;
            cmd.Parameters.Add(new SQLiteParameter("@fullpath", file.FileFullPath));
            cmd.Parameters.Add(new SQLiteParameter("@filepath", file.FilePath));
            cmd.Parameters.Add(new SQLiteParameter("@filename", file.FileName));
            cmd.Parameters.Add(new SQLiteParameter("@camera_maker", file.CameraMaker));
            cmd.Parameters.Add(new SQLiteParameter("@camera_model", file.CameraModel));
            cmd.Parameters.Add(new SQLiteParameter("@lens_model", file.LensModel));
            cmd.Parameters.Add(new SQLiteParameter("@agent_id", file.AgentId ?? "local"));
            cmd.Parameters.Add(new SQLiteParameter("@file_size", file.FileSize==0?(object)0:file.FileSize));
            cmd.Parameters.Add(new SQLiteParameter("@file_md5", file.FileMD5));
            cmd.Parameters.Add(new SQLiteParameter("@capture_time", $"{file.CaptureTime:yyyy-MM-dd HH:mm:ss}"));
            cmd.Parameters.Add(new SQLiteParameter("@create_time", $"{DateTime.Now:yyyy-MM-dd HH:mm:ss}"));
            cmd.Parameters.Add(new SQLiteParameter("@update_time", $"{DateTime.Now:yyyy-MM-dd HH:mm:ss}"));

            cmd.VerifyOnly();
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
    }
}
