import React from 'react';

/** Ecom-scoped logos only */
const logos = [
  { src: '/images/shopify_logo.png', alt: 'Shopify', invert: false },
  { src: '/images/meta-logo.png', alt: 'Meta', invert: true },
  { src: '/images/TikTok_logo.svg', alt: 'TikTok', invert: true },
  { src: '/images/google_ads-logo.jpeg', alt: 'Google Ads', invert: true },
];

/** Placeholder expert faces — replace with real headshots */
const expertFaces = [
  { initials: 'TL', name: 'Tobi Lütke', image: '' },
  { initials: 'AB', name: 'Expert', image: '' },
  { initials: 'MC', name: 'Expert', image: '' },
  { initials: 'JK', name: 'Expert', image: '' },
  { initials: 'RL', name: 'Expert', image: '' },
  { initials: 'SP', name: 'Expert', image: '' },
  { initials: 'DW', name: 'Expert', image: '' },
  { initials: 'KN', name: 'Expert', image: '' },
];

const SocialProofBar: React.FC = () => {
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="w-full py-10 border-y border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Three-part layout */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          {/* Part 1: Logo Marquee */}
          <div className="w-full lg:max-w-[480px] flex-shrink-0">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-4 font-medium text-center lg:text-left">
              Works with your stack
            </p>
            <div
              className="relative overflow-hidden"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <div className="flex items-center gap-12 animate-[marquee-scroll_25s_linear_infinite] will-change-transform">
                {doubledLogos.map((logo, idx) => (
                  <div key={idx} className="flex-shrink-0 flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-7 sm:h-8 max-w-[120px] w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                      style={logo.invert ? { filter: 'invert(1) hue-rotate(180deg)' } : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-16 bg-gray-800" />

          {/* Part 2: Expert Faces */}
          <div className="flex flex-col items-center lg:items-start gap-3 flex-shrink-0">
            <div className="flex -space-x-2">
              {expertFaces.map((face, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-zilla-graphite border-2 border-zilla-black flex items-center justify-center overflow-hidden"
                  title={face.name}
                >
                  {face.image ? (
                    <img src={face.image} alt={face.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-gray-400 font-medium">{face.initials}</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Built on insights from <span className="text-gray-300 font-medium">100+ ecom operators</span>
            </p>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-16 bg-gray-800" />

          {/* Part 3: Trustpilot */}
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity flex-shrink-0 whitespace-nowrap">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00B67A" />
            </svg>
            <span className="text-xs text-gray-400">See us on <span className="text-gray-300">Trustpilot</span></span>
          </div>
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

export default SocialProofBar;
