import Foundation
import Photos

/// Orchestrates a sync run: authorize → fetch new camera assets → dedupe → upload,
/// advancing the high-water mark only past assets that completed without error
/// (so a failure is retried next run, never skipped).
@MainActor
final class SyncEngine: ObservableObject {
    @Published var isRunning = false
    @Published var status = "Idle"
    @Published var total = 0        // assets to consider (a Live Photo is one asset, two files)
    @Published var processed = 0    // assets finished, drives the progress bar
    @Published var uploaded = 0          // files uploaded (Live Photo = 2)
    @Published var skippedExisting = 0   // already on Master (dedupe) — the cross-device skip
    @Published var skippedFiltered = 0   // excluded: not an iPhone capture (non-IMG_ / non-Apple)
    @Published var failed = 0
    @Published var lastSync: Date?
    @Published var log: [String] = []

    private let photos = PhotoLibraryService()
    private var syncTask: Task<Void, Never>?

    /// Start a sync run as a cancellable task (used by the UI "Sync Now" button).
    func start() {
        guard !isRunning else { return }
        syncTask = Task { await syncNow() }
    }

    /// Clear the high-water mark and run a full re-scan. Dedupe skips everything already
    /// on Master and uploads only what's missing — e.g. the paired MOVs of Live Photos
    /// that were uploaded before Live Photo support existed.
    func resyncAll() {
        guard !isRunning else { return }
        AppSettings.shared.highWaterMark = nil
        start()
    }

    /// Request the in-flight run to stop. Cancels the current upload and breaks the
    /// loop at the next asset boundary; already-uploaded assets are kept, the rest
    /// are picked up on the next run (the high-water mark only advanced past successes).
    func stop() {
        syncTask?.cancel()
        if isRunning { status = "Stopping…" }
    }

    func syncNow() async {
        guard !isRunning else { return }
        isRunning = true
        defer { isRunning = false }

        total = 0; processed = 0; uploaded = 0; skippedExisting = 0; skippedFiltered = 0; failed = 0
        TempStore.purge() // reclaim any scratch files a previous crashed/jetsammed run leaked
        status = "Requesting photo access…"

        guard await photos.requestAuthorization() else {
            status = "Photo access denied"
            append("❌ Photo library access denied")
            return
        }

        let settings = AppSettings.shared
        let client = MasterClient(baseURL: settings.masterEndpoint)
        let mark = settings.highWaterMark

        // Fail fast: if Master is unreachable, abort before scanning instead of
        // failing every asset one by one.
        status = "Checking Master…"
        guard await client.health() else {
            status = "Master unreachable — check the server address"
            append("❌ Master unreachable at \(settings.masterEndpoint) — sync aborted")
            return
        }

        status = "Scanning library…"
        // Enumerating the whole library is heavy and synchronous — run it OFF the main
        // actor so it can't freeze the UI (the cause of the long black screen on reopen).
        let assets = await Task.detached(priority: .utility) { [photos] in
            photos.fetchNewCameraAssets(since: mark)
        }.value
        total = assets.count
        append("Found \(assets.count) new camera asset(s) since \(mark.map(Self.fmt.string(from:)) ?? "the beginning")")

        var safeMark = mark
        var frozen = false // once an asset fails, stop advancing so it's retried next run

        outer: for asset in assets {
            if Task.isCancelled { break }

            // Throttle UI updates: a skip-heavy backfill churns thousands of assets fast;
            // updating @Published every file caused a render storm. Update every 25.
            if processed % 25 == 0 { status = "Syncing… \(processed)/\(total)" }

            // Resolve resources off the main actor too (PHAssetResource access is sync).
            // One unit normally; a Live Photo yields two (HEIC still + paired MOV).
            let units = await Task.detached(priority: .utility) { [photos] in
                photos.uploadUnits(for: asset)
            }.value
            if units.isEmpty { failed += 1; frozen = true; processed += 1; continue }

            // Only upload iPhone captures. .typeUserLibrary means "in your library", NOT
            // "shot here" — it also holds AirDrop'd / third-party-app saves / downloads
            // (image-…, qq_pic…, UUIDs) AND non-iPhone gear (DJI / DSLR). Those camera
            // sources come in via the Agent's SD-card scan, not the phone. Cheap IMG_
            // filename pre-filter here; EXIF Make=="Apple" confirms after download.
            if let primary = units.first?.originalFilename, !Self.isDeviceCapture(primary) {
                skippedFiltered += 1
                if !frozen { advance(&safeMark, asset.creationDate) }
                processed += 1
                continue
            }

            var assetOK = true
            for media in units {
                if Task.isCancelled { break outer }

                // Cheap dedupe before any byte transfer.
                if media.fileSize > 0,
                   await client.fileExists(filename: media.originalFilename, size: media.fileSize) {
                    skippedExisting += 1
                    continue
                }

                do {
                    let name = media.originalFilename
                    // Small files come back in memory (no disk I/O); large ones on disk.
                    let payload = try await photos.export(media) { p in
                        Task { @MainActor [weak self] in
                            self?.status = "⬇️ iCloud \(Int(p * 100))% — \(name)"
                        }
                    }
                    defer { if case .file(let u) = payload { try? FileManager.default.removeItem(at: u) } }

                    // EXIF camera info only for the still image; the paired MOV has none.
                    var maker: String? = "Apple"
                    var model: String?
                    var lens: String?
                    if media.resource.type == .photo || media.resource.type == .fullSizePhoto {
                        let info = await Task.detached(priority: .utility) { [photos] in
                            switch payload {
                            case .data(let d): return photos.readImageCameraInfo(d)
                            case .file(let u): return photos.readImageCameraInfo(u)
                            }
                        }.value
                        maker = info.maker ?? "Apple"
                        model = info.model
                        lens = info.lens

                        // Confirm it was shot by an Apple device. The IMG_ name is a cheap
                        // proxy, but Canon also uses IMG_ — drop a confirmed non-Apple maker
                        // (nil/unknown is kept on the IMG_ name's benefit of the doubt).
                        if let mk = info.maker, mk.caseInsensitiveCompare("Apple") != .orderedSame {
                            skippedFiltered += 1
                            append("⤳ not Apple (\(mk)): \(media.originalFilename)")
                            continue
                        }
                    }

                    let meta = IngestMetadata(
                        fileName: media.originalFilename,
                        cameraMaker: maker,
                        cameraModel: model,
                        lensModel: lens,
                        captureTime: media.captureTime,
                        latitude: media.latitude,
                        longitude: media.longitude,
                        sourceType: "userLibrary",
                        agentId: settings.agentId
                    )
                    try await client.ingest(payload, meta: meta)
                    uploaded += 1
                    status = "⬆️ \(media.originalFilename)"
                    append("⬆️ \(media.originalFilename)")
                } catch {
                    // A Stop request cancels the in-flight upload — don't count it as a
                    // failure; just break so it's retried next run.
                    if Task.isCancelled { break outer }
                    failed += 1
                    assetOK = false
                    append("❌ \(media.originalFilename): \(error.localizedDescription)")
                }
            }

            // Advance the mark only for fully-uploaded assets, and only while nothing
            // earlier has failed (a failed asset freezes the mark so it's retried next run).
            if !assetOK { frozen = true }
            if assetOK && !frozen { advance(&safeMark, asset.creationDate) }
            processed += 1
        }

        if let safeMark { settings.highWaterMark = safeMark }
        lastSync = Date()
        let summary = "\(uploaded) uploaded, \(skippedExisting) on-server, \(skippedFiltered) filtered, \(failed) failed"
        if Task.isCancelled {
            status = "Stopped — \(summary)"
            append("⏹ \(status)")
        } else {
            status = "Done — \(summary)"
            append("✅ \(status)")
        }
    }

    /// Cheap pre-transfer gate for "shot by an iPhone": Apple camera captures are
    /// IMG_####.{HEIC,JPG,MOV} (incl. edited IMG_E####, Live Photo IMG_####.MOV).
    /// This app only ingests iPhone captures — DJI drone / DSLR media reach the
    /// archive via the Agent's removable-device (SD card) scan, not the phone, so we
    /// deliberately do NOT whitelist DJI_/DSC here. EXIF Make=="Apple" confirms after
    /// download (catches e.g. a Canon photo that's also named IMG_).
    static func isDeviceCapture(_ filename: String) -> Bool {
        filename.uppercased().hasPrefix("IMG_")
    }

    private func advance(_ mark: inout Date?, _ date: Date?) {
        guard let date else { return }
        if mark == nil || date > mark! { mark = date }
    }

    private func append(_ line: String) {
        log.insert("\(Self.timeFmt.string(from: Date()))  \(line)", at: 0)
        if log.count > 500 { log.removeLast(log.count - 500) }
    }

    private static let timeFmt: DateFormatter = {
        let f = DateFormatter(); f.dateFormat = "HH:mm:ss"; return f
    }()
    private static let fmt: DateFormatter = {
        let f = DateFormatter(); f.dateFormat = "yyyy-MM-dd HH:mm"; return f
    }()
}
