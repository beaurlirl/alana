import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alana Cabanzo - Model Portfolio',
  description: 'Professional model portfolio featuring editorial, commercial, and runway work. Browse collections and contact for bookings.',
  keywords: ['model', 'portfolio', 'fashion', 'editorial', 'commercial', 'runway'],
  authors: [{ name: 'Alana Cabanzo' }],
  openGraph: {
    title: 'Alana Cabanzo - Model Portfolio',
    description: 'Professional model portfolio featuring editorial, commercial, and runway work.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Alana Cabanzo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alana Cabanzo - Model Portfolio',
    description: 'Professional model portfolio featuring editorial, commercial, and runway work.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to Fontshare for faster font loading */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=migra@500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-cream text-charcoal`}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-charcoal focus:text-cream focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        
        <Navigation />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}

