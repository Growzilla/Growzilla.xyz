import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ansök om Morsdag Launch · Growzilla',
  description: '2 minuter. Vi ser om kampanjen passar er butik.',
  robots: 'noindex',
};

export default function MorsdagQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
