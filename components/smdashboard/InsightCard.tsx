import React from 'react';
import { motion } from 'framer-motion';
import type { SMInsight, InsightSeverity } from '@/types/smdashboard';

interface InsightCardProps {
  insight: SMInsight;
  index: number;
  onCreateTemplate: (insight: SMInsight) => void;
  onViewPost?: (postId: string) => void;
  onViewCreator?: (creatorId: string) => void;
}

const SEVERITY_COLORS: Record<InsightSeverity, string> = {
  critical: 'border-red-500/30 bg-red-500/5',
  high: 'border-amber-500/30 bg-amber-500/5',
  medium: 'border-emerald-500/30 bg-emerald-500/5',
  low: 'border-blue-500/30 bg-blue-500/5',
};

const SEVERITY_DOT: Record<InsightSeverity, string> = {
  critical: 'bg-red-500',
  high: 'bg-amber-500',
  medium: 'bg-emerald-500',
  low: 'bg-blue-500',
};

const SEVERITY_ICON: Record<InsightSeverity, string> = {
  critical: '\ud83d\udd34',
  high: '\ud83d\udfe0',
  medium: '\ud83d\udfe2',
  low: '\ud83d\udd35',
};

const CTA_ICONS: Record<string, string> = {
  template: '\u2728',
  strategy: '\ud83d\udcca',
  playbook: '\ud83d\udcd6',
  brief: '\ud83d\udcc8',
};

const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  index,
  onCreateTemplate,
  onViewPost,
  onViewCreator,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.08 }}
    className={`rounded-xl border p-4 sm:p-5 ${SEVERITY_COLORS[insight.severity]} transition-all duration-300 hover:shadow-lg`}
  >
    {/* Title */}
    <div className="flex items-start gap-2 mb-2">
      <span className="text-sm flex-shrink-0 mt-0.5">
        {SEVERITY_ICON[insight.severity]}
      </span>
      <h4 className="text-sm font-medium text-white leading-snug">
        {insight.title}
      </h4>
    </div>

    {/* Description */}
    <p className="text-xs text-gray-400 leading-relaxed ml-0 sm:ml-6 mb-3">
      {insight.description}
    </p>

    {/* Action buttons */}
    <div className="flex flex-wrap items-center gap-2 sm:ml-6">
      <button
        onClick={() => onCreateTemplate(insight)}
        className="flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all"
      >
        <span>{CTA_ICONS[insight.ctaAction] || '\u2728'}</span>
        {insight.ctaLabel}
      </button>

      {insight.relatedPostId && onViewPost && (
        <button
          onClick={() => onViewPost(insight.relatedPostId!)}
          className="flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          \ud83d\udccb View Post
        </button>
      )}

      {insight.relatedCreatorId && onViewCreator && !insight.relatedPostId && (
        <button
          onClick={() => onViewCreator(insight.relatedCreatorId!)}
          className="flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          \ud83d\udc64 View Creator
        </button>
      )}
    </div>
  </motion.div>
);

export default InsightCard;
