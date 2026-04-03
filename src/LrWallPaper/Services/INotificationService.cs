namespace LrWallPaper.Services;

public interface INotificationService
{
    /// <summary>
    /// Send a notification with a title and body.
    /// </summary>
    Task<bool> SendAsync(string title, string body, string? group = null);
}
