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
                    }

                    if engine.total > 0 {
                        ProgressView(
                            value: Double(engine.uploaded + engine.skipped + engine.failed),
                            total: Double(engine.total)
                        )
                    }

                    HStack {
                        stat("Uploaded", engine.uploaded, .green)
                        stat("Skipped", engine.skipped, .secondary)
                        stat("Failed", engine.failed, .red)
                    }

                    Text(engine.status)
                        .font(.footnote)
                        .foregroundStyle(.secondary)

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
        VStack {
            Text("\(value)").font(.title3).bold().foregroundStyle(color)
            Text(label).font(.caption2).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
    }
}
