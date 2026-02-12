import React, { useState } from 'react';
import { useUserAuth } from '@/hooks/useUserAuth';
import { LockClosedIcon, BuildingStorefrontIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface UserLoginGateProps {
  children: (args: { email: string; logout: () => void }) => React.ReactNode;
}

const UserLoginGate: React.FC<UserLoginGateProps> = ({ children }) => {
  const { authenticated, loading, email, login, logout } = useUserAuth();
  const [formEmail, setFormEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-zilla-black flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
        <div className="w-6 h-6 border-2 border-zilla-neon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated && email) {
    return <>{children({ email, logout })}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim() || !password.trim() || submitting) return;

    setSubmitting(true);
    setError('');

    const result = await login(formEmail, password);
    if (!result.success) {
      setError(result.error || 'Invalid credentials');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zilla-black flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="card-zilla p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <span className="font-display text-2xl font-bold tracking-tight">
              <span className="text-white">GROW</span>
              <span className="text-zilla-neon">ZILLA</span>
            </span>
            <p className="mt-2 text-sm text-gray-500">Sign in to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="store" className="sr-only">Store domain</label>
              <div className="relative">
                <BuildingStorefrontIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="store"
                  type="text"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="your-store.myshopify.com"
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-zilla-danger">
                <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !formEmail.trim() || !password.trim()}
              className="w-full btn-zilla text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-zilla-black border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginGate;
