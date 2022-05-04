// psyduck 20220409
using System;

namespace LrWallPaper.Services;

public record HistoryCapture
{
    public string? FileBaseName { get; set; }
    public string? FileExtension { get; set; }    
    public DateTime CaptureTime { get; set; }
    public string? AbsolutePath { get; set; }
}
public class BusinessJob : BackgroundService
{
    private readonly ILogger<BusinessJob> _logger;
    private readonly ISQLiteFactory _sqliteFactory;
    private readonly ICaptureRepository _captureRepository;
    private IEnumerable<HistoryCapture> _historyCaptures;
    public BusinessJob(ISQLiteFactory sQLiteFactory, ILogger<BusinessJob> logger, ICaptureRepository captureRepository)
    {
        _sqliteFactory = sQLiteFactory;
        _logger = logger;
        _captureRepository = captureRepository;
        _historyCaptures = Array.Empty<HistoryCapture>();
    }

    private async Task<IEnumerable<HistoryCapture>> FetchCapturesAsync(DateTime dateTime)
    {
        using var db = _sqliteFactory.GetDatabase();
        var sql = @$"
        SELECT
            AgLibraryFile.baseName AS FileBaseName,
            AgLibraryFile.extension AS FileExtension,
	        Adobe_images.captureTime AS CaptureTime,
	        AgLibraryRootFolder.absolutePath ||	AgLibraryFolder.pathFromRoot||AgLibraryFile.baseName || '.' || AgLibraryFile.extension AS AbsolutePath
        FROM
	        Adobe_images
	        JOIN AgLibraryFile ON Adobe_images.rootFile = AgLibraryFile.id_local
	        JOIN AgLibraryFolder ON AgLibraryFile.folder = AgLibraryFolder.id_local
	        JOIN AgLibraryRootFolder ON AgLibraryFolder.rootFolder = AgLibraryRootFolder.id_local
    WHERE
        strftime('%m-%d', Adobe_images.captureTime) = '{dateTime:MM-dd}'
            AND
        (FileExtension = 'jpg' OR FileExtension = 'JPG')
        ";
        _logger.LogDebug(sql);
        return await db.FetchAsync<HistoryCapture>(sql);
    }
    
    private async Task<IEnumerable<HistoryCapture>> FetchCapturesAsync(CancellationToken cancellationToken)
    {
        var dt = DateTime.Now;
        var times = 888;
        while (!cancellationToken.IsCancellationRequested)
        {
            var x = await FetchCapturesAsync(dt);
            if (x.Any()) return x;
            dt = dt.AddDays(-1);
            times--;
            if (times <= 0) break;
        }
        return Array.Empty<HistoryCapture>();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await _captureRepository.GetRecentCapturesAsync();
        var firstTime = true;
        var cts = CancellationTokenSource.CreateLinkedTokenSource(stoppingToken);
        _logger.LogInformation("Now set timer");
        var timer = new System.Timers.Timer(1)
        {
            AutoReset = true,
            Enabled = true,
            Interval = new TimeSpan(0, 0, 1).TotalMilliseconds / 2
        };
        timer.Elapsed += async (sender, e) =>
        {
            if (firstTime)
            {
                firstTime = false;
                _historyCaptures = await FetchCapturesAsync(stoppingToken);
            }
            else if (DateTime.Now.Hour == 0 && DateTime.Now.Minute == 0 && DateTime.Now.Second == 0)
            {
                cts.Cancel();
                cts = CancellationTokenSource.CreateLinkedTokenSource(stoppingToken);
                _historyCaptures = await FetchCapturesAsync(stoppingToken);
            }
        };
        _logger.LogInformation("Now wait");
        while (!stoppingToken.IsCancellationRequested)
        {
            foreach (var capture in _historyCaptures)
            {
                _logger.LogInformation("BackupState");
                WallPaperHelper.BackupState();
                _logger.LogInformation("SilentSet");
                WallPaperHelper.SilentSet(capture.AbsolutePath!, WallpaperStyle.Fill);
                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }
        }
    }
}  