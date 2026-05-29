import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome — your sprint kicks off now · Growzilla',
  description: 'Payment cleared. Here\'s the next 3 steps to get your reactivation sprint moving.',
  robots: { index: false, follow: false },
};

export default function EmailWelcomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
