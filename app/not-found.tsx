'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl text-center"
      >
        <h1 className="font-migra text-8xl md:text-9xl font-medium mb-4">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl mb-6">
          Page Not Found
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-charcoal text-cream rounded hover:bg-charcoal/80 transition-colors inline-block"
          >
            Go Home
          </Link>
          
          <Link
            href="/collections"
            className="px-8 py-3 border border-charcoal text-charcoal rounded hover:bg-charcoal hover:text-cream transition-colors inline-block"
          >
            View Collections
          </Link>
          
          <Link
            href="/contact"
            className="px-8 py-3 border border-charcoal text-charcoal rounded hover:bg-charcoal hover:text-cream transition-colors inline-block"
          >
            Contact
          </Link>
        </div>

        {/* Decorative element */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 w-24 h-1 bg-accent mx-auto"
        />
      </motion.div>
    </div>
  )
}

