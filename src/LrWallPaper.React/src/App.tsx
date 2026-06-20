import { useState, useEffect } from 'react';
import type { FilterOptions, Agent, ScanStatus } from './types';
import { ThemeToggle, Button } from './ui';
import GalleryTab from './components/GalleryTab';
import NodeConfigTab from './components/NodeConfigTab';
import FoldersTab from './components/FoldersTab';
import LogsTab from './components/LogsTab';
import BackupTab from './components/BackupTab';
import ArchiveTab from './components/ArchiveTab';
import TombstonesTab from './components/TombstonesTab';
import Login from './components/Login';
import { authEnabled, fetchMe, getEmail, clearSession } from './auth';

const TABS = ['Gallery', 'Nodes', 'Folders', 'Logs', 'Backup', 'Archive', 'Deleted'];

type Gate = 'checking' | 'open' | 'needsLogin' | 'signedIn';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ cameraMakers: [], cameraModels: [], fileTypes: [], agentIds: [] });
  const [agents, setAgents] = useState<Agent[]>([]);
  const [gate, setGate] = useState<Gate>('checking');
  const [email, setEmail] = useState<string | null>(getEmail());

  // Decide the auth gate on load: auth off -> open; valid token -> signedIn; else login.
  useEffect(() => {
    (async () => {
      if (!(await authEnabled())) { setGate('open'); return; }
      const me = await fetchMe();
      if (me) { setEmail(me.email); setGate('signedIn'); }
      else setGate('needsLogin');
    })();
  }, []);

  const gated = gate === 'checking' || gate === 'needsLogin';

  useEffect(() => {
    if (gated) return;
    fetch('/api/experiment/filters').then(r => r.json()).then(setFilterOptions).catch(console.error);
  }, [gated]);

  useEffect(() => {
    if (activeTab === 3) {
      fetch('/api/agent/status').then(r => r.json()).then((data: Array<{id:string;name:string;endpoint:string;version:string;health:string;lastSeen?:string;scanStatus?:ScanStatus}>) => {
        setAgents(data.filter(d => d.id !== 'local').map(a => ({ id: a.id, name: a.name, endpoint: a.endpoint, version: a.version, lastSeen: a.lastSeen, scanStatus: a.scanStatus })));
      }).catch(console.error);
    }
  }, [activeTab]);

  if (gate === 'checking') {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }} className="faint">Connecting…</div>;
  }
  if (gate === 'needsLogin') {
    return <Login onAuthed={() => { setEmail(getEmail()); setGate('signedIn'); }} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-dot" />
          UltraSonic
          <span className="faint" style={{ fontWeight: 500, fontSize: 12 }}>· Control Panel</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {gate === 'signedIn' && (
            <>
              {email && <span className="faint" style={{ fontSize: 12 }}>{email}</span>}
              <Button variant="ghost" size="sm" onClick={() => { clearSession(); setGate('needsLogin'); }}>Sign out</Button>
            </>
          )}
          <ThemeToggle />
        </div>
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
          {activeTab === 6 && <TombstonesTab />}
        </div>
      </div>
    </div>
  );
}

export default App;
