import React from 'react';
import { motion } from 'framer-motion';
import type { SMDashboardData, Post, SMInsight } from '@/types/smdashboard';
import { getPostsByPlatform } from '@/data/mockSMData';
import KPIRow from './KPIRow';
import RevenueByPlatformChart from './RevenueByPlatformChart';
import TopPostsLeaderboard from './TopPostsLeaderboard';
import CreatorComparisonChart from './CreatorComparisonChart';
import InsightCard from './InsightCard';

interface OrgViewProps {
  data: SMDashboardData;
  activePlatform: string;
  onPostClick: (post: Post) => void;
  onSelectCreator: (creatorId: string) => void;
  onCreateTemplate: (insight: SMInsight) => void;
  onViewPost: (postId: string) => void;
}

function formatCurrency(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`;
}

function formatDelta(d: number): string {
  const sign = d >= 0 ? '+' : '';
  return `${sign}${d.toFixed(1)}%`;
}

function getPlatformDisplayName(p: string): string {
  const names: Record<string, string> = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube' };
  return names[p] || p;
}

const OrgView: React.FC<OrgViewProps> = ({
  data,
  activePlatform,
  onPostClick,
  onSelectCreator,
  onCreateTemplate,
  onViewPost,
}) => {
  const { org } = data;
  const filteredPosts = getPostsByPlatform(activePlatform);

  const kpis = [
    {
      label: 'Total Revenue',
      value: formatCurrency(org.totalRevenue),
      delta: formatDelta(org.revenueChange),
      up: org.revenueChange >= 0,
      tooltip: 'Total revenue attributed to creator content',
    },
    {
      label: 'Creator Earnings',
      value: formatCurrency(org.totalCommissions),
      subValue: '15% commission',
      tooltip: 'Total commissions paid to creators',
    },
    {
      label: 'Top Platform',
      value: getPlatformDisplayName(org.topPlatform),
      subValue: formatCurrency(org.topPlatformRevenue) + ' rev',
      tooltip: 'Highest revenue-generating platform',
    },
    {
      label: 'Avg Conv Rate',
      value: `${org.avgConversionRate}%`,
      delta: formatDelta(org.conversionChange),
      up: org.conversionChange >= 0,
      tooltip: 'Average conversion rate across all creator posts',
    },
    {
      label: 'Total Posts',
      value: org.totalPosts.toString(),
      subValue: `+${org.postsThisWeek} this week`,
      tooltip: 'Total posts tracked across all creators',
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KPIRow cards={kpis} />

      {/* Charts Row: Revenue by Platform + Top Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueByPlatformChart
          data={data.revenueChart}
          activePlatform={activePlatform}
        />
        <TopPostsLeaderboard
          posts={filteredPosts}
          onPostClick={onPostClick}
        />
      </div>

      {/* Creator Comparison */}
      <CreatorComparisonChart
        creators={data.creators}
        onSelectCreator={onSelectCreator}
      />

      {/* Attribution Flow Teaser (Sankey preview) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card-zilla p-6 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">{'\u{1F500}'}</span>
            <h3 className="text-sm font-medium text-white">Attribution Flow</h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zilla-neon/10 text-zilla-neon border border-zilla-neon/20">
            Sankey Diagram
          </span>
        </div>

        {/* Static Sankey-like visualization */}
        <div className="relative">
          <svg viewBox="0 0 680 200" className="w-full h-auto">
            <defs>
              <linearGradient id="flow-tt" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00F2EA" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00FF94" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="flow-ig" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E1306C" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00FF94" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="flow-yt" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF0000" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00FF94" stopOpacity="0.3" />
              </linearGradient>
              <filter id="teaser-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Column headers */}
            {['Platform', 'Creator', 'Content', 'Product', 'Revenue'].map((label, i) => (
              <text
                key={label}
                x={40 + i * 155}
                y={16}
                textAnchor="middle"
                className="fill-[#A1A1AA] text-[9px] uppercase"
                style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em' }}
              >
                {label}
              </text>
            ))}

            {/* Platform nodes */}
            <rect x="30" y="35" width="12" height="55" rx="3" fill="#00F2EA" fillOpacity="0.85" />
            <text x="48" y="58" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>TikTok</text>
            <text x="48" y="70" className="text-[8px] fill-[#A1A1AA]" style={{ fontFamily: 'ui-monospace, monospace' }}>$156.2K</text>

            <rect x="30" y="100" width="12" height="38" rx="3" fill="#E1306C" fillOpacity="0.85" />
            <text x="48" y="116" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Instagram</text>
            <text x="48" y="128" className="text-[8px] fill-[#A1A1AA]" style={{ fontFamily: 'ui-monospace, monospace' }}>$98.2K</text>

            <rect x="30" y="148" width="12" height="18" rx="3" fill="#FF0000" fillOpacity="0.85" />
            <text x="48" y="160" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>YouTube</text>
            <text x="48" y="172" className="text-[8px] fill-[#A1A1AA]" style={{ fontFamily: 'ui-monospace, monospace' }}>$30.3K</text>

            {/* Creator nodes */}
            <rect x="185" y="32" width="12" height="40" rx="3" fill="#00FF94" fillOpacity="0.85" />
            <text x="203" y="50" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Sarah</text>
            <text x="203" y="62" className="text-[8px] fill-[#A1A1AA]" style={{ fontFamily: 'ui-monospace, monospace' }}>$87.4K</text>

            <rect x="185" y="82" width="12" height="30" rx="3" fill="#00FF94" fillOpacity="0.7" />
            <text x="203" y="96" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Marcus</text>

            <rect x="185" y="122" width="12" height="22" rx="3" fill="#00FF94" fillOpacity="0.55" />
            <text x="203" y="134" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Aisha</text>

            <rect x="185" y="154" width="12" height="18" rx="3" fill="#00FF94" fillOpacity="0.45" />
            <text x="203" y="166" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Jake</text>

            {/* Flow paths — Platform to Creator */}
            <path d="M 42 55 C 110 55, 120 50, 185 50" fill="none" stroke="url(#flow-tt)" strokeWidth="16" strokeOpacity="0.25" />
            <path d="M 42 65 C 110 65, 120 95, 185 95" fill="none" stroke="url(#flow-tt)" strokeWidth="8" strokeOpacity="0.2" />
            <path d="M 42 115 C 110 115, 120 55, 185 55" fill="none" stroke="url(#flow-ig)" strokeWidth="10" strokeOpacity="0.2" />
            <path d="M 42 120 C 110 120, 120 130, 185 130" fill="none" stroke="url(#flow-ig)" strokeWidth="8" strokeOpacity="0.2" />
            <path d="M 42 155 C 110 155, 120 100, 185 100" fill="none" stroke="url(#flow-yt)" strokeWidth="6" strokeOpacity="0.2" />
            <path d="M 42 160 C 110 160, 120 160, 185 160" fill="none" stroke="url(#flow-yt)" strokeWidth="4" strokeOpacity="0.15" />

            {/* Content type nodes */}
            <rect x="340" y="35" width="12" height="35" rx="3" fill="#A78BFA" fillOpacity="0.85" />
            <text x="358" y="50" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Reels</text>
            <text x="358" y="62" className="text-[8px] fill-[#A1A1AA]" style={{ fontFamily: 'ui-monospace, monospace' }}>68%</text>

            <rect x="340" y="80" width="12" height="24" rx="3" fill="#A78BFA" fillOpacity="0.6" />
            <text x="358" y="94" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Videos</text>

            <rect x="340" y="114" width="12" height="16" rx="3" fill="#A78BFA" fillOpacity="0.4" />
            <text x="358" y="124" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Posts</text>

            {/* Flow paths — Creator to Content */}
            <path d="M 197 50 C 265 50, 275 50, 340 50" fill="none" stroke="#00FF94" strokeWidth="14" strokeOpacity="0.15" />
            <path d="M 197 95 C 265 95, 275 88, 340 88" fill="none" stroke="#00FF94" strokeWidth="8" strokeOpacity="0.12" />
            <path d="M 197 130 C 265 130, 275 120, 340 120" fill="none" stroke="#00FF94" strokeWidth="6" strokeOpacity="0.1" />

            {/* Product nodes */}
            <rect x="495" y="35" width="12" height="30" rx="3" fill="#FBBF24" fillOpacity="0.85" />
            <text x="513" y="48" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Glow Serum</text>
            <text x="513" y="60" className="text-[8px] fill-[#A1A1AA]" style={{ fontFamily: 'ui-monospace, monospace' }}>$142K</text>

            <rect x="495" y="75" width="12" height="22" rx="3" fill="#FBBF24" fillOpacity="0.6" />
            <text x="513" y="88" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>NightRepair</text>

            <rect x="495" y="107" width="12" height="16" rx="3" fill="#FBBF24" fillOpacity="0.4" />
            <text x="513" y="117" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>HydraVeil</text>

            {/* Flow paths — Content to Product */}
            <path d="M 352 50 C 420 50, 430 48, 495 48" fill="none" stroke="#A78BFA" strokeWidth="12" strokeOpacity="0.15" />
            <path d="M 352 90 C 420 90, 430 84, 495 84" fill="none" stroke="#A78BFA" strokeWidth="8" strokeOpacity="0.12" />
            <path d="M 352 120 C 420 120, 430 113, 495 113" fill="none" stroke="#A78BFA" strokeWidth="5" strokeOpacity="0.1" />

            {/* Revenue nodes */}
            <rect x="650" y="40" width="12" height="65" rx="3" fill="#00FF94" fillOpacity="0.85" filter="url(#teaser-glow)" />
            <text x="640" y="120" textAnchor="end" className="text-[9px] fill-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Total</text>
            <text x="640" y="132" textAnchor="end" className="text-[8px] fill-[#A1A1AA]" style={{ fontFamily: 'ui-monospace, monospace' }}>$284.7K</text>

            {/* Flow paths — Product to Revenue */}
            <path d="M 507 48 C 575 48, 585 55, 650 55" fill="none" stroke="#FBBF24" strokeWidth="14" strokeOpacity="0.15" />
            <path d="M 507 84 C 575 84, 585 68, 650 68" fill="none" stroke="#FBBF24" strokeWidth="10" strokeOpacity="0.12" />
            <path d="M 507 113 C 575 113, 585 82, 650 82" fill="none" stroke="#FBBF24" strokeWidth="6" strokeOpacity="0.1" />
          </svg>

          {/* Frosted overlay with CTA */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-transparent">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">
                Full interactive attribution flow available with connected store
              </p>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zilla-neon/10 border border-zilla-neon/30 text-zilla-neon text-sm font-medium cursor-pointer hover:bg-zilla-neon/20 transition-colors">
                See full attribution flow
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Insights */}
      <div className="card-zilla p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">\ud83e\udde0</span>
            <h3 className="text-sm font-medium text-white">AI Insights</h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zilla-neon/10 text-zilla-neon border border-zilla-neon/20">
            Powered by AI
          </span>
        </div>
        <div className="space-y-3">
          {data.insights.map((insight, i) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              index={i}
              onCreateTemplate={onCreateTemplate}
              onViewPost={onViewPost}
              onViewCreator={(id) => onSelectCreator(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgView;
