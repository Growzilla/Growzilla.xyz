import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Platform, PostType, SavedHook, SavedMeat, SavedCTA, SavedCreator } from '@/types/smdashboard';
import { CONTENT_TYPES } from '@/types/smdashboard';
import { platformColor, tw } from '@/lib/design-tokens';
import {
  MOCK_SAVED_HOOKS,
  MOCK_SAVED_MEATS,
  MOCK_SAVED_CTAS,
  MOCK_SAVED_CREATORS,
  MOCK_PRODUCTS,
} from '@/data/mockSMData';
import type { MockProduct } from '@/data/mockSMData';

// ─── Inline Dropdown Component ──────────────────────────────────────────────

interface DropdownOption {
  id: string;
  label: string;
  sublabel?: string;
  avatar?: string;
}

interface InlineDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (id: string) => void;
  onCreateNew: () => void;
  createLabel: string;
  placeholder: string;
}

const InlineDropdown: React.FC<InlineDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  onCreateNew,
  createLabel,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o.id === value);

  return (
    <div ref={ref} className="relative">
      <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-left hover:border-white/[0.15] transition-colors focus:outline-none focus:border-[#00FF94]/30"
      >
        {selected?.avatar && (
          <div className="w-5 h-5 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
            <img src={selected.avatar} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        )}
        <span className={selected ? 'text-white flex-1 truncate' : 'text-zinc-600 flex-1 truncate'}>
          {selected ? selected.label : placeholder}
        </span>
        {selected?.sublabel && (
          <span className="text-[10px] text-zinc-600 truncate max-w-[140px]">{selected.sublabel}</span>
        )}
        <svg className={`w-3.5 h-3.5 text-zinc-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg bg-[#1A1A1A] border border-white/[0.08] shadow-xl overflow-hidden max-h-52 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => { onChange(opt.id); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/[0.05] transition-colors ${
                value === opt.id ? 'bg-white/[0.03] text-white' : 'text-zinc-300'
              }`}
            >
              {opt.avatar && (
                <div className="w-5 h-5 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
                  <img src={opt.avatar} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
              <span className="flex-1 truncate">{opt.label}</span>
              {opt.sublabel && (
                <span className="text-[10px] text-zinc-600 truncate max-w-[120px]">{opt.sublabel}</span>
              )}
            </button>
          ))}
          <button
            onClick={() => { onCreateNew(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-[#00FF94] hover:bg-[#00FF94]/5 transition-colors border-t border-white/[0.06]"
          >
            <span className="w-5 h-5 flex items-center justify-center text-xs">+</span>
            <span>{createLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Create New Modal ───────────────────────────────────────────────────────

interface CreateModalProps {
  type: 'hook' | 'meat' | 'cta' | 'creator';
  onClose: () => void;
  onSave: (data: { script: string } | { name: string; handle: string }) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ type, onClose, onSave }) => {
  const [script, setScript] = useState('');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');

  const isCreator = type === 'creator';
  const title = isCreator ? 'Connect New Creator' : `Create New ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="bg-[#151518] border border-white/[0.08] rounded-xl w-96 p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-semibold text-white">{title}</h3>

        {isCreator ? (
          <>
            <div>
              <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30"
                placeholder="Creator name"
                autoFocus
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">Handle</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30"
                placeholder="@handle"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">Script</label>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30 resize-none"
              placeholder={`Enter your ${type} script...`}
              autoFocus
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-md text-sm text-zinc-400 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (isCreator) {
                if (name.trim() && handle.trim()) onSave({ name: name.trim(), handle: handle.trim() });
              } else {
                if (script.trim()) onSave({ script: script.trim() });
              }
            }}
            className="flex-1 py-2 rounded-md text-sm font-semibold text-[#09090B] bg-[#00FF94] hover:bg-[#00E676] transition-colors"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Product Card ───────────────────────────────────────────────────────────

interface ProductCardProps {
  product: MockProduct;
  selected: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, selected, onClick }) => {
  const initial = product.title.charAt(0).toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`text-left rounded-lg p-3 transition-all duration-150 border ${
        selected
          ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40'
          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.08]'
      }`}
    >
      {/* Image placeholder */}
      <div className="aspect-square rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-2.5 overflow-hidden">
        {product.featuredImageUrl ? (
          <img src={product.featuredImageUrl} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl font-semibold text-zinc-700">{initial}</span>
        )}
      </div>

      {/* Title */}
      <p className="text-[13px] text-white font-medium leading-tight truncate">{product.title}</p>

      {/* Price + inventory */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[13px] text-white font-mono">
          ${product.priceMin % 1 === 0 ? product.priceMin.toFixed(0) : product.priceMin.toFixed(2)}
        </span>
        <span className="text-[10px] text-zinc-600 font-mono">{product.totalInventory} in stock</span>
      </div>
    </button>
  );
};

// ─── Step Header ────────────────────────────────────────────────────────────

const StepHeader: React.FC<{ step: number; title: string }> = ({ step, title }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.06] text-[10px] font-mono font-semibold text-zinc-400">
      {step}
    </span>
    <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">{title}</span>
  </div>
);

// ─── Main View ──────────────────────────────────────────────────────────────

interface CreateLinkViewProps {
  onBack: () => void;
}

const CreateLinkView: React.FC<CreateLinkViewProps> = ({ onBack }) => {
  // Product selection
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState('');

  // UTM configuration
  const [channel, setChannel] = useState<Platform>('tiktok');
  const [contentType, setContentType] = useState<PostType>('video');
  const [selectedCreator, setSelectedCreator] = useState<string | null>('cr-sarah');
  const [selectedHook, setSelectedHook] = useState<string | null>('hook-1');
  const [selectedMeat, setSelectedMeat] = useState<string | null>('meat-1');
  const [selectedCta, setSelectedCta] = useState<string | null>('cta-1');

  // Saved data (in production, fetched from backend)
  const [hooks, setHooks] = useState<SavedHook[]>(MOCK_SAVED_HOOKS);
  const [meats, setMeats] = useState<SavedMeat[]>(MOCK_SAVED_MEATS);
  const [ctas, setCtas] = useState<SavedCTA[]>(MOCK_SAVED_CTAS);
  const [creators, setCreators] = useState<SavedCreator[]>(MOCK_SAVED_CREATORS);

  // Modal + feedback state
  const [createModal, setCreateModal] = useState<'hook' | 'meat' | 'cta' | 'creator' | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_PRODUCTS;
    const q = searchQuery.toLowerCase();
    return MOCK_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [searchQuery]);

  // Selected product object
  const selectedProduct = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.id === selectedProductId) ?? null,
    [selectedProductId]
  );

  // Build the base URL from product or custom URL
  const baseUrl = useMemo(() => {
    if (selectedProduct) {
      return `https://glowserum.com/products/${selectedProduct.handle}`;
    }
    if (customUrl.trim()) {
      return customUrl.trim();
    }
    return 'https://glowserum.com';
  }, [selectedProduct, customUrl]);

  // Build generated URL
  const hookNum = hooks.find((h) => h.id === selectedHook)?.number;
  const meatNum = meats.find((m) => m.id === selectedMeat)?.number;
  const ctaNum = ctas.find((c) => c.id === selectedCta)?.number;
  const creator = creators.find((c) => c.id === selectedCreator);

  const generatedUrl = useMemo(() => {
    const params = new URLSearchParams({
      utm_source: channel,
      utm_medium: 'social',
      utm_content: contentType,
      ...(creator && { utm_creator: creator.handle.replace('@', '') }),
      ...(hookNum && { utm_hook: String(hookNum) }),
      ...(meatNum && { utm_meat: String(meatNum) }),
      ...(ctaNum && { utm_cta: String(ctaNum) }),
    });
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${params.toString()}`;
  }, [baseUrl, channel, contentType, creator, hookNum, meatNum, ctaNum]);

  // When selecting a product, clear custom URL
  function handleProductSelect(id: string) {
    setSelectedProductId(selectedProductId === id ? null : id);
    if (selectedProductId !== id) setCustomUrl('');
  }

  // When typing custom URL, clear product selection
  function handleCustomUrlChange(url: string) {
    setCustomUrl(url);
    if (url.trim()) setSelectedProductId(null);
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleCreateSave(data: { script: string } | { name: string; handle: string }) {
    if (createModal === 'creator' && 'name' in data) {
      const newCreator: SavedCreator = {
        id: `cr-new-${Date.now()}`,
        name: data.name,
        handle: data.handle.startsWith('@') ? data.handle : `@${data.handle}`,
        avatar: '',
        platforms: [channel],
      };
      setCreators((prev) => [...prev, newCreator]);
      setSelectedCreator(newCreator.id);
    } else if ('script' in data) {
      const scriptStart = data.script.length > 40 ? data.script.slice(0, 40) + '...' : data.script;
      if (createModal === 'hook') {
        const num = hooks.length > 0 ? Math.max(...hooks.map((h) => h.number)) + 1 : 1;
        const newHook: SavedHook = { id: `hook-${num}`, number: num, scriptStart, fullScript: data.script, createdAt: new Date().toISOString() };
        setHooks((prev) => [...prev, newHook]);
        setSelectedHook(newHook.id);
      } else if (createModal === 'meat') {
        const num = meats.length > 0 ? Math.max(...meats.map((m) => m.number)) + 1 : 1;
        const newMeat: SavedMeat = { id: `meat-${num}`, number: num, scriptStart, fullScript: data.script, createdAt: new Date().toISOString() };
        setMeats((prev) => [...prev, newMeat]);
        setSelectedMeat(newMeat.id);
      } else if (createModal === 'cta') {
        const num = ctas.length > 0 ? Math.max(...ctas.map((c) => c.number)) + 1 : 1;
        const newCta: SavedCTA = { id: `cta-${num}`, number: num, scriptStart, fullScript: data.script, createdAt: new Date().toISOString() };
        setCtas((prev) => [...prev, newCta]);
        setSelectedCta(newCta.id);
      }
    }
    setCreateModal(null);
  }

  // Dropdown options
  const hookOptions: DropdownOption[] = hooks.map((h) => ({
    id: h.id,
    label: `#${h.number}: ${h.scriptStart}`,
  }));

  const meatOptions: DropdownOption[] = meats.map((m) => ({
    id: m.id,
    label: `#${m.number}: ${m.scriptStart}`,
  }));

  const ctaOptions: DropdownOption[] = ctas.map((c) => ({
    id: c.id,
    label: `#${c.number}: ${c.scriptStart}`,
  }));

  const creatorOptions: DropdownOption[] = creators.map((c) => ({
    id: c.id,
    label: c.name,
    sublabel: c.handle,
    avatar: c.avatar,
  }));

  const contentTypeOptions = CONTENT_TYPES[channel] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto px-6 py-6 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Links
          </button>
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">Create Tracked Link</h2>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        {/* ── STEP 1: Choose Product ── */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mb-8"
        >
          <StepHeader step={1} title="Choose Product" />

          <div className={`${tw.card} p-4`}>
            {/* Search */}
            <div className="relative mb-4">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30"
                placeholder="Search products..."
              />
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selected={selectedProductId === product.id}
                  onClick={() => handleProductSelect(product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-zinc-600">No products match your search</p>
              </div>
            )}

            {/* Divider with "or" */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[11px] text-zinc-600 uppercase tracking-wider">or enter custom URL</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Custom URL input */}
            <input
              type="url"
              value={customUrl}
              onChange={(e) => handleCustomUrlChange(e.target.value)}
              className="w-full px-3 py-2.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30 font-mono"
              placeholder="https://your-store.com/products/..."
            />
          </div>
        </motion.section>

        {/* ── STEP 2: Configure Link ── */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <StepHeader step={2} title="Configure Link" />

          <div className={`${tw.card} p-4 space-y-4`}>
            {/* Channel */}
            <div>
              <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
                Channel
              </label>
              <div className="flex gap-1.5">
                {(['tiktok', 'instagram', 'youtube'] as Platform[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setChannel(p);
                      const types = CONTENT_TYPES[p];
                      if (types && types.length > 0) setContentType(types[0].id);
                    }}
                    className={`px-3.5 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                      channel === p
                        ? 'text-white'
                        : 'text-zinc-500 hover:text-zinc-300 bg-white/[0.02]'
                    }`}
                    style={
                      channel === p
                        ? { backgroundColor: `${platformColor(p)}20`, color: platformColor(p), border: `1px solid ${platformColor(p)}40` }
                        : { border: '1px solid rgba(255,255,255,0.06)' }
                    }
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Type */}
            <div>
              <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
                Type
              </label>
              <div className="flex gap-1.5">
                {contentTypeOptions.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => setContentType(ct.id)}
                    className={`px-3.5 py-1.5 rounded-md text-[11px] font-medium transition-all border ${
                      contentType === ct.id
                        ? 'text-white bg-white/[0.06] border-white/[0.15]'
                        : 'text-zinc-500 hover:text-zinc-300 bg-white/[0.02] border-white/[0.06]'
                    }`}
                  >
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Creator */}
            <InlineDropdown
              label="Creator"
              options={creatorOptions}
              value={selectedCreator}
              onChange={setSelectedCreator}
              onCreateNew={() => setCreateModal('creator')}
              createLabel="Connect New Creator"
              placeholder="Select creator..."
            />

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Script Components Label */}
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">Content Script</p>

            {/* Hook */}
            <InlineDropdown
              label="Hook"
              options={hookOptions}
              value={selectedHook}
              onChange={setSelectedHook}
              onCreateNew={() => setCreateModal('hook')}
              createLabel="Create New Hook"
              placeholder="Select hook..."
            />

            {/* Meat */}
            <InlineDropdown
              label="Meat"
              options={meatOptions}
              value={selectedMeat}
              onChange={setSelectedMeat}
              onCreateNew={() => setCreateModal('meat')}
              createLabel="Create New Meat"
              placeholder="Select meat..."
            />

            {/* CTA */}
            <InlineDropdown
              label="CTA"
              options={ctaOptions}
              value={selectedCta}
              onChange={setSelectedCta}
              onCreateNew={() => setCreateModal('cta')}
              createLabel="Create New CTA"
              placeholder="Select CTA..."
            />
          </div>
        </motion.section>

        {/* ── Generated URL ── */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className={`${tw.card} p-4`}>
            <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-2">
              Generated URL
            </label>
            <div className="p-3 rounded-md bg-white/[0.02] border border-white/[0.06] break-all mb-4">
              <p className="text-[11px] text-zinc-400 font-mono leading-relaxed select-all">{generatedUrl}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-300 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-[#00FF94] text-[#09090B] hover:bg-[#00E676] transition-colors"
              >
                {saved ? 'Saved!' : 'Create & Save'}
              </button>
            </div>

            <p className="text-[10px] text-zinc-600 text-center mt-3">
              Demo mode — links are not tracked
            </p>
          </div>
        </motion.section>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {createModal && (
          <CreateModal
            type={createModal}
            onClose={() => setCreateModal(null)}
            onSave={handleCreateSave}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CreateLinkView;
