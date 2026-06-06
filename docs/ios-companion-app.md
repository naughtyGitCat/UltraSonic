# UltraSonic iOS Companion App — Design & Handoff

> **Status:** Proposed / not started. Develop on **macOS** (Xcode is macOS-only;
> iOS on-device signing & debugging require it).
> This doc is the cross-machine handoff: clone the repo on the Mac and read this
> for the full background, root-cause analysis, and design before writing code.

## Why this exists (motivation)

The Windows Agent already pulls iOS media over **AFC (Apple File Conduit)
over USB**. That works but is fundamentally wasteful for the way this user's
iPhone is actually populated. Real measured data from a full sync run
(2026-06-06, BARONCELLI, iPhone over USB):

| What happened | Count |
|---|---|
| HEIC photos skipped cheaply via head-EXIF precheck (no full pull) | **1097** ✓ |
| HEIC full-pulled then discarded | 4 |
| **MOV full-pulled then discarded as "not shot by this device"** | **1101** ✗ waste |
| MOV skipped cheaply (moov-first / fast-start) | 86 |
| JPG full-pulled then discarded | 53 |
| MP4 full-pulled then discarded | 5 |
| Native MOVs actually worth archiving (whole device) | **~0** |

The device is a *photo* device: ~1000+ HEIC, essentially **zero** native
camera videos. The 1101 MOVs are AirDrop'd / downloaded / received content the
user does **not** want, but each one was transferred in full (gigabytes over
USB) only to read its metadata and then delete it.

## Root cause (why AFC-pull can't fix it)

The Agent's `DeviceSyncAppleJob` decides "shot by this device?" by reading EXIF
`Make`/`Model`. For that it needs the metadata:

- **HEIC / JPEG**: metadata is near the file head → an existing optimization
  (`TryIsShotByThisDevice`, commit `d78683c`) samples only the first ~2 MB via
  AFC `FileOpen`/`FileRead`(reflection)/`FileClose` and decides without a full
  pull. **This works — HEIC is solved (99.6% handled cheaply).**
- **MOV (QuickTime)**: device metadata lives in the `moov` atom. On this
  device's foreign MOVs the layout is **mdat-first** (`ftyp` then a multi-GB
  `mdat`, with `moov` at the *end*). **AFC has no seek — `FileRead` is
  strictly sequential** — so reaching the tail `moov` means reading through the
  entire `mdat` = same bandwidth as a full pull. Verified empirically; this is a
  hard protocol-level wall, not a missing optimization.

Conclusion: within AFC-over-USB, mdat-first MOV device-detection is
**impossible to do cheaply**. Two viable directions remain:

1. **Per-device media-type allowlist** (small, config-only stopgap — see
   "Interim mitigation" below). Cuts the MOV waste on a known photo-only device.
2. **This iOS companion app** (root-cause-correct, below).

## Why a PhotoKit app is the root-cause-correct fix

iOS's **PhotoKit** (`PHAsset`/`PHPhotoLibrary`) exposes everything we need
**without reading file contents at all**:

- `PHAsset.sourceType` → `.typeUserLibrary` vs `.typeCloudShared` /
  `.typeiTunesSynced` — directly distinguishes camera-captured from received.
- Camera/capture metadata, `creationDate`, location, dimensions, duration,
  `mediaType`, `mediaSubtypes` (e.g. Live Photo, HDR) — all queryable.
- `isFromMyDevice`-style filtering via `PHFetchOptions` predicates.
- iCloud "Optimize Storage" placeholders are explicit: you can detect
  not-downloaded assets and control whether to trigger a download (with real
  progress + cancellation), instead of AFC silently hanging for minutes on a
  placeholder (a real failure mode observed in the AFC path — `afc.Pull()` has
  **no timeout** and blocked ~3 min on an iCloud placeholder MOV).

Net effect: judge on-device for free, transfer **only** the assets that are
actually camera-captured *and* new. For this device that turns "transfer
thousands / keep ~zero MOVs" into "transfer only the genuinely new captures."

## Architecture

```
┌──────────────────────────┐         WiFi / LAN HTTP          ┌────────────────────────┐
│  iOS Companion App        │  ──────────────────────────────▶ │  Master (LrWallPaper)   │
│  (Swift, PhotoKit)        │   POST new camera assets +        │  :5281                  │
│                           │        metadata                   │  existing ingest API    │
│  - PHAsset fetch+filter   │                                   │  /api/master/sync       │
│  - dedupe vs Master       │  ◀── GET /api/master/file-exists  │  (+ new upload endpoint)│
│  - upload only new        │       (filename+size precheck)    │                         │
└──────────────────────────┘                                   └────────────────────────┘
```

- The app talks **directly to Master over the LAN** (no Windows Agent, no USB).
- Reuse the existing dedupe contract: `GET /api/master/file-exists?filename&size`
  before uploading (same one the Agent uses).
- Master needs a **new binary-ingest endpoint** (the current `/api/master/sync`
  only accepts metadata records for files the Agent already placed on disk).
  The app uploads file bytes + metadata; Master writes to the archive dir and
  records the catalog row. Mirror the archive layout the Agent uses:
  `ArchiveDir/YYYY/YYYY-MM-DD/filename`.

## Key technical decisions / requirements

1. **Filter on-device, upload minimally.** `PHFetchOptions` predicate:
   `mediaType == image || video` AND `sourceType == .typeUserLibrary`
   (camera-captured only). Skip shared/synced. This is the whole point — it
   eliminates the AFC waste at the source.
2. **Incremental sync.** Persist a high-water mark (last `creationDate` or a set
   of uploaded `localIdentifier`s) so each run only considers new assets. Don't
   re-enumerate the whole library every time.
3. **Dedupe vs Master.** Before upload, `file-exists` precheck (filename+size).
   Keeps it idempotent and cheap on re-runs.
4. **iOS background reality (must design around).** iOS does **not** allow a
   third-party app to run as a persistent service like the Windows Agent.
   "Plug in → auto-push" is not achievable the way the Agent does it. Realistic
   model: app pushes when **foregrounded**, plus `BGProcessingTask` /
   `BGAppRefreshTask` for opportunistic background catch-up, and/or a
   user-initiated "Sync now" button. Set expectations accordingly.
5. **Network.** Master is LAN-only (`http://10.100.100.11:5281`). App needs the
   Master endpoint configurable. Consider Bonjour/mDNS discovery later;
   hardcode/config first.
6. **Live Photos.** A Live Photo is HEIC + paired MOV. The existing pipeline
   already pairs them (see Agent + Master live-photo handling). Decide whether
   the app uploads both components and lets Master pair, matching current behavior.
7. **HEIC handling.** Upload original HEIC (don't transcode) to match what the
   Agent archives; Master already serves HEIC via on-the-fly conversion.

## Distribution reality (don't skip this)

- **Dev environment:** macOS + Xcode, Swift + PhotoKit. No way around macOS.
- **Signing/install on a non-jailbroken iPhone:**
  - Free Apple ID → 7-day sideload signature (must re-sign weekly), or
  - Apple Developer Program ($99/yr) → 1-year signing, TestFlight option.
- **Background limits:** as above — no always-on service. Plan UX around
  foreground sync + background tasks, not "set and forget."
- **Maintenance:** another surface to track against iOS/Xcode/cert churn.

**When it's worth it:** if syncing from this iPhone is a recurring need, the
app's "transfer only what matters, no USB, no AFC hangs" payoff dominates.
For occasional one-off syncs, the AFC path + the interim mitigation below is
enough.

## Interim mitigation (in the existing AFC path, no new app)

Add an `AppleImport` media-type allowlist so a known photo-only device skips
MOV entirely (eliminating the 1101 full-pulls), while head-EXIF keeps handling
photos efficiently. Sketch:

```jsonc
"DeviceSync": {
  "AppleImport": {
    "TempDirectory": "D:\\Photograph\\.apple-tmp",
    "ArchiveDirectory": "D:\\Photograph",
    "IncludeExtensions": [".heic", ".jpg", ".jpeg"]   // omit video for this device
  }
}
```

`DeviceSyncAppleJob` would filter `MediaHelpers.PossibleSuffixes` by
`IncludeExtensions` when present (default = current behavior, include all).
Re-enable video by adding `.mov`/`.mp4` when you actually need device video.

**Also worth doing regardless (separate robustness fix):** `afc.Pull()` has
**no timeout**. A single iCloud placeholder / AFC hang blocks the whole serial
loop (observed ~3 min stalls; the loop is single-threaded — one `AfcService`
connection is not thread-safe, so parallelism needs one AFC connection per
worker). Wrap `Pull` with a timeout + skip-and-continue so one bad file can't
stall the queue.

## Current system state (context, 2026-06-06)

- Nodes on `1.3.0+5dcba8d` (Master + BARONCELLI Agent); Z690 Agent on
  `1.3.0+60bb81e` (pending alignment to `5dcba8d`).
- Master `http://10.100.100.11:5281`; Agents `:5282`.
- Boot autostart is institutionalized via Scheduled Tasks (`UltraSonic Master`
  / `UltraSonic Agent`, AtStartup+AtLogon, Interactive+Highest, restart-on-fail)
  — see `deploy/deploy.ps1` + `deploy/README.md`. **Not** Windows Services
  (the apps are WinExe + WinForms tray; Session 0 breaks them).
- Apple import currently archives to `D:\Photograph` (`move`/copy per config),
  layout `YYYY/YYYY-MM-DD/filename`.

## Open decisions (resolve before/while building)

- [ ] iOS app: new repo, or `apple/` folder in this monorepo?
- [ ] Apple Developer account ($99/yr) vs 7-day free sideload?
- [ ] Master ingest endpoint shape (multipart upload? chunked? resumable for
      large videos?).
- [ ] Do we keep the AFC path as fallback, or retire it for Apple devices once
      the app exists?
- [ ] Endpoint discovery: hardcoded config first; Bonjour later?
