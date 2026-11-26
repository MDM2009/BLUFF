import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CardIcon from '../components/CardIcon';
import { PAGES } from '../lib/tutorial';

const LOCK_SECONDS = 5;

/** mode "first" — обязательное обучение (кнопка заблокирована 5 с), "review" — просмотр из меню. */
export default function TutorialScreen({ mode, onDone }: { mode: 'first' | 'review'; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(mode === 'first' ? LOCK_SECONDS : 0);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const page = PAGES[i];
  const last = i === PAGES.length - 1;
  const locked = left > 0;
  const nextLabel = locked ? `Продолжить (${left})` : last ? (mode === 'first' ? 'Я понял, начать' : 'Закрыть') : 'Продолжить';

  const next = () => { if (locked) return; if (last) onDone(); else setI(i + 1); };

  return (
    <motion.main className="relative flex min-h-full flex-col items-center justify-center px-5 py-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-ash bg-graphite/90 p-6 backdrop-blur">
        <p className="text-sm text-bone/50">Правила — {i + 1} из {PAGES.length}</p>
        <AnimatePresence mode="wait">
          <motion.div key={i} className="min-h-72 space-y-5" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
            {page.card && <CardIcon id={page.card} />}
            <h2 className="font-display text-3xl font-extrabold">{page.title}</h2>
            <p className="leading-relaxed text-bone/80">{page.text}</p>
          </motion.div>
        </AnimatePresence>
        <div className="h-1 overflow-hidden rounded bg-ash"><div className="h-full bg-brass transition-all" style={{ width: `${((i + 1) / PAGES.length) * 100}%` }} /></div>
        <div className="flex gap-3">
          <button onClick={() => setI(i - 1)} disabled={i === 0} className="rounded-lg border border-ash px-4 py-3 text-bone/70 hover:border-brass disabled:opacity-30">Назад</button>
          <button onClick={next} disabled={locked} aria-disabled={locked}
            className="flex-1 rounded-lg bg-blood py-3 font-bold shadow-[0_5px_0_#7d141d] enabled:active:translate-y-0.5 enabled:active:shadow-[0_2px_0_#7d141d] disabled:cursor-not-allowed disabled:bg-ash disabled:text-bone/40 disabled:shadow-none">
            {nextLabel}
          </button>
        </div>
        {mode === 'review' && <button onClick={onDone} className="w-full text-sm text-bone/50 hover:text-bone">Выйти в меню</button>}
      </div>
    </motion.main>
  );
}
