'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PortfolioImage } from '@/lib/data'
import { getImageUrl } from '@/lib/image-url'

interface LightboxProps {
  image: PortfolioImage
  onClose: () => void
  allImages: PortfolioImage[]
  onNavigate: (image: PortfolioImage) => void
}

export default function Lightbox({ image, onClose, allImages, onNavigate }: LightboxProps) {
  const currentIndex = allImages.findIndex(img => img.id === image.id)
  const hasNext = currentIndex < allImages.length - 1
  const hasPrev = currentIndex > 0

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasNext) onNavigate(allImages[currentIndex + 1])
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(allImages[currentIndex - 1])
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, hasNext, hasPrev, onClose, onNavigate, allImages])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:opacity-60 transition-opacity z-10"
        aria-label="Close lightbox"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Navigation Buttons */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(allImages[currentIndex - 1])
          }}
          className="absolute left-6 text-white hover:opacity-60 transition-opacity z-10"
          aria-label="Previous image"
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(allImages[currentIndex + 1])
          }}
          className="absolute right-6 text-white hover:opacity-60 transition-opacity z-10"
          aria-label="Next image"
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Image */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={getImageUrl(image.filename)}
          alt={image.title || 'Portfolio image'}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Image Info */}
      {(image.title || image.description) && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white max-w-2xl px-6"
        >
          {image.title && (
            <h3 className="font-migra text-2xl md:text-3xl font-medium mb-2">
              {image.title}
            </h3>
          )}
          {image.description && (
            <p className="text-white/80">{image.description}</p>
          )}
        </motion.div>
      )}

      {/* Counter */}
      <div 
        className="absolute top-6 left-6 text-white text-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        Image {currentIndex + 1} of {allImages.length}
      </div>
    </motion.div>
  )
}

