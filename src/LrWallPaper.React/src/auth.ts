// Lightweight auth for the control panel. The Master gates everything behind a JWT
// only when Auth:Enabled; otherwise these helpers are inert (no token, no header).

const TOKEN_KEY = 'ultrasonic.token';
const EMAIL_KEY = 'ultrasonic.email';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const getEmail = (): string | null => localStorage.getItem(EMAIL_KEY);

export function setSession(token: string, email: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

/** Append the bearer token as a query param — for <img>/<video> src that can't set headers. */
export function withAuthToken(url: string): string {
  const t = getToken();
  if (!t) return url;
  return url + (url.includes('?') ? '&' : '?') + 'access_token=' + encodeURIComponent(t);
}

interface AuthUser { id: number; email: string; role: string; }
interface AuthResponse { token: string; user: AuthUser; }

/** Is the server requiring auth? Read off /api/health (anonymous). */
export async function authEnabled(): Promise<boolean> {
  try {
    const r = await fetch('/api/health');
    const j = await r.json();
    return j.authEnabled === true;
  } catch {
    return false;
  }
}

/** Validate the stored token. Returns the user, or null if missing/expired. */
export async function fetchMe(): Promise<AuthUser | null> {
  if (!getToken()) return null;
  try {
    const r = await fetch('/api/auth/me');
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function credentials(path: 'login' | 'register', email: string, password: string): Promise<AuthUser> {
  const r = await fetch(`/api/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!r.ok) {
    const msg = await r.json().catch(() => ({}));
    throw new Error(msg.error || `Request failed (${r.status})`);
  }
  const data: AuthResponse = await r.json();
  setSession(data.token, data.user.email);
  return data.user;
}

export const login = (email: string, password: string) => credentials('login', email, password);
export const register = (email: string, password: string) => credentials('register', email, password);

/**
 * Patch window.fetch so every same-origin /api request carries the bearer token,
 * and a 401 clears the session and reloads to the login gate. Lets the existing
 * components keep calling bare fetch('/api/...') unchanged.
 */
export function installAuthFetch() {
  const original = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const token = getToken();
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const sameOriginApi = url.startsWith('/api') || url.startsWith(window.location.origin + '/api');
    if (token && sameOriginApi) {
      const headers = new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
      if (!headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
      init = { ...init, headers };
    }
    const resp = await original(input, init);
    if (resp.status === 401 && sameOriginApi && !url.includes('/api/auth/')) {
      clearSession();
      window.location.reload();
    }
    return resp;
  };
}
