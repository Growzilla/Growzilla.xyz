import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const DemoShell = dynamic(() => import('@/components/demo/DemoShell'), { ssr: false });

export default function DemoPage() {
  return (
    <>
      <Head>
        <title>Demo Dashboard | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <DemoShell />
    </>
  );
}
