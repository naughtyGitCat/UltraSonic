# Cross-Node File Transfer (agent-to-agent, Master-orchestrated)

Moves files physically from one node to another and keeps the catalog
correct. Built when migrating `D:\Photograph\2025` (207 GB / 9150 files)
from BARONCELLI to Z690. The prior `move` endpoints were same-node only.

## Endpoints

- **Agent** `POST /api/agent/receive?path=<targetFullPath>` — streams the
  request body to disk while hashing (atomic `.part` → final), returns
  `{ ok, md5, size, path }`. Multi-GB safe (no full buffering).
- **Master** `POST /api/experiment/transfer`
  `{ SourceRoot, TargetAgentId, TargetRoot, DeleteSource }` — disk-driven
  enumeration of `SourceRoot` (master-local), streams each file to the
  target agent's `/api/agent/receive`, hashes in flight, verifies against
  the agent's returned MD5, re-points the catalog row, then (optionally)
  deletes the source — **only after a verified content match**. Runs in
  the background; `GET /api/experiment/transfer/status` reports progress.

## Why it goes *through the agent* (not SMB admin shares)

Pushing to `\\Z690\J$` (SMB admin share) **does not** reach the same `J:`
the Z690 agent sees. On Z690, the SMB server runs in session 0 (SYSTEM)
whose `J:` mapping differs from the interactive `the2n` session's `J:`
(the real 14 TB `ST16-BACKUPONLY`). A 207 GB push to `\\Z690\J$` landed
on a *different* small volume, filled it (ERROR_DISK_FULL 112), and was
invisible to the agent. The agent runs as `the2n` interactive (Scheduled
Task, Highest), so when **the agent** writes `J:\...` it hits the real
volume. Lesson: **transfer through the agent; never assume `\\host\X$`
maps to the agent's `X:`.** A WinRM-created marker on the agent's real
`J:` was invisible via `\\Z690\J$` — definitive proof of the split.

## Design principle: synchronous catalog mutation, repoint-BEFORE-delete

A migration is a **move**, not a delete. The transfer is the authoritative
actor and must mutate the catalog **synchronously**, in this order per
file:

1. verified copy to target (MD5 match) →
2. `RepointFileAsync(oldPath → newPath, agent → target)` →
3. **then** delete the source.

Repoint-before-delete is load-bearing because of the **tombstone trap**
(below). Do **not** rely on post-migration auto-scan to reconcile.

### The tombstone trap (why pure auto-scan fails)

The Agent has an archive **deletion watcher**: when a file disappears
from the archive dir, Master records a *tombstone*
(`deleted_files`, by filename+size) and drops the catalog row, so a
user-deleted bad shot is not re-imported. `RecordTombstoneByFullPathAsync`
only tombstones if a catalog row still matches the deleted path:

```sql
INSERT INTO deleted_files (...) SELECT ... FROM file_info WHERE fullpath=@0;
-- then DELETE FROM file_info WHERE fullpath=@0  (only if a row matched)
```

- If you **repoint first**, the row is already at the new path when the
  watcher fires on the old path → `WHERE fullpath=@old` matches nothing →
  **no tombstone**. Clean.
- If you **delete without repointing** (or the repoint misses), the
  watcher tombstones the moved file. Then the destination agent's scan
  dedupe treats the tombstone as "already handled" and **skips** it — the
  file is physically on the new node but **permanently absent from the
  catalog**. Auto-scan cannot recover it without first clearing the
  tombstones manually. The tombstone mechanism *actively fights* the
  rescan.

### Cost argument

Repoint is a cheap `UPDATE` — the metadata (md5, capture time, camera)
was already computed during the verified copy. Relying on the
destination agent to rescan re-reads and **re-hashes the entire 207 GB**
on the (often slower) destination disk. Synchronous repoint avoids both
the tombstone fight and the redundant hashing.

## Hybrid: repoint for catalogued, dest-scan for the rest

The source disk may hold files that were **never catalogued** (e.g. CR3
raws the scanner skipped). In the 2025 move, disk had 9150 files but only
6686 were in the catalog. So:

- **Catalogued (6686):** synchronous repoint moves them; on a later dest
  scan they are "already on master" (file-exists by name+size) and
  skipped — no re-hash.
- **Never-catalogued (2464):** no row to repoint; the **destination
  agent's normal scan** registers them on first sight. Requires the dest
  agent's `Agent:ScanPaths` to include the archive root.

So the correct model is **synchronous repoint as the primary path, with
the destination agent's scan as a backstop only for previously
uncatalogued files** — not a full rescan of everything.

## Gotcha: path separator normalization

`Directory.GetFiles` on a forward-slash root yields **mixed-separator**
paths (`D:/Photograph/2025\sub\file`) while the catalog stores backslash
(`D:\Photograph\2025\sub\file`). Without normalizing, `RepointFileAsync`'s
`WHERE fullpath=@src` matches **0 rows** → the repoint silently misses →
the deletion watcher tombstones the move. Fix (commit `6562916`):
`Path.GetFullPath` both source and target before repoint/receive so paths
are OS-canonical and the repoint lands. (This exact bug caused the 2025
move's catalog to be lost and recovered the slow way: clear 6686
tombstones + full Z690 rescan.)

## Migration runbook

1. Confirm target: which **agent** owns the destination volume, and the
   real on-agent path (verify via WinRM on the agent, not via `\\host\X$`).
2. Record a source manifest (file count + total bytes) for verification.
3. `POST /api/experiment/transfer` with `DeleteSource: true` (frees the
   source as it goes). Use forward **or** back slashes — paths are
   normalized — but the catalog match relies on that normalization.
4. Poll `GET /api/experiment/transfer/status` until
   `completed` / `completed_with_errors`. `failed` files keep their
   source (never deleted unverified).
5. Verify: dest file count + total bytes == manifest; no `.part`
   leftovers; catalog rows for the moved tree now show the target
   `agent_id` + new path; no spurious tombstones.
6. If the source had uncatalogued files, ensure the dest agent's
   `ScanPaths` includes the archive root so they get registered.

## Possible future hardening

- Defensively clear any pre-existing tombstone for a moved file's
  name+size during the transfer (belt-and-suspenders; repoint-before-
  delete already prevents new ones).
- Skip re-sending files already present on the target with matching
  size+md5 (resume/idempotency for interrupted transfers).
- A `POST /api/experiment/transfer/stop` to cancel an in-flight run
  (today: restart Master to abort the background task).
