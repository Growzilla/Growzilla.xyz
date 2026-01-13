import React from 'react';
import {
  ArrowTrendingUpIcon,
  BoltIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

const benefits = [
  {
    icon: CurrencyDollarIcon,
    title: 'Identify Revenue Leaks',
    description: 'We pinpoint exactly where customers drop off and why. Most brands are losing 20-40% of potential revenue to invisible friction.',
    stats: 'Avg. $50K+ recovered',
    features: ['Checkout friction analysis', 'Drop-off point mapping', 'Funnel bottleneck diagnosis'],
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: BoltIcon,
    title: 'Remove Conversion Blockers',
    description: 'Your visitors want to buy. Something is stopping them. We find and eliminate the barriers between interest and purchase.',
    stats: '35% avg. lift',
    features: ['Friction point removal', 'Trust architecture', 'Decision flow optimization'],
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: UserGroupIcon,
    title: 'Strengthen Customer Retention',
    description: 'Acquiring new customers is expensive. We help you maximize the value of every relationship you have already built.',
    stats: '2.5x LTV improvement',
    features: ['Retention diagnostics', 'Re-engagement strategy', 'Loyalty pathway design'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: ChartBarIcon,
    title: 'Gain Strategic Clarity',
    description: 'Stop guessing what to fix next. Get a prioritized roadmap based on data, not hunches.',
    stats: 'Results in 60 days',
    features: ['Priority-ranked action plan', 'Data-backed recommendations', 'Clear execution sequence'],
    gradient: 'from-amber-500 to-orange-600',
  },
];

const BenefitsGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
            <SparklesIcon className="w-4 h-4" />
            Our Diagnostic Approach
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            We Find What Others Miss.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Then We Fix It.
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Revenue leaks hide in plain sight. Our proprietary methods surface them&mdash;and our recommendations eliminate them.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-500 overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon and stats row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`px-3 py-1.5 bg-gradient-to-r ${benefit.gradient} rounded-full`}>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {benefit.stats}
                    </span>
                  </div>
                </div>

                {/* Title and description */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-base text-gray-600 mb-5 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Feature list */}
                <div className="space-y-2">
                  {benefit.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0`}>
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Ready to see where your revenue is hiding?
          </p>
          <a
            href="#calendly"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5"
          >
            Request Your Diagnostic
            <ArrowTrendingUpIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
