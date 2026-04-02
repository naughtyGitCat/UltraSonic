
using LrWallPaper.Common;
using LrWallPaper.Helpers;
using LrWallPaper.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LrWallPaper.Jobs
{
    public class SyncGenericDeviceJob : BackgroundService
    {
        private readonly ILogger<SyncGenericDeviceJob> _logger;
        private readonly FileMD5Manager _fileRecordManager;

        // Hardcoded archive path as per existing project convention (SyncAppleJob)
        private const string ArchiveRoot = @"D:\Photograph";

        public SyncGenericDeviceJob(FileMD5Manager fileMD5Manager, ILogger<SyncGenericDeviceJob> logger)
        {
            _logger = logger;
            _fileRecordManager = fileMD5Manager;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Starting generic device scan...");
                    await ImportFromGenericDevicesAsync();
                    _logger.LogInformation("Generic device scan completed.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred during generic device sync");
                }
                await Task.Delay(new TimeSpan(0, 5, 8), stoppingToken);
            }
        }

        private async Task ImportFromGenericDevicesAsync()
        {
            var drives = DriveInfo.GetDrives()
                .Where(d => d.IsReady && (d.DriveType == DriveType.Removable || d.DriveType == DriveType.Fixed))
                .ToList();

            foreach (var drive in drives)
            {
                // Re-check IsReady before accessing since the drive might have been disconnected after the initial GetDrives() call
                if (!drive.IsReady)
                {
                    continue;
                }

                // Skip system and data drives
                if (drive.Name.StartsWith("C:", StringComparison.OrdinalIgnoreCase) ||
                    drive.Name.StartsWith("D:", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                var dcimPath = Path.Combine(drive.Name, "DCIM");
                if (Directory.Exists(dcimPath))
                {
                    _logger.LogInformation("Found generic device with DCIM folder at: {Path}", dcimPath);
                    await ProcessDirectoryAsync(dcimPath);
                }
            }
        }

        private async Task ProcessDirectoryAsync(string directoryPath)
        {
            try
            {
                var files = Directory.GetFiles(directoryPath);
                foreach (var file in files)
                {
                    await ProcessFileAsync(file);
                }

                var subDirectories = Directory.GetDirectories(directoryPath);
                foreach (var dir in subDirectories)
                {
                    await ProcessDirectoryAsync(dir);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to process directory: {Dir}", directoryPath);
            }
        }

        private async Task ProcessFileAsync(string sourceFile)
        {
            var extension = Path.GetExtension(sourceFile).ToLower();
            var fileName = Path.GetFileName(sourceFile);

            // Filter unwanted files
            if (extension == ".lrf" || extension == ".aae" || fileName.StartsWith("."))
            {
                return;
            }

            // Check if it is a supported image/video format
            if (!ImageSuffixes.PossibleSuffixes.Contains(extension))
            {
                return;
            }

            try
            {
                var md5 = FileHelper.GetMD5(sourceFile);
                var existingRecords = await _fileRecordManager.GetFileMD5EntityAsync(fileName);

                // Check for duplicates
                if (existingRecords.Any(r => r.FileMD5 == md5))
                {
                    _logger.LogDebug("File {File} already exists in archive (MD5 match). Skipping.", sourceFile);
                    return;
                }
                
                // Get Metadata
                DateTime captureTime;
                string cameraMaker = "Unknown";
                string cameraModel = "Unknown";
                string lensModel = "Unknown";
                long fileSize = 0;

                try
                {
                    fileSize = new FileInfo(sourceFile).Length;
                    
                    var exif = extension == ".mov" 
                        ? AppleLivePhotoHelper.GetLiveQuickTimeInfo(sourceFile) 
                        : EXIFHelper.GetEXIFInfo(sourceFile);

                    captureTime = exif.PhotoDateTime ?? File.GetCreationTime(sourceFile);
                    cameraMaker = exif.CameraMaker ?? "Unknown";
                    cameraModel = exif.CameraModel ?? "Unknown";
                    lensModel = exif.LensModel ?? "";
                    
                    if (exif.FileSize.HasValue && exif.FileSize.Value > 0)
                        fileSize = exif.FileSize.Value;
                }
                catch
                {
                    captureTime = File.GetCreationTime(sourceFile);
                }

                if (captureTime == DateTime.MinValue) captureTime = DateTime.Now;

                var targetDir = Path.Combine(ArchiveRoot, captureTime.Year.ToString(), captureTime.ToString("yyyy-MM-dd"));
                var targetFile = Path.Combine(targetDir, fileName);

                // Handle filename collision
                if (File.Exists(targetFile))
                {
                     var targetFileMD5 = FileHelper.GetMD5(targetFile);
                     if (targetFileMD5 == md5)
                     {
                         _logger.LogDebug("Target file {Target} exists and matches source MD5. Skipping.", targetFile);
                         return;
                     }
                     else
                     {
                         var nameWithoutExt = Path.GetFileNameWithoutExtension(fileName);
                         var newName = $"{nameWithoutExt}_{DateTime.Now.Ticks}{extension}";
                         targetFile = Path.Combine(targetDir, newName);
                     }
                }

                _logger.LogInformation("Importing {Source} to {Target}", sourceFile, targetFile);
                Directory.CreateDirectory(targetDir);
                File.Copy(sourceFile, targetFile, overwrite: false); 

                await _fileRecordManager.SaveFileMD5Async(new FileMD5Entity
                {
                    FilePath = targetDir,
                    FileName = Path.GetFileName(targetFile),
                    CameraMaker = cameraMaker,
                    CameraModel = cameraModel,
                    LensModel = lensModel,
                    FileSize = fileSize,
                    FileMD5 = md5,
                    CaptureTime = captureTime
                }); 
            }
            catch (Exception ex)
            {
                if (ex is DirectoryNotFoundException || ex is IOException || !File.Exists(sourceFile))
                {
                    _logger.LogWarning("File or device became unavailable during process (disconnected?): {File}", sourceFile);
                }
                else
                {
                    _logger.LogError(ex, "Failed to process file: {File}", sourceFile);
                }
            }
        }
    }
}
