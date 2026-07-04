import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Clarity from '@microsoft/clarity'
import MetaPixel from '@/components/MetaPixel'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialize Microsoft Clarity
    const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || process.env.CLARITY_PROJECT_ID;

    if (clarityProjectId && typeof window !== 'undefined') {
      Clarity.init(clarityProjectId);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window === 'undefined') return
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
      if (typeof fbq === 'function') {
        fbq('track', 'PageView')
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </Head>
      <MetaPixel />
      <Component {...pageProps} />
    </>
  )
}
