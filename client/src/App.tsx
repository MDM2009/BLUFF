import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundFX from './components/BackgroundFX';
import RegisterScreen from './screens/RegisterScreen';
import { loadNick, saveNick } from './lib/storage';

type Screen = 'register' | 'stub';

export default function App() {
  const [nick, setNick] = useState<string | null>(loadNick());
  const [screen, setScreen] = useState<Screen>(nick ? 'stub' : 'register');

  const onRegister = (n: string) => { saveNick(n); setNick(n); setScreen('stub'); };

  return (
    <>
      <BackgroundFX />
      <AnimatePresence mode="wait">
        {screen === 'register' && <RegisterScreen key="reg" initial={nick ?? ''} onDone={onRegister} />}
        {screen === 'stub' && (
          <main key="stub" className="relative flex min-h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-3xl">Привет, {nick}</p>
            <p className="max-w-sm text-bone/60">Регистрация работает, ник сохранён. Обучение и главное меню появятся на этапе 2 — сейчас их ещё нет.</p>
            <button onClick={() => setScreen('register')} className="rounded-lg border border-ash px-4 py-2 text-sm text-bone/70 hover:border-brass">Изменить никнейм</button>
          </main>
        )}
      </AnimatePresence>
    </>
  );
}
