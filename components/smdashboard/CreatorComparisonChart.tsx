import React from 'react';
import { motion } from 'framer-motion';
import type { Creator } from '@/types/smdashboard';

interface CreatorComparisonChartProps {
  creators: Creator[];
  onSelectCreator: (creatorId: string) => void;
}

function formatK(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`;
}

const CreatorComparisonChart: React.FC<CreatorComparisonChartProps> = ({
  creators,
  onSelectCreator,
}) => {
  const sorted = [...creators].sort((a, b) => b.totalRevenue - a.totalRevenue);
  const maxRev = sorted[0]?.totalRevenue || 1;
  const totalRev = sorted.reduce((sum, c) => sum + c.totalRevenue, 0);

  return (
    <div className="card-zilla p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-white">Creator Performance</h3>
        <span className="text-[10px] text-gray-500 font-mono">
          Click to view details
        </span>
      </div>

      <div className="space-y-3">
        {sorted.map((creator, i) => {
          const pct = (creator.totalRevenue / totalRev) * 100;
          const barWidth = (creator.totalRevenue / maxRev) * 100;

          return (
            <motion.button
              key={creator.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              onClick={() => onSelectCreator(creator.id)}
              className="w-full group"
            >
              <div className="flex items-center gap-3 mb-1.5">
                {/* Avatar */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />

                {/* Name + handle */}
                <div className="text-left min-w-0 flex-1">
                  <div className="text-sm font-medium text-white group-hover:text-zilla-neon transition-colors truncate">
                    {creator.name}
                  </div>
                </div>

                {/* Revenue + percentage */}
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-mono font-medium text-white">
                    {formatK(creator.totalRevenue)}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono ml-2">
                    ({pct.toFixed(0)}%)
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="ml-11 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.6, delay: i * 0.06 + 0.2, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-zilla-neon/60 to-zilla-neon group-hover:from-zilla-neon/80 group-hover:to-zilla-neon transition-all"
                />
              </div>

              {/* Stats row */}
              <div className="ml-11 flex items-center gap-4 mt-1">
                <span className="text-[10px] text-gray-500 font-mono">
                  {creator.totalPosts} posts
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {creator.conversionRate}% conv
                </span>
                <span
                  className={`text-[10px] font-mono ${creator.revenueChange >= 0 ? 'text-zilla-neon' : 'text-red-400'}`}
                >
                  {creator.revenueChange >= 0 ? '+' : ''}
                  {creator.revenueChange}%
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CreatorComparisonChart;
