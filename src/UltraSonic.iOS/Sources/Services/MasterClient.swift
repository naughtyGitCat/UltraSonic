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
    case unauthorized
}

/// The signed-in account, as returned by /api/auth/{login,register,me}.
struct AuthUser: Decodable {
    let id: Int
    let email: String
    let role: String
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

    /// Bearer token for Authorization headers. Defaults to the stored token so every
    /// ad-hoc MasterClient() picks up the current session without threading it through.
    private let token: String?

    init(baseURL: String, token: String? = TokenStore.shared.token) {
        self.baseURL = baseURL.hasSuffix("/") ? String(baseURL.dropLast()) : baseURL
        self.token = token
        let cfg = URLSessionConfiguration.default
        cfg.timeoutIntervalForRequest = 60
        cfg.timeoutIntervalForResource = 60 * 60 // large videos over WiFi
        cfg.waitsForConnectivity = true
        self.session = URLSession(configuration: cfg)
    }

    /// Attach the bearer token (no-op when signed out / auth disabled).
    private func authorize(_ req: inout URLRequest) {
        if let token { req.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization") }
    }

    /// GET helper that carries the Authorization header.
    private func authedData(from url: URL) async throws -> (Data, URLResponse) {
        var req = URLRequest(url: url)
        authorize(&req)
        return try await session.data(for: req)
    }

    /// Liveness check against GET /api/health. Uses a short-timeout, fail-fast session
    /// (the main session has waitsForConnectivity + a long timeout for large uploads,
    /// which would make a health probe hang when Master is down). True only on HTTP 200
    /// with status "healthy".
    func health() async -> Bool {
        guard let url = URL(string: "\(baseURL)/api/health") else { return false }
        let cfg = URLSessionConfiguration.ephemeral
        cfg.timeoutIntervalForRequest = 5
        cfg.timeoutIntervalForResource = 5
        cfg.waitsForConnectivity = false
        let probe = URLSession(configuration: cfg)
        do {
            let (data, resp) = try await probe.data(from: url)
            guard (resp as? HTTPURLResponse)?.statusCode == 200 else { return false }
            if let obj = try? JSONDecoder().decode([String: String].self, from: data),
               let status = obj["status"] {
                return status.lowercased() == "healthy"
            }
            return true // 200 but unrecognized body — still reachable
        } catch {
            return false
        }
    }

    /// Browse the Master catalog (newest first), one page at a time.
    func gallery(page: Int, pageSize: Int) async -> [MediaItem] {
        guard var comps = URLComponents(string: "\(baseURL)/api/experiment/gallery") else { return [] }
        comps.queryItems = [
            URLQueryItem(name: "page", value: String(page)),
            URLQueryItem(name: "pageSize", value: String(pageSize))
        ]
        guard let url = comps.url else { return [] }
        do {
            let (data, resp) = try await authedData(from: url)
            guard (resp as? HTTPURLResponse)?.statusCode == 200 else { return [] }
            return (try? JSONDecoder().decode([MediaItem].self, from: data)) ?? []
        } catch {
            return []
        }
    }

    /// URL to fetch an item's bytes through Master. `convert=false` makes Master/Agent
    /// skip the HEIC/RAW→JPEG step and return the original — iOS decodes HEIC natively,
    /// so we save the server-side conversion and serve the full-quality original.
    /// AsyncImage can't send an Authorization header, so the token rides as a query param.
    func imageURL(for item: MediaItem) -> URL? {
        guard var comps = URLComponents(string: "\(baseURL)/api/image") else { return nil }
        var items = [
            URLQueryItem(name: "path", value: item.fileFullPath),
            URLQueryItem(name: "agentId", value: item.agentId ?? "local"),
            URLQueryItem(name: "convert", value: "false")
        ]
        if let token { items.append(URLQueryItem(name: "access_token", value: token)) }
        comps.queryItems = items
        return comps.url
    }

    /// Deletion tombstones (deleted archive files that are blocked from re-uploading).
    func tombstones(page: Int = 1, pageSize: Int = 500) async -> [Tombstone] {
        guard var comps = URLComponents(string: "\(baseURL)/api/master/tombstones") else { return [] }
        comps.queryItems = [
            URLQueryItem(name: "page", value: String(page)),
            URLQueryItem(name: "pageSize", value: String(pageSize))
        ]
        guard let url = comps.url else { return [] }
        struct Wrap: Decodable { let items: [Tombstone] }
        do {
            let (data, resp) = try await authedData(from: url)
            guard (resp as? HTTPURLResponse)?.statusCode == 200 else { return [] }
            return (try? JSONDecoder().decode(Wrap.self, from: data))?.items ?? []
        } catch {
            return []
        }
    }

    /// Restore (un-tombstone) one file by id — it becomes eligible to re-upload again.
    func restoreTombstone(id: Int) async -> Bool {
        await delete("\(baseURL)/api/master/tombstones/\(id)")
    }

    /// Clear all tombstones (e.g. before a full data-loss re-upload).
    func clearTombstones() async -> Bool {
        await delete("\(baseURL)/api/master/tombstones")
    }

    private func delete(_ urlString: String) async -> Bool {
        guard let url = URL(string: urlString) else { return false }
        var req = URLRequest(url: url)
        req.httpMethod = "DELETE"
        authorize(&req)
        do {
            let (_, resp) = try await session.data(for: req)
            return (200...299).contains((resp as? HTTPURLResponse)?.statusCode ?? 0)
        } catch {
            return false
        }
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
            let (data, resp) = try await authedData(from: url)
            guard (resp as? HTTPURLResponse)?.statusCode == 200 else { return false }
            return (try? JSONDecoder().decode([String: Bool].self, from: data))?["exists"] ?? false
        } catch {
            return false
        }
    }

    /// Upload one asset as multipart/form-data. Small files (in-memory payload) build
    /// the whole body in RAM and upload it — no disk I/O. Large files (on-disk payload)
    /// stream the body through a temp file, hashing through 1 MB chunks each wrapped in
    /// an autoreleasepool so the transient Data buffers don't pile up and OOM the app.
    func ingest(_ payload: UploadPayload, meta: IngestMetadata) async throws {
        guard let url = URL(string: "\(baseURL)/api/master/ingest") else { throw MasterClientError.badURL }

        let boundary = "Boundary-\(UUID().uuidString)"
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        authorize(&req)

        // Build the small fields prefix + the file-part header and the closing footer.
        var prefix = Data()
        func field(_ name: String, _ value: String) {
            prefix.append(Data("--\(boundary)\r\nContent-Disposition: form-data; name=\"\(name)\"\r\n\r\n\(value)\r\n".utf8))
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
        prefix.append(Data("--\(boundary)\r\nContent-Disposition: form-data; name=\"file\"; filename=\"\(meta.fileName)\"\r\nContent-Type: application/octet-stream\r\n\r\n".utf8))
        let footer = Data("\r\n--\(boundary)--\r\n".utf8)

        let resp: URLResponse
        switch payload {
        case .data(let fileData):
            var body = Data()
            body.reserveCapacity(prefix.count + fileData.count + footer.count)
            body.append(prefix); body.append(fileData); body.append(footer)
            (_, resp) = try await session.upload(for: req, from: body)

        case .file(let fileURL):
            let bodyURL = TempStore.file()
            FileManager.default.createFile(atPath: bodyURL.path, contents: nil)
            let body = try FileHandle(forWritingTo: bodyURL)
            defer { try? body.close(); try? FileManager.default.removeItem(at: bodyURL) }
            try body.write(contentsOf: prefix)

            let input = try FileHandle(forReadingFrom: fileURL)
            defer { try? input.close() }
            while try autoreleasepool(invoking: { () -> Bool in
                guard let chunk = try input.read(upToCount: 1 << 20), !chunk.isEmpty else { return false }
                try body.write(contentsOf: chunk)
                return true
            }) {}
            try body.write(contentsOf: footer)
            try? body.close()

            (_, resp) = try await session.upload(for: req, fromFile: bodyURL)
        }

        guard let http = resp as? HTTPURLResponse else { throw MasterClientError.badResponse(-1) }
        if http.statusCode == 401 { throw MasterClientError.unauthorized }
        guard (200...299).contains(http.statusCode) else { throw MasterClientError.badResponse(http.statusCode) }
    }

    // MARK: - Auth

    private struct AuthResponse: Decodable { let token: String; let user: AuthUser }

    /// True if the Master requires authentication (Auth:Enabled). Read off /api/health.
    /// Falls back to false (open) when unreachable so we don't gate a homelab behind login.
    func authRequired() async -> Bool {
        guard let url = URL(string: "\(baseURL)/api/health") else { return false }
        let cfg = URLSessionConfiguration.ephemeral
        cfg.timeoutIntervalForRequest = 5
        let probe = URLSession(configuration: cfg)
        struct Health: Decodable { let authEnabled: Bool? }
        do {
            let (data, _) = try await probe.data(from: url)
            return (try? JSONDecoder().decode(Health.self, from: data))?.authEnabled ?? false
        } catch {
            return false
        }
    }

    func login(email: String, password: String) async throws -> AuthUser {
        try await credentials(path: "login", email: email, password: password)
    }

    func register(email: String, password: String) async throws -> AuthUser {
        try await credentials(path: "register", email: email, password: password)
    }

    private func credentials(path: String, email: String, password: String) async throws -> AuthUser {
        guard let url = URL(string: "\(baseURL)/api/auth/\(path)") else { throw MasterClientError.badURL }
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try JSONEncoder().encode(["email": email, "password": password])
        let (data, resp) = try await session.data(for: req)
        let code = (resp as? HTTPURLResponse)?.statusCode ?? -1
        if code == 401 { throw MasterClientError.unauthorized }
        guard (200...299).contains(code) else { throw MasterClientError.badResponse(code) }
        let decoded = try JSONDecoder().decode(AuthResponse.self, from: data)
        TokenStore.shared.save(token: decoded.token, email: decoded.user.email)
        return decoded.user
    }

    /// Validate the stored token; returns the user or nil if it's missing/expired.
    func me() async -> AuthUser? {
        guard token != nil, let url = URL(string: "\(baseURL)/api/auth/me") else { return nil }
        do {
            let (data, resp) = try await authedData(from: url)
            guard (resp as? HTTPURLResponse)?.statusCode == 200 else { return nil }
            return try? JSONDecoder().decode(AuthUser.self, from: data)
        } catch {
            return nil
        }
    }
}
