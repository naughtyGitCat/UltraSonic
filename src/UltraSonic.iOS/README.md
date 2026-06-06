# UltraSonic.iOS — Companion App

Swift / SwiftUI / PhotoKit companion that pushes **camera-captured** photos & videos
straight to the Master node over the LAN — no Windows Agent, no USB/AFC.

> Background & root-cause analysis: [`docs/ios-companion-app.md`](../../docs/ios-companion-app.md).
> Short version: the AFC-over-USB path full-pulls foreign MOVs just to read metadata
> (mdat-first + AFC has no seek). PhotoKit's `PHAsset.sourceType` lets us judge
> "camera-captured vs received" **on-device for free** and upload only what matters.

## What it does

1. **Authorize** PhotoKit (read/write).
2. **Fetch incrementally** — only `image`/`video` assets with `creationDate >` the stored
   high-water mark, then keep only `sourceType == .typeUserLibrary` (camera-captured;
   excludes iCloud-shared / synced received content).
3. **Dedupe** against Master via `GET /api/master/file-exists?filename&size` *before*
   transferring any bytes.
4. **Upload** new assets via `POST /api/master/ingest` (multipart, streamed from disk).
5. **Advance the high-water mark** only past assets that completed without error
   (a failure is retried next run, never silently skipped).

Master holds no media — it **proxies** the upload to the archive Agent (the storage node;
Master may not even run on the media disk). The Agent writes to `ArchiveDir/yyyy/yyyy-MM-dd/filename`
and pushes the same catalog + archive-history rows as the device-sync path, so iOS uploads are
indistinguishable downstream (and `agent_id` correctly points at the agent that holds the file).

## Build & run (macOS + Xcode required)

The Xcode project is generated from `project.yml` with [XcodeGen](https://github.com/yonyz/XcodeGen)
(the `.xcodeproj` is gitignored — `project.yml` + `Sources/` are the source of truth):

```bash
brew install xcodegen
cd src/UltraSonic.iOS
xcodegen generate
open UltraSonic.iOS.xcodeproj
```

Then in Xcode: select your team under **Signing & Capabilities** (or set `DEVELOPMENT_TEAM`
in `project.yml`), pick your iPhone, and Run.

**No XcodeGen?** Create a new iOS App (SwiftUI) target, add everything under `Sources/`,
and copy the keys from `Sources/Support/Info.plist`
(`NSPhotoLibraryUsageDescription`, `NSAppTransportSecurity.NSAllowsLocalNetworking`,
`BGTaskSchedulerPermittedIdentifiers`, `UIBackgroundModes: processing`).

> This is a Swift/Xcode project — it is intentionally **not** part of `UltraSonic.sln`.

## Signing reality

- **Free Apple ID:** 7-day sideload signature (must re-sign weekly).
- **Apple Developer Program ($99/yr):** 1-year signing + TestFlight.

## Notes / known limitations

- **No always-on sync.** iOS forbids persistent background services. Primary path is the
  foreground **Sync Now** button; `BackgroundSync` adds an opportunistic `BGProcessingTask`
  the OS runs at its discretion (usually on power + WiFi).
- **Capture timezone** is approximated with the device's current timezone (PHAsset exposes
  absolute time, not capture-site wall clock). Fine for syncing your own phone in your own TZ.
- **`PHAssetResource.fileSize`** is read via KVC (no public accessor) for the pre-transfer
  dedupe check.
- **Live Photos** upload as separate HEIC + MOV components; Master pairs them as it already
  does for the Agent path.

## Source layout

```
project.yml                      XcodeGen spec
Sources/
  UltraSonicApp.swift            @main App + BGTask registration
  ContentView.swift              UI: endpoint, Sync Now, progress, log
  Models/AppSettings.swift       endpoint + high-water mark (UserDefaults)
  Services/
    PhotoLibraryService.swift    PHAsset fetch/filter, original-bytes export, EXIF
    MasterClient.swift           file-exists precheck + multipart ingest upload
    SyncEngine.swift             orchestration + progress
    BackgroundSync.swift         BGProcessingTask scheduling
  Support/Info.plist             usage strings, ATS local networking, BG modes
```

## Server side

Endpoints (this monorepo):
- **Master** `src/LrWallPaper/Controllers/MobileIngestController.cs` → `POST /api/master/ingest`
  (multipart: `file` + `fileName`, `cameraMaker`, `cameraModel`, `lensModel`, `captureTime`,
  `latitude`, `longitude`, `sourceType`). Dedupe-guards against the catalog, then **streams the
  upload through to the archive Agent** — Master never writes media to its own disk. Picks the
  Agent via `UltraSonic:MobileIngest:TargetAgentId` (or the sole registered Agent).
- **Agent** `src/LrWallPaper.Agent/Program.cs` → `POST /api/agent/ingest`. Archives to
  `DeviceSync:AppleImport:ArchiveDirectory` (`yyyy/yyyy-MM-dd/filename`, same collision rule as the
  device-sync jobs), computes MD5, and pushes metadata via the normal `/api/master/sync` +
  `/api/master/archive-history` contract.
