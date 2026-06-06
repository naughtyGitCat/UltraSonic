import Foundation
import Photos

/// Orchestrates a sync run: authorize → fetch new camera assets → dedupe → upload,
/// advancing the high-water mark only past assets that completed without error
/// (so a failure is retried next run, never skipped).
@MainActor
final class SyncEngine: ObservableObject {
    @Published var isRunning = false
    @Published var status = "Idle"
    @Published var total = 0
    @Published var uploaded = 0
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

        total = 0; uploaded = 0; skipped = 0; failed = 0
        status = "Requesting photo access…"

        guard await photos.requestAuthorization() else {
            status = "Photo access denied"
            append("❌ Photo library access denied")
            return
        }

        let settings = AppSettings.shared
        let client = MasterClient(baseURL: settings.masterEndpoint)
        let mark = settings.highWaterMark

        status = "Scanning library…"
        let assets = photos.fetchNewCameraAssets(since: mark)
        total = assets.count
        append("Found \(assets.count) new camera asset(s) since \(mark.map(Self.fmt.string(from:)) ?? "the beginning")")

        var safeMark = mark
        var frozen = false // once an asset fails, stop advancing so it's retried next run

        for asset in assets {
            if Task.isCancelled { break }
            guard let media = photos.describe(asset) else {
                failed += 1; frozen = true
                continue
            }
            status = "Processing \(media.originalFilename)"

            // Cheap dedupe before any byte transfer.
            if media.fileSize > 0,
               await client.fileExists(filename: media.originalFilename, size: media.fileSize) {
                skipped += 1
                if !frozen { advance(&safeMark, asset.creationDate) }
                continue
            }

            do {
                let fileURL = try await photos.exportToTempFile(media)
                defer { try? FileManager.default.removeItem(at: fileURL) }

                var maker: String? = "Apple"
                var model: String?
                var lens: String?
                if asset.mediaType == .image {
                    let info = photos.readImageCameraInfo(fileURL)
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
                append("⬆️ \(media.originalFilename)")
                if !frozen { advance(&safeMark, asset.creationDate) }
            } catch {
                // A Stop request cancels the in-flight upload — don't count it as a
                // failure; just break so it's retried next run.
                if Task.isCancelled { break }
                failed += 1
                frozen = true
                append("❌ \(media.originalFilename): \(error.localizedDescription)")
            }
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
