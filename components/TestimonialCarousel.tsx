import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

/**
 * TestimonialCarousel - Elite merchant social proof with auto-rotation
 * Research: Testimonials near CTAs increase conversions 84-270%
 * Source: grafit.agency/blog/conversion-rate-optimization-best-practices
 *
 * Features quantifiable results to build credibility (Superhuman-inspired)
 */
export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      quote: "Growzilla found $340K in wasted spend Triple Whale completely missed. The ICP detection is game-changing.",
      author: "Sarah Chen",
      role: "CEO, 8-Figure DTC Beauty Brand",
      avatar: "SC",
      metric: "+340K recovered",
      metricColor: "text-zilla-shopify",
      rating: 5
    },
    {
      quote: "Installed in 90 seconds. Saw leaks within 5 minutes. Recovered $47K in first month. This isn't analytics—it's a revenue weapon.",
      author: "Marcus Thompson",
      role: "Founder, 7-Figure Shopify Store",
      avatar: "MT",
      metric: "+47K in month 1",
      metricColor: "text-zilla-electric",
      rating: 5
    },
    {
      quote: "Finally killed our mobile conversion gap. Went from 1.9% to 3.4% in 3 weeks. Growzilla's UX recommendations are surgical.",
      author: "Jessica Park",
      role: "CMO, Premium Fashion Brand",
      avatar: "JP",
      metric: "+79% mobile CVR",
      metricColor: "text-zilla-gold",
      rating: 5
    },
    {
      quote: "We were burning $8K/month on the wrong audience. ICP Archetype AI fixed it in one campaign. ROAS jumped from 2.1x to 4.7x.",
      author: "David Martinez",
      role: "Growth Lead, Health & Wellness",
      avatar: "DM",
      metric: "2.24x ROAS lift",
      metricColor: "text-zilla-danger",
      rating: 5
    }
  ];

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-24 overflow-hidden bg-zilla-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-zilla opacity-10" style={{ backgroundSize: '50px 50px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-zilla-radial opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Elite Merchants </span>
            <span className="text-transparent bg-clip-text bg-zilla-gradient">Choose Growzilla</span>
          </h2>
          <p className="text-lg text-gray-400">
            Join 180+ seven & eight-figure brands crushing it
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Testimonial card */}
              <div
                className="relative rounded-2xl p-10 md:p-12 border border-zilla-shopify/20 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                }}
              >
                {/* Star rating */}
                <div className="flex gap-1 mb-6 justify-center md:justify-start">
                  {[...Array(current.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-zilla-warning" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 text-center md:text-left">
                  "{current.quote}"
                </blockquote>

                {/* Author info */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-zilla-shopify to-zilla-acid flex items-center justify-center text-zilla-black font-bold text-lg">
                      {current.avatar}
                    </div>

                    {/* Name & role */}
                    <div>
                      <div className="text-white font-semibold text-lg">
                        {current.author}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {current.role}
                      </div>
                    </div>
                  </div>

                  {/* Metric badge */}
                  <div className="inline-flex px-6 py-3 rounded-xl bg-zilla-surface border border-zilla-shopify/30">
                    <span className={`text-xl font-bold ${current.metricColor}`}>
                      {current.metric}
                    </span>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-zilla-shopify/5 via-transparent to-transparent opacity-50 -z-10" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-lg bg-zilla-surface border border-zilla-muted hover:border-zilla-shopify/50 text-gray-400 hover:text-zilla-shopify transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-zilla-shopify w-8'
                      : 'bg-zilla-muted hover:bg-zilla-shopify/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 rounded-lg bg-zilla-surface border border-zilla-muted hover:border-zilla-shopify/50 text-gray-400 hover:text-zilla-shopify transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* "Powered by Growzilla" badge teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zilla-gold/10 border border-zilla-gold/30">
            <div className="w-2 h-2 rounded-full bg-zilla-gold animate-pulse" />
            <span className="text-sm text-zilla-gold font-semibold">
              Get Your "Powered by Growzilla" Badge
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Status signal for elite Shopify merchants
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
