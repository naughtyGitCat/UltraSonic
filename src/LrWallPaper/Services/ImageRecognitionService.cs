using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using LrWallPaper.Models;

namespace LrWallPaper.Services;

public interface IImageRecognizer
{
    string ProviderName { get; }
    Task<List<string>> RecognizeAsync(byte[] imageBytes, CancellationToken ct = default);
    Task<(bool ok, string message)> TestConnectionAsync(CancellationToken ct = default);
}

public static class RecognitionPrompt
{
    public const string Prompt = """
        Analyze this image and return a JSON array of descriptive tags in Chinese.
        Include tags for: subject category (动物/植物/人物/风景/建筑/食物/交通工具/物品),
        specific subjects (猫/狗/花/山/海 etc.), scene (室内/室外/夜景/日落),
        and mood/style if applicable.
        Return ONLY a JSON array of strings, no other text. Example: ["动物","猫","室内"]
        """;
}

// ============================================================
// Claude (Anthropic) Vision
// ============================================================
public class ClaudeRecognizer : IImageRecognizer
{
    public string ProviderName => "Claude";
    private readonly string _apiKey;
    private readonly string _model;
    private readonly HttpClient _http;

    public ClaudeRecognizer(string apiKey, string model, IHttpClientFactory? httpFactory = null)
    {
        _apiKey = apiKey;
        _model = model;
        _http = httpFactory?.CreateClient() ?? new HttpClient(new HttpClientHandler { UseProxy = false });
        _http.Timeout = TimeSpan.FromSeconds(60);
    }

    public async Task<List<string>> RecognizeAsync(byte[] imageBytes, CancellationToken ct = default)
    {
        var base64 = Convert.ToBase64String(imageBytes);
        var body = new
        {
            model = _model,
            max_tokens = 300,
            messages = new[] { new {
                role = "user",
                content = new object[] {
                    new { type = "image", source = new { type = "base64", media_type = "image/jpeg", data = base64 } },
                    new { type = "text", text = RecognitionPrompt.Prompt }
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
        return ExtractTags(json, "content");
    }

    public async Task<(bool ok, string message)> TestConnectionAsync(CancellationToken ct = default)
    {
        if (string.IsNullOrEmpty(_apiKey)) return (false, "API key not configured");
        try
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.anthropic.com/v1/models");
            request.Headers.Add("x-api-key", _apiKey);
            request.Headers.Add("anthropic-version", "2023-06-01");
            var response = await _http.SendAsync(request, ct);
            return response.IsSuccessStatusCode ? (true, $"Connected. Model: {_model}") : (false, $"HTTP {(int)response.StatusCode}");
        }
        catch (Exception ex) { return (false, ex.Message); }
    }

    private static List<string> ExtractTags(string json, string field)
    {
        try
        {
            var doc = JsonNode.Parse(json);
            // Claude: { content: [ { type: "text", text: "[\"tag1\",...]" } ] }
            var text = doc?["content"]?[0]?["text"]?.GetValue<string>() ?? "";
            // Extract JSON array from text
            var start = text.IndexOf('[');
            var end = text.LastIndexOf(']');
            if (start >= 0 && end > start)
            {
                var arr = JsonSerializer.Deserialize<List<string>>(text[start..(end + 1)]);
                return arr ?? [];
            }
        }
        catch { }
        return [];
    }
}

// ============================================================
// OpenAI GPT-4o Vision
// ============================================================
public class OpenAIRecognizer : IImageRecognizer
{
    public string ProviderName => "OpenAI";
    private readonly string _apiKey;
    private readonly string _model;
    private readonly HttpClient _http;

    public OpenAIRecognizer(string apiKey, string model, IHttpClientFactory? httpFactory = null)
    {
        _apiKey = apiKey;
        _model = model;
        _http = httpFactory?.CreateClient() ?? new HttpClient(new HttpClientHandler { UseProxy = false });
        _http.Timeout = TimeSpan.FromSeconds(60);
    }

    public async Task<List<string>> RecognizeAsync(byte[] imageBytes, CancellationToken ct = default)
    {
        var base64 = Convert.ToBase64String(imageBytes);
        var body = new
        {
            model = _model,
            max_tokens = 300,
            messages = new[] { new {
                role = "user",
                content = new object[] {
                    new { type = "image_url", image_url = new { url = $"data:image/jpeg;base64,{base64}" } },
                    new { type = "text", text = RecognitionPrompt.Prompt }
                }
            }}
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
        request.Headers.Add("Authorization", $"Bearer {_apiKey}");
        request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

        var response = await _http.SendAsync(request, ct);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(ct);
        return ExtractTagsOpenAI(json);
    }

    public async Task<(bool ok, string message)> TestConnectionAsync(CancellationToken ct = default)
    {
        if (string.IsNullOrEmpty(_apiKey)) return (false, "API key not configured");
        try
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.openai.com/v1/models");
            request.Headers.Add("Authorization", $"Bearer {_apiKey}");
            var response = await _http.SendAsync(request, ct);
            return response.IsSuccessStatusCode ? (true, $"Connected. Model: {_model}") : (false, $"HTTP {(int)response.StatusCode}");
        }
        catch (Exception ex) { return (false, ex.Message); }
    }

    private static List<string> ExtractTagsOpenAI(string json)
    {
        try
        {
            var doc = JsonNode.Parse(json);
            var text = doc?["choices"]?[0]?["message"]?["content"]?.GetValue<string>() ?? "";
            var start = text.IndexOf('[');
            var end = text.LastIndexOf(']');
            if (start >= 0 && end > start)
                return JsonSerializer.Deserialize<List<string>>(text[start..(end + 1)]) ?? [];
        }
        catch { }
        return [];
    }
}

// ============================================================
// Google Gemini Vision
// ============================================================
public class GeminiRecognizer : IImageRecognizer
{
    public string ProviderName => "Gemini";
    private readonly string _apiKey;
    private readonly string _model;
    private readonly HttpClient _http;

    public GeminiRecognizer(string apiKey, string model, IHttpClientFactory? httpFactory = null)
    {
        _apiKey = apiKey;
        _model = model;
        _http = httpFactory?.CreateClient() ?? new HttpClient(new HttpClientHandler { UseProxy = false });
        _http.Timeout = TimeSpan.FromSeconds(60);
    }

    public async Task<List<string>> RecognizeAsync(byte[] imageBytes, CancellationToken ct = default)
    {
        var base64 = Convert.ToBase64String(imageBytes);
        var body = new
        {
            contents = new[] { new {
                parts = new object[] {
                    new { inline_data = new { mime_type = "image/jpeg", data = base64 } },
                    new { text = RecognitionPrompt.Prompt }
                }
            }}
        };

        var url = $"https://generativelanguage.googleapis.com/v1beta/models/{_model}:generateContent?key={_apiKey}";
        var request = new HttpRequestMessage(HttpMethod.Post, url);
        request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

        var response = await _http.SendAsync(request, ct);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(ct);
        return ExtractTagsGemini(json);
    }

    public async Task<(bool ok, string message)> TestConnectionAsync(CancellationToken ct = default)
    {
        if (string.IsNullOrEmpty(_apiKey)) return (false, "API key not configured");
        try
        {
            var url = $"https://generativelanguage.googleapis.com/v1beta/models?key={_apiKey}";
            var response = await _http.GetAsync(url, ct);
            return response.IsSuccessStatusCode ? (true, $"Connected. Model: {_model}") : (false, $"HTTP {(int)response.StatusCode}");
        }
        catch (Exception ex) { return (false, ex.Message); }
    }

    private static List<string> ExtractTagsGemini(string json)
    {
        try
        {
            var doc = JsonNode.Parse(json);
            var text = doc?["candidates"]?[0]?["content"]?["parts"]?[0]?["text"]?.GetValue<string>() ?? "";
            var start = text.IndexOf('[');
            var end = text.LastIndexOf(']');
            if (start >= 0 && end > start)
                return JsonSerializer.Deserialize<List<string>>(text[start..(end + 1)]) ?? [];
        }
        catch { }
        return [];
    }
}

// ============================================================
// Factory: create recognizer by provider name
// ============================================================
public static class ImageRecognizerFactory
{
    public static IImageRecognizer Create(string provider, RecognitionConfig config)
    {
        var key = config.ApiKeys.GetValueOrDefault(provider, "");
        var model = config.Models.GetValueOrDefault(provider, "");
        return provider switch
        {
            "Claude" => new ClaudeRecognizer(key, model),
            "OpenAI" => new OpenAIRecognizer(key, model),
            "Gemini" => new GeminiRecognizer(key, model),
            _ => throw new ArgumentException($"Unknown provider: {provider}")
        };
    }
}
