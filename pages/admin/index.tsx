import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { ShopDetails } from '@/types/admin';
import LoginGate from '@/components/admin/LoginGate';
import AdminLayout from '@/components/admin/AdminLayout';
import ShopCard from '@/components/admin/ShopCard';
import AddShopModal from '@/components/admin/AddShopModal';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminLoadingSkeleton from '@/components/admin/AdminLoadingSkeleton';

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

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [shops, setShops] = useState<ShopDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

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

        {shops.length > 0 && (
          <button
            onClick={() => setModalOpen(true)}
            className="btn-zilla text-sm py-2 px-4 flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Add Store</span>
          </button>
        )}
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
              <ShopCard shop={shop} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <AddShopModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddShop}
      />
    </AdminLayout>
  );
}
