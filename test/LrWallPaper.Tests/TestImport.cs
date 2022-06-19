using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Xunit;
using Xunit.Abstractions;
using Moq;
using LrWallPaper.Services;
using LrWallPaper.Helpers;
using Newtonsoft.Json;
using System.IO;
using MediaDevices;

namespace LrWallPaper.Tests
{
    public class XunitLogger<T> : ILogger<T>, IDisposable
    {
        private ITestOutputHelper _output;

        public XunitLogger(ITestOutputHelper output)
        {
            _output = output;
        }
        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            _output.WriteLine(state.ToString());
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return this;
        }

        public void Dispose()
        {
        }
    }
    public class TestImport
    {
        private readonly ITestOutputHelper _testOutputHelper;
        public TestImport(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }
        public void TestImport5Redmi()
        {
            throw new NotImplementedException();
        }
        [Fact]
        public void TestPicSort()
        {
            var pictureSorter = new PictureSorter(new XunitLogger<PictureSorter>(_testOutputHelper));
            var exampleOriginDir = System.IO.Directory.CreateDirectory("Asserts");
            var exampleMirrorDir = System.IO.Directory.CreateDirectory("AssertsCopy");
            DirectoryHelper.CopyDirectory(exampleOriginDir.FullName, exampleMirrorDir.FullName, recursively: false);
            var exampleTargetDir = System.IO.Directory.CreateDirectory("TestPictureSort");


            var duplicatedFiles = pictureSorter.Sort(exampleMirrorDir.FullName, exampleTargetDir.FullName, recursively: true, strategy: DuplicateStrategy.Overwrite);
            // _testOutputHelper.WriteLine($"duplicated files: {JsonConvert.SerializeObject(duplicatedFiles, Formatting.Indented)}");
        }

        [Fact]
        public void TestGetAllDrives()
        {
            foreach (var drive in DriveInfo.GetDrives())
            {
                _testOutputHelper.WriteLine($"drive.Name, {drive.Name}");
                _testOutputHelper.WriteLine($"drive.VolumeLabel, {drive.VolumeLabel}");
                _testOutputHelper.WriteLine($"drive.DriveFormat, {drive.DriveFormat}");

                _testOutputHelper.WriteLine("Drive Type: {0}", drive.DriveType);
                _testOutputHelper.WriteLine("Drive Size: {0}", drive.TotalSize);
                _testOutputHelper.WriteLine("Drive Free Space: {0}", drive.TotalFreeSpace);
            }
        }

        [Fact]
        public void TestGetLogicalDrives()
        {
            foreach (var drive in Environment.GetLogicalDrives())
            {
                // _testOutputHelper.WriteLine($"LOGICAL DRIVE: {drive}");

            }
        }

        [Fact]
        public void TestGetMediaDevices()
        {
            var devices = MediaDevice.GetDevices();
            foreach (var device in devices)
            {
                _testOutputHelper.WriteLine($"device.DeviceId, {device.DeviceId}");
                // _testOutputHelper.WriteLine($"device.SerialNumber, {device.SerialNumber}");
                _testOutputHelper.WriteLine($"device.FriendlyName, {device.FriendlyName}");
                // _testOutputHelper.WriteLine($"device.Model, {device.Model}");
                // _testOutputHelper.WriteLine($"device.ModelUniqueId, {device.ModelUniqueId}");
                // _testOutputHelper.WriteLine($"device.DateTime, {device.DateTime}");
                _testOutputHelper.WriteLine($"device.Description, {device.Description}");
                _testOutputHelper.WriteLine($"device.Manufacturer, {device.Manufacturer}");
                // _testOutputHelper.WriteLine($"device.FirmwareVersion, {device.FirmwareVersion}");
                // _testOutputHelper.WriteLine($"device.PowerLevel, {device.PowerLevel}");
                // _testOutputHelper.WriteLine($"device.PowerSource, {device.PowerSource}");
                // _testOutputHelper.WriteLine($"device.PnPDeviceID, {device.PnPDeviceID}");
                _testOutputHelper.WriteLine($"device.IsConnected, {device.IsConnected}");
                // _testOutputHelper.WriteLine($"device.Protocol, {device.Protocol}");
                // _testOutputHelper.WriteLine($"device.SyncPartner, {device.SyncPartner}");
            }
        }
    }
}
