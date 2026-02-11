import React from 'react';

interface Logo {
  src: string;
  alt: string;
  /** Dark-content logo on transparent bg — invert to white for dark theme */
  invertForDark?: boolean;
  /** Override default height for logos with unusual aspect ratios */
  heightClass?: string;
}

const logos: Logo[] = [
  { src: '/images/shopify_logo.png', alt: 'Shopify' },
  { src: '/images/meta-logo.png', alt: 'Meta', invertForDark: true },
  { src: '/images/google_ads-logo.jpeg', alt: 'Google Ads', invertForDark: true },
  { src: '/images/stripe_logo.png', alt: 'Stripe' },
  { src: '/images/Klaviyo-logo.svg', alt: 'Klaviyo', invertForDark: true },
  { src: '/images/posthog_clean.png', alt: 'PostHog', invertForDark: true, heightClass: 'h-12 sm:h-14' },
  { src: '/images/TikTok_logo.svg', alt: 'TikTok', invertForDark: true },
  { src: '/images/google_analytics-logo.png', alt: 'Google Analytics', invertForDark: true },
];

export const LogoMarquee: React.FC = () => {
  const doubled = logos.concat(logos);

  return (
    <section className="w-full py-10 sm:py-14">
      <p className="text-center text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gray-500 mb-6 sm:mb-8 font-medium">
        Integrates With Your Stack
      </p>

      {/* Track with soft left/right edge fade */}
      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="flex items-center gap-12 sm:gap-16 animate-[marquee-scroll_35s_linear_infinite] will-change-transform">
          {doubled.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={`${logo.heightClass || 'h-8 sm:h-10'} max-w-[140px] sm:max-w-[180px] w-auto object-contain transition-opacity duration-300 opacity-70 hover:opacity-100`}
                style={
                  logo.invertForDark
                    ? { filter: 'invert(1) hue-rotate(180deg)' }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default LogoMarquee;
