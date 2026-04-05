# UltraSonic

A distributed local photo / RAW management platform. The **Master-Agent** architecture builds a unified metadata index across multiple Windows machines, with automatic import from iOS devices and removable storage, GPS extraction, MD5 de-duplication, server-side RAW/HEIC conversion, and a React95-style web UI with gallery filters, folder browser, and configuration management.

> Chinese: [README.zh.md](README.zh.md)

---

## Features

### Media Management
- **Gallery with filters**: Browse by camera brand/model, file type, date range, GPS, media type (Photos/Videos)
- **Detail view**: Click any thumbnail for full-size preview with metadata panel (EXIF, GPS, lens, file size)
- **Folder browser**: Tree-view navigation, multi-select files, batch move/delete operations
- **RAW/HEIC support**: Server-side conversion to JPEG via Magick.NET (CR2, CR3, DNG, NEF, ARW, HEIC, etc.)
- **Video thumbnails**: `<video>` tag with `#t=0.5` for first-frame preview

### Distributed Architecture
- **Agent scanning**: Agent nodes periodically scan local folders and push EXIF/GPS metadata + MD5 fingerprints to Master
- **iOS import (iCloud + AFC)**: iCloud for Windows as primary source, USB AFC as supplement for not-yet-synced photos. Fuzzy file-exists check handles iCloud's `(2)` suffix disambiguation across multiple iOS devices
- **Removable storage import**: Auto-detect SD cards/cameras, configurable copy or move transfer mode, screenshot filtering
- **MD5 de-duplication**: `UNIQUE (filename, file_md5)` constraint; Agents pre-check with Master before downloading (with iCloud filename fuzzy matching)
- **Multi-Master Gossip sync**: Eventual-consistency replication via application-layer P2P broadcast
- **Auto agent registration**: Agents register with Master on each scan cycle (actual LAN IP, version, heartbeat)

### Operations
- **Node management**: Health check, version display (git commit hash), rescan trigger, agent delete
- **Configuration UI**: Read/edit Master and Agent `appsettings.json` from the web interface
- **File rename job**: Background task removes duplicate suffixes like `(1)`, `_2` with year/month disambiguation
- **File deletion**: Delete by record ID, removes physical file (local or via Agent) + database record
- **File migration**: Move files between directories or across Agents

### Infrastructure
- **Image proxy**: Master transparently proxies image/video streams from any Agent
- **MCP integration**: Model Context Protocol tool endpoint for AI client integration
- **Windows tray**: Both Agent and Master provide tray icons with pause/resume and startup toggle
- **CI/CD**: GitHub Actions builds MSI installers on every push, auto-creates releases

---

## Requirements

- **OS**: Windows 10 / 11 (64-bit)
- **Runtime**: .NET 10 (self-contained in MSI installer)
- **iOS import**: Trust the computer on the device and maintain USB connection

---

## Quick Start

### Option 1: MSI Installer (Recommended)

Download from [GitHub Releases](https://github.com/naughtyGitCat/UltraSonic/releases):

- `UltraSonic.LrWallPaper.msi` -- Master node
- `UltraSonic.LrWallPaper.Agent.msi` -- Agent node

Install both, then start each program. Open `http://localhost:5281` in your browser.

### Option 2: Build from Source

```powershell
git clone https://github.com/naughtyGitCat/UltraSonic

# Build frontend
cd src/LrWallPaper.React && npm ci && npm run build && cd ../..

# Terminal 1 - Master
cd src/LrWallPaper && dotnet run

# Terminal 2 - Agent
cd src/LrWallPaper.Agent && dotnet run
```

On first run `ultrasonic.db` is created automatically. The Agent auto-generates a persistent `AgentId` on first startup.

---

## Configuration

All settings can be edited from the **Node Config** tab in the web UI, or directly in `appsettings.json`.

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

| Key | Description |
|---|---|
| `AgentId` | Set to `"auto"` to generate and persist a UUID on first run |
| `TransferMode` | `"copy"` (keep source) or `"move"` (delete source after import) |
| `MasterCluster.Peers` | Array of peer Master URLs for Gossip sync |

### iOS Photo Import Strategy

UltraSonic uses **iCloud for Windows as the primary source** and **USB AFC as a supplement**:

1. Install [iCloud for Windows](https://apps.microsoft.com/detail/9PKTQ5699M62) and enable "Download all photos to this PC"
2. Add the iCloud photos directory to `Agent:ScanPaths` (e.g. `"D:\\iCloud Photos\\Photos"`)
3. Agent scans iCloud photos first, indexing them into Master
4. When an iPhone is connected via USB, DeviceSyncAppleJob checks Master before downloading
5. Photos already synced via iCloud are skipped (fuzzy filename matching handles `(2)` suffixes)
6. Only truly new photos (not yet uploaded to iCloud) are pulled via AFC

> **Note**: If "Optimize iPhone Storage" is enabled on your iPhone, AFC will only get compressed thumbnails. Use iCloud for Windows to get full-resolution originals.

---

## Web UI

Three tabs in the React95-style interface:

| Tab | Features |
|---|---|
| **Gallery** | Filter by brand/model/type/source/date/GPS, All/Photos/Videos toggle, infinite scroll, click for detail modal with prev/next navigation and delete |
| **Node Config** | Agent table (IP, port, version, health, heartbeat), Rescan/Delete buttons, Refresh, click row to edit config with Save |
| **Folders** | Tree-view folder browser, file grid with multi-select, Move To dialog, Delete Folder |

---

## API Reference

See [`docs/SDD.md`](docs/SDD.md) for the complete API specification. Key endpoints:

| Endpoint | Description |
|---|---|
| `GET /api/experiment/gallery` | Filtered paginated query (brand, model, type, date, GPS, mediaType) |
| `GET /api/experiment/filters` | Distinct filter option values |
| `GET /api/experiment/folders` | Folder summary list |
| `DELETE /api/experiment/{id}` | Delete file by record ID (disk + DB) |
| `POST /api/experiment/move` | Batch move files |
| `GET /api/agent/status` | All nodes health/version (Master-side check) |
| `GET /api/image?path=&agentId=` | Image/video proxy with RAW-to-JPEG conversion |
| `GET/PUT /api/master/config` | Read/write Master config |
| `GET/PUT /api/agent/{id}/config` | Read/write Agent config (proxied via Master) |

---

## FAQ

**iOS connect fails with `FatalPairingException`**
Select "Trust This Computer" on the device. Check cable and Apple Mobile Device drivers.

**Agent not scanning**
Verify `Agent:ScanPaths` directories exist. Check tray icon to confirm scanning is not paused.

**Photos show as broken images**
RAW/HEIC files require Magick.NET conversion. Ensure the server has started successfully and check logs.

**GPS shows as `-` for existing photos**
GPS extraction was added later. Use the **Rescan** button in Node Config to re-scan and extract GPS data.

**Cannot delete files (500 error)**
The `ultrasonic.db` file in `Program Files` may be read-only. Grant write permission: `icacls "C:\Program Files\UltraSonic\LrWallPaper" /grant Users:F`

---

## References

See [`docs/references.md`](docs/references.md) for development resources referenced during design and implementation.

---

## License

MIT
