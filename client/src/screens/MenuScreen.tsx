import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import { Conn, useConnection } from '../lib/socket';

const CONN: Record<Conn, { text: string; dot: string }> = {
  online: { text: 'Сервер на связи', dot: 'bg-emerald-500' },
  connecting: { text: 'Подключение…', dot: 'bg-brass animate-pulse' },
  offline: { text: 'Нет связи с сервером', dot: 'bg-blood' },
  unset: { text: 'Адрес сервера не задан', dot: 'bg-blood' },
};

interface Props { nick: string; onTutorial: () => void; onSettings: () => void }

export default function MenuScreen({ nick, onTutorial, onSettings }: Props) {
  const c = CONN[useConnection()];
  const base = 'w-full rounded-lg py-3.5 text-lg font-bold';
  return (
    <motion.main className="relative flex min-h-full flex-col items-center justify-center gap-8 px-5 py-8"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-sm">
        <button onClick={onSettings} className="rounded-full border border-ash bg-graphite px-4 py-1.5 hover:border-brass" title="Изменить никнейм в настройках">{nick}</button>
        <span className="flex items-center gap-2 text-bone/60"><span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />{c.text}</span>
      </div>
      <Logo />
      <nav className="w-full max-w-sm space-y-3">
        <button disabled className={`${base} cursor-not-allowed bg-ash text-bone/40`}>Создать комнату <span className="text-xs font-normal">(этап 3)</span></button>
        <button disabled className={`${base} cursor-not-allowed bg-ash text-bone/40`}>Присоединиться к комнате <span className="text-xs font-normal">(этап 3)</span></button>
        <button onClick={onTutorial} className={`${base} border border-brass/60 text-brass hover:bg-brass/10`}>Правила</button>
        <button onClick={onSettings} className={`${base} border border-ash hover:border-bone/50`}>Настройки</button>
      </nav>
    </motion.main>
  );
}
