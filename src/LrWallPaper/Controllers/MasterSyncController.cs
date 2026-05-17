using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/master")]
[ApiController]
public class MasterSyncController : ControllerBase
{
    private readonly FileMD5Manager _md5Manager;
    private readonly MasterReplicationService _replicationService;
    private readonly AgentManager _agentManager;

    public MasterSyncController(FileMD5Manager md5Manager, MasterReplicationService replicationService, AgentManager agentManager)
    {
        _md5Manager = md5Manager;
        _replicationService = replicationService;
        _agentManager = agentManager;
    }

    [HttpGet("file-exists")]
    public async Task<IActionResult> FileExists([FromQuery] string filename, [FromQuery] long size)
    {
        if (string.IsNullOrEmpty(filename)) return BadRequest();
        var exists = await _md5Manager.FileExistsAsync(filename, size);
        return Ok(new { exists });
    }

    [HttpPost("sync")]
    public async Task<IActionResult> Sync([FromBody] List<FileMD5Entity> captures, [FromQuery] bool is_republished = false)
    {
        if (captures == null || !captures.Any()) return Ok();
        
        foreach(var c in captures)
        {
            if (string.IsNullOrEmpty(c.AgentId)) 
                c.AgentId = "local";
                
            await _md5Manager.SaveFileMD5Async(c);
        }

        // If this is a direct push from an Agent (not republished from another Master),
        // we enqueue it to be gossip-replicated to other known Masters in the cluster
        if (!is_republished)
        {
            _replicationService.Enqueue(captures);
        }
        
        return Ok(new { Count = captures.Count });
    }

    [HttpGet("config")]
    public IActionResult GetConfig()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
        if (!System.IO.File.Exists(path)) return NotFound();
        var json = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.Nodes.JsonObject>(System.IO.File.ReadAllText(path));
        return Ok(json);
    }

    [HttpPost("archive-history")]
    public async Task<IActionResult> SaveArchiveHistory([FromBody] List<ArchiveHistoryEntity> records)
    {
        if (records == null || records.Count == 0) return Ok();
        using var db = _md5Manager.OpenDb();
        foreach (var r in records)
            await db.InsertAsync(r);
        return Ok(new { count = records.Count });
    }

    [HttpGet("archive-history")]
    public async Task<IActionResult> GetArchiveHistory([FromQuery] int page = 1, [FromQuery] int pageSize = 50,
        [FromQuery] string? agentId = null, [FromQuery] string? date = null)
    {
        using var db = _md5Manager.OpenDb();
        var conditions = new List<string>();
        var parameters = new List<object>();
        var idx = 0;

        if (!string.IsNullOrEmpty(agentId)) { conditions.Add($"agent_id = @{idx}"); parameters.Add(agentId); idx++; }
        if (!string.IsNullOrEmpty(date)) { conditions.Add($"DATE(archived_at) = @{idx}"); parameters.Add(date); idx++; }

        var where = conditions.Count > 0 ? "WHERE " + string.Join(" AND ", conditions) : "";
        var total = await db.SingleAsync<int>($"SELECT COUNT(*) FROM archive_history {where}", parameters.ToArray());
        var items = await db.FetchAsync<ArchiveHistoryEntity>(
            $"SELECT * FROM archive_history {where} ORDER BY archived_at DESC LIMIT @{idx} OFFSET @{idx + 1}",
            parameters.Concat(new object[] { pageSize, (page - 1) * pageSize }).ToArray());

        return Ok(new { total, page, pageSize, items });
    }

    [HttpGet("archive-progress")]
    public async Task<IActionResult> GetArchiveProgress()
    {
        var agents = await _agentManager.GetAllAgentsAsync();
        using var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(3) };
        var active = new List<object>();
        var alerts = new List<object>();
        foreach (var a in agents)
        {
            try
            {
                var resp = await client.GetStringAsync($"{a.Endpoint.TrimEnd('/')}/api/agent/archive-status");
                using var doc = System.Text.Json.JsonDocument.Parse(resp);
                var root = doc.RootElement;
                if (root.TryGetProperty("isArchiving", out var ia) && ia.GetBoolean())
                {
                    active.Add(new
                    {
                        agentId = a.Id,
                        agentName = a.Name,
                        device = root.TryGetProperty("device", out var d) ? d.GetString() : null,
                        currentFile = root.TryGetProperty("currentFile", out var cf) ? cf.GetString() : null,
                        phase = root.TryGetProperty("phase", out var ph) ? ph.GetString() : null,
                        processed = root.TryGetProperty("processed", out var p) ? p.GetInt32() : 0,
                        startedAt = root.TryGetProperty("startedAt", out var s) && s.ValueKind != System.Text.Json.JsonValueKind.Null ? s.GetDateTime() : (DateTime?)null
                    });
                }
                else if (root.TryGetProperty("lastError", out var le) && le.ValueKind == System.Text.Json.JsonValueKind.String
                         && !string.IsNullOrEmpty(le.GetString()))
                {
                    alerts.Add(new
                    {
                        agentId = a.Id,
                        agentName = a.Name,
                        error = le.GetString(),
                        endedAt = root.TryGetProperty("lastArchiveEnd", out var ea) && ea.ValueKind != System.Text.Json.JsonValueKind.Null ? ea.GetDateTime() : (DateTime?)null
                    });
                }
            }
            catch { /* agent unreachable / no archive endpoint */ }
        }
        return Ok(new { active, alerts });
    }

    [HttpGet("archive-history/stats")]
    public async Task<IActionResult> GetArchiveStats()
    {
        using var db = _md5Manager.OpenDb();
        var total = await db.SingleAsync<int>("SELECT COUNT(*) FROM archive_history");
        var totalSize = await db.SingleAsync<long>("SELECT COALESCE(SUM(file_size),0) FROM archive_history");
        var today = await db.SingleAsync<int>("SELECT COUNT(*) FROM archive_history WHERE DATE(archived_at) = DATE('now','localtime')");
        var devices = await db.FetchAsync<dynamic>("SELECT device_name, COUNT(*) as count FROM archive_history GROUP BY device_name ORDER BY count DESC LIMIT 10");
        var recentDays = await db.FetchAsync<dynamic>("SELECT DATE(archived_at) as date, COUNT(*) as count FROM archive_history GROUP BY DATE(archived_at) ORDER BY date DESC LIMIT 7");
        return Ok(new { total, totalSize, today, devices, recentDays });
    }

    [HttpPut("config")]
    public async Task<IActionResult> PutConfig()
    {
        var body = await Request.ReadFromJsonAsync<System.Text.Json.Nodes.JsonObject>();
        if (body == null) return BadRequest();
        var path = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
        System.IO.File.WriteAllText(path, body.ToJsonString(new System.Text.Json.JsonSerializerOptions { WriteIndented = true }));
        return Ok(new { message = "Master config saved" });
    }
}
