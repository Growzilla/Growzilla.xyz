import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { ShopDetails } from '@/types/admin';
import LoginGate from '@/components/admin/LoginGate';
import AdminLayout from '@/components/admin/AdminLayout';
import MerchantCard from '@/components/admin/MerchantCard';
import MerchantLauncher from '@/components/admin/MerchantLauncher';
import MerchantPreview from '@/components/admin/MerchantPreview';
import AddShopModal from '@/components/admin/AddShopModal';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';
import DeckViews from '@/components/admin/DeckViews';

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Admin | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LoginGate>
        {(logout) => <AdminDashboard onLogout={logout} />}
      </LoginGate>
    </>
  );
}

// Track which shops have Meta connected
interface MetaStatus {
  [shopId: string]: { adAccountId: string; adAccountName: string };
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [shops, setShops] = useState<ShopDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [metaStatus, setMetaStatus] = useState<MetaStatus>({});
  const [previewShop, setPreviewShop] = useState<ShopDetails | null>(null);

  const fetchShops = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/shops');
      if (!res.ok) throw new Error('Failed to fetch shops');
      const json = await res.json();
      setShops(json.data || []);
    } catch {
      // Silently fail — user sees empty state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  const handleAddShop = async (domain: string, label: string) => {
    const res = await fetch('/api/admin/shops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, label }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to add shop');
    }

    await fetchShops();
  };

  const handleMetaConnected = (shopId: string, adAccountId: string, adAccountName: string) => {
    setMetaStatus((prev) => ({
      ...prev,
      [shopId]: { adAccountId, adAccountName },
    }));
  };

  const handleSync = async (shopId: string) => {
    try {
      await fetch(`/api/admin/shops/${shopId}/sync`, { method: 'POST' });
      // Refresh shop list after sync
      setTimeout(fetchShops, 2000);
    } catch {
      // Silently handle
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Stores</h1>
          <p className="text-sm text-gray-400 mt-1">
            {shops.length > 0
              ? `${shops.length} store${shops.length !== 1 ? 's' : ''} connected`
              : 'Manage your connected Shopify stores'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {shops.length > 0 && (
            <MerchantLauncher
              shops={shops.map((s) => ({ domain: s.domain, shop_id: s.shop_id, label: s.label }))}
              onSuccess={fetchShops}
            />
          )}

          {shops.length > 0 && (
            <button
              onClick={() => setModalOpen(true)}
              className="btn-zilla-outline text-sm py-2.5 px-4 flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Add Store</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <AdminLoadingSkeleton type="grid" />
      ) : shops.length === 0 ? (
        <AdminEmptyState onAddStore={() => setModalOpen(true)} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {shops.map((shop, i) => (
            <motion.div
              key={shop.domain}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <MerchantCard
                shop={shop}
                metaConnected={!!shop.shop_id && !!metaStatus[shop.shop_id]}
                metaAdAccount={shop.shop_id ? metaStatus[shop.shop_id]?.adAccountName : undefined}
                onMetaConnected={handleMetaConnected}
                onPreview={setPreviewShop}
                onSync={handleSync}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Deck Views Section */}
      <div className="mt-12 pt-8 border-t border-gray-800/50">
        <DeckViews />
      </div>

      <AddShopModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddShop}
      />

      {previewShop && (
        <MerchantPreview
          shop={previewShop}
          open={!!previewShop}
          onClose={() => setPreviewShop(null)}
        />
      )}
    </AdminLayout>
  );
}
