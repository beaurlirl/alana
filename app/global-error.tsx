'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#FAF8F3',
        color: '#2C2C2C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          maxWidth: '500px',
        }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Oops!</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
            We encountered a critical error. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2C2C2C',
              color: '#FAF8F3',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginRight: '1rem',
            }}
          >
            Try Again
          </button>
          <a
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #2C2C2C',
              borderRadius: '4px',
              textDecoration: 'none',
              color: '#2C2C2C',
              display: 'inline-block',
            }}
          >
            Go Home
          </a>
        </div>
      </body>
    </html>
  )
}

