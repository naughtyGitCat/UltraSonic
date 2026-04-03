using LrWallPaper.Services;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AgentController : ControllerBase
{
    private readonly AgentManager _agentManager;
    private readonly ClusterDiscoveryService _discovery;

    public AgentController(AgentManager agentManager, ClusterDiscoveryService discovery)
    {
        _agentManager = agentManager;
        _discovery = discovery;
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
    /// Returns all nodes discovered via SWIM cluster membership.
    /// </summary>
    [HttpGet("cluster")]
    public IActionResult GetClusterNodes()
    {
        var peers = _discovery.GetPeers();
        return Ok(peers.Select(p => new
        {
            Role = p.Role.ToString().ToLowerInvariant(),
            p.NodeKey,
            p.HttpEndpoint,
            Status = "online"
        }));
    }
}
