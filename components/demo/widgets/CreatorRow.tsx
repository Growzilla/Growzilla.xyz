import React from 'react';
import type { Creator } from '@/types/smdashboard';
import { formatCurrency, platformColor } from '@/lib/design-tokens';
import MiniSparkline from './MiniSparkline';

interface CreatorRowProps {
  creator: Creator;
  rank: number;
  sparkData: number[];
  onClick?: () => void;
}

const CreatorRow: React.FC<CreatorRowProps> = ({ creator, rank, sparkData, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group text-left"
    >
      {/* Rank */}
      <span className="text-[11px] font-mono text-zinc-600 w-4 text-right flex-shrink-0">
        {rank}
      </span>

      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-zinc-800 flex-shrink-0 overflow-hidden">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name + handle */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate group-hover:text-[#00FF94] transition-colors">
          {creator.name.split(' ')[0]}
        </p>
        <p className="text-[10px] text-zinc-600 truncate">{creator.handle}</p>
      </div>

      {/* Sparkline */}
      <MiniSparkline data={sparkData} color="#00FF94" width={48} height={20} />

      {/* Revenue */}
      <span className="text-sm font-mono font-semibold text-white flex-shrink-0">
        {formatCurrency(creator.totalRevenue)}
      </span>
    </button>
  );
};

export default CreatorRow;
