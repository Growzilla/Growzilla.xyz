import React from 'react';
import Link from 'next/link';

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-zilla-black text-white">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-zilla-black/90 backdrop-blur-xl border-b border-zilla-neon/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/user" className="flex items-center gap-3 group">
              <span className="font-display text-xl font-bold tracking-tight">
                <span className="text-white group-hover:text-zilla-neon transition-colors duration-300">GROW</span>
                <span className="text-zilla-neon">ZILLA</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-zilla-neon/10 text-zilla-neon border border-zilla-neon/20">
                Dashboard
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/tools/brand-intelligence"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Brand Intel
              </Link>
              <span className="text-sm text-gray-500 px-3 py-1.5 rounded-lg bg-white/5 border border-gray-800/50 font-mono">
                demo-store
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
