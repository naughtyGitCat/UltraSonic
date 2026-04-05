import { useState, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button, TextInput, Select } from 'react95';
import type { Capture, FilterOptions, FolderSummary } from '../types';
import { toOpts, MediaThumbnail } from '../utils';
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

  useEffect(() => { fetchFolders(); }, [folderAgent]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexShrink: 0 }}>
        <label style={{ fontSize: '11px' }}>Source:</label>
        <Select options={toOpts(filterOptions.agentIds)} value={folderAgent}
          onChange={(e) => setFolderAgent(e.value as string)} width={150} menuMaxHeight={200} />
        <Button size="sm" onClick={fetchFolders}>Refresh</Button>
        {selectedFolder && <>
          <Button size="sm" onClick={() => setShowMoveDialog(true)}
            disabled={selectedFileIds.size === 0}>Move ({selectedFileIds.size})</Button>
          <Button size="sm" style={{ color: 'red' }} onClick={() => {
            if (window.confirm(`Delete all ${selectedFolder.fileCount} files in "${selectedFolder.filePath}"?`))
              fetch(`/api/experiment/folder?path=${encodeURIComponent(selectedFolder.filePath)}&agentId=${selectedFolder.agentId || ''}`, { method: 'DELETE' })
                .then(() => { fetchFolders(); setSelectedFolder(null); setFolderFiles([]); });
          }}>Delete Folder</Button>
        </>}
      </div>
      <div style={{ display: 'flex', flexGrow: 1, minHeight: 0, gap: '8px' }}>
        <div style={{ flex: '0 0 350px', overflow: 'auto', border: '2px inset #dfdfdf', backgroundColor: '#fff', fontSize: '11px' }}>
          <FolderTree folders={folders} selectedFolder={selectedFolder} onSelect={fetchFolderFiles} />
        </div>
        <div style={{ flexGrow: 1, overflow: 'auto', border: '2px inset #dfdfdf', backgroundColor: '#fff' }}>
          {selectedFolder ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px', padding: '8px' }}>
              {folderFiles.map(pic => {
                const abs = pic.fileFullPath || `${pic.filePath}\\${pic.fileName}`;
                const src = `/api/image?path=${encodeURIComponent(abs)}&agentId=${pic.agentId || 'local'}`;
                const sel = selectedFileIds.has(pic.id);
                return (
                  <div key={pic.id} style={{ border: sel ? '2px solid #000080' : '2px solid #dfdfdf', borderBottomColor: sel ? '#000080' : '#808080',
                    borderRightColor: sel ? '#000080' : '#808080', padding: '3px', textAlign: 'center', backgroundColor: sel ? '#c0c0ff' : '#c0c0c0', cursor: 'pointer' }}
                    onClick={() => setSelectedFileIds(prev => { const n = new Set(prev); n.has(pic.id) ? n.delete(pic.id) : n.add(pic.id); return n; })}>
                    <MediaThumbnail src={src} alt={pic.fileName} style={{ width: '100%', height: '120px', objectFit: 'cover', border: '2px inset #dfdfdf', backgroundColor: '#000' }} />
                    <div style={{ fontSize: '10px', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pic.fileName}</div>
                  </div>
                );
              })}
            </div>
          ) : <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Select a folder</div>}
        </div>
      </div>
      {showMoveDialog && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Window style={{ width: '400px' }}>
            <WindowHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Move Files</span>
              <Button size="sm" onClick={() => setShowMoveDialog(false)}>X</Button>
            </WindowHeader>
            <WindowContent>
              <p style={{ fontSize: '12px', marginBottom: '8px' }}>Move {selectedFileIds.size} files to:</p>
              <TextInput value={moveTarget} onChange={e => setMoveTarget(e.target.value)} placeholder="D:\Photos\Archive" style={{ width: '100%', marginBottom: '8px' }} />
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button onClick={() => setShowMoveDialog(false)}>Cancel</Button>
                <Button onClick={() => {
                  fetch('/api/experiment/move', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileIds: Array.from(selectedFileIds), targetPath: moveTarget }) })
                    .then(r => r.json()).then(d => { alert(`Moved ${d.moved}/${d.total} files`); setShowMoveDialog(false); if (selectedFolder) fetchFolderFiles(selectedFolder); fetchFolders(); })
                    .catch(err => alert('Move failed: ' + err.message));
                }} disabled={!moveTarget}>Move</Button>
              </div>
            </WindowContent>
          </Window>
        </div>
      )}
    </div>
  );
}
