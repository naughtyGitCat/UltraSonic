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
            {"UltraSonic:LocalScan:RootDirectories:0", "D:\\"},
            {"UltraSonic:LocalScan:SkipDirectories:0", "D:\\Skip"},
            {"UltraSonic:AppleImport:TempDirectory", "F:\\"},
            {"UltraSonic:AppleImport:ArchiveDirectory", "D:\\Photograph"},
            {"UltraSonic:Lightroom:CatalogPath", "D:\\Lightroom.lrcat"},
            {"UltraSonic:ArchivePaths:Current", "D:/Current"},
            {"UltraSonic:ArchivePaths:History", "X:/History"}
        };

        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(myConfiguration!)
            .Build();

        var config = configuration.GetSection("UltraSonic").Get<UltraSonicConfig>();

        Assert.NotNull(config);
        Assert.Single(config.LocalScan.RootDirectories);
        Assert.Equal("D:\\", config.LocalScan.RootDirectories[0]);
        Assert.Equal("F:\\", config.AppleImport.TempDirectory);
        Assert.Equal("D:\\Lightroom.lrcat", config.Lightroom.CatalogPath);
    }
}
