'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { UTMLink } from '@/types/smdashboard';

interface LinkCardProps {
  link: UTMLink;
  index: number;
}

function formatCurrency(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getPlatformEmoji(platform: string): string {
  const map: Record<string, string> = {
    instagram: '\u{1F4F7}',
    tiktok: '\u{1F3AC}',
    youtube: '\u25B6\uFE0F',
  };
  return map[platform] || '\u{1F517}';
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function truncateUrl(url: string, maxLen = 28): string {
  try {
    const parsed = new URL(url);
    const display = parsed.hostname + parsed.pathname;
    return display.length > maxLen ? display.slice(0, maxLen) + '\u2026' : display;
  } catch {
    return url.length > maxLen ? url.slice(0, maxLen) + '\u2026' : url;
  }
}

const LinkCard: React.FC<LinkCardProps> = ({ link, index }) => {
  const productLabel = link.product_url ? truncateUrl(link.product_url) : 'Store homepage';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="rounded-xl border border-white/10 bg-white/[0.02] p-3 hover:bg-white/5 transition-colors"
    >
      {/* Row 1: Platform + content type + status */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-white font-medium">
          {getPlatformEmoji(link.platform)}{' '}
          {capitalize(link.platform)} &middot; {capitalize(link.content_type)}
        </span>

        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
            link.status === 'active'
              ? 'text-[#00FF94] bg-[#00FF94]/10'
              : 'text-amber-400 bg-amber-400/10'
          }`}
        >
          {link.status}
        </span>
      </div>

      {/* Row 2: Product URL */}
      <p className="text-xs text-gray-500 truncate mb-0.5">
        {productLabel}
      </p>

      {/* Row 3: Date */}
      <p className="text-xs text-gray-500 mb-1.5">
        {formatDate(link.created_at)}
      </p>

      {/* Row 4: Revenue + orders */}
      <p className="text-sm font-mono mb-1">
        <span className={link.total_revenue > 0 ? 'text-[#00FF94]' : 'text-gray-500'}>
          {formatCurrency(link.total_revenue)} revenue
        </span>
        <span className="text-gray-500">
          {' '}&middot; {link.total_orders} order{link.total_orders !== 1 ? 's' : ''}
        </span>
      </p>

      {/* Row 5: Content post URL (optional) */}
      {link.content_post_url && (
        <a
          href={link.content_post_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors truncate block"
        >
          {'\u{1F517}'} {truncateUrl(link.content_post_url, 32)}
        </a>
      )}
    </motion.div>
  );
};

export default LinkCard;
