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

interface ScanStatus {
  isScanning?: boolean;
  currentFile?: string;
  filesProcessed?: number;
  lastScanStart?: string;
  lastScanEnd?: string;
  lastScanDurationSeconds?: number;
  nextScanTime?: string;
  lastError?: string;
}

interface Agent {
  id: string;
  name: string;
  endpoint: string;
  version?: string;
  lastSeen?: string;
  scanStatus?: ScanStatus;
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

interface FolderSummaryI { filePath: string; agentId: string; fileCount: number; totalSize: number; }
interface TreeNode { name: string; fullPath: string; children: Map<string, TreeNode>; folder?: FolderSummaryI; }

function buildTree(folders: FolderSummaryI[]): TreeNode {
  const root: TreeNode = { name: '', fullPath: '', children: new Map() };
  for (const f of folders) {
    // Split path: "D:\Photos\2024\01" -> ["D:", "Photos", "2024", "01"]
    const parts = f.filePath.replace(/\\/g, '/').split('/').filter(Boolean);
    let node = root;
    let path = '';
    for (const part of parts) {
      path = path ? path + '/' + part : part;
      if (!node.children.has(part)) {
        node.children.set(part, { name: part, fullPath: path, children: new Map() });
      }
      node = node.children.get(part)!;
    }
    node.folder = f;
  }
  return root;
}

function FolderTree({ folders, selectedFolder, onSelect }: {
  folders: FolderSummaryI[]; selectedFolder: FolderSummaryI | null; onSelect: (f: FolderSummaryI) => void;
}) {
  const tree = buildTree(folders);
  if (tree.children.size === 0) return <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No folders found</div>;
  return <div style={{ padding: '2px' }}>{Array.from(tree.children.values()).map(n => <TreeNodeView key={n.fullPath} node={n} depth={0} selectedFolder={selectedFolder} onSelect={onSelect} />)}</div>;
}

function TreeNodeView({ node, depth, selectedFolder, onSelect }: {
  node: TreeNode; depth: number; selectedFolder: FolderSummaryI | null; onSelect: (f: FolderSummaryI) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children.size > 0;
  const isSelected = selectedFolder?.filePath === node.folder?.filePath && selectedFolder?.agentId === node.folder?.agentId;
  const isLeaf = node.folder != null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '1px 2px', paddingLeft: depth * 16 + 2,
        cursor: isLeaf ? 'pointer' : hasChildren ? 'pointer' : 'default',
        backgroundColor: isSelected ? '#000080' : 'transparent', color: isSelected ? '#fff' : '#000' }}
        onClick={() => { if (isLeaf && node.folder) onSelect(node.folder); if (hasChildren) setExpanded(!expanded); }}>
        <span style={{ width: '14px', textAlign: 'center', fontSize: '10px', flexShrink: 0 }}>
          {hasChildren ? (expanded ? '-' : '+') : ' '}
        </span>
        <span style={{ marginRight: '4px', fontSize: '12px' }}>{isLeaf ? '\uD83D\uDCC1' : '\uD83D\uDCC2'}</span>
        <span style={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.name}</span>
        {isLeaf && node.folder && <span style={{ color: isSelected ? '#ccc' : '#888', marginLeft: '4px', flexShrink: 0, fontSize: '10px' }}>
          {node.folder.fileCount}
        </span>}
      </div>
      {expanded && Array.from(node.children.values()).map(child =>
        <TreeNodeView key={child.fullPath} node={child} depth={depth + 1} selectedFolder={selectedFolder} onSelect={onSelect} />
      )}
    </div>
  );
}

function renderConfigFields(obj: Record<string, unknown>, path: string[], onUpdate: (path: string[], value: unknown) => void): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const skipKeys = new Set(['Urls', 'Logging', 'AllowedHosts', 'EnableFullScan', 'MasterCluster']);
  for (const [key, val] of Object.entries(obj)) {
    if (skipKeys.has(key)) continue;
    const currentPath = [...path, key];
    const label = currentPath.join('.');
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      nodes.push(<div key={label} style={{ gridColumn: '1 / -1', fontWeight: 'bold', marginTop: '6px', borderBottom: '1px solid #808080', paddingBottom: '2px' }}>{label}</div>);
      nodes.push(...renderConfigFields(val as Record<string, unknown>, currentPath, onUpdate));
    } else if (Array.isArray(val)) {
      nodes.push(<label key={label + '_l'} style={{ textAlign: 'right' }}>{key}:</label>);
      nodes.push(<input key={label + '_v'} type="text" value={(val as string[]).join(', ')}
        onChange={e => onUpdate(currentPath, e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
        style={{ border: '2px inset #dfdfdf', padding: '2px 4px', fontSize: '11px', fontFamily: 'ms_sans_serif' }} />);
    } else {
      nodes.push(<label key={label + '_l'} style={{ textAlign: 'right' }}>{key}:</label>);
      if (key.toLowerCase() === 'transfermode') {
        nodes.push(<select key={label + '_v'} value={String(val || 'copy')}
          onChange={e => onUpdate(currentPath, e.target.value)}
          style={{ border: '2px inset #dfdfdf', padding: '2px', fontSize: '11px', fontFamily: 'ms_sans_serif' }}>
          <option value="copy">copy</option><option value="move">move</option>
        </select>);
      } else {
        nodes.push(<input key={label + '_v'} type={typeof val === 'number' ? 'number' : 'text'} value={String(val ?? '')}
          onChange={e => onUpdate(currentPath, typeof val === 'number' ? Number(e.target.value) : e.target.value)}
          style={{ border: '2px inset #dfdfdf', padding: '2px 4px', fontSize: '11px', fontFamily: 'ms_sans_serif' }} />);
      }
    }
  }
  return nodes;
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
  const [mediaType, setMediaType] = useState('');

  // Folder State
  const [folders, setFolders] = useState<FolderSummaryI[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderSummaryI | null>(null);
  const [folderFiles, setFolderFiles] = useState<Capture[]>([]);
  const [folderAgent, setFolderAgent] = useState('');
  const [moveTarget, setMoveTarget] = useState('');
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<number>>(new Set());

  // Detail State
  const [selectedCapture, setSelectedCapture] = useState<Capture | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Agent State
  const [agents, setAgents] = useState<Agent[]>([]);
  const [masterVersion, setMasterVersion] = useState('');
  const [masterHealth, setMasterHealth] = useState<'healthy' | 'unhealthy' | 'checking'>('checking');
  const [agentHealth, setAgentHealth] = useState<Record<string, 'healthy' | 'unhealthy' | 'checking'>>({});
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentIp, setNewAgentIp] = useState('');

  // Config State
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [nodeConfig, setNodeConfig] = useState<Record<string, unknown> | null>(null);
  const [configSaving, setConfigSaving] = useState(false);

  const loadConfig = (nodeId: string) => {
    if (editingNodeId === nodeId) { setEditingNodeId(null); return; }
    setEditingNodeId(nodeId);
    setNodeConfig(null);
    const url = nodeId === 'local' ? '/api/master/config' : `/api/agent/${nodeId}/config`;
    fetch(url).then(r => r.json()).then(setNodeConfig).catch(() => setNodeConfig(null));
  };
  const saveConfig = () => {
    if (!editingNodeId || !nodeConfig) return;
    setConfigSaving(true);
    const url = editingNodeId === 'local' ? '/api/master/config' : `/api/agent/${editingNodeId}/config`;
    fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nodeConfig) })
      .then(r => { if (!r.ok) throw new Error('Save failed'); alert('Config saved'); })
      .catch(err => alert('Failed: ' + err.message))
      .finally(() => setConfigSaving(false));
  };
  const updateConfigField = (path: string[], value: unknown) => {
    if (!nodeConfig) return;
    const updated = JSON.parse(JSON.stringify(nodeConfig));
    let obj = updated;
    for (let i = 0; i < path.length - 1; i++) {
      if (!obj[path[i]]) obj[path[i]] = {};
      obj = obj[path[i]];
    }
    obj[path[path.length - 1]] = value;
    setNodeConfig(updated);
  };

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
  }, [selectedMaker, selectedModel, selectedFileType, selectedAgent, dateFrom, dateTo, hasGps, mediaType]);

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
    if (mediaType) params.set('mediaType', mediaType);

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
  }, [page, selectedMaker, selectedModel, selectedFileType, selectedAgent, dateFrom, dateTo, hasGps, mediaType]);

  useEffect(() => { if (activeTab === 1) fetchAgents(); }, [activeTab]);

  const fetchAgents = () => {
    fetch('/api/agent/status').then(r => r.json()).then((data: Array<{id:string;name:string;endpoint:string;version:string;health:string;lastSeen?:string;scanStatus?:ScanStatus}>) => {
      const master = data.find(d => d.id === 'local');
      if (master) { setMasterVersion(master.version); setMasterHealth(master.health === 'healthy' ? 'healthy' : 'unhealthy'); }
      const agentList = data.filter(d => d.id !== 'local');
      setAgents(agentList.map(a => ({ id: a.id, name: a.name, endpoint: a.endpoint, version: a.version, lastSeen: a.lastSeen, scanStatus: a.scanStatus })));
      const h: Record<string, 'healthy' | 'unhealthy' | 'checking'> = {};
      agentList.forEach(a => { h[a.id] = a.health === 'healthy' ? 'healthy' : 'unhealthy'; });
      setAgentHealth(h);
    }).catch(console.error);
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
    setSelectedAgent(''); setDateFrom(''); setDateTo(''); setHasGps(false); setMediaType('');
  };

  // Folder functions
  const fetchFolders = () => {
    const params = folderAgent ? `?agentId=${encodeURIComponent(folderAgent)}` : '';
    fetch(`/api/experiment/folders${params}`).then(r => r.json()).then(setFolders).catch(console.error);
  };
  const fetchFolderFiles = (folder: FolderSummaryI) => {
    setSelectedFolder(folder);
    setSelectedFileIds(new Set());
    const params = new URLSearchParams({ path: folder.filePath });
    if (folder.agentId) params.set('agentId', folder.agentId);
    fetch(`/api/experiment/folder-files?${params}`).then(r => r.json()).then(setFolderFiles).catch(console.error);
  };
  useEffect(() => { if (activeTab === 2) fetchFolders(); }, [activeTab, folderAgent]);

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
              <Tab value={2}>Folders</Tab>
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
                      <span style={{ borderLeft: '1px solid #808080', height: '20px', margin: '0 2px' }} />
                      <Button size="sm" active={mediaType === ''} onClick={() => setMediaType('')}>All</Button>
                      <Button size="sm" active={mediaType === 'photo'} onClick={() => setMediaType('photo')}>Photos</Button>
                      <Button size="sm" active={mediaType === 'video'} onClick={() => setMediaType('video')}>Videos</Button>
                      <span style={{ borderLeft: '1px solid #808080', height: '20px', margin: '0 2px' }} />
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
                      <Button onClick={fetchAgents}>Refresh</Button>
                    </div>
                  </fieldset>
                  <ScrollView style={{ height: '300px' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeadCell>Name</TableHeadCell>
                          <TableHeadCell>IP</TableHeadCell>
                          <TableHeadCell>Port</TableHeadCell>
                          <TableHeadCell>Version</TableHeadCell>
                          <TableHeadCell>Health</TableHeadCell>
                          <TableHeadCell>Heartbeat</TableHeadCell>
                          <TableHeadCell>Actions</TableHeadCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow style={{ cursor: 'pointer', backgroundColor: editingNodeId === 'local' ? '#000080' : undefined, color: editingNodeId === 'local' ? '#fff' : undefined }}
                          onClick={() => loadConfig('local')}>
                          <TableDataCell>Master Local</TableDataCell>
                          <TableDataCell>{window.location.hostname}</TableDataCell>
                          <TableDataCell>5281</TableDataCell>
                          <TableDataCell>{masterVersion}</TableDataCell>
                          <TableDataCell style={{ color: masterHealth === 'healthy' ? 'green' : masterHealth === 'unhealthy' ? 'red' : '#666' }}>
                            {masterHealth === 'healthy' ? 'OK' : masterHealth === 'unhealthy' ? 'DOWN' : '...'}
                          </TableDataCell>
                          <TableDataCell>-</TableDataCell>
                          <TableDataCell>Built-in</TableDataCell>
                        </TableRow>
                        {agents.map(agent => {
                          let agentIp = '-', agentPort = '-';
                          try { const u = new URL(agent.endpoint); agentIp = u.hostname; agentPort = u.port; } catch {}
                          return (
                          <TableRow key={agent.id} style={{ cursor: 'pointer', backgroundColor: editingNodeId === agent.id ? '#000080' : undefined, color: editingNodeId === agent.id ? '#fff' : undefined }}
                            onClick={() => loadConfig(agent.id)}>
                            <TableDataCell>{agent.name}</TableDataCell>
                            <TableDataCell>{agentIp}</TableDataCell>
                            <TableDataCell>{agentPort}</TableDataCell>
                            <TableDataCell>{agent.version || '-'}</TableDataCell>
                            <TableDataCell style={{ color: agentHealth[agent.id] === 'healthy' ? 'green' : agentHealth[agent.id] === 'unhealthy' ? 'red' : '#666' }}>
                              {agentHealth[agent.id] === 'healthy' ? 'OK' : agentHealth[agent.id] === 'unhealthy' ? 'DOWN' : '...'}
                            </TableDataCell>
                            <TableDataCell>{agent.lastSeen ? new Date(agent.lastSeen).toLocaleString() : '-'}</TableDataCell>
                            <TableDataCell style={{ display: 'flex', gap: '4px' }} onClick={e => e.stopPropagation()}>
                              <Button size="sm" onClick={() => {
                                if (window.confirm(`Clear all records for "${agent.name}" and trigger rescan?`))
                                  fetch(`/api/experiment/agent/${agent.id}`, { method: 'DELETE' }).then(() => alert('Rescan triggered'));
                              }}>Rescan</Button>
                              <Button size="sm" onClick={() => handleDeleteAgent(agent.id)}>Delete</Button>
                            </TableDataCell>
                          </TableRow>
                        );})}
                      </TableBody>
                    </Table>
                  </ScrollView>

                  {/* Scan Status Panel */}
                  {editingNodeId && editingNodeId !== 'local' && (() => {
                    const a = agents.find(x => x.id === editingNodeId);
                    const s = a?.scanStatus;
                    if (!s) return null;
                    const fmtDur = (sec?: number) => { if (!sec) return '-'; const m = Math.floor(sec / 60); const ss = Math.floor(sec % 60); return m > 0 ? `${m}m ${ss}s` : `${ss}s`; };
                    const fmtTime = (t?: string) => t ? new Date(t).toLocaleString() : '-';
                    return (
                      <GroupBox label="Scan Status" style={{ marginTop: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '2px 8px', fontSize: '11px' }}>
                          <b>Status:</b><span style={{ color: s.isScanning ? '#008000' : '#666' }}>{s.isScanning ? 'Scanning...' : 'Idle'}</span>
                          {s.isScanning && <><b>Current File:</b><span style={{ wordBreak: 'break-all' }}>{s.currentFile || '-'}</span></>}
                          {s.isScanning && <><b>Files Processed:</b><span>{s.filesProcessed ?? 0}</span></>}
                          <b>Last Scan Start:</b><span>{fmtTime(s.lastScanStart)}</span>
                          <b>Last Scan End:</b><span>{fmtTime(s.lastScanEnd)}</span>
                          <b>Last Scan Duration:</b><span>{fmtDur(s.lastScanDurationSeconds)}</span>
                          <b>Next Scan:</b><span>{fmtTime(s.nextScanTime)}</span>
                          {s.lastError && <><b style={{ color: 'red' }}>Last Error:</b><span style={{ color: 'red' }}>{s.lastError}</span></>}
                        </div>
                      </GroupBox>
                    );
                  })()}

                  {/* Config Editor Panel */}
                  {editingNodeId && nodeConfig && (
                    <GroupBox label={`Config: ${editingNodeId === 'local' ? 'Master' : agents.find(a => a.id === editingNodeId)?.name || editingNodeId}`}
                      style={{ marginTop: '10px', maxHeight: '300px', overflow: 'auto' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '4px 8px', fontSize: '11px', alignItems: 'center' }}>
                        {renderConfigFields(nodeConfig, [], updateConfigField)}
                      </div>
                      <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                        <Button onClick={saveConfig} disabled={configSaving}>{configSaving ? 'Saving...' : 'Save'}</Button>
                        <Button onClick={() => setEditingNodeId(null)}>Cancel</Button>
                      </div>
                    </GroupBox>
                  )}
                  {editingNodeId && !nodeConfig && (
                    <div style={{ marginTop: '10px', padding: '10px', fontSize: '12px', color: '#666' }}>Loading config...</div>
                  )}
                </div>
              )}

              {activeTab === 2 && (
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
                    {/* Folder tree */}
                    <div style={{ flex: '0 0 350px', overflow: 'auto', border: '2px inset #dfdfdf', backgroundColor: '#fff', fontSize: '11px' }}>
                      <FolderTree folders={folders} selectedFolder={selectedFolder} onSelect={fetchFolderFiles} />
                    </div>
                    {/* File list */}
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
                  {/* Move dialog */}
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
