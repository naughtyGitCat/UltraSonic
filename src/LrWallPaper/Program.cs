// psyduck 20220409
using LrWallPaper.Services;

using Serilog;
using Serilog.Events;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using LrWallPaper.Jobs;
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
            .CreateLogger();
        var builder = WebApplication.CreateBuilder(args);
        
        // Add services to the container.
        builder.Services.AddSingleton<ICustomSQLiteFactory, CustomSQLiteFactory>();
        // builder.Services.AddHostedService<BusinessJob>();
        builder.Services.AddSingleton<ICaptureRepository, CaptureRawRepository>();
        builder.Services.AddSingleton<FileMD5Manager>();
        // builder.Services.AddHostedService<ExperimentJob>();
        // builder.Services.AddHostedService<SyncRemovableJob>();
        builder.Services.AddHostedService<SyncAppleJob>();
        builder.Services.AddHostedService<PictureMD5Job>();
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddSerilog();


        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
        

    }
}