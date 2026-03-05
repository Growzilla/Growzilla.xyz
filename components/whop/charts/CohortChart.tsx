'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CohortRow } from '@/types/whop';

interface CohortChartProps {
  cohorts: CohortRow[];
}

function getRetentionColor(pct: number): string {
  if (pct >= 80) return 'bg-zilla-neon/60 text-white';
  if (pct >= 60) return 'bg-zilla-neon/40 text-white';
  if (pct >= 40) return 'bg-zilla-neon/20 text-white';
  if (pct >= 20) return 'bg-zilla-neon/10 text-gray-300';
  return 'bg-white/[0.03] text-gray-500';
}

const CohortChart: React.FC<CohortChartProps> = ({ cohorts }) => {
  if (cohorts.length === 0) {
    return (
      <div className="card-zilla p-6">
        <h3 className="text-sm font-medium text-white mb-4">Retention Cohorts</h3>
        <p className="text-sm text-gray-500">No cohort data available</p>
      </div>
    );
  }

  const maxMonths = Math.max(...cohorts.map((c) => c.retention.length));

  return (
    <div className="card-zilla p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white">Retention Cohorts</h3>
        <span className="text-[10px] text-gray-500 font-mono">% retained per month</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left text-gray-500 font-medium px-2 py-1.5 sticky left-0 bg-zilla-surface/50 z-10">
                Cohort
              </th>
              <th className="text-center text-gray-500 font-medium px-2 py-1.5">Users</th>
              {Array.from({ length: maxMonths }, (_, i) => (
                <th key={i} className="text-center text-gray-500 font-medium px-2 py-1.5 min-w-[48px]">
                  M{i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort, rowIdx) => (
              <motion.tr
                key={cohort.cohortMonth}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIdx * 0.05 }}
              >
                <td className="px-2 py-1 text-gray-400 font-mono sticky left-0 bg-zilla-surface/50 z-10">
                  {cohort.cohortMonth}
                </td>
                <td className="px-2 py-1 text-center text-gray-300 font-mono">
                  {cohort.totalCustomers}
                </td>
                {Array.from({ length: maxMonths }, (_, monthIdx) => {
                  const retention = cohort.retention[monthIdx];
                  if (retention === undefined) {
                    return <td key={monthIdx} className="px-1 py-1" />;
                  }
                  return (
                    <td key={monthIdx} className="px-1 py-1">
                      <div
                        className={`rounded px-1.5 py-1 text-center font-mono text-[10px] font-medium ${getRetentionColor(retention)}`}
                      >
                        {retention}%
                      </div>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CohortChart;
