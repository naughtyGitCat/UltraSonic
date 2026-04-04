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
        var sql = $"""
            INSERT OR REPLACE INTO agent_info (id, name, endpoint)
            VALUES (@0, @1, @2)
            """;
        await db.ExecuteAsync(sql, agent.Id, agent.Name, agent.Endpoint);
    }

    public async Task DeleteAgentAsync(string id)
    {
        using var db = OpenDb();
        var sql = "DELETE FROM agent_info WHERE id = @0";
        await db.ExecuteAsync(sql, id);
    }
}
