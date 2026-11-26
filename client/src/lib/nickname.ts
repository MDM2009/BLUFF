export const NICK_MIN = 3;
export const NICK_MAX = 16;
// Буквы любых алфавитов, цифры, пробел, _ - .
const ALLOWED = /^[\p{L}\p{N}_\-. ]+$/u;

export function normalizeNick(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ');
}

/** Возвращает текст ошибки или null, если ник допустим. */
export function validateNick(raw: string): string | null {
  const nick = normalizeNick(raw);
  if (!nick) return 'Введите никнейм.';
  if (nick.length < NICK_MIN) return `Минимум ${NICK_MIN} символа.`;
  if (nick.length > NICK_MAX) return `Максимум ${NICK_MAX} символов.`;
  if (!ALLOWED.test(nick)) return 'Допустимы буквы, цифры, пробел, _ - .';
  return null;
}
