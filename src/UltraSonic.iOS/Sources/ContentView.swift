import SwiftUI

struct ContentView: View {
    @EnvironmentObject var engine: SyncEngine
    @State private var endpoint = AppSettings.shared.masterEndpoint

    enum Health { case unknown, checking, healthy, down }
    @State private var health: Health = .unknown

    var body: some View {
        NavigationStack {
            Form {
                Section("Master Server") {
                    TextField("http://10.100.100.11:5281", text: $endpoint)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .keyboardType(.URL)
                        .onChange(of: endpoint) { newValue in
                            AppSettings.shared.masterEndpoint = newValue
                            health = .unknown   // endpoint changed — stale until re-checked
                        }
                        .onSubmit { checkHealth() }

                    HStack(spacing: 8) {
                        if health == .checking {
                            ProgressView().controlSize(.small)
                        } else {
                            Circle().fill(healthColor).frame(width: 9, height: 9)
                        }
                        Text(healthText).font(.footnote).foregroundStyle(.secondary)
                        Spacer()
                        Button("Check") { checkHealth() }
                            .font(.footnote)
                            .disabled(health == .checking)
                    }
                }

                Section("Sync") {
                    if engine.isRunning {
                        Button(role: .destructive) {
                            engine.stop()
                        } label: {
                            Label("Stop", systemImage: "stop.circle")
                        }
                    } else {
                        Button {
                            engine.start()
                        } label: {
                            Label("Sync Now", systemImage: "arrow.triangle.2.circlepath")
                        }
                        Button {
                            engine.resyncAll()
                        } label: {
                            Label("Re-scan All (backfill)", systemImage: "arrow.clockwise")
                        }
                        .foregroundStyle(.secondary)
                    }

                    if engine.total > 0 {
                        ProgressView(
                            value: Double(min(engine.processed, engine.total)),
                            total: Double(engine.total)
                        )
                    }

                    HStack {
                        stat("Uploaded", engine.uploaded, .green)
                        stat("On server", engine.skippedExisting, .secondary)
                        stat("Filtered", engine.skippedFiltered, .secondary)
                        stat("Failed", engine.failed, .red)
                    }

                    VStack(alignment: .leading, spacing: 2) {
                        if !engine.currentDate.isEmpty {
                            Text(engine.currentDate)
                                .font(.footnote.monospacedDigit())
                                .foregroundStyle(.primary)
                        }
                        Text(engine.status)
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                            .truncationMode(.middle)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)

                    if let last = engine.lastSync {
                        Text("Last sync: \(last.formatted())")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }

                Section("Library") {
                    NavigationLink {
                        BrowseView(baseURL: endpoint)
                    } label: {
                        Label("Browse Library", systemImage: "photo.on.rectangle")
                    }
                    NavigationLink {
                        TombstonesView(baseURL: endpoint)
                    } label: {
                        Label("Deleted (won't re-upload)", systemImage: "trash.slash")
                    }
                }

                Section("Log") {
                    if engine.log.isEmpty {
                        Text("No activity yet").foregroundStyle(.secondary)
                    } else {
                        ForEach(engine.log, id: \.self) { line in
                            Text(line).font(.system(.caption, design: .monospaced))
                        }
                    }
                }
            }
            .navigationTitle("UltraSonic")
            .onAppear { checkHealth() }
        }
    }

    private var healthColor: Color {
        switch health {
        case .healthy: return .green
        case .down: return .red
        case .checking, .unknown: return .secondary
        }
    }

    private var healthText: String {
        switch health {
        case .unknown: return "Master status unknown"
        case .checking: return "Checking Master…"
        case .healthy: return "Master reachable"
        case .down: return "Master unreachable"
        }
    }

    /// Probe GET /api/health; ignore the result if the endpoint changed mid-flight.
    private func checkHealth() {
        let target = endpoint
        guard !target.isEmpty else { health = .unknown; return }
        health = .checking
        Task {
            let ok = await MasterClient(baseURL: target).health()
            if target == endpoint { health = ok ? .healthy : .down }
        }
    }

    private func stat(_ label: String, _ value: Int, _ color: Color) -> some View {
        VStack(spacing: 2) {
            Text(value, format: .number)
                .font(.title3).bold().foregroundStyle(color)
                .lineLimit(1)
                .minimumScaleFactor(0.5)   // shrink to fit instead of wrapping (e.g. 12,368)
            Text(label)
                .font(.caption2).foregroundStyle(.secondary)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .frame(maxWidth: .infinity)
    }
}
