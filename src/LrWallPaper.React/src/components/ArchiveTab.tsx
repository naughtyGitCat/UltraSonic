import { useState, useEffect } from 'react';
import type { ArchiveRecord, ArchiveStats } from '../types';
import { formatFileSize } from '../utils';
import { Button, Card, Badge } from '../ui';

export default function ArchiveTab() {
  const [stats, setStats] = useState<ArchiveStats | null>(null);
  const [records, setRecords] = useState<ArchiveRecord[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 50;

  const fetchData = (p = page) => {
    fetch(`/api/master/archive-history?page=${p}&pageSize=${pageSize}`)
      .then(r => r.json())
      .then((d: { total: number; items: ArchiveRecord[] }) => { setRecords(d.items); setTotal(d.total); })
      .catch(() => {});
    fetch('/api/master/archive-history/stats').then(r => r.json()).then(setStats).catch(() => {});
  };

  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, []);

  const totalPages = Math.ceil(total / pageSize);
  const trunc = (s: string, n: number, end = false) => s.length <= n ? s : (end ? '…' + s.slice(-n) : s.slice(0, n) + '…');

  return (
    <div className="col scroll-y" style={{ flexGrow: 1, gap: 14 }}>
      <Card title="Archive Statistics">
        {stats ? (
          <div className="stats">
            <div className="stat"><span className="stat-val">{stats.total}</span><span className="stat-label">Total Archived</span></div>
            <div className="stat"><span className="stat-val">{formatFileSize(stats.totalSize)}</span><span className="stat-label">Total Size</span></div>
            <div className="stat"><span className="stat-val" style={{ color: 'var(--success)' }}>{stats.today}</span><span className="stat-label">Today</span></div>
            {stats.devices?.length > 0 && (
              <div className="stat">
                <span className="row wrap" style={{ gap: 6 }}>
                  {stats.devices.map(d => <Badge key={d.device_name || 'u'}>{d.device_name || 'Unknown'} · {d.count}</Badge>)}
                </span>
                <span className="stat-label">Devices</span>
              </div>
            )}
          </div>
        ) : <span className="faint">Loading…</span>}
      </Card>

      {stats?.recentDays && stats.recentDays.length > 0 && (
        <Card title="Recent 7 Days">
          <div className="row wrap" style={{ gap: 18 }}>
            {stats.recentDays.map(d => (
              <div key={d.date} className="row" style={{ gap: 6 }}>
                <span className="faint">{d.date}</span><strong>{d.count}</strong>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="col" style={{ flexGrow: 1, minHeight: 0, gap: 8 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="card-title" style={{ margin: 0 }}>Archive History</div>
          <span className="faint" style={{ fontSize: 11 }}>{total} records</span>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>File</th><th>Source</th><th>Target</th><th>Size</th><th>Device</th><th>Agent</th><th>Mode</th><th>Archived At</th></tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  <td title={r.fileName}>{trunc(r.fileName, 28)}</td>
                  <td className="muted" title={r.sourcePath}>{trunc(r.sourcePath, 24, true)}</td>
                  <td title={r.targetPath}>{trunc(r.targetPath, 30, true)}</td>
                  <td className="muted">{formatFileSize(r.fileSize)}</td>
                  <td>{r.deviceName || '-'}</td>
                  <td className="muted">{r.agentName || '-'}</td>
                  <td>{r.transferMode === 'move'
                    ? <Badge kind="accent">move</Badge>
                    : <Badge kind="success">copy</Badge>}</td>
                  <td className="muted">{new Date(r.archivedAt).toLocaleString()}</td>
                </tr>
              ))}
              {records.length === 0 && <tr><td colSpan={8} className="cell-empty">No archive records yet</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="row" style={{ justifyContent: 'flex-end', gap: 6 }}>
          <Button size="sm" disabled={page <= 1} onClick={() => { const np = page - 1; setPage(np); fetchData(np); }}>‹ Prev</Button>
          <span className="muted" style={{ padding: '0 8px', fontSize: 12 }}>{page} / {totalPages || 1}</span>
          <Button size="sm" disabled={page >= totalPages} onClick={() => { const np = page + 1; setPage(np); fetchData(np); }}>Next ›</Button>
          <Button size="sm" variant="ghost" onClick={() => fetchData(page)}>Refresh</Button>
        </div>
      </div>
    </div>
  );
}
