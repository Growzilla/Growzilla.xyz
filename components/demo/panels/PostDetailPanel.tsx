import React from 'react';
import type { Post, Creator } from '@/types/smdashboard';
import { formatCurrency, formatNumber, platformColor } from '@/lib/design-tokens';
import { tw } from '@/lib/design-tokens';

interface PostDetailPanelProps {
  post: Post;
  creator?: Creator;
  onNavigateToAttribution?: () => void;
}

const PostDetailPanel: React.FC<PostDetailPanelProps> = ({ post, creator, onNavigateToAttribution }) => {
  const funnelSteps = [
    { label: 'Views', value: post.funnel.views },
    { label: 'Clicks', value: post.funnel.clicks },
    { label: 'Add to Cart', value: post.funnel.addToCart },
    { label: 'Checkout', value: post.funnel.checkout },
    { label: 'Purchases', value: post.funnel.purchases },
  ];

  return (
    <div className="space-y-4">
      {/* Post thumbnail */}
      <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900">
        <img
          src={post.thumbnail}
          alt={post.caption.slice(0, 40)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post header */}
      <div className="flex items-center gap-2">
        <span
          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
          style={{
            backgroundColor: `${platformColor(post.platform)}20`,
            color: platformColor(post.platform),
          }}
        >
          {post.platform.toUpperCase()}
        </span>
        <span className="text-[10px] text-zinc-500">{post.postType}</span>
        {creator && (
          <span className="text-[10px] text-zinc-400 ml-auto">{creator.name}</span>
        )}
      </div>

      {/* Caption */}
      <p className="text-sm text-zinc-300 leading-relaxed">{post.caption}</p>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Revenue', value: formatCurrency(post.revenue) },
          { label: 'Orders', value: post.orders.toString() },
          { label: 'Conv Rate', value: `${post.conversionRate}%` },
          { label: 'AOV', value: formatCurrency(post.aov) },
          { label: 'Commission', value: formatCurrency(post.commission) },
          { label: 'LTV', value: formatCurrency(post.ltv) },
        ].map((m) => (
          <div key={m.label} className={`${tw.card} p-2.5`}>
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{m.label}</p>
            <p className="text-sm font-mono font-semibold text-white mt-0.5">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Engagement */}
      <div>
        <p className={`${tw.label} mb-2`}>Engagement</p>
        <div className="space-y-1.5">
          {[
            { label: 'Views', value: formatNumber(post.engagement.views) },
            { label: 'Likes', value: formatNumber(post.engagement.likes) },
            { label: 'Comments', value: formatNumber(post.engagement.comments) },
            { label: 'Shares', value: formatNumber(post.engagement.shares) },
            { label: 'Saves', value: formatNumber(post.engagement.saves) },
          ].map((e) => (
            <div key={e.label} className="flex items-center justify-between py-1">
              <span className="text-[11px] text-zinc-500">{e.label}</span>
              <span className="text-[11px] font-mono text-white">{e.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Funnel */}
      <div>
        <p className={`${tw.label} mb-2`}>Conversion Funnel</p>
        <div className="space-y-1">
          {funnelSteps.map((step, i) => {
            const pct = (step.value / funnelSteps[0].value) * 100;
            return (
              <div key={step.label}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-zinc-500">{step.label}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{formatNumber(step.value)}</span>
                </div>
                <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: i === funnelSteps.length - 1 ? '#00FF94' : `rgba(255,255,255,${0.15 - i * 0.02})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Show full attribution flow button */}
      {onNavigateToAttribution && (
        <button
          onClick={onNavigateToAttribution}
          className="w-full py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-[#00FF94] hover:bg-[#00FF94]/10 hover:border-[#00FF94]/30 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          Show full attribution flow
        </button>
      )}
    </div>
  );
};

export default PostDetailPanel;
