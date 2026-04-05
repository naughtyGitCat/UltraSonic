# UltraSonic 软件设计文档 (SDD)

**版本**: 2.0.0
**日期**: 2026-04-04
**作者**: naughtyGitCat

---

## 目录

1. [项目概述](#1-项目概述)
2. [系统架构](#2-系统架构)
3. [Master 节点设计](#3-master-节点设计)
4. [Agent 节点设计](#4-agent-节点设计)
5. [数据设计](#5-数据设计)
6. [API 接口设计](#6-api-接口设计)
7. [前端设计](#7-前端设计)
8. [配置设计](#8-配置设计)
9. [集群同步机制](#9-集群同步机制)
10. [部署设计](#10-部署设计)
11. [依赖说明](#11-依赖说明)

---

## 1. 项目概述

### 1.1 目标

UltraSonic 是一套**分布式本地照片 / RAW 文件管理平台**，核心目标：

- 对分散在多台 Windows 机器上的照片建立统一的元数据索引（EXIF、GPS、MD5 指纹）
- 自动从 iOS 设备 / 可移动存储（SD 卡）导入照片到本地归档目录，自动过滤截图
- 通过 Master-Agent 架构将元数据集中存储，支持多 Master 节点 P2P Gossip 同步
- 提供 Web API 与 React95 风格前端：Gallery 画廊（含过滤/详情）、Folders 文件夹浏览、Node Config 节点管理与配置

### 1.2 项目范围

| 模块 | 说明 |
|---|---|
| `LrWallPaper` (Master) | 中控节点：接收 Agent 推送数据、维护 SQLite 索引、对外提供 REST API、图片/RAW 格式转换代理 |
| `LrWallPaper.Agent` | 分布式代理节点：本地扫描、设备导入、元数据推送、配置管理 |
| `LrWallPaper.React` | React95 风格前端（Gallery / Folders / Node Config 三标签页） |
| `LrWallPaper.Tests` | xUnit 单元/集成测试 |
| `installer/` | WiX Toolset v5 MSI 安装包（Master + Agent 各一个） |

### 1.3 技术栈

| 层次 | 技术 |
|---|---|
| 运行时 | .NET 10 (`net10.0-windows`) |
| Web 框架 | ASP.NET Core 10 |
| 数据库 | SQLite via `Microsoft.Data.Sqlite`（每请求独立连接，支持并发） |
| ORM | NPoco（查询辅助） |
| 图片转换 | Magick.NET-Q8-AnyCPU（HEIC / RAW → JPEG 服务端转换） |
| 元数据解析 | `MetadataExtractor.NaughtyGitCat`（fork） |
| iOS 通信 | `Netimobiledevice` 1.1.1 |
| 日志 | Serilog（Console + 滚动文件） |
| MCP 集成 | `ModelContextProtocol.AspNetCore` |
| 前端 | React + Vite + TypeScript（React95 UI 组件库） |
| 打包 | WiX Toolset v5，GitHub Actions CI/CD |
| 版本标识 | MSBuild 自动嵌入 git commit hash 到 AssemblyInformationalVersion |

---

## 2. 系统架构

### 2.1 整体拓扑

```
┌───────────────────────────────────────────────────────────────┐
│                        用户局域网 / 本机                        │
│                                                               │
│  iPhone/iPad ──USB──►┐                                        │
│  SD Card / DCIM ────►│  LrWallPaper.Agent          HTTP Push  │
│  本地目录 ───────────►│  (0.0.0.0:5282) ───────────────────►┐ │
│                       │                                     │ │
│                       │  DeviceSyncAppleJob                 │ │
│                       │  DeviceSyncGenericJob               ▼ │
│                       │  ScanAndPushJob         ┌─────────────────┐
│                       └─────────────────────────┤ LrWallPaper     │
│                                                 │ Master          │
│  LrWallPaper.Agent ──────────── HTTP Push ─────►│ (0.0.0.0:5281)  │
│  (另一台机器)                                    │                 │
│                                                 │ FileMD5Manager  │
│  Browser ◄──── React95 SPA ◄──── wwwroot ──────┤ SQLite (.db)    │
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
  计算 MD5 + 解析 EXIF（含 GPS）/ QuickTime
         │
         ▼
  GET /api/master/file-exists  ──► 已存在 → 跳过
         │ 不存在
         ▼
  （设备导入）归档文件到本地目录（copy 或 move，可配置）
         │
         ▼
  POST /api/master/sync（批量，含 GPS 经纬度）
         │
         ▼
  Master 写入 SQLite（per-request 连接）
         │
         ▼
  MasterReplicationJob Gossip 广播到 Peer Master
```

### 2.3 职责边界

| 职责 | 归属 |
|---|---|
| 本地目录文件扫描 | **Agent**（ScanAndPushJob，支持手动触发） |
| iOS 设备文件导入 | **Agent**（自动过滤 PNG 截图） |
| 可移动存储导入 | **Agent**（自动过滤截图文件名/目录，支持 copy/move 策略） |
| 元数据持久化（SQLite） | **Master** |
| 集群数据同步 | **Master** |
| 文件去重判断 | **Master**（Agent 询问后决策） |
| 图片/RAW/HEIC 转 JPEG 代理 | **Master** + **Agent** |
| 视频流代理（Range 支持） | **Master** 转发 → **Agent** |
| 文件删除 | **Master** 按 ID 查记录，本地直删或通知 Agent |
| 文件重命名（去重后缀） | **Master**（FileRenameJob 后台任务） |
| 文件迁移（本地/跨 Agent） | **Master** 协调 |
| 配置管理 | **Master** 代理读写 Agent 配置 |
| Agent 自动注册 | **Agent** 每次扫描前注册到 Master（含版本号） |
| 健康检查 | **Master** 服务端统一检查后返回前端 |
| Web UI / API | **Master** |

---

## 3. Master 节点设计

### 3.1 职责

Master 是**汇聚节点**，不主动扫描任何本地文件，仅：

- 接收来自 Agent 的元数据批次并持久化到 SQLite
- 通过 Gossip 协议将数据广播给同级 Master Peer
- 对外暴露查询/过滤/删除/迁移 API 和前端 Web UI
- 作为图片流请求的透明代理（HEIC/RAW 自动转 JPEG，视频流式转发）
- 代理读写 Agent 配置、触发 Agent 重扫

### 3.2 服务组件结构

```
Program.cs
├── Singletons
│   ├── UltraSonicConfig          // 配置绑定对象（DI 注入）
│   ├── FileMD5Manager            // 核心数据库 CRUD（per-request 连接）
│   ├── AgentManager              // Agent 注册/查询/健康检查
│   └── MasterReplicationService  // Gossip 内存消息通道
├── HostedServices
│   ├── MasterReplicationJob      // 异步广播到 Peer Master
│   ├── FileRenameJob             // 自动去除文件名重复后缀
│   └── MasterTrayIconManager     // Windows 托盘图标
├── Controllers
│   ├── AgentController           // Agent CRUD + 健康/版本状态 + 配置代理
│   ├── MasterSyncController      // 接收数据推送 + 去重查询 + Master 配置
│   ├── ExperimentController      // Gallery 查询/过滤/删除/文件夹/迁移
│   ├── MigrationController       // 跨节点迁移（开发中）
│   └── DeviceController          // 设备查询（占位）
└── Minimal API Endpoints
    ├── GET /api/image             // 图片/视频代理（含 RAW→JPEG 转换）
    ├── GET /api/version           // Master 版本信息
    └── GET /api/health            // Master 健康检查
```

### 3.3 图片代理接口

`GET /api/image?path={path}&agentId={agentId}`：

- `agentId` 为空或 `"local"`：直接从本机磁盘读取文件流
- 指定 `agentId`：查询 `AgentManager` 获取端点，向 Agent 的 `/api/agent/image` 转发请求
- **HEIC / RAW 格式**（`.heic`, `.cr2`, `.cr3`, `.nef`, `.arw`, `.dng` 等）：Magick.NET 服务端转 JPEG
- **视频文件**：`enableRangeProcessing: true` 支持浏览器 seek
- 远程代理使用 `HttpCompletionOption.ResponseHeadersRead` 流式转发，避免缓冲大文件

### 3.4 FileRenameJob

后台任务，每 4 小时运行一次：
- 扫描文件名含 `(1)` `(2)` `_1` `_2` 等重复后缀的记录
- 目标名不存在 → 直接重命名
- 目标名存在且 MD5 相同 → 删除重复文件
- 目标名存在但 MD5 不同 → 用拍摄年份区分（如 `IMG_208_2008.JPG`），年份冲突则用年月

---

## 4. Agent 节点设计

### 4.1 职责

Agent 是**执行节点**，负责所有与物理文件接触的操作：

- 定期扫描配置的本地目录（支持 Master 触发即时重扫）
- 通过 USB AFC 从 iOS 设备拉取照片（自动跳过 PNG 截图）
- 从可移动存储（SD 卡、数码相机）导入 DCIM 文件（自动过滤截图，支持 copy/move 策略）
- 提取 GPS 经纬度并推送给 Master
- 首次启动自动生成 AgentId 并持久化到 appsettings.json
- 每次扫描前自动注册到 Master（含版本号、实际 IP）

Agent **不维护本地 SQLite**，所有去重判断通过向 Master 查询实现。

### 4.2 服务组件结构

```
Program.cs
├── Singletons
│   ├── AgentState           // 全局运行状态开关 + 手动重扫信号
│   └── TrayIconManager      // Windows 托盘图标
├── HostedServices
│   ├── ScanAndPushJob       // 本地目录定期扫描推送（支持 ManualResetEvent 即时触发）
│   ├── DeviceSyncAppleJob   // iOS 设备同步（过滤 PNG 截图）
│   └── DeviceSyncGenericJob // 可移动存储同步（过滤截图，支持 copy/move）
└── Minimal API Endpoints
    ├── GET  /api/agent/image   // 图片流（含 RAW→JPEG 转换）
    ├── GET  /api/agent/health  // 健康检查
    ├── GET  /api/agent/version // 版本信息
    ├── DELETE /api/agent/file  // Master 通知删除文件
    ├── POST /api/agent/rescan  // Master 触发即时重扫
    ├── POST /api/agent/move    // Master 通知移动文件
    ├── GET  /api/agent/config  // 读取 appsettings.json
    └── PUT  /api/agent/config  // 写入 appsettings.json
```

### 4.3 截图过滤

| 平台 | 过滤策略 |
|---|---|
| iOS | 跳过 `.png` 文件（iOS 截图为 PNG，相机照片为 HEIC/JPG）+ EXIF maker 校验 |
| Android/Generic | 跳过 `Screenshot_` / `截屏` / `截图` 前缀 + `Screenshots` 目录下的文件 |

### 4.4 AgentId 自动持久化

- `appsettings.json` 默认 `AgentId: "auto"`
- 首次扫描时生成 UUID，回写到 appsettings.json
- 后续重启使用固定 ID，确保数据库中 agent_id 一致

### 4.5 iCloud + AFC 协同导入策略

iOS 照片导入采用 **iCloud for Windows 为主、USB AFC 为辅** 的策略，避免重复导入：

```
iPhone 拍照 IMG_0001.HEIC
     │
     ├──► iCloud 上传 ──► iCloud for Windows 下载到 PC
     │                    D:\iCloud Photos\Photos\
     │                    IMG_0001.HEIC 或 IMG_0001(2).HEIC（多设备）
     │                           │
     │               Agent ScanPaths 扫描 ──► Master DB
     │
     └──► USB AFC ──► DeviceSyncAppleJob
                      │
                 file-exists 三级预检:
                 ① 精确匹配: filename + size
                 ② 去后缀匹配: IMG_0001(2).HEIC → IMG_0001.HEIC + size
                 ③ LIKE 匹配: IMG_0001(%).HEIC + size
                      │
                 已存在 → 跳过下载（节省 USB 带宽）
                 不存在 → AFC 拉取（新拍的，iCloud 还没同步的）
```

**配置要点**：
- Agent 的 `ScanPaths` 应包含 iCloud for Windows 的照片目录（如 `D:\iCloud Photos\Photos`）
- iCloud for Windows 设置中选择"下载所有照片到此电脑"
- 如果 iPhone 开启"优化 iPhone 存储空间"，AFC 拿到的可能是压缩版，iCloud 下载的才是原图

**多设备文件名冲突**：iCloud 用 `(2)` `(3)` 后缀区分不同设备的同名文件（如两台 iPhone 都有 `IMG_0001.HEIC`）。`file-exists` 的模糊匹配确保 AFC 能正确识别这些已同步的文件。

**FileRenameJob 保护**：iCloud 目录下的 `(N)` 后缀不会被 FileRenameJob 去除——这些不是重复文件，而是不同设备的区分标识。

---

## 5. 数据设计

### 5.1 数据库

- **引擎**: SQLite（`Microsoft.Data.Sqlite`）
- **路径**: `Path.Combine(AppContext.BaseDirectory, "ultrasonic.db")`
- **并发**: 每次查询创建独立 `Database` 实例（`OpenDb()`），避免 NPoco 单连接并发问题

### 5.2 表：`file_info`

| 列名 | 类型 | 约束 | 说明 |
|---|---|---|---|
| `id` | INTEGER | PK AUTOINCREMENT | 自增主键（删除/迁移以此为标识） |
| `fullpath` | TEXT | NOT NULL, UNIQUE | 完整路径（computed: `filepath + filename`） |
| `filepath` | TEXT | NOT NULL | 目录路径 |
| `filename` | TEXT | NOT NULL | 文件名 |
| `camera_maker` | TEXT | NOT NULL | 相机厂商 |
| `camera_model` | TEXT | NOT NULL | 相机型号 |
| `lens_model` | TEXT | NOT NULL | 镜头型号 |
| `agent_id` | TEXT | NULL | 来源 Agent ID（`"local"` 表示 Master 本机） |
| `latitude` | REAL | NULL | GPS 纬度（WGS84 十进制度） |
| `longitude` | REAL | NULL | GPS 经度（WGS84 十进制度） |
| `file_size` | INTEGER | NOT NULL | 文件大小（字节） |
| `file_md5` | TEXT | NOT NULL | MD5 指纹（十六进制小写） |
| `capture_time` | DATETIME | NOT NULL | 拍摄时间（EXIF 或 QuickTime） |
| `create_time` | DATETIME | NOT NULL | 记录入库时间 |
| `update_time` | DATETIME | NOT NULL | 记录最后更新时间 |

### 5.3 表：`agent_info`

| 列名 | 类型 | 约束 | 说明 |
|---|---|---|---|
| `id` | TEXT | PK | Agent UUID |
| `name` | TEXT | NOT NULL | 机器名（`Environment.MachineName`） |
| `endpoint` | TEXT | NOT NULL | HTTP 端点（实际 LAN IP，如 `http://192.168.1.x:5282`） |
| `version` | TEXT | NOT NULL | Agent 版本号（git commit hash） |
| `last_seen` | DATETIME | NULL | 最后注册时间 |

---

## 6. API 接口设计

### 6.1 Master Sync API

| 方法 | 路由 | 说明 |
|---|---|---|
| POST | `/api/master/sync` | 接收 Agent 推送的元数据批次（含 GPS） |
| GET | `/api/master/file-exists` | Agent 去重预检 |
| GET | `/api/master/config` | 读取 Master appsettings.json |
| PUT | `/api/master/config` | 写入 Master appsettings.json |

### 6.2 Gallery / Experiment API

| 方法 | 路由 | 说明 |
|---|---|---|
| GET | `/api/experiment/gallery` | 过滤分页查询（cameraMaker/cameraModel/fileType/agentId/dateFrom/dateTo/hasGps/mediaType） |
| GET | `/api/experiment/filters` | 返回过滤选项（品牌/型号/类型/来源去重列表） |
| GET | `/api/experiment/detail/{id}` | 单条记录详情 |
| DELETE | `/api/experiment/{id}` | 按 ID 删除文件（磁盘 + 数据库） |
| DELETE | `/api/experiment/agent/{agentId}` | 清理 Agent 全部记录 + 触发重扫 |
| GET | `/api/experiment/folders` | 文件夹汇总列表（路径/文件数/总大小） |
| GET | `/api/experiment/folder-files` | 指定文件夹下的文件列表 |
| POST | `/api/experiment/move` | 批量迁移文件到目标路径 |
| DELETE | `/api/experiment/folder` | 删除整个文件夹（磁盘 + 数据库） |

### 6.3 Agent Management API

| 方法 | 路由 | 说明 |
|---|---|---|
| GET | `/api/agent` | 查询所有 Agent |
| POST | `/api/agent` | 注册/更新 Agent |
| DELETE | `/api/agent/{id}` | 删除 Agent |
| GET | `/api/agent/status` | Master 统一检查所有节点健康/版本状态 |
| GET | `/api/agent/{id}/config` | 代理读取 Agent 配置 |
| PUT | `/api/agent/{id}/config` | 代理写入 Agent 配置 |

### 6.4 Image Proxy API

| 方法 | 路由 | 说明 |
|---|---|---|
| GET | `/api/image` | 图片/视频代理，RAW/HEIC 自动转 JPEG，视频支持 Range |
| GET | `/api/version` | Master 版本 |
| GET | `/api/health` | Master 健康检查 |

### 6.5 Agent API

| 方法 | 路由 | 说明 |
|---|---|---|
| GET | `/api/agent/image` | 图片流（含 RAW→JPEG 转换） |
| GET | `/api/agent/health` | 健康检查 |
| GET | `/api/agent/version` | 版本信息 |
| DELETE | `/api/agent/file` | 删除本地文件 |
| POST | `/api/agent/rescan` | 触发即时重扫 |
| POST | `/api/agent/move` | 移动本地文件 |
| GET | `/api/agent/config` | 读取 appsettings.json |
| PUT | `/api/agent/config` | 写入 appsettings.json |

---

## 7. 前端设计

React95 风格 SPA，三个标签页：

### 7.1 Gallery

- **过滤栏**: 品牌/型号/类型/来源下拉 + 日期范围 + GPS 复选框 + All/Photos/Videos 快捷切换
- **缩略图网格**: 无限滚动（IntersectionObserver），支持 HEIC/RAW/视频缩略图
- **详情弹窗**: 点击缩略图打开，左侧大图/视频播放，右侧属性面板（相机/镜头/时间/大小/GPS/来源/MD5），Prev/Next + 键盘导航，Delete 按钮

### 7.2 Node Config (Agents)

- **节点表格**: Name / IP / Port / Version / Health / Heartbeat / Actions
- **健康检查**: Master 后端统一检查，前端不直接调用 Agent
- **操作按钮**: Rescan（清理记录+触发重扫）、Delete、Refresh
- **配置编辑**: 点击行展开配置面板，递归渲染所有配置字段，Save 持久化到 appsettings.json
- **TransferMode 下拉**: copy / move

### 7.3 Folders

- **左侧树形浏览器**: 按路径层级展示文件夹，可展开/折叠，叶节点显示文件数
- **右侧文件网格**: 选中文件夹后显示文件缩略图，支持多选
- **工具栏**: Source 过滤 / Refresh / Move To / Delete Folder
- **Move 对话框**: 输入目标路径，批量迁移选中文件（本地 File.Move 或通知 Agent）

---

## 8. 配置设计

### 8.1 Master `appsettings.json`

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

### 8.2 Agent `appsettings.json`

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
    "ScanIntervalMinutes": 60,
    "SupportedExtensions": [".jpg", ".jpeg", ".heic", ".cr2", ".cr3", ".nef", ".arw", ".dng", ".mp4", ".mov"]
  }
}
```

- `AgentId: "auto"`: 首次启动自动生成 UUID 并回写持久化
- `TransferMode`: `"copy"`（保留源文件）或 `"move"`（移动后删除源文件）
- 所有配置可通过前端 Node Config 页面远程修改

---

## 9. 集群同步机制

### 9.1 同步流程

```
Agent ── POST /api/master/sync ──► Master A ── 写入 SQLite
                                       │
                                       ├─► POST Master B /api/master/sync?is_republished=true
                                       └─► POST Master C /api/master/sync?is_republished=true
```

### 9.2 一致性模型

| 属性 | 说明 |
|---|---|
| 一致性模型 | 最终一致性（AP） |
| 冲突策略 | `INSERT OR REPLACE`（last-write-wins） |
| 防无限广播 | `is_republished=true` 阻断二次转发 |

---

## 10. 部署设计

### 10.1 单机部署

```
C:\Program Files\UltraSonic\
├── LrWallPaper\
│   ├── LrWallPaper.exe          ← .NET 10 自包含单文件
│   ├── appsettings.json         ← 可通过前端远程修改
│   ├── ultrasonic.db            ← 首次启动自动创建
│   ├── wwwroot\                 ← React95 SPA
│   └── logs\master-YYYYMMDD.txt
└── LrWallPaper.Agent\
    ├── LrWallPaper.Agent.exe
    ├── appsettings.json         ← AgentId 自动生成并持久化
    └── logs\agent-YYYYMMDD.txt
```

### 10.2 CI/CD

触发条件：每次 push 到 master 分支自动构建

```
build-msi.yml:
1. Checkout → Setup .NET 10 → Install WiX v5 → Setup Node.js 20
2. npm ci && npm run build (React)
3. dotnet publish (Master + Agent, win-x64, self-contained, single-file)
4. wix build (两个 MSI)
5. Upload Artifacts + Create GitHub Release (tag: build-YYYYMMDD-HHMMSS)
```

版本号通过 MSBuild Target 自动注入 git commit hash（`1.0.0+abc1234`）。

---

## 11. 依赖说明

### 11.1 Master

| 包 | 用途 |
|---|---|
| `Magick.NET-Q8-AnyCPU` | HEIC / RAW → JPEG 服务端转换 |
| `Microsoft.Data.Sqlite` | SQLite 访问 |
| `NPOCO` | 轻量 ORM |
| `MetadataExtractor.NaughtyGitCat` | EXIF / QuickTime / GPS 解析 |
| `ModelContextProtocol.AspNetCore` | MCP Server |
| `Serilog.AspNetCore` | 结构化日志 |

### 11.2 Agent

| 包 | 用途 |
|---|---|
| `Magick.NET-Q8-AnyCPU` | HEIC / RAW → JPEG 转换 |
| `Netimobiledevice` | iOS 设备 USB 通信 |
| `MetadataExtractor.NaughtyGitCat` | EXIF / GPS 解析 |
| `Serilog.AspNetCore` | 结构化日志 |
