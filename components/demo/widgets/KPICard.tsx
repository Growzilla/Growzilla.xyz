import React from 'react';
import { motion } from 'framer-motion';
import { tw } from '@/lib/design-tokens';

interface KPICardProps {
  label: string;
  value: string;
  subValue?: string;
  delta?: string;
  up?: boolean;
  index?: number;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, subValue, delta, up, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`${tw.card} p-3.5`}
    >
      <p className={tw.label}>{label}</p>
      <p className="text-xl font-bold text-white font-mono mt-1 leading-tight">{value}</p>
      {subValue && (
        <p className="text-[11px] text-zinc-500 mt-0.5 font-mono">{subValue}</p>
      )}
      {delta && (
        <p className={`text-xs mt-1 font-medium ${tw.delta(!!up)}`}>
          {delta}{' '}
          <span className="text-zinc-600 text-[10px] font-normal">vs prev</span>
        </p>
      )}
    </motion.div>
  );
};

export default KPICard;
