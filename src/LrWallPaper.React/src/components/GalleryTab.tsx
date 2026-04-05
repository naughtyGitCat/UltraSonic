import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Select, Checkbox, GroupBox } from 'react95';
import type { Capture, Tag } from '../types';
import { dateInputStyle, toOpts, MediaThumbnail } from '../utils';
import DetailModal from './DetailModal';
import type { FilterOptions } from '../types';

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
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
      <GroupBox label="Filters" style={{ flexShrink: 0, marginBottom: '8px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <label style={{ fontSize: '11px' }}>Brand:</label>
            <Select options={toOpts(filterOptions.cameraMakers)} value={selectedMaker}
              onChange={(e) => setSelectedMaker(e.value as string)} width={130} menuMaxHeight={200} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <label style={{ fontSize: '11px' }}>Model:</label>
            <Select options={toOpts(filterOptions.cameraModels)} value={selectedModel}
              onChange={(e) => setSelectedModel(e.value as string)} width={160} menuMaxHeight={200} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <label style={{ fontSize: '11px' }}>Type:</label>
            <Select options={toOpts(filterOptions.fileTypes)} value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.value as string)} width={90} menuMaxHeight={200} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <label style={{ fontSize: '11px' }}>Source:</label>
            <Select options={toOpts(filterOptions.agentIds)} value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.value as string)} width={120} menuMaxHeight={200} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <label style={{ fontSize: '11px' }}>From:</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={dateInputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <label style={{ fontSize: '11px' }}>To:</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={dateInputStyle} />
          </div>
          <Checkbox label="GPS" checked={hasGps} onChange={() => setHasGps(!hasGps)} />
          <span style={{ borderLeft: '1px solid #808080', height: '20px', margin: '0 2px' }} />
          <Button size="sm" active={mediaType === ''} onClick={() => setMediaType('')}>All</Button>
          <Button size="sm" active={mediaType === 'photo'} onClick={() => setMediaType('photo')}>Photos</Button>
          <Button size="sm" active={mediaType === 'video'} onClick={() => setMediaType('video')}>Videos</Button>
          <span style={{ borderLeft: '1px solid #808080', height: '20px', margin: '0 2px' }} />
          {allTags.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <label style={{ fontSize: '11px' }}>Tag:</label>
              <Select options={[{ label: 'All', value: '' as string | number }, ...allTags.map(t => ({ label: `${t.category ? t.category + '/' : ''}${t.name}`, value: t.id }))]}
                value={selectedTagId} onChange={(e) => setSelectedTagId(e.value as number | '')} width={140} menuMaxHeight={200} />
            </div>
          )}
          <Button size="sm" onClick={clearFilters}>Clear</Button>
        </div>
      </GroupBox>

      <div style={{ marginBottom: '6px', flexShrink: 0, fontSize: '12px' }}>
        Showing {captures.length} files
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, width: '100%', overflow: 'auto', backgroundColor: '#fff', border: '2px inset #dfdfdf', padding: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
          {captures.map((pic, index) => {
            const isLast = index === captures.length - 1;
            const absolutePath = pic.fileFullPath || `${pic.filePath}\\${pic.fileName}`;
            const displayDate = pic.captureTime ? new Date(pic.captureTime).toLocaleString() : '';
            const imgSrc = `/api/image?path=${encodeURIComponent(absolutePath)}&agentId=${pic.agentId || 'local'}`;

            return (
              <div
                ref={isLast ? lastElementRef : null}
                key={pic.id || `${pic.fileName}_${index}`}
                style={{
                  border: '2px solid #dfdfdf', borderBottomColor: '#808080', borderRightColor: '#808080',
                  padding: '4px', textAlign: 'center', backgroundColor: '#c0c0c0', cursor: 'pointer'
                }}
                onClick={() => { setSelectedCapture(pic); setSelectedIndex(index); }}
              >
                <MediaThumbnail
                  src={imgSrc} alt={pic.fileName}
                  style={{ width: '100%', height: '160px', objectFit: 'cover', border: '2px inset #dfdfdf', backgroundColor: '#000' }}
                />
                <div style={{ fontSize: '11px', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '2px' }}>
                  {pic.fileName}
                </div>
                {displayDate && <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>{displayDate}</div>}
                {pic.agentId && pic.agentId !== 'local' && <div style={{ fontSize: '10px', color: '#000080', marginTop: '2px' }}>Node: {pic.agentId.substring(0, 8)}</div>}
              </div>
            );
          })}
        </div>
        {loading && <div style={{ padding: '20px', textAlign: 'center' }}>Loading please wait...</div>}
        {!hasMore && captures.length > 0 && <div style={{ padding: '20px', textAlign: 'center' }}>No more pictures found.</div>}
        {!loading && !hasMore && captures.length === 0 && <div style={{ padding: '20px', textAlign: 'center' }}>Your gallery is empty.</div>}
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
