import { useState, useEffect } from 'react';
import type { Capture, Tag, FaceInfo, Person } from '../types';
import { VIDEO_EXTS, getExt, formatFileSize } from '../utils';
import { Button, Card } from '../ui';

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

  const [fileTags, setFileTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const fetchFileTags = () => { fetch(`/api/tag/file/${capture.id}`).then(r => r.json()).then(setFileTags).catch(() => {}); };

  const [livePhotoMov, setLivePhotoMov] = useState<Capture | null>(null);
  const [showLivePhoto, setShowLivePhoto] = useState(false);

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
    // eslint-disable-next-line
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ width: '92vw', height: '90vh', maxWidth: 1180 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{capture.fileName}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div style={{ flex: 1, display: 'flex', gap: 12, padding: 14, minHeight: 0 }}>
          <div className="col" style={{ flex: '1 1 70%', minHeight: 0, gap: 10 }}>
            <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#0b0d12', border: '1px solid var(--border)', borderRadius: 'var(--r)', position: 'relative' }}>
              {isVideo
                ? <video src={imgSrc} controls style={{ maxWidth: '100%', maxHeight: '100%' }} />
                : showLivePhoto && livePhotoMov
                  ? <video
                      src={`/api/image?path=${encodeURIComponent(livePhotoMov.fileFullPath || `${livePhotoMov.filePath}\\${livePhotoMov.fileName}`)}&agentId=${livePhotoMov.agentId || 'local'}`}
                      autoPlay loop muted style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  : <img src={imgSrc} alt={capture.fileName} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
              {showFaces && faces.map(f => (
                <div key={f.id} style={{
                  position: 'absolute',
                  left: `${f.regionX * 100}%`, top: `${f.regionY * 100}%`,
                  width: `${f.regionW * 100}%`, height: `${f.regionH * 100}%`,
                  border: '2px solid #3fb950', borderRadius: 3, boxSizing: 'border-box', cursor: 'pointer'
                }} title={f.personName || 'Unknown'}>
                  <span style={{ position: 'absolute', bottom: -20, left: 0, fontSize: 10,
                    background: 'rgba(0,0,0,0.75)', color: '#3fb950', padding: '1px 5px', borderRadius: 3, whiteSpace: 'nowrap' }}>
                    {f.personName || '?'}
                  </span>
                </div>
              ))}
              {livePhotoMov && (
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  <Button size="sm" active={showLivePhoto}
                    onClick={() => setShowLivePhoto(!showLivePhoto)}>● LIVE</Button>
                </div>
              )}
            </div>
            <div className="row" style={{ justifyContent: 'center', gap: 10, flexShrink: 0 }}>
              <Button size="sm" disabled={index <= 0} onClick={() => onNavigate(index - 1)}>‹ Prev</Button>
              <span className="muted" style={{ fontSize: 12, minWidth: 70, textAlign: 'center' }}>{index + 1} / {captures.length}</span>
              <Button size="sm" disabled={index >= captures.length - 1} onClick={() => onNavigate(index + 1)}>Next ›</Button>
            </div>
          </div>

          <div className="col scroll-y" style={{ flex: '0 0 240px', gap: 10 }}>
            <Card title="Properties">
              <table style={{ fontSize: 12, width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['File', capture.fileName],
                    ['Camera', [capture.cameraMaker, capture.cameraModel].filter(Boolean).join(' ') || '-'],
                    ['Lens', capture.lensModel || '-'],
                    ['Time', capture.captureTime ? new Date(capture.captureTime).toLocaleString() : '-'],
                    ['Size', formatFileSize(capture.fileSize)],
                    ['GPS', capture.latitude != null && capture.longitude != null
                      ? `${capture.latitude.toFixed(5)}, ${capture.longitude.toFixed(5)}` : '-'],
                    ['Source', capture.agentId === 'local' ? 'Local' : capture.agentId?.substring(0, 8) || '-'],
                    ['MD5', capture.fileMd5?.substring(0, 12) || '-'],
                  ].map(([k, v]) => (
                    <tr key={k as string}>
                      <td style={{ padding: '4px 6px 4px 0', color: 'var(--text-muted)', whiteSpace: 'nowrap', verticalAlign: 'top', fontWeight: 600 }}>{k}</td>
                      <td style={{ padding: '4px 0', wordBreak: 'break-all' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card title="Tags">
              <div className="row wrap" style={{ gap: 5, marginBottom: 8 }}>
                {fileTags.map(t => (
                  <span key={t.id} className="chip"
                    onClick={() => { fetch(`/api/tag/file/${capture.id}/${t.id}`, { method: 'DELETE' }).then(fetchFileTags); }}
                    title="Click to remove">{t.name} ✕</span>
                ))}
                {fileTags.length === 0 && <span className="faint" style={{ fontSize: 11 }}>No tags</span>}
              </div>
              <select className="select" style={{ width: '100%', marginBottom: 6 }}
                onChange={e => {
                  if (e.target.value) fetch(`/api/tag/file/${capture.id}/${e.target.value}`, { method: 'POST' }).then(fetchFileTags);
                  e.target.value = '';
                }}>
                <option value="">+ Add tag…</option>
                {allTags.filter(t => !fileTags.some(ft => ft.id === t.id)).map(t => (
                  <option key={t.id} value={t.id}>{t.category ? t.category + '/' : ''}{t.name}</option>
                ))}
              </select>
              <input type="text" className="input" placeholder="New tag (Enter)" value={newTagName}
                style={{ width: '100%' }}
                onChange={e => setNewTagName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && newTagName.trim()) {
                    fetch('/api/tag', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newTagName.trim(), category: '' }) })
                      .then(r => r.json())
                      .then((tag: Tag) => { fetch(`/api/tag/file/${capture.id}/${tag.id}`, { method: 'POST' }).then(() => { fetchFileTags(); onTagsChanged(); setNewTagName(''); }); });
                  }
                }} />
            </Card>

            <Card title="Faces">
              <div className="row" style={{ fontSize: 11, marginBottom: 8, justifyContent: 'space-between' }}>
                <span className="muted">{faces.length > 0 ? `${faces.length} face(s)` : 'None detected'}</span>
                {faces.length > 0 && <span className="chip" onClick={() => setShowFaces(p => !p)}>{showFaces ? 'Hide' : 'Show'}</span>}
              </div>
              {faces.map(f => (
                <div key={f.id} className="row" style={{ gap: 5, marginBottom: 5 }}>
                  <span style={{ width: 8, height: 8, background: '#3fb950', borderRadius: '50%', flexShrink: 0 }} />
                  <select className="select" style={{ flex: 1 }} value={f.personId || ''}
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
                    <option value="__new__">+ New person…</option>
                  </select>
                </div>
              ))}
            </Card>

            <Button style={{ width: '100%' }} onClick={() => {
              fetch('/api/recognition/providers').then(r => r.json()).then((data: {defaultProvider:string; providers: Array<{name:string;configured:boolean}>}) => {
                const configured = data.providers.filter(p => p.configured);
                if (configured.length === 0) { alert('No API keys configured. Go to Nodes → Image Recognition.'); return; }
                const provider = configured.find(p => p.name === data.defaultProvider)?.name || configured[0].name;
                fetch('/api/recognition/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ fileIds: [capture.id], provider }) })
                  .then(r => r.json()).then(() => { fetchFileTags(); onTagsChanged(); alert('Recognition complete'); })
                  .catch(err => alert('Recognition failed: ' + err.message));
              });
            }}>AI Recognize</Button>
            <Button style={{ width: '100%' }} onClick={() => {
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
            <Button variant="danger" style={{ width: '100%' }} onClick={() => {
              if (window.confirm(`Delete "${capture.fileName}"? This will remove the file from disk.`)) onDelete(capture.id);
            }}>Delete File</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
