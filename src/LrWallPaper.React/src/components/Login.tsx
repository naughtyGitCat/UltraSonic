import { useState } from 'react';
import { Button, TextInput, Card } from '../ui';
import { login, register } from '../auth';

/** Sign-in / register screen, shown when the Master requires auth and there is no session. */
export default function Login({ onAuthed }: { onAuthed: () => void }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setBusy(true);
    try {
      if (isRegister) await register(email, password);
      else await login(email, password);
      onAuthed();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign-in failed');
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email && password && !busy) submit();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <Card style={{ width: 360, maxWidth: '90vw' }}>
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="brand-dot" /> UltraSonic
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 4 }}>
          <div className="faint" style={{ fontSize: 13 }}>
            {isRegister ? 'Create the first account (becomes admin).' : 'Sign in to your photo library.'}
          </div>
          <TextInput value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" onKeyDown={onKey} />
          <TextInput value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" onKeyDown={onKey} />
          {error && <div style={{ color: 'var(--danger, #e5484d)', fontSize: 13 }}>{error}</div>}
          <Button variant="primary" onClick={submit} disabled={busy || !email || !password}>
            {busy ? '…' : isRegister ? 'Register' : 'Sign in'}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => { setIsRegister(v => !v); setError(null); }}>
            {isRegister ? 'Have an account? Sign in' : 'No account? Register'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
