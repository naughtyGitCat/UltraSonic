using System;
using System.ComponentModel;
using System.Linq;

using XmpCore.Impl;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Xunit;
using Xunit.Abstractions;

using static LrWallPaper.Helpers.WallpaperHelper;

using static MetadataExtractor.Formats.Bmp.BmpHeaderDirectory;

using static System.Runtime.InteropServices.JavaScript.JSType;
namespace LrWallPaper.Tests
{
    public class TestEXIFInfo
    {
        private readonly ITestOutputHelper _logger;
        public TestEXIFInfo(ITestOutputHelper testOutputHelper)
        {
            _logger = testOutputHelper;
        }
        [Fact]
        public void TestIPhone6JPG()
        {
            var file = "Asserts/IMG_0002.IPhone.6.JPG";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);

            // IFD: image file directory
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Make" && t.Description == "Apple").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Model" && t.Description == "iPhone 6").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time" && t.Description == "2022:05:04 14:25:01").Any()));
            var exifExtendDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time Original" && t.Description == "2022:05:04 14:25:01").Any()));
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Make" && t.Description == "Apple").Any()));
            var gpsDirectories = directories.Where(i => i.Name == "GPS");
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Altitude Ref" && t.Description == "Sea level").Any()));
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Latitude Ref" && t.Description == "N").Any()));
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Longitude Ref" && t.Description == "E").Any()));
        }

        [Fact]
        public void TestMiJPG()
        {
            var file = "Asserts/IMG_20220503_223439.Redmi.Note8.Pro.jpg";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            // IFD: image file directory
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Make" && t.Description == "Xiaomi").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Model" && t.Description == "Redmi Note 8 Pro").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time" && t.Description == "2022:05:03 22:34:39").Any()));
            var exifExtendDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time Original" && t.Description == "2022:05:03 22:34:39").Any()));
            // Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Make" && t.Description == "Apple").Any()));
            var gpsDirectories = directories.Where(i => i.Name == "GPS");
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Altitude Ref" && t.Description == "Sea level").Any()));
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Latitude Ref" && t.Description == "N").Any()));
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Longitude Ref" && t.Description == "E").Any()));
        }

        [Fact]
        public void TestCanonJPG()
        {
            var file = "Asserts/IMG_6119.Canon.R6.JPG";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);

            // IFD: image file directory
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Make" && t.Description == "Canon").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Model" && t.Description == "Canon EOS R6").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time" && t.Description == "2022:05:04 17:09:40").Any()));
            var exifExtendDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time Original" && t.Description == "2022:05:04 17:09:40").Any()));
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Model" && t.Description == "EF70-200mm f/2.8L USM").Any()));
            var canonMakernoteDirectories = directories.Where(i => i.Name == "Canon Makernote");
            Assert.NotEmpty(canonMakernoteDirectories.Where(i => i.Tags.Where(t => t.Name == "Record Mode" && t.Description == "CR3+JPEG").Any()));
            var gpsDirectories = directories.Where(i => i.Name == "GPS");
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Version ID").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Altitude Ref" && t.Description == "Sea level").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Latitude Ref" && t.Description == "N").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Longitude Ref" && t.Description == "E").Any()));
        }

        [Fact]
        public void TestCanonRaw2()
        {
            var file = "Asserts/IMG_9422.Canon.Rebel.SL1.CR2";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);

            // IFD: image file directory
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Make" && t.Description == "Canon").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Model" && t.Description == "Canon EOS REBEL SL1").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time" && t.Description == "2021:04:03 21:42:02").Any()));
            var exifExtendDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time Original" && t.Description == "2021:04:03 21:42:02").Any()));
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Model" && t.Description == "EF-S18-55mm f/3.5-5.6 IS STM").Any()));
            var canonMakernoteDirectories = directories.Where(i => i.Name == "Canon Makernote");
            Assert.NotEmpty(canonMakernoteDirectories.Where(i => i.Tags.Where(t => t.Name == "Record Mode" && t.Description == "CR2+JPEG").Any()));
            Assert.NotEmpty(canonMakernoteDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Type" && t.Description == "Canon EF-S 18-55mm f/3.5-5.6 IS STM").Any()));
            var gpsDirectories = directories.Where(i => i.Name == "GPS");
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Version ID").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Altitude Ref" && t.Description == "Sea level").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Latitude Ref" && t.Description == "N").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Longitude Ref" && t.Description == "E").Any()));
        }

        /// <summary>
        /// 初始化时间(内置电池用光,第一次开机等默认设置时间情况)
        /// </summary>
        [Fact]
        public void TestUndefinedCanonJPG()
        {
            var file = "Asserts/IMG_4262.Canon.Rebel.SL1.JPG";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);

            // foreach (var directory in directories)
            //   foreach (var tag in directory.Tags)
            //      _logger.WriteLine($"{directory.Name} - {tag.Name} = {tag.Description}");

            // IFD: image file directory
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Make" && t.Description == "Canon").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Model" && t.Description == "Canon EOS REBEL SL1").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time" && t.Description == "2000:12:31 19:00:12").Any()));
            var exifExtendDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time Original" && t.Description == "2000:12:31 19:00:12").Any()));
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Model" && t.Description == "EF50mm f/1.8 STM").Any()));
            var canonMakernoteDirectories = directories.Where(i => i.Name == "Canon Makernote");
            Assert.NotEmpty(canonMakernoteDirectories.Where(i => i.Tags.Where(t => t.Name == "Record Mode" && t.Description == "JPEG").Any()));
            Assert.NotEmpty(canonMakernoteDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Type" && t.Description == "Canon EF 50mm f/1.8 STM").Any()));
            var gpsDirectories = directories.Where(i => i.Name == "GPS");
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Version ID").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Altitude Ref" && t.Description == "Sea level").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Latitude Ref" && t.Description == "N").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Longitude Ref" && t.Description == "E").Any()));

            var fileDirectories = directories.Where(i => i.Name == "File");
            Assert.NotEmpty(fileDirectories.Where(i => i.Tags.Where(t => t.Name == "File Modified Date" && t.Description == "周六 1月 30 21:04:24 +08:00 2021").Any()));
        }

        [Fact]
        public void TestCanonRaw3()
        {
            var file = "Asserts/IMG_6119.Canon.R6.CR3";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            // foreach (var directory in directories)
            //    foreach (var tag in directory.Tags)
            //       _logger.WriteLine($"{directory.Name} - {tag.Name} = {tag.Description}");

            // IFD: image file directory
            var exifMainDirectories = directories.Where(i => i.Name == "Exif IFD0");
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Make" && t.Description == "Canon").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Model" && t.Description == "Canon EOS R6").Any()));
            Assert.NotEmpty(exifMainDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time" && t.Description == "2022:05:04 17:09:40").Any()));
            var exifExtendDirectories = directories.Where(i => i.Name == "Exif SubIFD");
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Date/Time Original" && t.Description == "2022:05:04 17:09:40").Any()));
            Assert.NotEmpty(exifExtendDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Model" && t.Description == "EF70-200mm f/2.8L USM").Any()));
            var canonMakernoteDirectories = directories.Where(i => i.Name == "Canon Makernote");
            Assert.NotEmpty(canonMakernoteDirectories.Where(i => i.Tags.Where(t => t.Name == "Record Mode" && t.Description == "CR3+JPEG").Any()));
            Assert.NotEmpty(canonMakernoteDirectories.Where(i => i.Tags.Where(t => t.Name == "Lens Type" && t.Description == "Canon EF 70-200mm f/2.8 L").Any()));
            var gpsDirectories = directories.Where(i => i.Name == "GPS");
            Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Version ID").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Altitude Ref" && t.Description == "Sea level").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Latitude Ref" && t.Description == "N").Any()));
            // Assert.NotEmpty(gpsDirectories.Where(i => i.Tags.Where(t => t.Name == "GPS Longitude Ref" && t.Description == "E").Any()));
        }
        [Fact]
        public void TestTwitterJPG()
        {
            var file = "Asserts/IMG_0008.Twitter.JPG";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            foreach (var directory in directories)
                foreach (var tag in directory.Tags)
                   _logger.WriteLine($"{directory.Name} - {tag.Name} = {tag.Description}");
            /*              JPEG - Compression Type = Progressive, Huffman
                            JPEG - Data Precision = 8 bits
                            JPEG - Image Height = 2048 pixels
                            JPEG - Image Width = 1365 pixels
                            JPEG - Number of Components = 3
                            JPEG - Component 1 = Y component: Quantization table 0, Sampling factors 2 horiz / 2 vert
                            JPEG - Component 2 = Cb component: Quantization table 1, Sampling factors 1 horiz / 1 vert
                            JPEG - Component 3 = Cr component: Quantization table 1, Sampling factors 1 horiz / 1 vert
                            JFIF - Version = 1.1
                            JFIF - Resolution Units = none
                            JFIF - X Resolution = 72 dots
                            JFIF - Y Resolution = 72 dots
                            JFIF - Thumbnail Width Pixels = 0
                            JFIF - Thumbnail Height Pixels = 0
                            Exif IFD0 -X Resolution = 72 dots per inch
                            Exif IFD0 - Y Resolution = 72 dots per inch
                            Exif IFD0 - Resolution Unit = Inch
                            Exif IFD0 -YCbCr Positioning = Center of pixel array
                            Exif SubIFD - Exif Version = 2.21
                            Exif SubIFD -Components Configuration = YCbCr
                            Exif SubIFD -FlashPix Version = 1.00
                            Exif SubIFD -Color Space = sRGB
                            Exif SubIFD -Exif Image Width = 1365 pixels
                            Exif SubIFD - Exif Image Height = 2048 pixels
                            Exif SubIFD - Scene Capture Type = Standard
                            Exif Thumbnail -Compression = JPEG(old - style)
                            Exif Thumbnail -X Resolution = 72 dots per inch
                            Exif Thumbnail - Y Resolution = 72 dots per inch
                            Exif Thumbnail - Resolution Unit = Inch
                            Exif Thumbnail -Thumbnail Offset = 280 bytes
                            Exif Thumbnail - Thumbnail Length = 13097 bytes
                            Huffman - Number of Tables = 2 Huffman tables
                            File Type -Detected File Type Name = JPEG
                            File Type -Detected File Type Long Name = Joint Photographic Experts Group
                            File Type - Detected MIME Type = image / jpeg
                            File Type -Expected File Name Extension = jpg
                            File - File Name = IMG_0008.Twitter.JPG
                            File - File Size = 914657 bytes
                            File - File Modified Date = 周二 8月 27 22:08:54 + 08:00 2024*/
        }

        [Fact]
        public void TestTwitterPNG()
        {
            var file = "Asserts/IMG_0147.Twitter.PNG";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            foreach (var directory in directories)
                foreach (var tag in directory.Tags)
                    _logger.WriteLine($"{directory.Name} - {tag.Name} = {tag.Description}");
            /*
            PNG-IHDR - Image Width = 1287
            PNG-IHDR - Image Height = 1800
            PNG-IHDR - Bits Per Sample = 8
            PNG-IHDR - Color Type = Indexed Color
            PNG-IHDR - Compression Type = Deflate
            PNG-IHDR - Filter Method = Adaptive
            PNG-IHDR - Interlace Method = No Interlace
            PNG-PLTE - Palette Size = 128
            File Type - Detected File Type Name = PNG
            File Type - Detected File Type Long Name = Portable Network Graphics
            File Type - Detected MIME Type = image/png
            File Type - Expected File Name Extension = png
            File - File Name = IMG_0147.Twitter.PNG
            File - File Size = 373805 bytes
            File - File Modified Date = 周二 8月 27 22:09:01 +08:00 2024
             */
        }

        [Fact]
        public void TestRecoveredJPG()
        {
            var file = "Asserts/[000016].Recovered.jpg";
            var directories = MetadataExtractor.ImageMetadataReader.ReadMetadata(file);
            foreach (var directory in directories)
                foreach (var tag in directory.Tags)
                   _logger.WriteLine($"{directory.Name} - {tag.Name} = {tag.Description}");
        }
    }
}