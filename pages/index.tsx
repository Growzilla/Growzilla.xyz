import { useState } from 'react';
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import '@/styles/engine.css';

import {
  EngineNav,
  EngineHero,
  EngineAuthority,
  EngineReality,
  EngineOutcome,
  EngineSystem,
  EngineJourney,
  EngineProof,
  EnginePricing,
  EngineFreedom,
  EngineTeam,
  EngineClose,
  EngineFooter,
  EngineQualifyModal,
} from '@/components/engine';
import { brandfetchCdnUrl, resolveBrandfetchClientId } from '@/lib/brandfetch';
import { ENGINE } from '@/lib/engine/copy';

type Props = {
  linkedinLogo: string;
  growzillaLogo: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const clientId = resolveBrandfetchClientId(process.env.BRANDFETCH_CLIENT_ID ?? '');
  // Prefer Brandfetch symbol; EngineConnectStage falls back to inline SVG if CDN fails
  return {
    props: {
      linkedinLogo: brandfetchCdnUrl('linkedin.com', clientId, { type: 'symbol', size: 128 }),
      growzillaLogo: '/growzillalogo.png',
    },
    revalidate: 86400,
  };
};

export default function Home({ linkedinLogo, growzillaLogo }: Props) {
  const [qualifyOpen, setQualifyOpen] = useState(false);
  const openQualify = () => setQualifyOpen(true);

  return (
    <>
      <Head>
        <title>{ENGINE.brand} · LinkedIn sales engine for B2B SaaS</title>
        <meta
          name="description"
          content="Book 5–10 qualified meetings every week from LinkedIn. Content + outreach as one engine. Min 5 calls in month 1 — risk-free guarantee. $500/mo."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz" />
        <meta property="og:title" content={`${ENGINE.brand} · LinkedIn sales engine`} />
        <meta property="og:description" content={ENGINE.hero.sub} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#0A0A0B" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="engine min-h-screen">
        <div className="engine-grain" aria-hidden />
        <div className="engine-layer">
          <EngineNav onBookClick={openQualify} />
          <main>
            <EngineHero
              linkedinLogo={linkedinLogo}
              growzillaLogo={growzillaLogo}
              onBookClick={openQualify}
            />
            <EngineAuthority />
            <EngineReality />
            <EngineOutcome />
            <EngineSystem />
            <EngineJourney />
            <EngineProof />
            <EnginePricing />
            <EngineFreedom />
            <EngineTeam />
            <EngineClose onBookClick={openQualify} />
          </main>
          <EngineFooter />
        </div>
        <EngineQualifyModal open={qualifyOpen} onClose={() => setQualifyOpen(false)} />
      </div>
    </>
  );
}
