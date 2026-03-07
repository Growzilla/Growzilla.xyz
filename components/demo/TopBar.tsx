import React from 'react';
import { motion } from 'framer-motion';
import type { DateRange, DemoView } from '@/types/smdashboard';

interface TopBarProps {
  activeView: DemoView;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const VIEW_LABELS: Record<DemoView, string> = {
  overview: 'Overview',
  creators: 'Creators',
  content: 'Content',
  attribution: 'Attribution',
  links: 'Links',
};

const RANGES: DateRange[] = ['7d', '30d', '90d'];

const TopBar: React.FC<TopBarProps> = ({ activeView, dateRange, onDateRangeChange }) => {
  return (
    <div className="h-12 px-5 flex items-center justify-between border-b border-white/[0.06] bg-[#09090B]">
      {/* Left: view title + brand */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-white">{VIEW_LABELS[activeView]}</h1>
        <span className="text-[10px] text-zinc-600 font-mono">Glow Serum</span>
        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20">
          DEMO
        </span>
      </div>

      {/* Right: date range toggle */}
      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => onDateRangeChange(r)}
            className={`relative px-3 py-1 text-[11px] font-medium rounded-md transition-colors duration-200 ${
              dateRange === r ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {dateRange === r && (
              <motion.div
                layoutId="date-range-bg"
                className="absolute inset-0 bg-white/[0.08] rounded-md"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{r}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
