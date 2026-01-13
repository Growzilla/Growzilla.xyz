import React, { useEffect } from 'react';

const CalendlyWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book a Free Strategy Call
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Let's review your store and identify quick conversion wins.
          </p>
        </div>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/albert-elmgart/ecommerce-ai-systems-review"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  );
};

export default CalendlyWidget;
