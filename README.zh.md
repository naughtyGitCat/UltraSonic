# UltraSonic

分布式本地照片 / RAW 管理平台。通过 **Master-Agent** 架构，将分散在多台 Windows 机器上的照片建立统一的元数据索引，支持从 iOS 设备与可移动存储自动导入，提供 MD5 去重、EXIF 解析、多节点 P2P 同步与 React95 风格 Web 画廊。

> English documentation: [README.md](README.md)

---

## 功能特性

- **分布式扫描**：Agent 节点定期扫描本地目录，将 EXIF 元数据 + MD5 指纹批量推送给 Master
- **iOS 导入**：通过 USB AFC 访问 `DCIM`，自动归档、支持 Apple Live Photo `.MOV` 元数据解析
- **可移动存储导入**：自动检测 SD 卡等可移动驱动器上的 DCIM，复制并归档照片
- **MD5 去重**：以 `filename + file_md5` 联合约束防止重复入库，入库前可向 Master 预查询
- **多 Master Gossip 同步**：配置 Peer 节点后，数据通过应用层 P2P 广播实现跨机器最终一致性
- **Web 画廊**：React95 风格前端，内嵌于 Master，支持按日期/分页浏览
- **图片代理**：Master 统一代理所有 Agent 上的图片流，前端无需感知分布式拓扑
- **MCP 集成**：预留 Model Context Protocol 工具接口，可被 AI 客户端调用
- **Windows 托盘**：Agent / Master 均提供系统托盘图标，支持暂停扫描、开机自启等快捷操作
- **自动壁纸**（可选）：`BusinessJob` 可将最近拍摄的照片设置为 Windows 桌面壁纸

---

## 系统要求

- **操作系统**：Windows 10 / 11（64 位）
- **运行时**：.NET 10 Runtime（使用 MSI 安装包时已自包含，无需单独安装）
- **iOS 导入**：需在设备上选择「信任此电脑」并保持 USB 连接

---

## 快速开始

### 方式一：MSI 安装包（推荐）

从 [GitHub Releases](https://github.com/naughtyGitCat/UltraSonic/releases) 下载最新版：

- `UltraSonic.LrWallPaper.msi` — Master 中控节点
- `UltraSonic.LrWallPaper.Agent.msi` — Agent 代理节点

安装后分别启动两个程序，系统托盘会出现对应图标。

### 方式二：源码运行

```powershell
git clone https://github.com/naughtyGitCat/UltraSonic

# 终端 1 — Master
cd src/LrWallPaper && dotnet run

# 终端 2 — Agent
cd src/LrWallPaper.Agent && dotnet run

# 终端 3 — 前端（仅开发调试）
cd src/LrWallPaper.React && npm install && npm run dev
```

首次运行在程序目录自动创建 `ultrasonic.db`。开发模式下自动启用 Swagger UI（`http://localhost:5281/swagger`）。生产部署时前端已打包进 Master 的 `wwwroot`，直接访问 `http://localhost:5281` 即可。

---

## 配置

所有路径均通过 `appsettings.json` 配置，无需改动源码。

### Master（`src/LrWallPaper/appsettings.json`）

```json
{
  "Urls": "http://localhost:5281",
  "MasterCluster": {
    "Peers": []
  },
  "UltraSonic": {
    "AppleImport": {
      "TempDirectory": "F:\\",
      "ArchiveDirectory": "D:\\Photograph"
    },
    "ArchivePaths": {
      "Current": "D:/摄影",
      "History": "X:/摄影"
    }
  }
}
```

多节点集群：在 `Peers` 数组中填入其他 Master 的地址，如 `["http://192.168.1.10:5281"]`。

### Agent（`src/LrWallPaper.Agent/appsettings.json`）

```json
{
  "Urls": "http://localhost:5282",
  "DeviceSync": {
    "AppleImport": {
      "TempDirectory": "F:\\",
      "ArchiveDirectory": "D:\\Photograph"
    },
    "GenericImport": {
      "ArchiveDirectory": "D:\\Photograph"
    }
  },
  "Agent": {
    "AgentId": "my-desktop",
    "MasterEndpoint": "http://localhost:5281",
    "ScanPaths": ["D:\\Photograph"],
    "ScanIntervalMinutes": 60
  }
}
```

`AgentId` 建议设置为有意义的固定字符串（如机器名），保证重启后 ID 一致。

---

## 架构概览

```
iOS/SD Card ──USB──► LrWallPaper.Agent ──HTTP Push──► LrWallPaper (Master)
本地目录 ────────────► (port 5282)                     (port 5281)
                                                              │
                                                       SQLite 持久化
                                                              │
                                                       Gossip 同步 ──► Peer Master
```

详见 [`docs/SDD.md`](docs/SDD.md)。

---

## 后台任务一览

### Agent

| Job | 默认状态 | 说明 |
|---|---|---|
| `ScanAndPushJob` | 启用 | 定期扫描本地目录，推送元数据到 Master |
| `DeviceSyncAppleJob` | 启用 | iOS 设备照片导入与归档 |
| `DeviceSyncGenericJob` | 启用 | 可移动存储（SD 卡）导入与归档 |

### Master

| Job | 默认状态 | 说明 |
|---|---|---|
| `MasterReplicationJob` | 启用 | Gossip 广播到 Peer Master 节点 |
| `BusinessJob` | 注释 | 壁纸轮换，按需在 `Program.cs` 中启用 |
| `SyncRemovableJob` | 注释 | 设备枚举监控（已移至 Agent） |

---

## Web API

| 接口 | 说明 |
|---|---|
| `POST /api/master/sync` | 接收 Agent 推送的文件元数据批次 |
| `GET /api/master/file-exists?filename=&size=` | 去重预检（Agent 调用） |
| `GET /api/experiment/{days}` | 返回最近 N 天的拍摄记录 |
| `GET /api/experiment/page?page=&pageSize=` | 分页查询文件记录 |
| `GET /api/image?path=&agentId=` | 图片流代理（透明转发到 Agent） |
| `GET /api/agent` | 查询所有已注册的 Agent |

开发模式下访问 `http://localhost:5281/swagger` 可在线试用全部接口。

---

## 数据存储

- **数据库**：SQLite（`ultrasonic.db`，程序目录下自动创建）
- **主表** `file_info`：路径、文件名、大小、MD5、拍摄时间、相机信息、来源 Agent ID
- **唯一约束**：`fullpath`、`(filepath, filename)`、`(filename, file_md5)`
- **写入策略**：`INSERT OR REPLACE`（upsert，天然幂等）

---

## 常见问题

**iOS 连接报 `FatalPairingException`**  
在手机上选择「信任此电脑」后重试。若仍失败，检查数据线和驱动程序（Apple 设备服务）。

**Agent 不扫描文件**  
检查 `appsettings.json` 中 `Agent:ScanPaths` 路径是否存在；也可通过托盘菜单确认扫描未被暂停。

**设备导入不工作**  
确认 `DeviceSync:AppleImport:ArchiveDirectory` 已配置且目录可写。日志文件在 `logs/agent-*.txt`。

**访问云盘文件报错 `Access to the cloud file is denied`**  
正常现象，程序会跳过无法访问的云同步文件。确保需要处理的文件已下载到本地。

**壁纸设置无效**  
取消注释 `Program.cs` 中的 `BusinessJob`，重新构建运行。本功能仅在 Windows 环境生效。

---

## 参考资料

- EXIF 规范：https://www.media.mit.edu/pia/Research/deepview/exif.html
- MetadataExtractor (.NET)：https://github.com/drewnoakes/metadata-extractor-dotnet
- Netimobiledevice：https://github.com/artehe/Netimobiledevice
