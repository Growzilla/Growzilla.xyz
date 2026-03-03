import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/solid';
import type { ShopDetails } from '@/types/admin';
import SankeyDiagram from '@/components/whop/charts/SankeyDiagram';
import KPICard from '@/components/admin/KPICard';

interface MerchantPreviewProps {
  shop: ShopDetails;
  open: boolean;
  onClose: () => void;
}

interface PreviewStats {
  yesterday_revenue: number;
  week_avg_revenue: number;
  yesterday_orders: number;
  week_avg_orders: number;
  aov: number;
  revenue_delta: number;
  orders_delta: number;
}

interface SankeyNode {
  id: string;
  label: string;
  value: number;
  column: number;
  color: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color: string;
}

const API_BASE = process.env.NEXT_PUBLIC_ECOMDASH_API_URL || process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';

function getAdminKey(): string {
  return process.env.NEXT_PUBLIC_ADMIN_KEY || '';
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

// Map the backend Sankey format to the component's expected format (with colors)
const COLUMN_COLORS = ['#FA4616', '#FF6B3D', '#FFA77B', '#FFD700', '#22C55E'];

function addColorsToSankey(
  nodes: { id: string; label: string; value: number; column: number }[],
  links: { source: string; target: string; value: number }[]
): { nodes: SankeyNode[]; links: SankeyLink[] } {
  const coloredNodes = nodes.map((n) => ({
    ...n,
    color: COLUMN_COLORS[n.column] || '#A1A1AA',
  }));

  const nodeMap = new Map(coloredNodes.map((n) => [n.id, n]));

  const coloredLinks = links.map((l) => ({
    ...l,
    color: nodeMap.get(l.source)?.color || '#A1A1AA',
  }));

  return { nodes: coloredNodes, links: coloredLinks };
}

const MerchantPreview: React.FC<MerchantPreviewProps> = ({ shop, open, onClose }) => {
  const [stats, setStats] = useState<PreviewStats | null>(null);
  const [sankeyData, setSankeyData] = useState<{ nodes: SankeyNode[]; links: SankeyLink[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open || !shop.shop_id) return;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Admin-Key': getAdminKey(),
    };

    setLoading(true);
    setError('');

    // Fetch stats and funnel in parallel
    Promise.all([
      fetch(`${API_BASE}/api/dashboard/stats?shop_id=${shop.shop_id}`, { headers })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(`${API_BASE}/api/meta/funnel/${shop.shop_id}`, { headers })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]).then(([statsData, funnelData]) => {
      if (statsData) setStats(statsData);
      if (funnelData && funnelData.nodes && funnelData.links) {
        setSankeyData(addColorsToSankey(funnelData.nodes, funnelData.links));
      }
      if (!statsData && !funnelData) setError('No data available yet. Try syncing first.');
      setLoading(false);
    });
  }, [open, shop.shop_id]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="card-zilla p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-white">{shop.label}</h2>
              <p className="text-sm text-gray-500 font-mono">{shop.domain}</p>
            </div>

            {loading && (
              <div className="py-16 text-center">
                <ArrowPathIcon className="w-8 h-8 text-zilla-neon animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading merchant data...</p>
              </div>
            )}

            {error && !loading && (
              <div className="py-16 text-center">
                <p className="text-gray-400">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                {/* KPI Row */}
                {stats && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    <KPICard
                      label="Yesterday Revenue"
                      value={formatCurrency(stats.yesterday_revenue)}
                      delta={stats.revenue_delta}
                      icon={<CurrencyDollarIcon className="w-5 h-5" />}
                    />
                    <KPICard
                      label="Yesterday Orders"
                      value={formatNumber(stats.yesterday_orders)}
                      delta={stats.orders_delta}
                      icon={<ShoppingCartIcon className="w-5 h-5" />}
                    />
                    <KPICard
                      label="AOV"
                      value={formatCurrency(stats.aov)}
                      icon={<ChartBarIcon className="w-5 h-5" />}
                    />
                    <KPICard
                      label="Week Avg Revenue"
                      value={formatCurrency(stats.week_avg_revenue)}
                      icon={<MegaphoneIcon className="w-5 h-5" />}
                    />
                  </div>
                )}

                {/* Sankey Funnel */}
                {sankeyData && sankeyData.nodes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-3">
                      Meta Ads Funnel
                    </h3>
                    <div className="card-zilla p-4">
                      <SankeyDiagram
                        nodes={sankeyData.nodes}
                        links={sankeyData.links}
                      />
                    </div>
                  </div>
                )}

                {/* No Meta data CTA */}
                {!sankeyData && stats && (
                  <div className="card-zilla p-8 text-center">
                    <MegaphoneIcon className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 mb-1">No Meta Ads data</p>
                    <p className="text-xs text-gray-600">
                      Connect Meta Ads to see the campaign funnel visualization
                    </p>
                  </div>
                )}

                {/* No data at all */}
                {!stats && !sankeyData && (
                  <div className="card-zilla p-8 text-center">
                    <p className="text-gray-400">No data available. Sync the shop first.</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MerchantPreview;
