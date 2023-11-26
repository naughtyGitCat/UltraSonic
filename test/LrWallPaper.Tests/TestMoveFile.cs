using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xunit;
using Xunit.Abstractions;

using LrWallPaper.Helpers;

namespace LrWallPaper.Tests
{
    public class TestMoveFile
    {
        private readonly ITestOutputHelper _testOutputHelper;
        public TestMoveFile(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void MoveFile()
        {
            const string path = @"D:\Photograph\TODO";
            var files = Directory.GetFiles(path, "*.MP4");
            foreach (var file in files)
            {
                _testOutputHelper.WriteLine($"{file}");
                try
                {
                    var exif = EXIFHelper.GetEXIFInfo(file);
                    var dirName = @$"{path}\{exif.PhotoDateTime:yyyy-MM-dd}";

                    if (!Directory.Exists(dirName))
                    {
                        Directory.CreateDirectory(dirName);
                    }
                    _testOutputHelper.WriteLine(@$"{dirName}\{Path.GetFileName(file)}");
                    File.Move(file, @$"{dirName}\{Path.GetFileName(file)}");
                }
                catch (MetadataExtractor.ImageProcessingException e)
                {
                    _testOutputHelper.WriteLine($"{file}\n {e}");
                }
            }
        }
    }
}
