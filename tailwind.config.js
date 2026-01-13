/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Growzilla Core Palette - Shopify Green + Radioactive Power
        // Electric green (#00FF94) = Godzilla atomic breath + Shopify brand DNA
        zilla: {
          // Dark Dominance (Premium Luxury Base)
          black: '#0A0A0B',        // Near-black luxury depth
          dark: '#111111',
          surface: '#151518',      // Elevated panels
          charcoal: '#1A1A1A',
          graphite: '#242424',
          muted: '#2D2D30',        // Glassmorphism layers
          'muted-light': '#3A3A3D',

          // Electric Green (Shopify DNA + Atomic Power)
          shopify: '#00FF94',      // PRIMARY: Shopify reference + Godzilla atomic breath
          neon: '#00FF94',         // Alias for consistency
          glow: '#00E676',         // Softer glow variant
          acid: '#39FF14',         // Intense radioactive highlight
          mint: '#00D9AA',         // Muted success state
          dim: '#00994D',

          // Power Accents
          danger: '#FF3366',       // Neon pink/red for aggressive CTAs
          electric: '#00D9FF',     // Electric blue for metrics
          gold: '#FFB84D',         // Premium status badges
          toxic: '#ADFF2F',
          plasma: '#7FFF00',
          warning: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'stomp': 'stomp 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'leak-drip': 'leak-drip 2s ease-in infinite',
        'energy-pulse': 'energy-pulse 1.5s ease-in-out infinite',
        'counter-spin': 'counter-spin 20s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
        'border-flow': 'border-flow 3s linear infinite',
        'particle-rise': 'particle-rise 3s ease-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 255, 102, 0.3), 0 0 40px rgba(0, 255, 102, 0.1)',
            borderColor: 'rgba(0, 255, 102, 0.5)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 255, 102, 0.5), 0 0 80px rgba(0, 255, 102, 0.2)',
            borderColor: 'rgba(0, 255, 102, 0.8)'
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'stomp': {
          '0%': { transform: 'translateY(-100px) scale(1.2)', opacity: '0' },
          '60%': { transform: 'translateY(10px) scale(0.95)' },
          '80%': { transform: 'translateY(-5px) scale(1.02)' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'leak-drip': {
          '0%': { transform: 'translateY(-10px)', opacity: '1' },
          '100%': { transform: 'translateY(100px)', opacity: '0' },
        },
        'energy-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'counter-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'border-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'particle-rise': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(0)', opacity: '0' },
        },
      },
      backgroundImage: {
        'zilla-gradient': 'linear-gradient(135deg, #00FF94 0%, #00E676 50%, #39FF14 100%)',
        'zilla-dark-gradient': 'linear-gradient(180deg, #0A0A0B 0%, #111111 50%, #1A1A1A 100%)',
        'zilla-radial': 'radial-gradient(circle at center, rgba(0, 255, 148, 0.12) 0%, transparent 70%)',
        'zilla-radial-intense': 'radial-gradient(ellipse at center, rgba(0, 255, 148, 0.15) 0%, transparent 60%)',
        'grid-pattern': 'linear-gradient(rgba(0, 255, 148, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 148, 0.03) 1px, transparent 1px)',
        'grid-zilla': 'linear-gradient(rgba(0, 255, 148, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 148, 0.04) 1px, transparent 1px)',
        'glassmorphism': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 148, 0.3) 50%, transparent 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      boxShadow: {
        'zilla-glow': '0 0 30px rgba(0, 255, 148, 0.3), 0 0 60px rgba(0, 255, 148, 0.1)',
        'zilla-glow-lg': '0 0 50px rgba(0, 255, 148, 0.4), 0 0 100px rgba(0, 255, 148, 0.2)',
        'zilla-glow-xl': '0 0 80px rgba(0, 255, 148, 0.5), 0 0 150px rgba(0, 255, 148, 0.3)',
        'inner-glow': 'inset 0 0 30px rgba(0, 255, 148, 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      dropShadow: {
        'zilla': '0 0 20px rgba(0, 255, 148, 0.5)',
        'zilla-lg': '0 0 40px rgba(0, 255, 148, 0.6)',
      },
      backdropBlur: {
        'glass': '12px',
        'glass-sm': '8px',
        'glass-lg': '16px',
      },
    },
  },
  plugins: [],
}
