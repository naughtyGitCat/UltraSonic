import SwiftUI

/// Shown when the Master has auth enabled and there is no valid session.
/// Lets the user point at a Master, then sign in or register (first account = admin).
struct LoginView: View {
    @EnvironmentObject var auth: AuthState

    @State private var server = AppSettings.shared.masterEndpoint
    @State private var email = TokenStore.shared.email ?? ""
    @State private var password = ""
    @State private var isRegister = false
    @State private var busy = false
    @State private var errorText: String?

    var body: some View {
        NavigationStack {
            Form {
                Section("Server") {
                    TextField("https://photos.example.com", text: $server)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .keyboardType(.URL)
                }
                Section(isRegister ? "Create account" : "Sign in") {
                    TextField("Email", text: $email)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .keyboardType(.emailAddress)
                    SecureField("Password", text: $password)
                }
                if let errorText {
                    Text(errorText).foregroundStyle(.red).font(.footnote)
                }
                Section {
                    Button(action: submit) {
                        HStack {
                            if busy { ProgressView().padding(.trailing, 4) }
                            Text(isRegister ? "Register" : "Sign in")
                        }
                    }
                    .disabled(busy || email.isEmpty || password.isEmpty || server.isEmpty)

                    Button(isRegister ? "Have an account? Sign in"
                                      : "No account? Register") {
                        isRegister.toggle()
                        errorText = nil
                    }
                    .font(.footnote)
                }
            }
            .navigationTitle("UltraSonic")
        }
    }

    private func submit() {
        errorText = nil
        busy = true
        // Persist the server choice before we authenticate against it.
        AppSettings.shared.masterEndpoint = server.trimmingCharacters(in: .whitespaces)
        Task {
            defer { busy = false }
            do {
                if isRegister {
                    try await auth.register(email: email, password: password)
                } else {
                    try await auth.login(email: email, password: password)
                }
            } catch MasterClientError.unauthorized {
                errorText = "Invalid email or password."
            } catch let MasterClientError.badResponse(code) {
                errorText = code == 409 ? "That email is already registered."
                      : code == 400 ? "Password must be at least 6 characters."
                      : "Server error (\(code))."
            } catch {
                errorText = "Could not reach the server."
            }
        }
    }
}
