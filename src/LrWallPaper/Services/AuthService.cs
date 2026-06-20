using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace LrWallPaper.Services;

/// Holds the auth on/off switch and the JWT signing key, and issues tokens.
/// Auth:Enabled defaults to FALSE so existing (LAN/homelab) deployments keep working
/// with no credentials; turn it on for a public/multi-user/demo deployment.
public class AuthService
{
    public bool Enabled { get; }
    public SymmetricSecurityKey SigningKey { get; }
    /// Shared secret for Agent→Master service calls (sync/tombstone/etc). When set and
    /// auth is enabled, a request carrying it in X-Service-Key is treated as a trusted
    /// "service" principal. Empty = service calls are not separately authenticated.
    public string? ServiceApiKey { get; }
    private readonly byte[] _secret;

    public AuthService(IConfiguration cfg)
    {
        Enabled = cfg.GetValue("Auth:Enabled", false);
        ServiceApiKey = cfg["Auth:ServiceApiKey"];

        var secret = cfg["Auth:JwtSecret"];
        if (string.IsNullOrWhiteSpace(secret))
        {
            // Persist an auto-generated secret so tokens survive restarts.
            var keyFile = Path.Combine(AppContext.BaseDirectory, "jwt-secret.key");
            if (File.Exists(keyFile)) secret = File.ReadAllText(keyFile).Trim();
            else { secret = Convert.ToBase64String(RandomNumberGenerator.GetBytes(48)); File.WriteAllText(keyFile, secret); }
        }
        _secret = Encoding.UTF8.GetBytes(secret);
        SigningKey = new SymmetricSecurityKey(_secret);
    }

    public string IssueToken(UserEntity u, TimeSpan? lifetime = null)
    {
        var creds = new SigningCredentials(SigningKey, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            claims: new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, u.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, u.Email),
                new Claim(ClaimTypes.Role, u.Role),
            },
            expires: DateTime.UtcNow.Add(lifetime ?? TimeSpan.FromDays(30)),
            signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
