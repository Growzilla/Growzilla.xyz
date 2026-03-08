import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RocketLaunchIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ArrowPathIcon,
  BuildingStorefrontIcon,
  KeyIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  CommandLineIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import LoginGate from '@/components/admin/LoginGate';
import AdminLayout from '@/components/admin/AdminLayout';
import type { MerchantDeploy, MerchantStatus } from '@/types/admin';

export default function CustomAppLauncher() {
  return (
    <>
      <Head>
        <title>Custom App Launcher | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LoginGate>
        {(logout) => <LauncherDashboard onLogout={logout} />}
      </LoginGate>
    </>
  );
}

const STATUS_CONFIG: Record<MerchantStatus, { label: string; color: string; bg: string }> = {
  lead: { label: 'Lead', color: 'text-gray-400', bg: 'bg-gray-400/10' },
  qualified: { label: 'Qualified', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  credentials: { label: 'Has Credentials', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  deploying: { label: 'Deploying', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  live: { label: 'Live', color: 'text-zilla-neon', bg: 'bg-zilla-neon/10' },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-400/10' },
};

function StatusBadge({ status }: { status: MerchantStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${config.color} ${config.bg}`}>
      {status === 'deploying' && (
        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      )}
      {config.label}
    </span>
  );
}

function LauncherDashboard({ onLogout }: { onLogout: () => void }) {
  const [merchants, setMerchants] = useState<MerchantDeploy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeploy, setShowDeploy] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [deployResult, setDeployResult] = useState<{ success: boolean; installLink?: string; error?: string } | null>(null);
  const [copied, setCopied] = useState('');

  // Form state
  const [merchant, setMerchant] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState('');

  const fetchMerchants = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/deploy-merchant');
      if (res.ok) {
        const json = await res.json();
        setMerchants(json.data || []);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant || !clientId || !clientSecret) return;

    setDeploying(true);
    setDeployLogs(['Starting deployment...']);
    setDeployResult(null);

    try {
      const res = await fetch('/api/admin/deploy-merchant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchant, storeUrl, clientId, clientSecret, email }),
      });

      const data = await res.json();
      setDeployLogs(data.logs || []);

      if (data.success) {
        setDeployResult({ success: true, installLink: data.installLink });
        fetchMerchants();
      } else {
        setDeployResult({ success: false, error: data.error });
      }
    } catch (err) {
      setDeployResult({ success: false, error: err instanceof Error ? err.message : 'Network error' });
    } finally {
      setDeploying(false);
    }
  };

  const resetForm = () => {
    setMerchant('');
    setStoreUrl('');
    setClientId('');
    setClientSecret('');
    setEmail('');
    setDeployLogs([]);
    setDeployResult(null);
    setShowDeploy(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const liveMerchants = merchants.filter((m) => m.status === 'live');
  const otherMerchants = merchants.filter((m) => m.status !== 'live');

  return (
    <AdminLayout onLogout={onLogout}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white flex items-center gap-3">
            <CommandLineIcon className="w-7 h-7 text-zilla-neon" />
            Custom App Launcher
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {merchants.length > 0
              ? `${liveMerchants.length} live, ${merchants.length} total`
              : 'Deploy custom Shopify apps in one click'}
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowDeploy(true); }}
          className="btn-zilla text-sm py-2.5 px-5 flex items-center gap-2"
        >
          <RocketLaunchIcon className="w-4 h-4" />
          Deploy New App
        </button>
      </div>

      {/* Pipeline Stats */}
      {merchants.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {(Object.keys(STATUS_CONFIG) as MerchantStatus[]).map((status) => {
            const count = merchants.filter((m) => m.status === status).length;
            const config = STATUS_CONFIG[status];
            return (
              <div key={status} className="card-zilla p-3">
                <div className={`text-2xl font-bold ${count > 0 ? config.color : 'text-gray-700'}`}>
                  {count}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{config.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Merchant List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-zilla-neon border-t-transparent rounded-full animate-spin" />
        </div>
      ) : merchants.length === 0 ? (
        <div className="card-zilla p-12 text-center">
          <CommandLineIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">No apps deployed yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Create a custom app in Shopify Partner Dashboard, grab the credentials,
            and deploy here. Full infra spun up in ~2 minutes.
          </p>
          <button
            onClick={() => { resetForm(); setShowDeploy(true); }}
            className="btn-zilla text-sm py-2.5 px-5 inline-flex items-center gap-2"
          >
            <RocketLaunchIcon className="w-4 h-4" />
            Deploy First App
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {[...liveMerchants, ...otherMerchants].map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card-zilla p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-zilla-dark flex items-center justify-center flex-shrink-0">
                    <BuildingStorefrontIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{m.merchant}</span>
                      <StatusBadge status={m.status} />
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 truncate">
                      {m.storeUrl || 'No store URL'}
                      {m.renderServiceUrl && (
                        <span className="ml-2 text-gray-600">
                          {m.renderServiceUrl}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {m.installLink && (
                    <button
                      onClick={() => copyToClipboard(m.installLink!, m.id)}
                      className="text-xs px-3 py-1.5 rounded-md bg-zilla-dark border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 transition-colors flex items-center gap-1.5"
                    >
                      {copied === m.id ? (
                        <CheckCircleIcon className="w-3.5 h-3.5 text-zilla-neon" />
                      ) : (
                        <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                      )}
                      {copied === m.id ? 'Copied' : 'Install Link'}
                    </button>
                  )}
                  {m.githubRepo && (
                    <a
                      href={`https://github.com/${m.githubRepo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-md bg-zilla-dark border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {m.error && (
                    <span className="text-xs text-red-400 max-w-[200px] truncate" title={m.error}>
                      {m.error}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* How It Works */}
      <div className="mt-12 pt-8 border-t border-gray-800/50">
        <h3 className="text-sm font-medium text-gray-400 mb-4">How it works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Create App', desc: 'In Shopify Partner Dashboard, create a custom app. Copy client ID + secret.' },
            { step: '2', title: 'Deploy Here', desc: 'Enter credentials + store URL. System creates GitHub repo, Render service, and DB.' },
            { step: '3', title: 'Send Link', desc: 'Copy the install link and send to merchant. They install with one click.' },
            { step: '4', title: 'Merchant Live', desc: 'App installs, onboarding flow takes over. Data syncs automatically.' },
          ].map((item) => (
            <div key={item.step} className="card-zilla p-4">
              <div className="w-6 h-6 rounded-full bg-zilla-neon/10 text-zilla-neon text-xs font-bold flex items-center justify-center mb-3">
                {item.step}
              </div>
              <div className="text-sm font-medium text-white mb-1">{item.title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Deploy Modal */}
      <AnimatePresence>
        {showDeploy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget && !deploying) setShowDeploy(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="card-zilla p-6 w-full max-w-xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => !deploying && setShowDeploy(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <h2 className="font-display text-xl font-bold text-white mb-1 flex items-center gap-2">
                <RocketLaunchIcon className="w-5 h-5 text-zilla-neon" />
                Deploy Custom App
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Creates GitHub repo + Render service + database. Full deploy in ~2 min.
              </p>

              {/* Deploy Form */}
              {!deployResult && (
                <form onSubmit={handleDeploy} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Merchant Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <BuildingStorefrontIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={merchant}
                        onChange={(e) => setMerchant(e.target.value)}
                        placeholder="nuvoo"
                        required
                        disabled={deploying}
                        className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors disabled:opacity-50"
                      />
                    </div>
                    {merchant && (
                      <p className="text-xs text-gray-600 mt-1">
                        Repo: growzilla-{merchant.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                        {' | '}
                        URL: growzilla-{merchant.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.onrender.com
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Store URL
                    </label>
                    <div className="relative">
                      <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={storeUrl}
                        onChange={(e) => setStoreUrl(e.target.value)}
                        placeholder="nuvoo-com.myshopify.com"
                        disabled={deploying}
                        className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors disabled:opacity-50"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Optional if unknown. Needed for install link.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">
                        Shopify Client ID <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          value={clientId}
                          onChange={(e) => setClientId(e.target.value)}
                          placeholder="From Partner Dashboard"
                          required
                          disabled={deploying}
                          className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors text-xs disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">
                        Client Secret <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="password"
                          value={clientSecret}
                          onChange={(e) => setClientSecret(e.target.value)}
                          placeholder="From Partner Dashboard"
                          required
                          disabled={deploying}
                          className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors text-xs disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">
                      Merchant Email
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@merchant.com"
                        disabled={deploying}
                        className="w-full pl-10 pr-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={deploying || !merchant || !clientId || !clientSecret}
                    className="w-full btn-zilla text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {deploying ? (
                      <>
                        <span className="w-4 h-4 border-2 border-zilla-black border-t-transparent rounded-full animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <RocketLaunchIcon className="w-4 h-4" />
                        Deploy to Render
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Deploy Logs */}
              {deployLogs.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-medium text-gray-400 mb-2">Deploy Log</div>
                  <div className="bg-zilla-black rounded-lg border border-gray-800 p-3 max-h-48 overflow-y-auto font-mono text-xs space-y-1">
                    {deployLogs.map((log, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRightIcon className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
                        <span className={
                          log.includes('FAILED') ? 'text-red-400' :
                          log.includes('created') || log.includes('pushed') || log.includes('updated') ? 'text-zilla-neon' :
                          'text-gray-400'
                        }>
                          {log}
                        </span>
                      </div>
                    ))}
                    {deploying && (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 border border-zilla-neon border-t-transparent rounded-full animate-spin" />
                        <span className="text-gray-500">Working...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Deploy Result */}
              {deployResult && (
                <div className="mt-4">
                  {deployResult.success ? (
                    <div className="bg-zilla-neon/5 border border-zilla-neon/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircleIcon className="w-5 h-5 text-zilla-neon" />
                        <span className="text-white font-medium">Deployed Successfully</span>
                      </div>

                      {deployResult.installLink && (
                        <div className="space-y-2">
                          <div className="text-xs text-gray-400">Install Link (send to merchant):</div>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 text-xs bg-zilla-black rounded px-3 py-2 text-zilla-neon truncate border border-gray-800">
                              {deployResult.installLink}
                            </code>
                            <button
                              onClick={() => copyToClipboard(deployResult.installLink!, 'result')}
                              className="btn-zilla-outline text-xs py-2 px-3 flex-shrink-0"
                            >
                              {copied === 'result' ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex gap-2">
                        <button onClick={resetForm} className="btn-zilla text-xs py-2 px-4">
                          Deploy Another
                        </button>
                        <button onClick={() => setShowDeploy(false)} className="btn-zilla-outline text-xs py-2 px-4">
                          Done
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                        <span className="text-white font-medium">Deployment Failed</span>
                      </div>
                      <p className="text-sm text-red-400">{deployResult.error}</p>
                      <button
                        onClick={() => { setDeployResult(null); setDeployLogs([]); }}
                        className="mt-3 btn-zilla-outline text-xs py-2 px-4 flex items-center gap-1.5"
                      >
                        <ArrowPathIcon className="w-3.5 h-3.5" />
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
