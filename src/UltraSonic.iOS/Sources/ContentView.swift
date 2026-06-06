import SwiftUI

struct ContentView: View {
    @EnvironmentObject var engine: SyncEngine
    @State private var endpoint = AppSettings.shared.masterEndpoint

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
