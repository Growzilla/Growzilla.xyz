import React from 'react';

const logos = [
  { src: '/images/posthog_logo.png', alt: 'PostHog' },
  { src: '/images/stripe_logo.png', alt: 'Stripe' },
  { src: '/images/supabase_logo_try.png', alt: 'Supabase' },
  { src: '/images/vercel_logo.png', alt: 'Vercel' },
  { src: '/images/shopify_logo.png', alt: 'Shopify' },
  { src: '/images/openai_logo.png', alt: 'OpenAI' },
  { src: '/images/microsoft_logo.png', alt: 'Microsoft' },
  { src: '/images/Amazon_Web_Services_Logo.png', alt: 'AWS' },
  { src: '/images/clerky_logo.png', alt: 'Clerky' },
  { src: '/images/woo_logo.webp', alt: 'WooCommerce' },
  { src: '/images/amazon_logo.png', alt: 'Amazon' },
  { src: '/images/deepseek_logo.png', alt: 'DeepSeek' },
];

export const LogoMarquee: React.FC = () => {
  return (
    <div className="w-full py-6 sm:py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center text-xs uppercase tracking-wide text-gray-500 mb-3 sm:mb-4">Trusted by innovative teams</div>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-8 sm:gap-12 animate-[scroll_25.5s_linear_infinite] will-change-transform">
            {logos.concat(logos).map((logo, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center h-12 sm:h-14 px-3 sm:px-4 bg-white rounded-lg flex-shrink-0 shadow-sm relative overflow-hidden"
              >
                {/* White background layer to cover transparent areas */}
                <div className="absolute inset-0 bg-white rounded-lg"></div>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 sm:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition relative z-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

export default LogoMarquee;





