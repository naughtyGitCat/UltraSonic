using System.Text.RegularExpressions;
using LrWallPaper.Services;

namespace LrWallPaper.Jobs;

public class FileRenameJob : BackgroundService
{
    private readonly ILogger<FileRenameJob> _logger;
    private readonly FileMD5Manager _md5Manager;

    // Matches: IMG_001(1).JPG, IMG_001(2).HEIC, IMG_001 (1).JPG, IMG_001_1.JPG, IMG_001_2.CR2
    private static readonly Regex DuplicateSuffixRegex = new(
        @"^(.+?)\s?[\(_](\d{1,2})\)?(\.\w+)$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    public FileRenameJob(ILogger<FileRenameJob> logger, FileMD5Manager md5Manager)
    {
        _logger = logger;
        _md5Manager = md5Manager;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await ProcessRenames(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "FileRenameJob encountered an error");
            }

            await Task.Delay(TimeSpan.FromHours(4), stoppingToken);
        }
    }

    private async Task ProcessRenames(CancellationToken ct)
    {
        var candidates = await _md5Manager.GetFilesWithDuplicateSuffix();
        _logger.LogInformation("FileRenameJob: found {Count} files with duplicate suffixes", candidates.Count);

        foreach (var file in candidates)
        {
            if (ct.IsCancellationRequested) break;

            // Only handle local files (Agent files need Agent API)
            if (!string.IsNullOrEmpty(file.AgentId) && file.AgentId != "local")
                continue;

            var match = DuplicateSuffixRegex.Match(file.FileName);
            if (!match.Success) continue;

            var baseName = match.Groups[1].Value;
            var ext = match.Groups[3].Value;
            var targetName = baseName + ext;

            try
            {
                await TryRename(file, targetName, baseName, ext);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to rename {File}", file.FileFullPath);
            }
        }
    }

    private async Task TryRename(FileMD5Entity file, string targetName, string baseName, string ext)
    {
        var sourcePath = file.FileFullPath;
        if (!File.Exists(sourcePath))
        {
            _logger.LogWarning("Source file not found, skipping: {Path}", sourcePath);
            return;
        }

        var targetPath = Path.Combine(file.FilePath, targetName);

        // Case 1: target does not exist on disk and not in DB
        if (!File.Exists(targetPath))
        {
            var dbRecord = await _md5Manager.FindByFullPathAsync(targetPath);
            if (dbRecord == null)
            {
                File.Move(sourcePath, targetPath);
                await _md5Manager.RenameFileAsync(file.Id, file.FilePath, targetName);
                _logger.LogInformation("Renamed: {Old} -> {New}", file.FileName, targetName);
                return;
            }
        }

        // Target exists on disk or in DB - check if it's the same file
        if (File.Exists(targetPath))
        {
            var targetMd5 = Helpers.FileHelper.GetMD5(targetPath);

            // Case 2: same MD5 = duplicate, delete the suffixed copy
            if (targetMd5 == file.FileMD5)
            {
                File.Delete(sourcePath);
                await _md5Manager.DeleteByIdAsync(file.Id);
                _logger.LogInformation("Deleted duplicate: {File} (same as {Target})", file.FileName, targetName);
                return;
            }

            // Case 3: different MD5, disambiguate with year
            var year = file.CaptureTime.ToString("yyyy");
            var yearName = $"{baseName}_{year}{ext}";
            var yearPath = Path.Combine(file.FilePath, yearName);

            if (!File.Exists(yearPath))
            {
                File.Move(sourcePath, yearPath);
                await _md5Manager.RenameFileAsync(file.Id, file.FilePath, yearName);
                _logger.LogInformation("Renamed with year: {Old} -> {New}", file.FileName, yearName);
                return;
            }

            // Year also conflicts, try year+month
            var yearMonth = file.CaptureTime.ToString("yyyyMM");
            var yearMonthName = $"{baseName}_{yearMonth}{ext}";
            var yearMonthPath = Path.Combine(file.FilePath, yearMonthName);

            if (!File.Exists(yearMonthPath))
            {
                File.Move(sourcePath, yearMonthPath);
                await _md5Manager.RenameFileAsync(file.Id, file.FilePath, yearMonthName);
                _logger.LogInformation("Renamed with year-month: {Old} -> {New}", file.FileName, yearMonthName);
                return;
            }

            _logger.LogWarning("Cannot resolve rename conflict for {File}, skipping", file.FileName);
        }
    }
}
