# UltraSonic 软件设计文档 (SDD)

**版本**: 1.0.2.0  
**日期**: 2026-04-03  
**作者**: naughtyGitCat

---

## 目录

1. [项目概述](#1-项目概述)
2. [系统架构](#2-系统架构)
3. [Master 节点设计](#3-master-节点设计)
4. [Agent 节点设计](#4-agent-节点设计)
5. [数据设计](#5-数据设计)
6. [API 接口设计](#6-api-接口设计)
7. [配置设计](#7-配置设计)
8. [集群同步机制](#8-集群同步机制)
9. [部署设计](#9-部署设计)
10. [依赖说明](#10-依赖说明)

---

## 1. 项目概述

### 1.1 目标

UltraSonic 是一套**分布式本地照片 / RAW 文件管理平台**，核心目标：

- 对分散在多台 Windows 机器上的照片建立统一的元数据索引（EXIF、MD5 指纹）
- 自动从 iOS 设备 / 可移动存储（SD 卡）导入照片到本地归档目录
- 通过 Master-Agent 架构将元数据集中存储，支持多 Master 节点 P2P Gossip 同步
- 提供 Web API 与 React95 风格前端画廊供用户浏览

### 1.2 项目范围

| 模块 | 说明 |
|---|---|
| `LrWallPaper` (Master) | 中控节点：接收 Agent 推送数据、维护 SQLite 索引、对外提供 REST API |
| `LrWallPaper.Agent` | 分布式代理节点：本地扫描、设备导入、元数据推送给 Master |
| `LrWallPaper.React` | React95 风格前端，打包后内嵌到 Master 的 `wwwroot` |
| `LrWallPaper.Tests` | xUnit 单元/集成测试 |
| `installer/` | WiX Toolset v5 MSI 安装包（Master + Agent 各一个） |

### 1.3 技术栈

| 层次 | 技术 |
|---|---|
| 运行时 | .NET 10 (`net10.0-windows`) |
| Web 框架 | ASP.NET Core 10 |
| 数据库 | SQLite via `Microsoft.Data.Sqlite` |
| ORM | NPoco（查询辅助） |
| 元数据解析 | `MetadataExtractor.NaughtyGitCat`（fork） |
| iOS 通信 | `Netimobiledevice` 1.1.1 |
| 日志 | Serilog（Console + 滚动文件） |
| MCP 集成 | `ModelContextProtocol.AspNetCore` |
| 前端 | React + Vite（React95 UI 组件库） |
| 打包 | WiX Toolset v5，GitHub Actions CI/CD |

---

## 2. 系统架构

### 2.1 整体拓扑

```
┌───────────────────────────────────────────────────────────────┐
│                        用户局域网 / 本机                        │
│                                                               │
│  iPhone/iPad ──USB──►┐                                        │
│  SD Card / DCIM ────►│  LrWallPaper.Agent          HTTP Push  │
│  本地目录 ───────────►│  (port 5282)  ─────────────────────►┐ │
│                       │                                     │ │
│                       │  DeviceSyncAppleJob                 │ │
│                       │  DeviceSyncGenericJob               ▼ │
│                       │  ScanAndPushJob         ┌─────────────────┐
│                       └─────────────────────────┤ LrWallPaper     │
│                                                 │ Master          │
│  LrWallPaper.Agent ──────────── HTTP Push ─────►│ (port 5281)     │
│  (另一台机器)                                    │                 │
│                                                 │ FileMD5Manager  │
│                                                 │ SQLite (.db)    │
│                                                 │                 │
│                                        Gossip ◄─┤ Replication-    │
│                                            │    │ Job             │
│                                            ▼    └─────────────────┘
│                                   ┌─────────────┐
│                                   │ Peer Master │
│                                   │ (port 5281) │
│                                   └─────────────┘
└───────────────────────────────────────────────────────────────┘
```

### 2.2 核心数据流

```
Agent 本地扫描 / 设备导入
         │
         ▼
  计算 MD5 + 解析 EXIF / QuickTime
         │
         ▼
  GET /api/master/file-exists  ──► 已存在 → 跳过
         │ 不存在
         ▼
  （设备导入）归档文件到本地目录
         │
         ▼
  POST /api/master/sync（批量）
         │
         ▼
  Master 写入 SQLite
         │
         ▼
  MasterReplicationJob Gossip 广播到 Peer Master
```

### 2.3 职责边界

| 职责 | 归属 |
|---|---|
| 本地目录文件扫描 | **Agent** |
| iOS 设备文件导入 | **Agent** |
| 可移动存储导入 | **Agent** |
| 元数据持久化（SQLite） | **Master** |
| 集群数据同步 | **Master** |
| 文件去重判断 | **Master**（Agent 询问后决策） |
| 图片流媒体代理 | Master 转发 → Agent |
| Web UI / API | **Master** |

---

## 3. Master 节点设计

### 3.1 职责

Master 是**汇聚节点**，不主动扫描任何本地文件，仅：

- 接收来自 Agent 的元数据批次并持久化到 SQLite
- 通过 Gossip 协议将数据广播给同级 Master Peer
- 对外暴露查询 API 和前端 Web UI
- 作为图片流请求的透明代理（转发到对应 Agent）

### 3.2 服务组件结构

```
Program.cs
├── Singletons
│   ├── UltraSonicConfig          // 配置绑定对象（DI 注入）
│   ├── ICustomSQLiteFactory      // SQLite 连接工厂
│   ├── FileMD5Manager            // 核心数据库 CRUD
│   ├── AgentManager              // Agent 注册/查询
│   └── MasterReplicationService  // Gossip 内存消息通道
├── HostedServices
│   ├── MasterReplicationJob      // 异步广播到 Peer Master
│   └── MasterTrayIconManager     // Windows 托盘图标
└── Controllers
    ├── AgentController           // Agent 注册管理 CRUD
    ├── MasterSyncController      // 接收数据推送 + 去重查询
    ├── ExperimentController      // 文件查询接口
    ├── MigrationController       // 跨节点迁移（开发中）
    └── DeviceController          // 设备查询（占位）
```

### 3.3 图片代理接口

`GET /api/image?path={path}&agentId={agentId}`：

- `agentId` 为空或 `"local"`：直接从本机磁盘读取文件流
- 指定 `agentId`：查询 `AgentManager` 获取端点，向 Agent 的 `/api/agent/image` 转发请求，实现透明代理

### 3.4 MCP Server 集成

通过 `ModelContextProtocol.AspNetCore` + `WithToolsFromAssembly()` 自动注册 `MCP/Tool.cs`，为 AI 客户端（如 Claude）提供照片检索工具接入点（当前为空实现，预留扩展）。

### 3.5 前端 SPA 托管

`wwwroot/` 目录内嵌 Vite 构建的 React 产物。`UseDefaultFiles()` + `UseStaticFiles()` 服务静态文件，`MapFallbackToFile("index.html")` 支持客户端路由。

---

## 4. Agent 节点设计

### 4.1 职责

Agent 是**执行节点**，负责所有与物理文件接触的操作：

- 定期扫描配置的本地目录
- 通过 USB AFC 从 iOS 设备拉取照片
- 从可移动存储（SD 卡、数码相机）导入 DCIM 文件
- 将文件元数据批量推送给 Master

Agent **不维护本地 SQLite**，所有去重判断通过向 Master 查询实现。

### 4.2 服务组件结构

```
Program.cs
├── Singletons
│   ├── AgentState           // 全局运行状态开关
│   └── TrayIconManager      // Windows 托盘图标
├── HostedServices
│   ├── ScanAndPushJob       // 本地目录定期扫描推送
│   ├── DeviceSyncAppleJob   // iOS 设备同步
│   └── DeviceSyncGenericJob // 可移动存储同步
└── Endpoints
    └── GET /api/agent/image // 图片流（供 Master 反向代理调用）
```

### 4.3 ScanAndPushJob

| 属性 | 说明 |
|---|---|
| 启动延迟 | 3 秒（等待 Host 就绪） |
| 扫描路径 | `Agent:ScanPaths`（数组，支持多路径） |
| 文件格式 | `Agent:SupportedExtensions`（默认含 RAW、视频等 20+ 种后缀） |
| 批量大小 | 100 条 / 批 |
| 扫描周期 | `Agent:ScanIntervalMinutes`（默认 60 分钟） |
| 暂停控制 | `AgentState.IsScanningEnabled == false` 时休眠 15 秒后再检查 |

### 4.4 DeviceSyncAppleJob

```
启动延迟: 10s  |  循环周期: ~1h5m
┌──────────────────────────────────────────────────┐
│ 枚举 USB 连接的 iOS 设备（Usbmux.GetDeviceList）  │
│ 对每台设备:                                       │
│   建立 Lockdown + AFC 连接                        │
│   LsDirectory("DCIM", depth=2) 列举文件           │
│   对每个文件:                                     │
│     跳过: .aae / 隐藏文件 / 非媒体格式            │
│     GET /api/master/file-exists ← 去重预检        │
│     afc.Pull() → TempDirectory                   │
│     读取 EXIF / QuickTime 元数据                  │
│     过滤: 仅保留本机拍摄                          │
│     移动到 ArchiveDirectory/{Year}/{yyyy-MM-dd}/  │
│     计算 MD5                                      │
│     批量推送 POST /api/master/sync（20条/批）      │
└──────────────────────────────────────────────────┘
```

### 4.5 DeviceSyncGenericJob

```
启动延迟: 15s  |  循环周期: ~5m
┌──────────────────────────────────────────────────┐
│ DriveInfo.GetDrives() 枚举 Removable 驱动器       │
│ 对含 DCIM 文件夹的驱动器:                         │
│   递归遍历文件:                                   │
│     跳过: .lrf / .aae / 隐藏文件 / 非媒体格式     │
│     GET /api/master/file-exists ← 去重预检        │
│     读取 EXIF 元数据（或回退到文件创建时间）       │
│     复制到 ArchiveDirectory/{Year}/{yyyy-MM-dd}/  │
│     文件名冲突时追加 Ticks 后缀                   │
│     批量推送 POST /api/master/sync（50条/批）      │
└──────────────────────────────────────────────────┘
```

### 4.6 AgentState 与托盘控制

`AgentState` 是可观察状态对象，`TrayIconManager` 通过它暴露运行时控制：

| 状态开关 | 影响 |
|---|---|
| `IsScanningEnabled` | `ScanAndPushJob` 是否跳过本次扫描 |
| `IsRequestEnabled` | `GET /api/agent/image` 是否响应（`false` 时返回 503） |

托盘菜单额外支持：开机自启（读写注册表 `HKCU\...\Run`）、直接打开 `appsettings.json` 编辑。

---

## 5. 数据设计

### 5.1 数据库

- **引擎**: SQLite（`Microsoft.Data.Sqlite`）
- **路径**: `Path.Combine(AppContext.BaseDirectory, "ultrasonic.db")`（单文件发布兼容）

### 5.2 表：`file_info`

文件元数据索引主表。

| 列名 | 类型 | 约束 | 说明 |
|---|---|---|---|
| `id` | INTEGER | PK AUTOINCREMENT | 自增主键 |
| `fullpath` | TEXT | NOT NULL, UNIQUE | 完整路径（`filepath + filename`） |
| `filepath` | TEXT | NOT NULL | 目录路径 |
| `filename` | TEXT | NOT NULL | 文件名 |
| `camera_maker` | TEXT | NOT NULL | 相机厂商 |
| `camera_model` | TEXT | NOT NULL | 相机型号 |
| `lens_model` | TEXT | NOT NULL | 镜头型号 |
| `agent_id` | TEXT | NULL | 来源 Agent ID（`"local"` 表示 Master 本机） |
| `file_size` | INTEGER | NOT NULL | 文件大小（字节） |
| `file_md5` | TEXT | NOT NULL | MD5 指纹（十六进制小写） |
| `capture_time` | DATETIME | NOT NULL | 拍摄时间（EXIF 或 QuickTime） |
| `create_time` | DATETIME | NOT NULL | 记录入库时间 |
| `update_time` | DATETIME | NOT NULL | 记录最后更新时间 |

**唯一约束**：
```sql
UNIQUE (fullpath)
UNIQUE (filepath, filename)
UNIQUE (filename, file_md5)
```

**写入策略**: `INSERT OR REPLACE`（last-write-wins upsert）

### 5.3 表：`agent_info`

Agent 注册信息。

| 列名 | 类型 | 约束 | 说明 |
|---|---|---|---|
| `id` | TEXT | PK | Agent UUID |
| `name` | TEXT | NOT NULL | 显示名称 |
| `endpoint` | TEXT | NOT NULL | HTTP 端点（如 `http://192.168.1.x:5282`） |

---

## 6. API 接口设计

### 6.1 Master API

#### `POST /api/master/sync`

接收 Agent 推送的文件元数据批次并持久化。

**请求体**: `List<FileMD5Entity>`

```json
[
  {
    "fileFullPath": "D:\\Photograph\\2024\\2024-06-01\\IMG_0001.JPG",
    "filePath": "D:\\Photograph\\2024\\2024-06-01",
    "fileName": "IMG_0001.JPG",
    "cameraMaker": "Apple",
    "cameraModel": "iPhone 14 Pro",
    "lensModel": "",
    "agentId": "550e8400-e29b-41d4-a716-446655440000",
    "fileSize": 8768492,
    "fileMD5": "d41d8cd98f00b204e9800998ecf8427e",
    "captureTime": "2024-06-01T12:00:00"
  }
]
```

**查询参数**: `is_republished=true` — 来自 Peer Master 的转发，跳过二次广播

**响应**: `200 OK` `{ "count": N }`

---

#### `GET /api/master/file-exists`

Agent 下载/复制文件前查询 Master 是否已有同名同大小记录（去重预检）。

**参数**: `filename={string}`, `size={long}`

**响应**: `200 OK` `{ "exists": true/false }`

---

#### `GET /api/experiment/{days:int}`

返回最近 N 天 `capture_time` 的所有记录，按时间降序。

**响应**: `List<FileMD5Entity>`

---

#### `GET /api/experiment/page`

分页查询，按 `capture_time` 降序。

**参数**: `page`（默认 1）, `pageSize`（默认 30）

**响应**: `List<FileMD5Entity>`

---

#### `GET /api/image`

图片流代理接口。

**参数**: `path={string}`, `agentId={string?}`

**逻辑**:
- `agentId` 为空或 `"local"` → 直接从本机磁盘读取
- 指定 Agent ID → 从 `AgentManager` 查找端点，向该 Agent 的 `/api/agent/image` 转发请求

---

#### `GET /api/agent` / `POST /api/agent` / `DELETE /api/agent/{id}`

Agent 注册管理（查询全部 / 保存或更新 / 删除）。

---

#### `POST /api/migration/schedule`

跨 Agent 照片迁移任务调度（开发中，当前仅记录日志）。

---

### 6.2 Agent API

#### `GET /api/agent/image`

向 Master 提供图片文件字节流。受 `AgentState.IsRequestEnabled` 保护。

**参数**: `path={string}` — 文件绝对路径

**响应**: 文件字节流，Content-Type 按扩展名推断

---

## 7. 配置设计

### 7.1 Master `appsettings.json`

```json
{
  "Urls": "http://localhost:5281",
  "MasterCluster": {
    "Peers": []
  },
  "UltraSonic": {
    "LocalScan": {
      "RootDirectories": ["D:\\"],
      "SkipDirectories": ["D:\\icloud\\iCloudDrive"]
    },
    "AppleImport": {
      "TempDirectory": "F:\\",
      "ArchiveDirectory": "D:\\Photograph"
    },
    "Lightroom": {
      "CatalogPath": "D:\\摄影\\Lightroom\\Lightroom Catalog-v11.lrcat"
    },
    "ArchivePaths": {
      "Current": "D:/摄影",
      "History": "X:/摄影"
    }
  }
}
```

`MasterCluster:Peers` 为空数组时 Master 以单节点模式运行，不进行 Gossip 同步。

### 7.2 Agent `appsettings.json`

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
    "AgentId": "",
    "MasterEndpoint": "http://localhost:5281",
    "ScanPaths": ["D:\\Photograph"],
    "ScanIntervalMinutes": 60,
    "SupportedExtensions": [".jpg", ".jpeg", ".heic", ".dng", ".cr2", "..."]
  }
}
```

`Agent:AgentId` 为空时自动生成临时 UUID（重启后 ID 变化），建议设置固定值。

`DeviceSync:AppleImport:ArchiveDirectory` 若为空，`DeviceSyncAppleJob` 会跳过执行并打印警告日志。

---

## 8. 集群同步机制

### 8.1 设计目标

多台 Windows 机器各运行一个 Master，通过**应用层 Gossip** 实现元数据的最终一致性，无需额外消息中间件。

### 8.2 同步流程

```
Agent
  │  POST /api/master/sync
  ▼
Master A  ──写入 SQLite──►  file_info
  │
  │  投递到 MasterReplicationService（内存 Channel）
  ▼
MasterReplicationJob（后台消费）
  │
  ├─► POST http://MasterB:5281/api/master/sync?is_republished=true
  └─► POST http://MasterC:5281/api/master/sync?is_republished=true

Master B/C 收到后：
  写入 SQLite  ──（因 is_republished=true 不再转发）──► 结束
```

### 8.3 一致性模型

| 属性 | 说明 |
|---|---|
| 一致性模型 | 最终一致性（AP） |
| 冲突策略 | `INSERT OR REPLACE`（last-write-wins） |
| 持久化 | 各 Master 节点独立维护 SQLite |
| 故障处理 | Peer 不可达时记录错误日志，当前版本不自动重试 |
| 防无限广播 | `is_republished=true` 标识阻断二次转发 |

---

## 9. 部署设计

### 9.1 单机部署（标准）

```
C:\Program Files\UltraSonic\
├── LrWallPaper\
│   ├── LrWallPaper.exe          ← .NET 10 自包含单文件
│   ├── appsettings.json
│   ├── ultrasonic.db            ← 首次启动自动创建
│   └── logs\master-YYYYMMDD.txt
└── LrWallPaper.Agent\
    ├── LrWallPaper.Agent.exe
    ├── appsettings.json
    └── logs\agent-YYYYMMDD.txt
```

### 9.2 多机分布式部署

```
机器 A（主存储节点）                机器 B（摄影工作站）
├── LrWallPaper (Master :5281)     ├── LrWallPaper (Master :5281)
│   Peers: [http://机器B:5281]     │   Peers: [http://机器A:5281]
└── LrWallPaper.Agent (:5282)      └── LrWallPaper.Agent (:5282)
    MasterEndpoint: localhost:5281      MasterEndpoint: localhost:5281
```

### 9.3 CI/CD 流程（GitHub Actions）

触发条件：`v*` Tag Push 或手动触发 `workflow_dispatch`

```
build-msi.yml
1. Checkout
2. Setup .NET 10
3. Install WiX Toolset v5
4. Setup Node.js 20
5. npm ci && npm run build  (React 前端)
6. dotnet publish LrWallPaper  (win-x64, self-contained, single-file)
7. dotnet publish LrWallPaper.Agent  (win-x64, self-contained, single-file)
8. wix build installer/LrWallPaper.wxs
9. wix build installer/LrWallPaper.Agent.wxs
10. Upload Artifacts
11. Create GitHub Release (仅 Tag Push)
```

MSI 支持 `MajorUpgrade`，版本号递增即可触发 Windows Installer 自动覆盖安装。

---

## 10. 依赖说明

### 10.1 Master 关键依赖

| 包 | 版本 | 用途 |
|---|---|---|
| `Microsoft.Data.Sqlite` | 8.0.4 | SQLite 访问（单文件发布兼容） |
| `NPOCO` | 5.7.1 | 轻量 ORM |
| `MetadataExtractor.NaughtyGitCat` | 1.0.0 | EXIF / QuickTime 解析（自定义 fork） |
| `Netimobiledevice` | 1.1.1 | iOS USB 通信（代码保留，运行时未启用） |
| `ModelContextProtocol.AspNetCore` | 0.4.0-preview.3 | MCP Server（AI 工具接入） |
| `Serilog.AspNetCore` | 8.0.1 | 结构化日志 |

### 10.2 Agent 关键依赖

| 包 | 版本 | 用途 |
|---|---|---|
| `Netimobiledevice` | 1.1.1 | iOS 设备 USB 通信（Usbmux / AFC） |
| `MetadataExtractor.NaughtyGitCat` | 1.0.0 | EXIF / QuickTime 解析 |
| `Serilog.AspNetCore` | 8.0.1 | 结构化日志 |
