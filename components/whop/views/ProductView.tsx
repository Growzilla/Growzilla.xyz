'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { WhopProduct } from '@/types/whop';
import KPIRow from '../cards/KPIRow';
import ProductCard from '../cards/ProductCard';
import { formatCurrency, formatNumber } from '@/lib/whop/transforms';

interface ProductViewProps {
  products: WhopProduct[];
}

const ProductView: React.FC<ProductViewProps> = ({ products }) => {
  const totalRevenue = products.reduce((sum, p) => sum + p.totalRevenue, 0);
  const totalMRR = products.reduce((sum, p) => sum + p.mrr, 0);
  const totalSubscribers = products.reduce((sum, p) => sum + p.activeSubscribers, 0);
  const avgChurn = products.length > 0
    ? products.reduce((sum, p) => sum + p.churnRate, 0) / products.length
    : 0;

  const kpiCards = [
    { label: 'Total Revenue', value: formatCurrency(totalRevenue) },
    { label: 'Total MRR', value: formatCurrency(totalMRR) },
    { label: 'Active Subscribers', value: formatNumber(totalSubscribers) },
    { label: 'Avg Churn', value: `${avgChurn.toFixed(1)}%`, up: avgChurn < 5 },
    { label: 'Products', value: products.length.toString() },
  ];

  const sortedProducts = [...products].sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Revenue comparison chart data
  const maxRevenue = Math.max(...products.map((p) => p.totalRevenue), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <KPIRow cards={kpiCards} />

      {/* Revenue Comparison */}
      {products.length > 1 && (
        <div className="card-zilla p-6">
          <h3 className="text-sm font-medium text-white mb-4">Product Comparison</h3>
          <div className="space-y-3">
            {sortedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4"
              >
                <div className="w-32 sm:w-40 text-right flex-shrink-0">
                  <p className="text-sm text-white font-medium truncate">{product.name}</p>
                </div>
                <div className="flex-1">
                  <div className="h-8 bg-white/[0.02] rounded-lg overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(product.totalRevenue / maxRevenue) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="h-full rounded-lg bg-zilla-neon/20 border-r-2 border-zilla-neon/40 flex items-center px-3"
                    >
                      <span className="text-xs font-mono font-medium text-white whitespace-nowrap">
                        {formatCurrency(product.totalRevenue)}
                      </span>
                    </motion.div>
                  </div>
                </div>
                <div className="w-16 text-right flex-shrink-0">
                  <span className={`text-xs font-mono ${product.churnRate > 10 ? 'text-red-400' : 'text-gray-400'}`}>
                    {product.churnRate.toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            ))}
            <div className="flex items-center gap-4 text-[10px] text-gray-500 pt-2">
              <div className="w-32 sm:w-40" />
              <div className="flex-1 text-center font-mono">Revenue</div>
              <div className="w-16 text-right font-mono">Churn</div>
            </div>
          </div>
        </div>
      )}

      {/* Product Cards */}
      <div>
        <h3 className="text-sm font-medium text-white mb-3">All Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {products.length === 0 && (
        <div className="card-zilla p-12 text-center">
          <p className="text-gray-400 mb-2">No products found</p>
          <p className="text-sm text-gray-600">
            Connect your Whop account to see product and membership data.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ProductView;
