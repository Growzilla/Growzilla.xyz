import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import EliteLayout from '../components/EliteLayout';
import Hero from '../components/landing/Hero';
import SocialProofBar from '../components/landing/SocialProofBar';
import UserStory from '../components/landing/UserStory';
import VideoPlaceholder from '../components/landing/VideoPlaceholder';
import HowItWorks from '../components/landing/HowItWorks';
import Benefits from '../components/landing/Benefits';
import TheOffer from '../components/landing/TheOffer';
import BookInstall from '../components/landing/BookInstall';
import FAQ from '../components/landing/FAQ';
import FinalCTA from '../components/landing/FinalCTA';

const GrowzillaPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Growzilla | See Which Content Actually Converts — Shopify Attribution</title>
        <meta
          name="description"
          content="Growzilla shows Shopify brands which creator content, UGC, and ads drive real sales. Full attribution via Sankey diagrams. Free to install."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz" />
        <meta property="og:title" content="Growzilla | See Which Content Actually Converts" />
        <meta
          property="og:description"
          content="Content attribution for Shopify brands. See which creator content drives sales. Cut losers. Scale winners."
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growzilla | Content Attribution for Shopify" />
        <meta
          name="twitter:description"
          content="See which creator content, UGC, and ads drive real Shopify sales. Full Sankey attribution."
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
        <Hero />
        <SocialProofBar />
        <UserStory />
        <VideoPlaceholder />
        <HowItWorks />
        <Benefits />
        <TheOffer />
        <BookInstall />
        <FAQ />
        <FinalCTA />
      </EliteLayout>
    </>
  );
};

export default GrowzillaPage;
