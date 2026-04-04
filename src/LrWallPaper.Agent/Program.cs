using Serilog;
using Serilog.Events;
using ImageMagick;
using LrWallPaper.Agent.Services;

var logTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz}[{Level:u3}][{SourceContext}]{Message:lj}{NewLine}{Exception}";
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console(outputTemplate: logTemplate)
    .WriteTo.File("logs/agent-.txt", rollingInterval: RollingInterval.Day, outputTemplate: logTemplate)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSerilog();
builder.Services.AddSingleton<AgentState>();
builder.Services.AddSingleton<TrayIconManager>();
builder.Services.AddHostedService<ScanAndPushJob>();
builder.Services.AddHostedService<DeviceSyncAppleJob>();
builder.Services.AddHostedService<DeviceSyncGenericJob>();

var app = builder.Build();

var trayManager = app.Services.GetRequiredService<TrayIconManager>();
trayManager.Start();
app.Lifetime.ApplicationStopping.Register(() => trayManager.Stop());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

// Image streaming endpoint
app.MapGet("/api/agent/image", (string path, AgentState agentState) =>
{
    if (!agentState.IsRequestEnabled)
    {
        return Results.StatusCode(503);
    }
    if (string.IsNullOrEmpty(path) || !System.IO.File.Exists(path))
    {
        return Results.NotFound();
    }

    var ext = System.IO.Path.GetExtension(path).ToLowerInvariant();
    var contentType = ext switch
    {
        ".jpg" or ".jpeg" => "image/jpeg",
        ".png" => "image/png",
        ".gif" => "image/gif",
        ".bmp" => "image/bmp",
        ".webp" => "image/webp",
        ".heic" => "image/heic",
        ".mp4" => "video/mp4",
        ".mov" => "video/quicktime",
        ".avi" => "video/x-msvideo",
        ".mkv" => "video/x-matroska",
        ".mts" => "video/mp2t",
        _ => "application/octet-stream"
    };

    var needsConvert = new HashSet<string> { ".heic", ".cr2", ".cr3", ".nef", ".nrw", ".arw", ".sr2", ".srf", ".dng", ".raf", ".pef", ".rw2", ".orf" };
    if (needsConvert.Contains(ext))
    {
        using var image = new MagickImage(path);
        var ms = new MemoryStream();
        image.Write(ms, MagickFormat.Jpeg);
        ms.Position = 0;
        return Results.File(ms, "image/jpeg");
    }
    return Results.File(path, contentType, enableRangeProcessing: true);
});

app.MapGet("/api/agent/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.Now }));

app.MapGet("/api/agent/version", () =>
{
    var asm = System.Reflection.Assembly.GetExecutingAssembly();
    var infoVer = asm.GetCustomAttributes(typeof(System.Reflection.AssemblyInformationalVersionAttribute), false)
        .OfType<System.Reflection.AssemblyInformationalVersionAttribute>().FirstOrDefault()?.InformationalVersion ?? "unknown";
    return Results.Ok(new { version = infoVer });
});

// File delete endpoint for Master to request file deletion
app.MapDelete("/api/agent/file", (string path, AgentState agentState) =>
{
    if (!agentState.IsRequestEnabled)
        return Results.StatusCode(503);
    if (string.IsNullOrEmpty(path))
        return Results.BadRequest();
    if (!System.IO.File.Exists(path))
        return Results.NotFound();

    System.IO.File.Delete(path);
    return Results.Ok();
});

// Trigger immediate rescan
app.MapPost("/api/agent/rescan", (AgentState agentState) =>
{
    agentState.TriggerRescan();
    return Results.Ok(new { message = "Rescan triggered" });
});

// Move file on agent's local disk
app.MapPost("/api/agent/move", async (HttpContext ctx) =>
{
    var body = await ctx.Request.ReadFromJsonAsync<MoveFileRequest>();
    if (body == null || string.IsNullOrEmpty(body.SourcePath) || string.IsNullOrEmpty(body.TargetPath))
        return Results.BadRequest();
    if (!System.IO.File.Exists(body.SourcePath))
        return Results.NotFound();

    var targetDir = System.IO.Path.GetDirectoryName(body.TargetPath);
    if (!string.IsNullOrEmpty(targetDir)) System.IO.Directory.CreateDirectory(targetDir);
    System.IO.File.Move(body.SourcePath, body.TargetPath, overwrite: false);
    return Results.Ok();
});

app.Run();

record MoveFileRequest(string SourcePath, string TargetPath);
