import React from 'react';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  DocumentChartBarIcon,
  RocketLaunchIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const steps = [
  {
    icon: CalendarDaysIcon,
    number: '01',
    title: 'Schedule a Diagnostic Call',
    description: 'A focused 20-minute conversation where we listen. We learn about your brand, your current challenges, and what success looks like for you.',
    duration: '20 minutes',
    deliverable: 'Initial clarity on priorities',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: MagnifyingGlassIcon,
    number: '02',
    title: 'We Conduct a Deep Audit',
    description: 'Our team examines your traffic patterns, conversion flows, and customer journey using proprietary methods to identify exactly where revenue is being lost.',
    duration: '2-3 days',
    deliverable: 'Bottleneck identification report',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: DocumentChartBarIcon,
    number: '03',
    title: 'Receive Your Strategic Roadmap',
    description: 'A prioritized, data-backed action plan. Each recommendation is ranked by expected impact, so you know exactly what to focus on first.',
    duration: '1 week',
    deliverable: 'Prioritized action plan',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: RocketLaunchIcon,
    number: '04',
    title: 'Execute With Confidence',
    description: 'Implement independently with complete clarity, or engage us for ongoing optimization. Either way, you move forward knowing exactly what needs to happen.',
    duration: 'Ongoing',
    deliverable: 'Measurable revenue improvement',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-green-50 rounded-full blur-3xl -translate-y-1/2 opacity-50"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
            <CalendarDaysIcon className="w-4 h-4" />
            A Clear Path Forward
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            From Uncertainty to<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Strategic Clarity
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            A straightforward process designed to give you answers, not more questions.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 sm:space-y-0">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute left-8 top-28 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-transparent h-full"></div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start group">
                {/* Icon */}
                <div className="flex-shrink-0 relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8 sm:pb-12">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                    {/* Title row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 bg-gradient-to-r ${step.gradient} rounded-full text-xs font-medium text-white`}>
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Deliverable */}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="font-medium">You get: {step.deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
            <div className="text-center sm:text-left">
              <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                Ready to get started?
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                Schedule your diagnostic call. We will have initial insights within 48 hours.
              </p>
            </div>
            <a
              href="#calendly"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Schedule a Call
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
