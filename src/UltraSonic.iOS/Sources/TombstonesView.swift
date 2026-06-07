import SwiftUI

/// Manage deletion tombstones: files removed from the archive that are blocked from
/// re-uploading. Swipe to Restore one (it can sync again), or Clear all (e.g. as part
/// of a data-loss recovery, before a full re-sync).
struct TombstonesView: View {
    let baseURL: String

    @State private var items: [Tombstone] = []
    @State private var loading = false
    @State private var confirmClear = false

    private var client: MasterClient { MasterClient(baseURL: baseURL) }

    var body: some View {
        List {
            if items.isEmpty && !loading {
                Text("No deleted files — nothing is being blocked from upload.")
                    .foregroundStyle(.secondary)
            }
            ForEach(items) { t in
                VStack(alignment: .leading, spacing: 2) {
                    Text(t.fileName).font(.callout)
                    Text("\(byteText(t.fileSize)) · deleted \(shortDate(t.deletedAt))")
                        .font(.caption).foregroundStyle(.secondary)
                }
                .swipeActions(edge: .trailing) {
                    Button {
                        restore(t)
                    } label: {
                        Label("Restore", systemImage: "arrow.uturn.up")
                    }
                    .tint(.blue)
                }
            }
        }
        .navigationTitle("Deleted (\(items.count))")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            if !items.isEmpty {
                Button("Clear all", role: .destructive) { confirmClear = true }
            }
        }
        .overlay { if loading { ProgressView() } }
        .task { await reload() }
        .refreshable { await reload() }
        .confirmationDialog("Clear all tombstones? Deleted files may re-upload on the next sync.",
                            isPresented: $confirmClear, titleVisibility: .visible) {
            Button("Clear all", role: .destructive) { clearAll() }
            Button("Cancel", role: .cancel) {}
        }
    }

    private func reload() async {
        loading = true
        items = await client.tombstones()
        loading = false
    }

    private func restore(_ t: Tombstone) {
        Task { if await client.restoreTombstone(id: t.id) { items.removeAll { $0.id == t.id } } }
    }

    private func clearAll() {
        Task { if await client.clearTombstones() { items = [] } }
    }

    private func byteText(_ b: Int64) -> String {
        ByteCountFormatter.string(fromByteCount: b, countStyle: .file)
    }

    private func shortDate(_ s: String?) -> String {
        guard let s else { return "?" }
        return String(s.prefix(19)).replacingOccurrences(of: "T", with: " ")
    }
}
