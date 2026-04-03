//psyduck 20220409
using System.IO;
using Microsoft.Data.Sqlite;
using NPoco;
using LrWallPaper.Models;
namespace LrWallPaper.Services;

public interface ICustomSQLiteFactory
{
    public SqliteConnection GetConnection();
    public IDatabase GetDatabase();
}

public class CustomSQLiteFactory : ICustomSQLiteFactory
{
    private readonly string _db;
    public CustomSQLiteFactory(UltraSonicConfig config)
    {
        _db = @$"Data Source={config.Lightroom.CatalogPath};Mode=ReadOnly";
    }

    public SqliteConnection GetConnection()
    {
        return new SqliteConnection(_db);
    }

    public IDatabase GetDatabase()
    {
        return new Database(_db, DatabaseType.SQLite, SqliteFactory.Instance);
    }
}

public record TempDBInfo
{
    public string? Path { get; set; }
    public DateTime CopyTime { get; set; }
}

public class LightroomDatabaseService : ICustomSQLiteFactory
{
    private string _tempDBPath = "";
    private IEnumerable<string> _tempPaths = new List<string>();
    private DateTime _copyTime = DateTime.MinValue;
    private readonly string _dbPath;

    public LightroomDatabaseService(UltraSonicConfig config)
    {
        _dbPath = config.Lightroom.CatalogPath;
    }


    private string NewTempDBPath()
    {
        return $"{_dbPath}.{DateTime.Now:yyyyMMddHHmmss}";
    }
    
    private void CopyDBFile()
    {
        _tempDBPath = NewTempDBPath();
        File.Copy(_dbPath, _tempDBPath);
        _copyTime = DateTime.Now;
        _tempPaths = _tempPaths.Append(_tempDBPath);
    }

    private void RemoveDBCopy()
    {
        File.Delete(_tempDBPath);
    }

    public SqliteConnection GetConnection()
    {
        //https://docs.microsoft.com/en-us/dotnet/standard/data/sqlite
        var connectionString = @$"Data Source={_tempDBPath};Mode=ReadOnly;Pooling=False";
        return new SqliteConnection(connectionString);
    }

    public IDatabase GetDatabase()
    {
        var connectionString = @$"Data Source={_tempDBPath};Mode=ReadOnly;Pooling=False";
        return new Database(connectionString, DatabaseType.SQLite, SqliteFactory.Instance);
    }
    
    public async Task CleanJob()
    {
        foreach (var item in _tempPaths)
        {
            await Task.CompletedTask;
            // check file touch time,
            // check file in open(maybe have a same name lock)
            // try remove file, and remove item from paths
            throw new NotImplementedException();
        }
    }
}