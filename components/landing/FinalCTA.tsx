import React from 'react';
import LeadCaptureForm from './LeadCaptureForm';

const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          Ready to see which content actually converts?
        </h2>
        <p className="text-gray-400 mb-8">
          Enter your store URL and we&apos;ll get you set up.
        </p>
        <div className="max-w-2xl mx-auto">
          <LeadCaptureForm variant="compact" />
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
