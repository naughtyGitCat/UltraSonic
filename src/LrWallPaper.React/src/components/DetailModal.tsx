import { useState, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button, GroupBox } from 'react95';
import type { Capture, Tag, FaceInfo, Person } from '../types';
import { VIDEO_EXTS, getExt, formatFileSize } from '../utils';

interface Props {
  capture: Capture;
  captures: Capture[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
  onDelete: (id: number) => void;
  allTags: Tag[];
  onTagsChanged: () => void;
}

export default function DetailModal({ capture, captures, index, onClose, onNavigate, onDelete, allTags, onTagsChanged }: Props) {
  const ext = getExt(capture.fileName);
  const isVideo = VIDEO_EXTS.includes(ext);
  const isPhoto = !isVideo;
  const absolutePath = capture.fileFullPath || `${capture.filePath}\\${capture.fileName}`;
  const imgSrc = `/api/image?path=${encodeURIComponent(absolutePath)}&agentId=${capture.agentId || 'local'}`;

  // Tags for this file
  const [fileTags, setFileTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const fetchFileTags = () => { fetch(`/api/tag/file/${capture.id}`).then(r => r.json()).then(setFileTags).catch(() => {}); };

  // Live Photo: check for companion MOV
  const [livePhotoMov, setLivePhotoMov] = useState<Capture | null>(null);
  const [showLivePhoto, setShowLivePhoto] = useState(false);

  // Face detection
  const [faces, setFaces] = useState<FaceInfo[]>([]);
  const [showFaces, setShowFaces] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const fetchFaces = () => {
    fetch(`/api/face/file/${capture.id}`).then(r => r.json()).then((d: FaceInfo[]) => { setFaces(d); if (d.length > 0) setShowFaces(true); }).catch(() => {});
  };
  const fetchPersons = () => { fetch('/api/face/persons').then(r => r.json()).then(setPersons).catch(() => {}); };

  useEffect(() => {
    fetchFileTags();
    fetchFaces();
    fetchPersons();
    setLivePhotoMov(null);
    setShowLivePhoto(false);
    if (isPhoto && capture.id && ['.heic', '.jpg', '.jpeg'].includes(ext)) {
      fetch(`/api/experiment/live-photo/${capture.id}`)
        .then(r => r.ok ? r.json() : null)
        .then(d => setLivePhotoMov(d))
        .catch(() => {});
    }
  }, [capture.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && index > 0) onNavigate(index - 1);
      if (e.key === 'ArrowRight' && index < captures.length - 1) onNavigate(index + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, captures.length, onClose, onNavigate]);

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
         onClick={onClose}>
      <Window style={{ width: '90vw', height: '90vh', maxWidth: '1100px', display: 'flex', flexDirection: 'column' }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <WindowHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{capture.fileName}</span>
          <Button size="sm" onClick={onClose}>X</Button>
        </WindowHeader>
        <WindowContent style={{ flexGrow: 1, display: 'flex', gap: '10px', padding: '8px', minHeight: 0, overflow: 'hidden' }}>
          <div style={{ flex: '1 1 70%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', border: '2px inset #dfdfdf', position: 'relative' }}>
              {isVideo
                ? <video src={imgSrc} controls style={{ maxWidth: '100%', maxHeight: '100%' }} />
                : showLivePhoto && livePhotoMov
                  ? <video
                      src={`/api/image?path=${encodeURIComponent(livePhotoMov.fileFullPath || `${livePhotoMov.filePath}\\${livePhotoMov.fileName}`)}&agentId=${livePhotoMov.agentId || 'local'}`}
                      autoPlay loop muted style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  : <img src={imgSrc} alt={capture.fileName} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
              {/* Face detection overlays */}
              {showFaces && faces.map(f => (
                <div key={f.id} style={{
                  position: 'absolute',
                  left: `${f.regionX * 100}%`, top: `${f.regionY * 100}%`,
                  width: `${f.regionW * 100}%`, height: `${f.regionH * 100}%`,
                  border: '2px solid #00ff00', boxSizing: 'border-box',
                  pointerEvents: 'auto', cursor: 'pointer'
                }} title={f.personName || 'Unknown'}>
                  <span style={{ position: 'absolute', bottom: '-18px', left: 0, fontSize: '10px',
                    backgroundColor: 'rgba(0,0,0,0.7)', color: '#0f0', padding: '1px 4px', whiteSpace: 'nowrap' }}>
                    {f.personName || '?'}
                  </span>
                </div>
              ))}
              {livePhotoMov && (
                <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                  <Button size="sm" active={showLivePhoto}
                    onMouseDown={() => setShowLivePhoto(true)}
                    onMouseUp={() => setShowLivePhoto(false)}
                    onMouseLeave={() => setShowLivePhoto(false)}
                    onClick={() => setShowLivePhoto(!showLivePhoto)}>
                    LIVE
                  </Button>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '6px', flexShrink: 0 }}>
              <Button disabled={index <= 0} onClick={() => onNavigate(index - 1)}>&lt; Prev</Button>
              <span style={{ fontSize: '11px', lineHeight: '28px' }}>{index + 1} / {captures.length}</span>
              <Button disabled={index >= captures.length - 1} onClick={() => onNavigate(index + 1)}>Next &gt;</Button>
            </div>
          </div>
          <div style={{ flex: '0 0 200px', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <GroupBox label="Properties" style={{ flexGrow: 1 }}>
              <table style={{ fontSize: '11px', width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['File', capture.fileName],
                    ['Camera', [capture.cameraMaker, capture.cameraModel].filter(Boolean).join(' ') || '-'],
                    ['Lens', capture.lensModel || '-'],
                    ['Time', capture.captureTime ? new Date(capture.captureTime).toLocaleString() : '-'],
                    ['Size', formatFileSize(capture.fileSize)],
                    ['GPS', capture.latitude != null && capture.longitude != null
                      ? `${capture.latitude.toFixed(6)}, ${capture.longitude.toFixed(6)}` : '-'],
                    ['Source', capture.agentId === 'local' ? 'Local' : capture.agentId?.substring(0, 8) || '-'],
                    ['MD5', capture.fileMd5?.substring(0, 12) || '-'],
                  ].map(([k, v]) => (
                    <tr key={k as string}>
                      <td style={{ padding: '3px 4px', fontWeight: 'bold', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{k}</td>
                      <td style={{ padding: '3px 4px', wordBreak: 'break-all' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GroupBox>
            <GroupBox label="Tags" style={{ marginTop: '6px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '4px' }}>
                {fileTags.map(t => (
                  <span key={t.id} style={{ fontSize: '10px', backgroundColor: '#000080', color: '#fff', padding: '1px 6px', borderRadius: '2px', cursor: 'pointer' }}
                    onClick={() => { fetch(`/api/tag/file/${capture.id}/${t.id}`, { method: 'DELETE' }).then(fetchFileTags); }}
                    title="Click to remove">{t.name} x</span>
                ))}
                {fileTags.length === 0 && <span style={{ fontSize: '10px', color: '#888' }}>No tags</span>}
              </div>
              <div style={{ display: 'flex', gap: '2px' }}>
                <select style={{ flex: 1, fontSize: '10px', border: '2px inset #dfdfdf', fontFamily: 'ms_sans_serif' }}
                  onChange={e => {
                    if (e.target.value) fetch(`/api/tag/file/${capture.id}/${e.target.value}`, { method: 'POST' }).then(fetchFileTags);
                    e.target.value = '';
                  }}>
                  <option value="">+ Add tag...</option>
                  {allTags.filter(t => !fileTags.some(ft => ft.id === t.id)).map(t => (
                    <option key={t.id} value={t.id}>{t.category ? t.category + '/' : ''}{t.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                <input type="text" placeholder="New tag" value={newTagName}
                  onChange={e => setNewTagName(e.target.value)}
                  style={{ flex: 1, fontSize: '10px', border: '2px inset #dfdfdf', padding: '1px 3px', fontFamily: 'ms_sans_serif' }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newTagName.trim()) {
                      fetch('/api/tag', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newTagName.trim(), category: '' }) })
                        .then(r => r.json())
                        .then((tag: Tag) => { fetch(`/api/tag/file/${capture.id}/${tag.id}`, { method: 'POST' }).then(() => { fetchFileTags(); onTagsChanged(); setNewTagName(''); }); });
                    }
                  }} />
              </div>
            </GroupBox>
            <GroupBox label="Faces" style={{ marginTop: '6px' }}>
              <div style={{ fontSize: '10px', marginBottom: '4px' }}>
                {faces.length > 0 ? `${faces.length} face(s) detected` : 'No faces detected'}
                {faces.length > 0 && <span style={{ cursor: 'pointer', marginLeft: '6px', color: '#000080' }}
                  onClick={() => setShowFaces(p => !p)}>[{showFaces ? 'Hide' : 'Show'}]</span>}
              </div>
              {faces.map(f => (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '3px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#00ff00', borderRadius: '50%', flexShrink: 0 }} />
                  <select style={{ flex: 1, fontSize: '10px', border: '2px inset #dfdfdf', fontFamily: 'ms_sans_serif' }}
                    value={f.personId || ''}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === '__new__') {
                        const name = window.prompt('Enter person name:');
                        if (name) fetch(`/api/face/${f.id}/assign`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ personName: name }) }).then(() => { fetchFaces(); fetchPersons(); });
                      } else if (val) {
                        fetch(`/api/face/${f.id}/assign`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ personId: parseInt(val) }) }).then(fetchFaces);
                      }
                    }}>
                    <option value="">Unknown</option>
                    {persons.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    <option value="__new__">+ New person...</option>
                  </select>
                </div>
              ))}
            </GroupBox>
            <Button style={{ marginTop: '6px', width: '100%' }}
              onClick={() => {
                fetch('/api/recognition/providers').then(r => r.json()).then((data: {defaultProvider:string; providers: Array<{name:string;configured:boolean}>}) => {
                  const configured = data.providers.filter(p => p.configured);
                  if (configured.length === 0) { alert('No API keys configured. Go to Node Config > Image Recognition to set up.'); return; }
                  const provider = configured.find(p => p.name === data.defaultProvider)?.name || configured[0].name;
                  fetch('/api/recognition/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileIds: [capture.id], provider }) })
                    .then(r => r.json()).then(() => { fetchFileTags(); onTagsChanged(); alert('Recognition complete'); })
                    .catch(err => alert('Recognition failed: ' + err.message));
                });
              }}>AI Recognize</Button>
            <Button style={{ marginTop: '4px', width: '100%' }}
              onClick={() => {
                fetch('/api/recognition/providers').then(r => r.json()).then((data: {defaultProvider:string; providers: Array<{name:string;configured:boolean}>}) => {
                  const configured = data.providers.filter(p => p.configured);
                  if (configured.length === 0) { alert('No API keys configured.'); return; }
                  const provider = configured.find(p => p.name === data.defaultProvider)?.name || configured[0].name;
                  fetch('/api/face/detect', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileIds: [capture.id], provider }) })
                    .then(r => r.json()).then(() => { fetchFaces(); alert('Face detection complete'); })
                    .catch(err => alert('Face detection failed: ' + err.message));
                });
              }}>Face Detect</Button>
            <Button style={{ marginTop: '4px', width: '100%', color: '#ff0000' }}
              onClick={() => {
                if (window.confirm(`Delete "${capture.fileName}"? This will remove the file from disk.`)) {
                  onDelete(capture.id);
                }
              }}>Delete File</Button>
          </div>
        </WindowContent>
      </Window>
    </div>
  );
}
