
namespace LrWallPaper.Helpers
{
    public record EXIFDigest
    {
        public DateTime? PhotoDateTime { get; set; }
        public string? CameraMaker { get; set; }
        
        public string? CameraModel { get; set; }

        public string? LensModel { get; set; }

        public long? FileSize { get; set; }

    }
    public static class AppleLivePhotoHelper
    {
        public static EXIFDigest GetLiveQuickTimeInfo(string file)
        {
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            var quicktimeMetaDirectories = directories.Where(i => i.Name == "QuickTime Metadata Header");
            var fileTypeDirectories = directories.Where(i => i.Name == "File Type");
            var fileDirectories = directories.Where(i => i.Name == "File");
            var d = new EXIFDigest
            {
                CameraMaker = GetCameraMaker(quicktimeMetaDirectories!.First()),
                CameraModel = GetCameraMode(quicktimeMetaDirectories!.First()),
                PhotoDateTime = GetPhotoDateTime(quicktimeMetaDirectories!.First()),
                LensModel = null,
                FileSize = GetPhotoFileSize(fileDirectories!.First())
            };

            return d;
        }

        private static string? GetCameraMaker(MetadataExtractor.Directory quicktimeMeta)
        {
            var rawTags = quicktimeMeta.Tags.Where(t => t.Name == "Make").ToArray();
            if (rawTags.Any())
            {
                return rawTags[0].Description;
            }
            else
            {
                return null;
            }
        }

        private static string? GetCameraMode(MetadataExtractor.Directory quicktimeMeta)
        {
            var rawTags = quicktimeMeta.Tags.Where(t => t.Name == "Model").ToArray();
            if (rawTags.Any())
            {
                return rawTags[0].Description;
            }
            else
            {
                return null;
            }
        }

        private static DateTime? GetPhotoDateTime(MetadataExtractor.Directory quicktimeMeta)
        {
            var rawTags = exifIFD0.Tags.Where(t => t.Name == "Creation Date").ToArray();
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
    public static class EXIFHelper
    {
        public static EXIFDigest GetEXIFInfoExplict(string file)
        {
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            var exifSubDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            var fileDirectories = directories.Where(i => i.Name == "File");

            if (exifMainDirectories is null||!exifMainDirectories.Any()) throw new Exception($"{file} has no Exif IFD0 Info");
            if (exifSubDirectories is null||!exifSubDirectories.Any()) throw new Exception($"{file} has no Exif SubIFD Info");
            if (fileDirectories is null||!fileDirectories.Any()) throw new Exception($"{file} has no Exif File Info");
            var d = new EXIFDigest
            {
                CameraMaker =  GetCameraMaker(exifMainDirectories!.First()),
                CameraModel =  GetCameraMode(exifMainDirectories!.First()) ,
                PhotoDateTime =  GetPhotoDateTime(exifMainDirectories!.First()),
                LensModel =  GetPhotoLensModel(exifSubDirectories!.First()) ,
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
                CameraMaker = exifMainDirectories.Any()? GetCameraMaker(exifMainDirectories!.First()) : null,
                CameraModel= exifMainDirectories.Any() ? GetCameraMode(exifMainDirectories!.First()):null,
                PhotoDateTime = exifMainDirectories.Any()?GetPhotoDateTime(exifMainDirectories!.First()):null,
                LensModel = exifSubDirectories.Any()?GetPhotoLensModel(exifSubDirectories!.First()):null,
                FileSize = fileDirectories.Any()?GetPhotoFileSize(fileDirectories!.First()):null
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
}
