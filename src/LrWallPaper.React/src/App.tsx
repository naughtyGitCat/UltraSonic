import { useState, useEffect } from 'react';
import type { FilterOptions, Agent, ScanStatus } from './types';
import { ThemeToggle } from './ui';
import GalleryTab from './components/GalleryTab';
import NodeConfigTab from './components/NodeConfigTab';
import FoldersTab from './components/FoldersTab';
import LogsTab from './components/LogsTab';
import BackupTab from './components/BackupTab';
import ArchiveTab from './components/ArchiveTab';

const TABS = ['Gallery', 'Nodes', 'Folders', 'Logs', 'Backup', 'Archive'];

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ cameraMakers: [], cameraModels: [], fileTypes: [], agentIds: [] });
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
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-dot" />
          UltraSonic
          <span className="faint" style={{ fontWeight: 500, fontSize: 12 }}>· Control Panel</span>
        </div>
        <ThemeToggle />
      </header>

      <div className="app-main">
        <nav className="tabs">
          {TABS.map((t, i) => (
            <button key={t} className={'tab' + (activeTab === i ? ' active' : '')}
              onClick={() => setActiveTab(i)}>
              {t}
            </button>
          ))}
        </nav>

        <div className="tab-body">
          {activeTab === 0 && <GalleryTab />}
          {activeTab === 1 && <NodeConfigTab />}
          {activeTab === 2 && <FoldersTab filterOptions={filterOptions} />}
          {activeTab === 3 && <LogsTab agents={agents} />}
          {activeTab === 4 && <BackupTab />}
          {activeTab === 5 && <ArchiveTab />}
        </div>
      </div>
    </div>
  );
}

export default App;
