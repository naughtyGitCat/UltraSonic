import { useState, useEffect } from 'react';
import { Button, GroupBox, Table, TableHead, TableRow, TableHeadCell, TableBody, TableDataCell } from 'react95';
import type { ArchiveRecord, ArchiveStats } from '../types';
import { formatFileSize } from '../utils';

export default function ArchiveTab() {
  const [stats, setStats] = useState<ArchiveStats | null>(null);
  const [records, setRecords] = useState<ArchiveRecord[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 50;

  const fetchData = (p = page) => {
    fetch(`/api/master/archive-history?page=${p}&pageSize=${pageSize}`)
      .then(r => r.json())
      .then((d: { total: number; items: ArchiveRecord[] }) => {
        setRecords(d.items);
        setTotal(d.total);
      })
      .catch(() => {});
    fetch('/api/master/archive-history/stats')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});
  };

  useEffect(() => { fetchData(); }, []);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'auto' }}>
      <GroupBox label="Archive Statistics">
        {stats ? (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '12px' }}>
            <div><strong>Total Archived:</strong> {stats.total}</div>
            <div><strong>Total Size:</strong> {formatFileSize(stats.totalSize)}</div>
            <div style={{ color: '#008000' }}><strong>Today:</strong> {stats.today}</div>
            {stats.devices?.length > 0 && (
              <div><strong>Devices:</strong> {stats.devices.map(d => `${d.device_name || 'Unknown'}(${d.count})`).join(', ')}</div>
            )}
          </div>
        ) : <span style={{ fontSize: '11px', color: '#888' }}>Loading...</span>}
      </GroupBox>

      {stats?.recentDays && stats.recentDays.length > 0 && (
        <GroupBox label="Recent 7 Days" style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '11px' }}>
            {stats.recentDays.map(d => (
              <div key={d.date}>
                <span style={{ color: '#666' }}>{d.date}:</span> <strong>{d.count}</strong>
              </div>
            ))}
          </div>
        </GroupBox>
      )}

      <GroupBox label="Archive History" style={{ marginTop: '8px', flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflow: 'auto', flexGrow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell style={{ fontSize: '10px' }}>File</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Source</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Target</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Size</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Device</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Agent</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Mode</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Archived At</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map(r => (
                <TableRow key={r.id}>
                  <TableDataCell style={{ fontSize: '10px' }} title={r.fileName}>{r.fileName.length > 30 ? r.fileName.slice(0, 30) + '...' : r.fileName}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px', color: '#666' }} title={r.sourcePath}>{r.sourcePath.length > 25 ? '...' + r.sourcePath.slice(-25) : r.sourcePath}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px' }} title={r.targetPath}>{r.targetPath.length > 30 ? '...' + r.targetPath.slice(-30) : r.targetPath}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px' }}>{formatFileSize(r.fileSize)}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px' }}>{r.deviceName || '-'}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px' }}>{r.agentName || '-'}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px', color: r.transferMode === 'move' ? '#800080' : '#008000' }}>{r.transferMode}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px' }}>{new Date(r.archivedAt).toLocaleString()}</TableDataCell>
                </TableRow>
              ))}
              {records.length === 0 && (
                <TableRow><td colSpan={8} style={{ fontSize: '11px', textAlign: 'center', color: '#888', padding: '8px' }}>No archive records yet</td></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px' }}>
          <span>{total} records total</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button size="sm" disabled={page <= 1} onClick={() => { setPage(p => p - 1); fetchData(page - 1); }}>&lt; Prev</Button>
            <span style={{ padding: '2px 8px' }}>{page} / {totalPages || 1}</span>
            <Button size="sm" disabled={page >= totalPages} onClick={() => { setPage(p => p + 1); fetchData(page + 1); }}>Next &gt;</Button>
            <Button size="sm" onClick={() => fetchData(page)}>Refresh</Button>
          </div>
        </div>
      </GroupBox>
    </div>
  );
}
