import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  BuildingStorefrontIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { login as apiLogin, getToken, getMe, setToken } from '@/lib/api-client';

export default function SignInPage() {
  const router = useRouter();
  const [domain, setDomain] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setChecking(false);
      return;
    }
    getMe()
      .then(() => {
        router.replace('/whop');
      })
      .catch(() => {
        setToken(null);
        setChecking(false);
      });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || !password.trim() || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      await apiLogin(domain.trim(), password);
      router.push('/whop');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      // Simplify API error messages for users
      if (msg.includes('401')) {
        setError('Invalid store domain or password');
      } else if (msg.includes('404')) {
        setError('Store not found. Contact your admin.');
      } else {
        setError(msg);
      }
      setSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-zilla-black flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
        <div className="w-6 h-6 border-2 border-zilla-neon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sign In | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-zilla-black flex items-center justify-center p-4">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="card-zilla p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <span className="font-display text-3xl font-bold tracking-tight">
                <span className="text-white">GROW</span>
                <span className="text-zilla-neon">ZILLA</span>
              </span>
              <p className="mt-2 text-sm text-gray-500">
                Sign in to your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Store domain */}
              <div>
                <label htmlFor="domain" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Store Domain
                </label>
                <div className="relative">
                  <BuildingStorefrontIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="domain"
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="yourstore.myshopify.com"
                    autoFocus
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-zilla-danger"
                >
                  <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !domain.trim() || !password.trim()}
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

            <p className="mt-6 text-center text-xs text-gray-600">
              Don&apos;t have an account? Contact your admin.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
