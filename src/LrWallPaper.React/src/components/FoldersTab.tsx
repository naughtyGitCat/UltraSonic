import { useState, useEffect, useRef } from 'react';
import type { Capture, FilterOptions, FolderSummary } from '../types';
import { toOpts, MediaThumbnail, formatFileSize } from '../utils';
import { Button, Select, TextInput, Checkbox, Modal } from '../ui';
import FolderTree from './FolderTree';

interface Props {
  filterOptions: FilterOptions;
}

interface TransferStatus {
  state: string; total: number; processed: number; moved: number; skipped: number;
  failed: number; movedBytes: number; currentFile?: string | null; failures?: string[];
}

export default function FoldersTab({ filterOptions }: Props) {
  const [folders, setFolders] = useState<FolderSummary[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderSummary | null>(null);
  const [folderFiles, setFolderFiles] = useState<Capture[]>([]);
  const [folderAgent, setFolderAgent] = useState('');
  const [moveTarget, setMoveTarget] = useState('');
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<number>>(new Set());

  // cross-node transfer
  const [showTransfer, setShowTransfer] = useState(false);
  const [agentOpts, setAgentOpts] = useState<{ label: string; value: string }[]>([]);
  const [xSrc, setXSrc] = useState('');
  const [xAgent, setXAgent] = useState('');
  const [xDst, setXDst] = useState('');
  const [xDelete, setXDelete] = useState(true);
  const [xStatus, setXStatus] = useState<TransferStatus | null>(null);
  const pollRef = useRef<number | null>(null);

  const pollStatus = () => {
    fetch('/api/experiment/transfer/status').then(r => r.json()).then(setXStatus).catch(() => {});
  };
  useEffect(() => {
    // load agents (id->name) for the target dropdown
    fetch('/api/agent/status').then(r => r.json()).then((d: Array<{id:string;name:string}>) =>
      setAgentOpts(d.filter(a => a.id !== 'local').map(a => ({ label: `${a.name} (${a.id.slice(0,8)})`, value: a.id })))
    ).catch(() => {});
  }, []);
  useEffect(() => {
    if (!showTransfer) { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } return; }
    pollStatus();
    pollRef.current = window.setInterval(pollStatus, 2000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [showTransfer]);

  const xRunning = xStatus?.state === 'running';

  const fetchFolders = () => {
    const params = folderAgent ? `?agentId=${encodeURIComponent(folderAgent)}` : '';
    fetch(`/api/experiment/folders${params}`).then(r => r.json()).then(setFolders).catch(console.error);
  };

  const fetchFolderFiles = (folder: FolderSummary) => {
    setSelectedFolder(folder);
    setSelectedFileIds(new Set());
    const params = new URLSearchParams({ path: folder.filePath });
    if (folder.agentId) params.set('agentId', folder.agentId);
    fetch(`/api/experiment/folder-files?${params}`).then(r => r.json()).then(setFolderFiles).catch(console.error);
  };

  useEffect(() => { fetchFolders(); /* eslint-disable-next-line */ }, [folderAgent]);

  return (
    <div className="col" style={{ flexGrow: 1, minHeight: 0, gap: 12 }}>
      <div className="toolbar" style={{ flexShrink: 0 }}>
        <div className="field"><label>Source</label>
          <Select options={toOpts(filterOptions.agentIds)} value={folderAgent} onChange={setFolderAgent} width={160} /></div>
        <Button size="sm" onClick={fetchFolders}>Refresh</Button>
        <Button size="sm" onClick={() => {
          const pre = selectedFolder?.filePath || '';
          setXSrc(pre); setXDst(pre.replace(/^[A-Za-z]:/, 'J:')); setShowTransfer(true);
        }}>Transfer to node →</Button>
        {selectedFolder && <>
          <span className="sep" />
          <Button size="sm" variant="primary" onClick={() => setShowMoveDialog(true)} disabled={selectedFileIds.size === 0}>
            Move ({selectedFileIds.size})
          </Button>
          <Button size="sm" variant="danger" onClick={() => {
            if (window.confirm(`Delete all ${selectedFolder.fileCount} files in "${selectedFolder.filePath}"?`))
              fetch(`/api/experiment/folder?path=${encodeURIComponent(selectedFolder.filePath)}&agentId=${selectedFolder.agentId || ''}`, { method: 'DELETE' })
                .then(() => { fetchFolders(); setSelectedFolder(null); setFolderFiles([]); });
          }}>Delete Folder</Button>
        </>}
      </div>

      <div className="row" style={{ flexGrow: 1, minHeight: 0, gap: 12, alignItems: 'stretch' }}>
        <div className="tbl-wrap" style={{ flex: '0 0 340px' }}>
          <FolderTree folders={folders} selectedFolder={selectedFolder} onSelect={fetchFolderFiles} />
        </div>
        <div className="tbl-wrap" style={{ flexGrow: 1, padding: 12 }}>
          {selectedFolder ? (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
              {folderFiles.map(pic => {
                const abs = pic.fileFullPath || `${pic.filePath}\\${pic.fileName}`;
                const src = `/api/image?path=${encodeURIComponent(abs)}&agentId=${pic.agentId || 'local'}`;
                const sel = selectedFileIds.has(pic.id);
                return (
                  <div key={pic.id} className={'thumb' + (sel ? ' sel' : '')}
                    onClick={() => setSelectedFileIds(prev => { const n = new Set(prev); if (n.has(pic.id)) n.delete(pic.id); else n.add(pic.id); return n; })}>
                    <MediaThumbnail src={src} alt={pic.fileName} className="thumb-img" />
                    <div className="thumb-meta"><div className="thumb-name">{pic.fileName}</div></div>
                  </div>
                );
              })}
            </div>
          ) : <div className="faint" style={{ padding: 40, textAlign: 'center' }}>Select a folder</div>}
        </div>
      </div>

      {showTransfer && (
        <Modal title="Transfer folder to another node" onClose={() => setShowTransfer(false)} width="560px">
          <div className="modal-body">
            <div className="col" style={{ gap: 10 }}>
              <div className="field" style={{ justifyContent: 'space-between' }}>
                <label style={{ width: 90 }}>Source path</label>
                <TextInput value={xSrc} onChange={e => setXSrc(e.target.value)}
                  placeholder="D:\Photograph\2025" style={{ flex: 1 }} />
              </div>
              <div className="field" style={{ justifyContent: 'space-between' }}>
                <label style={{ width: 90 }}>Target node</label>
                <Select options={[{ label: '— select agent —', value: '' }, ...agentOpts]}
                  value={xAgent} onChange={setXAgent} />
              </div>
              <div className="field" style={{ justifyContent: 'space-between' }}>
                <label style={{ width: 90 }}>Target path</label>
                <TextInput value={xDst} onChange={e => setXDst(e.target.value)}
                  placeholder="J:\Photograph\2025" style={{ flex: 1 }} />
              </div>
              <Checkbox label="Delete source after verified copy (move)" checked={xDelete} onChange={() => setXDelete(v => !v)} />
              <div className="faint" style={{ fontSize: 11 }}>
                Streams via the target agent with end-to-end MD5 verify. Already-present files
                (same path + size) are skipped, so a stopped transfer resumes by starting again.
              </div>

              {xStatus && xStatus.state !== 'idle' && (
                <div className="card card-2" style={{ marginTop: 4 }}>
                  <div className="row" style={{ justifyContent: 'space-between', fontSize: 12 }}>
                    <span><strong>{xStatus.state}</strong></span>
                    <span className="muted">{xStatus.processed}/{xStatus.total} · moved {xStatus.moved} · skipped {xStatus.skipped} · failed {xStatus.failed} · {formatFileSize(xStatus.movedBytes)}</span>
                  </div>
                  {xStatus.total > 0 && (
                    <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 3, marginTop: 6, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.round(xStatus.processed / xStatus.total * 100)}%`, background: 'var(--accent)' }} />
                    </div>
                  )}
                  {xStatus.currentFile && <div className="faint" style={{ fontSize: 10, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{xStatus.currentFile}</div>}
                  {!!xStatus.failures?.length && <div style={{ fontSize: 10, color: 'var(--danger)', marginTop: 4 }}>{xStatus.failures.length} failure(s): {xStatus.failures[0]}</div>}
                </div>
              )}

              <div className="row" style={{ justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                <Button variant="ghost" onClick={() => setShowTransfer(false)}>Close</Button>
                {xRunning
                  ? <Button variant="danger" onClick={() => {
                      fetch('/api/experiment/transfer/stop', { method: 'POST' }).then(pollStatus);
                    }}>Stop</Button>
                  : <Button variant="primary" disabled={!xSrc || !xAgent || !xDst} onClick={() => {
                      fetch('/api/experiment/transfer', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ SourceRoot: xSrc, TargetAgentId: xAgent, TargetRoot: xDst, DeleteSource: xDelete }) })
                        .then(r => r.json()).then(() => pollStatus())
                        .catch(err => alert('Start failed: ' + err.message));
                    }}>{xStatus && xStatus.state === 'stopped' ? 'Resume' : 'Start'}</Button>}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showMoveDialog && (
        <Modal title="Move Files" onClose={() => setShowMoveDialog(false)} width="440px">
          <div className="modal-body">
            <p className="muted" style={{ marginBottom: 10 }}>Move {selectedFileIds.size} files to:</p>
            <TextInput value={moveTarget} onChange={e => setMoveTarget(e.target.value)}
              placeholder="D:\Photos\Archive" style={{ width: '100%', marginBottom: 14 }} />
            <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
              <Button variant="ghost" onClick={() => setShowMoveDialog(false)}>Cancel</Button>
              <Button variant="primary" disabled={!moveTarget} onClick={() => {
                fetch('/api/experiment/move', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ fileIds: Array.from(selectedFileIds), targetPath: moveTarget }) })
                  .then(r => r.json()).then(d => { alert(`Moved ${d.moved}/${d.total} files`); setShowMoveDialog(false); if (selectedFolder) fetchFolderFiles(selectedFolder); fetchFolders(); })
                  .catch(err => alert('Move failed: ' + err.message));
              }}>Move</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
