import Foundation

/// Persistent app configuration + incremental-sync high-water mark (UserDefaults-backed).
final class AppSettings {
    static let shared = AppSettings()
    private let defaults = UserDefaults.standard

    private enum Keys {
        static let masterEndpoint = "masterEndpoint"
        static let highWaterMark = "highWaterMark" // last safely-synced creationDate (epoch seconds)
        static let agentId = "agentId"
    }

    /// LAN address of the Master node. Configurable in the UI.
    var masterEndpoint: String {
        get { defaults.string(forKey: Keys.masterEndpoint) ?? "http://10.100.100.11:5281" }
        set { defaults.set(newValue, forKey: Keys.masterEndpoint) }
    }

    /// Logical source id stored on Master (file_info.agent_id). Distinguishes iOS uploads.
    var agentId: String {
        get { defaults.string(forKey: Keys.agentId) ?? "ios" }
        set { defaults.set(newValue, forKey: Keys.agentId) }
    }

    /// Only assets created strictly after this are considered on the next run.
    /// nil = never synced (consider the whole library).
    var highWaterMark: Date? {
        get {
            let t = defaults.double(forKey: Keys.highWaterMark)
            return t > 0 ? Date(timeIntervalSince1970: t) : nil
        }
        set { defaults.set(newValue?.timeIntervalSince1970 ?? 0, forKey: Keys.highWaterMark) }
    }
}
