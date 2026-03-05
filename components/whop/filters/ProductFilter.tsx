'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { WhopProduct } from '@/types/whop';

interface ProductFilterProps {
  products: WhopProduct[];
  selectedProductId: string | null;
  onChange: (productId: string | null) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, selectedProductId, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = selectedProductId ? products.find((p) => p.id === selectedProductId) : null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border border-white/10 bg-zilla-surface hover:bg-white/5 transition-colors text-sm min-h-[44px]"
      >
        <span className="text-white font-medium">
          {selected ? selected.name : 'All Products'}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-[calc(100vw-3rem)] sm:w-64 max-w-64 rounded-xl border border-white/10 bg-zilla-dark/95 backdrop-blur-xl shadow-2xl shadow-black/40 z-50 overflow-hidden"
          >
            <button
              onClick={() => { onChange(null); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                !selectedProductId ? 'bg-zilla-neon/10 text-zilla-neon' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              All Products
            </button>
            <div className="h-px bg-white/5" />
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => { onChange(product.id); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  selectedProductId === product.id ? 'bg-zilla-neon/10 text-zilla-neon' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span>{product.name}</span>
                <span className="text-[10px] font-mono text-gray-500">{product.type}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilter;
