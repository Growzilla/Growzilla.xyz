'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { WhopProduct } from '@/types/whop';
import { formatCurrency, formatNumber } from '@/lib/whop/transforms';

interface ProductCardProps {
  product: WhopProduct;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const typeColors: Record<string, string> = {
    membership: 'text-blue-400 bg-blue-400/10',
    coaching: 'text-purple-400 bg-purple-400/10',
    course: 'text-amber-400 bg-amber-400/10',
    one_time: 'text-gray-400 bg-gray-400/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="card-zilla p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-medium text-white">{product.name}</h4>
          <span className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColors[product.type] || typeColors.membership}`}>
            {product.type}
          </span>
        </div>
        <div className="text-right">
          <p className="text-lg font-mono font-bold text-zilla-neon">{formatCurrency(product.totalRevenue)}</p>
          <p className="text-[10px] text-gray-500">total revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'MRR', value: formatCurrency(product.mrr) },
          { label: 'Subscribers', value: formatNumber(product.activeSubscribers) },
          { label: 'Price', value: `$${product.price}${product.billingPeriod === 'monthly' ? '/mo' : product.billingPeriod === 'yearly' ? '/yr' : ''}` },
          { label: 'Churn', value: `${product.churnRate.toFixed(1)}%`, highlight: product.churnRate > 10 },
        ].map((metric) => (
          <div key={metric.label}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{metric.label}</p>
            <p className={`text-sm font-mono font-medium mt-0.5 ${
              'highlight' in metric && metric.highlight ? 'text-red-400' : 'text-white'
            }`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCard;
