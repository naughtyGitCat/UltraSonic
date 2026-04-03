# UltraSonic

UltraSonic 是一组围绕照片管理的工具：扫描本地照片与 RAW、解析 EXIF/QuickTime 元数据、从 iOS/Android 设备导入到本地归档目录、记录 MD5 指纹以去重，并可将当天或最近拍摄的照片设置为 Windows 桌面壁纸。

## 特性
- 本地扫描与解析：遍历指定盘符下的图片与常见 RAW 格式，解析 EXIF 信息与拍摄时间
- iOS 导入：通过 Usbmux + Lockdown + AFC 访问 `DCIM`，支持 Apple Live Photo 的 `.mov` 元数据解析
- 分布式集群同步 (Multi-Master Sync)：支持配置多个中控节点，通过应用层 P2P (Gossip) 异步广播同步数据，实现高可用最终一致性
- 去重记录：以 SQLite 记录文件路径、大小、MD5、拍摄时间、设备信息，支持去重判断与快速查询
- 自动壁纸：每日或指定范围内的照片轮换设置为 Windows 桌面壁纸（可选）
- Web API：提供基础查询接口与 Swagger 文档（开发模式）

## 环境要求
- 操作系统：Windows 7 及以上
- 运行时：.NET 8 SDK/Runtime

## 快速开始

本项目现在包含后端（数据同步与 API 服务）和前端（基于 React95 构建的复古相册展示）两部分。请分别在两个终端中运行它们：

**1. 启动后端服务 (.NET 8):**
```pwsh
git clone https://github.com/naughtyGitCat/UltraSonic
cd src/LrWallPaper
dotnet run
```
首次运行会在项目根目录创建内置 SQLite 数据库文件 `ultrasonic.db`（用于保存文件指纹）。开发模式下自动启用 Swagger UI。

**2. 启动前端画廊 (React + Vite):**
```pwsh
cd src/LrWallPaper.React
npm install
npm run dev
```
启动后按照控制台提示打开浏览器（如 `http://localhost:5173`），即可体验 Win95 风格的本地照片展示页面。

## 配置与路径
- 默认扫描源与归档路径使用了硬编码的 Windows 盘符：
  - 本地扫描根目录：`D:\`（本地历史照片检索）
  - iOS 临时拉取目录：`F:\`，归档目录：`D:\Photograph\年\yyyy-MM-dd`
  - Lightroom 数据库路径：`D:\…\Lightroom\Lightroom Catalog-v11.lrcat`
- 若你的环境盘符不同，建议修改以下位置以适配：
  - 本地扫描目录：`src/LrWallPaper/Services/CaptureRawRepository.cs`
  - iOS 导入路径：`src/LrWallPaper/Jobs/SyncAppleJob.cs`
  - Lightroom DB 连接串：`src/LrWallPaper/Services/SQLiteFactory.cs`
  - 常量路径：`src/LrWallPaper/Common/Constants.cs`

后续版本将把上述路径迁移至 `appsettings.json` 统一配置。

## 后台任务
应用启动时按需注册以下后台任务（可在 `Program.cs` 打开/关闭）：
- iOS 导入：`SyncAppleJob`（默认启用）
- MD5 指纹：`PictureMD5Job`（默认启用）
- 壁纸轮换：`BusinessJob`（当前注释，按需启用）
- 可移动设备枚举：`SyncRemovableJob`（当前注释，Android 导入功能进行中）

## Web API
- `GET /api/Experiment/{days}`：返回近 `days` 天内扫描到的本地照片信息
- `GET /api/Device`：占位接口，用于设备信息查询（目前返回 `ok`）

开发模式下可通过 Swagger UI 试用接口。

## 数据存储
- 内置库：`ultrasonic.db`
- 表结构：`file_info`（唯一键覆盖 `fullpath` 与 `filename+file_md5`），字段包含路径、文件名、大小、MD5、拍摄时间、设备与镜头信息、创建/更新时间

## 设备支持
- iOS：已实现。需在设备上选择“信任此电脑”，并保持数据线连接以访问 `DCIM`
- Android：基础枚举已接入（MTP 设备），导入逻辑完善中

## 常见问题
- iOS 连接报错 `FatalPairingException`：请在手机上信任电脑并重试；若仍失败，检查数据线与驱动
- 访问云盘文件时报错 `Access to the cloud file is denied`：本工具会跳过无法访问的云文件，请确保相关文件已本地可用
- 壁纸设置无效：请确认 Windows 版本与注册表权限；本功能仅在 Windows 环境生效

## 参考
- EXIF 基础资料：https://www.media.mit.edu/pia/Research/deepview/exif.html
- 元数据解析库（.NET）：https://github.com/drewnoakes/metadata-extractor-dotnet

---

# UltraSonic (English)

UltraSonic is a set of photo management tools: it scans local photos and RAW files, parses EXIF/QuickTime metadata, imports from iOS/Android devices into local archive folders, records MD5 fingerprints for de-duplication, and can set today’s or recent photos as the Windows desktop wallpaper.

## Features
- Local scan and parsing: traverse specified drives for images and common RAW formats; parse EXIF and capture time
- iOS import: access `DCIM` via Usbmux + Lockdown + AFC; supports Apple Live Photo `.mov` metadata parsing
- Multi-Master Cluster Sync: configure multiple central nodes; uses application-layer P2P (Gossip) asynchronous broadcasting to replicate data for high-availability eventual consistency
- De-dup with records: store path, size, MD5, capture time, device info in SQLite for quick checks and queries
- Auto wallpaper: rotate desktop wallpaper with daily or recent captures (optional)
- Web API: basic query endpoints with Swagger in development mode

## Requirements
- OS: Windows 7 or later
- Runtime: .NET 8 SDK/Runtime

## Quick Start

This project consists of a backend data/API service and a retro-style frontend gallery built with React95. Please run them in two separate terminal windows:

**1. Start the Backend Service (.NET 8):**
```pwsh
git clone https://github.com/naughtyGitCat/UltraSonic
cd src/LrWallPaper
dotnet run
```
On first run, an internal SQLite database `ultrasonic.db` will be created at the project root for file fingerprints. Swagger UI is active in development.

**2. Start the Frontend Gallery (React + Vite):**
```pwsh
cd src/LrWallPaper.React
npm install
npm run dev
```
Once started, open the provided URL in your browser (e.g., `http://localhost:5173`) to view your local photo gallery in a classic Windows 95 aesthetic.

## Configuration & Paths
- The default sources and archive paths currently use hard-coded Windows drive letters:
  - Local scan root: `D:\` (local history photo discovery)
  - iOS temp pull: `F:\`; archive to `D:\Photograph\Year\yyyy-MM-dd`
  - Lightroom catalog: `D:\…\Lightroom\Lightroom Catalog-v11.lrcat`
- If your environment differs, update these locations:
  - Local scan directory: `src/LrWallPaper/Services/CaptureRawRepository.cs`
  - iOS import paths: `src/LrWallPaper/Jobs/SyncAppleJob.cs`
  - Lightroom DB connection: `src/LrWallPaper/Services/SQLiteFactory.cs`
  - Constant paths: `src/LrWallPaper/Common/Constants.cs`

These paths will be migrated to `appsettings.json` in future versions.

## Background Jobs
Enabled/disabled via `Program.cs`:
- iOS import: `SyncAppleJob` (enabled by default)
- MD5 fingerprints: `PictureMD5Job` (enabled by default)
- Wallpaper rotation: `BusinessJob` (currently commented, enable as needed)
- Removable devices enumeration: `SyncRemovableJob` (currently commented; Android import in progress)

## Web API
- `GET /api/Experiment/{days}`: returns local photo entries captured within the last `days`
- `GET /api/Device`: placeholder device endpoint (currently returns `ok`)

Use Swagger UI in development to try the endpoints.

## Data Storage
- Internal DB: `ultrasonic.db`
- Schema: `file_info` (unique keys on `fullpath` and `filename+file_md5`), fields include path, name, size, MD5, capture time, device/lens info, create/update timestamps

## Device Support
- iOS: implemented. You must trust the computer on the device and keep the cable connected to access `DCIM`
- Android: basic MTP device enumeration available; import logic is being improved

## FAQ
- `FatalPairingException` when connecting to iOS: trust the computer on the device and retry; check cable and drivers if it persists
- `Access to the cloud file is denied`: the tool skips inaccessible cloud files; ensure they are locally available
- Wallpaper not applied: verify Windows version and registry permissions; this feature is Windows-only

## References
- EXIF: https://www.media.mit.edu/pia/Research/deepview/exif.html
- Metadata extractor (.NET): https://github.com/drewnoakes/metadata-extractor-dotnet
