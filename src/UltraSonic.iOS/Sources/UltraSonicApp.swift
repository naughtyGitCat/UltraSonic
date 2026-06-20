import SwiftUI

@main
struct UltraSonicApp: App {
    @StateObject private var engine = SyncEngine()
    @StateObject private var auth = AuthState()

    init() {
        // Reclaim scratch files leaked by a previous crash/jetsam (the storage-bloat fix).
        TempStore.purge()
        // Must be registered before the app finishes launching.
        BackgroundSync.register()
    }

    var body: some Scene {
        WindowGroup {
            Group {
                switch auth.status {
                case .unknown:
                    ProgressView("Connecting…")
                case .needsLogin:
                    LoginView()
                case .open, .signedIn:
                    ContentView()
                        .onAppear { BackgroundSync.schedule() }
                }
            }
            .environmentObject(engine)
            .environmentObject(auth)
            .task { await auth.bootstrap() }
        }
    }
}
