import SwiftUI

@main
struct UltraSonicApp: App {
    @StateObject private var engine = SyncEngine()

    init() {
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
