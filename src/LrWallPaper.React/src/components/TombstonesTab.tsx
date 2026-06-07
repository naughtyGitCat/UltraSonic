import { useState, useEffect } from 'react';
import { formatFileSize } from '../utils';
import { Button, Card } from '../ui';

interface Tombstone {
  id: number;
  fileName: string;
  fileSize: number;
  fileMD5?: string;
  agentId?: string;
  deletedAt?: string;
}

// Deleted archive files that are blocked from re-uploading. "Restore" removes the
// tombstone so the file can sync again; "Clear all" is for a full data-loss recovery.
export default function TombstonesTab() {
  const [items, setItems] = useState<Tombstone[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    fetch('/api/master/tombstones?page=1&pageSize=1000')
      .then(r => r.json())
      .then(d => { setItems(d.items || []); setTotal(d.total || 0); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const restore = (t: Tombstone) => {
    fetch(`/api/master/tombstones/${t.id}`, { method: 'DELETE' })
      .then(r => { if (r.ok) setItems(prev => prev.filter(x => x.id !== t.id)); })
      .catch(() => {});
  };

  const clearAll = () => {
    if (!confirm('Clear all tombstones? Deleted files may re-upload on the next sync.')) return;
    fetch('/api/master/tombstones', { method: 'DELETE' })
      .then(r => { if (r.ok) { setItems([]); setTotal(0); } })
      .catch(() => {});
  };

  return (
    <div className="col scroll-y" style={{ flexGrow: 1, gap: 14 }}>
      <Card title="Deleted files (tombstones)">
        <p className="faint" style={{ marginTop: 0, fontSize: 12 }}>
          Files removed from the archive are remembered here so they are <b>not re-uploaded</b> on
          the next sync. Restore one to let it sync again; Clear all before a full data-loss re-upload.
        </p>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="faint" style={{ fontSize: 11 }}>{total} tombstone(s)</span>
          <div className="row" style={{ gap: 8 }}>
            <Button onClick={load}>Refresh</Button>
            {items.length > 0 && <Button variant="danger" onClick={clearAll}>Clear all</Button>}
          </div>
        </div>
      </Card>

      <div className="col" style={{ flexGrow: 1, minHeight: 0, gap: 8 }}>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>File</th><th>Size</th><th>Agent</th><th>Deleted At</th><th></th></tr>
            </thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id}>
                  <td title={t.fileName}>{t.fileName}</td>
                  <td className="muted">{formatFileSize(t.fileSize)}</td>
                  <td className="muted">{t.agentId || '-'}</td>
                  <td className="muted">{t.deletedAt ? new Date(t.deletedAt).toLocaleString() : '-'}</td>
                  <td><Button onClick={() => restore(t)}>Restore</Button></td>
                </tr>
              ))}
              {items.length === 0 && !loading && (
                <tr><td colSpan={5} className="faint" style={{ textAlign: 'center', padding: 20 }}>
                  No deleted files — nothing is blocked from upload.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
