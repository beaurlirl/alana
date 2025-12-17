'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  variant?: 'default' | 'hero' | 'grid' | 'page'
}

export default function LoadingSkeleton({ variant = 'default' }: LoadingSkeletonProps) {
  if (variant === 'hero') {
    return (
      <div className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-20 pt-32">
        <div className="max-w-screen-2xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left panel skeleton */}
            <div className="space-y-6">
              <motion.div
                className="h-8 w-20 rounded bg-charcoal/5 relative overflow-hidden"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
              
              <div className="space-y-3">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-5 rounded bg-charcoal/5 relative overflow-hidden"
                    style={{ width: `${60 + Math.random() * 30}%` }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: [0.3, 0.6, 0.3], x: 0 }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: i * 0.1 
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                className="h-6 w-3/4 rounded bg-charcoal/5"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
              />
            </div>

            {/* Right panel skeleton - image */}
            <motion.div
              className="aspect-[3/4] rounded bg-charcoal/5 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Decorative corners */}
              <div className="absolute -inset-2 border border-charcoal/5 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="aspect-[3/4] rounded bg-charcoal/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: i * 0.15
              }}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  if (variant === 'page') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto">
          {/* Title skeleton */}
          <motion.div
            className="h-12 w-64 rounded bg-charcoal/5 mb-4 relative overflow-hidden"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          
          <motion.div
            className="h-4 w-48 rounded bg-charcoal/5 mb-12"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          
          {/* Content skeleton */}
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="h-5 rounded bg-charcoal/5"
                style={{ width: `${70 + Math.random() * 25}%` }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 * i }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default skeleton
  return (
    <div className="space-y-4">
      <motion.div
        className="h-8 w-48 rounded bg-charcoal/5 relative overflow-hidden"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="h-4 rounded bg-charcoal/5"
          style={{ width: `${60 + Math.random() * 35}%` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 * i }}
        />
      ))}
    </div>
  )
}

// Pulse dot loading indicator
export function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-accent"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            delay: i * 0.15
          }}
        />
      ))}
    </div>
  )
}

// Spinner loading indicator
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full border-charcoal/10 border-t-accent`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}
