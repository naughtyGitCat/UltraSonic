import Foundation

/// Metadata sent alongside the file bytes to POST /api/master/ingest.
struct IngestMetadata {
    let fileName: String
    let cameraMaker: String?
    let cameraModel: String?
    let lensModel: String?
    let captureTime: Date
    let latitude: Double?
    let longitude: Double?
    let sourceType: String
    let agentId: String
}

enum MasterClientError: Error {
    case badURL
    case badResponse(Int)
}

/// Talks directly to the Master node over the LAN (no Windows Agent, no USB).
/// Mirrors the Agent's contract: file-exists precheck, then multipart ingest.
final class MasterClient {
    private let baseURL: String
    private let session: URLSession

    // Local wall-clock, no timezone designator: Master treats it as the capture
    // calendar date (drives the yyyy/yyyy-MM-dd archive folder), matching the
    // EXIF-wall-clock behavior of the Agent path.
    private static let captureFmt: DateFormatter = {
        let f = DateFormatter()
        f.locale = Locale(identifier: "en_US_POSIX")
        f.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        return f
    }()

    init(baseURL: String) {
        self.baseURL = baseURL.hasSuffix("/") ? String(baseURL.dropLast()) : baseURL
        let cfg = URLSessionConfiguration.default
        cfg.timeoutIntervalForRequest = 60
        cfg.timeoutIntervalForResource = 60 * 60 // large videos over WiFi
        cfg.waitsForConnectivity = true
        self.session = URLSession(configuration: cfg)
    }

    /// Dedupe precheck — same endpoint the Agent uses (filename + size).
    func fileExists(filename: String, size: Int64) async -> Bool {
        guard var comps = URLComponents(string: "\(baseURL)/api/master/file-exists") else { return false }
        comps.queryItems = [
            URLQueryItem(name: "filename", value: filename),
            URLQueryItem(name: "size", value: String(size))
        ]
        guard let url = comps.url else { return false }
        do {
            let (data, resp) = try await session.data(from: url)
            guard (resp as? HTTPURLResponse)?.statusCode == 200 else { return false }
            return (try? JSONDecoder().decode([String: Bool].self, from: data))?["exists"] ?? false
        } catch {
            return false
        }
    }

    /// Upload one asset as multipart/form-data, streaming both the body and the file
    /// from disk so neither is ever fully resident in memory.
    func ingest(fileURL: URL, meta: IngestMetadata) async throws {
        guard let url = URL(string: "\(baseURL)/api/master/ingest") else { throw MasterClientError.badURL }

        let boundary = "Boundary-\(UUID().uuidString)"
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")

        // Assemble the multipart body in a temp file.
        let bodyURL = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        FileManager.default.createFile(atPath: bodyURL.path, contents: nil)
        let body = try FileHandle(forWritingTo: bodyURL)
        defer {
            try? body.close()
            try? FileManager.default.removeItem(at: bodyURL)
        }

        func field(_ name: String, _ value: String) {
            body.write(Data("--\(boundary)\r\nContent-Disposition: form-data; name=\"\(name)\"\r\n\r\n\(value)\r\n".utf8))
        }

        field("fileName", meta.fileName)
        if let v = meta.cameraMaker { field("cameraMaker", v) }
        if let v = meta.cameraModel { field("cameraModel", v) }
        if let v = meta.lensModel { field("lensModel", v) }
        field("captureTime", Self.captureFmt.string(from: meta.captureTime))
        if let v = meta.latitude { field("latitude", String(v)) }
        if let v = meta.longitude { field("longitude", String(v)) }
        field("sourceType", meta.sourceType)
        field("agentId", meta.agentId)

        // File part: header, streamed bytes, trailing boundary.
        body.write(Data("--\(boundary)\r\nContent-Disposition: form-data; name=\"file\"; filename=\"\(meta.fileName)\"\r\nContent-Type: application/octet-stream\r\n\r\n".utf8))

        let input = try FileHandle(forReadingFrom: fileURL)
        defer { try? input.close() }
        while true {
            let chunk = input.readData(ofLength: 1 << 20) // 1 MB
            if chunk.isEmpty { break }
            body.write(chunk)
        }
        body.write(Data("\r\n--\(boundary)--\r\n".utf8))
        try? body.close()

        let (_, resp) = try await session.upload(for: req, fromFile: bodyURL)
        guard let http = resp as? HTTPURLResponse else { throw MasterClientError.badResponse(-1) }
        guard (200...299).contains(http.statusCode) else { throw MasterClientError.badResponse(http.statusCode) }
    }
}
