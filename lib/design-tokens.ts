// Design tokens for the demo dashboard
// Single source of truth for colors and Tailwind patterns

export const colors = {
  bg: '#09090B',
  surface: '#111113',
  surfaceHover: '#18181B',
  border: 'rgba(255,255,255,0.06)',
  borderHover: 'rgba(255,255,255,0.1)',
  text: '#FAFAFA',
  textSecondary: '#71717A',
  textTertiary: '#3F3F46',
  brand: '#00FF94',
  brandDim: 'rgba(0,255,148,0.1)',
  tiktok: '#00F2EA',
  instagram: '#E1306C',
  youtube: '#FF0000',
} as const;

export const tw = {
  card: 'bg-white/[0.02] border border-white/[0.06] rounded-lg',
  cardHover: 'hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200',
  label: 'text-[11px] text-zinc-500 uppercase tracking-wider font-medium',
  value: 'text-2xl font-bold text-white font-mono',
  valueSm: 'text-lg font-semibold text-white font-mono',
  delta: (up: boolean) => (up ? 'text-emerald-400' : 'text-red-400'),
  separator: 'border-t border-white/[0.06]',
} as const;

export function platformColor(platform: string): string {
  const map: Record<string, string> = {
    tiktok: colors.tiktok,
    instagram: colors.instagram,
    youtube: colors.youtube,
  };
  return map[platform] || colors.brand;
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function formatDelta(d: number): string {
  const sign = d >= 0 ? '+' : '';
  return `${sign}${d.toFixed(1)}%`;
}
