'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KPICard {
  label: string;
  value: string;
  subValue?: string;
  delta?: string;
  up?: boolean;
  tooltip?: string;
}

interface KPIRowProps {
  cards: KPICard[];
}

const KPIRow: React.FC<KPIRowProps> = ({ cards }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
    {cards.map((kpi, i) => (
      <motion.div
        key={kpi.label}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.05 }}
        className="card-zilla p-4 group relative"
        title={kpi.tooltip}
      >
        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
          {kpi.label}
        </p>
        <p className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono leading-tight">
          {kpi.value}
        </p>
        {kpi.subValue && (
          <p className="text-[11px] text-gray-500 mt-0.5 font-mono">{kpi.subValue}</p>
        )}
        {kpi.delta && (
          <p className={`text-xs mt-1 font-medium ${kpi.up ? 'text-zilla-neon' : 'text-red-400'}`}>
            {kpi.delta}{' '}
            <span className="text-gray-600 text-[10px] font-normal">vs prev</span>
          </p>
        )}

        {kpi.tooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zilla-dark border border-white/10 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
            {kpi.tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zilla-dark" />
          </div>
        )}
      </motion.div>
    ))}
  </div>
);

export default KPIRow;
