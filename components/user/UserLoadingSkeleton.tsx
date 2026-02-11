import React from 'react';

const Shimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />
);

const UserLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-zilla p-5">
            <Shimmer className="h-3 w-16 mb-3" />
            <Shimmer className="h-8 w-28 mb-2" />
            <Shimmer className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card-zilla p-6">
        <Shimmer className="h-4 w-32 mb-4" />
        <Shimmer className="h-[250px] w-full rounded-lg" />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-zilla p-6">
          <Shimmer className="h-4 w-24 mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Shimmer key={i} className="h-10 w-full mb-2" />
          ))}
        </div>
        <div className="card-zilla p-6">
          <Shimmer className="h-4 w-20 mb-4" />
          {[1, 2, 3].map((i) => (
            <Shimmer key={i} className="h-20 w-full mb-3" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserLoadingSkeleton;
