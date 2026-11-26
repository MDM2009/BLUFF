import { CARDS, CardId } from '../lib/cards';

export default function CardIcon({ id }: { id: CardId }) {
  const c = CARDS[id];
  return (
    <div className="relative mx-auto flex h-44 w-32 flex-col items-center justify-between rounded-xl border-2 p-3 shadow-xl"
      style={{ borderColor: c.color, background: `linear-gradient(160deg, ${c.color}33, #1A181D 70%)` }}>
      <svg viewBox="0 0 24 24" className="mt-6 h-16 w-16" fill="none" stroke={c.color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d={c.icon} />
      </svg>
      <span className="font-display text-lg font-extrabold text-bone">{c.name}</span>
    </div>
  );
}
