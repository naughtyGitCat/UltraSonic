import { useState, useEffect } from 'react';
import type { BackupStats, BackupTask } from '../types';
import { Button, Card, Badge } from '../ui';

export default function BackupTab() {
  const [stats, setStats] = useState<BackupStats | null>(null);
  const [recent, setRecent] = useState<BackupTask[]>([]);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ok:boolean; message:string} | null>(null);

  const fetchStats = () => {
    fetch('/api/backup/stats').then(r => r.json()).then(setStats).catch(() => {});
    fetch('/api/backup/recent?limit=30').then(r => r.json()).then(setRecent).catch(() => {});
  };

  useEffect(() => { fetchStats(); }, []);

  const statusBadge = (s: string) =>
    s === 'completed' ? <Badge kind="success">{s}</Badge>
    : s === 'failed' ? <Badge kind="danger">{s}</Badge>
    : s === 'uploading' ? <Badge kind="accent">{s}</Badge>
    : <Badge kind="warn">{s}</Badge>;

  return (
    <div className="col scroll-y" style={{ flexGrow: 1, gap: 14 }}>
      <Card title="115 Cloud Backup">
        {stats ? (
          <div className="stats">
            <div className="stat"><span className="stat-val">{stats.totalFiles}</span><span className="stat-label">Total Files</span></div>
            <div className="stat"><span className="stat-val" style={{ color: 'var(--success)' }}>{stats.backedUp}</span><span className="stat-label">Backed Up</span></div>
            <div className="stat"><span className="stat-val" style={{ color: 'var(--warn)' }}>{stats.pending}</span><span className="stat-label">Pending</span></div>
            <div className="stat"><span className="stat-val" style={{ color: 'var(--accent)' }}>{stats.uploading}</span><span className="stat-label">Uploading</span></div>
            <div className="stat"><span className="stat-val" style={{ color: 'var(--danger)' }}>{stats.failed}</span><span className="stat-label">Failed</span></div>
            <div className="stat"><span className="stat-val faint">{stats.notQueued}</span><span className="stat-label">Not Queued</span></div>
            {stats.totalFiles > 0 && (
              <div className="stat"><span className="stat-val">{((stats.backedUp / stats.totalFiles) * 100).toFixed(1)}%</span><span className="stat-label">Progress</span></div>
            )}
          </div>
        ) : <span className="faint">Loading…</span>}
      </Card>

      <Card title="Actions">
        <div className="toolbar">
          <Button size="sm" disabled={testing} onClick={() => {
            setTesting(true); setTestResult(null);
            fetch('/api/backup/test', { method: 'POST' }).then(r => r.json())
              .then((d: {ok:boolean; message:string}) => setTestResult(d))
              .catch(err => setTestResult({ ok: false, message: err.message }))
              .finally(() => setTesting(false));
          }}>{testing ? 'Testing…' : 'Test Connection'}</Button>
          <Button size="sm" onClick={() => {
            fetch('/api/backup/queue-all?limit=100', { method: 'POST' }).then(r => r.json())
              .then((d: {queued:number}) => { alert(`Queued ${d.queued} files for backup`); fetchStats(); });
          }}>Queue Unbackup Files</Button>
          <Button size="sm" variant="primary" onClick={() => {
            fetch('/api/backup/process?limit=10', { method: 'POST' }).then(r => r.json())
              .then((d: {processed:number; succeeded:number; failed:number}) => {
                alert(`Processed: ${d.processed}, Succeeded: ${d.succeeded}, Failed: ${d.failed}`);
                fetchStats();
              });
          }}>Process Queue (10)</Button>
          <Button size="sm" onClick={() => {
            fetch('/api/backup/retry-failed', { method: 'POST' }).then(() => { alert('Failed tasks reset'); fetchStats(); });
          }}>Retry Failed</Button>
          <span className="spacer" />
          <Button size="sm" variant="ghost" onClick={fetchStats}>Refresh</Button>
        </div>
        {testResult && (
          <div style={{ marginTop: 10, fontSize: 12, color: testResult.ok ? 'var(--success)' : 'var(--danger)' }}>
            {testResult.ok ? '✓ OK' : '✗ FAILED'} — {testResult.message}
          </div>
        )}
      </Card>

      <div className="col" style={{ flexGrow: 1, minHeight: 0, gap: 8 }}>
        <div className="card-title">Recent Backup Tasks</div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>File</th><th>Status</th><th>Remote Path</th><th>Last Attempt</th><th>Error</th></tr></thead>
            <tbody>
              {recent.map(t => (
                <tr key={t.id}>
                  <td>{t.fileName || `#${t.fileId}`}</td>
                  <td>{statusBadge(t.status)}</td>
                  <td className="muted">{t.remotePath || '-'}</td>
                  <td className="muted">{t.lastAttempt ? new Date(t.lastAttempt).toLocaleString() : '-'}</td>
                  <td style={{ color: 'var(--danger)' }}>{t.errorMessage || ''}</td>
                </tr>
              ))}
              {recent.length === 0 && <tr><td colSpan={5} className="cell-empty">No backup tasks yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="faint" style={{ fontSize: 11 }}>
        Configure 115 Cookie &amp; backup settings in Nodes → Master config → Backup section.
      </div>
    </div>
  );
}
