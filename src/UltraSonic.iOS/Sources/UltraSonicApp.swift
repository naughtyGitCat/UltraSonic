import SwiftUI

@main
struct UltraSonicApp: App {
    @StateObject private var engine = SyncEngine()

    init() {
        // Reclaim scratch files leaked by a previous crash/jetsam (the storage-bloat fix).
        TempStore.purge()
        // Must be registered before the app finishes launching.
        BackgroundSync.register()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(engine)
                .onAppear { BackgroundSync.schedule() }
        }
    }
}
