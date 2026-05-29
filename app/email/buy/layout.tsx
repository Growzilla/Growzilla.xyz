import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lock your slot — Klaviyo Reactivation Sprint · Growzilla',
  description:
    '$500 setup + 10% of recovered revenue. 30-day Floor Guarantee. Five founding-rate slots.',
  robots: { index: false, follow: true },
};

export default function EmailBuyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
