using Serilog;
using Serilog.Events;
using LrWallPaper.Agent.Services;
using SlimCluster;
using SlimCluster.Membership.Swim;
using SlimCluster.Serialization.Json;
using SlimCluster.Transport.Ip;

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
builder.Services.AddHostedService<DeviceMonitorJob>();
builder.Services.AddSingleton<DeviceSyncTrigger>();

// ── SWIM Cluster Discovery ──────────────────────────────
var clusterHttpEndpoint = builder.Configuration["Cluster:HttpEndpoint"]
    ?? builder.Configuration["Urls"]
    ?? "http://localhost:5245";
var agentId = builder.Configuration["Agent:AgentId"];
if (string.IsNullOrEmpty(agentId))
{
    agentId = Environment.MachineName;
}
var nodeId = ClusterNodeInfo.BuildNodeId(ClusterNodeRole.Agent, agentId, clusterHttpEndpoint);

builder.Services.AddSlimCluster(cfg =>
{
    cfg.ClusterId = builder.Configuration["Cluster:ClusterId"] ?? "UltraSonic";
    cfg.NodeId = nodeId;
    cfg.AddIpTransport(opts =>
    {
        opts.Port = builder.Configuration.GetValue("Cluster:UdpPort", 5300);
        opts.MulticastGroupAddress = builder.Configuration["Cluster:MulticastGroupAddress"] ?? "239.255.85.67";
    });
    cfg.AddJsonSerialization();
    cfg.AddSwimMembership(opts =>
    {
        opts.MembershipEventPiggybackCount = 2;
    });
});
builder.Services.AddSingleton<ClusterDiscoveryService>();
builder.Services.AddHostedService(sp => sp.GetRequiredService<ClusterDiscoveryService>());

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

    return Results.File(path, contentType);
});

// Sync trigger endpoint: Master calls this to start device sync on demand
app.MapPost("/api/agent/sync/trigger", async (DeviceSyncTrigger trigger) =>
{
    trigger.TriggerNow();
    return Results.Ok(new { Status = "triggered" });
});

app.Run();
