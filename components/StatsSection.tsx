import React from 'react';
import { ArrowTrendingUpIcon, UserGroupIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    icon: CurrencyDollarIcon,
    value: '$50M+',
    label: 'Revenue Unlocked',
    description: 'Recovered for clients',
  },
  {
    icon: UserGroupIcon,
    value: '200+',
    label: 'Brands Diagnosed',
    description: 'Across industries',
  },
  {
    icon: ArrowTrendingUpIcon,
    value: '35%',
    label: 'Avg. Conversion Lift',
    description: 'Post-implementation',
  },
  {
    icon: ClockIcon,
    value: '4.9/5',
    label: 'Client Satisfaction',
    description: 'From 150+ engagements',
  },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Results Speak Quietly
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Data from over 200 brand engagements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>

                {/* Value */}
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm sm:text-base font-semibold text-gray-700 mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs sm:text-sm text-gray-500">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
