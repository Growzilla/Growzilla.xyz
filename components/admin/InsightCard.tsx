import React from 'react';
import type { Insight } from '@/types/admin';
import {
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  XMarkIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface InsightCardProps {
  insight: Insight;
  onDismiss: (id: string) => void;
  onAction: (id: string) => void;
}

const severityConfig = {
  critical: { icon: ExclamationTriangleIcon, className: 'bg-zilla-danger/10 text-zilla-danger border-zilla-danger/30' },
  high: { icon: ExclamationTriangleIcon, className: 'bg-zilla-gold/10 text-zilla-gold border-zilla-gold/30' },
  medium: { icon: ArrowTrendingUpIcon, className: 'bg-zilla-electric/10 text-zilla-electric border-zilla-electric/30' },
  low: { icon: ArrowTrendingUpIcon, className: 'bg-gray-500/10 text-gray-400 border-gray-500/30' },
};

const InsightCard: React.FC<InsightCardProps> = ({ insight, onDismiss, onAction }) => {
  const severity = severityConfig[insight.severity];
  const Icon = severity.icon;
  const isActioned = insight.status === 'actioned';

  return (
    <div className="card-zilla p-4">
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 p-1.5 rounded-lg border ${severity.className}`}>
          <Icon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-white truncate">{insight.title}</h4>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider border ${severity.className}`}>
              {insight.severity}
            </span>
          </div>

          <p className="text-xs text-gray-400 mb-2 line-clamp-2">{insight.description}</p>

          {insight.action_summary && (
            <p className="text-xs text-gray-300 mb-2">
              <BoltIcon className="w-3 h-3 inline mr-1 text-zilla-neon" />
              {insight.action_summary}
            </p>
          )}

          {insight.expected_uplift && (
            <p className="text-xs text-zilla-neon font-mono mb-3">
              Expected uplift: {insight.expected_uplift}
            </p>
          )}

          {!isActioned && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAction(insight.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zilla-black bg-zilla-neon rounded hover:bg-zilla-glow transition-colors"
              >
                <CheckCircleIcon className="w-3.5 h-3.5" />
                Take Action
              </button>
              <button
                onClick={() => onDismiss(insight.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-400 border border-gray-700 rounded hover:text-white hover:border-gray-500 transition-colors"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
                Dismiss
              </button>
            </div>
          )}

          {isActioned && (
            <span className="inline-flex items-center gap-1 text-xs text-zilla-neon">
              <CheckCircleIcon className="w-3.5 h-3.5" />
              Actioned
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
