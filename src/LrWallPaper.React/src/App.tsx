import { useState, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, Window, WindowHeader, WindowContent, Button, Tabs, Tab, TabBody } from 'react95';
import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import type { FilterOptions, Agent, ScanStatus } from './types';
import GalleryTab from './components/GalleryTab';
import NodeConfigTab from './components/NodeConfigTab';
import FoldersTab from './components/FoldersTab';
import LogsTab from './components/LogsTab';
import BackupTab from './components/BackupTab';

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

function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Shared data needed by FoldersTab (agentIds for source filter)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ cameraMakers: [], cameraModels: [], fileTypes: [], agentIds: [] });
  // Agent list for LogsTab node selector
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    fetch('/api/experiment/filters').then(r => r.json()).then(setFilterOptions).catch(console.error);
  }, []);

  useEffect(() => {
    if (activeTab === 3) {
      fetch('/api/agent/status').then(r => r.json()).then((data: Array<{id:string;name:string;endpoint:string;version:string;health:string;lastSeen?:string;scanStatus?:ScanStatus}>) => {
        setAgents(data.filter(d => d.id !== 'local').map(a => ({ id: a.id, name: a.name, endpoint: a.endpoint, version: a.version, lastSeen: a.lastSeen, scanStatus: a.scanStatus })));
      }).catch(console.error);
    }
  }, [activeTab]);

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
              <Tab value={1}>Node Config</Tab>
              <Tab value={2}>Folders</Tab>
              <Tab value={3}>Logs</Tab>
              <Tab value={4}>Backup</Tab>
            </Tabs>

            <TabBody style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '10px', minHeight: 0, overflow: 'hidden' }}>
              {activeTab === 0 && <GalleryTab />}
              {activeTab === 1 && <NodeConfigTab />}
              {activeTab === 2 && <FoldersTab filterOptions={filterOptions} />}
              {activeTab === 3 && <LogsTab agents={agents} />}
              {activeTab === 4 && <BackupTab />}
            </TabBody>
          </WindowContent>
        </Window>
      </ThemeProvider>
    </>
  );
}

export default App;
