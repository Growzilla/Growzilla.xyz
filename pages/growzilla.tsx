import React from 'react';
import Head from 'next/head';
import GrowzillaLayout from '../components/GrowzillaLayout';
import GrowzillaHero from '../components/GrowzillaHero';
import ExclusivityTeaser from '../components/ExclusivityTeaser';
import ProblemAgitation from '../components/ProblemAgitation';
import FeatureShowcase from '../components/FeatureShowcase';
import TestimonialCarousel from '../components/TestimonialCarousel';
import CompetitiveComparison from '../components/CompetitiveComparison';
import EnhancedCTA from '../components/EnhancedCTA';

const GrowzillaPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Growzilla | Connect Your Data. Get Specific Recommendations.</title>
        <meta
          name="description"
          content="Growzilla connects your Shopify store, ad platforms, and email tools into a single analytical layer. Identifies where you're losing revenue and tells you specifically what to fix—ranked by expected impact."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz" />
        <meta property="og:title" content="Growzilla | Your Data Isn't the Problem. Your Tools Don't Talk to Each Other." />
        <meta
          property="og:description"
          content="Diagnostic analytics for ecommerce operators. Connect your tools, get weekly recommendations ranked by expected revenue impact. 30-day trial, no credit card."
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growzilla | Connect Your Data. Get Specific Recommendations." />
        <meta
          name="twitter:description"
          content="Diagnostic analytics for ecommerce. Connect your tools, get ranked recommendations. 23% median CVR improvement."
        />
        <meta name="twitter:image" content="/twitter-image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Theme color - Shopify green */}
        <meta name="theme-color" content="#00FF94" />

        {/* Preconnect to fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <GrowzillaLayout>
        {/*
          SECTION 1: HERO
          Headline: "Your Data Isn't the Problem. Your Tools Don't Talk to Each Other."
          Clear value prop, risk reducers, direct CTA
        */}
        <GrowzillaHero />

        {/*
          SECTION 2: ICP QUALIFICATION
          "Is Growzilla Right For You?"
          Two-column layout: who it's for / who it's not for
          Helps visitors self-qualify, reduces bad-fit signups
        */}
        <ExclusivityTeaser />

        {/*
          SECTION 3: PROBLEM FRAMING
          "The Real Problem Isn't Your Data. It's Your Data Architecture."
          3 cards: Fragmented Attribution, Dashboards Without Direction, Time Cost
          Calm, operational tone - no fear-mongering
        */}
        <ProblemAgitation />

        {/*
          SECTION 4: HOW IT WORKS
          4-step process: Connect → Analyze → Recommend → Learn
          Timeline to value: Day 1 → Week 1 → Month 1
          Clear mechanism explanation
        */}
        <FeatureShowcase />

        {/*
          SECTION 5: SOCIAL PROOF
          Customer testimonials with specific results
          TODO: Update copy to match new tone
        */}
        <TestimonialCarousel />

        {/*
          SECTION 6: COMPARISON
          Growzilla vs alternatives (Triple Whale, Peel, etc.)
          TODO: Update to focus on "shows data vs tells you what to do"
        */}
        <CompetitiveComparison />

        {/*
          SECTION 7: FINAL CTA
          "See If Growzilla Is Right For Your Business"
          Primary: Start 30-Day Trial
          Secondary: Schedule a 15-Minute Walkthrough
          Trust signals, realistic stats, contact info
        */}
        <EnhancedCTA />
      </GrowzillaLayout>
    </>
  );
};

export default GrowzillaPage;
