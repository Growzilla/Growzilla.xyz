'use client';

/**
 * <CreateLinkModal />
 * ===================
 * Single-pane Linear-style modal for creating a tracked link.
 * Closes the I3 gate of the install→demo pipeline.
 *
 * Spec: /dev/growzillaAssets/patterns/syncduringinstall.md §7
 *
 * UX
 *  - Vertical stack: product combobox → platform → format → creator (opt) →
 *    hook (opt) → CTA → live preview → submit.
 *  - Cmd/Ctrl+Enter submits, Esc closes, focus trap inside modal, focus
 *    restored to opener on close.
 *  - Submit DISABLED unless `syncStatus.products.status === 'done'` (I3 gate).
 *    Tooltip when disabled shows `Syncing products (count/total)`.
 *  - On success: shows short URL + [Copy link] + [Mark as posted] flow.
 *    Mark-as-posted fires PATCH /api/utm/links/{id} { post_url } and closes.
 *  - On error: <ErrorCard> rendered above the form; modal stays open.
 *
 * Why `syncStatus` is a PROP (not a hook call):
 *   fe-ui's `useSyncStatus` hook isn't shipped yet. By accepting the shape as
 *   a prop, the modal is testable today and the parent can swap polling
 *   sources (hook / static / mock) without modal changes.
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'x';
export type ContentFormat = 'reel' | 'post' | 'story' | 'short';
export type CTA = 'ShopNow' | 'OrderNow' | 'LearnMore' | 'GetOffer';

/**
 * Mirrors backend `GET /api/shops/{shop_id}/sync/status` (S32 spec §6.1).
 * Status values are be-api's union (`pending|running|done|error`); legacy
 * `'idle'` accepted defensively for any pre-S32 caller — treated as 'pending'.
 */
export interface SyncStatusShape {
  products: {
    status: 'pending' | 'running' | 'done' | 'error' | 'idle';
    count: number;
    total: number | null;
    syncedAt?: string | null;
  };
  orders?: {
    status: 'pending' | 'running' | 'done' | 'error' | 'idle';
    count: number;
    total: number | null;
    syncedAt?: string | null;
  };
  error?: { id: string; code: string; message: string } | null;
}

export interface ProductOption {
  id: string;
  title: string;
  handle: string;
  image_url?: string | null;
}

export interface ApiError {
  id?: string;
  code?: string;
  message: string;
  file?: string;
  line?: number;
}

export interface CreateLinkModalProps {
  open: boolean;
  onClose: () => void;
  shopId: string;
  syncStatus: SyncStatusShape;
  /** Override the products fetch (for tests / mock mode). Defaults to /api/shops/{id}/products. */
  fetchProducts?: (shopId: string) => Promise<ProductOption[]>;
  /** Optional callback invoked with the new short_url after a successful create. */
  onCreated?: (result: { id: string; short_code: string; short_url: string }) => void;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const PLATFORMS: Array<{ id: Platform; label: string }> = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'x', label: 'X' },
];

const FORMATS: Array<{ id: ContentFormat; label: string }> = [
  { id: 'reel', label: 'Reel' },
  { id: 'post', label: 'Post' },
  { id: 'story', label: 'Story' },
  { id: 'short', label: 'Short' },
];

const CTAS: Array<{ id: CTA; label: string }> = [
  { id: 'ShopNow', label: 'Shop now' },
  { id: 'OrderNow', label: 'Order now' },
  { id: 'LearnMore', label: 'Learn more' },
  { id: 'GetOffer', label: 'Get offer' },
];

const API_BASE =
  process.env.NEXT_PUBLIC_ECOMDASH_API_URL ||
  process.env.ECOMDASH_API_URL ||
  '';

const PRODUCT_CACHE = new Map<string, { ts: number; products: ProductOption[] }>();
const PRODUCT_CACHE_TTL_MS = 5 * 60 * 1000;

// ─── Helpers ────────────────────────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('gz_token');
}

async function defaultFetchProducts(shopId: string): Promise<ProductOption[]> {
  const cached = PRODUCT_CACHE.get(shopId);
  if (cached && Date.now() - cached.ts < PRODUCT_CACHE_TTL_MS) {
    return cached.products;
  }
  const headers: Record<string, string> = { Accept: 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(
    `${API_BASE}/api/shops/${encodeURIComponent(shopId)}/products?limit=200`,
    { headers }
  );
  if (!res.ok) {
    const env = await tryParseError(res);
    throw env;
  }
  const json = await res.json();
  const items: ProductOption[] = (json?.items || json?.products || json || [])
    .map((p: Record<string, unknown>) => ({
      id: String(p.id),
      title: String(p.title || p.name || 'Untitled product'),
      handle: String(p.handle || ''),
      image_url:
        (p.featured_image_url as string | null | undefined) ??
        (p.image_url as string | null | undefined) ??
        null,
    }))
    .filter((p: ProductOption) => p.id);
  PRODUCT_CACHE.set(shopId, { ts: Date.now(), products: items });
  return items;
}

async function tryParseError(res: Response): Promise<ApiError> {
  try {
    const j = await res.json();
    if (j?.error) return j.error as ApiError;
    return { message: typeof j?.message === 'string' ? j.message : `HTTP ${res.status}` };
  } catch {
    return { message: `HTTP ${res.status}` };
  }
}

function fuzzyMatch(needle: string, haystack: string): boolean {
  if (!needle) return true;
  const n = needle.toLowerCase();
  const h = haystack.toLowerCase();
  let i = 0;
  for (const ch of h) {
    if (ch === n[i]) i++;
    if (i === n.length) return true;
  }
  // Also accept simple substring as a fallback (more forgiving than strict subseq)
  return h.includes(n);
}

// ─── Component ──────────────────────────────────────────────────────────────

const CreateLinkModal: React.FC<CreateLinkModalProps> = ({
  open,
  onClose,
  shopId,
  syncStatus,
  fetchProducts,
  onCreated,
}) => {
  // Form state
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productQuery, setProductQuery] = useState('');
  const [productOpen, setProductOpen] = useState(false);
  const [productHighlight, setProductHighlight] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null);
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [format, setFormat] = useState<ContentFormat>('reel');
  const [creator, setCreator] = useState('');
  const [hook, setHook] = useState('');
  const [cta, setCta] = useState<CTA>('ShopNow');

  // Lifecycle / submission state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [created, setCreated] = useState<{
    id: string;
    short_code: string;
    short_url: string;
  } | null>(null);
  const [postUrl, setPostUrl] = useState('');
  const [copying, setCopying] = useState(false);

  // Refs for focus management + click-outside
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // I3 gate: submit disabled until products are done
  const productsDone = syncStatus?.products?.status === 'done';
  const syncCount = syncStatus?.products?.count ?? 0;
  const syncTotal = syncStatus?.products?.total ?? 0;
  const gateTooltip = productsDone
    ? ''
    : `Syncing products (${syncCount}/${syncTotal || '…'})`;

  // ─── Open: load products, focus first input, capture focus to restore on close ─
  useEffect(() => {
    if (!open) return;
    if (typeof document !== 'undefined') {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
    }
    setError(null);
    setCreated(null);

    let cancelled = false;
    setProductsLoading(true);
    const fetcher = fetchProducts || defaultFetchProducts;
    fetcher(shopId)
      .then((items) => {
        if (cancelled) return;
        setProducts(items);
      })
      .catch((err: ApiError) => {
        if (cancelled) return;
        setError(err && err.message ? err : { message: 'Could not load products' });
      })
      .finally(() => {
        if (!cancelled) setProductsLoading(false);
      });

    // Defer focus to next tick so the modal is in the DOM.
    const f = setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => {
      cancelled = true;
      clearTimeout(f);
    };
  }, [open, shopId, fetchProducts]);

  // Restore focus on close
  useEffect(() => {
    if (open) return;
    restoreFocusRef.current?.focus?.();
  }, [open]);

  // ─── Keyboard: Esc closes; Cmd/Ctrl+Enter submits ───────────────────────────
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        // Trigger form submission if able
        formSubmitRef.current?.();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // ─── Filtered products + memoized preview ──────────────────────────────────
  const filtered = useMemo(() => {
    if (!productQuery) return products.slice(0, 50);
    return products.filter((p) => fuzzyMatch(productQuery, `${p.title} ${p.handle}`)).slice(0, 50);
  }, [products, productQuery]);

  const previewShort = useMemo(() => {
    if (created?.short_url) return created.short_url;
    return 'growzilla.xyz/l/<short>';
  }, [created]);

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const formSubmitRef = useRef<(() => void) | null>(null);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!productsDone || submitting) return;
      if (!selectedProduct) {
        setError({ message: 'Pick a product to track.' });
        return;
      }

      setSubmitting(true);
      setError(null);
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`;

        const body = {
          shop_id: shopId,
          product_id: selectedProduct.id,
          platform,
          content_type: format,
          creator_handle: creator || null,
          hook_text: hook || null,
          cta_text: cta,
        };

        const res = await fetch(`${API_BASE}/api/utm/links`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const env = await tryParseError(res);
          throw env;
        }
        const json = await res.json();
        const result = {
          id: String(json.id ?? json.link_id ?? ''),
          short_code: String(json.short_code ?? ''),
          short_url: String(json.short_url ?? ''),
        };
        setCreated(result);
        onCreated?.(result);
      } catch (err) {
        const apiErr = err as ApiError;
        setError(apiErr && apiErr.message ? apiErr : { message: 'Failed to create link' });
      } finally {
        setSubmitting(false);
      }
    },
    [
      productsDone,
      submitting,
      selectedProduct,
      shopId,
      platform,
      format,
      creator,
      hook,
      cta,
      onCreated,
    ]
  );

  formSubmitRef.current = () => {
    void handleSubmit();
  };

  // ─── Copy short link ────────────────────────────────────────────────────────
  const onCopy = useCallback(async () => {
    if (!created?.short_url) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(created.short_url);
    } catch {
      // Fall back: select-text alternative not implemented; failure is silent.
    } finally {
      window.setTimeout(() => setCopying(false), 1500);
    }
  }, [created]);

  // ─── Mark-as-posted PATCH ───────────────────────────────────────────────────
  const onMarkPosted = useCallback(async () => {
    if (!created?.id) return;
    if (!postUrl.trim()) {
      setError({ message: 'Paste the post URL first.' });
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      const token = getToken();
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(
        `${API_BASE}/api/utm/links/${encodeURIComponent(created.id)}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ post_url: postUrl.trim() }),
        }
      );
      if (!res.ok) {
        const env = await tryParseError(res);
        throw env;
      }
      onClose();
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr && apiErr.message ? apiErr : { message: 'PATCH failed' });
    } finally {
      setSubmitting(false);
    }
  }, [created, postUrl, onClose]);

  if (!open) return null;

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-link-modal-title"
      onMouseDown={(e) => {
        // Click on backdrop closes modal; clicks inside don't bubble.
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ background: 'rgba(0,0,0,0.55)' }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-[560px] rounded-xl"
        style={{
          background: '#0A0A0B',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            <h2
              id="create-link-modal-title"
              className="text-[15px] font-semibold leading-tight text-white"
            >
              Create tracking link
            </h2>
            <p className="mt-0.5 text-[11px] text-white/45">
              ⌘↵ to create · Esc to close
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white/80 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {/* Error envelope */}
          {error && <ErrorCard err={error} />}

          {/* If created, switch to the post-create state */}
          {!created && (
            <>
              {/* Product combobox */}
              <Field label="Product">
                <div className="relative">
                  <input
                    ref={firstFieldRef}
                    type="text"
                    value={selectedProduct ? selectedProduct.title : productQuery}
                    onChange={(e) => {
                      setSelectedProduct(null);
                      setProductQuery(e.target.value);
                      setProductOpen(true);
                      setProductHighlight(0);
                    }}
                    onFocus={() => setProductOpen(true)}
                    onBlur={() => window.setTimeout(() => setProductOpen(false), 120)}
                    onKeyDown={(e) => {
                      if (!productOpen) return;
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setProductHighlight((h) => Math.min(filtered.length - 1, h + 1));
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setProductHighlight((h) => Math.max(0, h - 1));
                      } else if (e.key === 'Enter' && filtered[productHighlight]) {
                        e.preventDefault();
                        setSelectedProduct(filtered[productHighlight]);
                        setProductQuery('');
                        setProductOpen(false);
                      }
                    }}
                    placeholder={
                      productsLoading
                        ? 'Loading products…'
                        : products.length
                        ? 'Search products by title or handle'
                        : 'No products yet'
                    }
                    className="w-full rounded-md px-3 py-2 text-[13px] text-white placeholder:text-white/30 outline-none"
                    style={{
                      background: '#151518',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  />
                  {productOpen && filtered.length > 0 && (
                    <div
                      className="absolute left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-md z-10"
                      style={{
                        background: '#0A0A0B',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.6)',
                      }}
                    >
                      {filtered.map((p, i) => (
                        <button
                          type="button"
                          key={p.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSelectedProduct(p);
                            setProductQuery('');
                            setProductOpen(false);
                          }}
                          onMouseEnter={() => setProductHighlight(i)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left text-[13px]"
                          style={{
                            background:
                              i === productHighlight ? 'rgba(0,255,148,0.06)' : 'transparent',
                            color: 'rgba(255,255,255,0.9)',
                          }}
                        >
                          {p.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image_url}
                              alt=""
                              className="w-7 h-7 rounded object-cover"
                              style={{ background: '#222' }}
                            />
                          ) : (
                            <div
                              className="w-7 h-7 rounded"
                              style={{ background: 'rgba(255,255,255,0.06)' }}
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="truncate">{p.title}</div>
                            <div className="truncate text-[11px] text-white/40">
                              {p.handle || p.id}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Field>

              {/* Platform chips */}
              <Field label="Platform">
                <ChipGroup
                  options={PLATFORMS}
                  value={platform}
                  onChange={(v) => setPlatform(v as Platform)}
                />
              </Field>

              {/* Format chips */}
              <Field label="Format">
                <ChipGroup
                  options={FORMATS}
                  value={format}
                  onChange={(v) => setFormat(v as ContentFormat)}
                />
              </Field>

              {/* Creator (optional) */}
              <Field label="Creator handle" hint="optional">
                <input
                  type="text"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value.replace(/^@/, ''))}
                  placeholder="@handle"
                  className="w-full rounded-md px-3 py-2 text-[13px] text-white placeholder:text-white/30 outline-none"
                  style={{
                    background: '#151518',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />
              </Field>

              {/* Hook (optional) */}
              <Field label="Hook" hint="2–8 words, optional">
                <input
                  type="text"
                  value={hook}
                  onChange={(e) => setHook(e.target.value)}
                  placeholder="POV: you just discovered…"
                  className="w-full rounded-md px-3 py-2 text-[13px] text-white placeholder:text-white/30 outline-none"
                  style={{
                    background: '#151518',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />
              </Field>

              {/* CTA chips */}
              <Field label="CTA">
                <ChipGroup options={CTAS} value={cta} onChange={(v) => setCta(v as CTA)} />
              </Field>

              {/* Live preview */}
              <Field label="Preview">
                <div
                  className="rounded-md px-3 py-2 text-[12px] font-mono"
                  style={{
                    background: '#151518',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(0,255,148,0.85)',
                  }}
                >
                  {previewShort}
                </div>
              </Field>

              {/* Submit */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-white/45">{gateTooltip}</span>
                <button
                  type="submit"
                  disabled={!productsDone || submitting}
                  title={gateTooltip || ''}
                  className="rounded-md px-4 py-2 text-[13px] font-semibold text-black"
                  style={{
                    background: !productsDone || submitting ? 'rgba(0,255,148,0.30)' : '#00FF94',
                    cursor: !productsDone || submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? 'Creating…' : 'Create link'}
                </button>
              </div>
            </>
          )}

          {/* Created state — copy + mark-as-posted */}
          {created && (
            <div className="space-y-3">
              <div
                className="rounded-md px-3 py-2 text-[12px] font-mono break-all"
                style={{
                  background: '#151518',
                  border: '1px solid rgba(0,255,148,0.25)',
                  color: 'rgba(0,255,148,0.95)',
                }}
              >
                {created.short_url}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onCopy}
                  className="rounded-md px-3 py-2 text-[12px] font-semibold"
                  style={{
                    background: copying ? 'rgba(0,255,148,0.18)' : 'rgba(255,255,255,0.06)',
                    color: copying ? '#00FF94' : 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {copying ? 'Copied' : 'Copy link'}
                </button>
              </div>

              <div className="pt-2">
                <Field label="Post URL" hint="paste after you publish">
                  <input
                    type="url"
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/…"
                    className="w-full rounded-md px-3 py-2 text-[13px] text-white placeholder:text-white/30 outline-none"
                    style={{
                      background: '#151518',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  />
                </Field>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-3 py-2 text-[12px]"
                  style={{
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  Done later
                </button>
                <button
                  type="button"
                  onClick={onMarkPosted}
                  disabled={submitting || !postUrl.trim()}
                  className="rounded-md px-4 py-2 text-[13px] font-semibold text-black"
                  style={{
                    background: submitting || !postUrl.trim() ? 'rgba(0,255,148,0.3)' : '#00FF94',
                    cursor: submitting || !postUrl.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? 'Saving…' : 'Mark as posted'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// ─── Subcomponents ──────────────────────────────────────────────────────────

const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({
  label,
  hint,
  children,
}) => (
  <label className="block">
    <span className="flex items-baseline justify-between mb-1">
      <span className="text-[11px] uppercase tracking-[0.10em] text-white/55">{label}</span>
      {hint && <span className="text-[10px] text-white/35">{hint}</span>}
    </span>
    {children}
  </label>
);

interface ChipGroupProps<T extends string> {
  options: Array<{ id: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
}

function ChipGroup<T extends string>({ options, value, onChange }: ChipGroupProps<T>) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            type="button"
            key={o.id}
            onClick={() => onChange(o.id)}
            className="rounded-md px-2.5 py-1.5 text-[12px]"
            style={{
              background: active ? 'rgba(0,255,148,0.10)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${active ? 'rgba(0,255,148,0.40)' : 'rgba(255,255,255,0.08)'}`,
              color: active ? '#00FF94' : 'rgba(255,255,255,0.75)',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const ErrorCard: React.FC<{ err: ApiError }> = ({ err }) => {
  const copy = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify({ error: err }, null, 2));
    } catch {
      /* swallow — clipboard unavailable */
    }
  };
  return (
    <div
      className="rounded-md p-3 text-[12px]"
      style={{
        background: 'rgba(244,114,114,0.06)',
        border: '1px solid rgba(244,114,114,0.25)',
        color: '#F87171',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <code className="font-mono">
          {(err.id ? `${err.id} · ` : '') + (err.code || 'Error')}
        </code>
        <button
          type="button"
          onClick={copy}
          className="text-[11px] underline underline-offset-2 text-red-300 hover:text-red-200"
        >
          Copy error
        </button>
      </div>
      <p className="mt-1 text-red-200/85">{err.message}</p>
      {err.file && (
        <p className="mt-1 text-[10px] text-red-300/60 font-mono">
          {err.file}
          {typeof err.line === 'number' ? `:${err.line}` : ''}
        </p>
      )}
    </div>
  );
};

export default CreateLinkModal;
