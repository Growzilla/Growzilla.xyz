import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import UserLayout from '@/components/user/UserLayout';
import UserLoadingSkeleton from '@/components/user/UserLoadingSkeleton';
import {
  MOCK_STATS,
  MOCK_REVENUE_CHART,
  MOCK_TOP_PRODUCTS,
  MOCK_INSIGHTS,
} from '@/data/mockUserData';

function formatCurrency(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`;
}

function formatDelta(d: number) {
  const sign = d >= 0 ? '+' : '';
  return `${sign}${d.toFixed(1)}%`;
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'border-red-500/30 bg-red-500/5',
  high: 'border-amber-500/30 bg-amber-500/5',
  medium: 'border-blue-500/30 bg-blue-500/5',
  low: 'border-gray-600/30 bg-gray-500/5',
};

const SEVERITY_DOT: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-amber-500',
  medium: 'bg-blue-500',
  low: 'bg-gray-500',
};

export default function DemoDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const stats = MOCK_STATS;
  const chart = MOCK_REVENUE_CHART;
  const products = MOCK_TOP_PRODUCTS;
  const insights = MOCK_INSIGHTS;

  const W = 700;
  const H = 250;
  const PAD = 40;
  const maxRev = Math.max(...chart.data.map((d) => d.revenue));
  const points = chart.data.map((d, i) => {
    const x = PAD + (i / (chart.data.length - 1)) * (W - PAD * 2);
    const y = H - PAD - (d.revenue / maxRev) * (H - PAD * 2);
    return { x, y, ...d };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${H - PAD} L${points[0].x},${H - PAD} Z`;

  const kpis = [
    { label: 'Revenue', value: formatCurrency(stats.total_revenue), delta: formatDelta(stats.revenue_change), up: stats.revenue_change >= 0 },
    { label: 'Orders', value: stats.total_orders.toLocaleString(), delta: formatDelta(stats.orders_change), up: stats.orders_change >= 0 },
    { label: 'AOV', value: `$${stats.average_order_value.toFixed(2)}`, delta: formatDelta(stats.aov_change), up: stats.aov_change >= 0 },
    { label: 'Customers', value: stats.total_customers.toLocaleString(), delta: formatDelta(stats.customers_change), up: stats.customers_change >= 0 },
  ];

  return (
    <>
      <Head>
        <title>Demo Dashboard | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <UserLayout storeName="Demo Store">
        {loading ? (
          <UserLoadingSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Demo banner */}
            <div className="rounded-lg border border-zilla-neon/20 bg-zilla-neon/5 px-4 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="text-zilla-neon font-medium">Demo Mode</span> — Viewing sample data.
                This is what your dashboard looks like with Growzilla.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="card-zilla p-5"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-2xl font-bold text-white mt-1 font-mono">{kpi.value}</p>
                  <p className={`text-sm mt-1 ${kpi.up ? 'text-zilla-neon' : 'text-red-400'}`}>
                    {kpi.delta} <span className="text-gray-600 text-xs">vs prev period</span>
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="card-zilla p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white">Revenue Trend</h3>
                <span className="text-xs text-gray-500 font-mono">Last 30 days</span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
                {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                  const y = H - PAD - pct * (H - PAD * 2);
                  return (
                    <g key={pct}>
                      <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#374151" strokeWidth={0.5} />
                      <text x={PAD - 6} y={y + 4} textAnchor="end" fill="#6B7280" fontSize={10} fontFamily="monospace">
                        {formatCurrency(maxRev * pct)}
                      </text>
                    </g>
                  );
                })}
                <path d={areaPath} fill="url(#demoChartGrad)" opacity={0.3} />
                <path d={linePath} fill="none" stroke="#00FF94" strokeWidth={2} />
                <defs>
                  <linearGradient id="demoChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF94" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00FF94" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Bottom grid: Products + Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <div className="card-zilla p-6">
                <h3 className="text-sm font-medium text-white mb-4">Top Products</h3>
                <div className="space-y-2">
                  {products.map((p) => (
                    <div
                      key={p.product_id}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs text-gray-600 font-mono w-5">{p.rank}</span>
                        <span className="text-sm text-white truncate">{p.title}</span>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <span className="text-sm font-mono text-white">{formatCurrency(p.revenue)}</span>
                        <span className="text-xs text-gray-500 ml-2">{p.orders} orders</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="card-zilla p-6">
                <h3 className="text-sm font-medium text-white mb-4">AI Insights</h3>
                <div className="space-y-3">
                  {insights.map((ins) => (
                    <div
                      key={ins.id}
                      className={`rounded-lg border p-4 ${SEVERITY_COLORS[ins.severity]}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${SEVERITY_DOT[ins.severity]}`} />
                        <span className="text-sm font-medium text-white">{ins.title}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{ins.description}</p>
                      {ins.expected_uplift && (
                        <p className="text-xs text-zilla-neon mt-2 font-mono">{ins.expected_uplift}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </UserLayout>
    </>
  );
}
