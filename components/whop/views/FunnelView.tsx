'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type {
  FemFitFunnelData,
  FemFitTrafficSource,
  FunnelData,
  ChannelFunnel,
} from '@/types/whop';
import ConeFunnel from '../charts/ConeFunnel';
import SankeyDiagram from '../charts/SankeyDiagram';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

function formatPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface FunnelViewProps {
  funnelData: FunnelData[];
  channelFunnels: ChannelFunnel[];
  femfitData?: FemFitFunnelData;
}

// ─── Hero Stat Card ───────────────────────────────────────────────────────────

function HeroCard({
  label,
  value,
  sub,
  accent,
  delay,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative overflow-hidden rounded-2xl border p-5 ${
        accent
          ? 'border-[#FA4616]/30 bg-[#FA4616]/[0.06]'
          : 'border-[#27272A] bg-[#1C1A1A]/60'
      } backdrop-blur-sm`}
    >
      {accent && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FA4616]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      )}
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#A1A1AA] font-medium mb-2">
        {label}
      </p>
      <p className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
        accent ? 'text-[#FA4616]' : 'text-white'
      }`}>
        {value}
      </p>
      {sub && (
        <p className="text-[11px] text-[#A1A1AA] mt-1 font-mono">{sub}</p>
      )}
    </motion.div>
  );
}

// ─── Whale Insight Card ───────────────────────────────────────────────────────

function WhaleCard({
  title,
  value,
  description,
  trend,
  trendValue,
  delay,
}: {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-[#27272A] bg-[#1C1A1A]/60 backdrop-blur-sm p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#A1A1AA] font-medium">
          {title}
        </p>
        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
          trend === 'up' ? 'text-[#22C55E] bg-[#22C55E]/10' :
          trend === 'down' ? 'text-[#EF4444] bg-[#EF4444]/10' :
          'text-[#A1A1AA] bg-white/5'
        }`}>
          {trendValue}
        </span>
      </div>
      <p className="text-xl font-bold font-mono text-white mb-1">{value}</p>
      <p className="text-[11px] text-[#A1A1AA] leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ─── Source Row for Data Table ────────────────────────────────────────────────

function SourceRow({ source, i }: { source: FemFitTrafficSource; i: number }) {
  const roas = source.spend > 0 ? source.roas : 0;
  const roasColor = roas >= 3 ? 'text-[#22C55E]' : roas >= 1 ? 'text-[#F59E0B]' : 'text-[#EF4444]';

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.05 }}
      className="border-t border-[#27272A]/60 hover:bg-white/[0.02] transition-colors"
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: source.color }} />
          <span className="text-sm text-white font-medium">{source.name}</span>
          <span className="text-[9px] text-[#A1A1AA] uppercase tracking-wider bg-white/5 px-1.5 py-0.5 rounded">
            {source.platform}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-right font-mono text-sm text-white">{formatK(source.visitors)}</td>
      <td className="py-3 px-4 text-right font-mono text-sm text-white">{formatK(source.typeformStarts)}</td>
      <td className="py-3 px-4 text-right font-mono text-sm text-white">{formatK(source.typeformCompletes)}</td>
      <td className="py-3 px-4 text-right font-mono text-sm text-white">{formatK(source.callsBooked)}</td>
      <td className="py-3 px-4 text-right font-mono text-sm font-bold text-[#22C55E]">{formatK(source.closedWon)}</td>
      <td className="py-3 px-4 text-right font-mono text-sm text-white">{formatCurrency(source.revenue)}</td>
      <td className="py-3 px-4 text-right font-mono text-sm text-white">
        {source.spend > 0 ? formatCurrency(source.spend) : '\u2014'}
      </td>
      <td className={`py-3 px-4 text-right font-mono text-sm font-bold ${roasColor}`}>
        {source.spend > 0 ? `${roas.toFixed(1)}x` : '\u2014'}
      </td>
    </motion.tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const FunnelView: React.FC<FunnelViewProps> = ({ funnelData, channelFunnels, femfitData }) => {
  const [viewMode, setViewMode] = useState<'full' | 'whale'>('full');
  const [tableExpanded, setTableExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<'revenue' | 'visitors' | 'roas'>('revenue');

  // Use FemFitOS data if provided, otherwise show empty state
  if (!femfitData) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-[#A1A1AA] text-sm">No funnel data available</p>
      </div>
    );
  }

  const d = femfitData;

  // Sort sources for table
  const sortedSources = [...d.sources].sort((a, b) => {
    if (sortBy === 'revenue') return b.revenue - a.revenue;
    if (sortBy === 'visitors') return b.visitors - a.visitors;
    return b.roas - a.roas;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* ─── Hero Stats Row ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <HeroCard
          label="Total Revenue"
          value={formatCurrency(d.totalRevenue)}
          sub="all sources combined"
          accent
          delay={0}
        />
        <HeroCard
          label="Total Traffic"
          value={formatK(d.totalTraffic)}
          sub="unique visitors"
          delay={0.05}
        />
        <HeroCard
          label="Conversion Rate"
          value={formatPct(d.overallConversion)}
          sub="traffic \u2192 closed"
          delay={0.1}
        />
        <HeroCard
          label="Whale Revenue"
          value={`${d.whaleRevenuePercent}%`}
          sub="top 20% of clients"
          delay={0.15}
        />
      </div>

      {/* ─── View Toggle ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-lg font-medium text-white">Funnel Visualization</h2>
        <div className="flex items-center bg-[#1C1A1A] rounded-xl border border-[#27272A] p-1">
          <button
            onClick={() => setViewMode('full')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              viewMode === 'full'
                ? 'bg-[#FA4616] text-white shadow-lg shadow-[#FA4616]/20'
                : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Full View
          </button>
          <button
            onClick={() => setViewMode('whale')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              viewMode === 'whale'
                ? 'bg-[#FA4616] text-white shadow-lg shadow-[#FA4616]/20'
                : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Whale-Only
          </button>
        </div>
      </motion.div>

      {/* ─── Main Visualization: 35/65 Split ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-4"
      >
        {/* LEFT: Cone Funnel */}
        <div className="rounded-2xl border border-[#27272A] bg-[#141212] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Stage Funnel</h3>
            <span className="text-[9px] text-[#A1A1AA] font-mono uppercase tracking-wider">
              {viewMode === 'whale' ? 'whales only' : 'all leads'}
            </span>
          </div>
          <ConeFunnel steps={d.steps} whaleOnly={viewMode === 'whale'} />
        </div>

        {/* RIGHT: Sankey Diagram */}
        <div className="rounded-2xl border border-[#27272A] bg-[#141212] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Attribution Flow</h3>
            <span className="text-[9px] text-[#A1A1AA] font-mono uppercase tracking-wider">
              hover to explore paths
            </span>
          </div>
          <SankeyDiagram
            nodes={d.sankeyNodes}
            links={d.sankeyLinks}
            whaleOnly={viewMode === 'whale'}
          />
        </div>
      </motion.div>

      {/* ─── Whale Insights ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-lg font-medium text-white mb-4">Whale Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {d.whaleInsights.map((insight, i) => (
            <WhaleCard
              key={insight.title}
              title={insight.title}
              value={insight.value}
              description={insight.description}
              trend={insight.trend}
              trendValue={insight.trendValue}
              delay={0.4 + i * 0.05}
            />
          ))}
        </div>
      </motion.div>

      {/* ─── Source Performance Table ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-[#27272A] bg-[#141212] overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]/60">
          <h3 className="text-sm font-medium text-white">Source Breakdown</h3>
          <div className="flex items-center gap-2">
            {/* Sort buttons */}
            {(['revenue', 'visitors', 'roas'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`text-[10px] font-medium px-2.5 py-1 rounded-lg transition-all ${
                  sortBy === key
                    ? 'text-[#FA4616] bg-[#FA4616]/10'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                }`}
              >
                {key === 'roas' ? 'ROAS' : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}

            {/* Expand toggle */}
            <button
              onClick={() => setTableExpanded(!tableExpanded)}
              className="text-[10px] text-[#A1A1AA] hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/5 transition-all ml-2"
            >
              {tableExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[#A1A1AA]">
                <th className="text-left font-medium px-4 py-3 text-[10px] uppercase tracking-wider">Source</th>
                <th className="text-right font-medium px-4 py-3 text-[10px] uppercase tracking-wider">Traffic</th>
                <th className="text-right font-medium px-4 py-3 text-[10px] uppercase tracking-wider">TF Start</th>
                <th className="text-right font-medium px-4 py-3 text-[10px] uppercase tracking-wider">TF Done</th>
                <th className="text-right font-medium px-4 py-3 text-[10px] uppercase tracking-wider">Calls</th>
                <th className="text-right font-medium px-4 py-3 text-[10px] uppercase tracking-wider">Closed</th>
                <th className="text-right font-medium px-4 py-3 text-[10px] uppercase tracking-wider">Revenue</th>
                <th className="text-right font-medium px-4 py-3 text-[10px] uppercase tracking-wider">Spend</th>
                <th className="text-right font-medium px-4 py-3 text-[10px] uppercase tracking-wider">ROAS</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {(tableExpanded ? sortedSources : sortedSources.slice(0, 5)).map((source, i) => (
                  <SourceRow key={source.id} source={source} i={i} />
                ))}
              </AnimatePresence>
            </tbody>
            {/* Totals row */}
            <tfoot>
              <tr className="border-t-2 border-[#27272A] bg-white/[0.02]">
                <td className="py-3 px-4 text-sm font-bold text-white">Total</td>
                <td className="py-3 px-4 text-right font-mono text-sm font-bold text-white">
                  {formatK(d.sources.reduce((s, src) => s + src.visitors, 0))}
                </td>
                <td className="py-3 px-4 text-right font-mono text-sm font-bold text-white">
                  {formatK(d.sources.reduce((s, src) => s + src.typeformStarts, 0))}
                </td>
                <td className="py-3 px-4 text-right font-mono text-sm font-bold text-white">
                  {formatK(d.sources.reduce((s, src) => s + src.typeformCompletes, 0))}
                </td>
                <td className="py-3 px-4 text-right font-mono text-sm font-bold text-white">
                  {formatK(d.sources.reduce((s, src) => s + src.callsBooked, 0))}
                </td>
                <td className="py-3 px-4 text-right font-mono text-sm font-bold text-[#22C55E]">
                  {formatK(d.sources.reduce((s, src) => s + src.closedWon, 0))}
                </td>
                <td className="py-3 px-4 text-right font-mono text-sm font-bold text-white">
                  {formatCurrency(d.sources.reduce((s, src) => s + src.revenue, 0))}
                </td>
                <td className="py-3 px-4 text-right font-mono text-sm font-bold text-white">
                  {formatCurrency(d.sources.reduce((s, src) => s + src.spend, 0))}
                </td>
                <td className="py-3 px-4 text-right font-mono text-sm font-bold text-[#FA4616]">
                  {(() => {
                    const totalSpend = d.sources.reduce((s, src) => s + src.spend, 0);
                    const totalRev = d.sources.reduce((s, src) => s + src.revenue, 0);
                    return totalSpend > 0 ? `${(totalRev / totalSpend).toFixed(1)}x` : '\u2014';
                  })()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FunnelView;
