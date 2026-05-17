import { useState, useEffect } from 'react';
import type { Capture, FilterOptions, FolderSummary } from '../types';
import { toOpts, MediaThumbnail } from '../utils';
import { Button, Select, TextInput, Modal } from '../ui';
import FolderTree from './FolderTree';

interface Props {
  filterOptions: FilterOptions;
}

export default function FoldersTab({ filterOptions }: Props) {
  const [folders, setFolders] = useState<FolderSummary[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderSummary | null>(null);
  const [folderFiles, setFolderFiles] = useState<Capture[]>([]);
  const [folderAgent, setFolderAgent] = useState('');
  const [moveTarget, setMoveTarget] = useState('');
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<number>>(new Set());

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
