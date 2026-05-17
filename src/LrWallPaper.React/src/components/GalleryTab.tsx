import { useState, useEffect, useRef, useCallback } from 'react';
import type { Capture, Tag, FilterOptions } from '../types';
import { toOpts, MediaThumbnail } from '../utils';
import { Button, Select, Checkbox } from '../ui';
import DetailModal from './DetailModal';

export default function GalleryTab() {
  const [selectedCapture, setSelectedCapture] = useState<Capture | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ cameraMakers: [], cameraModels: [], fileTypes: [], agentIds: [] });
  const [selectedMaker, setSelectedMaker] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [hasGps, setHasGps] = useState(false);
  const [mediaType, setMediaType] = useState('');
  const [selectedTagId, setSelectedTagId] = useState<number | ''>('');

  const observer = useRef<IntersectionObserver | null>(null);
  const filterVersion = useRef(0);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage(prev => prev + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetch('/api/experiment/filters').then(r => r.json()).then(setFilterOptions).catch(console.error);
    fetch('/api/tag').then(r => r.json()).then(setAllTags).catch(console.error);
  }, []);

  useEffect(() => {
    filterVersion.current++;
    setCaptures([]);
    setPage(1);
    setHasMore(true);
  }, [selectedMaker, selectedModel, selectedFileType, selectedAgent, dateFrom, dateTo, hasGps, mediaType, selectedTagId]);

  useEffect(() => {
    if (!hasMore) return;
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: '30' });
    if (selectedMaker) params.set('cameraMaker', selectedMaker);
    if (selectedModel) params.set('cameraModel', selectedModel);
    if (selectedFileType) params.set('fileType', selectedFileType);
    if (selectedAgent) params.set('agentId', selectedAgent);
    if (dateFrom) params.set('dateFrom', dateFrom);
    if (dateTo) params.set('dateTo', dateTo);
    if (hasGps) params.set('hasGps', 'true');
    if (mediaType) params.set('mediaType', mediaType);
    if (selectedTagId) params.set('tagId', String(selectedTagId));

    const ver = filterVersion.current;
    fetch(`/api/experiment/gallery?${params}`)
      .then(res => res.json())
      .then((data: Capture[]) => {
        if (ver !== filterVersion.current) return;
        if (!data || data.length === 0) {
          setHasMore(false);
        } else {
          setCaptures(prev => {
            const map = new Map([...prev, ...data].map(x => [x.id || (x.fileName + x.captureTime), x]));
            return Array.from(map.values());
          });
          if (data.length < 30) setHasMore(false);
        }
        setLoading(false);
      })
      .catch(err => { console.error('Error fetching:', err); setLoading(false); });
  }, [page, selectedMaker, selectedModel, selectedFileType, selectedAgent, dateFrom, dateTo, hasGps, mediaType, selectedTagId]);

  const clearFilters = () => {
    setSelectedMaker(''); setSelectedModel(''); setSelectedFileType('');
    setSelectedAgent(''); setDateFrom(''); setDateTo(''); setHasGps(false); setMediaType(''); setSelectedTagId('');
  };

  return (
    <div className="col" style={{ flexGrow: 1, minHeight: 0, gap: 12 }}>
      <div className="card" style={{ flexShrink: 0, padding: 12 }}>
        <div className="toolbar">
          <div className="field"><label>Brand</label>
            <Select options={toOpts(filterOptions.cameraMakers)} value={selectedMaker} onChange={setSelectedMaker} width={130} /></div>
          <div className="field"><label>Model</label>
            <Select options={toOpts(filterOptions.cameraModels)} value={selectedModel} onChange={setSelectedModel} width={150} /></div>
          <div className="field"><label>Type</label>
            <Select options={toOpts(filterOptions.fileTypes)} value={selectedFileType} onChange={setSelectedFileType} width={90} /></div>
          <div className="field"><label>Source</label>
            <Select options={toOpts(filterOptions.agentIds)} value={selectedAgent} onChange={setSelectedAgent} width={120} /></div>
          <div className="field"><label>From</label>
            <input type="date" className="input" value={dateFrom} onChange={e => setDateFrom(e.target.value)} /></div>
          <div className="field"><label>To</label>
            <input type="date" className="input" value={dateTo} onChange={e => setDateTo(e.target.value)} /></div>
          <Checkbox label="GPS" checked={hasGps} onChange={() => setHasGps(!hasGps)} />
          <span className="sep" />
          <Button size="sm" active={mediaType === ''} onClick={() => setMediaType('')}>All</Button>
          <Button size="sm" active={mediaType === 'photo'} onClick={() => setMediaType('photo')}>Photos</Button>
          <Button size="sm" active={mediaType === 'video'} onClick={() => setMediaType('video')}>Videos</Button>
          {allTags.length > 0 && (
            <>
              <span className="sep" />
              <div className="field"><label>Tag</label>
                <Select
                  options={[{ label: 'All', value: '' }, ...allTags.map(t => ({ label: `${t.category ? t.category + '/' : ''}${t.name}`, value: t.id }))]}
                  value={selectedTagId} onChange={v => setSelectedTagId(v ? Number(v) : '')} width={140} /></div>
            </>
          )}
          <span className="spacer" />
          <Button size="sm" variant="ghost" onClick={clearFilters}>Clear</Button>
        </div>
      </div>

      <div className="row" style={{ flexShrink: 0, justifyContent: 'space-between' }}>
        <span className="muted" style={{ fontSize: 12 }}><strong style={{ color: 'var(--text)' }}>{captures.length}</strong> files</span>
      </div>

      <div className="tbl-wrap" style={{ padding: 14 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}>
          {captures.map((pic, index) => {
            const isLast = index === captures.length - 1;
            const absolutePath = pic.fileFullPath || `${pic.filePath}\\${pic.fileName}`;
            const displayDate = pic.captureTime ? new Date(pic.captureTime).toLocaleString() : '';
            const imgSrc = `/api/image?path=${encodeURIComponent(absolutePath)}&agentId=${pic.agentId || 'local'}`;
            return (
              <div ref={isLast ? lastElementRef : null} key={pic.id || `${pic.fileName}_${index}`}
                className="thumb" onClick={() => { setSelectedCapture(pic); setSelectedIndex(index); }}>
                <MediaThumbnail src={imgSrc} alt={pic.fileName} className="thumb-img" />
                <div className="thumb-meta">
                  <div className="thumb-name">{pic.fileName}</div>
                  {displayDate && <div className="thumb-sub">{displayDate}</div>}
                  {pic.agentId && pic.agentId !== 'local' && (
                    <div className="thumb-sub" style={{ color: 'var(--accent)' }}>Node {pic.agentId.substring(0, 8)}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {loading && <div style={{ padding: 24, textAlign: 'center' }} className="muted">Loading…</div>}
        {!hasMore && captures.length > 0 && <div style={{ padding: 24, textAlign: 'center' }} className="faint">— End —</div>}
        {!loading && !hasMore && captures.length === 0 && <div style={{ padding: 40, textAlign: 'center' }} className="faint">Gallery is empty</div>}
      </div>

      {selectedCapture && (
        <DetailModal
          capture={selectedCapture}
          captures={captures}
          index={selectedIndex}
          onClose={() => setSelectedCapture(null)}
          onNavigate={(i) => { setSelectedIndex(i); setSelectedCapture(captures[i]); }}
          onDelete={(id) => {
            fetch(`/api/experiment/${id}`, { method: 'DELETE' })
              .then(res => { if (!res.ok) throw new Error('Delete failed'); })
              .then(() => {
                setCaptures(prev => prev.filter(c => c.id !== id));
                setSelectedCapture(null);
              })
              .catch(err => { alert('Failed to delete: ' + err.message); });
          }}
          allTags={allTags}
          onTagsChanged={() => fetch('/api/tag').then(r => r.json()).then(setAllTags).catch(() => {})}
        />
      )}
    </div>
  );
}
