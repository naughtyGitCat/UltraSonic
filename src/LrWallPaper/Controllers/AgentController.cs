using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AgentController : ControllerBase
{
    private readonly AgentManager _agentManager;

    public AgentController(AgentManager agentManager)
    {
        _agentManager = agentManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _agentManager.GetAllAgentsAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Save([FromBody] AgentEntity agent)
    {
        if (string.IsNullOrEmpty(agent.Id))
        {
            agent.Id = Guid.NewGuid().ToString();
        }
        await _agentManager.SaveAgentAsync(agent);
        return Ok(agent);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _agentManager.DeleteAgentAsync(id);
        return Ok();
    }

    /// <summary>
    /// Returns all agents with health status and version checked from Master side.
    /// Frontend should call this instead of directly hitting agent endpoints.
    /// </summary>
    [HttpGet("status")]
    public async Task<IActionResult> GetStatus()
    {
        var agents = await _agentManager.GetAllAgentsAsync();
        var handler = new HttpClientHandler { UseProxy = false };
        var client = new HttpClient(handler) { Timeout = TimeSpan.FromSeconds(3) };
        var results = new List<object>();

        // Master self-check
        var masterAsm = System.Reflection.Assembly.GetExecutingAssembly();
        var masterVersion = masterAsm.GetCustomAttributes(typeof(System.Reflection.AssemblyInformationalVersionAttribute), false)
            .OfType<System.Reflection.AssemblyInformationalVersionAttribute>().FirstOrDefault()?.InformationalVersion ?? "unknown";

        results.Add(new {
            id = "local",
            name = "Master Local",
            endpoint = $"http://{Request.Host}",
            version = masterVersion,
            health = "healthy",
            lastSeen = (string?)null
        });

        foreach (var agent in agents)
        {
            string health = "unhealthy";
            string version = agent.Version;
            try
            {
                var resp = await client.GetAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/health");
                if (resp.IsSuccessStatusCode) health = "healthy";
            }
            catch { }

            // Also try to get latest version and scan status from agent
            object? scanStatus = null;
            try
            {
                var vResp = await client.GetFromJsonAsync<VersionResponse>($"{agent.Endpoint.TrimEnd('/')}/api/agent/version");
                if (vResp?.Version != null) version = vResp.Version;
            }
            catch { }
            try
            {
                var ssResp = await client.GetStringAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/scan-status");
                scanStatus = System.Text.Json.JsonSerializer.Deserialize<object>(ssResp);
            }
            catch { }

            results.Add(new {
                id = agent.Id,
                name = agent.Name,
                endpoint = agent.Endpoint,
                version,
                health,
                lastSeen = agent.LastSeen?.ToString("yyyy-MM-dd HH:mm:ss"),
                scanStatus
            });
        }
        return Ok(results);
    }

    [HttpGet("{id}/config")]
    public async Task<IActionResult> GetAgentConfig(string id)
    {
        var agents = await _agentManager.GetAllAgentsAsync();
        var agent = agents.FirstOrDefault(a => a.Id == id);
        if (agent == null) return NotFound();

        var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(5) };
        try
        {
            var resp = await client.GetStringAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/config");
            return Content(resp, "application/json");
        }
        catch { return StatusCode(502); }
    }

    [HttpPut("{id}/config")]
    public async Task<IActionResult> PutAgentConfig(string id)
    {
        var agents = await _agentManager.GetAllAgentsAsync();
        var agent = agents.FirstOrDefault(a => a.Id == id);
        if (agent == null) return NotFound();

        var body = await Request.ReadFromJsonAsync<System.Text.Json.Nodes.JsonObject>();
        if (body == null) return BadRequest();

        var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(5) };
        try
        {
            var content = new StringContent(body.ToJsonString(), System.Text.Encoding.UTF8, "application/json");
            var resp = await client.PutAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/config", content);
            return resp.IsSuccessStatusCode ? Ok(new { message = "Agent config saved" }) : StatusCode((int)resp.StatusCode);
        }
        catch { return StatusCode(502); }
    }

    /// <summary>
    /// Proxy to get logs from a specific agent
    /// </summary>
    [HttpGet("{id}/logs")]
    public async Task<IActionResult> GetAgentLogs(string id, [FromQuery] string? type, [FromQuery] int? lines)
    {
        if (id == "local")
        {
            // Return master logs directly
            var logType = type ?? "all";
            var maxLines = Math.Min(lines ?? 200, 2000);
            var logDir = Path.Combine(AppContext.BaseDirectory, "logs");
            var prefix = logType switch { "error" => "master-error-", _ => "master-" };

            if (!Directory.Exists(logDir))
                return Ok(new { lines = Array.Empty<string>(), file = "" });

            var files = Directory.GetFiles(logDir, $"{prefix}*.txt").OrderByDescending(f => f).ToList();
            if (files.Count == 0) return Ok(new { lines = Array.Empty<string>(), file = "" });

            var allLines = System.IO.File.ReadAllLines(files[0]);
            var result = allLines.Length > maxLines ? allLines[^maxLines..] : allLines;
            return Ok(new { lines = result, file = Path.GetFileName(files[0]), totalFiles = files.Count, availableTypes = new[] { "all", "error" } });
        }

        var agents = await _agentManager.GetAllAgentsAsync();
        var agent = agents.FirstOrDefault(a => a.Id == id);
        if (agent == null) return NotFound();

        var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(5) };
        try
        {
            var url = $"{agent.Endpoint.TrimEnd('/')}/api/agent/logs?type={type ?? "all"}&lines={lines ?? 200}";
            var resp = await client.GetStringAsync(url);
            return Content(resp, "application/json");
        }
        catch { return StatusCode(502); }
    }

    private record VersionResponse(string Version);
}
