import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const rows = [
  { feature: 'Price', wetracked: '$49/mo', growzilla: 'Mid-market', tripleWhale: '$549+/mo' },
  { feature: 'Sankey diagrams', wetracked: false, growzilla: true, tripleWhale: false },
  { feature: 'Creator attribution', wetracked: false, growzilla: 'First-class', tripleWhale: 'Basic' },
  { feature: 'Meta ads visualization', wetracked: false, growzilla: true, tripleWhale: true },
  { feature: 'Setup time', wetracked: 'Minutes', growzilla: 'Minutes', tripleWhale: 'Days/weeks' },
  { feature: 'Agency multi-merchant', wetracked: false, growzilla: true, tripleWhale: 'Enterprise only' },
];

function CellContent({ value }: { value: boolean | string }) {
  if (value === true) return <CheckIcon className="w-5 h-5 text-zilla-shopify mx-auto" />;
  if (value === false) return <XMarkIcon className="w-5 h-5 text-gray-600 mx-auto" />;
  return <span>{value}</span>;
}

export default function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-x-auto"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-4 px-4 text-gray-400 font-sans font-normal w-1/4" />
            <th className="py-4 px-4 text-gray-400 font-sans font-normal">wetracked</th>
            <th className="py-4 px-4 text-zilla-shopify font-display font-bold text-lg">
              Growzilla
            </th>
            <th className="py-4 px-4 text-gray-400 font-sans font-normal">Triple Whale</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.feature}
              className={`border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-zilla-surface/30' : ''}`}
            >
              <td className="py-4 px-4 text-gray-300 font-medium">{row.feature}</td>
              <td className="py-4 px-4 text-center text-gray-400">
                <CellContent value={row.wetracked} />
              </td>
              <td className="py-4 px-4 text-center text-white font-medium bg-zilla-neon/5">
                <CellContent value={row.growzilla} />
              </td>
              <td className="py-4 px-4 text-center text-gray-400">
                <CellContent value={row.tripleWhale} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
