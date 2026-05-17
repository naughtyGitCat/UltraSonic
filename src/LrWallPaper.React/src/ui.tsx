import type { ReactNode, CSSProperties } from 'react';
import { useTheme } from './theme';

type Opt = { label: string; value: string | number };

export function Button({
  children, onClick, disabled, variant = 'default', size = 'md', active, title, style, type,
}: {
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  active?: boolean;
  title?: string;
  style?: CSSProperties;
  type?: 'button' | 'submit';
}) {
  const cls = ['btn'];
  if (variant === 'primary') cls.push('btn-primary');
  else if (variant === 'danger') cls.push('btn-danger');
  else if (variant === 'ghost') cls.push('btn-ghost');
  if (size === 'sm') cls.push('btn-sm');
  if (active) cls.push('active');
  return (
    <button type={type || 'button'} className={cls.join(' ')} onClick={onClick}
      disabled={disabled} title={title} style={style}>
      {children}
    </button>
  );
}

export function Select({
  options, value, onChange, width, style,
}: {
  options: Opt[];
  value: string | number;
  onChange: (v: string) => void;
  width?: number;
  style?: CSSProperties;
}) {
  return (
    <select className="select" value={value}
      style={{ width: width ? width + 'px' : undefined, ...style }}
      onChange={e => onChange(e.target.value)}>
      {options.map(o => <option key={String(o.value)} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function TextInput({
  value, onChange, placeholder, style, type, onKeyDown,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: CSSProperties;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <input className="input" type={type || 'text'} value={value} onChange={onChange}
      placeholder={placeholder} style={style} onKeyDown={onKeyDown} />
  );
}

export function Checkbox({
  label, checked, onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="cb-wrap">
      <input type="checkbox" className="cb" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export function Card({
  title, children, style, className, bodyClassName,
}: {
  title?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={'card ' + (className || '')} style={style}>
      {title && <div className="card-title">{title}</div>}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

export function Badge({
  children, kind,
}: {
  children: ReactNode;
  kind?: 'success' | 'danger' | 'warn' | 'accent';
}) {
  return <span className={'badge' + (kind ? ' badge-' + kind : '')}>{children}</span>;
}

export function Modal({
  title, onClose, children, width, height,
}: {
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ width: width || '420px', height, maxWidth: '95vw', maxHeight: '92vh' }}
        onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ThemeToggle() {
  const { pref, setPref } = useTheme();
  const opts: { k: 'system' | 'light' | 'dark'; label: string }[] = [
    { k: 'light', label: 'Light' },
    { k: 'dark', label: 'Dark' },
    { k: 'system', label: 'Auto' },
  ];
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {opts.map(o => (
        <button key={o.k} className={pref === o.k ? 'on' : ''} onClick={() => setPref(o.k)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
