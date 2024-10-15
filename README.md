# UltraSonic
> Naming from the camera lens, means photo-related tools

## purposes
- find photos(jpeg, various raw files) in the Lightroom database, sync to this tool's internal database regularly
- import photos(include live photo `mov` file) from Apple devices to local computer drives, with EXIF and ios unique device ID information
- import photos from Android devices to local computer drives, with EXIF and IMEI information
- find today/nearly_time photos in the internal database, and set them as the wallpaper

## usage
> only windows 7+ platforms

> dotnet 8 runtime needed

```pwsh
git clone https://github.com/naughtyGitCat/UltraSonic
cd src/LrWallPaper
dotnet run
```

## refer
- [exif](https://www.media.mit.edu/pia/Research/deepview/exif.html)
- [metadata-extractor-dotnet](https://github.com/drewnoakes/metadata-extractor-dotnet)
