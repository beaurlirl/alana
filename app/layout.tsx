import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

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
      <body className={`${inter.variable} font-sans antialiased bg-cream text-charcoal overflow-x-hidden`}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-charcoal focus:text-cream focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        
        {/* Animated background gradient */}
        <div 
          className="fixed inset-0 pointer-events-none -z-10"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(139, 155, 138, 0.08), transparent),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(196, 169, 98, 0.05), transparent),
              linear-gradient(180deg, #FAF8F3 0%, #F5F2EB 100%)
            `,
          }}
        />
        
        <Navigation />
        <main id="main-content">
          {children}
        </main>

        {/* Footer accent line */}
        <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-charcoal/5 to-transparent pointer-events-none" />
      </body>
    </html>
  )
}
