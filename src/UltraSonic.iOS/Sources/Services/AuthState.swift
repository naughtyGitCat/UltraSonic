import Foundation
import SwiftUI

extension Notification.Name {
    /// Posted by the sync engine when Master returns 401 (token expired).
    static let ultrasonicSessionExpired = Notification.Name("ultrasonicSessionExpired")
}

/// App-wide authentication gate. On launch it probes the Master:
///   - auth disabled (homelab)      -> .open      (no login screen)
///   - auth enabled + valid token   -> .signedIn
///   - auth enabled + no/expired    -> .needsLogin
@MainActor
final class AuthState: ObservableObject {
    enum Status: Equatable {
        case unknown        // still probing
        case open           // server has auth disabled
        case needsLogin
        case signedIn
    }

    @Published var status: Status = .unknown
    @Published var email: String? = TokenStore.shared.email

    /// Whether a login screen should be shown. .open never gates.
    var requiresLogin: Bool { status == .needsLogin }

    init() {
        NotificationCenter.default.addObserver(
            forName: .ultrasonicSessionExpired, object: nil, queue: .main
        ) { [weak self] _ in
            Task { @MainActor in self?.sessionExpired() }
        }
    }

    private var endpoint: String { AppSettings.shared.masterEndpoint }

    /// Decide the initial gate state. Called on launch and after the server URL changes.
    func bootstrap() async {
        let client = MasterClient(baseURL: endpoint)
        let required = await client.authRequired()
        if !required {
            status = .open
            return
        }
        if let user = await client.me() {
            email = user.email
            status = .signedIn
        } else {
            status = .needsLogin
        }
    }

    func login(email: String, password: String) async throws {
        let client = MasterClient(baseURL: endpoint, token: nil)
        let user = try await client.login(email: email, password: password)
        self.email = user.email
        status = .signedIn
    }

    func register(email: String, password: String) async throws {
        let client = MasterClient(baseURL: endpoint, token: nil)
        let user = try await client.register(email: email, password: password)
        self.email = user.email
        status = .signedIn
    }

    func logout() {
        TokenStore.shared.clear()
        email = nil
        status = .needsLogin
    }

    /// Called when a request comes back 401 (token expired) — drop to the login screen.
    func sessionExpired() {
        TokenStore.shared.clear()
        email = nil
        if status != .open { status = .needsLogin }
    }
}
