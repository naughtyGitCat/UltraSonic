namespace LrWallPaper.Agent.Services;

/// Attaches the shared Agent→Master service key (Agent:ServiceApiKey) to outgoing
/// requests. No-op when the key is unset (homelab / auth disabled on Master).
public static class ServiceAuth
{
    public const string HeaderName = "X-Service-Key";

    public static void ApplyServiceKey(this HttpClient client, IConfiguration cfg)
    {
        var key = cfg["Agent:ServiceApiKey"];
        if (!string.IsNullOrEmpty(key) && !client.DefaultRequestHeaders.Contains(HeaderName))
            client.DefaultRequestHeaders.Add(HeaderName, key);
    }
}
