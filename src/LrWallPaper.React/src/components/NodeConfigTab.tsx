import { useState, useEffect } from 'react';
import type { Agent, ScanStatus } from '../types';
import { renderConfigFields } from '../utils';
import { Button, TextInput, Card, Badge } from '../ui';

export default function NodeConfigTab() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [masterVersion, setMasterVersion] = useState('');
  const [masterHealth, setMasterHealth] = useState<'healthy' | 'unhealthy' | 'checking'>('checking');
  const [agentHealth, setAgentHealth] = useState<Record<string, 'healthy' | 'unhealthy' | 'checking'>>({});
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentIp, setNewAgentIp] = useState('');

  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [nodeConfig, setNodeConfig] = useState<Record<string, unknown> | null>(null);
  const [configSaving, setConfigSaving] = useState(false);

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

  useEffect(() => { fetchAgents(); }, []);

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

  const handleAddAgent = () => {
    fetch('/api/agent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newAgentName, endpoint: newAgentIp }) })
      .then(() => { setNewAgentName(''); setNewAgentIp(''); fetchAgents(); });
  };

  const handleDeleteAgent = (id: string) => {
    fetch(`/api/agent/${id}`, { method: 'DELETE' }).then(() => fetchAgents());
  };

  const healthBadge = (h: 'healthy' | 'unhealthy' | 'checking') =>
    h === 'healthy' ? <Badge kind="success"><span className="dot" />Online</Badge>
    : h === 'unhealthy' ? <Badge kind="danger"><span className="dot" />Down</Badge>
    : <Badge>…</Badge>;

  const editingName = editingNodeId === 'local' ? 'Master' : agents.find(a => a.id === editingNodeId)?.name || editingNodeId;

  return (
    <div className="col scroll-y" style={{ flexGrow: 1, gap: 14 }}>
      <Card title="Register Edge Node">
        <div className="toolbar">
          <div className="field"><label>Name</label>
            <TextInput placeholder="e.g. Z690 Desktop" value={newAgentName} onChange={e => setNewAgentName(e.target.value)} /></div>
          <div className="field"><label>Endpoint</label>
            <TextInput placeholder="http://192.168.1.100:5282" value={newAgentIp} onChange={e => setNewAgentIp(e.target.value)} style={{ width: 240 }} /></div>
          <Button variant="primary" size="sm" onClick={handleAddAgent}>Add Node</Button>
          <Button size="sm" onClick={fetchAgents}>Refresh</Button>
          <span className="spacer" />
          <Button size="sm" variant="danger" onClick={() => {
            if (window.confirm('Clear image cache on Master and all Agents?'))
              fetch('/api/cache', { method: 'DELETE' }).then(r => r.json()).then(d => alert(`Cache cleared: ${d.masterCleared} files, ${d.agentsNotified} agents notified`));
          }}>Clear Cache</Button>
        </div>
      </Card>

      <div className="tbl-wrap" style={{ maxHeight: 320, flex: 'none' }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Name</th><th>Host</th><th>Port</th><th>Version</th><th>Health</th><th>Heartbeat</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className={'row-click' + (editingNodeId === 'local' ? ' row-sel' : '')} onClick={() => loadConfig('local')}>
              <td><strong>Master Local</strong></td>
              <td>{window.location.hostname}</td>
              <td>5281</td>
              <td className="muted">{masterVersion}</td>
              <td>{healthBadge(masterHealth)}</td>
              <td className="faint">—</td>
              <td className="faint">Built-in</td>
            </tr>
            {agents.map(agent => {
              let agentIp = '-', agentPort = '-';
              try { const u = new URL(agent.endpoint); agentIp = u.hostname; agentPort = u.port; } catch { /* ignore */ }
              return (
                <tr key={agent.id} className={'row-click' + (editingNodeId === agent.id ? ' row-sel' : '')} onClick={() => loadConfig(agent.id)}>
                  <td><strong>{agent.name}</strong></td>
                  <td>{agentIp}</td>
                  <td>{agentPort}</td>
                  <td className="muted">{agent.version || '-'}</td>
                  <td>{healthBadge(agentHealth[agent.id])}</td>
                  <td className="muted">{agent.lastSeen ? new Date(agent.lastSeen).toLocaleString() : '-'}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <div className="row" style={{ gap: 6 }}>
                      <Button size="sm" onClick={() => {
                        if (window.confirm(`Clear all records for "${agent.name}" and trigger rescan?`))
                          fetch(`/api/experiment/agent/${agent.id}`, { method: 'DELETE' }).then(() => alert('Rescan triggered'));
                      }}>Rescan</Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteAgent(agent.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingNodeId && editingNodeId !== 'local' && (() => {
        const a = agents.find(x => x.id === editingNodeId);
        const s = a?.scanStatus;
        if (!s) return null;
        const fmtDur = (sec?: number) => { if (!sec) return '-'; const m = Math.floor(sec / 60); const ss = Math.floor(sec % 60); return m > 0 ? `${m}m ${ss}s` : `${ss}s`; };
        const fmtTime = (t?: string) => t ? new Date(t).toLocaleString() : '-';
        return (
          <Card title="Scan Status">
            <div className="cfg-grid" style={{ gridTemplateColumns: '150px 1fr' }}>
              <label>Status</label><span style={{ color: s.isScanning ? 'var(--success)' : 'var(--text-muted)' }}>{s.isScanning ? 'Scanning…' : 'Idle'}</span>
              {s.isScanning && <><label>Current File</label><span style={{ wordBreak: 'break-all' }}>{s.currentFile || '-'}</span></>}
              {s.isScanning && <><label>Files Processed</label><span>{s.filesProcessed ?? 0}</span></>}
              <label>Last Scan Start</label><span>{fmtTime(s.lastScanStart)}</span>
              <label>Last Scan End</label><span>{fmtTime(s.lastScanEnd)}</span>
              <label>Last Duration</label><span>{fmtDur(s.lastScanDurationSeconds)}</span>
              <label>Next Scan</label><span>{fmtTime(s.nextScanTime)}</span>
              {s.lastError && <><label style={{ color: 'var(--danger)' }}>Last Error</label><span style={{ color: 'var(--danger)' }}>{s.lastError}</span></>}
            </div>
          </Card>
        );
      })()}

      {editingNodeId === 'local' && (
        <Card title="Image Recognition">
          <div className="col" style={{ gap: 8 }}>
            {['Claude', 'OpenAI', 'Gemini'].map(p => (
              <div key={p} className="row" style={{ gap: 8 }}>
                <strong style={{ width: 56 }}>{p}</strong>
                <input type="password" placeholder="API Key" className="input" style={{ flex: 1 }}
                  defaultValue={(() => { try { return (nodeConfig as Record<string, any>)?.UltraSonic?.Recognition?.ApiKeys?.[p] || ''; } catch { return ''; } })()}
                  onChange={e => {
                    if (!nodeConfig) return;
                    const c = JSON.parse(JSON.stringify(nodeConfig));
                    if (!c.UltraSonic) c.UltraSonic = {};
                    if (!c.UltraSonic.Recognition) c.UltraSonic.Recognition = {};
                    if (!c.UltraSonic.Recognition.ApiKeys) c.UltraSonic.Recognition.ApiKeys = {};
                    c.UltraSonic.Recognition.ApiKeys[p] = e.target.value;
                    setNodeConfig(c);
                  }} />
                <Button size="sm" onClick={() => {
                  fetch('/api/recognition/test', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ provider: p }) })
                    .then(r => r.json()).then((d: {ok:boolean;message:string}) => alert(`${p}: ${d.ok ? 'OK' : 'Failed'} - ${d.message}`));
                }}>Test</Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {editingNodeId && nodeConfig && (
        <Card title={`Config — ${editingName}`}>
          <div className="cfg-grid" style={{ maxHeight: 320, overflow: 'auto' }}>
            {renderConfigFields(nodeConfig, [], updateConfigField)}
          </div>
          <div className="row" style={{ gap: 8, marginTop: 12 }}>
            <Button variant="primary" onClick={saveConfig} disabled={configSaving}>{configSaving ? 'Saving…' : 'Save'}</Button>
            <Button variant="ghost" onClick={() => setEditingNodeId(null)}>Cancel</Button>
          </div>
        </Card>
      )}
      {editingNodeId && !nodeConfig && <div className="muted" style={{ padding: 10 }}>Loading config…</div>}
    </div>
  );
}
