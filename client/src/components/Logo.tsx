import { motion } from 'framer-motion';

/** Логотип: три веерных рубашки карт за словом BLUFF. */
export default function Logo() {
  const card = 'absolute left-1/2 top-1/2 h-40 w-28 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-brass/50';
  return (
    <div className="relative mx-auto h-48 w-72 select-none">
      <motion.div className={`${card} bg-violet/40`} initial={{ rotate: 0, opacity: 0 }} animate={{ rotate: -18, x: -44, opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} />
      <motion.div className={`${card} bg-ash`} initial={{ rotate: 0, opacity: 0 }} animate={{ rotate: 18, x: 44, opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} />
      <motion.div className={`${card} flex items-center justify-center bg-blood/80`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
        <svg viewBox="0 0 40 40" className="h-14 w-14 text-bone/80" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 4l14 16-14 16L6 20z" /><circle cx="20" cy="20" r="4" />
        </svg>
      </motion.div>
      <h1 className="absolute inset-x-0 bottom-0 text-center font-display text-6xl font-extrabold tracking-[0.12em] text-bone drop-shadow-[0_4px_0_#0E0D10]">BLUFF</h1>
    </div>
  );
}
