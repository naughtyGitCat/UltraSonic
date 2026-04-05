using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using LrWallPaper.Models;

namespace LrWallPaper.Services;

public class FaceDetection
{
    public double X { get; set; }
    public double Y { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
    public double Confidence { get; set; }
    public string? Description { get; set; }
}

public interface IFaceDetector
{
    Task<List<FaceDetection>> DetectFacesAsync(byte[] imageBytes, CancellationToken ct = default);
}

public static class FaceDetectionPrompt
{
    public const string Prompt = """
        Analyze this image and detect all human faces.
        For each face found, return:
        - x, y: top-left corner position as fraction of image (0.0 to 1.0)
        - width, height: size as fraction of image (0.0 to 1.0)
        - confidence: detection confidence (0.0 to 1.0)
        - description: brief description in Chinese (e.g. "年轻女性，长发", "中年男性，戴眼镜")

        Return ONLY a JSON array. If no faces found, return [].
        Example: [{"x":0.2,"y":0.1,"width":0.15,"height":0.2,"confidence":0.95,"description":"年轻男性"}]
        """;
}

public class ClaudeFaceDetector : IFaceDetector
{
    private readonly string _apiKey;
    private readonly string _model;
    private readonly HttpClient _http;

    public ClaudeFaceDetector(string apiKey, string model)
    {
        _apiKey = apiKey;
        _model = model;
        _http = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(60) };
    }

    public async Task<List<FaceDetection>> DetectFacesAsync(byte[] imageBytes, CancellationToken ct = default)
    {
        var base64 = Convert.ToBase64String(imageBytes);
        var body = new
        {
            model = _model,
            max_tokens = 1000,
            messages = new[] { new {
                role = "user",
                content = new object[] {
                    new { type = "image", source = new { type = "base64", media_type = "image/jpeg", data = base64 } },
                    new { type = "text", text = FaceDetectionPrompt.Prompt }
                }
            }}
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.anthropic.com/v1/messages");
        request.Headers.Add("x-api-key", _apiKey);
        request.Headers.Add("anthropic-version", "2023-06-01");
        request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

        var response = await _http.SendAsync(request, ct);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(ct);
        return ParseFaces(json, "claude");
    }

    private static List<FaceDetection> ParseFaces(string json, string provider)
    {
        try
        {
            var doc = JsonNode.Parse(json);
            var text = doc?["content"]?[0]?["text"]?.GetValue<string>() ?? "";
            return ExtractFaceArray(text);
        }
        catch { return []; }
    }

    internal static List<FaceDetection> ExtractFaceArray(string text)
    {
        var start = text.IndexOf('[');
        var end = text.LastIndexOf(']');
        if (start < 0 || end <= start) return [];
        try
        {
            return JsonSerializer.Deserialize<List<FaceDetection>>(text[start..(end + 1)],
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? [];
        }
        catch { return []; }
    }
}

public class OpenAIFaceDetector : IFaceDetector
{
    private readonly string _apiKey;
    private readonly string _model;
    private readonly HttpClient _http;

    public OpenAIFaceDetector(string apiKey, string model)
    {
        _apiKey = apiKey;
        _model = model;
        _http = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(60) };
    }

    public async Task<List<FaceDetection>> DetectFacesAsync(byte[] imageBytes, CancellationToken ct = default)
    {
        var base64 = Convert.ToBase64String(imageBytes);
        var body = new
        {
            model = _model,
            max_tokens = 1000,
            messages = new[] { new {
                role = "user",
                content = new object[] {
                    new { type = "image_url", image_url = new { url = $"data:image/jpeg;base64,{base64}" } },
                    new { type = "text", text = FaceDetectionPrompt.Prompt }
                }
            }}
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
        request.Headers.Add("Authorization", $"Bearer {_apiKey}");
        request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

        var response = await _http.SendAsync(request, ct);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(ct);

        var doc = JsonNode.Parse(json);
        var text = doc?["choices"]?[0]?["message"]?["content"]?.GetValue<string>() ?? "";
        return ClaudeFaceDetector.ExtractFaceArray(text);
    }
}

public class GeminiFaceDetector : IFaceDetector
{
    private readonly string _apiKey;
    private readonly string _model;
    private readonly HttpClient _http;

    public GeminiFaceDetector(string apiKey, string model)
    {
        _apiKey = apiKey;
        _model = model;
        _http = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(60) };
    }

    public async Task<List<FaceDetection>> DetectFacesAsync(byte[] imageBytes, CancellationToken ct = default)
    {
        var base64 = Convert.ToBase64String(imageBytes);
        var body = new
        {
            contents = new[] { new {
                parts = new object[] {
                    new { inline_data = new { mime_type = "image/jpeg", data = base64 } },
                    new { text = FaceDetectionPrompt.Prompt }
                }
            }}
        };

        var url = $"https://generativelanguage.googleapis.com/v1beta/models/{_model}:generateContent?key={_apiKey}";
        var request = new HttpRequestMessage(HttpMethod.Post, url);
        request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

        var response = await _http.SendAsync(request, ct);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(ct);

        var doc = JsonNode.Parse(json);
        var text = doc?["candidates"]?[0]?["content"]?["parts"]?[0]?["text"]?.GetValue<string>() ?? "";
        return ClaudeFaceDetector.ExtractFaceArray(text);
    }
}

public static class FaceDetectorFactory
{
    public static IFaceDetector Create(string provider, RecognitionConfig config)
    {
        var key = config.ApiKeys.GetValueOrDefault(provider, "");
        var model = config.Models.GetValueOrDefault(provider, "");
        return provider switch
        {
            "Claude" => new ClaudeFaceDetector(key, model),
            "OpenAI" => new OpenAIFaceDetector(key, model),
            "Gemini" => new GeminiFaceDetector(key, model),
            _ => throw new ArgumentException($"Unknown provider: {provider}")
        };
    }
}
