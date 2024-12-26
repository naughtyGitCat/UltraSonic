
using MetadataExtractor.Formats.FileSystem;
using MetadataExtractor.Formats.FileType;
using MetadataExtractor.Formats.QuickTime;

using System.Globalization;
using System.Text.RegularExpressions;

namespace LrWallPaper.Helpers
{
    public record GPSLocation
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
    }
    public record EXIFDigest
    {
        public DateTime? PhotoDateTime { get; set; }
        public string? CameraMaker { get; set; }

        public string? CameraModel { get; set; }

        public string? LensModel { get; set; }

        public long? FileSize { get; set; }

        public GPSLocation? GPS { get; set; }

    }
    public static class AppleLivePhotoHelper
    {
        public static EXIFDigest GetLiveQuickTimeInfo(string file)
        {
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            var quicktimeMetaDirectory = directories.OfType<QuickTimeMetadataHeaderDirectory>().First();
            var quicktimeTrackDirectory = directories.OfType<QuickTimeTrackHeaderDirectory>().First();
            var fileDirectory = directories.OfType<FileMetadataDirectory>().First();

            var d = new EXIFDigest
            {
                CameraMaker = quicktimeMetaDirectory.GetDescription(QuickTimeMetadataHeaderDirectory.TagMake),
                CameraModel = quicktimeMetaDirectory.GetDescription(QuickTimeMetadataHeaderDirectory.TagModel),
                PhotoDateTime = GetPhotoTime(quicktimeMetaDirectory, quicktimeTrackDirectory, fileDirectory),
                LensModel = null,
                FileSize = GetPhotoFileSize(fileDirectory),
                GPS = GetGPSLocation(quicktimeMetaDirectory),
            };

            return d;
        }

        private static DateTime GetPhotoTime(QuickTimeMetadataHeaderDirectory quickTimeMetadataHeaderDirectory, QuickTimeTrackHeaderDirectory quickTimeTrackHeaderDirectory, FileMetadataDirectory fileMetadataDirectory)
        {
            var qtMetaCreateDateStr = quickTimeMetadataHeaderDirectory.GetDescription(QuickTimeMetadataHeaderDirectory.TagCreationDate);
            var qtTrackCreateDateStr = quickTimeTrackHeaderDirectory.GetDescription(QuickTimeTrackHeaderDirectory.TagCreated);
            var fileModifiledDateStr = fileMetadataDirectory.GetDescription(FileMetadataDirectory.TagFileModifiedDate);
            if (!string.IsNullOrEmpty(qtMetaCreateDateStr))
            {
                return DateTime.ParseExact(qtMetaCreateDateStr, "ddd MMM dd HH:mm:ss zzz yyyy", CultureInfo.CurrentCulture);
            }  
            if (!string.IsNullOrEmpty(qtTrackCreateDateStr))
            {
                return DateTime.ParseExact(qtTrackCreateDateStr, "ddd MMM dd HH:mm:ss yyyy", CultureInfo.CurrentCulture).ToLocalTime();
            }
            else
            {
                // file system meta always have modified date info
                return DateTime.ParseExact(fileModifiledDateStr!, "ddd MMM dd HH:mm:ss zzz yyyy", CultureInfo.CurrentCulture);
            }
        }

        private static long? GetPhotoFileSize(FileMetadataDirectory fileMetaDataDirectory)
        {
            // File - File Size = 8768492 bytes
            var raw = fileMetaDataDirectory.GetDescription(FileMetadataDirectory.TagFileSize);
            return long.Parse(raw!.Split(" ").First());
        }

        /// <summary>
        /// GetGPSLocation 
        /// ref https://en.wikipedia.org/wiki/ISO_6709
        /// ref https://stackoverflow.com/questions/9742707/getting-gps-coordinates-of-a-video-in-camera-roll-on-iphone
        /// </summary>
        /// <returns></returns>
        private static GPSLocation? GetGPSLocation(QuickTimeMetadataHeaderDirectory quicktimeMetaDataHeaderDirectory)
        {
            // QuickTime Metadata Header - GPS Location = +32.4720-084.9952+073.827/
            try
            {
                var raw = quicktimeMetaDataHeaderDirectory.GetDescription(QuickTimeMetadataHeaderDirectory.TagGpsLocation);

                if (string.IsNullOrEmpty(raw)) return null;

                const string pattern = @"[\+|\-]\d+(\.\d+)";
                var matches = Regex.Matches(raw!, pattern);
                var latitude = double.Parse(matches[0].Value);
                var longtitude = double.Parse(matches[1].Value);
                var altitude = double.Parse(matches[2].Value);
                return new GPSLocation { Latitude = latitude, Longitude = longtitude, Altitude = altitude };
            }
            catch (Exception)
            {

                return null;
            }
        }
    } 

    public static class EXIFHelper
    {
        public static EXIFDigest GetEXIFInfoExplict(string file)
        {
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            var exifSubDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            var fileDirectories = directories.Where(i => i.Name == "File");

            if (exifMainDirectories is null || !exifMainDirectories.Any()) throw new Exception($"{file} has no Exif IFD0 Info");
            if (exifSubDirectories is null || !exifSubDirectories.Any()) throw new Exception($"{file} has no Exif SubIFD Info");
            if (fileDirectories is null || !fileDirectories.Any()) throw new Exception($"{file} has no Exif File Info");
            var d = new EXIFDigest
            {
                CameraMaker = GetCameraMaker(exifMainDirectories!.First()),
                CameraModel = GetCameraMode(exifMainDirectories!.First()),
                PhotoDateTime = GetPhotoDateTime(exifMainDirectories!.First()),
                LensModel = GetPhotoLensModel(exifSubDirectories!.First()),
                FileSize = GetPhotoFileSize(fileDirectories!.First())
            };

            return d;
        }

        public static EXIFDigest GetEXIFInfo(string file)
        {
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            var exifSubDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            var fileDirectories = directories.Where(i => i.Name == "File");

            var d = new EXIFDigest
            {
                CameraMaker = exifMainDirectories.Any() ? GetCameraMaker(exifMainDirectories!.First()) : null,
                CameraModel = exifMainDirectories.Any() ? GetCameraMode(exifMainDirectories!.First()) : null,
                PhotoDateTime = exifMainDirectories.Any() ? GetPhotoDateTime(exifMainDirectories!.First()) : null,
                LensModel = exifSubDirectories.Any() ? GetPhotoLensModel(exifSubDirectories!.First()) : null,
                FileSize = fileDirectories.Any() ? GetPhotoFileSize(fileDirectories!.First()) : null
            };

            return d;
        }

        private static string? GetCameraMaker(MetadataExtractor.Directory exifIFD0)
        {
            var rawTags = exifIFD0.Tags.Where(t => t.Name == "Make").ToArray();
            if (rawTags.Any())
            {
                return rawTags[0].Description;
            }
            else
            {
                return null;
            }
        }

        private static string? GetCameraMode(MetadataExtractor.Directory exifIFD0)
        {
            var rawTags = exifIFD0.Tags.Where(t => t.Name == "Model").ToArray();
            if (rawTags.Any())
            {
                return rawTags[0].Description;
            }
            else
            {
                return null;
            }
        }

        private static DateTime? GetPhotoDateTime(MetadataExtractor.Directory exifIFD0)
        {
            var rawTags = exifIFD0.Tags.Where(t => t.Name == "Date/Time").ToArray();
            if (rawTags.Any())
            {
                if (string.IsNullOrEmpty(rawTags[0].Description)) return null;
                return DateTime.ParseExact(rawTags[0].Description!, "yyyy:MM:dd HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
            }
            else
            {
                return null;
            }
        }

        private static string? GetPhotoLensModel(MetadataExtractor.Directory exifSubIFD)
        {
            var rawTags = exifSubIFD.Tags.Where(t => t.Name == "Lens Model").ToArray();
            if (rawTags.Any())
            {
                return rawTags[0].Description;
            }
            else
            {
                return null;
            }
        }

        private static long? GetPhotoFileSize(MetadataExtractor.Directory file)
        {
            // File - File Size = 8768492 bytes
            var rawTags = file.Tags.Where(t => t.Name == "File Size").ToArray();
            if (rawTags.Any())
            {
                return long.Parse(rawTags[0].Description!.Split(" ").First());
            }
            else
            {
                return null;
            }
        }

    }

    public static class FileTypeHelper
    {
        public static string GetFileType(string file) 
        { 
            throw new NotImplementedException();
        }
    }
 }

