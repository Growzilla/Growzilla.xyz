'use client';

import { motion } from 'framer-motion';

interface Props {
  step: number; // 1-based current step
  total: number;
}

export default function MorsdagQuizProgress({ step, total }: Props) {
  const clamped = Math.max(1, Math.min(step, total));
  const pct = (clamped / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-morsdag-rose">
          Steg {clamped} av {total}
        </span>
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
          ~2 minuter
        </span>
      </div>
      <div className="h-[2px] w-full bg-white/[0.08] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-morsdag-rose rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
