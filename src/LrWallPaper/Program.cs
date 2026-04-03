// psyduck 20220409
using LrWallPaper.Services;
using ModelContextProtocol.Server;
using Serilog;
using Serilog.Events;
using Microsoft.AspNetCore.Hosting;
using SlimCluster;
using SlimCluster.Membership.Swim;
using SlimCluster.Serialization.Json;
using SlimCluster.Transport.Ip;

using LrWallPaper.Jobs;
using LrWallPaper.Models;
namespace LrWallPaper;
class Program
{
    static void Main(string[] args)
    {
        const string logTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz}[{Level:u3}][{SourceContext}]{Message:lj}{NewLine}{Exception}";
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console(outputTemplate: logTemplate)
            .WriteTo.File("logs/master-.txt", rollingInterval: RollingInterval.Day, outputTemplate: logTemplate)
            .CreateLogger();
        var builder = WebApplication.CreateBuilder(args);
        
        var ultraSonicConfig = builder.Configuration.GetSection("UltraSonic").Get<UltraSonicConfig>() ?? new UltraSonicConfig();
        builder.Services.AddSingleton(ultraSonicConfig);

        // Add services to the container.
        builder.Services.AddSingleton<ICustomSQLiteFactory, CustomSQLiteFactory>();
        // builder.Services.AddHostedService<BusinessJob>();
        builder.Services.AddSingleton<FileMD5Manager>();
        builder.Services.AddSingleton<AgentManager>();
        // builder.Services.AddHostedService<ExperimentJob>();
        // builder.Services.AddHostedService<SyncRemovableJob>();
        // builder.Services.AddHostedService<PictureMD5Job>(); // moved to Agent
        // builder.Services.AddHostedService<SyncAppleJob>(); // moved to Agent
        // builder.Services.AddHostedService<SyncGenericDeviceJob>(); // moved to Agent
        builder.Services.AddHttpClient("ClusterClient");
        builder.Services.AddHttpClient("BarkClient");
        builder.Services.AddSingleton<INotificationService, BarkNotificationService>();
        builder.Services.AddSingleton<MasterReplicationService>();
        builder.Services.AddHostedService<MasterReplicationJob>();
        builder.Services.AddSingleton<MasterTrayIconManager>();

        // ── SWIM Cluster Discovery ──────────────────────────────
        var clusterHttpEndpoint = builder.Configuration["Cluster:HttpEndpoint"]
            ?? builder.Configuration["Urls"]
            ?? "http://localhost:5281";
        var clusterNodeKey = builder.Configuration["Cluster:NodeKey"] ?? Environment.MachineName;
        var nodeId = ClusterNodeInfo.BuildNodeId(ClusterNodeRole.Master, clusterNodeKey, clusterHttpEndpoint);

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
        
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddSerilog();

        builder.Services.AddMcpServer()
                        .WithHttpTransport()
                        .WithToolsFromAssembly()
                        .WithPromptsFromAssembly()
                        .WithResourcesFromAssembly();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        var trayManager = app.Services.GetRequiredService<MasterTrayIconManager>();
        trayManager.Start();
        app.Lifetime.ApplicationStopping.Register(() => trayManager.Stop());

// app.UseHttpsRedirection();

        // Serve React build output from wwwroot
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.UseAuthorization();

        app.MapControllers();

        // SPA fallback: any unmatched route returns index.html
        app.MapFallbackToFile("index.html");

        app.MapGet("/api/image", async (string path, string? agentId, AgentManager agentManager) =>
        {
            if (string.IsNullOrEmpty(path)) return Results.NotFound();

            var ext = System.IO.Path.GetExtension(path).ToLowerInvariant();
            var contentType = ext switch {
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

            if (string.IsNullOrEmpty(agentId) || agentId == "local")
            {
                if (!System.IO.File.Exists(path)) return Results.NotFound();
                return Results.File(path, contentType);
            }
            
            // Remote agent fetch
            var agents = await agentManager.GetAllAgentsAsync();
            var agent = agents.FirstOrDefault(a => a.Id == agentId);
            if (agent == null || string.IsNullOrEmpty(agent.Endpoint)) return Results.NotFound();

            var client = new HttpClient();
            try {
                var stream = await client.GetStreamAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/image?path={Uri.EscapeDataString(path)}");
                return Results.File(stream, contentType);
            } catch {
                return Results.StatusCode(502);
            }
        });

        app.Run();
        

    }
}