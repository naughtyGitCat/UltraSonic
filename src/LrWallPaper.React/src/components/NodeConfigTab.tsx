import { useState, useEffect } from 'react';
import { Button, TextInput, ScrollView, GroupBox, Table, TableHead, TableRow, TableHeadCell, TableBody, TableDataCell } from 'react95';
import type { Agent, ScanStatus } from '../types';
import { renderConfigFields } from '../utils';

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

  return (
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
          <Button onClick={() => {
            if (window.confirm('Clear image cache on Master and all Agents?'))
              fetch('/api/cache', { method: 'DELETE' }).then(r => r.json()).then(d => alert(`Cache cleared: ${d.masterCleared} files, ${d.agentsNotified} agents notified`));
          }}>Clear Cache</Button>
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

      {/* Image Recognition Settings */}
      {editingNodeId === 'local' && (
        <GroupBox label="Image Recognition" style={{ marginTop: '10px' }}>
          <div style={{ fontSize: '11px' }}>
            {['Claude', 'OpenAI', 'Gemini'].map(p => (
              <div key={p} style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
                <b style={{ width: '50px' }}>{p}:</b>
                <input type="password" placeholder="API Key"
                  style={{ flex: 1, border: '2px inset #dfdfdf', padding: '2px 4px', fontSize: '11px', fontFamily: 'ms_sans_serif' }}
                  defaultValue={(() => { try { return (nodeConfig as any)?.UltraSonic?.Recognition?.ApiKeys?.[p] || ''; } catch { return ''; } })()}
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
        </GroupBox>
      )}

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
  );
}
