import React, { useEffect, useState, useRef } from 'react';
import LeadCaptureForm from './LeadCaptureForm';

const TheOffer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      {/* Green glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-zilla-neon/6 blur-[200px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zilla-neon/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zilla-neon/20 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Install Growzilla Free.
          </h2>
          <p className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-zilla-neon">
            You don&apos;t pay until it works.
          </p>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Connect your Shopify store in 2 minutes. See your first attribution data today.
            Paid plans start when you&apos;re seeing value — not before.
          </p>
        </div>

        {/* Form */}
        <div
          className={`mt-10 max-w-md mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <LeadCaptureForm variant="hero" />
        </div>

        {/* Trust micro-copy */}
        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {['No credit card required', '2-minute setup', 'Cancel anytime'].map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-3.5 h-3.5 text-zilla-neon/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheOffer;
