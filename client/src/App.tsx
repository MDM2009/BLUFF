import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import BackgroundFX from './components/BackgroundFX';
import RegisterScreen from './screens/RegisterScreen';
import TutorialScreen from './screens/TutorialScreen';
import MenuScreen from './screens/MenuScreen';
import SettingsScreen from './screens/SettingsScreen';
import { isTutorialDone, loadNick, saveNick, setTutorialDone } from './lib/storage';
import { useSettings } from './lib/settings';

type Screen = 'register' | 'tutorial' | 'review' | 'menu' | 'settings';

export default function App() {
  const [nick, setNick] = useState<string | null>(loadNick());
  const [screen, setScreen] = useState<Screen>(!nick ? 'register' : isTutorialDone() ? 'menu' : 'tutorial');
  const { animations } = useSettings();

  useEffect(() => {
    document.documentElement.toggleAttribute('data-noanim', !animations);
  }, [animations]);

  const onRegister = (n: string) => {
    saveNick(n); setNick(n);
    setScreen(isTutorialDone() ? 'menu' : 'tutorial');
  };
  const changeNick = (n: string) => { saveNick(n); setNick(n); };

  return (
    <MotionConfig reducedMotion={animations ? 'user' : 'always'}>
      <BackgroundFX />
      <AnimatePresence mode="wait">
        {screen === 'register' && <RegisterScreen key="reg" initial={nick ?? ''} onDone={onRegister} />}
        {screen === 'tutorial' && <TutorialScreen key="tut" mode="first" onDone={() => { setTutorialDone(); setScreen('menu'); }} />}
        {screen === 'review' && <TutorialScreen key="rev" mode="review" onDone={() => setScreen('menu')} />}
        {screen === 'menu' && nick && <MenuScreen key="menu" nick={nick} onTutorial={() => setScreen('review')} onSettings={() => setScreen('settings')} />}
        {screen === 'settings' && nick && <SettingsScreen key="set" nick={nick} onNick={changeNick} onRules={() => setScreen('review')} onBack={() => setScreen('menu')} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
