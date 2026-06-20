using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using LrWallPaper.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LrWallPaper.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager _users;
    private readonly AuthService _auth;

    public AuthController(UserManager users, AuthService auth)
    {
        _users = users;
        _auth = auth;
    }

    public record Credentials(string Email, string Password);

    /// <summary>Register an account. The first account created becomes admin.</summary>
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Credentials c)
    {
        if (c is null || string.IsNullOrWhiteSpace(c.Email) || string.IsNullOrWhiteSpace(c.Password))
            return BadRequest(new { error = "email and password are required" });
        if (c.Password.Length < 6)
            return BadRequest(new { error = "password must be at least 6 characters" });
        if (await _users.GetByEmailAsync(c.Email) is not null)
            return Conflict(new { error = "email already registered" });

        var u = await _users.CreateAsync(c.Email, c.Password);
        return Ok(new { token = _auth.IssueToken(u), user = new { u.Id, u.Email, u.Role } });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Credentials c)
    {
        var u = await _users.GetByEmailAsync(c?.Email ?? "");
        if (u is null || !UserManager.Verify(u, c!.Password))
            return Unauthorized(new { error = "invalid email or password" });
        return Ok(new { token = _auth.IssueToken(u), user = new { u.Id, u.Email, u.Role } });
    }

    /// <summary>Current user (requires a valid token).</summary>
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        // JwtSecurityTokenHandler maps "sub" -> NameIdentifier on inbound tokens.
        var idStr = User.FindFirstValue(ClaimTypes.NameIdentifier)
                    ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        if (!long.TryParse(idStr, out var id)) return Unauthorized();
        var u = await _users.GetByIdAsync(id);
        return u is null ? Unauthorized() : Ok(new { u.Id, u.Email, u.Role });
    }
}
