import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Select, Checkbox } from 'react95';
import type { Agent } from '../types';

interface Props {
  agents: Agent[];
}

export default function LogsTab({ agents }: Props) {
  const [logNodeId, setLogNodeId] = useState('local');
  const [logType, setLogType] = useState('all');
  const [logLines, setLogLines] = useState<string[]>([]);
  const [logFile, setLogFile] = useState('');
  const [logLoading, setLogLoading] = useState(false);
  const [logAutoRefresh, setLogAutoRefresh] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const fetchLogs = useCallback((nodeId?: string, type?: string) => {
    const nid = nodeId ?? logNodeId;
    const t = type ?? logType;
    setLogLoading(true);
    fetch(`/api/agent/${nid}/logs?type=${t}&lines=500`)
      .then(r => r.json())
      .then(data => {
        setLogLines(data.lines || []);
        setLogFile(data.file || '');
        setTimeout(() => logEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .catch(() => setLogLines(['Failed to load logs']))
      .finally(() => setLogLoading(false));
  }, [logNodeId, logType]);

  useEffect(() => { fetchLogs(); }, []);

  useEffect(() => {
    if (!logAutoRefresh) return;
    const interval = setInterval(() => fetchLogs(), 5000);
    return () => clearInterval(interval);
  }, [logAutoRefresh, fetchLogs]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexShrink: 0, flexWrap: 'wrap' }}>
        <label style={{ fontSize: '11px' }}>Node:</label>
        <Select options={[
          { label: 'Master (local)', value: 'local' },
          ...agents.map(a => ({ label: `${a.name || a.id} (${a.endpoint})`, value: a.id }))
        ]} value={logNodeId} onChange={(e) => { setLogNodeId(e.value as string); fetchLogs(e.value as string); }} width={200} menuMaxHeight={200} />
        <label style={{ fontSize: '11px' }}>Type:</label>
        <Select options={[
          { label: 'All Logs', value: 'all' },
          { label: 'Errors Only', value: 'error' },
          ...(logNodeId !== 'local' ? [{ label: 'Scan Only', value: 'scan' }] : [])
        ]} value={logType} onChange={(e) => { setLogType(e.value as string); fetchLogs(undefined, e.value as string); }} width={140} menuMaxHeight={200} />
        <Button size="sm" onClick={() => fetchLogs()} disabled={logLoading}>
          {logLoading ? 'Loading...' : 'Refresh'}
        </Button>
        <Checkbox label="Auto-refresh (5s)" checked={logAutoRefresh} onChange={() => setLogAutoRefresh(p => !p)} />
        {logFile && <span style={{ fontSize: '10px', color: '#666' }}>File: {logFile} ({logLines.length} lines)</span>}
      </div>
      <div style={{
        flexGrow: 1, overflow: 'auto', border: '2px inset #dfdfdf', backgroundColor: '#000',
        color: '#0f0', fontFamily: 'Consolas, "Courier New", monospace', fontSize: '11px',
        padding: '6px', whiteSpace: 'pre', lineHeight: '1.4'
      }}>
        {logLines.map((line, i) => {
          const isErr = /\[ERR\]|\[FTL\]/.test(line);
          const isWarn = /\[WRN\]/.test(line);
          return (
            <div key={i} style={{
              color: isErr ? '#ff4444' : isWarn ? '#ffaa00' : '#00ff00',
              fontWeight: isErr ? 'bold' : 'normal'
            }}>{line}</div>
          );
        })}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
