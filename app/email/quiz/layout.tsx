import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your dormant revenue audit — Growzilla',
  description:
    'Two-minute quiz to find out what your dormant Klaviyo list is sitting on. Floor anchored to Klaviyo\'s 2025 benchmark.',
  robots: { index: false, follow: false },
};

export default function EmailQuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
