'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        <h1 className="font-migra text-6xl md:text-7xl font-medium mb-4">
          Oops!
        </h1>
        
        <h2 className="text-2xl md:text-3xl mb-6">
          Something went wrong
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault. 
          Try refreshing the page or come back in a few moments.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-charcoal text-cream rounded hover:bg-charcoal/80 transition-colors"
          >
            Try Again
          </button>
          
          <a
            href="/"
            className="px-6 py-3 border border-charcoal text-charcoal rounded hover:bg-charcoal hover:text-cream transition-colors inline-block"
          >
            Go Home
          </a>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development Only)
            </summary>
            <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </motion.div>
    </div>
  )
}

