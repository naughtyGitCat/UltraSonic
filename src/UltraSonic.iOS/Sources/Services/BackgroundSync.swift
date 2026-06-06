import BackgroundTasks

/// Opportunistic background catch-up. iOS does NOT allow a persistent service like the
/// Windows Agent — "plug in → auto-push" isn't achievable. This schedules a best-effort
/// BGProcessingTask the OS runs at its discretion (typically on power + WiFi). The primary
/// path remains the foreground "Sync Now" button.
enum BackgroundSync {
    static let taskId = "com.ultrasonic.ios.sync"

    static func register() {
        BGTaskScheduler.shared.register(forTaskWithIdentifier: taskId, using: nil) { task in
            guard let task = task as? BGProcessingTask else { return }
            handle(task)
        }
    }

    static func schedule() {
        let request = BGProcessingTaskRequest(identifier: taskId)
        request.requiresNetworkConnectivity = true
        request.requiresExternalPower = false
        request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)
        try? BGTaskScheduler.shared.submit(request)
    }

    private static func handle(_ task: BGProcessingTask) {
        schedule() // chain the next run

        let work = Task {
            let engine = await SyncEngine()
            await engine.syncNow()
            task.setTaskCompleted(success: true)
        }
        task.expirationHandler = { work.cancel() }
    }
}
