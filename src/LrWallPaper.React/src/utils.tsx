export const VIDEO_EXTS = ['.mp4', '.mov', '.avi', '.mkv', '.mts'];

export function getExt(filename: string): string {
  return filename.toLowerCase().replace(/.*(\.\w+)$/, '$1');
}

export function formatFileSize(bytes?: number): string {
  if (!bytes) return '-';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

export const dateInputStyle: React.CSSProperties = {
  fontFamily: 'ms_sans_serif', border: '2px inset #dfdfdf', padding: '2px 4px',
  fontSize: '11px', backgroundColor: '#fff', height: '22px'
};

export function toOpts(arr: string[], allLabel = 'All') {
  return [{ label: allLabel, value: '' }, ...arr.map(v => ({ label: v, value: v }))];
}

export function MediaThumbnail({ src, alt, style }: { src: string; alt: string; style: React.CSSProperties }) {
  if (VIDEO_EXTS.includes(getExt(alt))) {
    return <video src={`${src}#t=0.5`} muted preload="metadata" style={style} />;
  }
  return <img src={src} alt={alt} loading="lazy" style={style} />;
}

export function renderConfigFields(obj: Record<string, unknown>, path: string[], onUpdate: (path: string[], value: unknown) => void): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const skipKeys = new Set(['Urls', 'Logging', 'AllowedHosts', 'EnableFullScan', 'MasterCluster']);
  for (const [key, val] of Object.entries(obj)) {
    if (skipKeys.has(key)) continue;
    const currentPath = [...path, key];
    const label = currentPath.join('.');
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      nodes.push(<div key={label} style={{ gridColumn: '1 / -1', fontWeight: 'bold', marginTop: '6px', borderBottom: '1px solid #808080', paddingBottom: '2px' }}>{label}</div>);
      nodes.push(...renderConfigFields(val as Record<string, unknown>, currentPath, onUpdate));
    } else if (Array.isArray(val)) {
      nodes.push(<label key={label + '_l'} style={{ textAlign: 'right' }}>{key}:</label>);
      nodes.push(<input key={label + '_v'} type="text" value={(val as string[]).join(', ')}
        onChange={e => onUpdate(currentPath, e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
        style={{ border: '2px inset #dfdfdf', padding: '2px 4px', fontSize: '11px', fontFamily: 'ms_sans_serif' }} />);
    } else {
      nodes.push(<label key={label + '_l'} style={{ textAlign: 'right' }}>{key}:</label>);
      if (key.toLowerCase() === 'transfermode') {
        nodes.push(<select key={label + '_v'} value={String(val || 'copy')}
          onChange={e => onUpdate(currentPath, e.target.value)}
          style={{ border: '2px inset #dfdfdf', padding: '2px', fontSize: '11px', fontFamily: 'ms_sans_serif' }}>
          <option value="copy">copy</option><option value="move">move</option>
        </select>);
      } else {
        nodes.push(<input key={label + '_v'} type={typeof val === 'number' ? 'number' : 'text'} value={String(val ?? '')}
          onChange={e => onUpdate(currentPath, typeof val === 'number' ? Number(e.target.value) : e.target.value)}
          style={{ border: '2px inset #dfdfdf', padding: '2px 4px', fontSize: '11px', fontFamily: 'ms_sans_serif' }} />);
      }
    }
  }
  return nodes;
}
