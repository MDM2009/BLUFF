import { useSyncExternalStore } from 'react';

export interface Settings { music: boolean; musicVol: number; sfx: boolean; sfxVol: number; animations: boolean }
const KEY = 'bluff.settings';
const DEFAULTS: Settings = { music: true, musicVol: 0.4, sfx: true, sfxVol: 0.7, animations: true };

function load(): Settings {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return DEFAULTS; }
}
let state = load();
const listeners = new Set<() => void>();

export function setSettings(patch: Partial<Settings>) {
  state = { ...state, ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* приватный режим */ }
  listeners.forEach((l) => l());
}
export const useSettings = (): Settings =>
  useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, () => state);
