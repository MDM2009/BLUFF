export type CardId = 'shotgun' | 'medkit' | 'beer' | 'shield' | 'intercept' | 'swap' | 'stun' | 'joker' | 'multibomb';

export const CARDS: Record<CardId, { name: string; color: string; icon: string }> = {
  shotgun: { name: 'Дробовик', color: '#C4202E', icon: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 2v4M12 18v4M2 12h4M18 12h4' },
  medkit: { name: 'Аптечка', color: '#3C9A6B', icon: 'M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z' },
  beer: { name: 'Пиво', color: '#C98A2B', icon: 'M6 5h9v14H6zM15 8h3a2 2 0 0 1 0 6h-3M9 9v6' },
  shield: { name: 'Щит', color: '#4A78B8', icon: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z' },
  intercept: { name: 'Перехват', color: '#6B4FA0', icon: 'M4 20c0-9 6-14 14-14M14 2l4 4-4 4' },
  swap: { name: 'Обмен', color: '#2E9AA8', icon: 'M7 4v13M3 13l4 4 4-4M17 20V7M13 11l4-4 4 4' },
  stun: { name: 'Электрошок', color: '#D8C23A', icon: 'M13 2L5 14h6l-1 8 8-12h-6z' },
  joker: { name: 'Джокер', color: '#B8964E', icon: 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z' },
  multibomb: { name: 'Мультибомба', color: '#E0501F', icon: 'M12 8a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM15 6l3-3M17 3h3' },
};
