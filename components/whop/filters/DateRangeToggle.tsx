'use client';

import React from 'react';
import type { DateRange } from '@/types/whop';

interface DateRangeToggleProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const RANGES: { label: string; value: DateRange }[] = [
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
];

const DateRangeToggle: React.FC<DateRangeToggleProps> = ({ value, onChange }) => (
  <div className="flex items-center gap-1 bg-zilla-surface rounded-lg p-1 border border-white/5">
    {RANGES.map((r) => (
      <button
        key={r.value}
        onClick={() => onChange(r.value)}
        className={`px-3 py-2 sm:py-1.5 text-xs font-mono font-medium rounded-md transition-all duration-200 min-h-[36px] sm:min-h-0 ${
          value === r.value
            ? 'bg-zilla-neon text-zilla-black shadow-lg shadow-zilla-neon/20'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        {r.label}
      </button>
    ))}
  </div>
);

export default DateRangeToggle;
