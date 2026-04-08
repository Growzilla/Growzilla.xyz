'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LS_KEY = 'gz_active_shop';
const LS_SHOPS_KEY = 'gz_known_shops';

export interface ShopInfo {
  domain: string;
  name?: string;
  id?: string;
}

interface StoreSelectorProps {
  onShopChange?: (shop: ShopInfo) => void;
}

/** Read active shop from localStorage */
export function getActiveShop(): ShopInfo | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ShopInfo;
  } catch {
    return null;
  }
}

/** Set active shop in localStorage */
export function setActiveShop(shop: ShopInfo) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEY, JSON.stringify(shop));
  // Also add to known shops
  addKnownShop(shop);
}

/** Get all known shops */
function getKnownShops(): ShopInfo[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(LS_SHOPS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ShopInfo[];
  } catch {
    return [];
  }
}

/** Add a shop to known shops list */
export function addKnownShop(shop: ShopInfo) {
  if (typeof window === 'undefined') return;
  const shops = getKnownShops();
  const exists = shops.findIndex((s) => s.domain === shop.domain);
  if (exists >= 0) {
    shops[exists] = { ...shops[exists], ...shop };
  } else {
    shops.push(shop);
  }
  localStorage.setItem(LS_SHOPS_KEY, JSON.stringify(shops));
}

const StoreSelector: React.FC<StoreSelectorProps> = ({ onShopChange }) => {
  const [open, setOpen] = useState(false);
  const [activeShop, setActiveShopState] = useState<ShopInfo | null>(null);
  const [shops, setShops] = useState<ShopInfo[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setActiveShopState(getActiveShop());
    setShops(getKnownShops());
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleSelect = useCallback(
    (shop: ShopInfo) => {
      setActiveShop(shop);
      setActiveShopState(shop);
      setOpen(false);
      onShopChange?.(shop);
    },
    [onShopChange]
  );

  // Don't render if no active shop
  if (!activeShop) return null;

  const shortDomain = activeShop.domain.replace('.myshopify.com', '');
  const showSelector = shops.length > 1;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => showSelector && setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
          showSelector
            ? 'hover:bg-white/5 cursor-pointer'
            : 'cursor-default'
        }`}
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Store icon */}
        <div
          className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold"
          style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
        >
          {shortDomain.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-300 font-medium max-w-[140px] truncate">
          {activeShop.name || shortDomain}
        </span>
        {showSelector && (
          <svg
            className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && showSelector && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-1 w-56 rounded-lg overflow-hidden z-50"
            style={{
              backgroundColor: '#151518',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="p-1">
              <div className="px-2 py-1.5 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                Stores
              </div>
              {shops.map((shop) => {
                const short = shop.domain.replace('.myshopify.com', '');
                const isActive = shop.domain === activeShop.domain;
                return (
                  <button
                    key={shop.domain}
                    onClick={() => handleSelect(shop)}
                    className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition-colors duration-150 ${
                      isActive
                        ? 'bg-white/5 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{
                        backgroundColor: isActive ? '#00FF94' : 'rgba(255,255,255,0.08)',
                        color: isActive ? '#0A0A0B' : '#9CA3AF',
                      }}
                    >
                      {short.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate">{shop.name || short}</span>
                    {isActive && (
                      <svg className="w-3.5 h-3.5 ml-auto text-[#00FF94] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreSelector;
