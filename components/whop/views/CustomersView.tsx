'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { WhopCustomer, CohortRow } from '@/types/whop';
import KPIRow from '../cards/KPIRow';
import CustomerCard from '../cards/CustomerCard';
import CohortChart from '../charts/CohortChart';
import CustomerModal from '../modals/CustomerModal';
import { formatCurrency, formatNumber } from '@/lib/whop/transforms';

interface CustomersViewProps {
  customers: WhopCustomer[];
  cohorts: CohortRow[];
}

const CustomersView: React.FC<CustomersViewProps> = ({ customers, cohorts }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<WhopCustomer | null>(null);
  const [sortBy, setSortBy] = useState<'ltv' | 'recent' | 'risk'>('ltv');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'at_risk' | 'churned'>('all');

  const activeCount = customers.filter((c) => c.status === 'active').length;
  const atRiskCount = customers.filter((c) => c.status === 'at_risk').length;
  const churnedCount = customers.filter((c) => c.status === 'churned').length;
  const avgLTV = customers.length > 0
    ? customers.reduce((sum, c) => sum + c.ltv, 0) / customers.length
    : 0;
  const totalSpend = customers.reduce((sum, c) => sum + c.totalSpend, 0);

  const kpiCards = [
    { label: 'Total Customers', value: formatNumber(customers.length) },
    { label: 'Active', value: formatNumber(activeCount), up: true },
    { label: 'At Risk', value: formatNumber(atRiskCount) },
    { label: 'Avg LTV', value: formatCurrency(avgLTV) },
    { label: 'Total Spend', value: formatCurrency(totalSpend) },
  ];

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (filterStatus !== 'all') {
      result = result.filter((c) => c.status === filterStatus);
    }

    switch (sortBy) {
      case 'ltv':
        result.sort((a, b) => b.ltv - a.ltv);
        break;
      case 'recent':
        result.sort((a, b) => new Date(b.lastActivityDate).getTime() - new Date(a.lastActivityDate).getTime());
        break;
      case 'risk':
        const riskOrder = { high: 0, medium: 1, low: 2 };
        result.sort((a, b) => riskOrder[a.churnRisk] - riskOrder[b.churnRisk]);
        break;
    }

    return result;
  }, [customers, filterStatus, sortBy]);

  // LTV Distribution (simplified histogram)
  const ltvBuckets = useMemo(() => {
    if (customers.length === 0) return [];
    const maxLTV = Math.max(...customers.map((c) => c.ltv));
    const bucketSize = Math.ceil(maxLTV / 6);
    const buckets: { label: string; count: number }[] = [];

    for (let i = 0; i < 6; i++) {
      const min = i * bucketSize;
      const max = (i + 1) * bucketSize;
      const count = customers.filter((c) => c.ltv >= min && c.ltv < max).length;
      buckets.push({ label: `$${formatNumber(min)}–${formatNumber(max)}`, count });
    }
    return buckets;
  }, [customers]);

  const maxBucketCount = Math.max(...ltvBuckets.map((b) => b.count), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <KPIRow cards={kpiCards} />

      {/* LTV Distribution */}
      {ltvBuckets.length > 0 && (
        <div className="card-zilla p-6">
          <h3 className="text-sm font-medium text-white mb-4">LTV Distribution</h3>
          <div className="flex items-end gap-2 h-32">
            {ltvBuckets.map((bucket, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(bucket.count / maxBucketCount) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="w-full rounded-t-md bg-zilla-neon/30 border border-zilla-neon/20 min-h-[4px]"
                />
                <span className="text-[9px] text-gray-500 font-mono text-center leading-tight">
                  {bucket.label}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{bucket.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cohort Chart */}
      <CohortChart cohorts={cohorts} />

      {/* Filters + Sort */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {(['all', 'active', 'at_risk', 'churned'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                filterStatus === status
                  ? 'text-zilla-neon border-zilla-neon bg-zilla-neon/10'
                  : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              {status === 'all' ? 'All' : status === 'at_risk' ? 'At Risk' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-zilla-surface rounded-lg p-1 border border-white/5">
          {(['ltv', 'recent', 'risk'] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                sortBy === sort
                  ? 'bg-zilla-neon text-zilla-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {sort === 'ltv' ? 'LTV' : sort === 'recent' ? 'Recent' : 'Risk'}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.slice(0, 30).map((customer, i) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            index={i}
            onClick={() => setSelectedCustomer(customer)}
          />
        ))}
      </div>

      {filteredCustomers.length > 30 && (
        <p className="text-center text-sm text-gray-500">
          Showing 30 of {filteredCustomers.length} customers
        </p>
      )}

      {filteredCustomers.length === 0 && (
        <div className="card-zilla p-12 text-center">
          <p className="text-gray-400">No customers found</p>
        </div>
      )}

      <CustomerModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </motion.div>
  );
};

export default CustomersView;
