import { useState, useEffect, useRef, useCallback } from 'react';
import type { Agent } from '../types';
import { Button, Select, Checkbox } from '../ui';

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

  useEffect(() => { fetchLogs(); /* eslint-disable-next-line */ }, []);

  useEffect(() => {
    if (!logAutoRefresh) return;
    const interval = setInterval(() => fetchLogs(), 5000);
    return () => clearInterval(interval);
  }, [logAutoRefresh, fetchLogs]);

  return (
    <div className="col" style={{ flexGrow: 1, minHeight: 0, gap: 12 }}>
      <div className="toolbar" style={{ flexShrink: 0 }}>
        <div className="field"><label>Node</label>
          <Select options={[
            { label: 'Master (local)', value: 'local' },
            ...agents.map(a => ({ label: `${a.name || a.id}`, value: a.id }))
          ]} value={logNodeId} onChange={v => { setLogNodeId(v); fetchLogs(v); }} width={200} /></div>
        <div className="field"><label>Type</label>
          <Select options={[
            { label: 'All Logs', value: 'all' },
            { label: 'Errors Only', value: 'error' },
            ...(logNodeId !== 'local' ? [{ label: 'Scan Only', value: 'scan' }] : [])
          ]} value={logType} onChange={v => { setLogType(v); fetchLogs(undefined, v); }} width={140} /></div>
        <Button size="sm" onClick={() => fetchLogs()} disabled={logLoading}>{logLoading ? 'Loading…' : 'Refresh'}</Button>
        <Checkbox label="Auto-refresh 5s" checked={logAutoRefresh} onChange={() => setLogAutoRefresh(p => !p)} />
        <span className="spacer" />
        {logFile && <span className="faint" style={{ fontSize: 11 }}>{logFile} · {logLines.length} lines</span>}
      </div>
      <div className="logbox">
        {logLines.map((line, i) => {
          const isErr = /\[ERR\]|\[FTL\]/.test(line);
          const isWarn = /\[WRN\]/.test(line);
          return <div key={i} className={'log-line' + (isErr ? ' err' : isWarn ? ' warn' : '')}>{line}</div>;
        })}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
