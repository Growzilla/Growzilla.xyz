import React from 'react';
import type { Insight, InsightSeverity } from '@/types/admin';
import InsightCard from './InsightCard';

interface InsightsFeedProps {
  insights: Insight[];
  filter: InsightSeverity | 'all';
  onFilterChange: (filter: InsightSeverity | 'all') => void;
  onDismiss: (id: string) => void;
  onAction: (id: string) => void;
  loading: boolean;
}

const filters: { value: InsightSeverity | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const InsightsFeed: React.FC<InsightsFeedProps> = ({
  insights,
  filter,
  onFilterChange,
  onDismiss,
  onAction,
  loading,
}) => {
  return (
    <div>
      {/* Filter pills */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
              filter === f.value
                ? 'bg-zilla-neon/15 text-zilla-neon border border-zilla-neon/30'
                : 'text-gray-400 border border-gray-700 hover:text-white hover:border-gray-500'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Insight list */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-zilla p-4 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-full mb-1" />
                <div className="h-3 bg-gray-800 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : insights.length === 0 ? (
          <p className="text-center py-6 text-sm text-gray-500">No insights to show</p>
        ) : (
          insights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onDismiss={onDismiss}
              onAction={onAction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InsightsFeed;
