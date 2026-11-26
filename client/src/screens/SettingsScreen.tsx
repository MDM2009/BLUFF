import { useState } from 'react';
import { motion } from 'framer-motion';
import { normalizeNick, validateNick, NICK_MAX } from '../lib/nickname';
import { setSettings, useSettings } from '../lib/settings';

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={value} onClick={() => onChange(!value)} className="flex w-full items-center justify-between py-2">
      <span>{label}</span>
      <span className={`h-6 w-11 rounded-full p-0.5 transition-colors ${value ? 'bg-blood' : 'bg-ash'}`}>
        <span className={`block h-5 w-5 rounded-full bg-bone transition-transform ${value ? 'translate-x-5' : ''}`} />
      </span>
    </button>
  );
}
function Volume({ label, value, disabled, onChange }: { label: string; value: number; disabled: boolean; onChange: (v: number) => void }) {
  return (
    <label className={`block py-2 ${disabled ? 'opacity-40' : ''}`}>
      <span className="mb-1 flex justify-between text-sm text-bone/70"><span>{label}</span><span>{Math.round(value * 100)}%</span></span>
      <input type="range" min={0} max={1} step={0.05} value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </label>
  );
}

interface Props { nick: string; onNick: (n: string) => void; onRules: () => void; onBack: () => void }

export default function SettingsScreen({ nick, onNick, onRules, onBack }: Props) {
  const s = useSettings();
  const [value, setValue] = useState(nick);
  const [saved, setSaved] = useState(false);
  const error = validateNick(value);
  const changed = normalizeNick(value) !== nick;

  const save = () => { if (error || !changed) return; onNick(normalizeNick(value)); setSaved(true); };

  return (
    <motion.main className="relative flex min-h-full items-center justify-center px-5 py-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="w-full max-w-md space-y-5 rounded-2xl border border-ash bg-graphite/90 p-6 backdrop-blur">
        <h2 className="font-display text-3xl font-extrabold">Настройки</h2>
        <section>
          <label htmlFor="n" className="mb-1 block text-sm text-bone/70">Никнейм</label>
          <div className="flex gap-2">
            <input id="n" value={value} maxLength={NICK_MAX + 8} onChange={(e) => { setValue(e.target.value); setSaved(false); }}
              className="min-w-0 flex-1 rounded-lg border border-ash bg-ink px-3 py-2 focus:border-brass focus:outline-none" />
            <button onClick={save} disabled={!!error || !changed} className="rounded-lg bg-blood px-4 font-bold disabled:bg-ash disabled:text-bone/40">Сохранить</button>
          </div>
          <p className={`mt-1 min-h-5 text-sm ${error ? 'text-blood' : 'text-bone/50'}`}>{error ?? (saved ? 'Никнейм сохранён.' : '')}</p>
        </section>
        <section className="divide-y divide-ash/60">
          <Toggle label="Музыка" value={s.music} onChange={(v) => setSettings({ music: v })} />
          <Volume label="Громкость музыки" value={s.musicVol} disabled={!s.music} onChange={(v) => setSettings({ musicVol: v })} />
          <Toggle label="Звуковые эффекты" value={s.sfx} onChange={(v) => setSettings({ sfx: v })} />
          <Volume label="Громкость эффектов" value={s.sfxVol} disabled={!s.sfx} onChange={(v) => setSettings({ sfxVol: v })} />
          <Toggle label="Анимации" value={s.animations} onChange={(v) => setSettings({ animations: v })} />
        </section>
        <p className="text-xs text-bone/40">Настройки звука сохраняются, но музыка и эффекты появятся на этапе 8.</p>
        <div className="flex gap-3">
          <button onClick={onRules} className="flex-1 rounded-lg border border-brass/60 py-3 text-brass hover:bg-brass/10">Правила</button>
          <button onClick={onBack} className="flex-1 rounded-lg border border-ash py-3 hover:border-bone/50">Назад</button>
        </div>
      </div>
    </motion.main>
  );
}
