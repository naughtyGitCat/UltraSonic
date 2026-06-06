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
    @Published var uploaded = 0     // files uploaded (Live Photo = 2)
    @Published var skipped = 0
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

        total = 0; processed = 0; uploaded = 0; skipped = 0; failed = 0
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

            // Only upload this-device captures. .typeUserLibrary means "in your library",
            // NOT "shot here" — it still includes AirDrop'd / third-party-app saves /
            // downloads (e.g. "image-2025-09-06-10:01:24-114.jpg"). Apple camera captures
            // are IMG_####.{HEIC,JPG,MOV} (incl. edited IMG_E####). Cheap pre-transfer gate,
            // matching the AFC path's EXIF "shot by this device" intent.
            if let primary = units.first?.originalFilename, !Self.isDeviceCapture(primary) {
                skipped += 1
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
                    skipped += 1
                    continue
                }

                do {
                    let name = media.originalFilename
                    let fileURL = try await photos.exportToTempFile(media) { p in
                        Task { @MainActor [weak self] in
                            self?.status = "⬇️ iCloud \(Int(p * 100))% — \(name)"
                        }
                    }
                    defer { try? FileManager.default.removeItem(at: fileURL) }

                    // EXIF camera info only for the still image; the paired MOV has none.
                    var maker: String? = "Apple"
                    var model: String?
                    var lens: String?
                    if media.resource.type == .photo || media.resource.type == .fullSizePhoto {
                        let info = await Task.detached(priority: .utility) { [photos] in
                            photos.readImageCameraInfo(fileURL)
                        }.value
                        maker = info.maker ?? "Apple"
                        model = info.model
                        lens = info.lens
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
                    try await client.ingest(fileURL: fileURL, meta: meta)
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
        if Task.isCancelled {
            status = "Stopped — \(uploaded) uploaded, \(skipped) skipped, \(failed) failed"
            append("⏹ \(status)")
        } else {
            status = "Done — \(uploaded) uploaded, \(skipped) skipped, \(failed) failed"
            append("✅ \(status)")
        }
    }

    /// True if the filename looks like an Apple on-device camera capture (IMG_1234.HEIC,
    /// edited IMG_E1234, Live Photo IMG_1234.MOV…). Excludes AirDrop'd / third-party /
    /// downloaded saves that also live in .typeUserLibrary but carry other names.
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
