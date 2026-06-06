import SwiftUI
import AVKit

/// Browse the whole Master library as a thumbnail grid. Images load as original bytes
/// (convert=false → no server-side HEIC→JPEG; UIImage decodes HEIC natively). Paged,
/// lazily — only visible cells fetch. Tap for a full-screen image or video player.
struct BrowseView: View {
    let baseURL: String

    @State private var items: [MediaItem] = []
    @State private var page = 1
    @State private var loading = false
    @State private var reachedEnd = false

    private let pageSize = 60
    private var client: MasterClient { MasterClient(baseURL: baseURL) }
    private let columns = [GridItem(.adaptive(minimum: 110), spacing: 2)]

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 2) {
                ForEach(items) { item in
                    NavigationLink {
                        MediaDetailView(baseURL: baseURL, item: item)
                    } label: {
                        Thumbnail(url: client.imageURL(for: item), isVideo: item.isVideo)
                    }
                    .buttonStyle(.plain)
                    .onAppear { if item.id == items.last?.id { loadMore() } }
                }
            }
            .padding(2)

            if loading {
                ProgressView().padding()
            } else if items.isEmpty {
                Text("No media found")
                    .foregroundStyle(.secondary)
                    .padding(.top, 80)
            }
        }
        .navigationTitle("Library")
        .navigationBarTitleDisplayMode(.inline)
        .task { if items.isEmpty { loadMore() } }
    }

    private func loadMore() {
        guard !loading, !reachedEnd else { return }
        loading = true
        Task {
            let batch = await client.gallery(page: page, pageSize: pageSize)
            items.append(contentsOf: batch)
            reachedEnd = batch.count < pageSize
            page += 1
            loading = false
        }
    }
}

/// A single grid cell. AsyncImage streams the original; a play badge marks videos.
private struct Thumbnail: View {
    let url: URL?
    let isVideo: Bool

    var body: some View {
        ZStack {
            Color(.secondarySystemBackground)
            AsyncImage(url: url) { phase in
                switch phase {
                case .success(let image): image.resizable().scaledToFill()
                case .failure: Image(systemName: "exclamationmark.triangle").foregroundStyle(.secondary)
                case .empty: ProgressView()
                @unknown default: EmptyView()
                }
            }
            if isVideo {
                Image(systemName: "play.circle.fill")
                    .font(.title2)
                    .foregroundStyle(.white)
                    .shadow(radius: 2)
            }
        }
        .frame(height: 110)
        .frame(maxWidth: .infinity)
        .clipped()
    }
}

/// Full-screen view: zoomable image, or an inline player for video.
struct MediaDetailView: View {
    let baseURL: String
    let item: MediaItem

    private var client: MasterClient { MasterClient(baseURL: baseURL) }

    var body: some View {
        Group {
            if let url = client.imageURL(for: item) {
                if item.isVideo {
                    VideoPlayer(player: AVPlayer(url: url))
                } else {
                    ScrollView([.horizontal, .vertical]) {
                        AsyncImage(url: url) { phase in
                            switch phase {
                            case .success(let image): image.resizable().scaledToFit()
                            case .failure:
                                Image(systemName: "exclamationmark.triangle").font(.largeTitle).foregroundStyle(.secondary)
                            case .empty:
                                ProgressView()
                            @unknown default: EmptyView()
                            }
                        }
                    }
                }
            } else {
                Text("Unavailable").foregroundStyle(.secondary)
            }
        }
        .navigationTitle(item.fileName)
        .navigationBarTitleDisplayMode(.inline)
    }
}
