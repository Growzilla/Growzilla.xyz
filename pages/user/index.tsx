import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import UserLayout from '@/components/user/UserLayout';
import UserLoginGate from '@/components/user/UserLoginGate';
import UserLoadingSkeleton from '@/components/user/UserLoadingSkeleton';
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

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

function DashboardContent({ email, logout }: { email: string; logout: () => void }) {
  const { data, loading, error, refetch } = useUserDashboard('30d');

  const storeName = data?.shop?.name || data?.shop?.domain || email;
  const lastSynced = data?.shop?.last_synced
    ? new Date(data.shop.last_synced).toLocaleString()
    : null;

  // SVG chart dimensions
  const W = 700;
  const H = 250;
  const PAD = 40;

  const chartData = data?.chart?.data || [];
  const maxRev = chartData.length > 0 ? Math.max(...chartData.map((d) => d.revenue)) : 1;
  const points = chartData.map((d, i) => {
    const x = PAD + (i / Math.max(chartData.length - 1, 1)) * (W - PAD * 2);
    const y = H - PAD - (d.revenue / maxRev) * (H - PAD * 2);
    return { x, y, ...d };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = points.length > 0
    ? `${linePath} L${points[points.length - 1].x},${H - PAD} L${points[0].x},${H - PAD} Z`
    : '';

  const stats = data?.stats;
  const products = data?.products || [];
  const insights = data?.insights || [];

  const kpis = stats
    ? [
        { label: 'Revenue', value: formatCurrency(stats.total_revenue), delta: formatDelta(stats.revenue_change), up: stats.revenue_change >= 0 },
        { label: 'Orders', value: stats.total_orders.toLocaleString(), delta: formatDelta(stats.orders_change), up: stats.orders_change >= 0 },
        { label: 'AOV', value: `$${stats.average_order_value.toFixed(2)}`, delta: formatDelta(stats.aov_change), up: stats.aov_change >= 0 },
        { label: 'Customers', value: stats.total_customers.toLocaleString(), delta: formatDelta(stats.customers_change), up: stats.customers_change >= 0 },
      ]
    : [];

  return (
    <UserLayout storeName={storeName} onLogout={logout}>
      {loading ? (
        <UserLoadingSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-400" />
          <p className="text-gray-400 text-center max-w-md">{error}</p>
          <button onClick={refetch} className="btn-zilla text-sm flex items-center gap-2">
            <ArrowPathIcon className="w-4 h-4" />
            Retry
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Store info banner */}
          <div className="rounded-lg border border-zilla-neon/20 bg-zilla-neon/5 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-zilla-neon flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="text-zilla-neon font-medium">{storeName}</span>
                {lastSynced && <span className="text-gray-500 ml-2">Last synced: {lastSynced}</span>}
              </p>
            </div>
            <button
              onClick={refetch}
              className="text-gray-500 hover:text-white transition-colors p-1"
              title="Refresh data"
            >
              <ArrowPathIcon className="w-4 h-4" />
            </button>
          </div>

          {/* KPI Cards */}
          {kpis.length > 0 ? (
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
          ) : (
            <div className="card-zilla p-8 text-center">
              <p className="text-gray-500">No stats available yet. Data will appear after your store syncs.</p>
            </div>
          )}

          {/* Revenue Chart */}
          {chartData.length > 0 && (
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
                <path d={areaPath} fill="url(#chartGrad)" opacity={0.3} />
                <path d={linePath} fill="none" stroke="#00FF94" strokeWidth={2} />
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF94" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00FF94" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {/* Bottom grid: Products + Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="card-zilla p-6">
              <h3 className="text-sm font-medium text-white mb-4">Top Products</h3>
              {products.length > 0 ? (
                <div className="space-y-2">
                  {products.map((p: { product_id: string; rank: number; title: string; revenue: number; orders: number }) => (
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
              ) : (
                <p className="text-gray-500 text-sm">No product data available yet.</p>
              )}
            </div>

            {/* Insights */}
            <div className="card-zilla p-6">
              <h3 className="text-sm font-medium text-white mb-4">AI Insights</h3>
              {insights.length > 0 ? (
                <div className="space-y-3">
                  {insights.map((ins: { id: string; severity: string; title: string; description: string; expected_uplift?: string }) => (
                    <div
                      key={ins.id}
                      className={`rounded-lg border p-4 ${SEVERITY_COLORS[ins.severity] || SEVERITY_COLORS.low}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${SEVERITY_DOT[ins.severity] || SEVERITY_DOT.low}`} />
                        <span className="text-sm font-medium text-white">{ins.title}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{ins.description}</p>
                      {ins.expected_uplift && (
                        <p className="text-xs text-zilla-neon mt-2 font-mono">{ins.expected_uplift}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No insights generated yet.</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </UserLayout>
  );
}

export default function UserDashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <UserLoginGate>
        {({ email, logout }) => <DashboardContent email={email} logout={logout} />}
      </UserLoginGate>
    </>
  );
}
