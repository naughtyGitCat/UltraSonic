using LrWallPaper.Services;
using ModelContextProtocol.Server;
using Serilog;
using Serilog.Events;
using Microsoft.AspNetCore.Hosting;
using ImageMagick;

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
        builder.Services.AddSingleton<MasterReplicationService>();
        builder.Services.AddHostedService<MasterReplicationJob>();
        builder.Services.AddHostedService<FileRenameJob>();
        builder.Services.AddSingleton<MasterTrayIconManager>();
        
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

        app.MapGet("/api/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.Now }));

        app.MapGet("/api/version", () =>
        {
            var asm = System.Reflection.Assembly.GetExecutingAssembly();
            var infoVer = asm.GetCustomAttributes(typeof(System.Reflection.AssemblyInformationalVersionAttribute), false)
                .OfType<System.Reflection.AssemblyInformationalVersionAttribute>().FirstOrDefault()?.InformationalVersion ?? "unknown";
            return Results.Ok(new { version = infoVer });
        });

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
                if (ext == ".heic")
                {
                    using var image = new MagickImage(path);
                    var ms = new MemoryStream();
                    image.Write(ms, MagickFormat.Jpeg);
                    ms.Position = 0;
                    return Results.File(ms, "image/jpeg");
                }
                return Results.File(path, contentType, enableRangeProcessing: true);
            }

            // Remote agent fetch
            var agents = await agentManager.GetAllAgentsAsync();
            var agent = agents.FirstOrDefault(a => a.Id == agentId);
            if (agent == null || string.IsNullOrEmpty(agent.Endpoint)) return Results.NotFound();

            var client = new HttpClient { Timeout = TimeSpan.FromMinutes(5) };
            try {
                var request = new HttpRequestMessage(HttpMethod.Get, $"{agent.Endpoint.TrimEnd('/')}/api/agent/image?path={Uri.EscapeDataString(path)}");
                var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
                response.EnsureSuccessStatusCode();
                var stream = await response.Content.ReadAsStreamAsync();
                var proxyContentType = ext == ".heic" ? "image/jpeg" : contentType;
                return Results.File(stream, proxyContentType, enableRangeProcessing: true);
            } catch {
                return Results.StatusCode(502);
            }
        });

        app.Run();
        

    }
}