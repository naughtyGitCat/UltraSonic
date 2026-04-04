using NPoco;
using Microsoft.Data.Sqlite;

namespace LrWallPaper.Services;

[TableName("agent_info")]
public record AgentEntity
{
    [Column("id")]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("endpoint")]
    public string Endpoint { get; set; } = string.Empty;

    [Column("version")]
    public string Version { get; set; } = string.Empty;

    [Column("last_seen")]
    public DateTime? LastSeen { get; set; }
}

public class AgentManager
{
    private readonly ILogger<AgentManager> _logger;
    private readonly string _connectionString;

    private IDatabase OpenDb() => new Database(_connectionString, DatabaseType.SQLite, SqliteFactory.Instance);

    public AgentManager(ILogger<AgentManager> logger)
    {
        _logger = logger;
        var dbPath = Path.Combine(AppContext.BaseDirectory, "ultrasonic.db");
        _connectionString = $"Data Source={dbPath}";
    }

    public async Task<List<AgentEntity>> GetAllAgentsAsync()
    {
        using var db = OpenDb();
        return await db.FetchAsync<AgentEntity>("SELECT * FROM agent_info");
    }

    public async Task SaveAgentAsync(AgentEntity agent)
    {
        using var db = OpenDb();
        try { db.Execute("ALTER TABLE agent_info ADD COLUMN version TEXT NOT NULL DEFAULT '';"); } catch {}
        try { db.Execute("ALTER TABLE agent_info ADD COLUMN last_seen DATETIME NULL;"); } catch {}
        var sql = $"""
            INSERT OR REPLACE INTO agent_info (id, name, endpoint, version, last_seen)
            VALUES (@0, @1, @2, @3, @4)
            """;
        await db.ExecuteAsync(sql, agent.Id, agent.Name, agent.Endpoint, agent.Version, DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
    }

    public async Task DeleteAgentAsync(string id)
    {
        using var db = OpenDb();
        var sql = "DELETE FROM agent_info WHERE id = @0";
        await db.ExecuteAsync(sql, id);
    }
}
