import React, { useEffect } from 'react';

interface CalendlyBlockProps {
  theme?: 'blue' | 'green';
  url?: string;
}

export const CalendlyBlock: React.FC<CalendlyBlockProps> = ({ theme = 'blue', url }) => {
  const calendlyUrl = url || 'https://calendly.com/albert-elmgart/black-friday-ai-audit-unlock-hidden-conversions';
  const gradient = theme === 'green' ? 'from-green-50 to-emerald-50' : 'from-blue-50 to-indigo-50';

  useEffect(() => {
    // Load Calendly widget script if not already loaded
    if (!document.querySelector('script[src*="calendly.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="book" className={`py-12 md:py-20 bg-gradient-to-br ${gradient}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Book a 15‑minute install consult</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-2 px-2 sm:px-0">We'll review your stack and map the rollout. No fluff.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-2 sm:p-4 shadow-sm overflow-hidden">
          <div 
            className="calendly-inline-widget w-full" 
            data-url={calendlyUrl} 
            style={{ 
              minWidth: '100%', 
              height: '600px',
            }}
          ></div>
          <style jsx>{`
            .calendly-inline-widget {
              min-width: 100% !important;
            }
            @media (min-width: 640px) {
              .calendly-inline-widget {
                height: 700px !important;
              }
            }
            @media (max-width: 639px) {
              .calendly-inline-widget {
                height: 600px !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default CalendlyBlock;





