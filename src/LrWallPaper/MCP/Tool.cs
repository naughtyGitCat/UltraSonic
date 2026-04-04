// Added MCP server setup to LrWallPaper Program.cs

using ModelContextProtocol.Server;
using LrWallPaper.Services;

namespace LrWallPaper.MCP;

[McpServerToolType]
public class Tool(ILogger<Tool> _logger)
{
}