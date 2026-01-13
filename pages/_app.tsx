import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import Clarity from '@microsoft/clarity'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Microsoft Clarity
    const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || process.env.CLARITY_PROJECT_ID;
    
    if (clarityProjectId && typeof window !== 'undefined') {
      Clarity.init(clarityProjectId);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
