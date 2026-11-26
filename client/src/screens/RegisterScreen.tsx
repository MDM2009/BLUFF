import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import { NICK_MAX, normalizeNick, validateNick } from '../lib/nickname';

export default function RegisterScreen({ initial = '', onDone }: { initial?: string; onDone: (nick: string) => void }) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  const error = validateNick(value);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!error) onDone(normalizeNick(value));
  };

  return (
    <motion.main className="relative flex min-h-full items-center justify-center px-5 py-10"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <form onSubmit={submit} className="w-full max-w-sm space-y-8" noValidate>
        <Logo />
        <div className="space-y-2">
          <label htmlFor="nick" className="block text-sm font-semibold text-bone/70">Ваш игровой никнейм</label>
          <input id="nick" value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setTouched(true)}
            maxLength={NICK_MAX + 8} autoComplete="nickname" autoFocus placeholder="Например, Тень"
            aria-invalid={touched && !!error} aria-describedby="nick-hint"
            className="w-full rounded-lg border border-ash bg-graphite px-4 py-3 text-lg text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none" />
          <p id="nick-hint" role="status" className={`min-h-5 text-sm ${touched && error ? 'text-blood' : 'text-bone/40'}`}>
            {touched && error ? error : `От 3 до ${NICK_MAX} символов. Его увидят другие игроки.`}
          </p>
        </div>
        <motion.button type="submit" whileTap={{ scale: 0.97 }}
          className="w-full rounded-lg bg-blood py-3.5 text-lg font-bold text-bone shadow-[0_6px_0_#7d141d] transition-colors hover:bg-[#d3283a] active:translate-y-0.5 active:shadow-[0_3px_0_#7d141d]">
          Войти в игру
        </motion.button>
      </form>
    </motion.main>
  );
}
