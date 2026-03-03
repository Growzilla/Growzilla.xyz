import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RocketLaunchIcon,
  BuildingStorefrontIcon,
  LockClosedIcon,
  UserIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface MerchantLauncherProps {
  /** List of known shop_ids and domains from the shop registry */
  shops: { domain: string; shop_id?: string; label: string }[];
  onSuccess?: () => void;
}

type LaunchStep = 'form' | 'creating' | 'syncing' | 'done' | 'error';

const API_BASE = process.env.NEXT_PUBLIC_ECOMDASH_API_URL || process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';

function getAdminKey(): string {
  // Admin key is first 16 chars of SECRET_KEY, passed via admin console
  // In practice, this is set as an env var or comes from the admin session
  return process.env.NEXT_PUBLIC_ADMIN_KEY || '';
}

const MerchantLauncher: React.FC<MerchantLauncherProps> = ({ shops, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<LaunchStep>('form');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ org_slug: string; owner_username: string } | null>(null);

  // Form fields
  const [selectedShopId, setSelectedShopId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgSlug, setOrgSlug] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');

  const reset = () => {
    setStep('form');
    setError('');
    setResult(null);
    setSelectedShopId('');
    setOrgName('');
    setOrgSlug('');
    setOwnerName('');
    setOwnerEmail('');
    setOwnerPassword('');
  };

  const handleOrgNameChange = (name: string) => {
    setOrgName(name);
    // Auto-generate slug from name
    setOrgSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShopId || !orgName || !ownerName || !ownerEmail || !ownerPassword) return;

    setStep('creating');
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/shops/${selectedShopId}/bootstrap-org`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': getAdminKey(),
        },
        body: JSON.stringify({
          org_name: orgName,
          org_slug: orgSlug || orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          owner_name: ownerName,
          owner_email: ownerEmail,
          owner_password: ownerPassword,
          admin_key: getAdminKey(),
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => 'Unknown error');
        throw new Error(`API ${res.status}: ${text}`);
      }

      const data = await res.json();
      setResult({ org_slug: data.org_slug, owner_username: data.owner_username });

      // Trigger initial sync
      setStep('syncing');
      try {
        await fetch(`${API_BASE}/api/shops/${selectedShopId}/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Key': getAdminKey(),
          },
        });
      } catch {
        // Sync failure is non-critical
      }

      setStep('done');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create merchant account');
      setStep('error');
    }
  };

  const shopsWithIds = shops.filter((s) => s.shop_id);

  return (
    <>
      <button
        onClick={() => { reset(); setOpen(true); }}
        className="btn-zilla text-sm py-2.5 px-5 flex items-center gap-2"
      >
        <RocketLaunchIcon className="w-4 h-4" />
        Launch Merchant
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="card-zilla p-6 w-full max-w-lg relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <h2 className="font-display text-xl font-bold text-white mb-1">
                Launch Merchant
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Create a merchant account for an existing shop
              </p>

              {/* Form */}
              {(step === 'form' || step === 'error') && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Shop selector */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Select Shop
                    </label>
                    <div className="relative">
                      <BuildingStorefrontIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        value={selectedShopId}
                        onChange={(e) => setSelectedShopId(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors appearance-none"
                      >
                        <option value="">Choose a connected shop...</option>
                        {shopsWithIds.map((s) => (
                          <option key={s.shop_id} value={s.shop_id}>
                            {s.label} ({s.domain})
                          </option>
                        ))}
                      </select>
                    </div>
                    {shopsWithIds.length === 0 && (
                      <p className="text-xs text-zilla-gold mt-1">
                        No shops with IDs found. Add and sync a shop first.
                      </p>
                    )}
                  </div>

                  {/* Organization name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => handleOrgNameChange(e.target.value)}
                      placeholder="Acme Supplements"
                      required
                      className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                    />
                    {orgSlug && (
                      <p className="text-xs text-gray-500 mt-1">Slug: {orgSlug}</p>
                    )}
                  </div>

                  {/* Owner name + email (side by side) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">
                        Owner Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          placeholder="John Smith"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">
                        Owner Email
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          value={ownerEmail}
                          onChange={(e) => setOwnerEmail(e.target.value)}
                          placeholder="john@acme.com"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Merchant Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={ownerPassword}
                        onChange={(e) => setOwnerPassword(e.target.value)}
                        placeholder="Set their login password"
                        required
                        minLength={8}
                        className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Shown in plaintext — you&apos;ll share this with the merchant
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-zilla-danger">
                      <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedShopId || !orgName || !ownerName || !ownerEmail || !ownerPassword}
                    className="w-full btn-zilla text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Merchant Account
                  </button>
                </form>
              )}

              {/* Creating state */}
              {step === 'creating' && (
                <div className="py-12 text-center">
                  <div className="w-8 h-8 border-2 border-zilla-neon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">Creating merchant account...</p>
                  <p className="text-sm text-gray-500 mt-1">Setting up organization and owner</p>
                </div>
              )}

              {/* Syncing state */}
              {step === 'syncing' && (
                <div className="py-12 text-center">
                  <div className="w-8 h-8 border-2 border-zilla-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">Syncing shop data...</p>
                  <p className="text-sm text-gray-500 mt-1">Pulling latest orders and products</p>
                </div>
              )}

              {/* Done */}
              {step === 'done' && result && (
                <div className="py-8 text-center">
                  <CheckCircleIcon className="w-12 h-12 text-zilla-neon mx-auto mb-4" />
                  <p className="text-white font-medium text-lg mb-2">Merchant Account Created</p>
                  <div className="card-zilla p-4 text-left space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Login URL</span>
                      <span className="text-white text-sm font-mono">growzilla.xyz/login</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Store Domain</span>
                      <span className="text-white text-sm font-mono">
                        {shops.find((s) => s.shop_id === selectedShopId)?.domain || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Password</span>
                      <span className="text-white text-sm font-mono">{ownerPassword}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="btn-zilla-outline text-sm py-2 px-6"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MerchantLauncher;
