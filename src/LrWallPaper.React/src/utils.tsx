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

export function toOpts(arr: string[], allLabel = 'All') {
  return [{ label: allLabel, value: '' }, ...arr.map(v => ({ label: v, value: v }))];
}

export function MediaThumbnail({ src, alt, className }: { src: string; alt: string; className?: string }) {
  if (VIDEO_EXTS.includes(getExt(alt))) {
    return <video src={`${src}#t=0.5`} muted preload="metadata" className={className} />;
  }
  return <img src={src} alt={alt} loading="lazy" className={className} />;
}

export function renderConfigFields(
  obj: Record<string, unknown>,
  path: string[],
  onUpdate: (path: string[], value: unknown) => void
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const skipKeys = new Set(['Urls', 'Logging', 'AllowedHosts', 'EnableFullScan', 'MasterCluster']);
  for (const [key, val] of Object.entries(obj)) {
    if (skipKeys.has(key)) continue;
    const currentPath = [...path, key];
    const label = currentPath.join('.');
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      nodes.push(<div key={label} className="cfg-group">{label}</div>);
      nodes.push(...renderConfigFields(val as Record<string, unknown>, currentPath, onUpdate));
    } else if (Array.isArray(val)) {
      nodes.push(<label key={label + '_l'}>{key}</label>);
      nodes.push(<input key={label + '_v'} className="input" type="text" value={(val as string[]).join(', ')}
        onChange={e => onUpdate(currentPath, e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />);
    } else {
      nodes.push(<label key={label + '_l'}>{key}</label>);
      if (key.toLowerCase() === 'transfermode') {
        nodes.push(
          <select key={label + '_v'} className="select" value={String(val || 'copy')}
            onChange={e => onUpdate(currentPath, e.target.value)}>
            <option value="copy">copy</option><option value="move">move</option>
          </select>
        );
      } else {
        nodes.push(<input key={label + '_v'} className="input"
          type={typeof val === 'number' ? 'number' : 'text'} value={String(val ?? '')}
          onChange={e => onUpdate(currentPath, typeof val === 'number' ? Number(e.target.value) : e.target.value)} />);
      }
    }
  }
  return nodes;
}
