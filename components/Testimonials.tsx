import React from 'react';
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    quote: "They showed us exactly where customers were dropping off at checkout. We had no idea. Once we fixed those friction points, our revenue went from $45K to $78K per month within weeks.",
    author: "Sarah Mitchell",
    role: "Founder, Luxe Activewear",
    revenue: "$45K to $78K/mo",
    avatar: "SM",
    gradient: "from-green-400 to-emerald-500",
    verified: true,
  },
  {
    quote: "For the first time, someone gave us a clear diagnosis instead of generic advice. They identified the bottlenecks we had been missing for months. We crossed $100K in month three.",
    author: "James Kim",
    role: "CEO, NaturalWell Supplements",
    revenue: "Hit $100K/mo",
    avatar: "JK",
    gradient: "from-blue-400 to-indigo-500",
    verified: true,
  },
  {
    quote: "The diagnostic call alone gave us three insights we implemented the same day. Our conversion rate went from 1.2% to 3.8%. That kind of clarity is rare.",
    author: "Michelle Torres",
    role: "Founder, CozyHome Decor",
    revenue: "3.2x conversion lift",
    avatar: "MT",
    gradient: "from-purple-400 to-pink-500",
    verified: true,
  },
];

const featuredResult = {
  quote: "We had been stuck at $50K per month for over a year. They diagnosed the problem in our first week together: invisible drop-offs in our funnel we never knew existed. Within 90 days, we crossed $200K. The clarity alone was worth everything.",
  author: "David Chen",
  role: "Founder & CEO, TechGear Pro",
  revenue: "$50K to $200K/mo",
  avatar: "DC",
  gradient: "from-amber-400 to-orange-500",
  verified: true,
  metrics: [
    { label: "Revenue Growth", value: "4x" },
    { label: "Time to Results", value: "90 days" },
    { label: "Bottlenecks Found", value: "7" },
  ]
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full text-amber-700 text-sm font-medium mb-4">
            <StarIcon className="w-4 h-4 text-amber-500" />
            4.9/5 from 150+ Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Brands That Found<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Their Missing Revenue
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            What happens when you stop guessing and start seeing clearly.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="mb-10 sm:mb-14">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Quote */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                &ldquo;{featuredResult.quote}&rdquo;
              </blockquote>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-6 max-w-md">
                {featuredResult.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-400">{metric.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${featuredResult.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {featuredResult.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-lg">{featuredResult.author}</span>
                    {featuredResult.verified && (
                      <CheckBadgeIcon className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <div className="text-gray-400 text-sm">{featuredResult.role}</div>
                  <div className="text-green-400 text-sm font-medium">{featuredResult.revenue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Result badge */}
              <div className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${testimonial.gradient} rounded-full mb-4`}>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {testimonial.revenue}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">{testimonial.author}</span>
                    {testimonial.verified && (
                      <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="text-gray-500 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Ready to discover what you have been missing?
          </p>
          <a
            href="#calendly"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5"
          >
            Request Your Diagnostic
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
