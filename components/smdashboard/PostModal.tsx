import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Post } from '@/types/smdashboard';
import { getPlatformColor, getPlatformLabel } from '@/data/mockSMData';
import { MOCK_SM_DATA } from '@/data/mockSMData';

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

function formatCurrency(n: number): string {
  return n >= 1000 ? `$${n.toLocaleString()}` : `$${n.toFixed(2)}`;
}

function formatEngagement(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

const PLATFORM_ICON: Record<string, string> = {
  instagram: '\ud83d\udcf8',
  tiktok: '\ud83c\udfac',
  youtube: '\u25b6\ufe0f',
};

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  const creator = MOCK_SM_DATA.creators.find((c) => c.id === post.creatorId);
  const funnel = post.funnel;
  const funnelSteps = [
    { label: 'Views', value: funnel.views, color: 'text-gray-300' },
    { label: 'Clicks', value: funnel.clicks, color: 'text-blue-400' },
    { label: 'Add to Cart', value: funnel.addToCart, color: 'text-amber-400' },
    { label: 'Checkout', value: funnel.checkout, color: 'text-orange-400' },
    { label: 'Purchase', value: funnel.purchases, color: 'text-zilla-neon' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-zilla-dark/95 backdrop-blur-xl shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Header: Creator + Platform + Date */}
            <div className="flex items-start gap-3 sm:gap-4 mb-6">
              {/* Thumbnail */}
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnail}
                  alt={post.caption.slice(0, 60)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={creator?.avatar || ''} alt={creator?.name || ''} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-sm font-medium text-white">
                    {creator?.name}
                  </span>
                  <span className="text-xs text-gray-500">\u2022</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: getPlatformColor(post.platform) }}
                  >
                    {getPlatformLabel(post.platform)}{' '}
                    {post.postType.charAt(0).toUpperCase() + post.postType.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Posted{' '}
                  {new Date(post.postedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">{post.caption}</p>
              </div>
            </div>

            {/* Mini KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Revenue', value: formatCurrency(post.revenue), highlight: true },
                { label: 'Orders', value: post.orders.toString(), highlight: false },
                { label: 'Clicks', value: formatEngagement(post.clicks), highlight: false },
                { label: 'Conv Rate', value: `${post.conversionRate}%`, highlight: false },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className={`rounded-xl p-3 border ${
                    kpi.highlight
                      ? 'border-zilla-neon/20 bg-zilla-neon/5'
                      : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {kpi.label}
                  </p>
                  <p
                    className={`text-lg font-mono font-bold mt-0.5 ${
                      kpi.highlight ? 'text-zilla-neon' : 'text-white'
                    }`}
                  >
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Conversion Funnel */}
            <div className="mb-6">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                Conversion Funnel
              </h4>
              <div className="space-y-1.5 sm:space-y-0 sm:flex sm:items-center sm:gap-1">
                {funnelSteps.map((step, i) => {
                  const widthPct = Math.max(
                    (step.value / funnelSteps[0].value) * 100,
                    8
                  );
                  return (
                    <React.Fragment key={step.label}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="sm:flex-shrink-0"
                        style={{ minWidth: undefined }}
                      >
                        <div
                          className="h-10 rounded-lg flex items-center justify-between sm:justify-center px-3 sm:px-1 relative overflow-hidden"
                          style={{
                            backgroundColor:
                              i === funnelSteps.length - 1
                                ? 'rgba(0, 255, 148, 0.15)'
                                : `rgba(255, 255, 255, ${0.03 + i * 0.02})`,
                            border:
                              i === funnelSteps.length - 1
                                ? '1px solid rgba(0, 255, 148, 0.3)'
                                : '1px solid rgba(255, 255, 255, 0.05)',
                          }}
                        >
                          <div className="sm:text-center">
                            <p className={`text-[11px] sm:text-[10px] font-medium ${step.color}`}>
                              {step.label}
                            </p>
                            <p className="text-xs font-mono text-white font-medium">
                              {formatEngagement(step.value)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      {i < funnelSteps.length - 1 && (
                        <span className="text-gray-600 text-xs flex-shrink-0">\u2192</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="mb-6">
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                Revenue Breakdown
              </h4>
              <div className="space-y-2 bg-white/[0.02] rounded-xl border border-white/5 p-4">
                {[
                  { label: 'Attributed Revenue', value: formatCurrency(post.revenue), highlight: true },
                  { label: 'Creator Commission', value: `${formatCurrency(post.commission)} (15%)`, highlight: false },
                  { label: 'AOV', value: formatCurrency(post.aov), highlight: false },
                  { label: 'LTV (estimated)', value: formatCurrency(post.ltv), highlight: false },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-1">
                    <span className="text-xs text-gray-400">{row.label}</span>
                    <span
                      className={`text-sm font-mono font-medium ${
                        row.highlight ? 'text-zilla-neon' : 'text-white'
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                Engagement
              </h4>
              <div className="flex items-center gap-4 flex-wrap">
                {[
                  { icon: '\u2764\ufe0f', label: 'likes', value: post.engagement.likes },
                  { icon: '\ud83d\udcac', label: 'comments', value: post.engagement.comments },
                  { icon: '\ud83d\udd01', label: 'shares', value: post.engagement.shares },
                  { icon: '\ud83d\udccc', label: 'saves', value: post.engagement.saves },
                  { icon: '\ud83d\udc41\ufe0f', label: 'views', value: post.engagement.views },
                ].map((e) => (
                  <div key={e.label} className="flex items-center gap-1.5 text-sm">
                    <span>{e.icon}</span>
                    <span className="font-mono text-white font-medium">
                      {formatEngagement(e.value)}
                    </span>
                    <span className="text-gray-500 text-xs">{e.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostModal;
