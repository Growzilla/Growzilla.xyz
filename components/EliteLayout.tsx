import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EliteLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#community', label: 'Community' },
  { href: '#team', label: 'Team' },
  { href: '/apply', label: 'Apply' },
  { href: '#contact', label: 'Contact' },
];

export const EliteLayout: React.FC<EliteLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-zilla-black text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />

      {/* Radial gradient overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-zilla-black/95 backdrop-blur-xl border-b border-zilla-neon/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span className="font-display text-2xl font-bold tracking-tight">
                <span className="text-white group-hover:text-zilla-neon transition-colors duration-300">GROW</span>
                <span className="text-zilla-neon">ZILLA</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-zilla-neon group-hover:w-full transition-all duration-300" />
                </a>
              ))}

              <div className="w-px h-6 bg-gray-700 mx-4" />

              <a
                href="#book-call"
                onClick={(e) => handleNavClick(e, '#book-call')}
                className="btn-zilla text-sm"
              >
                Book Review Call
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-zilla-neon hover:bg-zilla-charcoal/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? 'max-h-[32rem] pb-6' : 'max-h-0'
            }`}
          >
            <div className="flex flex-col gap-1 pt-4 border-t border-zilla-neon/10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 text-base font-medium text-gray-300 hover:text-zilla-neon hover:bg-zilla-charcoal/30 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-gray-800 my-2" />
              <a
                href="#book-call"
                onClick={(e) => handleNavClick(e, '#book-call')}
                className="btn-zilla text-center mt-2"
              >
                Book Review Call
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <footer id="contact" className="relative py-20 bg-zilla-black border-t border-gray-800/50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Logo and Description */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-block">
                <span className="font-display text-3xl font-bold tracking-tight">
                  <span className="text-white">GROW</span>
                  <span className="text-zilla-neon">ZILLA</span>
                </span>
              </Link>
              <p className="mt-6 text-gray-400 leading-relaxed max-w-md">
                The exclusive community where experienced ecommerce builders plug into AI systems
                to achieve exponential scaling. Your transformer moment awaits.
              </p>
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-2">General Inquiries</p>
                <a
                  href="mailto:contact@growzilla.xyz"
                  className="text-zilla-neon hover:text-zilla-acid transition-colors font-medium"
                >
                  contact@growzilla.xyz
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-6">
                Navigate
              </h3>
              <ul className="space-y-4">
                {navLinks.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Links */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-6">
                Community
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="/apply"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Apply to Join
                  </a>
                </li>
                <li>
                  <a
                    href="#book-call"
                    onClick={(e) => handleNavClick(e, '#book-call')}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Book a Call
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    onClick={(e) => handleNavClick(e, '#how-it-works')}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="md:col-span-3">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:contact@growzilla.xyz"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2026 Growzilla. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
                Limited spots for visionary builders
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EliteLayout;
