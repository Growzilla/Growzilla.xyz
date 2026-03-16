import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CircleStackIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import LoginGate from '@/components/admin/LoginGate';
import AdminLayout from '@/components/admin/AdminLayout';

// ─── Types ────────────────────────────────────────────────────────────
interface Overview {
  total_shops: number;
  total_orders: number;
  total_products: number;
  total_users: number;
  total_organizations: number;
  total_revenue: number;
  total_utm_links: number;
  total_conversions: number;
  total_events: number;
  total_onboarding_profiles: number;
}

interface PaginatedData {
  items: Record<string, unknown>[];
  total: number;
  skip: number;
  limit: number;
}

type TabId = 'overview' | 'shops' | 'orders' | 'products' | 'users' | 'organizations' | 'events' | 'onboarding';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: CircleStackIcon },
  { id: 'shops', label: 'Shops', icon: BuildingStorefrontIcon },
  { id: 'orders', label: 'Orders', icon: ShoppingCartIcon },
  { id: 'products', label: 'Products', icon: CubeIcon },
  { id: 'users', label: 'Users', icon: UsersIcon },
  { id: 'organizations', label: 'Orgs', icon: BuildingOfficeIcon },
  { id: 'events', label: 'Events', icon: BoltIcon },
  { id: 'onboarding', label: 'Onboarding', icon: ClipboardDocumentCheckIcon },
];

// Column configs per tab
const TAB_COLUMNS: Record<string, { key: string; label: string; format?: 'currency' | 'date' | 'bool' | 'number' }[]> = {
  shops: [
    { key: 'domain', label: 'Domain' },
    { key: 'sync_status', label: 'Sync' },
    { key: 'order_count', label: 'Orders', format: 'number' },
    { key: 'product_count', label: 'Products', format: 'number' },
    { key: 'total_revenue', label: 'Revenue', format: 'currency' },
    { key: 'org_name', label: 'Organization' },
    { key: 'created_at', label: 'Created', format: 'date' },
  ],
  orders: [
    { key: 'name', label: 'Order' },
    { key: 'shop_domain', label: 'Shop' },
    { key: 'total_price', label: 'Total', format: 'currency' },
    { key: 'currency', label: 'Currency' },
    { key: 'financial_status', label: 'Status' },
    { key: 'fulfillment_status', label: 'Fulfillment' },
    { key: 'customer_email', label: 'Customer' },
    { key: 'line_item_count', label: 'Items', format: 'number' },
    { key: 'processed_at', label: 'Date', format: 'date' },
  ],
  products: [
    { key: 'title', label: 'Title' },
    { key: 'shop_domain', label: 'Shop' },
    { key: 'status', label: 'Status' },
    { key: 'product_type', label: 'Type' },
    { key: 'vendor', label: 'Vendor' },
    { key: 'total_inventory', label: 'Inventory', format: 'number' },
    { key: 'price_min', label: 'Min Price', format: 'currency' },
    { key: 'price_max', label: 'Max Price', format: 'currency' },
  ],
  users: [
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'org_name', label: 'Organization' },
    { key: 'created_at', label: 'Created', format: 'date' },
  ],
  organizations: [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    { key: 'shop_domain', label: 'Shop' },
    { key: 'user_count', label: 'Users', format: 'number' },
    { key: 'utm_link_count', label: 'UTM Links', format: 'number' },
    { key: 'created_at', label: 'Created', format: 'date' },
  ],
  events: [
    { key: 'event_name', label: 'Event' },
    { key: 'shop_id', label: 'Shop ID' },
    { key: 'step_number', label: 'Step', format: 'number' },
    { key: 'session_id', label: 'Session' },
    { key: 'created_at', label: 'Time', format: 'date' },
  ],
  onboarding: [
    { key: 'shop_domain', label: 'Shop' },
    { key: 'referral_source', label: 'Referral' },
    { key: 'goal', label: 'Goal' },
    { key: 'creator_workflow', label: 'Workflow' },
    { key: 'creator_count', label: 'Creators' },
    { key: 'last_completed_step', label: 'Step', format: 'number' },
    { key: 'onboarding_completed', label: 'Done', format: 'bool' },
    { key: 'created_at', label: 'Started', format: 'date' },
  ],
};

// ─── Formatters ───────────────────────────────────────────────────────
function formatCell(value: unknown, format?: string): string {
  if (value === null || value === undefined) return '-';
  if (format === 'currency') return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (format === 'date') {
    const d = new Date(String(value));
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  if (format === 'bool') return value ? 'Yes' : 'No';
  if (format === 'number') return Number(value).toLocaleString();
  return String(value);
}

// ─── Page ─────────────────────────────────────────────────────────────
export default function DatabasePage() {
  return (
    <>
      <Head>
        <title>Database Browser | Growzilla Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LoginGate>
        {(logout) => <DatabaseBrowser onLogout={logout} />}
      </LoginGate>
    </>
  );
}

function DatabaseBrowser({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [data, setData] = useState<PaginatedData | Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [shopFilter, setShopFilter] = useState('');
  const [eventFilter, setEventFilter] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const limit = 25;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ tab: activeTab });
      if (activeTab !== 'overview') {
        params.set('skip', String(page * limit));
        params.set('limit', String(limit));
      }
      if (search && ['shops', 'orders', 'products'].includes(activeTab)) {
        params.set('search', search);
      }
      if (shopFilter && ['orders', 'products'].includes(activeTab)) {
        params.set('shop_id', shopFilter);
      }
      if (eventFilter && activeTab === 'events') {
        params.set('event_name', eventFilter);
      }
      const res = await fetch(`/api/admin/database?${params}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError((err as Error).message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [activeTab, page, search, shopFilter, eventFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset page on tab change
  useEffect(() => {
    setPage(0);
    setSearch('');
    setShopFilter('');
    setEventFilter('');
    setExpandedRow(null);
  }, [activeTab]);

  const paginatedData = data && 'items' in (data as unknown as Record<string, unknown>) ? data as PaginatedData : null;
  const overviewData = activeTab === 'overview' && data ? data as Overview : null;

  return (
    <AdminLayout onLogout={onLogout}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CircleStackIcon className="w-6 h-6 text-zilla-neon" />
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Database Browser</h1>
            <p className="text-sm text-gray-400 mt-0.5">View all data across your stores</p>
          </div>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === id
                ? 'bg-zilla-neon/10 text-zilla-neon border border-zilla-neon/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {activeTab === 'overview' ? (
            <OverviewPanel data={overviewData} loading={loading} />
          ) : (
            <>
              {/* Search + Filters */}
              <div className="flex flex-wrap gap-3 mb-4">
                {['shops', 'orders', 'products'].includes(activeTab) && (
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                      placeholder={`Search ${activeTab}...`}
                      className="w-full pl-10 pr-4 py-2 bg-[#0F0F12] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/40 transition-colors"
                    />
                  </div>
                )}
                {paginatedData && (
                  <div className="flex items-center text-sm text-gray-500">
                    {paginatedData.total.toLocaleString()} total
                  </div>
                )}
              </div>

              {/* Data Table */}
              <DataTable
                tab={activeTab}
                data={paginatedData}
                loading={loading}
                expandedRow={expandedRow}
                onExpandRow={setExpandedRow}
              />

              {/* Pagination */}
              {paginatedData && paginatedData.total > limit && (
                <Pagination
                  page={page}
                  limit={limit}
                  total={paginatedData.total}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </AdminLayout>
  );
}

// ─── Overview Panel ───────────────────────────────────────────────────
function OverviewPanel({ data, loading }: { data: Overview | null; loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-24 bg-[#0F0F12] rounded-lg border border-gray-800/50 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    { label: 'Shops', value: data.total_shops, icon: BuildingStorefrontIcon, color: 'text-emerald-400' },
    { label: 'Orders', value: data.total_orders, icon: ShoppingCartIcon, color: 'text-blue-400' },
    { label: 'Products', value: data.total_products, icon: CubeIcon, color: 'text-purple-400' },
    { label: 'Revenue', value: `$${data.total_revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: ShoppingCartIcon, color: 'text-zilla-neon' },
    { label: 'Users', value: data.total_users, icon: UsersIcon, color: 'text-orange-400' },
    { label: 'Organizations', value: data.total_organizations, icon: BuildingOfficeIcon, color: 'text-pink-400' },
    { label: 'UTM Links', value: data.total_utm_links, icon: BoltIcon, color: 'text-cyan-400' },
    { label: 'Conversions', value: data.total_conversions, icon: ClipboardDocumentCheckIcon, color: 'text-yellow-400' },
    { label: 'Events', value: data.total_events, icon: BoltIcon, color: 'text-indigo-400' },
    { label: 'Onboarding', value: data.total_onboarding_profiles, icon: ClipboardDocumentCheckIcon, color: 'text-teal-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-[#0F0F12] rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Data Table ───────────────────────────────────────────────────────
function DataTable({
  tab,
  data,
  loading,
  expandedRow,
  onExpandRow,
}: {
  tab: TabId;
  data: PaginatedData | null;
  loading: boolean;
  expandedRow: string | null;
  onExpandRow: (id: string | null) => void;
}) {
  const columns = TAB_COLUMNS[tab] || [];

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-12 bg-[#0F0F12] rounded-lg border border-gray-800/50 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <CircleStackIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="text-sm">No {tab} found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#0A0A0D]">
            <th className="w-8 px-3 py-3" />
            {columns.map((col) => (
              <th key={col.key} className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/30">
          {data.items.map((item, idx) => {
            const rowId = String(item.id || idx);
            const isExpanded = expandedRow === rowId;
            return (
              <React.Fragment key={rowId}>
                <tr
                  className="bg-[#0F0F12] hover:bg-[#141418] cursor-pointer transition-colors"
                  onClick={() => onExpandRow(isExpanded ? null : rowId)}
                >
                  <td className="px-3 py-2.5">
                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-2.5 text-gray-300 whitespace-nowrap max-w-[200px] truncate">
                      {col.key === 'financial_status' || col.key === 'sync_status' || col.key === 'status' || col.key === 'role' ? (
                        <StatusBadge value={String(item[col.key] ?? '-')} />
                      ) : col.format === 'bool' ? (
                        <span className={item[col.key] ? 'text-zilla-neon' : 'text-gray-600'}>
                          {item[col.key] ? 'Yes' : 'No'}
                        </span>
                      ) : (
                        formatCell(item[col.key], col.format)
                      )}
                    </td>
                  ))}
                </tr>
                {isExpanded && (
                  <tr className="bg-[#0B0B0E]">
                    <td colSpan={columns.length + 1} className="px-6 py-4">
                      <ExpandedDetail item={item} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────
function StatusBadge({ value }: { value: string }) {
  const colors: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    fulfilled: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    org_owner: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    refunded: 'bg-red-500/10 text-red-400 border-red-500/20',
    creator: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    draft: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    archived: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };

  const colorClass = colors[value.toLowerCase()] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${colorClass}`}>
      {value}
    </span>
  );
}

// ─── Expanded Detail ──────────────────────────────────────────────────
function ExpandedDetail({ item }: { item: Record<string, unknown> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Object.entries(item).map(([key, value]) => {
        // Skip displaying sensitive or overly long data inline
        if (key === 'access_token_encrypted' || key === 'password_hash') return null;
        const displayValue = typeof value === 'object' && value !== null
          ? JSON.stringify(value, null, 2).slice(0, 200)
          : String(value ?? '-');

        return (
          <div key={key} className="min-w-0">
            <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5 font-mono">{key}</div>
            <div className="text-xs text-gray-300 truncate font-mono" title={displayValue}>{displayValue}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────
function Pagination({
  page,
  limit,
  total,
  onPageChange,
}: {
  page: number;
  limit: number;
  total: number;
  onPageChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / limit);
  const from = page * limit + 1;
  const to = Math.min((page + 1) * limit, total);

  return (
    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
      <span>
        {from}-{to} of {total.toLocaleString()}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="p-1.5 rounded hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <span className="text-gray-400 font-mono text-xs">
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="p-1.5 rounded hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
