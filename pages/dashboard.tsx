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
  getUTMLinks,
  generateUTMLink,
  getShopProducts,
  patchUTMLink,
  syncStore,
  type DashboardStats,
  type RevenueChartData,
  type ShopResponse,
  type ShopProduct,
  type UTMLink,
  type UTMLinkGenerated,
} from '@/lib/api-client';
import { getActiveShop } from '@/components/whop/StoreSelector';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(n: number | null | undefined) {
  const v = n ?? 0;
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
}

function fmtDelta(d: number | null | undefined) {
  const v = d ?? 0;
  const sign = v >= 0 ? '+' : '';
  return `${sign}${v.toFixed(1)}%`;
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

  // UTM state
  const [utmLinks, setUtmLinks] = useState<UTMLink[]>([]);
  const [prevUtmRevenue, setPrevUtmRevenue] = useState<Record<string, number>>({});

  // Modal state — step-by-step link creation flow
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1=Product 2=Platform 3=ContentType 4=Creator 5=Hook 6=CTA 7=Generate 8=PostUrl
  const [modalProducts, setModalProducts] = useState<ShopProduct[]>([]);
  const [modalProductsLoading, setModalProductsLoading] = useState(false);
  const [modalSelectedProduct, setModalSelectedProduct] = useState<ShopProduct | null>(null);
  const [modalPlatform, setModalPlatform] = useState<'instagram' | 'tiktok' | 'youtube'>('instagram');
  const [modalContentType, setModalContentType] = useState('');
  const [modalCreator, setModalCreator] = useState('');
  const [modalHook, setModalHook] = useState('');
  const [modalHookCustom, setModalHookCustom] = useState('');
  const [modalCta, setModalCta] = useState('');
  const [modalCtaCustom, setModalCtaCustom] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalResult, setModalResult] = useState<UTMLinkGenerated | null>(null);
  const [modalPostUrl, setModalPostUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Toast state — enhanced notification card
  const [toast, setToast] = useState<{ amount: string; platform: string; contentType: string; product: string } | null>(null);

  // Sync state
  const [syncing, setSyncing] = useState(false);

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

  const loadUTMLinks = useCallback(async () => {
    try {
      const links = await getUTMLinks();
      setUtmLinks(prev => {
        // Build revenue map from previous state
        const prevMap: Record<string, number> = {};
        prev.forEach(l => { prevMap[l.id] = l.total_revenue; });
        // Check for new revenue
        links.forEach(l => {
          const prevRev = prevMap[l.id] ?? 0;
          if (l.total_revenue > prevRev && prevRev !== undefined) {
            const diff = l.total_revenue - prevRev;
            const platformLabel = l.platform.charAt(0).toUpperCase() + l.platform.slice(1);
            const productPath = l.product_url ? l.product_url.split('/products/').pop()?.split('?')[0]?.replace(/-/g, ' ') || 'product' : 'product';
            setToast({ amount: `$${diff.toFixed(2)}`, platform: platformLabel, contentType: l.content_type, product: productPath });
          }
        });
        setPrevUtmRevenue(prevMap);
        return links;
      });
    } catch { /* ignore — UTM links are non-critical */ }
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
        await loadUTMLinks();
      } catch (err) {
        console.error('Dashboard data load error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, resolveShop, loadUTMLinks]);

  // Auto-dismiss toast after 8 seconds
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 8000);
    return () => clearTimeout(t);
  }, [toast]);

  // Content type options per platform
  const PLATFORM_CONTENT_TYPES: Record<string, { id: string; label: string }[]> = {
    youtube: [{ id: 'video', label: 'Video' }, { id: 'short', label: 'Short' }, { id: 'reel', label: 'Reel' }, { id: 'live', label: 'Live' }],
    tiktok: [{ id: 'video', label: 'Video' }, { id: 'live', label: 'LIVE' }, { id: 'story', label: 'Story' }],
    instagram: [{ id: 'reel', label: 'Reel' }, { id: 'story', label: 'Story' }, { id: 'post', label: 'Post' }, { id: 'live', label: 'LIVE' }],
  };

  const HOOK_PRESETS = [
    'Watch what happens when...',
    'POV: You just discovered...',
    'I tried this for 30 days...',
    'The secret nobody talks about...',
    'This changed everything...',
  ];

  const CTA_PRESETS = [
    'Link in bio',
    'Shop now — link below',
    'Use my code for 10% off',
    'Tap to shop',
    'Comment LINK for the URL',
  ];

  // Modal handlers
  const openModal = async () => {
    setModalStep(1);
    setModalSelectedProduct(null);
    setModalPlatform('instagram');
    setModalContentType('');
    setModalCreator('');
    setModalHook('');
    setModalHookCustom('');
    setModalCta('');
    setModalCtaCustom('');
    setModalError('');
    setModalResult(null);
    setModalPostUrl('');
    setCopied(false);
    setShowModal(true);
    // Fetch products
    if (shop?.id) {
      setModalProductsLoading(true);
      try {
        const prods = await getShopProducts(shop.id);
        setModalProducts(prods);
      } catch {
        setModalProducts([]);
      } finally {
        setModalProductsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalResult(null);
    setModalError('');
  };

  const handleGenerateUTM = async () => {
    if (!modalSelectedProduct) {
      setModalError('Please select a product.');
      return;
    }
    const productUrl = `https://${shop?.domain || storeName}/products/${modalSelectedProduct.handle}`;
    const resolvedHook = modalHook === '__custom__' ? modalHookCustom : modalHook;
    const resolvedCta = modalCta === '__custom__' ? modalCtaCustom : modalCta;
    const hookIdx = modalHook === '__custom__' ? 99 : HOOK_PRESETS.indexOf(modalHook) + 1;
    const ctaIdx = modalCta === '__custom__' ? 99 : CTA_PRESETS.indexOf(modalCta) + 1;

    setModalLoading(true);
    setModalError('');
    try {
      const result = await generateUTMLink({
        platform: modalPlatform,
        content_type: modalContentType || 'reel',
        product_url: productUrl,
        hook_number: hookIdx > 0 ? hookIdx : 1,
        cta_number: ctaIdx > 0 ? ctaIdx : 1,
      });
      setModalResult(result);
      setModalStep(8);
      // Refresh UTM links list
      await loadUTMLinks();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to generate link.';
      if (msg.includes('401') || msg.includes('Unauthorized') || msg.includes('403')) {
        setModalError('Please sign in again to generate tracking links.');
      } else {
        setModalError(msg);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleSavePostUrl = async () => {
    if (modalResult && modalPostUrl.trim()) {
      try {
        await patchUTMLink(modalResult.id, { content_post_url: modalPostUrl.trim() });
      } catch { /* non-critical */ }
    }
    closeModal();
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Sync handler — triggers backend sync, waits, then reloads all data
  const handleSync = async () => {
    if (!shop?.id || syncing) return;
    setSyncing(true);
    try {
      await syncStore(shop.id);
      // Wait for sync to process orders + match UTM conversions
      await new Promise(r => setTimeout(r, 5000));
      // Reload all dashboard data
      const [statsRes, chartRes, productsRes] = await Promise.allSettled([
        getDashboardStats(shop.id),
        getRevenueChart(shop.id, '30d'),
        getTopProducts(shop.id, 5),
      ]);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      if (chartRes.status === 'fulfilled') setChart(chartRes.value);
      if (productsRes.status === 'fulfilled') {
        setProducts((productsRes.value as { title: string; revenue: number; orders: number; rank: number }[]) || []);
      }
      await loadUTMLinks();
    } catch { /* ignore */ } finally {
      setSyncing(false);
    }
  };

  // Platform display helpers
  const platformEmoji: Record<string, string> = {
    instagram: '📸',
    tiktok: '🎵',
    youtube: '▶️',
  };

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
  const currentNum = stats ? (stats.yesterdayRevenue ?? 0) * 30 : (GOAL_MAP[currentRevenue] || 0);
  const goalPct = goalNum > 0 ? Math.min(Math.round((currentNum / goalNum) * 100), 100) : 0;

  const kpis = stats ? [
    { label: 'Revenue (yesterday)', value: fmt(stats.yesterdayRevenue), delta: fmtDelta(stats.revenueDelta), up: (stats.revenueDelta ?? 0) >= 0 },
    { label: 'Orders (yesterday)', value: String(stats.yesterdayOrders ?? 0), delta: fmtDelta(stats.ordersDelta), up: (stats.ordersDelta ?? 0) >= 0 },
    { label: 'AOV', value: `$${(stats.yesterdayAov ?? 0).toFixed(2)}`, delta: '', up: true },
    { label: '7-Day Avg Revenue', value: fmt(stats.weekAvgRevenue), delta: '', up: true },
  ] : [];

  return (
    <>
      <Head>
        <title>{storeName ? `${storeName} | Growzilla` : 'Dashboard | Growzilla'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-zilla-black text-white">
        {/* Attribution Notification Card */}
        {toast && (
          <div
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[380px] rounded-xl border border-[#00FF94]/30 bg-[#0A0A0B] shadow-2xl shadow-[#00FF94]/10 overflow-hidden"
            style={{ animation: 'slideInFromTop 0.3s ease-out' }}
          >
            <div className="h-1 bg-[#00FF94]" />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎉</span>
                  <span className="text-[13px] font-semibold text-[#00FF94] uppercase tracking-wider">New Sale Attributed</span>
                </div>
                <button onClick={() => setToast(null)} className="text-gray-600 hover:text-white transition-colors text-xs">✕</button>
              </div>
              <div className="text-3xl font-bold text-white font-mono mb-3">{toast.amount}</div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Platform</span>
                  <span className="text-white font-medium">{toast.platform} {toast.contentType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Product</span>
                  <span className="text-white font-medium capitalize">{toast.product}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-gray-600">
                Attributed via Growzilla tracking link
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes slideInFromTop {
            from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        `}</style>

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
              <button
                onClick={handleSync}
                disabled={syncing}
                className="text-xs px-3 py-1.5 rounded-lg border border-[#00FF94]/20 bg-[#00FF94]/5 text-[#00FF94] hover:bg-[#00FF94]/10 transition-colors disabled:opacity-50 font-medium"
              >
                {syncing ? 'Syncing...' : 'Sync'}
              </button>
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
                  {shop?.syncStatus && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                      shop.syncStatus === 'completed' ? 'bg-zilla-neon/10 text-zilla-neon' :
                      shop.syncStatus === 'syncing' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-white/5 text-gray-500'
                    }`}>{shop.syncStatus}</span>
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

              {/* Tracked Links */}
              <div className="card-zilla p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-white">Tracked Links</h3>
                  <button onClick={openModal} className="text-xs text-zilla-neon hover:text-zilla-neon/80 transition-colors font-mono">+ New link</button>
                </div>
                {utmLinks.length > 0 ? (
                  <div className="space-y-1">
                    <div className="grid grid-cols-12 text-[11px] text-gray-600 uppercase tracking-wider px-3 pb-2 border-b border-white/5">
                      <span className="col-span-1">Platform</span>
                      <span className="col-span-4">Product URL</span>
                      <span className="col-span-2">Code</span>
                      <span className="col-span-2 text-right">Revenue</span>
                      <span className="col-span-2 text-right">Orders</span>
                      <span className="col-span-1 text-right">Clicks</span>
                    </div>
                    {utmLinks.map(link => (
                      <div key={link.id} className="grid grid-cols-12 items-center py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="col-span-1 text-base">{platformEmoji[link.platform] ?? '🔗'}</span>
                        <span className="col-span-4 text-xs text-gray-400 truncate pr-2" title={link.product_url}>
                          {link.product_url.replace(/^https?:\/\/[^/]+/, '')}
                        </span>
                        <span className="col-span-2 text-xs text-gray-500 font-mono">{link.short_code}</span>
                        <span className={`col-span-2 text-sm font-mono text-right ${link.total_revenue > 0 ? 'text-zilla-neon' : 'text-gray-600'}`}>
                          {fmt(link.total_revenue)}
                        </span>
                        <span className="col-span-2 text-xs text-gray-500 font-mono text-right">{link.total_orders}</span>
                        <span className="col-span-1 text-xs text-gray-600 font-mono text-right">{link.click_count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Create your first tracking link to start attributing revenue
                  </p>
                )}
              </div>

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
                    <button onClick={openModal} className="w-full text-left px-4 py-3 rounded-lg border border-zilla-neon/20 bg-zilla-neon/5 hover:bg-zilla-neon/10 transition-colors group">
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

      {/* Create Tracking Link Modal — Step-by-step flow */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative w-full max-w-lg max-h-[85vh] bg-[#151518] border border-white/[0.08] rounded-xl p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                {modalStep > 1 && modalStep < 8 && (
                  <button onClick={() => setModalStep(modalStep - 1)} className="text-gray-500 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                )}
                <h2 className="text-base font-semibold text-white">Create Tracking Link</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-gray-600 font-mono">{modalStep < 8 ? `${modalStep}/7` : 'Done'}</span>
                <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors text-lg leading-none">&#x2715;</button>
              </div>
            </div>

            {/* Step progress bar */}
            {modalStep < 8 && (
              <div className="flex gap-1 mb-5">
                {[1,2,3,4,5,6,7].map(s => (
                  <div key={s} className={`h-0.5 flex-1 rounded-full transition-colors ${s <= modalStep ? 'bg-[#00FF94]' : 'bg-white/[0.06]'}`} />
                ))}
              </div>
            )}

            {/* Error */}
            {modalError && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">{modalError}</p>
            )}

            {/* STEP 1: Product picker */}
            {modalStep === 1 && (
              <div className="space-y-3">
                <label className="text-[11px] text-gray-500 uppercase tracking-wider block">Select a Product</label>
                {modalProductsLoading ? (
                  <div className="flex items-center justify-center py-12 gap-2">
                    <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: '#00FF94', borderTopColor: 'transparent' }} />
                    <span className="text-sm text-gray-500">Loading products...</span>
                  </div>
                ) : modalProducts.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">No products found. Make sure your store is synced.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                    {modalProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => { setModalSelectedProduct(product); setModalStep(2); }}
                        className={`text-left rounded-lg p-3 transition-all border ${
                          modalSelectedProduct?.id === product.id
                            ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40'
                            : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.08]'
                        }`}
                      >
                        <div className="aspect-square rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-2 overflow-hidden">
                          {product.featured_image_url ? (
                            <img src={product.featured_image_url} alt={product.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl font-semibold text-gray-700">{product.title.charAt(0)}</span>
                          )}
                        </div>
                        <p className="text-[13px] text-white font-medium leading-tight truncate">{product.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[12px] text-white font-mono">
                            ${product.price_min % 1 === 0 ? product.price_min.toFixed(0) : product.price_min.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-gray-600 font-mono">{product.total_inventory} in stock</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Platform */}
            {modalStep === 2 && (
              <div className="space-y-3">
                <label className="text-[11px] text-gray-500 uppercase tracking-wider block">Choose Platform</label>
                <div className="space-y-2">
                  {([
                    { id: 'youtube' as const, label: 'YouTube', icon: '▶️' },
                    { id: 'tiktok' as const, label: 'TikTok', icon: '🎵' },
                    { id: 'instagram' as const, label: 'Instagram', icon: '📸' },
                  ]).map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setModalPlatform(p.id); setModalContentType(''); setModalStep(3); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left ${
                        modalPlatform === p.id
                          ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.08]'
                      }`}
                    >
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-sm font-medium text-white">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Content Type */}
            {modalStep === 3 && (
              <div className="space-y-3">
                <label className="text-[11px] text-gray-500 uppercase tracking-wider block">Content Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(PLATFORM_CONTENT_TYPES[modalPlatform] || []).map(ct => (
                    <button
                      key={ct.id}
                      onClick={() => { setModalContentType(ct.id); setModalStep(4); }}
                      className={`px-4 py-3 rounded-lg border transition-colors text-sm font-medium ${
                        modalContentType === ct.id
                          ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:bg-white/[0.04] hover:border-white/[0.08] hover:text-white'
                      }`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Creator Handle */}
            {modalStep === 4 && (
              <div className="space-y-3">
                <label className="text-[11px] text-gray-500 uppercase tracking-wider block">Creator Handle</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">@</span>
                  <input
                    type="text"
                    value={modalCreator}
                    onChange={e => setModalCreator(e.target.value.replace(/^@/, ''))}
                    placeholder="creator_handle"
                    autoFocus
                    className="w-full pl-8 pr-3 py-2.5 bg-[#0A0A0B] border border-white/[0.08] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94]/30 transition-colors font-mono"
                  />
                </div>
                <button
                  onClick={() => { if (modalCreator.trim()) setModalStep(5); }}
                  disabled={!modalCreator.trim()}
                  className="w-full py-2.5 rounded-lg bg-[#00FF94] text-[#0A0A0B] font-semibold text-sm hover:bg-[#00FF94]/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 5: Hook */}
            {modalStep === 5 && (
              <div className="space-y-3">
                <label className="text-[11px] text-gray-500 uppercase tracking-wider block">Choose a Hook</label>
                <div className="space-y-1.5">
                  {HOOK_PRESETS.map(h => (
                    <button
                      key={h}
                      onClick={() => { setModalHook(h); setModalStep(6); }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors text-sm ${
                        modalHook === h
                          ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                  {/* Custom option */}
                  <button
                    onClick={() => setModalHook('__custom__')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors text-sm ${
                      modalHook === '__custom__'
                        ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-gray-500 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    Custom...
                  </button>
                  {modalHook === '__custom__' && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={modalHookCustom}
                        onChange={e => setModalHookCustom(e.target.value)}
                        placeholder="Write your custom hook..."
                        autoFocus
                        className="w-full bg-[#0A0A0B] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94]/30 transition-colors"
                      />
                      <button
                        onClick={() => { if (modalHookCustom.trim()) setModalStep(6); }}
                        disabled={!modalHookCustom.trim()}
                        className="w-full py-2 rounded-lg bg-[#00FF94] text-[#0A0A0B] font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 6: CTA */}
            {modalStep === 6 && (
              <div className="space-y-3">
                <label className="text-[11px] text-gray-500 uppercase tracking-wider block">Choose a CTA</label>
                <div className="space-y-1.5">
                  {CTA_PRESETS.map(c => (
                    <button
                      key={c}
                      onClick={() => { setModalCta(c); setModalStep(7); }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors text-sm ${
                        modalCta === c
                          ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                  <button
                    onClick={() => setModalCta('__custom__')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors text-sm ${
                      modalCta === '__custom__'
                        ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-gray-500 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    Custom...
                  </button>
                  {modalCta === '__custom__' && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={modalCtaCustom}
                        onChange={e => setModalCtaCustom(e.target.value)}
                        placeholder="Write your custom CTA..."
                        autoFocus
                        className="w-full bg-[#0A0A0B] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94]/30 transition-colors"
                      />
                      <button
                        onClick={() => { if (modalCtaCustom.trim()) setModalStep(7); }}
                        disabled={!modalCtaCustom.trim()}
                        className="w-full py-2 rounded-lg bg-[#00FF94] text-[#0A0A0B] font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 7: Review & Generate */}
            {modalStep === 7 && (
              <div className="space-y-4">
                <label className="text-[11px] text-gray-500 uppercase tracking-wider block">Review & Generate</label>
                <div className="space-y-2 bg-[#0A0A0B] rounded-lg border border-white/[0.06] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">Product</span>
                    <span className="text-[13px] text-white truncate max-w-[260px]">{modalSelectedProduct?.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">Platform</span>
                    <span className="text-[13px] text-white capitalize">{modalPlatform}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">Content Type</span>
                    <span className="text-[13px] text-white capitalize">{modalContentType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">Creator</span>
                    <span className="text-[13px] text-white font-mono">@{modalCreator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">Hook</span>
                    <span className="text-[13px] text-white truncate max-w-[260px]">{modalHook === '__custom__' ? modalHookCustom : modalHook}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">CTA</span>
                    <span className="text-[13px] text-white truncate max-w-[260px]">{modalCta === '__custom__' ? modalCtaCustom : modalCta}</span>
                  </div>
                </div>
                <button
                  onClick={handleGenerateUTM}
                  disabled={modalLoading}
                  className="w-full py-2.5 rounded-lg bg-[#00FF94] text-[#0A0A0B] font-semibold text-sm hover:bg-[#00FF94]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {modalLoading ? 'Generating...' : 'Generate Tracking Link'}
                </button>
              </div>
            )}

            {/* STEP 8: Result + Post URL */}
            {modalStep === 8 && modalResult && (
              <div className="space-y-4">
                <div className="bg-[#0A0A0B] border border-[#00FF94]/20 rounded-lg p-4 space-y-3">
                  <p className="text-[11px] text-[#00FF94] uppercase tracking-wider font-mono">Link Generated</p>
                  <div className="flex items-center gap-2">
                    <span className="flex-1 text-xs text-gray-300 font-mono truncate">{modalResult.full_url}</span>
                    <button
                      onClick={() => handleCopy(modalResult.full_url)}
                      className="flex-shrink-0 text-xs px-3 py-1.5 rounded-md bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20 hover:bg-[#00FF94]/20 transition-colors font-mono"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 uppercase tracking-wider">
                    Published Post URL <span className="text-gray-600 normal-case">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={modalPostUrl}
                    onChange={e => setModalPostUrl(e.target.value)}
                    placeholder="https://tiktok.com/@creator/video/..."
                    className="w-full bg-[#0A0A0B] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF94]/30 transition-colors font-mono"
                  />
                  <p className="text-[10px] text-gray-600">Paste the URL of the published post to connect attribution data</p>
                </div>

                <button
                  onClick={handleSavePostUrl}
                  className="w-full py-2.5 rounded-lg border border-white/[0.08] text-gray-400 text-sm hover:text-white hover:border-white/[0.15] transition-colors"
                >
                  {modalPostUrl.trim() ? 'Save & Close' : 'Done'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
