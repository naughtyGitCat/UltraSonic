import { useState, useEffect } from 'react';
import { Button, GroupBox, Table, TableHead, TableRow, TableHeadCell, TableBody, TableDataCell } from 'react95';
import type { BackupStats, BackupTask } from '../types';

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'auto' }}>
      <GroupBox label="115 Cloud Backup Status">
        {stats ? (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '12px' }}>
            <div><strong>Total Files:</strong> {stats.totalFiles}</div>
            <div style={{ color: '#008000' }}><strong>Backed Up:</strong> {stats.backedUp}</div>
            <div style={{ color: '#808000' }}><strong>Pending:</strong> {stats.pending}</div>
            <div style={{ color: '#000080' }}><strong>Uploading:</strong> {stats.uploading}</div>
            <div style={{ color: '#ff0000' }}><strong>Failed:</strong> {stats.failed}</div>
            <div style={{ color: '#666' }}><strong>Not Queued:</strong> {stats.notQueued}</div>
            {stats.totalFiles > 0 && (
              <div><strong>Progress:</strong> {((stats.backedUp / stats.totalFiles) * 100).toFixed(1)}%</div>
            )}
          </div>
        ) : <span style={{ fontSize: '11px', color: '#888' }}>Loading...</span>}
      </GroupBox>

      <GroupBox label="Actions" style={{ marginTop: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => {
            setTesting(true); setTestResult(null);
            fetch('/api/backup/test', { method: 'POST' }).then(r => r.json())
              .then((d: {ok:boolean; message:string}) => setTestResult(d))
              .catch(err => setTestResult({ ok: false, message: err.message }))
              .finally(() => setTesting(false));
          }} disabled={testing}>
            {testing ? 'Testing...' : 'Test Connection'}
          </Button>
          <Button size="sm" onClick={() => {
            fetch('/api/backup/queue-all?limit=100', { method: 'POST' }).then(r => r.json())
              .then((d: {queued:number}) => { alert(`Queued ${d.queued} files for backup`); fetchStats(); });
          }}>Queue Unbackup Files</Button>
          <Button size="sm" onClick={() => {
            fetch('/api/backup/process?limit=10', { method: 'POST' }).then(r => r.json())
              .then((d: {processed:number; succeeded:number; failed:number}) => {
                alert(`Processed: ${d.processed}, Succeeded: ${d.succeeded}, Failed: ${d.failed}`);
                fetchStats();
              });
          }}>Process Queue (10)</Button>
          <Button size="sm" onClick={() => {
            fetch('/api/backup/retry-failed', { method: 'POST' }).then(() => { alert('Failed tasks reset'); fetchStats(); });
          }}>Retry Failed</Button>
          <Button size="sm" onClick={fetchStats}>Refresh</Button>
        </div>
        {testResult && (
          <div style={{ marginTop: '6px', fontSize: '11px', color: testResult.ok ? '#008000' : '#ff0000' }}>
            {testResult.ok ? 'OK' : 'FAILED'} - {testResult.message}
          </div>
        )}
      </GroupBox>

      <GroupBox label="Recent Backup Tasks" style={{ marginTop: '8px', flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflow: 'auto', flexGrow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell style={{ fontSize: '10px' }}>File</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Status</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Remote Path</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Last Attempt</TableHeadCell>
                <TableHeadCell style={{ fontSize: '10px' }}>Error</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recent.map(t => (
                <TableRow key={t.id}>
                  <TableDataCell style={{ fontSize: '10px' }}>{t.fileName || `#${t.fileId}`}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px', color: t.status === 'completed' ? '#008000' : t.status === 'failed' ? '#ff0000' : t.status === 'uploading' ? '#000080' : '#808000' }}>
                    {t.status}
                  </TableDataCell>
                  <TableDataCell style={{ fontSize: '10px' }}>{t.remotePath || '-'}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px' }}>{t.lastAttempt ? new Date(t.lastAttempt).toLocaleString() : '-'}</TableDataCell>
                  <TableDataCell style={{ fontSize: '10px', color: '#ff0000' }}>{t.errorMessage || ''}</TableDataCell>
                </TableRow>
              ))}
              {recent.length === 0 && (
                <TableRow><td colSpan={5} style={{ fontSize: '11px', textAlign: 'center', color: '#888', padding: '8px' }}>No backup tasks yet</td></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </GroupBox>

      <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
        Configure 115 Cookie and backup settings in Node Config tab &rarr; master config &rarr; Backup section.
      </div>
    </div>
  );
}
