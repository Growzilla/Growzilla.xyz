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

const GrowzillaPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Growzilla | Crush Leaks. Scale BIG. - AI-Powered Ecommerce Growth</title>
        <meta
          name="description"
          content="The exclusive community where experienced ecommerce builders plug into AI systems to achieve exponential scaling. Crush leaks, beat giants, and transform your operations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz" />
        <meta property="og:title" content="Growzilla | Crush Leaks. Scale BIG." />
        <meta
          property="og:description"
          content="The exclusive community where experienced ecommerce builders plug into AI systems to achieve exponential scaling. Your transformer moment awaits."
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growzilla | Crush Leaks. Scale BIG." />
        <meta
          name="twitter:description"
          content="AI-powered ecommerce growth for serious operators. Join the exclusive community."
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
        {/* Hero Section with "Crush leaks." / "Scale BIG" */}
        <EliteHero />

        {/* Problem Section: "The Old Way No Longer Scales" */}
        <EliteProblem />

        {/* Solution Section: "Plug Into AI Leverage With Growzilla" */}
        <EliteSolution />

        {/* How It Works: Apply -> Review -> Join -> Transform */}
        <EliteHowItWorks />

        {/* Team Section */}
        <EliteTeam />

        {/* Final CTA with Calendly */}
        <EliteCTA />
      </EliteLayout>
    </>
  );
};

export default GrowzillaPage;
