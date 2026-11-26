const NICK_KEY = 'bluff.nick';
const TUTORIAL_KEY = 'bluff.tutorialDone';

export const loadNick = (): string | null => {
  try { return localStorage.getItem(NICK_KEY); } catch { return null; }
};
export const saveNick = (nick: string) => {
  try { localStorage.setItem(NICK_KEY, nick); } catch { /* приватный режим */ }
};
export const isTutorialDone = (): boolean => {
  try { return localStorage.getItem(TUTORIAL_KEY) === '1'; } catch { return false; }
};
