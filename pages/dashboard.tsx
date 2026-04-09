import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  getShop,
  getDashboardStats,
  getRevenueChart,
  getTopProducts,
  getMe,
  getToken,
  type DashboardStats,
  type RevenueChartData,
  type ShopResponse,
} from '@/lib/api-client';
import { getActiveShop } from '@/components/whop/StoreSelector';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function fmtDelta(d: number) {
  const sign = d >= 0 ? '+' : '';
  return `${sign}${d.toFixed(1)}%`;
}

// ---------------------------------------------------------------------------
// Main Dashboard
// ---------------------------------------------------------------------------

export default function MerchantDashboard() {
  const router = useRouter();

  const [shop, setShop] = useState<ShopResponse | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chart, setChart] = useState<RevenueChartData | null>(null);
  const [products, setProducts] = useState<{ title: string; revenue: number; orders: number; rank: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [storeName, setStoreName] = useState('');
  const [goalRevenue, setGoalRevenue] = useState('');
  const [currentRevenue, setCurrentRevenue] = useState('');

  const loadGoals = useCallback((domain: string) => {
    try {
      const raw = localStorage.getItem(`gz_onboarding_${domain}_answers`);
      if (raw) {
        const answers = JSON.parse(raw);
        setGoalRevenue(answers.revenueGoal || '');
        setCurrentRevenue(answers.revenueNow || '');
      }
    } catch { /* ignore */ }
  }, []);

  const resolveShop = useCallback(async () => {
    const urlShop = router.query.shop as string | undefined;
    const activeShop = getActiveShop();
    const domain = urlShop || activeShop?.domain;

    if (!domain) {
      const token = getToken();
      if (token) {
        try {
          const me = await getMe();
          const d = me.org?.shop_domain;
          if (d) {
            const s = await getShop(d);
            setShop(s);
            setStoreName(d);
            loadGoals(d);
            return s;
          }
        } catch { /* fall through */ }
      }
      setError('No store connected. Go to /setup to connect your Shopify store.');
      setLoading(false);
      return null;
    }

    try {
      const s = await getShop(domain);
      setShop(s);
      setStoreName(domain);
      loadGoals(domain);
      return s;
    } catch {
      setError(`Store "${domain}" not found. Make sure Growzilla is installed.`);
      setLoading(false);
      return null;
    }
  }, [router.query.shop, loadGoals]);

  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      const s = await resolveShop();
      if (!s) return;
      try {
        const [statsRes, chartRes, productsRes] = await Promise.allSettled([
          getDashboardStats(s.id),
          getRevenueChart(s.id, '30d'),
          getTopProducts(s.id, 5),
        ]);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value);
        if (chartRes.status === 'fulfilled') setChart(chartRes.value);
        if (productsRes.status === 'fulfilled') {
          setProducts(
            (productsRes.value as { title: string; revenue: number; orders: number; rank: number }[]) || []
          );
        }
      } catch (err) {
        console.error('Dashboard data load error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, resolveShop]);

  // Chart
  const W = 700, H = 250, PAD = 40;
  const chartData = chart?.data || [];
  const maxRev = Math.max(...chartData.map(d => d.revenue), 1);
  const points = chartData.map((d, i) => ({
    x: PAD + (i / Math.max(chartData.length - 1, 1)) * (W - PAD * 2),
    y: H - PAD - (d.revenue / maxRev) * (H - PAD * 2),
    ...d,
  }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = points.length > 1
    ? `${linePath} L${points[points.length - 1].x},${H - PAD} L${points[0].x},${H - PAD} Z`
    : '';

  // Goal progress
  const GOAL_MAP: Record<string, number> = {
    '$0-5k': 5000, '$5k-25k': 25000, '$25k-100k': 100000, '$100k-500k': 500000, '$500k+': 1000000,
    'Just starting': 1000, '$1k-$10k': 10000, '$10k-$50k': 50000, '$50k-$100k': 100000, '$100k+': 500000,
  };
  const goalNum = GOAL_MAP[goalRevenue] || 0;
  const currentNum = stats ? stats.yesterday_revenue * 30 : (GOAL_MAP[currentRevenue] || 0);
  const goalPct = goalNum > 0 ? Math.min(Math.round((currentNum / goalNum) * 100), 100) : 0;

  const kpis = stats ? [
    { label: 'Revenue (yesterday)', value: fmt(stats.yesterday_revenue), delta: fmtDelta(stats.revenue_delta), up: stats.revenue_delta >= 0 },
    { label: 'Orders (yesterday)', value: String(stats.yesterday_orders), delta: fmtDelta(stats.orders_delta), up: stats.orders_delta >= 0 },
    { label: 'AOV', value: `$${stats.aov.toFixed(2)}`, delta: '', up: true },
    { label: '7-Day Avg Revenue', value: fmt(stats.week_avg_revenue), delta: '', up: true },
  ] : [];

  return (
    <>
      <Head>
        <title>{storeName ? `${storeName} | Growzilla` : 'Dashboard | Growzilla'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-zilla-black text-white">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

        <header className="sticky top-0 z-50 bg-zilla-black/90 backdrop-blur-xl border-b border-white/8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold tracking-tight">
                <span className="text-white">GROW</span><span className="text-zilla-neon">ZILLA</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {storeName && (
                <span className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-lg border border-white/8">
                  {storeName}
                </span>
              )}
              <button onClick={() => router.push('/signin')} className="text-xs text-gray-500 hover:text-white transition-colors">
                Switch store
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error ? (
            <div className="card-zilla p-8 text-center">
              <p className="text-gray-400">{error}</p>
              <button onClick={() => router.push('/setup')} className="mt-4 px-6 py-2 bg-zilla-neon text-zilla-black font-semibold rounded-lg text-sm">
                Connect Store
              </button>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="card-zilla p-6 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-1/3 mb-3" />
                  <div className="h-8 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
              {/* Store name + Goal */}
              <div className="card-zilla p-5">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-lg font-semibold text-white">{storeName}</h1>
                  {shop?.sync_status && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                      shop.sync_status === 'completed' ? 'bg-zilla-neon/10 text-zilla-neon' :
                      shop.sync_status === 'syncing' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-white/5 text-gray-500'
                    }`}>{shop.sync_status}</span>
                  )}
                </div>
                {goalNum > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Goal: {fmt(currentNum)}/mo &rarr; {fmt(goalNum)}/mo</span>
                      <span className="text-zilla-neon font-mono">{goalPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-zilla-neon rounded-full transition-all duration-700" style={{ width: `${goalPct}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* KPIs */}
              {kpis.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {kpis.map((kpi, i) => (
                    <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="card-zilla p-4">
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider">{kpi.label}</p>
                      <p className="text-xl font-bold text-white mt-1 font-mono">{kpi.value}</p>
                      {kpi.delta && <p className={`text-xs mt-1 ${kpi.up ? 'text-zilla-neon' : 'text-red-400'}`}>{kpi.delta}</p>}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Revenue Chart */}
              {chartData.length > 1 ? (
                <div className="card-zilla p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">Revenue Trend</h3>
                    <span className="text-xs text-gray-500 font-mono">Last 30 days</span>
                  </div>
                  <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
                    {[0, 0.25, 0.5, 0.75, 1].map(pct => {
                      const y = H - PAD - pct * (H - PAD * 2);
                      return (
                        <g key={pct}>
                          <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#1f2937" strokeWidth={0.5} />
                          <text x={PAD - 6} y={y + 4} textAnchor="end" fill="#6B7280" fontSize={10} fontFamily="monospace">{fmt(maxRev * pct)}</text>
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
              ) : (
                <div className="card-zilla p-6 text-center">
                  <p className="text-sm text-gray-500">Revenue chart will appear after your first orders sync.</p>
                </div>
              )}

              {/* Products + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-zilla p-6">
                  <h3 className="text-sm font-medium text-white mb-4">Top Products</h3>
                  {products.length > 0 ? (
                    <div className="space-y-2">
                      {products.map((p, i) => (
                        <div key={p.title + i} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-xs text-gray-600 font-mono w-5">{p.rank || i + 1}</span>
                            <span className="text-sm text-white truncate">{p.title}</span>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <span className="text-sm font-mono text-white">{fmt(p.revenue)}</span>
                            <span className="text-xs text-gray-500 ml-2">{p.orders} orders</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Products will appear after sync completes.</p>
                  )}
                </div>

                <div className="card-zilla p-6">
                  <h3 className="text-sm font-medium text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-zilla-neon/20 bg-zilla-neon/5 hover:bg-zilla-neon/10 transition-colors group">
                      <p className="text-sm font-medium text-white group-hover:text-zilla-neon transition-colors">Create Tracking Link</p>
                      <p className="text-xs text-gray-500 mt-0.5">Generate a ?gz= link for any product</p>
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-white/8 bg-white/3 hover:bg-white/5 transition-colors">
                      <p className="text-sm font-medium text-white">Add Your Socials</p>
                      <p className="text-xs text-gray-500 mt-0.5">Connect your marketing channels</p>
                    </button>
                    <div className="w-full text-left px-4 py-3 rounded-lg border border-white/5 bg-white/2 opacity-50 cursor-not-allowed">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-400">AI UGC Creator</p>
                          <p className="text-xs text-gray-600 mt-0.5">AI-powered content creation</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500 font-mono">SOON</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
}
