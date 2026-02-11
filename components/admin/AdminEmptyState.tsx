import React from 'react';
import { BuildingStorefrontIcon, PlusIcon } from '@heroicons/react/24/outline';

interface AdminEmptyStateProps {
  onAddStore: () => void;
}

const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({ onAddStore }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-zilla-neon/10 border border-zilla-neon/20 flex items-center justify-center mb-6">
        <BuildingStorefrontIcon className="w-8 h-8 text-zilla-neon" />
      </div>

      <h2 className="font-display text-2xl font-bold text-white mb-2">
        No stores connected
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        Add your first Shopify store to start viewing real-time analytics, AI insights, and revenue data.
      </p>

      <button onClick={onAddStore} className="btn-zilla text-sm flex items-center gap-2">
        <PlusIcon className="w-4 h-4" />
        Add Your First Store
      </button>
    </div>
  );
};

export default AdminEmptyState;
