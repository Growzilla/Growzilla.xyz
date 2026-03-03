import React, { useState } from 'react';
import Link from 'next/link';
import type { ShopDetails } from '@/types/admin';
import {
  BuildingStorefrontIcon,
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  EyeIcon,
  ArrowPathIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import MetaConnect from './MetaConnect';

interface MerchantCardProps {
  shop: ShopDetails;
  metaConnected?: boolean;
  metaAdAccount?: string;
  onMetaConnected?: (shopId: string, adAccountId: string, adAccountName: string) => void;
  onPreview?: (shop: ShopDetails) => void;
  onSync?: (shopId: string) => void;
}

const statusConfig = {
  active: { label: 'Connected', className: 'bg-zilla-neon/10 text-zilla-neon border-zilla-neon/30' },
  unreachable: { label: 'Unreachable', className: 'bg-zilla-danger/10 text-zilla-danger border-zilla-danger/30' },
  pending: { label: 'Pending', className: 'bg-zilla-gold/10 text-zilla-gold border-zilla-gold/30' },
};

const MerchantCard: React.FC<MerchantCardProps> = ({
  shop,
  metaConnected = false,
  metaAdAccount,
  onMetaConnected,
  onPreview,
  onSync,
}) => {
  const [syncing, setSyncing] = useState(false);
  const status = statusConfig[shop.status];
  const lastSynced = shop.last_synced
    ? new Date(shop.last_synced).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const handleSync = async () => {
    if (!shop.shop_id || syncing) return;
    setSyncing(true);
    try {
      onSync?.(shop.shop_id);
    } finally {
      setTimeout(() => setSyncing(false), 3000);
    }
  };

  return (
    <div className="card-zilla p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-zilla-neon/10 flex items-center justify-center flex-shrink-0">
            <BuildingStorefrontIcon className="w-5 h-5 text-zilla-neon" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate">
              {shop.label}
            </h3>
            <p className="text-xs text-gray-500 font-mono truncate">{shop.domain}</p>
          </div>
        </div>
        {shop.status === 'active' && (
          <Link
            href={`/admin/store/${encodeURIComponent(shop.domain)}`}
            className="text-gray-600 hover:text-zilla-neon transition-colors flex-shrink-0"
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Status row */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${status.className}`}>
          {shop.status === 'unreachable' && <ExclamationTriangleIcon className="w-3 h-3" />}
          {status.label}
        </span>

        {metaConnected ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border bg-zilla-electric/10 text-zilla-electric border-zilla-electric/30">
            <CheckBadgeIcon className="w-3 h-3" />
            Meta
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border bg-gray-800/50 text-gray-500 border-gray-700">
            No Meta
          </span>
        )}

        {lastSynced && (
          <span className="flex items-center gap-1 text-[11px] text-gray-500 ml-auto">
            <ClockIcon className="w-3 h-3" />
            {lastSynced}
          </span>
        )}
      </div>

      {/* Meta ad account info */}
      {metaConnected && metaAdAccount && (
        <div className="text-xs text-gray-500 font-mono mb-3 truncate">
          Ad: {metaAdAccount}
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2 pt-3 border-t border-gray-800">
        {shop.shop_id && !metaConnected && (
          <MetaConnect
            shopId={shop.shop_id}
            shopDomain={shop.domain}
            onConnected={(adId, adName) => onMetaConnected?.(shop.shop_id!, adId, adName)}
          />
        )}

        {shop.status === 'active' && onPreview && (
          <button
            onClick={() => onPreview(shop)}
            className="btn-zilla-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <EyeIcon className="w-3.5 h-3.5" />
            Preview
          </button>
        )}

        {shop.shop_id && (
          <button
            onClick={handleSync}
            disabled={syncing}
            className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 ml-auto disabled:opacity-50"
          >
            <ArrowPathIcon className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MerchantCard;
