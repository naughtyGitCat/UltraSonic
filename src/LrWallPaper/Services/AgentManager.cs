using NPoco;
using System.Data.SQLite;

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
    private readonly IDatabase _database;
    private readonly ILogger<AgentManager> _logger;

    public AgentManager(ILogger<AgentManager> logger)
    {
        _logger = logger;
        _database = new Database(@"Data Source=ultrasonic.db", DatabaseType.SQLite, SQLiteFactory.Instance);
    }

    public async Task<List<AgentEntity>> GetAllAgentsAsync()
    {
        return await _database.FetchAsync<AgentEntity>("SELECT * FROM agent_info");
    }

    public async Task SaveAgentAsync(AgentEntity agent)
    {
        var sql = $"""
            INSERT OR REPLACE INTO agent_info (id, name, endpoint)
            VALUES (@0, @1, @2)
            """;
        await _database.ExecuteAsync(sql, agent.Id, agent.Name, agent.Endpoint);
    }

    public async Task DeleteAgentAsync(string id)
    {
        var sql = "DELETE FROM agent_info WHERE id = @0";
        await _database.ExecuteAsync(sql, id);
    }
}
