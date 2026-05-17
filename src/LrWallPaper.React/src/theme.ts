import { useState, useEffect, useCallback } from 'react';

export type ThemePref = 'system' | 'light' | 'dark';

const KEY = 'us-theme';
const mq = () => window.matchMedia('(prefers-color-scheme: dark)');

function resolve(pref: ThemePref): 'light' | 'dark' {
  if (pref === 'system') return mq().matches ? 'dark' : 'light';
  return pref;
}

function apply(pref: ThemePref) {
  document.documentElement.setAttribute('data-theme', resolve(pref));
}

export function initTheme() {
  const pref = (localStorage.getItem(KEY) as ThemePref) || 'system';
  apply(pref);
}

export function useTheme() {
  const [pref, setPref] = useState<ThemePref>(
    () => (localStorage.getItem(KEY) as ThemePref) || 'system'
  );

  useEffect(() => {
    apply(pref);
    localStorage.setItem(KEY, pref);
    if (pref !== 'system') return;
    const m = mq();
    const onChange = () => apply('system');
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, [pref]);

  const cycle = useCallback(() => {
    setPref(p => (p === 'system' ? 'light' : p === 'light' ? 'dark' : 'system'));
  }, []);

  return { pref, setPref, cycle };
}
