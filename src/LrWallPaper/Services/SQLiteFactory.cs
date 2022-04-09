//psyduck 20220409
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
    private const string _db = @$"Data Source=D:\…„”∞\Lightroom\Lightroom Catalog - ∏±±æ.lrcat";
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