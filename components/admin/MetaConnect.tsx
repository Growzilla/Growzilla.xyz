import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LinkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

interface MetaConnectProps {
  shopId: string;
  shopDomain: string;
  onConnected?: (adAccountId: string, adAccountName: string) => void;
}

type ConnectStep = 'input' | 'connecting' | 'syncing' | 'done' | 'error';

const API_BASE = process.env.NEXT_PUBLIC_ECOMDASH_API_URL || process.env.ECOMDASH_API_URL || 'https://ecomdash-api.onrender.com';

function getAdminKey(): string {
  return process.env.NEXT_PUBLIC_ADMIN_KEY || '';
}

const MetaConnect: React.FC<MetaConnectProps> = ({ shopId, shopDomain, onConnected }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ConnectStep>('input');
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [adAccountId, setAdAccountId] = useState('');
  const [adAccountName, setAdAccountName] = useState('');

  const reset = () => {
    setStep('input');
    setError('');
    setAccessToken('');
    setAdAccountId('');
    setAdAccountName('');
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken.trim()) return;

    setStep('connecting');
    setError('');

    try {
      // Connect Meta
      const connectRes = await fetch(`${API_BASE}/api/meta/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': getAdminKey(),
        },
        body: JSON.stringify({
          shop_id: shopId,
          access_token: accessToken.trim(),
        }),
      });

      if (!connectRes.ok) {
        const text = await connectRes.text().catch(() => 'Unknown error');
        throw new Error(`API ${connectRes.status}: ${text}`);
      }

      const connectData = await connectRes.json();
      setAdAccountId(connectData.ad_account_id || '');
      setAdAccountName(connectData.ad_account_name || '');

      // Trigger sync
      setStep('syncing');
      try {
        await fetch(`${API_BASE}/api/meta/sync/${shopId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Key': getAdminKey(),
          },
        });
      } catch {
        // Non-critical — sync may take time
      }

      setStep('done');
      onConnected?.(connectData.ad_account_id || '', connectData.ad_account_name || '');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to connect Meta';
      if (msg.includes('400')) {
        setError('Invalid Meta access token. Ensure it has ads_read permission.');
      } else {
        setError(msg);
      }
      setStep('error');
    }
  };

  return (
    <>
      <button
        onClick={() => { reset(); setOpen(true); }}
        className="btn-zilla-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
      >
        <LinkIcon className="w-3.5 h-3.5" />
        Connect Meta
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
              className="card-zilla p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <h2 className="font-display text-xl font-bold text-white mb-1">
                Connect Meta Ads
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {shopDomain}
              </p>

              {/* Token input */}
              {(step === 'input' || step === 'error') && (
                <form onSubmit={handleConnect} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Meta System User Token
                    </label>
                    <div className="relative">
                      <ClipboardDocumentIcon className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                      <textarea
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                        placeholder="Paste the Meta access token here..."
                        rows={3}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors font-mono text-xs resize-none"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      From Meta Business Settings → System Users → Generate Token (ads_read scope)
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 text-sm text-zilla-danger">
                      <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!accessToken.trim()}
                    className="w-full btn-zilla text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Connect & Discover Ad Account
                  </button>
                </form>
              )}

              {/* Connecting */}
              {step === 'connecting' && (
                <div className="py-12 text-center">
                  <div className="w-8 h-8 border-2 border-zilla-neon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">Validating token...</p>
                  <p className="text-sm text-gray-500 mt-1">Discovering ad accounts</p>
                </div>
              )}

              {/* Syncing */}
              {step === 'syncing' && (
                <div className="py-12 text-center">
                  <div className="w-8 h-8 border-2 border-zilla-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">Pulling campaign data...</p>
                  <p className="text-sm text-gray-500 mt-1">Fetching last 30 days of insights</p>
                </div>
              )}

              {/* Done */}
              {step === 'done' && (
                <div className="py-8 text-center">
                  <CheckCircleIcon className="w-12 h-12 text-zilla-neon mx-auto mb-4" />
                  <p className="text-white font-medium text-lg mb-2">Meta Ads Connected</p>
                  <div className="card-zilla p-4 text-left space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Ad Account</span>
                      <span className="text-white text-sm font-mono">
                        {adAccountName || adAccountId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Account ID</span>
                      <span className="text-white text-sm font-mono">{adAccountId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Status</span>
                      <span className="text-zilla-neon text-sm font-medium">Synced</span>
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

export default MetaConnect;
