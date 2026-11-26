import { motion } from 'framer-motion';

const suits = [
  'M12 2c4 5 8 8 8 12a5 5 0 0 1-8 4 5 5 0 0 1-8-4c0-4 4-7 8-12z',
  'M12 2l9 10-9 10L3 12z',
  'M12 3a4 4 0 0 1 4 4c3 0 5 2 5 5s-3 5-6 4l1 5H8l1-5c-3 1-6-1-6-4s2-5 5-5a4 4 0 0 1 4-4z',
];

export default function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#2A272F_0%,#0E0D10_70%)]">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.svg key={i} viewBox="0 0 24 24" className="absolute h-10 w-10 text-bone/[0.05]" fill="currentColor"
          style={{ left: `${(i * 83) % 100}%`, top: `${(i * 47) % 100}%` }}
          animate={{ y: [0, -24, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 9 + (i % 4) * 2, repeat: Infinity, ease: 'easeInOut' }}>
          <path d={suits[i % suits.length]} />
        </motion.svg>
      ))}
    </div>
  );
}
