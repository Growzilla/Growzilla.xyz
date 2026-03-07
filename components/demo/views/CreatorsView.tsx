import React from 'react';
import { motion } from 'framer-motion';
import type { Creator } from '@/types/smdashboard';
import { formatCurrency, formatDelta, platformColor, tw } from '@/lib/design-tokens';
import MiniSparkline from '../widgets/MiniSparkline';

interface CreatorsViewProps {
  creators: Creator[];
  onCreatorClick: (creator: Creator) => void;
  creatorSparkData: Record<string, number[]>;
}

const CreatorsView: React.FC<CreatorsViewProps> = ({ creators, onCreatorClick, creatorSparkData }) => {
  const sorted = [...creators].sort((a, b) => b.totalRevenue - a.totalRevenue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full p-4 overflow-hidden"
    >
      <div className="grid grid-cols-5 gap-3 h-full">
        {sorted.map((creator, i) => (
          <motion.button
            key={creator.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => onCreatorClick(creator)}
            className={`${tw.card} ${tw.cardHover} p-4 flex flex-col items-center text-center group`}
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full mb-3 flex-shrink-0 overflow-hidden">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <p className="text-sm font-semibold text-white group-hover:text-[#00FF94] transition-colors truncate w-full">
              {creator.name}
            </p>
            <p className="text-[10px] text-zinc-600 mb-3">{creator.handle}</p>

            {/* Sparkline */}
            <div className="mb-3">
              <MiniSparkline
                data={creatorSparkData[creator.id] || []}
                color="#00FF94"
                width={80}
                height={28}
              />
            </div>

            {/* Revenue */}
            <p className="text-lg font-mono font-bold text-white">
              {formatCurrency(creator.totalRevenue)}
            </p>
            <p className={`text-[11px] font-medium mt-0.5 ${tw.delta(creator.revenueChange >= 0)}`}>
              {formatDelta(creator.revenueChange)}
            </p>

            {/* Bottom stats */}
            <div className="mt-auto pt-3 w-full border-t border-white/[0.06] flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-[10px] text-zinc-600">Commission</p>
                <p className="text-[11px] font-mono text-zinc-300">{formatCurrency(creator.totalCommission)}</p>
              </div>
              <div className="w-px h-6 bg-white/[0.06]" />
              <div className="text-center flex-1">
                <p className="text-[10px] text-zinc-600">Conv</p>
                <p className="text-[11px] font-mono text-zinc-300">{creator.conversionRate}%</p>
              </div>
            </div>

            {/* Platform badges */}
            <div className="flex items-center gap-1 mt-2">
              {creator.platforms.map((p) => (
                <span
                  key={p}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: platformColor(p) }}
                />
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CreatorsView;
