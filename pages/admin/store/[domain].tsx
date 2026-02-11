import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRightIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import LoginGate from '@/components/admin/LoginGate';
import AdminLayout from '@/components/admin/AdminLayout';
import KPICard from '@/components/admin/KPICard';
import RevenueChart from '@/components/admin/RevenueChart';
import PeriodToggle from '@/components/admin/PeriodToggle';
import TopProductsTable from '@/components/admin/TopProductsTable';
import InsightsFeed from '@/components/admin/InsightsFeed';
import SyncButton from '@/components/admin/SyncButton';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useInsights } from '@/hooks/useInsights';

export default function StoreDetailPage() {
  const router = useRouter();
  const domain = typeof router.query.domain === 'string' ? router.query.domain : undefined;

  return (
    <>
      <Head>
        <title>{domain ? `${domain} | Admin` : 'Store | Admin'} | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LoginGate>
        {(logout) => <StoreDetail domain={domain} onLogout={logout} />}
      </LoginGate>
    </>
  );
}

function StoreDetail({ domain, onLogout }: { domain: string | undefined; onLogout: () => void }) {
  const [period, setPeriod] = useState('30d');
  const { stats, revenueChart, topProducts, loading, refetch } = useDashboardData(domain, period);
  const { insights, filter, setFilter, dismiss, action, loading: insightsLoading } = useInsights(domain);

  const formatNumber = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
    return n.toFixed(0);
  };

  const formatCurrency = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
    return `$${n.toFixed(2)}`;
  };

  if (!domain) return null;

  return (
    <AdminLayout onLogout={onLogout}>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
        <Link href="/admin" className="hover:text-white transition-colors">
          Stores
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5" />
        <span className="text-white font-medium truncate max-w-[200px]">{domain}</span>
      </nav>

      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white truncate">
          {domain}
        </h1>
        <SyncButton domain={domain} onSyncComplete={refetch} />
      </div>

      {loading ? (
        <AdminLoadingSkeleton type="detail" />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* KPI Cards */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <KPICard
                label="Revenue"
                value={formatCurrency(stats.total_revenue)}
                delta={stats.revenue_change}
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
              />
              <KPICard
                label="Orders"
                value={formatNumber(stats.total_orders)}
                delta={stats.orders_change}
                icon={<ShoppingCartIcon className="w-5 h-5" />}
              />
              <KPICard
                label="AOV"
                value={formatCurrency(stats.average_order_value)}
                delta={stats.aov_change}
                icon={<UsersIcon className="w-5 h-5" />}
              />
            </div>
          )}

          {/* Revenue Chart */}
          <div className="card-zilla p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-white">Revenue</h2>
              <PeriodToggle value={period} onChange={setPeriod} />
            </div>
            <RevenueChart data={revenueChart?.data || []} />
          </div>

          {/* Bottom grid: Products + Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="card-zilla p-6">
              <h2 className="font-display text-lg font-semibold text-white mb-4">Top Products</h2>
              <TopProductsTable products={topProducts || []} />
            </div>

            {/* Insights */}
            <div className="card-zilla p-6">
              <h2 className="font-display text-lg font-semibold text-white mb-4">AI Insights</h2>
              <InsightsFeed
                insights={insights}
                filter={filter}
                onFilterChange={setFilter}
                onDismiss={dismiss}
                onAction={action}
                loading={insightsLoading}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AdminLayout>
  );
}
