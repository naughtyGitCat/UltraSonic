import Photos
import ImageIO
import CoreLocation

/// A camera-captured asset resolved to everything we need to dedupe + upload.
struct MediaAsset {
    let asset: PHAsset
    let originalFilename: String
    let fileSize: Int64
    let captureTime: Date
    let latitude: Double?
    let longitude: Double?
    let resource: PHAssetResource
}

/// PhotoKit access: authorization, incremental camera-only fetch, original-bytes export,
/// and best-effort EXIF camera info. This is the whole point of the app — judging
/// "camera-captured vs received" on-device (PHAsset.sourceType) so we never transfer
/// AirDrop'd / iCloud-shared content we don't want (the waste the AFC path can't avoid).
/// Stateless, so safe to call from a background task off the main actor
/// (the heavy PhotoKit enumeration must not run on the main thread).
final class PhotoLibraryService: @unchecked Sendable {

    func requestAuthorization() async -> Bool {
        let status = await PHPhotoLibrary.requestAuthorization(for: .readWrite)
        return status == .authorized || status == .limited
    }

    /// New camera-captured image/video assets created after `since`, oldest first.
    func fetchNewCameraAssets(since: Date?) -> [PHAsset] {
        let options = PHFetchOptions()
        options.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: true)]

        var predicates: [NSPredicate] = [
            NSPredicate(format: "mediaType == %d OR mediaType == %d",
                        PHAssetMediaType.image.rawValue,
                        PHAssetMediaType.video.rawValue)
        ]
        if let since {
            predicates.append(NSPredicate(format: "creationDate > %@", since as NSDate))
        }
        options.predicate = NSCompoundPredicate(andPredicateWithSubpredicates: predicates)

        let result = PHAsset.fetchAssets(with: options)
        var assets: [PHAsset] = []
        result.enumerateObjects { asset, _, _ in
            // sourceType is NOT a queryable predicate key, so filter in code.
            // .typeUserLibrary == captured/owned on a device in this library;
            // excludes .typeCloudShared and .typeiTunesSynced (received content).
            if asset.sourceType.contains(.typeUserLibrary) {
                assets.append(asset)
            }
        }
        return assets
    }

    /// The resource(s) to upload for an asset. Normally one (the primary). For a
    /// **Live Photo** it's two — the HEIC still and the paired MOV — uploaded as
    /// separate files; the server pairs them by base name (matching the Agent path).
    func uploadUnits(for asset: PHAsset) -> [MediaAsset] {
        let resources = PHAssetResource.assetResources(for: asset)

        func make(_ resource: PHAssetResource) -> MediaAsset {
            // `fileSize` is exposed only via KVC on PHAssetResource (no public accessor).
            let size = (resource.value(forKey: "fileSize") as? Int64) ?? 0
            return MediaAsset(
                asset: asset,
                originalFilename: resource.originalFilename,
                fileSize: size,
                captureTime: asset.creationDate ?? Date(),
                latitude: asset.location?.coordinate.latitude,
                longitude: asset.location?.coordinate.longitude,
                resource: resource
            )
        }

        // Live Photo → upload both components (still + paired video).
        if asset.mediaSubtypes.contains(.photoLive) {
            let still = resources.first { $0.type == .photo } ?? resources.first { $0.type == .fullSizePhoto }
            let video = resources.first { $0.type == .pairedVideo } ?? resources.first { $0.type == .fullSizePairedVideo }
            let units = [still, video].compactMap { $0 }.map(make)
            if !units.isEmpty { return units }
        }

        let primary = resources.first { $0.type == .photo || $0.type == .video }
            ?? resources.first { $0.type == .fullSizePhoto || $0.type == .fullSizeVideo }
            ?? resources.first
        return primary.map { [make($0)] } ?? []
    }

    /// Stream original bytes to a temp file — safe for multi-GB videos (no full in-memory load).
    /// `onDownloadProgress` fires (0…1) only while the original is being pulled from iCloud
    /// (Optimize Storage placeholder); for an already-local original it isn't called.
    func exportToTempFile(_ media: MediaAsset, onDownloadProgress: ((Double) -> Void)? = nil) async throws -> URL {
        let ext = (media.originalFilename as NSString).pathExtension
        let tmp = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
            .appendingPathExtension(ext)

        FileManager.default.createFile(atPath: tmp.path, contents: nil)
        let handle = try FileHandle(forWritingTo: tmp)

        let opts = PHAssetResourceRequestOptions()
        opts.isNetworkAccessAllowed = true // allow iCloud "Optimize Storage" placeholders to download
        if let onDownloadProgress { opts.progressHandler = onDownloadProgress }

        return try await withCheckedThrowingContinuation { cont in
            PHAssetResourceManager.default().requestData(
                for: media.resource,
                options: opts,
                dataReceivedHandler: { chunk in handle.write(chunk) },
                completionHandler: { error in
                    try? handle.close()
                    if let error {
                        try? FileManager.default.removeItem(at: tmp)
                        cont.resume(throwing: error)
                    } else {
                        cont.resume(returning: tmp)
                    }
                }
            )
        }
    }

    /// Best-effort EXIF Make / Model / LensModel from an image file.
    func readImageCameraInfo(_ url: URL) -> (maker: String?, model: String?, lens: String?) {
        guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
              let props = CGImageSourceCopyPropertiesAtIndex(src, 0, nil) as? [CFString: Any]
        else { return (nil, nil, nil) }

        let tiff = props[kCGImagePropertyTIFFDictionary] as? [CFString: Any]
        let exif = props[kCGImagePropertyExifDictionary] as? [CFString: Any]
        return (
            tiff?[kCGImagePropertyTIFFMake] as? String,
            tiff?[kCGImagePropertyTIFFModel] as? String,
            exif?[kCGImagePropertyExifLensModel] as? String
        )
    }
}
