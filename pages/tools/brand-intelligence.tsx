import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const LEAD_MAGNET_URL =
  process.env.NEXT_PUBLIC_LEADMAGNET_URL || 'http://localhost:3000';

export default function BrandIntelligencePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>Brand Intelligence Tool | Growzilla</title>
        <meta
          name="description"
          content="Free brand intelligence tool for creators. Enter your Instagram handle and get AI-powered product recommendations, audience insights, and market validation."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-zilla-black text-white">
        {/* Grid background */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-zilla-black/90 backdrop-blur-xl border-b border-zilla-neon/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3 group">
                <span className="font-display text-xl font-bold tracking-tight">
                  <span className="text-white group-hover:text-zilla-neon transition-colors duration-300">
                    GROW
                  </span>
                  <span className="text-zilla-neon">ZILLA</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-zilla-neon/10 text-zilla-neon border border-zilla-neon/20">
                  Brand Intel
                </span>
              </Link>

              <Link
                href="/#book-call"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zilla-neon border border-zilla-neon/30 rounded-lg hover:bg-zilla-neon/10 transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </header>

        {/* Loading state */}
        {!loaded && (
          <div className="relative z-10 flex items-center justify-center py-32">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-zilla-neon/30 border-t-zilla-neon rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Loading Brand Intelligence Tool...</p>
            </div>
          </div>
        )}

        {/* Iframe embed */}
        <iframe
          src={LEAD_MAGNET_URL}
          className={`relative z-10 w-full border-0 transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0 h-0'
          }`}
          style={loaded ? { height: 'calc(100vh - 64px)' } : {}}
          onLoad={() => setLoaded(true)}
          title="Brand Intelligence Tool"
          allow="clipboard-write"
        />
      </div>
    </>
  );
}
