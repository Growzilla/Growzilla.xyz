import React from 'react';

const periods = [
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' },
  { value: '90d', label: '90d' },
] as const;

interface PeriodToggleProps {
  value: string;
  onChange: (period: string) => void;
}

const PeriodToggle: React.FC<PeriodToggleProps> = ({ value, onChange }) => {
  return (
    <div className="inline-flex items-center bg-zilla-dark rounded-lg border border-gray-700/50 p-0.5">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-all ${
            value === p.value
              ? 'bg-zilla-neon/15 text-zilla-neon border border-zilla-neon/30'
              : 'text-gray-400 hover:text-white border border-transparent'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};

export default PeriodToggle;
