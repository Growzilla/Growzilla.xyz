import React, { useState, useRef, useEffect } from 'react';
import type { Platform, PostType, SavedHook, SavedMeat, SavedCTA, SavedCreator } from '@/types/smdashboard';
import { CONTENT_TYPES } from '@/types/smdashboard';
import { platformColor } from '@/lib/design-tokens';
import {
  MOCK_SAVED_HOOKS,
  MOCK_SAVED_MEATS,
  MOCK_SAVED_CTAS,
  MOCK_SAVED_CREATORS,
} from '@/data/mockSMData';

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
      <div className="bg-[#151518] border border-white/[0.08] rounded-xl w-80 p-5 space-y-4" onClick={(e) => e.stopPropagation()}>
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
      </div>
    </div>
  );
};

// ─── Main Panel ─────────────────────────────────────────────────────────────

const UTMGeneratorPanel: React.FC = () => {
  // Saved data (in production, fetched from backend)
  const [hooks, setHooks] = useState<SavedHook[]>(MOCK_SAVED_HOOKS);
  const [meats, setMeats] = useState<SavedMeat[]>(MOCK_SAVED_MEATS);
  const [ctas, setCtas] = useState<SavedCTA[]>(MOCK_SAVED_CTAS);
  const [creators, setCreators] = useState<SavedCreator[]>(MOCK_SAVED_CREATORS);

  // Selected values
  const [channel, setChannel] = useState<Platform>('tiktok');
  const [contentType, setContentType] = useState<PostType>('video');
  const [selectedHook, setSelectedHook] = useState<string | null>('hook-1');
  const [selectedMeat, setSelectedMeat] = useState<string | null>('meat-1');
  const [selectedCta, setSelectedCta] = useState<string | null>('cta-1');
  const [selectedCreator, setSelectedCreator] = useState<string | null>('cr-sarah');

  // Modal state
  const [createModal, setCreateModal] = useState<'hook' | 'meat' | 'cta' | 'creator' | null>(null);
  const [copied, setCopied] = useState(false);

  // Build URL with number equivalents
  const hookNum = hooks.find((h) => h.id === selectedHook)?.number;
  const meatNum = meats.find((m) => m.id === selectedMeat)?.number;
  const ctaNum = ctas.find((c) => c.id === selectedCta)?.number;
  const creator = creators.find((c) => c.id === selectedCreator);

  const params = new URLSearchParams({
    utm_source: channel,
    utm_medium: 'social',
    utm_content: contentType,
    ...(creator && { utm_creator: creator.handle.replace('@', '') }),
    ...(hookNum && { utm_hook: String(hookNum) }),
    ...(meatNum && { utm_meat: String(meatNum) }),
    ...(ctaNum && { utm_cta: String(ctaNum) }),
  });

  const generatedUrl = `https://glowserum.com?${params.toString()}`;

  function handleCopy() {
    navigator.clipboard.writeText(generatedUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  // Build dropdown options
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
    <div className="space-y-3">
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
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${
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
              {p}
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
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all border ${
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

      {/* Divider */}
      <div className="h-px bg-white/[0.06] mt-1" />

      {/* Generated URL */}
      <div>
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
          Generated URL
        </label>
        <div className="p-3 rounded-md bg-white/[0.02] border border-white/[0.06] break-all">
          <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">{generatedUrl}</p>
        </div>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="w-full py-2.5 rounded-lg bg-[#00FF94] text-[#09090B] text-sm font-semibold hover:bg-[#00E676] transition-colors"
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <p className="text-[10px] text-zinc-600 text-center">
        Demo mode — links are not tracked
      </p>

      {/* Create Modal */}
      {createModal && (
        <CreateModal
          type={createModal}
          onClose={() => setCreateModal(null)}
          onSave={handleCreateSave}
        />
      )}
    </div>
  );
};

export default UTMGeneratorPanel;
