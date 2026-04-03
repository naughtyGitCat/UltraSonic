using System.Net.Http.Json;

namespace LrWallPaper.Services;

/// <summary>
/// Push notifications via Bark (https://github.com/Finb/Bark).
/// Config in appsettings.json:
///   "Notification": {
///     "Bark": {
///       "ServerUrl": "https://api.day.app",
///       "DeviceKey": "your-device-key"
///     }
///   }
/// </summary>
public class BarkNotificationService : INotificationService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<BarkNotificationService> _logger;
    private readonly string _serverUrl;
    private readonly string _deviceKey;

    public BarkNotificationService(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ILogger<BarkNotificationService> logger)
    {
        _httpClient = httpClientFactory.CreateClient("BarkClient");
        _logger = logger;
        _serverUrl = (configuration["Notification:Bark:ServerUrl"] ?? "https://api.day.app").TrimEnd('/');
        _deviceKey = configuration["Notification:Bark:DeviceKey"] ?? "";
    }

    public async Task<bool> SendAsync(string title, string body, string? group = null)
    {
        if (string.IsNullOrEmpty(_deviceKey))
        {
            _logger.LogWarning("Bark DeviceKey not configured, skipping notification: {Title}", title);
            return false;
        }

        var payload = new Dictionary<string, string>
        {
            ["title"] = title,
            ["body"] = body,
            ["device_key"] = _deviceKey,
            ["icon"] = "https://raw.githubusercontent.com/naughtyGitCat/UltraSonic/master/src/LrWallPaper/master.ico"
        };

        if (!string.IsNullOrEmpty(group))
        {
            payload["group"] = group;
        }

        try
        {
            var response = await _httpClient.PostAsJsonAsync($"{_serverUrl}/push", payload);
            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Bark notification sent: {Title}", title);
                return true;
            }

            _logger.LogWarning("Bark notification failed: HTTP {Status}", response.StatusCode);
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send Bark notification: {Title}", title);
            return false;
        }
    }
}
