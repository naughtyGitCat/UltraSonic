import Foundation

/// Single scratch directory for all transient files (exported originals + assembled
/// multipart bodies). iOS can jetsam the app mid-sync before the per-file `defer`
/// cleanup runs, leaving multi-GB temp files behind — and it never purges the app's
/// temp dir on its own. So we keep everything here and purge it on launch and at the
/// start of every sync to reclaim anything a previous crash leaked.
enum TempStore {
    static let dir: URL = {
        let d = FileManager.default.temporaryDirectory.appendingPathComponent("UltraSonicScratch", isDirectory: true)
        try? FileManager.default.createDirectory(at: d, withIntermediateDirectories: true)
        return d
    }()

    /// A unique scratch file URL with the given extension.
    static func file(ext: String = "") -> URL {
        let name = UUID().uuidString
        let u = dir.appendingPathComponent(name)
        return ext.isEmpty ? u : u.appendingPathExtension(ext)
    }

    /// Delete everything in the scratch dir. Safe to call when no sync is running.
    static func purge() {
        let fm = FileManager.default

        // Current location: the whole scratch dir.
        if let files = try? fm.contentsOfDirectory(at: dir, includingPropertiesForKeys: nil) {
            for f in files { try? fm.removeItem(at: f) }
        }

        // Legacy reclaim: earlier builds wrote temp files directly into temporaryDirectory
        // named after a UUID (export "<uuid>.<ext>", multipart body "<uuid>"). A jetsam
        // mid-sync leaked those, bloating app storage. Remove only UUID-named entries so
        // we don't touch anything else the system keeps in temp.
        let root = fm.temporaryDirectory
        if let files = try? fm.contentsOfDirectory(at: root, includingPropertiesForKeys: nil) {
            for f in files where UUID(uuidString: f.deletingPathExtension().lastPathComponent) != nil {
                try? fm.removeItem(at: f)
            }
        }
    }
}
