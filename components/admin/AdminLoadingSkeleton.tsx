import React from 'react';

interface AdminLoadingSkeletonProps {
  type: 'grid' | 'detail';
}

const Shimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />
);

const AdminLoadingSkeleton: React.FC<AdminLoadingSkeletonProps> = ({ type }) => {
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-zilla p-5">
            <div className="flex items-center gap-3 mb-4">
              <Shimmer className="w-10 h-10 rounded-lg" />
              <div className="flex-1">
                <Shimmer className="h-4 w-24 mb-2" />
                <Shimmer className="h-3 w-32" />
              </div>
            </div>
            <Shimmer className="h-5 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-zilla p-5">
            <Shimmer className="h-3 w-16 mb-3" />
            <Shimmer className="h-8 w-28" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card-zilla p-6">
        <Shimmer className="h-4 w-32 mb-4" />
        <Shimmer className="h-[200px] w-full rounded-lg" />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-zilla p-6">
          <Shimmer className="h-4 w-24 mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Shimmer key={i} className="h-8 w-full mb-2" />
          ))}
        </div>
        <div className="card-zilla p-6">
          <Shimmer className="h-4 w-20 mb-4" />
          {[1, 2, 3].map((i) => (
            <Shimmer key={i} className="h-16 w-full mb-3" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLoadingSkeleton;
