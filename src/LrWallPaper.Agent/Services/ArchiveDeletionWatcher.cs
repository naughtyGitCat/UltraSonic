using System.Collections.Concurrent;
using System.Net.Http.Json;
using LrWallPaper.Agent.Helpers;

namespace LrWallPaper.Agent.Services;

/// <summary>
/// Watches the archive directories. When an archived media file is deleted on disk
/// (e.g. a bad shot removed in Explorer), it records a deletion <b>tombstone</b> on
/// Master so the file is NOT re-uploaded on a later sync — while a full catalog loss
/// still re-uploads everything (the data-loss recovery case, since tombstones live in
/// the same DB).
///
/// Mass-delete guard: a drive going offline surfaces as a flood of Deleted events.
/// We never tombstone when a watched root has vanished, nor when a single drain window
/// exceeds <see cref="MassDeleteThreshold"/> — so one disk hiccup can't tombstone the
/// whole library. (Skipping is safe: the catalog rows simply remain and keep blocking
/// re-upload as before; they're just not cleaned from the gallery.)
/// </summary>
public class ArchiveDeletionWatcher : BackgroundService
{
    private readonly ILogger<ArchiveDeletionWatcher> _logger;
    private readonly IConfiguration _config;
    private readonly HttpClient _http = new(new HttpClientHandler { UseProxy = false });
    private readonly ConcurrentQueue<string> _pending = new();
    private readonly List<FileSystemWatcher> _watchers = new();

    private const int MassDeleteThreshold = 200; // deletes per 3s window above this → assume bulk/drive event

    public ArchiveDeletionWatcher(ILogger<ArchiveDeletionWatcher> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
        _http.ApplyServiceKey(_config);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var roots = new[]
        {
            _config["DeviceSync:AppleImport:ArchiveDirectory"],
            _config["DeviceSync:GenericImport:ArchiveDirectory"]
        }
        .Where(d => !string.IsNullOrWhiteSpace(d) && Directory.Exists(d))
        .Select(d => d!)
        .Distinct()
        .ToList();

        if (roots.Count == 0)
        {
            _logger.LogInformation("ArchiveDeletionWatcher: no archive directories configured/present — not watching.");
            return;
        }

        foreach (var root in roots)
        {
            try
            {
                var w = new FileSystemWatcher(root)
                {
                    IncludeSubdirectories = true,
                    NotifyFilter = NotifyFilters.FileName,
                    InternalBufferSize = 64 * 1024
                };
                w.Deleted += OnDeleted;
                w.Error += (_, e) => _logger.LogWarning(e.GetException(), "ArchiveDeletionWatcher error on {Root}", root);
                w.EnableRaisingEvents = true;
                _watchers.Add(w);
                _logger.LogInformation("ArchiveDeletionWatcher watching {Root}", root);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ArchiveDeletionWatcher failed to watch {Root}", root);
            }
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            try { await Task.Delay(TimeSpan.FromSeconds(3), stoppingToken); }
            catch (OperationCanceledException) { break; }
            await DrainAsync(roots, stoppingToken);
        }

        foreach (var w in _watchers) { try { w.Dispose(); } catch { /* best-effort */ } }
    }

    private void OnDeleted(object sender, FileSystemEventArgs e)
    {
        var path = e.FullPath;
        var name = Path.GetFileName(path);
        var ext = Path.GetExtension(path);
        if (string.IsNullOrEmpty(ext)) return;                       // directories / extensionless
        if (name.StartsWith('.')) return;                            // our temp files (.ingest_*, .sniff_*)
        if (!MediaHelpers.PossibleSuffixes.Contains(ext)) return;    // media only
        if (path.Contains(".apple-tmp") || path.Contains(@"\cache\")) return; // temp/cache subdirs
        _pending.Enqueue(path);
    }

    private async Task DrainAsync(IReadOnlyList<string> roots, CancellationToken ct)
    {
        if (_pending.IsEmpty) return;

        var batch = new List<string>();
        while (_pending.TryDequeue(out var p)) batch.Add(p);
        if (batch.Count == 0) return;

        // A watched root vanished → drive offline, not a real delete. Never tombstone.
        if (roots.Any(r => !Directory.Exists(r)))
        {
            _logger.LogWarning("ArchiveDeletionWatcher: a watched root is missing (drive offline?) — skipping {Count} deletes, no tombstones.", batch.Count);
            return;
        }
        if (batch.Count > MassDeleteThreshold)
        {
            _logger.LogWarning("ArchiveDeletionWatcher: {Count} deletes in one window > {Threshold} guard — skipping tombstones (bulk/abnormal). Catalog rows kept (still block re-upload).", batch.Count, MassDeleteThreshold);
            return;
        }

        var master = (_config["Agent:MasterEndpoint"] ?? "http://localhost:5281").TrimEnd('/');
        var agentId = _config["Agent:AgentId"] ?? "local";
        var tombstoned = 0;
        foreach (var path in batch)
        {
            if (ct.IsCancellationRequested) break;
            try
            {
                var resp = await _http.PostAsJsonAsync($"{master}/api/master/tombstone",
                    new { Path = path, AgentId = agentId }, ct);
                if (resp.IsSuccessStatusCode) tombstoned++;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to record tombstone for {File}", Path.GetFileName(path));
            }
        }
        if (tombstoned > 0)
            _logger.LogInformation("ArchiveDeletionWatcher: recorded {N} deletion tombstone(s).", tombstoned);
    }
}
