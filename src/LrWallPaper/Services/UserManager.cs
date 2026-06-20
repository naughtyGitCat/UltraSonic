using System.Security.Cryptography;
using NPoco;

namespace LrWallPaper.Services;

[TableName("users")]
[PrimaryKey("id")]
public record UserEntity
{
    [Column("id")] public long Id { get; set; }
    [Column("email")] public string Email { get; set; } = "";
    [Column("password_hash")] public string PasswordHash { get; set; } = "";
    [Column("role")] public string Role { get; set; } = "user";   // "admin" | "user"
    [Column("created_at")] public DateTime CreatedAt { get; set; }
}

/// User accounts + password hashing (PBKDF2/SHA256, no third-party hash lib).
/// Shares the Master SQLite via FileMD5Manager.OpenDb().
public class UserManager
{
    private readonly FileMD5Manager _db;

    public UserManager(FileMD5Manager db)
    {
        _db = db;
        using var c = _db.OpenDb();
        c.Execute("""
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT NOT NULL UNIQUE,
              password_hash TEXT NOT NULL,
              role TEXT NOT NULL DEFAULT 'user',
              created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        """);
    }

    public async Task<int> CountAsync()
    {
        using var c = _db.OpenDb();
        return await c.ExecuteScalarAsync<int>("SELECT COUNT(1) FROM users");
    }

    public async Task<UserEntity?> GetByEmailAsync(string email)
    {
        using var c = _db.OpenDb();
        return await c.SingleOrDefaultAsync<UserEntity>("SELECT * FROM users WHERE email = @0", email.Trim().ToLowerInvariant());
    }

    public async Task<UserEntity?> GetByIdAsync(long id)
    {
        using var c = _db.OpenDb();
        return await c.SingleOrDefaultAsync<UserEntity>("SELECT * FROM users WHERE id = @0", id);
    }

    /// Create a user. First user created becomes "admin".
    public async Task<UserEntity> CreateAsync(string email, string password, string? role = null)
    {
        var resolvedRole = role ?? (await CountAsync() == 0 ? "admin" : "user");
        var u = new UserEntity
        {
            Email = email.Trim().ToLowerInvariant(),
            PasswordHash = HashPassword(password),
            Role = resolvedRole,
            CreatedAt = DateTime.UtcNow
        };
        using var c = _db.OpenDb();
        await c.InsertAsync(u);
        return u;
    }

    public static bool Verify(UserEntity u, string password) => VerifyPassword(password, u.PasswordHash);

    // --- PBKDF2 (SHA256, 100k iters, 16-byte salt, 32-byte hash) ---
    private const int Iterations = 100_000;

    public static string HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithmName.SHA256, 32);
        return $"pbkdf2${Iterations}${Convert.ToBase64String(salt)}${Convert.ToBase64String(hash)}";
    }

    public static bool VerifyPassword(string password, string stored)
    {
        var parts = stored.Split('$');
        if (parts.Length != 4 || parts[0] != "pbkdf2") return false;
        if (!int.TryParse(parts[1], out var iter)) return false;
        var salt = Convert.FromBase64String(parts[2]);
        var expected = Convert.FromBase64String(parts[3]);
        var actual = Rfc2898DeriveBytes.Pbkdf2(password, salt, iter, HashAlgorithmName.SHA256, expected.Length);
        return CryptographicOperations.FixedTimeEquals(actual, expected);
    }
}
