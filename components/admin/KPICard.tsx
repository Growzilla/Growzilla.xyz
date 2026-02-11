import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

interface KPICardProps {
  label: string;
  value: string;
  delta?: number;
  icon: React.ReactNode;
  prefix?: string;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, delta, icon, prefix }) => {
  const isPositive = delta !== undefined && delta >= 0;
  const hasDelta = delta !== undefined && delta !== 0;

  return (
    <div className="card-zilla p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <span className="text-gray-500">{icon}</span>
      </div>

      <div className="flex items-end gap-3">
        <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {prefix}
          {value}
        </span>

        {hasDelta && (
          <span
            className={`flex items-center gap-0.5 text-sm font-medium pb-0.5 ${
              isPositive ? 'text-zilla-neon' : 'text-zilla-danger'
            }`}
          >
            {isPositive ? (
              <ArrowTrendingUpIcon className="w-4 h-4" />
            ) : (
              <ArrowTrendingDownIcon className="w-4 h-4" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default KPICard;
