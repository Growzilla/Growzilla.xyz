'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BuildingStorefrontIcon,
  UserIcon,
  LockClosedIcon,
  SparklesIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { useSMAuth } from '@/hooks/useSMAuth';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Role = 'org_owner' | 'creator';

interface SMUser {
  id: string;
  name: string;
  username: string;
  role: Role;
  org_id: string;
  email: string | null;
}

interface SMOrg {
  id: string;
  name: string;
  slug: string;
  shop_domain: string;
}

interface SMLoginGateProps {
  children: (args: {
    user: SMUser;
    org: SMOrg;
    logout: () => void;
  }) => React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const SMLoginGate: React.FC<SMLoginGateProps> = ({ children }) => {
  const { authenticated, loading, user, org, login, logout } = useSMAuth();

  const [step, setStep] = useState<'role' | 'login'>('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [direction, setDirection] = useState(1);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  /* ---------- loading spinner ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-zilla-black flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
        <div className="w-6 h-6 border-2 border-zilla-neon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ---------- authenticated ---------- */
  if (authenticated && user && org) {
    return <>{children({ user, org, logout })}</>;
  }

  /* ---------- handlers ---------- */
  const handleContinue = () => {
    if (!selectedRole) return;
    setDirection(1);
    setStep('login');
  };

  const handleBack = () => {
    setDirection(-1);
    setStep('role');
    setIdentifier('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !identifier.trim() || !password.trim() || submitting) return;

    setSubmitting(true);
    setError('');

    const result = await login(selectedRole, identifier, password);
    if (!result.success) {
      setError(result.error || 'Invalid credentials');
      setSubmitting(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen bg-zilla-black flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-display text-2xl font-bold tracking-tight">
            <span className="text-white">GROW</span>
            <span className="text-zilla-neon">ZILLA</span>
          </span>
        </div>

        {/* Card shell */}
        <div className="card-zilla p-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 'role' ? (
              /* ===================== STATE 1: ROLE SELECTION ===================== */
              <motion.div
                key="role-selection"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-xl font-semibold text-white text-center mb-6">
                  How are you logging in?
                </h2>

                <motion.div
                  className="grid grid-cols-2 gap-4 mb-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Organization card */}
                  <motion.button
                    type="button"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole('org_owner')}
                    className={`
                      flex flex-col items-center gap-3 rounded-xl border p-6 text-center
                      transition-colors cursor-pointer
                      ${
                        selectedRole === 'org_owner'
                          ? 'border-zilla-neon/20 bg-zilla-neon/5'
                          : 'border-gray-700/50 bg-zilla-dark hover:border-gray-600'
                      }
                    `}
                  >
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        ${
                          selectedRole === 'org_owner'
                            ? 'bg-zilla-neon/10'
                            : 'bg-white/5'
                        }
                      `}
                    >
                      <BuildingStorefrontIcon
                        className={`w-6 h-6 ${
                          selectedRole === 'org_owner'
                            ? 'text-zilla-neon'
                            : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Organization</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Manage your brand &amp; creators
                      </p>
                    </div>
                  </motion.button>

                  {/* Creator card */}
                  <motion.button
                    type="button"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole('creator')}
                    className={`
                      flex flex-col items-center gap-3 rounded-xl border p-6 text-center
                      transition-colors cursor-pointer
                      ${
                        selectedRole === 'creator'
                          ? 'border-zilla-neon/20 bg-zilla-neon/5'
                          : 'border-gray-700/50 bg-zilla-dark hover:border-gray-600'
                      }
                    `}
                  >
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        ${
                          selectedRole === 'creator'
                            ? 'bg-zilla-neon/10'
                            : 'bg-white/5'
                        }
                      `}
                    >
                      <SparklesIcon
                        className={`w-6 h-6 ${
                          selectedRole === 'creator'
                            ? 'text-zilla-neon'
                            : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Creator</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Track your content revenue
                      </p>
                    </div>
                  </motion.button>
                </motion.div>

                {/* Continue button */}
                <button
                  type="button"
                  disabled={!selectedRole}
                  onClick={handleContinue}
                  className="w-full btn-zilla text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            ) : (
              /* ===================== STATE 2: LOGIN FORM ===================== */
              <motion.div
                key="login-form"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-xl font-semibold text-white text-center mb-6">
                  {selectedRole === 'org_owner'
                    ? 'Organization Login'
                    : 'Creator Login'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Identifier input */}
                  <div>
                    <label
                      htmlFor="sm-identifier"
                      className="sr-only"
                    >
                      {selectedRole === 'org_owner' ? 'Store domain' : 'Username'}
                    </label>
                    <div className="relative">
                      {selectedRole === 'org_owner' ? (
                        <BuildingStorefrontIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      ) : (
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      )}
                      <input
                        id="sm-identifier"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={
                          selectedRole === 'org_owner'
                            ? 'your-store.myshopify.com'
                            : 'your username'
                        }
                        autoFocus
                        className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div>
                    <label htmlFor="sm-password" className="sr-only">
                      Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        id="sm-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Error message */}
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

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting || !identifier.trim() || !password.trim()}
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

                {/* Back link */}
                <button
                  type="button"
                  onClick={handleBack}
                  className="mt-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mx-auto"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5" />
                  Back to role selection
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SMLoginGate;
