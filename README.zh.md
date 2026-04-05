# UltraSonic

分布式本地照片 / RAW 管理平台。通过 **Master-Agent** 架构，在多台 Windows 机器上建立统一的元数据索引，支持 iOS 设备与可移动存储自动导入、GPS 提取、MD5 去重、服务端 RAW/HEIC 转换，以及 React95 风格 Web UI（Gallery 画廊过滤、Folders 文件夹浏览、Node Config 节点配置管理）。

> English: [README.md](README.md)

---

## 功能特性

### 媒体管理
- **Gallery 画廊过滤**：按相机品牌/型号、文件类型、日期范围、GPS、媒体类型（图片/视频）过滤
- **详情弹窗**：点击缩略图查看大图，显示 EXIF 元数据（相机/镜头/时间/大小/GPS），支持键盘导航和删除
- **Folders 文件夹浏览**：树形目录导航，多选文件，批量迁移/删除
- **RAW/HEIC 支持**：服务端 Magick.NET 转 JPEG（CR2、CR3、DNG、NEF、ARW、HEIC 等）
- **视频缩略图**：`<video>` 标签 `#t=0.5` 显示首帧

### 分布式架构
- **Agent 扫描**：定期扫描本地目录，推送 EXIF/GPS 元数据 + MD5 指纹到 Master
- **iOS 导入（iCloud + AFC）**：以 iCloud for Windows 为主、USB AFC 为辅。模糊 file-exists 检查处理 iCloud 对多设备同名文件添加的 `(2)` 后缀
- **可移动存储导入**：自动检测 SD 卡/相机，支持复制或移动传输模式，自动过滤截图
- **MD5 去重**：`filename + file_md5` 唯一约束，Agent 导入前向 Master 预查询（含 iCloud 文件名模糊匹配）
- **多 Master Gossip 同步**：应用层 P2P 广播实现最终一致性
- **Agent 自动注册**：每次扫描前自动注册到 Master（实际 LAN IP、版本号、心跳）

### 运维
- **节点管理**：健康检查、版本显示（git commit hash）、触发重扫、删除 Agent
- **配置管理 UI**：从 Web 页面读取/修改 Master 和 Agent 的 appsettings.json
- **文件重命名任务**：后台自动去除 `(1)` `_2` 等重复后缀，用年份/年月消歧
- **文件删除**：按记录 ID 删除，同时移除磁盘文件（本地或通知 Agent）和数据库记录
- **文件迁移**：在目录间或跨 Agent 移动文件

### 基础设施
- **图片代理**：Master 透明代理所有 Agent 的图片/视频流
- **MCP 集成**：预留 Model Context Protocol 工具接口
- **Windows 托盘**：Agent / Master 均提供系统托盘图标
- **CI/CD**：GitHub Actions 每次 push 自动构建 MSI 安装包并创建 Release

---

## 系统要求

- **操作系统**：Windows 10 / 11（64 位）
- **运行时**：.NET 10（MSI 安装包已自包含）
- **iOS 导入**：需在设备上选择"信任此电脑"并保持 USB 连接

---

## 快速开始

### 方式一：MSI 安装包（推荐）

从 [GitHub Releases](https://github.com/naughtyGitCat/UltraSonic/releases) 下载：

- `UltraSonic.LrWallPaper.msi` -- Master 中控节点
- `UltraSonic.LrWallPaper.Agent.msi` -- Agent 代理节点

安装后启动程序，浏览器打开 `http://localhost:5281`。

### 方式二：源码运行

```powershell
git clone https://github.com/naughtyGitCat/UltraSonic

# 构建前端
cd src/LrWallPaper.React && npm ci && npm run build && cd ../..

# 终端 1 - Master
cd src/LrWallPaper && dotnet run

# 终端 2 - Agent
cd src/LrWallPaper.Agent && dotnet run
```

首次运行自动创建 `ultrasonic.db`。Agent 首次启动自动生成并持久化 `AgentId`。

---

## 配置

所有配置可通过 Web UI 的 **Node Config** 标签页在线修改，也可直接编辑 `appsettings.json`。

### Master

```json
{
  "Urls": "http://0.0.0.0:5281",
  "MasterCluster": { "Peers": [] },
  "UltraSonic": {
    "LocalScan": { "RootDirectories": [], "SkipDirectories": [] },
    "AppleImport": { "TempDirectory": "", "ArchiveDirectory": "" },
    "Lightroom": { "CatalogPath": "" },
    "ArchivePaths": { "Current": "", "History": "" }
  }
}
```

### Agent

```json
{
  "Urls": "http://0.0.0.0:5282",
  "DeviceSync": {
    "AppleImport": { "TempDirectory": "", "ArchiveDirectory": "" },
    "GenericImport": { "ArchiveDirectory": "", "TransferMode": "copy" }
  },
  "Agent": {
    "AgentId": "auto",
    "MasterEndpoint": "http://localhost:5281",
    "ScanPaths": [],
    "ScanIntervalMinutes": 60
  }
}
```

| 配置项 | 说明 |
|---|---|
| `AgentId` | 设为 `"auto"` 则首次启动自动生成 UUID 并持久化 |
| `TransferMode` | `"copy"`（保留源文件）或 `"move"`（移动后删除源文件） |
| `MasterCluster.Peers` | Peer Master URL 数组，用于 Gossip 同步 |

### iOS 照片导入策略

UltraSonic 采用 **iCloud for Windows 为主、USB AFC 为辅** 的导入策略：

1. 安装 [iCloud for Windows](https://apps.microsoft.com/detail/9PKTQ5699M62)，开启"下载所有照片到此电脑"
2. 将 iCloud 照片目录加入 `Agent:ScanPaths`（如 `"D:\\iCloud Photos\\Photos"`）
3. Agent 优先扫描 iCloud 照片并索引到 Master
4. iPhone 通过 USB 连接时，DeviceSyncAppleJob 先向 Master 预检
5. 已通过 iCloud 同步的照片会被跳过（模糊文件名匹配处理 `(2)` 后缀）
6. 仅拉取 iCloud 尚未同步的新拍照片

> **注意**：如果 iPhone 开启了"优化 iPhone 存储空间"，AFC 只能拿到压缩后的缩略图。请使用 iCloud for Windows 获取原图。

---

## Web UI

React95 风格界面，三个标签页：

| 标签页 | 功能 |
|---|---|
| **Gallery** | 过滤（品牌/型号/类型/来源/日期/GPS）、All/Photos/Videos 切换、无限滚动、点击详情弹窗（导航/删除） |
| **Node Config** | 节点表格（IP/端口/版本/健康/心跳）、Rescan/Delete/Refresh、点击行编辑配置并 Save |
| **Folders** | 树形文件夹浏览、文件网格多选、Move To 对话框、Delete Folder |

---

## API 参考

完整接口文档见 [`docs/SDD.md`](docs/SDD.md)。主要端点：

| 接口 | 说明 |
|---|---|
| `GET /api/experiment/gallery` | 过滤分页查询 |
| `GET /api/experiment/filters` | 过滤选项值 |
| `GET /api/experiment/folders` | 文件夹汇总 |
| `DELETE /api/experiment/{id}` | 按 ID 删除文件 |
| `POST /api/experiment/move` | 批量迁移文件 |
| `GET /api/agent/status` | 所有节点健康/版本状态 |
| `GET /api/image?path=&agentId=` | 图片/视频代理（含 RAW 转 JPEG） |
| `GET/PUT /api/master/config` | 读写 Master 配置 |
| `GET/PUT /api/agent/{id}/config` | 读写 Agent 配置（经 Master 代理） |

---

## 常见问题

**iOS 连接报 `FatalPairingException`**
在手机上选择"信任此电脑"后重试。检查数据线和 Apple 设备驱动。

**Agent 不扫描文件**
检查 `Agent:ScanPaths` 路径是否存在。通过托盘菜单确认扫描未被暂停。

**照片显示为破损图标**
RAW/HEIC 文件需要 Magick.NET 转换。确认服务已正常启动，检查日志。

**GPS 显示为 `-`**
GPS 提取是后加的功能。在 Node Config 中点击 **Rescan** 重新扫描即可提取 GPS。

**删除文件报 500 错误**
`Program Files` 下的 `ultrasonic.db` 可能只读。授权写入：`icacls "C:\Program Files\UltraSonic\LrWallPaper" /grant Users:F`

---

## 参考资料

开发过程中参考的文档和文章见 [`docs/references.md`](docs/references.md)。

---

## License

MIT
