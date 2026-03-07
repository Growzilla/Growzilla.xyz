import React from 'react';
import type { SMInsight } from '@/types/smdashboard';

interface InsightsPanelProps {
  insights: SMInsight[];
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#EF4444',
  high: '#F59E0B',
  medium: '#3B82F6',
  low: '#6B7280',
};

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  return (
    <div className="space-y-3">
      {insights.map((insight) => (
        <div
          key={insight.id}
          className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: SEVERITY_COLORS[insight.severity] }}
            />
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
              {insight.severity}
            </span>
          </div>
          <p className="text-[12px] text-white font-medium leading-snug mb-1.5">
            {insight.title}
          </p>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            {insight.description.slice(0, 150)}...
          </p>
        </div>
      ))}
    </div>
  );
};

export default InsightsPanel;
