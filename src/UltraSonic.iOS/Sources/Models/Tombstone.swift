import Foundation

/// A deletion tombstone from Master (GET /api/master/tombstones): a file that was
/// removed from the archive and is therefore blocked from re-uploading. "Restoring"
/// one (deleting the tombstone) lets it sync again.
struct Tombstone: Identifiable, Decodable {
    let id: Int
    let fileName: String
    let fileSize: Int64
    let agentId: String?
    let deletedAt: String?
}
