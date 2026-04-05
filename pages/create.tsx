import React, { useState, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MOCK_PRODUCTS, type MockProduct } from '@/data/mockSMData';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CreateStep = 'product' | 'vibe' | 'generating' | 'result' | 'posted';
type Vibe = 'engaging' | 'educational' | 'promotional';
type Platform = 'tiktok' | 'instagram' | 'youtube';

const VIBES: { id: Vibe; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'engaging',
    label: 'Engaging',
    description: 'Hook-driven, attention-grabbing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    id: 'educational',
    label: 'Educational',
    description: 'How-to, tutorial style',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    id: 'promotional',
    label: 'Promotional',
    description: 'Deal/offer focused',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
];

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: 'tiktok', label: 'TikTok' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
];

// Mock tracking link generator
function generateTrackingLink(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `growzilla.xyz/go/${code}`;
}

// ===========================================================================
// /create Page
// ===========================================================================

export default function CreatePage() {
  const router = useRouter();

  // Step state
  const [step, setStep] = useState<CreateStep>('product');
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const [trackingLink] = useState(() => generateTrackingLink());
  const [postUrl, setPostUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('tiktok');
  const [copied, setCopied] = useState(false);

  // Product search
  const [search, setSearch] = useState('');
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return MOCK_PRODUCTS.filter((p) => p.status === 'active');
    const q = search.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.status === 'active' &&
        (p.title.toLowerCase().includes(q) || p.productType.toLowerCase().includes(q))
    );
  }, [search]);

  // Handlers
  const handleProductSelect = useCallback((product: MockProduct) => {
    setSelectedProduct(product);
    setStep('vibe');
  }, []);

  const handleVibeSelect = useCallback((vibe: Vibe) => {
    setSelectedVibe(vibe);
    setStep('generating');
    // Mock generation delay
    setTimeout(() => setStep('result'), 3000);
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`https://${trackingLink}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [trackingLink]);

  const handleSubmitPost = useCallback(() => {
    if (!postUrl.trim()) return;
    // TODO: POST /api/content/posts when backend ready
    setStep('posted');
  }, [postUrl]);

  const handlePostAnother = useCallback(() => {
    setPostUrl('');
    setStep('result');
  }, []);

  // Step indicator
  const stepNumber =
    step === 'product' ? 1 : step === 'vibe' ? 2 : step === 'generating' ? 3 : step === 'result' ? 4 : 5;
  const stepLabels = ['Product', 'Vibe', 'Generate', 'Result', 'Posted'];

  return (
    <>
      <Head>
        <title>Create Content | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0A0A0B' }}>
        {/* Header */}
        <header
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={() => router.push('/whop')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="text-sm">Dashboard</span>
          </button>
          <span className="text-sm font-medium text-gray-300">Create Content</span>
          <div className="w-16" /> {/* spacer for centering */}
        </header>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1.5 pt-5 pb-2 px-4">
          {stepLabels.map((label, i) => {
            const s = i + 1;
            const isActive = s === stepNumber;
            const isDone = s < stepNumber;
            return (
              <React.Fragment key={label}>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-all duration-200"
                    style={{
                      backgroundColor: isDone ? '#00FF94' : isActive ? 'rgba(0,255,148,0.15)' : 'rgba(255,255,255,0.05)',
                      color: isDone ? '#0A0A0B' : isActive ? '#00FF94' : '#4B5563',
                      border: isActive ? '1px solid rgba(0,255,148,0.3)' : '1px solid transparent',
                    }}
                  >
                    {isDone ? (
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : s}
                  </div>
                  <span
                    className="text-[11px] hidden sm:inline"
                    style={{ color: isActive ? '#D1D5DB' : '#4B5563' }}
                  >
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className="w-4 sm:w-6 h-px" style={{ backgroundColor: isDone ? '#00FF94' : 'rgba(255,255,255,0.06)' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-start justify-center p-6 pt-4">
          <AnimatePresence mode="wait">
            {/* ============================================== */}
            {/* STEP 1: Pick Product */}
            {/* ============================================== */}
            {step === 'product' && (
              <motion.div
                key="product"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full max-w-3xl"
              >
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-white mb-1">Pick a product</h2>
                  <p className="text-sm text-gray-400">Choose which product to create content for</p>
                </div>

                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                      style={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="rounded-xl p-3 text-left transition-all duration-150 group"
                      style={{
                        backgroundColor: '#151518',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {/* Product image */}
                      <div
                        className="w-full aspect-square rounded-lg mb-3 flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: '#0A0A0B' }}
                      >
                        {product.featuredImageUrl ? (
                          <Image
                            src={product.featuredImageUrl}
                            alt={product.title}
                            width={120}
                            height={120}
                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-150"
                          />
                        ) : (
                          <div className="text-gray-600 text-xs">No image</div>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-white truncate">{product.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">${product.priceMin.toFixed(2)}</span>
                        <span className="text-[10px] text-gray-500">{product.productType}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-gray-500">No products found</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ============================================== */}
            {/* STEP 2: Pick Vibe */}
            {/* ============================================== */}
            {step === 'vibe' && (
              <motion.div
                key="vibe"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full max-w-md"
              >
                {/* Selected product reminder */}
                {selectedProduct && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-lg mb-6"
                    style={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {selectedProduct.featuredImageUrl && (
                      <Image
                        src={selectedProduct.featuredImageUrl}
                        alt={selectedProduct.title}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded object-contain"
                        style={{ backgroundColor: '#0A0A0B' }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white truncate block">{selectedProduct.title}</span>
                      <span className="text-xs text-gray-500">${selectedProduct.priceMin.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => setStep('product')}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                )}

                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-white mb-1">Pick a vibe</h2>
                  <p className="text-sm text-gray-400">What style should the content have?</p>
                </div>

                <div className="space-y-3">
                  {VIBES.map((vibe) => (
                    <button
                      key={vibe.id}
                      onClick={() => handleVibeSelect(vibe.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-150"
                      style={{
                        backgroundColor: '#151518',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <div className="text-gray-400">{vibe.icon}</div>
                      <div>
                        <h3 className="text-sm font-medium text-white">{vibe.label}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{vibe.description}</p>
                      </div>
                      <svg className="w-4 h-4 ml-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============================================== */}
            {/* STEP 3: Generating */}
            {/* ============================================== */}
            {step === 'generating' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="text-center max-w-sm"
              >
                {/* Progress animation */}
                <div className="mb-6 relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 animate-spin" viewBox="0 0 80 80" style={{ animationDuration: '3s' }}>
                    <circle
                      cx="40" cy="40" r="36"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="40" cy="40" r="36"
                      fill="none"
                      stroke="#00FF94"
                      strokeWidth="4"
                      strokeDasharray="80 226"
                      strokeLinecap="round"
                    />
                  </svg>
                  {selectedProduct?.featuredImageUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={selectedProduct.featuredImageUrl}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain opacity-60"
                      />
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-semibold text-white mb-2">Creating your video...</h2>
                <p className="text-sm text-gray-400 mb-1">
                  {selectedVibe === 'engaging' && 'Crafting an attention-grabbing hook'}
                  {selectedVibe === 'educational' && 'Building a tutorial-style breakdown'}
                  {selectedVibe === 'promotional' && 'Highlighting the best offer angle'}
                </p>
                <p className="text-xs text-gray-500">This usually takes a few seconds</p>
              </motion.div>
            )}

            {/* ============================================== */}
            {/* STEP 4: Result */}
            {/* ============================================== */}
            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full max-w-lg"
              >
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {/* Video preview placeholder */}
                  <div
                    className="w-full aspect-video flex items-center justify-center relative"
                    style={{ backgroundColor: '#0A0A0B' }}
                  >
                    {selectedProduct?.featuredImageUrl ? (
                      <Image
                        src={selectedProduct.featuredImageUrl}
                        alt={selectedProduct.title}
                        width={120}
                        height={120}
                        className="w-24 h-24 object-contain opacity-30"
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(0,255,148,0.15)' }}
                      >
                        <svg className="w-6 h-6 ml-0.5" style={{ color: '#00FF94' }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-medium" style={{ backgroundColor: 'rgba(0,255,148,0.15)', color: '#00FF94' }}>
                      Video ready
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <div>
                      <h2 className="text-base font-semibold text-white mb-0.5">Your video is ready</h2>
                      <p className="text-xs text-gray-500">
                        {selectedProduct?.title} &middot; {selectedVibe} vibe
                      </p>
                    </div>

                    {/* Tracking link */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Your tracking link</label>
                      <div
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                        style={{ backgroundColor: '#0A0A0B', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <span className="flex-1 text-sm text-gray-300 font-mono truncate">
                          {trackingLink}
                        </span>
                        <button
                          onClick={handleCopyLink}
                          className="px-3 py-1 rounded text-xs font-medium transition-all duration-150 flex-shrink-0"
                          style={{
                            backgroundColor: copied ? 'rgba(0,255,148,0.15)' : 'rgba(255,255,255,0.06)',
                            color: copied ? '#00FF94' : '#D1D5DB',
                            border: copied ? '1px solid rgba(0,255,148,0.2)' : '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* Post URL */}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">
                        Post it, then paste the URL here
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={postUrl}
                          onChange={(e) => setPostUrl(e.target.value)}
                          placeholder="https://tiktok.com/..."
                          className="flex-1 px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                          style={{ backgroundColor: '#0A0A0B', border: '1px solid rgba(255,255,255,0.08)' }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmitPost();
                          }}
                        />
                        <button
                          onClick={handleSubmitPost}
                          disabled={!postUrl.trim()}
                          className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-30"
                          style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>

                    {/* Platform pills */}
                    <div className="flex items-center gap-2">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPlatform(p.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-150"
                          style={{
                            backgroundColor: selectedPlatform === p.id ? 'rgba(0,255,148,0.1)' : 'rgba(255,255,255,0.03)',
                            border: selectedPlatform === p.id ? '1px solid rgba(0,255,148,0.25)' : '1px solid rgba(255,255,255,0.06)',
                            color: selectedPlatform === p.id ? '#00FF94' : '#9CA3AF',
                          }}
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              border: selectedPlatform === p.id ? '2px solid #00FF94' : '2px solid rgba(255,255,255,0.15)',
                              backgroundColor: selectedPlatform === p.id ? '#00FF94' : 'transparent',
                            }}
                          />
                          {p.label}
                        </button>
                      ))}
                    </div>

                    {/* Posting tips */}
                    <div
                      className="rounded-lg px-4 py-3"
                      style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Posting tips</div>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-gray-500 mt-0.5">&bull;</span>
                          Put your tracking link in bio
                        </li>
                        <li className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-gray-500 mt-0.5">&bull;</span>
                          Use 3-5 relevant hashtags
                        </li>
                        <li className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-gray-500 mt-0.5">&bull;</span>
                          Post between 6-9pm for best reach
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================== */}
            {/* STEP 5: Posted */}
            {/* ============================================== */}
            {step === 'posted' && (
              <motion.div
                key="posted"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full max-w-sm text-center"
              >
                <div
                  className="rounded-xl p-8"
                  style={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {/* Success icon */}
                  <div
                    className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0,255,148,0.1)' }}
                  >
                    <svg className="w-7 h-7" style={{ color: '#00FF94' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>

                  <h2 className="text-lg font-semibold text-white mb-1">Posted. We&apos;re tracking it.</h2>
                  <p className="text-sm text-gray-400 mb-6">
                    Check your dashboard for real-time attribution data.
                  </p>

                  {/* Post to another platform */}
                  <button
                    onClick={handlePostAnother}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-medium mb-3 transition-all duration-150"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#D1D5DB',
                    }}
                  >
                    Post to another platform
                  </button>

                  <button
                    onClick={() => router.push('/whop')}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{ backgroundColor: '#00FF94', color: '#0A0A0B' }}
                  >
                    Back to dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
