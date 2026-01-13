import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import GrowMyShopifyLogo from './GrowMyShopifyLogo';

type Theme = 'blue' | 'green';

interface LayoutProps {
  children: React.ReactNode;
  theme?: Theme;
}

const themeClasses: Record<Theme, { primary: string; accent: string; gradientFrom: string; gradientTo: string }> = {
  blue: {
    primary: 'text-blue-600',
    accent: 'bg-blue-600',
    gradientFrom: 'from-slate-50',
    gradientTo: 'to-white',
  },
  green: {
    primary: 'text-green-600',
    accent: 'bg-green-600',
    gradientFrom: 'from-green-50',
    gradientTo: 'to-emerald-50',
  },
};

const DISCORD_URL = 'https://discord.gg/dFgyfdW8';

export const Layout: React.FC<LayoutProps> = ({ children, theme = 'green' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const installButtonClass = theme === 'green'
    ? 'bg-green-600 hover:bg-green-700'
    : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <GrowMyShopifyLogo variant="horizontal" size="md" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">FAQ</a>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400">
                Join Community
              </a>
              <a
                href="#calendly"
                className={`inline-flex items-center px-5 py-2.5 ${installButtonClass} text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm`}
              >
                Book a Call
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>
                  Join Community
                </a>
                <a
                  href="#calendly"
                  className={`inline-flex items-center justify-center px-5 py-2.5 ${installButtonClass} text-white font-semibold rounded-lg transition-all duration-200 shadow-md text-sm`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Call
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="py-8 sm:py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <GrowMyShopifyLogo variant="horizontal" size="md" className="mb-4" />
              <p className="text-sm text-gray-400 mb-4">
                Expert growth strategies for Shopify brands. We help you scale revenue, increase conversions, and build a brand that lasts.
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                Join our community →
              </a>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/enterprise" className="text-sm text-gray-400 hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="mailto:hello@growmyshopifybrand.com" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400">© 2025 GrowMyShopify. All rights reserved.</p>
              </div>
              <div className="flex items-center gap-6">
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const useThemeClasses = (theme: Theme = 'blue') => themeClasses[theme];

export default Layout;
