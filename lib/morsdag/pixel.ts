/**
 * Morsdag funnel — Meta Pixel event helpers.
 *
 * Safe to call from any client component: silently no-ops if fbq isn't loaded
 * (SSR, ad blockers, pixel script not mounted yet).
 *
 * Standard events get richer auto-optimization (Meta normalizes them across the
 * platform), so we use `Lead`, `InitiateCheckout`, `Purchase` where applicable.
 * Custom events use `trackCustom` and are surfaced in Events Manager → Custom.
 */

type Fbq = (...args: unknown[]) => void;

function getFbq(): Fbq | null {
  if (typeof window === 'undefined') return null;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof fbq === 'function' ? fbq : null;
}

export type MorsdagRoute = 'good' | 'maybe' | 'bad';

/** Standard `Lead` event — fires on Step 9 submit when route is good or maybe. */
export function trackLead(route: MorsdagRoute, score: number, leadId?: string): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('track', 'Lead', {
    value: 20000,
    currency: 'SEK',
    content_name: 'Morsdag Launch',
    content_category: 'service',
    status: route,
    score,
    eventID: leadId, // Meta dedupe key for client+server CAPI alignment
  });
}

/** Custom event for unqualified leads — useful for negative-signal audiences. */
export function trackDisqualified(score: number): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', 'MorsdagQuizDisqualified', { score });
}

/** Custom event when the quiz mounts. Mid-funnel signal between PageView and Lead. */
export function trackQuizStart(): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', 'MorsdagQuizStart');
}

/** Custom event when Step 1 contact validates and partial lead is captured. */
export function trackPartialLead(leadId?: string): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', 'MorsdagPartialLead', { eventID: leadId });
}

/** Custom event when the Calendly CTA is clicked from ResultGood. */
export function trackBookCall(): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', 'MorsdagBookCallClick', {
    value: 20000,
    currency: 'SEK',
  });
}

/** Standard `InitiateCheckout` — fires on checkout page mount. */
export function trackInitiateCheckout(args: {
  value: number;
  currency: 'SEK' | 'EUR';
  variant: 'card' | 'bank';
}): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('track', 'InitiateCheckout', {
    value: args.value,
    currency: args.currency,
    content_name: `Morsdag Launch (${args.variant})`,
    content_category: 'service',
  });
}

/** Standard `Purchase` — fires on checkout success page (Whop returnUrl). */
export function trackPurchase(args: {
  value: number;
  currency: 'SEK' | 'EUR';
  variant: 'card' | 'bank';
}): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('track', 'Purchase', {
    value: args.value,
    currency: args.currency,
    content_name: `Morsdag Launch (${args.variant})`,
    content_category: 'service',
  });
}
