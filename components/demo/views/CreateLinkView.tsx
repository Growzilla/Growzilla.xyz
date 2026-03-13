import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Platform, PostType, SavedHook, SavedMeat, SavedCTA, SavedCreator, UTMLink } from '@/types/smdashboard';
import { CONTENT_TYPES } from '@/types/smdashboard';
import { platformColor, tw } from '@/lib/design-tokens';
import {
  MOCK_SAVED_HOOKS,
  MOCK_SAVED_MEATS,
  MOCK_SAVED_CTAS,
  MOCK_SAVED_CREATORS,
  MOCK_PRODUCTS,
  STORE_LOGO_URL,
  STORE_NAME,
  STORE_DOMAIN,
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
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30"
                placeholder="Creator name" autoFocus />
            </div>
            <div>
              <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">Handle</label>
              <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30"
                placeholder="@handle" />
            </div>
          </>
        ) : (
          <div>
            <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">Script</label>
            <textarea value={script} onChange={(e) => setScript(e.target.value)} rows={3}
              className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30 resize-none"
              placeholder={`Enter your ${type} script...`} autoFocus />
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={onClose}
            className="flex-1 py-2 rounded-md text-sm text-zinc-400 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors">
            Cancel
          </button>
          <button
            onClick={() => {
              if (isCreator) { if (name.trim() && handle.trim()) onSave({ name: name.trim(), handle: handle.trim() }); }
              else { if (script.trim()) onSave({ script: script.trim() }); }
            }}
            className="flex-1 py-2 rounded-md text-sm font-semibold text-[#09090B] bg-[#00FF94] hover:bg-[#00E676] transition-colors">
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Collapsible Step Section ───────────────────────────────────────────────

interface StepSectionProps {
  step: number;
  title: string;
  summary?: string;
  isOpen: boolean;
  isComplete: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const StepSection: React.FC<StepSectionProps> = ({ step, title, summary, isOpen, isComplete, onToggle, children }) => (
  <div className={`${tw.card} overflow-hidden transition-all duration-200 ${isComplete && !isOpen ? 'border-[#00FF94]/20' : ''}`}>
    <button onClick={onToggle}
      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors">
      <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono font-bold flex-shrink-0 transition-colors ${
        isComplete ? 'bg-[#00FF94]/20 text-[#00FF94]' : 'bg-white/[0.06] text-zinc-400'
      }`}>
        {isComplete ? (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : step}
      </span>
      <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium flex-1">{title}</span>
      {summary && !isOpen && (
        <span className="text-[12px] text-zinc-300 truncate max-w-[280px] mr-2">{summary}</span>
      )}
      <svg className={`w-3.5 h-3.5 text-zinc-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 pt-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ─── Store Card (first option in product picker) ────────────────────────────

const StoreCard: React.FC<{ selected: boolean; onClick: () => void }> = ({ selected, onClick }) => (
  <button onClick={onClick}
    className={`w-full text-left rounded-lg p-3 transition-all duration-150 border flex items-center gap-4 ${
      selected ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.08]'
    }`}>
    <div className="w-12 h-12 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden flex-shrink-0">
      <img src={STORE_LOGO_URL} alt={STORE_NAME} className="w-10 h-10 object-contain"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[13px] text-white font-medium">{STORE_NAME} — Store Landing Page</p>
      <p className="text-[11px] text-zinc-500 mt-0.5">Track visits to your store homepage (not a specific product)</p>
    </div>
    {selected && (
      <span className="text-[10px] text-[#00FF94] font-mono px-2 py-0.5 rounded border border-[#00FF94]/30 bg-[#00FF94]/10 flex-shrink-0">selected</span>
    )}
  </button>
);

// ─── Product Card ───────────────────────────────────────────────────────────

const ProductCard: React.FC<{ product: MockProduct; selected: boolean; onClick: () => void }> = ({ product, selected, onClick }) => (
  <button onClick={onClick}
    className={`text-left rounded-lg p-3 transition-all duration-150 border ${
      selected ? 'bg-[#00FF94]/[0.04] border-[#00FF94]/40' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.08]'
    }`}>
    <div className="aspect-square rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-2.5 overflow-hidden">
      {product.featuredImageUrl ? (
        <img src={product.featuredImageUrl} alt={product.title} className="w-full h-full object-cover" />
      ) : (
        <span className="text-2xl font-semibold text-zinc-700">{product.title.charAt(0)}</span>
      )}
    </div>
    <p className="text-[13px] text-white font-medium leading-tight truncate">{product.title}</p>
    <div className="flex items-center justify-between mt-1.5">
      <span className="text-[13px] text-white font-mono">
        ${product.priceMin % 1 === 0 ? product.priceMin.toFixed(0) : product.priceMin.toFixed(2)}
      </span>
      <span className="text-[10px] text-zinc-600 font-mono">{product.totalInventory} in stock</span>
    </div>
  </button>
);

// ─── Live URL Preview (color-coded) ─────────────────────────────────────────

const LiveUrlPreview: React.FC<{ url: string }> = ({ url }) => {
  const urlObj = useMemo(() => {
    try {
      const u = new URL(url);
      return { base: `${u.origin}${u.pathname}`, params: Array.from(u.searchParams.entries()) };
    } catch {
      return { base: url, params: [] as [string, string][] };
    }
  }, [url]);

  return (
    <div className="p-3 rounded-md bg-white/[0.02] border border-white/[0.06]">
      <div className="text-[11px] font-mono leading-relaxed break-all">
        <span className="text-zinc-300">{urlObj.base}</span>
        {urlObj.params.length > 0 && (
          <>
            <span className="text-zinc-600">?</span>
            {urlObj.params.map(([key, val], i) => (
              <span key={`${key}-${i}`}>
                {i > 0 && <span className="text-zinc-600">&amp;</span>}
                <span className="text-[#00FF94]/70">{key}</span>
                <span className="text-zinc-600">=</span>
                <span className="text-white">{val}</span>
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// ─── Main View ──────────────────────────────────────────────────────────────

interface CreateLinkViewProps {
  onBack: () => void;
  onLinkCreated?: (link: UTMLink) => void;
}

const CreateLinkView: React.FC<CreateLinkViewProps> = ({ onBack, onLinkCreated }) => {
  const [step1Open, setStep1Open] = useState(true);
  const [step2Open, setStep2Open] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [storeSelected, setStoreSelected] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const [channel, setChannel] = useState<Platform>('tiktok');
  const [contentType, setContentType] = useState<PostType>('video');
  const [selectedCreator, setSelectedCreator] = useState<string | null>('cr-sarah');
  const [selectedHook, setSelectedHook] = useState<string | null>('hook-1');
  const [selectedMeat, setSelectedMeat] = useState<string | null>('meat-1');
  const [selectedCta, setSelectedCta] = useState<string | null>('cta-1');

  const [hooks, setHooks] = useState<SavedHook[]>(MOCK_SAVED_HOOKS);
  const [meats, setMeats] = useState<SavedMeat[]>(MOCK_SAVED_MEATS);
  const [ctas, setCtas] = useState<SavedCTA[]>(MOCK_SAVED_CTAS);
  const [creators, setCreators] = useState<SavedCreator[]>(MOCK_SAVED_CREATORS);

  const [createModal, setCreateModal] = useState<'hook' | 'meat' | 'cta' | 'creator' | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [contentUrl, setContentUrl] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_PRODUCTS;
    const q = searchQuery.toLowerCase();
    return MOCK_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [searchQuery]);

  const selectedProduct = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.id === selectedProductId) ?? null,
    [selectedProductId]
  );

  const step1Complete = storeSelected || !!selectedProduct || customUrl.trim().length > 0;

  const step1Summary = useMemo(() => {
    if (storeSelected) return `${STORE_NAME} — Store Landing Page`;
    if (selectedProduct) return selectedProduct.title;
    if (customUrl.trim()) return customUrl.trim();
    return '';
  }, [storeSelected, selectedProduct, customUrl]);

  const baseUrl = useMemo(() => {
    if (storeSelected) return `https://${STORE_DOMAIN}`;
    if (selectedProduct) return `https://${STORE_DOMAIN}/products/${selectedProduct.handle}`;
    if (customUrl.trim()) return customUrl.trim();
    return `https://${STORE_DOMAIN}`;
  }, [storeSelected, selectedProduct, customUrl]);

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

  const handleStoreSelect = useCallback(() => {
    setStoreSelected(true);
    setSelectedProductId(null);
    setCustomUrl('');
    setStep1Open(false);
    setStep2Open(true);
  }, []);

  const handleProductSelect = useCallback((id: string) => {
    if (selectedProductId === id) { setSelectedProductId(null); return; }
    setSelectedProductId(id);
    setStoreSelected(false);
    setCustomUrl('');
    setStep1Open(false);
    setStep2Open(true);
  }, [selectedProductId]);

  const handleCustomUrlChange = useCallback((url: string) => {
    setCustomUrl(url);
    if (url.trim()) { setStoreSelected(false); setSelectedProductId(null); }
  }, []);

  const handleCustomUrlConfirm = useCallback(() => {
    if (customUrl.trim()) { setStep1Open(false); setStep2Open(true); }
  }, [customUrl]);

  function handleCopy() {
    navigator.clipboard.writeText(generatedUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSave() {
    const newLink: UTMLink = {
      id: `link-${Date.now()}`,
      platform: channel,
      content_type: contentType,
      product_url: storeSelected ? null : baseUrl,
      full_url: generatedUrl,
      content_post_url: contentUrl.trim() || null,
      status: 'active',
      created_at: new Date().toISOString(),
      creator_name: creator?.name || 'Unknown',
      creator_username: creator?.handle.replace('@', '') || 'unknown',
      total_revenue: 0,
      total_orders: 0,
    };
    onLinkCreated?.(newLink);
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack(); }, 1200);
  }

  function handleCreateSave(data: { script: string } | { name: string; handle: string }) {
    if (createModal === 'creator' && 'name' in data) {
      const nc: SavedCreator = { id: `cr-new-${Date.now()}`, name: data.name, handle: data.handle.startsWith('@') ? data.handle : `@${data.handle}`, avatar: '', platforms: [channel] };
      setCreators((p) => [...p, nc]);
      setSelectedCreator(nc.id);
    } else if ('script' in data) {
      const ss = data.script.length > 40 ? data.script.slice(0, 40) + '...' : data.script;
      if (createModal === 'hook') {
        const n = hooks.length > 0 ? Math.max(...hooks.map((h) => h.number)) + 1 : 1;
        const nh: SavedHook = { id: `hook-${n}`, number: n, scriptStart: ss, fullScript: data.script, createdAt: new Date().toISOString() };
        setHooks((p) => [...p, nh]); setSelectedHook(nh.id);
      } else if (createModal === 'meat') {
        const n = meats.length > 0 ? Math.max(...meats.map((m) => m.number)) + 1 : 1;
        const nm: SavedMeat = { id: `meat-${n}`, number: n, scriptStart: ss, fullScript: data.script, createdAt: new Date().toISOString() };
        setMeats((p) => [...p, nm]); setSelectedMeat(nm.id);
      } else if (createModal === 'cta') {
        const n = ctas.length > 0 ? Math.max(...ctas.map((c) => c.number)) + 1 : 1;
        const nc: SavedCTA = { id: `cta-${n}`, number: n, scriptStart: ss, fullScript: data.script, createdAt: new Date().toISOString() };
        setCtas((p) => [...p, nc]); setSelectedCta(nc.id);
      }
    }
    setCreateModal(null);
  }

  const hookOptions: DropdownOption[] = hooks.map((h) => ({ id: h.id, label: `#${h.number}: ${h.scriptStart}` }));
  const meatOptions: DropdownOption[] = meats.map((m) => ({ id: m.id, label: `#${m.number}: ${m.scriptStart}` }));
  const ctaOptions: DropdownOption[] = ctas.map((c) => ({ id: c.id, label: `#${c.number}: ${c.scriptStart}` }));
  const creatorOptions: DropdownOption[] = creators.map((c) => ({ id: c.id, label: c.name, sublabel: c.handle, avatar: c.avatar }));
  const contentTypeOptions = CONTENT_TYPES[channel] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }} className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-6 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Links
          </button>
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">Create Tracked Link</h2>
          <div className="w-24" />
        </div>

        <div className="space-y-3">
          {/* ── STEP 1: Choose Destination ── */}
          <StepSection step={1} title="Choose Destination" summary={step1Summary}
            isOpen={step1Open} isComplete={step1Complete} onToggle={() => setStep1Open(!step1Open)}>
            <div className="mb-4">
              <StoreCard selected={storeSelected} onClick={handleStoreSelect} />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] text-zinc-600 uppercase tracking-wider">or choose a product</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <div className="relative mb-3">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30"
                placeholder="Search products..." />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} selected={selectedProductId === product.id}
                  onClick={() => handleProductSelect(product.id)} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-6"><p className="text-sm text-zinc-600">No products match your search</p></div>
            )}

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] text-zinc-600 uppercase tracking-wider">or enter custom URL</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <div className="flex gap-2">
              <input type="url" value={customUrl} onChange={(e) => handleCustomUrlChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomUrlConfirm()}
                className="flex-1 px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30 font-mono"
                placeholder="https://your-store.com/products/..." />
              {customUrl.trim() && (
                <button onClick={handleCustomUrlConfirm}
                  className="px-4 py-2 rounded-md text-[11px] font-semibold text-[#09090B] bg-[#00FF94] hover:bg-[#00E676] transition-colors">
                  Use URL
                </button>
              )}
            </div>
          </StepSection>

          {/* ── STEP 2: Configure Content ── */}
          <StepSection step={2} title="Content Details"
            summary={step1Complete ? `${channel} / ${contentType} / ${creator?.name || 'No creator'}` : ''}
            isOpen={step2Open} isComplete={step1Complete && !!creator}
            onToggle={() => step1Complete && setStep2Open(!step2Open)}>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">Channel</label>
                <div className="flex gap-1.5">
                  {(['tiktok', 'instagram', 'youtube'] as Platform[]).map((p) => (
                    <button key={p}
                      onClick={() => { setChannel(p); const t = CONTENT_TYPES[p]; if (t?.length) setContentType(t[0].id); }}
                      className={`px-3.5 py-1.5 rounded-md text-[11px] font-medium transition-all ${channel === p ? 'text-white' : 'text-zinc-500 hover:text-zinc-300 bg-white/[0.02]'}`}
                      style={channel === p
                        ? { backgroundColor: `${platformColor(p)}20`, color: platformColor(p), border: `1px solid ${platformColor(p)}40` }
                        : { border: '1px solid rgba(255,255,255,0.06)' }}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">Type</label>
                <div className="flex gap-1.5">
                  {contentTypeOptions.map((ct) => (
                    <button key={ct.id} onClick={() => setContentType(ct.id)}
                      className={`px-3.5 py-1.5 rounded-md text-[11px] font-medium transition-all border ${
                        contentType === ct.id ? 'text-white bg-white/[0.06] border-white/[0.15]' : 'text-zinc-500 hover:text-zinc-300 bg-white/[0.02] border-white/[0.06]'
                      }`}>
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <InlineDropdown label="Creator" options={creatorOptions} value={selectedCreator}
                onChange={setSelectedCreator} onCreateNew={() => setCreateModal('creator')}
                createLabel="Connect New Creator" placeholder="Select creator..." />

              <div className="h-px bg-white/[0.06]" />
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">Content Script</p>

              <InlineDropdown label="Hook" options={hookOptions} value={selectedHook}
                onChange={setSelectedHook} onCreateNew={() => setCreateModal('hook')}
                createLabel="Create New Hook" placeholder="Select hook..." />

              <InlineDropdown label="Meat" options={meatOptions} value={selectedMeat}
                onChange={setSelectedMeat} onCreateNew={() => setCreateModal('meat')}
                createLabel="Create New Meat" placeholder="Select meat..." />

              <InlineDropdown label="CTA" options={ctaOptions} value={selectedCta}
                onChange={setSelectedCta} onCreateNew={() => setCreateModal('cta')}
                createLabel="Create New CTA" placeholder="Select CTA..." />
            </div>
          </StepSection>

          {/* ── GENERATED URL + ACTIONS ── */}
          {step1Complete && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
              <div className={`${tw.card} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Tracking URL</label>
                  <span className="text-[10px] text-zinc-600 font-mono">Live preview</span>
                </div>

                <LiveUrlPreview url={generatedUrl} />

                <div className="mt-4">
                  <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
                    Content Post URL <span className="text-zinc-600 normal-case">(optional)</span>
                  </label>
                  <input type="url" value={contentUrl} onChange={(e) => setContentUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30 font-mono"
                    placeholder="https://tiktok.com/@creator/video/..." />
                  <p className="text-[10px] text-zinc-600 mt-1">Paste the URL of the published post to connect attribution data</p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button onClick={handleCopy}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-300 transition-colors flex items-center justify-center gap-2">
                    {copied ? (
                      <><svg className="w-3.5 h-3.5 text-[#00FF94]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Copied!</>
                    ) : (
                      <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>Copy Link</>
                    )}
                  </button>
                  <button onClick={handleSave}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-[#00FF94] text-[#09090B] hover:bg-[#00E676] transition-colors flex items-center justify-center gap-2">
                    {saved ? (
                      <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Saved!</>
                    ) : 'Create & Save'}
                  </button>
                </div>

                <p className="text-[10px] text-zinc-600 text-center mt-3">Demo mode — link will be saved to your session</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {createModal && <CreateModal type={createModal} onClose={() => setCreateModal(null)} onSave={handleCreateSave} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default CreateLinkView;
