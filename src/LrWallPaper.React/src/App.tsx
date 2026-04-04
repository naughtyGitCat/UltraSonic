import { useState, useEffect, useRef, useCallback } from 'react';
import heic2any from 'heic2any';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, Window, WindowHeader, WindowContent, Button, ScrollView, Tabs, Tab, TabBody, TextInput, Table, TableHead, TableRow, TableHeadCell, TableBody, TableDataCell } from 'react95';
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
  }
`;

interface Capture {
  fileFullPath: string;
  filePath: string;
  fileName: string;
  captureTime?: string;
  agentId?: string;
}

interface Agent {
  id: string;
  name: string;
  endpoint: string;
}

function HeicImage({ src, alt, style }: { src: string; alt: string; style: React.CSSProperties }) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const converting = useRef(false);

  useEffect(() => {
    if (!alt.toLowerCase().endsWith('.heic')) return;
    const el = imgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !converting.current) {
        converting.current = true;
        obs.disconnect();
        fetch(src)
          .then(r => r.blob())
          .then(blob => heic2any({ blob, toType: 'image/jpeg', quality: 0.8 }))
          .then(result => {
            const jpeg = Array.isArray(result) ? result[0] : result;
            setObjectUrl(URL.createObjectURL(jpeg));
          })
          .catch(() => setObjectUrl(src));
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [src, alt]);

  useEffect(() => {
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [objectUrl]);

  const isHeic = alt.toLowerCase().endsWith('.heic');
  if (!isHeic) return <img src={src} alt={alt} loading="lazy" style={style} />;

  return (
    <div ref={imgRef} style={style}>
      {objectUrl ? <img src={objectUrl} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '11px' }}>Loading HEIC...</div>}
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

  // Agent State
  const [agents, setAgents] = useState<Agent[]>([]);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentIp, setNewAgentIp] = useState('');

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (!hasMore) return;
    
    setLoading(true);
    fetch(`/api/Experiment/page?page=${page}&pageSize=30`)
      .then(res => res.json())
      .then((data: Capture[]) => {
        if (!data || data.length === 0) {
          setHasMore(false);
        } else {
          setCaptures(prev => {
            const map = new Map([...prev, ...data].map(x => [x.fileName + x.captureTime, x]));
            return Array.from(map.values());
          });
          if (data.length < 30) setHasMore(false);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    if (activeTab === 1) {
      fetchAgents();
    }
  }, [activeTab]);

  const fetchAgents = () => {
    fetch('/api/agent')
      .then(res => res.json())
      .then(data => setAgents(data))
      .catch(console.error);
  };

  const handleAddAgent = () => {
    fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newAgentName, endpoint: newAgentIp })
    })
    .then(() => {
      setNewAgentName('');
      setNewAgentIp('');
      fetchAgents();
    });
  };

  const handleDeleteAgent = (id: string) => {
    fetch(`/api/agent/${id}`, { method: 'DELETE' })
      .then(() => fetchAgents());
  };

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Window style={{ width: '90vw', height: '90vh', maxWidth: '1200px', display: 'flex', flexDirection: 'column' }}>
          <WindowHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>🖼️ UltraSonic_Control_Panel.exe</span>
            <Button>
              <span className="close-icon" />X
            </Button>
          </WindowHeader>
          <WindowContent style={{ flexGrow: 1, padding: '0.5rem', display: 'flex', flexDirection: 'column', height: 'calc(100% - 35px)' }}>
            
            <Tabs value={activeTab} onChange={(v) => setActiveTab(v)}>
              <Tab value={0}>Gallery</Tab>
              <Tab value={1}>Node Config (Agents)</Tab>
            </Tabs>

            <TabBody style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
              
              {activeTab === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%' }}>
                  <div style={{ marginBottom: '10px' }}>
                    Showing {captures.length} files (Scrolling to load more)
                  </div>
                  <ScrollView style={{ flexGrow: 1, width: '100%', backgroundColor: '#fff', paddingTop: '10px' }}>
                    <div style={{ 
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
                        gap: '12px', padding: '12px' 
                      }}>
                        {captures.map((pic, index) => {
                          const isLast = index === captures.length - 1;
                          const absolutePath = pic.fileFullPath || `${pic.filePath}\\${pic.fileName}`;
                          const displayDate = pic.captureTime ? new Date(pic.captureTime).toLocaleString() : '';
                          const imgSrc = `/api/image?path=${encodeURIComponent(absolutePath)}&agentId=${pic.agentId || 'local'}`;

                          return (
                            <div 
                              ref={isLast ? lastElementRef : null}
                              key={`${pic.fileName}_${index}`} 
                              style={{ 
                                border: '2px solid #dfdfdf', borderBottomColor: '#808080', borderRightColor: '#808080',
                                padding: '4px', textAlign: 'center', backgroundColor: '#c0c0c0'
                              }}
                            >
                              <HeicImage
                                src={imgSrc}
                                alt={pic.fileName}
                                style={{ width: '100%', height: '160px', objectFit: 'cover', border: '2px inset #dfdfdf', backgroundColor: '#000' }}
                              />
                              <div style={{ fontSize: '11px', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '2px' }}>
                                {pic.fileName}
                              </div>
                              {displayDate && <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>{displayDate}</div>}
                              {pic.agentId && pic.agentId !== 'local' && <div style={{ fontSize: '10px', color: '#000080', marginTop: '2px' }}>☁ Node: {pic.agentId.substring(0,8)}</div>}
                            </div>
                          );
                        })}
                    </div>
                    {loading && <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>Loading please wait...</div>}
                    {!hasMore && captures.length > 0 && <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>No more pictures found.</div>}
                    {!loading && !hasMore && captures.length === 0 && <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>Your gallery is empty.</div>}
                  </ScrollView>
                </div>
              )}

              {activeTab === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <fieldset style={{ border: '2px solid groove', padding: '15px' }}>
                    <legend>Register New Edge Node</legend>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <label>Name:</label>
                      <TextInput 
                        placeholder="e.g. Z690 Desktop" 
                        value={newAgentName} 
                        onChange={(e) => setNewAgentName(e.target.value)} 
                      />
                      <label>API Endpoint:</label>
                      <TextInput 
                        placeholder="e.g. http://192.168.1.100:5000" 
                        value={newAgentIp}
                        onChange={(e) => setNewAgentIp(e.target.value)} 
                        style={{ width: '250px' }} 
                      />
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
                            <TableDataCell>
                              <Button onClick={() => handleDeleteAgent(agent.id)}>Delete</Button>
                            </TableDataCell>
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
      </ThemeProvider>
    </>
  );
}

export default App;
