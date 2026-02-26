'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { generateUTMLink, updateLinkPostUrl } from '@/lib/smdashboard/api';

interface UTMGeneratorProps {
  onLinkSaved: () => void;
  onClose: () => void;
  demo?: boolean;
}

type Step =
  | 'idle'
  | 'platform_selected'
  | 'content_selected'
  | 'generating'
  | 'generated'
  | 'copied'
  | 'pasting'
  | 'saving'
  | 'saved';

interface Platform {
  id: string;
  label: string;
  icon: string;
  contentTypes: string[];
}

const PLATFORMS: Platform[] = [
  { id: 'instagram', label: 'Instagram', icon: '\ud83d\udcf7', contentTypes: ['Post', 'Reel', 'Story'] },
  { id: 'tiktok', label: 'TikTok', icon: '\ud83c\udfac', contentTypes: ['Video', 'Short'] },
  { id: 'youtube', label: 'YouTube', icon: '\u25b6\ufe0f', contentTypes: ['Video', 'Short'] },
];

const revealVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' as const },
  visible: {
    opacity: 1,
    height: 'auto',
    overflow: 'visible' as const,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: 'hidden' as const,
    transition: { duration: 0.25 },
  },
};

const UTMGenerator: React.FC<UTMGeneratorProps> = ({ onLinkSaved, onClose, demo }) => {
  const [platform, setPlatform] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [productUrl, setProductUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState<{ id: string; url: string } | null>(null);
  const [contentPostUrl, setContentPostUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState<string | null>(null);

  const selectedPlatform = PLATFORMS.find((p) => p.id === platform);

  const handlePlatformSelect = (id: string) => {
    setPlatform(id);
    setContentType(null);
    setGeneratedLink(null);
    setContentPostUrl('');
    setCopied(false);
    setError(null);
    setStep('platform_selected');
  };

  const handleContentTypeSelect = (type: string) => {
    setContentType(type);
    setGeneratedLink(null);
    setContentPostUrl('');
    setCopied(false);
    setError(null);
    setStep('content_selected');
  };

  const handleGenerate = async () => {
    if (!platform || !contentType) return;
    setStep('generating');
    setError(null);
    try {
      if (demo) {
        await new Promise((r) => setTimeout(r, 600));
        const shortId = Math.random().toString(36).slice(2, 8);
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const base = productUrl || 'https://yourstore.com';
        const fakeUrl = `${base}?utm_source=${platform}&utm_medium=social&utm_campaign=brand_creator&utm_content=${contentType}_${dateStr}_${shortId}`;
        setGeneratedLink({ id: `demo-${shortId}`, url: fakeUrl });
        setStep('generated');
        return;
      }
      const link = await generateUTMLink(platform, contentType, productUrl || undefined);
      setGeneratedLink(link);
      setStep('generated');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate link';
      setError(message);
      setStep('content_selected');
    }
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink.url);
      setCopied(true);
      setStep('copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const handleSave = async () => {
    if (!generatedLink || !contentPostUrl.trim()) return;
    setStep('saving');
    setError(null);
    try {
      if (demo) {
        await new Promise((r) => setTimeout(r, 500));
      } else {
        await updateLinkPostUrl(generatedLink.id, contentPostUrl.trim());
      }
      setStep('saved');
      setTimeout(() => {
        onLinkSaved();
        onClose();
      }, 1200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save link';
      setError(message);
      setStep('pasting');
    }
  };

  const canGenerate = !!platform && !!contentType;
  const canSave = !!contentPostUrl.trim();
  const showContentType = step !== 'idle';
  const showProductUrl =
    step === 'content_selected' ||
    step === 'generating' ||
    step === 'generated' ||
    step === 'copied' ||
    step === 'pasting' ||
    step === 'saving' ||
    step === 'saved';
  const showGenerated =
    step === 'generated' ||
    step === 'copied' ||
    step === 'pasting' ||
    step === 'saving' ||
    step === 'saved';
  const showPasteSection =
    step === 'copied' ||
    step === 'pasting' ||
    step === 'saving' ||
    step === 'saved';

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-display font-semibold text-white">
          Create Tracking Link
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Step 1: Platform Selection */}
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
            Choose Platform
          </label>
          <div className="flex gap-3">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePlatformSelect(p.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  platform === p.id
                    ? 'border-zilla-neon/20 bg-zilla-neon/5 text-zilla-neon'
                    : 'border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/5'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Content Type */}
        <AnimatePresence>
          {showContentType && selectedPlatform && (
            <motion.div
              key={`content-${platform}`}
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <label className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">
                Content Type
              </label>
              <div className="flex gap-3">
                {selectedPlatform.contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleContentTypeSelect(type)}
                    className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium border transition-all duration-200 ${
                      contentType === type
                        ? 'border-zilla-neon/20 bg-zilla-neon/5 text-zilla-neon'
                        : 'border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Product URL */}
        <AnimatePresence>
          {showProductUrl && (
            <motion.div
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <label className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                Product URL (optional)
              </label>
              <input
                type="url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://yourstore.com/products/..."
                className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 outline-none transition-all"
              />
              <p className="text-xs text-gray-600 mt-1.5">
                Leave empty for store homepage
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Button */}
        {!showGenerated && (
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || step === 'generating'}
            className={`w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
              canGenerate && step !== 'generating'
                ? 'bg-zilla-neon text-zilla-black hover:bg-zilla-glow'
                : 'bg-white/5 text-gray-600 cursor-not-allowed'
            }`}
          >
            {step === 'generating' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-zilla-black/30 border-t-zilla-black rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              '\u26a1 Generate Link'
            )}
          </button>
        )}

        {/* Generated Link Section */}
        <AnimatePresence>
          {showGenerated && generatedLink && (
            <motion.div
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  Your Tracking Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink.url}
                    className="flex-1 px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-zilla-neon text-sm font-mono truncate outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="flex-shrink-0 p-3 rounded-lg border border-gray-700 bg-zilla-dark hover:bg-white/5 transition-colors"
                  >
                    {copied ? (
                      <CheckIcon className="w-5 h-5 text-zilla-neon" />
                    ) : (
                      <ClipboardIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Copy success message */}
              <AnimatePresence>
                {(step === 'copied' || showPasteSection) && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-zilla-neon"
                  >
                    {'\u2705'} Link copied! Use it in your post, then come back and paste the link below.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paste Content URL */}
        <AnimatePresence>
          {showPasteSection && (
            <motion.div
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  Link to your post
                </label>
                <input
                  type="url"
                  value={contentPostUrl}
                  onChange={(e) => {
                    setContentPostUrl(e.target.value);
                    if (e.target.value.trim()) setStep('pasting');
                  }}
                  placeholder="https://tiktok.com/@you/video/123..."
                  className="w-full px-4 py-3 bg-zilla-dark border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 outline-none transition-all"
                />
                <p className="text-xs text-gray-600 mt-1.5">
                  Paste the URL of your published post
                </p>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={!canSave || step === 'saving' || step === 'saved'}
                className={`w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  canSave && step !== 'saving' && step !== 'saved'
                    ? 'bg-zilla-neon text-zilla-black hover:bg-zilla-glow'
                    : 'bg-white/5 text-gray-600 cursor-not-allowed'
                }`}
              >
                {step === 'saving' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-zilla-black/30 border-t-zilla-black rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : step === 'saved' ? (
                  '\u2705 Saved!'
                ) : (
                  '\ud83d\udcbe Save Link'
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UTMGenerator;
