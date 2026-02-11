import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import EliteLayout from '../components/EliteLayout';
import EliteHero from '../components/EliteHero';
import EliteProblem from '../components/EliteProblem';
import EliteSolution from '../components/EliteSolution';
import EliteHowItWorks from '../components/EliteHowItWorks';
import EliteTeam from '../components/EliteTeam';
import EliteCTA from '../components/EliteCTA';
import LogoMarquee from '../components/LogoMarquee';
import ProofSection from '../components/ProofSection';
import FAQ from '../components/FAQ';

const GrowzillaPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Growzilla | Revenue Systems & Attribution for Ecommerce</title>
        <meta
          name="description"
          content="We install revenue visibility, find where money leaks, and build systems to fix it. Revenue systems and attribution for Shopify stores doing $500K-$30M."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz" />
        <meta property="og:title" content="Growzilla | Revenue Systems & Attribution for Ecommerce" />
        <meta
          property="og:description"
          content="We install clean attribution, find where revenue leaks, and build the systems to scale it. For Shopify stores doing $500K-$30M."
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growzilla | Revenue Systems & Attribution" />
        <meta
          name="twitter:description"
          content="Revenue visibility and attribution systems for Shopify stores. We find where money leaks and build systems to fix it."
        />
        <meta name="twitter:image" content="/twitter-image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#0A0A0B" />

        {/* Preconnect to fonts */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Calendly widget script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <EliteLayout>
        <EliteHero />
        <LogoMarquee />
        <EliteProblem />
        <EliteSolution />
        <ProofSection />
        <EliteHowItWorks />
        <EliteTeam />
        <FAQ />
        <EliteCTA />
      </EliteLayout>
    </>
  );
};

export default GrowzillaPage;
