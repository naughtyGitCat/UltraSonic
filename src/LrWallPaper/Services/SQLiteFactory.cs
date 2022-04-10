//psyduck 20220409
using System.IO;
using Microsoft.Data.Sqlite;
using NPoco;
namespace LrWallPaper.Services;

public interface ISQLiteFactory
{
    public SqliteConnection GetConnection();
    public IDatabase GetDatabase();
}

public class SQLiteFactory : ISQLiteFactory
{
    private const string _db = @$"Data Source=D:\…„”∞\Lightroom\Lightroom Catalog-v11.lrcat;Mode=ReadOnly";
    public SQLiteFactory()
    {

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
    public string Path { get; set; }
    public DateTime CopyTime { get; set; }
}

public class LightroomDatabaseService : ISQLiteFactory
{
    private string _tempDBPath = "";
    private IEnumerable<string> _tempPaths;
    private DateTime _copyTime = DateTime.MinValue;
    private const string _dbPath = @$"D:\…„”∞\Lightroom\Lightroom Catalog-v11.lrcat";

    private string NewTempDBPath()
    {
        return $"{_dbPath}.{DateTime.Now:yyyyMMddHHmmss}";
    }
    
    private void CopyDBFile()
    {
        _tempDBPath = NewTempDBPath();
        File.Copy(_dbPath, _tempDBPath);
        _copyTime = DateTime.Now;
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