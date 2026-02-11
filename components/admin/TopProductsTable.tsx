import React from 'react';
import type { TopProduct } from '@/types/admin';

interface TopProductsTableProps {
  products: TopProduct[];
}

const TopProductsTable: React.FC<TopProductsTableProps> = ({ products }) => {
  if (!products.length) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No product data available
      </div>
    );
  }

  const formatCurrency = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 text-xs uppercase tracking-wider">
            <th className="pb-3 pr-4 font-medium">#</th>
            <th className="pb-3 pr-4 font-medium">Product</th>
            <th className="pb-3 pr-4 font-medium text-right">Revenue</th>
            <th className="pb-3 pr-4 font-medium text-right">Orders</th>
            <th className="pb-3 font-medium text-right">Avg Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {products.map((product) => (
            <tr key={product.product_id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="py-3 pr-4 font-mono text-gray-500 text-xs">{product.rank}</td>
              <td className="py-3 pr-4">
                <span className="text-white font-medium truncate block max-w-[240px]">
                  {product.title}
                </span>
              </td>
              <td className="py-3 pr-4 text-right font-mono text-zilla-neon">
                {formatCurrency(product.revenue)}
              </td>
              <td className="py-3 pr-4 text-right font-mono text-gray-300">
                {product.orders.toLocaleString()}
              </td>
              <td className="py-3 text-right font-mono text-gray-400">
                {formatCurrency(product.average_price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;
