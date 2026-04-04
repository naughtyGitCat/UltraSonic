import { useState, useEffect, useRef, useCallback } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, Window, WindowHeader, WindowContent, Button, ScrollView, Tabs, Tab, TabBody, TextInput, Select, Checkbox, GroupBox, Table, TableHead, TableRow, TableHeadCell, TableBody, TableDataCell } from 'react95';
import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea, button {
    font-family: 'ms_sans_serif';
  }
  body {
    background: #008080;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

interface Capture {
  id: number;
  fileFullPath: string;
  filePath: string;
  fileName: string;
  cameraMaker?: string;
  cameraModel?: string;
  lensModel?: string;
  agentId?: string;
  latitude?: number;
  longitude?: number;
  fileSize?: number;
  fileMd5?: string;
  captureTime?: string;
}

interface FilterOptions {
  cameraMakers: string[];
  cameraModels: string[];
  fileTypes: string[];
  agentIds: string[];
}

interface Agent {
  id: string;
  name: string;
  endpoint: string;
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return '-';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

const VIDEO_EXTS = ['.mp4', '.mov', '.avi', '.mkv', '.mts'];

function getExt(filename: string): string {
  return filename.toLowerCase().replace(/.*(\.\w+)$/, '$1');
}

function MediaThumbnail({ src, alt, style }: { src: string; alt: string; style: React.CSSProperties }) {
  if (VIDEO_EXTS.includes(getExt(alt))) {
    return <video src={`${src}#t=0.5`} muted preload="metadata" style={style} />;
  }
  return <img src={src} alt={alt} loading="lazy" style={style} />;
}

const dateInputStyle: React.CSSProperties = {
  fontFamily: 'ms_sans_serif', border: '2px inset #dfdfdf', padding: '2px 4px',
  fontSize: '11px', backgroundColor: '#fff', height: '22px'
};

function DetailModal({ capture, captures, index, onClose, onNavigate, onDelete }: {
  capture: Capture; captures: Capture[]; index: number;
  onClose: () => void; onNavigate: (i: number) => void; onDelete: (id: number) => void;
}) {
  const ext = getExt(capture.fileName);
  const isVideo = VIDEO_EXTS.includes(ext);
  const absolutePath = capture.fileFullPath || `${capture.filePath}\\${capture.fileName}`;
  const imgSrc = `/api/image?path=${encodeURIComponent(absolutePath)}&agentId=${capture.agentId || 'local'}`;

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
            <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', border: '2px inset #dfdfdf' }}>
              {isVideo
                ? <video src={imgSrc} controls style={{ maxWidth: '100%', maxHeight: '100%' }} />
                : <img src={imgSrc} alt={capture.fileName} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
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
            <Button style={{ marginTop: '8px', width: '100%', color: '#ff0000' }}
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

function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Gallery State
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Filter State
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ cameraMakers: [], cameraModels: [], fileTypes: [], agentIds: [] });
  const [selectedMaker, setSelectedMaker] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [hasGps, setHasGps] = useState(false);

  // Detail State
  const [selectedCapture, setSelectedCapture] = useState<Capture | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Agent State
  const [agents, setAgents] = useState<Agent[]>([]);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentIp, setNewAgentIp] = useState('');

  const observer = useRef<IntersectionObserver | null>(null);
  const filterVersion = useRef(0);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch filter options on mount
  useEffect(() => {
    fetch('/api/experiment/filters')
      .then(r => r.json())
      .then(setFilterOptions)
      .catch(console.error);
  }, []);

  // Reset when filters change
  useEffect(() => {
    filterVersion.current++;
    setCaptures([]);
    setPage(1);
    setHasMore(true);
  }, [selectedMaker, selectedModel, selectedFileType, selectedAgent, dateFrom, dateTo, hasGps]);

  // Fetch data
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

    const ver = filterVersion.current;
    fetch(`/api/experiment/gallery?${params}`)
      .then(res => res.json())
      .then((data: Capture[]) => {
        if (ver !== filterVersion.current) return; // stale response
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
  }, [page, selectedMaker, selectedModel, selectedFileType, selectedAgent, dateFrom, dateTo, hasGps]);

  useEffect(() => { if (activeTab === 1) fetchAgents(); }, [activeTab]);

  const fetchAgents = () => {
    fetch('/api/agent').then(r => r.json()).then(setAgents).catch(console.error);
  };
  const handleAddAgent = () => {
    fetch('/api/agent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newAgentName, endpoint: newAgentIp }) })
      .then(() => { setNewAgentName(''); setNewAgentIp(''); fetchAgents(); });
  };
  const handleDeleteAgent = (id: string) => {
    fetch(`/api/agent/${id}`, { method: 'DELETE' }).then(() => fetchAgents());
  };

  const clearFilters = () => {
    setSelectedMaker(''); setSelectedModel(''); setSelectedFileType('');
    setSelectedAgent(''); setDateFrom(''); setDateTo(''); setHasGps(false);
  };

  const toOpts = (arr: string[], allLabel = 'All') =>
    [{ label: allLabel, value: '' }, ...arr.map(v => ({ label: v, value: v }))];

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Window style={{ width: '90vw', height: '90vh', maxWidth: '1200px', display: 'flex', flexDirection: 'column' }}>
          <WindowHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>UltraSonic_Control_Panel.exe</span>
            <Button><span className="close-icon" />X</Button>
          </WindowHeader>
          <WindowContent style={{ flexGrow: 1, padding: '0.5rem', display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
            <Tabs value={activeTab} onChange={(v) => setActiveTab(v)}>
              <Tab value={0}>Gallery</Tab>
              <Tab value={1}>Node Config (Agents)</Tab>
            </Tabs>

            <TabBody style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '10px', minHeight: 0, overflow: 'hidden' }}>

              {activeTab === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
                  {/* Filter Bar */}
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
                      <Button size="sm" onClick={clearFilters}>Clear</Button>
                    </div>
                  </GroupBox>

                  <div style={{ marginBottom: '6px', flexShrink: 0, fontSize: '12px' }}>
                    Showing {captures.length} files
                  </div>

                  {/* Gallery Grid */}
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
                </div>
              )}

              {activeTab === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <fieldset style={{ border: '2px solid groove', padding: '15px' }}>
                    <legend>Register New Edge Node</legend>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <label>Name:</label>
                      <TextInput placeholder="e.g. Z690 Desktop" value={newAgentName} onChange={(e) => setNewAgentName(e.target.value)} />
                      <label>API Endpoint:</label>
                      <TextInput placeholder="e.g. http://192.168.1.100:5000" value={newAgentIp} onChange={(e) => setNewAgentIp(e.target.value)} style={{ width: '250px' }} />
                      <Button onClick={handleAddAgent}>Add Node</Button>
                    </div>
                  </fieldset>
                  <ScrollView style={{ height: '300px' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeadCell>Name</TableHeadCell>
                          <TableHeadCell>UUID</TableHeadCell>
                          <TableHeadCell>API Endpoint</TableHeadCell>
                          <TableHeadCell>Actions</TableHeadCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableDataCell>Master Local</TableDataCell>
                          <TableDataCell>local</TableDataCell>
                          <TableDataCell>127.0.0.1</TableDataCell>
                          <TableDataCell>Built-in</TableDataCell>
                        </TableRow>
                        {agents.map(agent => (
                          <TableRow key={agent.id}>
                            <TableDataCell>{agent.name}</TableDataCell>
                            <TableDataCell>{agent.id}</TableDataCell>
                            <TableDataCell>{agent.endpoint}</TableDataCell>
                            <TableDataCell><Button onClick={() => handleDeleteAgent(agent.id)}>Delete</Button></TableDataCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollView>
                </div>
              )}

            </TabBody>
          </WindowContent>
        </Window>

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
          />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
