//psyduck 20220409
using System.IO;
using System.Data.SQLite;
using NPoco;
using LrWallPaper.Models;
namespace LrWallPaper.Services;

public interface ICustomSQLiteFactory
{
    public SQLiteConnection GetConnection();
    public IDatabase GetDatabase();
}

public class CustomSQLiteFactory : ICustomSQLiteFactory
{
    private readonly string _db;
    public CustomSQLiteFactory(UltraSonicConfig config)
    {
        _db = @$"Data Source={config.Lightroom.CatalogPath};Mode=ReadOnly";
    }

    public SQLiteConnection GetConnection()
    {
        return new SQLiteConnection(_db);
    }

    public IDatabase GetDatabase()
    {
        return new Database(_db, DatabaseType.SQLite, SQLiteFactory.Instance);
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

    public SQLiteConnection GetConnection()
    {
        //https://docs.microsoft.com/en-us/dotnet/standard/data/sqlite
        var connectionString = @$"Data Source={_tempDBPath};Mode=ReadOnly;Pooling=False";
        return new SQLiteConnection(connectionString);
    }

    public IDatabase GetDatabase()
    {
        var connectionString = @$"Data Source={_tempDBPath};Mode=ReadOnly;Pooling=False";
        return new Database(connectionString, DatabaseType.SQLite, SQLiteFactory.Instance);
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