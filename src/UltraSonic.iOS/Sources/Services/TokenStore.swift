import Foundation
import Security

/// Persists the Master JWT in the iOS Keychain (survives app restarts, not in
/// plaintext UserDefaults). The signed-in email is cached in UserDefaults for UI;
/// only the bearer token is secret.
final class TokenStore {
    static let shared = TokenStore()

    private let service = "uk.ngcat.ultrasonic.token"
    private let account = "master-jwt"
    private let emailKey = "loggedInEmail"

    /// Current bearer token, or nil when signed out.
    private(set) var token: String? {
        didSet { /* cached field; source of truth is the Keychain */ }
    }

    /// Email of the signed-in account (for display only).
    var email: String? {
        get { UserDefaults.standard.string(forKey: emailKey) }
        set { UserDefaults.standard.set(newValue, forKey: emailKey) }
    }

    var isLoggedIn: Bool { token?.isEmpty == false }

    private init() {
        token = readKeychain()
    }

    func save(token: String, email: String?) {
        self.token = token
        self.email = email
        writeKeychain(token)
    }

    func clear() {
        token = nil
        email = nil
        deleteKeychain()
    }

    // MARK: - Keychain

    private func baseQuery() -> [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account
        ]
    }

    private func readKeychain() -> String? {
        var q = baseQuery()
        q[kSecReturnData as String] = true
        q[kSecMatchLimit as String] = kSecMatchLimitOne
        var out: AnyObject?
        guard SecItemCopyMatching(q as CFDictionary, &out) == errSecSuccess,
              let data = out as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }

    private func writeKeychain(_ value: String) {
        let data = Data(value.utf8)
        deleteKeychain()
        var q = baseQuery()
        q[kSecValueData as String] = data
        q[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock
        SecItemAdd(q as CFDictionary, nil)
    }

    private func deleteKeychain() {
        SecItemDelete(baseQuery() as CFDictionary)
    }
}
