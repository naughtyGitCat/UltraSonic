import Foundation

/// One catalog row from Master's GET /api/experiment/gallery. Keys are the camelCased
/// FileMD5Entity fields. Only the bits the browser needs are decoded.
struct MediaItem: Identifiable, Decodable {
    let id: Int
    let fileName: String
    let fileFullPath: String
    let agentId: String?
    let cameraModel: String?
    let captureTime: String?
    let fileSize: Int64?

    private static let videoExts: Set<String> = ["mov", "mp4", "avi", "mkv", "mts", "m4v"]

    var isVideo: Bool {
        Self.videoExts.contains((fileName as NSString).pathExtension.lowercased())
    }
}
