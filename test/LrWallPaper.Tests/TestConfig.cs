using LrWallPaper.Models;
using Microsoft.Extensions.Configuration;
using Xunit;
using System.Collections.Generic;

namespace LrWallPaper.Tests;

public class TestConfig
{
    [Fact]
    public void TestConfigBinding()
    {
        var myConfiguration = new Dictionary<string, string>
        {
            {"UltraSonic:LocalScan:RootDirectories:0", "C:\\Photos"},
            {"UltraSonic:LocalScan:SkipDirectories:0", "C:\\Photos\\Skip"},
            {"UltraSonic:AppleImport:TempDirectory", "C:\\Temp"},
            {"UltraSonic:AppleImport:ArchiveDirectory", "C:\\Photos\\Archive"},
            {"UltraSonic:Lightroom:CatalogPath", "C:\\Lightroom\\Catalog.lrcat"},
            {"UltraSonic:ArchivePaths:Current", "C:/Photos/Current"},
            {"UltraSonic:ArchivePaths:History", "C:/Photos/History"}
        };

        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(myConfiguration!)
            .Build();

        var config = configuration.GetSection("UltraSonic").Get<UltraSonicConfig>();

        Assert.NotNull(config);
        Assert.Single(config.LocalScan.RootDirectories);
        Assert.Equal("C:\\Photos", config.LocalScan.RootDirectories[0]);
        Assert.Equal("C:\\Temp", config.AppleImport.TempDirectory);
        Assert.Equal("C:\\Lightroom\\Catalog.lrcat", config.Lightroom.CatalogPath);
    }
}
