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

        var cacheDir = Path.Combine(AppContext.BaseDirectory, "cache");
        Directory.CreateDirectory(cacheDir);

        app.MapDelete("/api/cache", async (AgentManager agentManager) =>
        {
            // Clear Master cache
            long cleared = 0;
            if (Directory.Exists(cacheDir))
            {
                var files = Directory.GetFiles(cacheDir);
                cleared = files.Length;
                foreach (var f in files) try { System.IO.File.Delete(f); } catch { }
            }
            // Also clear all Agent caches
            var agents = await agentManager.GetAllAgentsAsync();
            var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromSeconds(5) };
            foreach (var agent in agents)
            {
                try { await client.DeleteAsync($"{agent.Endpoint.TrimEnd('/')}/api/agent/cache"); } catch { }
            }
            return Results.Ok(new { masterCleared = cleared, agentsNotified = agents.Count });
        });

        app.MapGet("/api/cache/stats", () =>
        {
            if (!Directory.Exists(cacheDir)) return Results.Ok(new { files = 0, sizeBytes = 0L });
            var dirInfo = new DirectoryInfo(cacheDir);
            var fileInfos = dirInfo.GetFiles();
            return Results.Ok(new { files = fileInfos.Length, sizeBytes = fileInfos.Sum(f => f.Length) });
        });

        app.MapGet("/api/version", () =>
        {
            var asm = System.Reflection.Assembly.GetExecutingAssembly();
            var infoVer = asm.GetCustomAttributes(typeof(System.Reflection.AssemblyInformationalVersionAttribute), false)
                .OfType<System.Reflection.AssemblyInformationalVersionAttribute>().FirstOrDefault()?.InformationalVersion ?? "unknown";
            return Results.Ok(new { version = infoVer });
        });

        // SPA fallback: any unmatched route returns index.html
        app.MapFallbackToFile("index.html");

        app.MapGet("/api/image", async (string path, string? agentId, AgentManager agentManager, FileMD5Manager md5Manager) =>
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

            var needsConvert = new HashSet<string> { ".heic", ".cr2", ".cr3", ".nef", ".nrw", ".arw", ".sr2", ".srf", ".dng", ".raf", ".pef", ".rw2", ".orf" };

            if (string.IsNullOrEmpty(agentId) || agentId == "local")
            {
                if (!System.IO.File.Exists(path)) return Results.NotFound();
                if (needsConvert.Contains(ext))
                {
                    // Try cache: lookup file_md5 from DB
                    var entity = await md5Manager.FindByFullPathAsync(path);
                    var cacheKey = entity?.FileMD5;
                    if (!string.IsNullOrEmpty(cacheKey))
                    {
                        var cachePath = Path.Combine(cacheDir, $"{cacheKey}.jpg");
                        if (System.IO.File.Exists(cachePath))
                            return Results.File(cachePath, "image/jpeg", enableRangeProcessing: true);
                    }

                    using var image = new MagickImage(path);
                    var ms = new MemoryStream();
                    image.Write(ms, MagickFormat.Jpeg);

                    // Write to cache
                    if (!string.IsNullOrEmpty(cacheKey))
                    {
                        var cachePath = Path.Combine(cacheDir, $"{cacheKey}.jpg");
                        await System.IO.File.WriteAllBytesAsync(cachePath, ms.ToArray());
                    }

                    ms.Position = 0;
                    return Results.File(ms, "image/jpeg");
                }
                return Results.File(path, contentType, enableRangeProcessing: true);
            }

            // Remote agent fetch
            var agents = await agentManager.GetAllAgentsAsync();
            var agent = agents.FirstOrDefault(a => a.Id == agentId);
            if (agent == null || string.IsNullOrEmpty(agent.Endpoint)) return Results.NotFound();

            var client = new HttpClient(new HttpClientHandler { UseProxy = false }) { Timeout = TimeSpan.FromMinutes(5) };
            try {
                var request = new HttpRequestMessage(HttpMethod.Get, $"{agent.Endpoint.TrimEnd('/')}/api/agent/image?path={Uri.EscapeDataString(path)}");
                var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
                response.EnsureSuccessStatusCode();
                var stream = await response.Content.ReadAsStreamAsync();
                var proxyContentType = needsConvert.Contains(ext) ? "image/jpeg" : contentType;
                return Results.File(stream, proxyContentType, enableRangeProcessing: true);
            } catch {
                return Results.StatusCode(502);
            }
        });

        app.Run();
        

    }
}