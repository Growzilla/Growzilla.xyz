import '@/styles/globals.css'
import type { Metadata } from 'next'
import MetaPixel from '@/components/MetaPixel'
import MetaPixelAppPageviews from '@/components/MetaPixelAppPageviews'

export const metadata: Metadata = {
  title: 'Growzilla',
  description: 'See exact revenue per post & creator on Shopify',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0A0A0B" />
      </head>
      <body className="bg-zilla-black text-white antialiased">
        <MetaPixel />
        <MetaPixelAppPageviews />
        {children}
      </body>
    </html>
  )
}
