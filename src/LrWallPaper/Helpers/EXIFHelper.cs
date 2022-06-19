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
    public static class EXIFHelper
    {
        public static EXIFDigest GetEXIFInfo(string file)
        {
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            var exifSubDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            var fileDirectories = directories.Where(i => i.Name == "File");
            
            if (exifMainDirectories is null) throw new Exception($"{file} has no Exif IFD0 Info");
            if (exifSubDirectories is null) throw new Exception($"{file} has no Exif SubIFD Info");
            if (fileDirectories is null) throw new Exception($"{file} has no Exif File Info");
            var d = new EXIFDigest 
            {
                CameraMaker = GetCameraMaker(exifMainDirectories!.First()),
                CameraModel=GetCameraMode(exifMainDirectories!.First()),
                PhotoDateTime = GetPhotoDateTime(exifMainDirectories!.First()),
                LensModel = GetPhotoLensModel(exifMainDirectories!.First()),
                FileSize =GetPhotoFileSize(fileDirectories!.First())
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
                if (rawTags[0].Description is null) return null;
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
