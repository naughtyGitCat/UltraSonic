using NPoco;
using Microsoft.Data.Sqlite;
using System.Security.Cryptography;
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
        public FileMD5Manager() 
        {
            _database = new Database(@"Data Source=ultrasonic.db", DatabaseType.SQLite, SqliteFactory.Instance);
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
                  file_size INTEGER NOT NULL,
                  file_md5 TEXT NOT NULL,
                  capture_time DATETIME NOT NULL,
                  create_time DATETIME NOT NULL,
                  update_time DATETIME NOT NULL,
                  UNIQUE (fullpath),
                  UNIQUE (filepath, filename)
                );
                """;
            _database.Execute( sql );
        }

        public async Task SaveFileMD5Async(FileMD5Entity file) 
        {
            var sql = $"""
                INSERT OR REPLACE INTO 
                file_info (fullpath,filepath,filename,camera_maker,camera_model,lens_model,file_size,file_md5,capture_time,create_time,update_time)
                VALUES ('{file.FileFullPath}', '{file.FilePath}', '{file.FileName}','{file.CameraMaker}', '{file.CameraModel}', '{file.LensModel}','{file.FileSize}', '{file.FileMD5}','{file.CaptureTime:yyyy-MM-dd HH:mm:ss}', '{DateTime.Now:yyyy-MM-dd HH:mm:ss}',  '{DateTime.Now:yyyy-MM-dd HH:mm:ss}')
                """;
            await _database.ExecuteAsync(sql);
        }

        public async Task SaveFileMD5Async(string filepath,  string filename, string md5)
        {
            var sql = $"""
                INSERT OR REPLACE INTO 
                file_info (fullpath,filepath,filename,md5,create_time,update_time)
                VALUES ('{Path.Join(filepath, filename)}', '{filepath}', '{filename}', '{md5}', '{DateTime.Now:yyyy-MM-dd HH:mm:ss}',  '{DateTime.Now:yyyy-MM-dd HH:mm:ss}')
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
                VALUES ('{Path.Join(filepath, filename)}', '{filepath}', '{filename}', '{md5}', '{DateTime.Now:yyyy-MM-dd HH:mm:ss}',  '{DateTime.Now:yyyy-MM-dd HH:mm:ss}')
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
                    fullpath='{Path.Join(filepath, filename)}'
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
                    fullpath='{Path.Join(filepath, filename)}'
                """;
            return await _database.FetchAsync<FileMD5Entity>(sql);
        }

        public async Task DeleteFileMD5Async(string filepath, string filename) 
        {
            var sql = $"""
                DELETE FROM
                    file_info
                WHERE
                    fullpath='{Path.Join(filepath, filename)}'
                """;
            await _database.ExecuteAsync(sql);
        }
    }
}
