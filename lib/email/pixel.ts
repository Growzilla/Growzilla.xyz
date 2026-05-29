/**
 * /email funnel — Meta Pixel event helpers.
 * Mirrors lib/morsdag/pixel.ts. Silently no-ops if fbq isn't loaded.
 */

type Fbq = (...args: unknown[]) => void;

function getFbq(): Fbq | null {
  if (typeof window === 'undefined') return null;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof fbq === 'function' ? fbq : null;
}

export type EmailRoute = 'good' | 'maybe' | 'bad';

export function trackEmailLead(route: EmailRoute, score: number, floorUsd: number, leadId?: string): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('track', 'Lead', {
    value: floorUsd,
    currency: 'USD',
    content_name: 'Email Reactivation Sprint',
    content_category: 'service',
    status: route,
    score,
    eventID: leadId,
  });
}

export function trackEmailDisqualified(score: number): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', 'EmailQuizDisqualified', { score });
}

export function trackEmailQuizStart(): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', 'EmailQuizStart');
}

export function trackEmailPartialLead(leadId?: string): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', 'EmailPartialLead', { eventID: leadId });
}

export function trackEmailBookCall(): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('trackCustom', 'EmailBookCallClick', { value: 500, currency: 'USD' });
}

export function trackEmailInitiateCheckout(): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('track', 'InitiateCheckout', {
    value: 500,
    currency: 'USD',
    content_name: 'Email Reactivation Sprint',
    content_category: 'service',
  });
}

export function trackEmailPurchase(): void {
  const fbq = getFbq();
  if (!fbq) return;
  fbq('track', 'Purchase', {
    value: 500,
    currency: 'USD',
    content_name: 'Email Reactivation Sprint',
    content_category: 'service',
  });
}
