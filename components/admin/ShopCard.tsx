import React from 'react';
import Link from 'next/link';
import type { ShopDetails } from '@/types/admin';
import {
  BuildingStorefrontIcon,
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface ShopCardProps {
  shop: ShopDetails;
}

const statusConfig = {
  active: { label: 'Connected', className: 'bg-zilla-neon/10 text-zilla-neon border-zilla-neon/30' },
  unreachable: { label: 'Unreachable', className: 'bg-zilla-danger/10 text-zilla-danger border-zilla-danger/30' },
  pending: { label: 'Pending', className: 'bg-zilla-gold/10 text-zilla-gold border-zilla-gold/30' },
};

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const status = statusConfig[shop.status];
  const lastSynced = shop.last_synced
    ? new Date(shop.last_synced).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const content = (
    <div className="card-zilla p-5 h-full flex flex-col cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zilla-neon/10 flex items-center justify-center">
            <BuildingStorefrontIcon className="w-5 h-5 text-zilla-neon" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-zilla-neon transition-colors truncate max-w-[180px]">
              {shop.label}
            </h3>
            <p className="text-xs text-gray-500 font-mono truncate max-w-[180px]">{shop.domain}</p>
          </div>
        </div>
        <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-600 group-hover:text-zilla-neon transition-colors flex-shrink-0" />
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${status.className}`}>
          {shop.status === 'unreachable' && <ExclamationTriangleIcon className="w-3 h-3" />}
          {status.label}
        </span>

        {lastSynced && (
          <span className="flex items-center gap-1 text-[11px] text-gray-500">
            <ClockIcon className="w-3 h-3" />
            {lastSynced}
          </span>
        )}
      </div>
    </div>
  );

  if (shop.status === 'active') {
    return (
      <Link href={`/admin/store/${encodeURIComponent(shop.domain)}`}>
        {content}
      </Link>
    );
  }

  return content;
};

export default ShopCard;
