# UltraSonic

A distributed local photo / RAW management platform. The **Master-Agent** architecture builds a unified metadata index across multiple Windows machines, with automatic import from iOS devices and removable storage, MD5 de-duplication, EXIF parsing, multi-node P2P sync, and a React95-style web gallery.

> 中文文档：[README.zh.md](README.zh.md)

---

## Features

- **Distributed scanning**: Agent nodes periodically scan local folders and push EXIF metadata + MD5 fingerprints to Master in batches
- **iOS import**: Access `DCIM` over USB AFC, archive by capture date, support Apple Live Photo `.MOV` metadata
- **Removable storage import**: Auto-detect SD cards / cameras with DCIM folders, copy and archive files
- **MD5 de-duplication**: `UNIQUE (filename, file_md5)` constraint prevents duplicates; Agents pre-check with Master before downloading
- **Multi-Master Gossip sync**: Configure Peer nodes for eventual-consistency replication via application-layer P2P broadcast
- **Web gallery**: React95-style frontend embedded in Master, browse by date or page
- **Image proxy**: Master transparently proxies image streams from any Agent — frontend needs no topology awareness
- **MCP integration**: Model Context Protocol tool endpoint reserved for AI client integration
- **Windows tray**: Both Agent and Master provide tray icons with pause/resume, startup toggle, and config editing
- **Auto wallpaper** (optional): `BusinessJob` sets recent captures as the Windows desktop wallpaper

---

## Requirements

- **OS**: Windows 10 / 11 (64-bit)
- **Runtime**: .NET 10 Runtime (self-contained in MSI installer — no separate install needed)
- **iOS import**: Trust the computer on the device and maintain USB connection

---

## Quick Start

### Option 1: MSI Installer (Recommended)

Download the latest release from [GitHub Releases](https://github.com/naughtyGitCat/UltraSonic/releases):

- `UltraSonic.LrWallPaper.msi` — Master node
- `UltraSonic.LrWallPaper.Agent.msi` — Agent node

Install both, then start each program — a tray icon will appear for each.

### Option 2: Build from Source

```powershell
git clone https://github.com/naughtyGitCat/UltraSonic

# Terminal 1 — Master
cd src/LrWallPaper && dotnet run

# Terminal 2 — Agent
cd src/LrWallPaper.Agent && dotnet run

# Terminal 3 — Frontend (dev only)
cd src/LrWallPaper.React && npm install && npm run dev
```

On first run `ultrasonic.db` is created automatically in the program directory. Swagger UI is available at `http://localhost:5281/swagger` in development mode. The production frontend is served directly from `http://localhost:5281`.

---

## Configuration

All paths are configured via `appsettings.json` — no source changes needed.

### Master (`src/LrWallPaper/appsettings.json`)

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
      "Current": "D:/Photograph",
      "History": "X:/Photograph"
    }
  }
}
```

For multi-node clusters, add peer addresses to `Peers`, e.g. `["http://192.168.1.10:5281"]`.

### Agent (`src/LrWallPaper.Agent/appsettings.json`)

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

Set `AgentId` to a stable string (e.g. machine hostname) so the identity persists across restarts.

---

## Architecture

```
iOS / SD Card ──USB──► LrWallPaper.Agent ──HTTP Push──► LrWallPaper (Master)
Local folders ────────► (port 5282)                      (port 5281)
                                                               │
                                                        SQLite persistence
                                                               │
                                                        Gossip sync ──► Peer Master
```

See [`docs/SDD.md`](docs/SDD.md) for the full architecture, API reference, and data schema.

---

## Background Jobs

### Agent

| Job | Default | Description |
|---|---|---|
| `ScanAndPushJob` | Enabled | Periodically scans local directories and pushes metadata to Master |
| `DeviceSyncAppleJob` | Enabled | Imports and archives photos from iOS devices |
| `DeviceSyncGenericJob` | Enabled | Imports and archives photos from removable drives (SD cards) |

### Master

| Job | Default | Description |
|---|---|---|
| `MasterReplicationJob` | Enabled | Gossip-broadcasts new records to Peer Master nodes |
| `BusinessJob` | Commented | Wallpaper rotation — uncomment in `Program.cs` to enable |
| `SyncRemovableJob` | Commented | Device enumeration monitor (superseded by Agent) |

---

## Web API

| Endpoint | Description |
|---|---|
| `POST /api/master/sync` | Receive file metadata batch from Agent |
| `GET /api/master/file-exists?filename=&size=` | Duplicate pre-check (called by Agent) |
| `GET /api/experiment/{days}` | Files captured within the last N days |
| `GET /api/experiment/page?page=&pageSize=` | Paged file records |
| `GET /api/image?path=&agentId=` | Image stream proxy (transparently forwards to Agent) |
| `GET /api/agent` | List all registered Agents |

Use Swagger UI at `http://localhost:5281/swagger` (development mode) to explore all endpoints.

---

## Data Storage

- **Database**: SQLite (`ultrasonic.db`, auto-created on first run)
- **Main table** `file_info`: path, filename, size, MD5, capture time, camera info, source Agent ID
- **Unique constraints**: `fullpath`, `(filepath, filename)`, `(filename, file_md5)`
- **Write strategy**: `INSERT OR REPLACE` (upsert — naturally idempotent)

---

## FAQ

**`FatalPairingException` on iOS connect**  
Select "Trust This Computer" on the device and retry. If it persists, check the cable and Apple Mobile Device drivers.

**Agent is not scanning files**  
Verify `Agent:ScanPaths` directories exist and are accessible. Check the tray icon to confirm scanning is not paused.

**Device import not working**  
Confirm `DeviceSync:AppleImport:ArchiveDirectory` is set and the directory is writable. Check logs at `logs/agent-*.txt`.

**"Access to the cloud file is denied"**  
Expected behavior — the tool skips cloud-synced files that are not downloaded locally.

**Wallpaper not changing**  
Uncomment `BusinessJob` in `src/LrWallPaper/Program.cs` and rebuild. Windows-only feature.

---

## References

- EXIF spec: https://www.media.mit.edu/pia/Research/deepview/exif.html
- MetadataExtractor (.NET): https://github.com/drewnoakes/metadata-extractor-dotnet
- Netimobiledevice: https://github.com/artehe/Netimobiledevice
