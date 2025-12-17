'use client'

import { useEffect, useState, useCallback, memo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioImage } from '@/lib/data'
import { getImageUrl } from '@/lib/image-url'

// Prestige transition config
const prestigeTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1]
}

interface LightboxProps {
  image: PortfolioImage
  onClose: () => void
  allImages: PortfolioImage[]
  onNavigate: (image: PortfolioImage) => void
}

// Memoized navigation button
const NavButton = memo(function NavButton({
  direction,
  onClick,
  ariaLabel
}: {
  direction: 'prev' | 'next'
  onClick: (e: React.MouseEvent) => void
  ariaLabel: string
}) {
  const isPrev = direction === 'prev'
  
  return (
    <motion.button
      onClick={onClick}
      className={`absolute ${isPrev ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-20 group`}
      aria-label={ariaLabel}
      initial={{ opacity: 0, x: isPrev ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isPrev ? -20 : 20 }}
      transition={prestigeTransition}
    >
      <div 
        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-400 ease-prestige group-hover:bg-white/20 group-hover:scale-102 gpu"
      >
        <svg
          className={`w-7 h-7 text-white transition-transform duration-400 ease-prestige ${isPrev ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={isPrev ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </div>
    </motion.button>
  )
})

function Lightbox({ image, onClose, allImages, onNavigate }: LightboxProps) {
  const currentIndex = allImages.findIndex(img => img.id === image.id)
  const hasNext = currentIndex < allImages.length - 1
  const hasPrev = currentIndex > 0
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    setIsImageLoaded(false)
  }, [image.id])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight' && hasNext) {
      setDirection(1)
      onNavigate(allImages[currentIndex + 1])
    }
    if (e.key === 'ArrowLeft' && hasPrev) {
      setDirection(-1)
      onNavigate(allImages[currentIndex - 1])
    }
  }, [currentIndex, hasNext, hasPrev, onClose, onNavigate, allImages])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasPrev) {
      setDirection(-1)
      onNavigate(allImages[currentIndex - 1])
    }
  }, [hasPrev, currentIndex, allImages, onNavigate])

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasNext) {
      setDirection(1)
      onNavigate(allImages[currentIndex + 1])
    }
  }, [hasNext, currentIndex, allImages, onNavigate])

  const handleImageLoad = useCallback(() => setIsImageLoaded(true), [])
  const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={prestigeTransition}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden gpu"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Blurred background - opacity only */}
      <motion.div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={prestigeTransition}
      />

      {/* Ambient glow effect - GPU optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full gpu"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle, rgba(157, 180, 160, 0.35) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Close Button */}
      <motion.button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 group"
        aria-label="Close lightbox"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={prestigeTransition}
      >
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-400 ease-prestige group-hover:bg-white/20 group-hover:scale-102 gpu">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </motion.button>

      {/* Navigation Buttons */}
      {hasPrev && (
        <NavButton
          direction="prev"
          onClick={handlePrev}
          ariaLabel="Previous image"
        />
      )}

      {hasNext && (
        <NavButton
          direction="next"
          onClick={handleNext}
          ariaLabel="Next image"
        />
      )}

      {/* Image Container - transform/opacity only animations */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={image.id}
          initial={{ 
            opacity: 0, 
            scale: 0.95,
            x: direction * 80
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.95,
            x: direction * -80
          }}
          transition={prestigeTransition}
          className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto px-16 md:px-24 py-16 gpu will-change-transform"
          onClick={stopPropagation}
        >
          {/* Loading state */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-12 h-12 border-2 border-white/20 border-t-white/80 rounded-full gpu"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}

          {/* Image frame */}
          <div
            className="relative w-full h-full transition-opacity duration-400 ease-prestige"
            style={{ opacity: isImageLoaded ? 1 : 0 }}
          >
            <Image
              src={getImageUrl(image.filename)}
              alt={image.title || 'Portfolio image'}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              onLoad={handleImageLoad}
            />
          </div>

          {/* Decorative corners */}
          <div className="absolute top-12 left-12 md:top-12 md:left-20 w-8 h-8 border-t border-l border-white/20" />
          <div className="absolute top-12 right-12 md:top-12 md:right-20 w-8 h-8 border-t border-r border-white/20" />
          <div className="absolute bottom-12 left-12 md:bottom-12 md:left-20 w-8 h-8 border-b border-l border-white/20" />
          <div className="absolute bottom-12 right-12 md:bottom-12 md:right-20 w-8 h-8 border-b border-r border-white/20" />
        </motion.div>
      </AnimatePresence>

      {/* Image Info */}
      <AnimatePresence>
        {(image.title || image.description) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ ...prestigeTransition, delay: 0.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white max-w-2xl px-6 z-10 gpu"
          >
            {image.title && (
              <h3 className="font-migra text-2xl md:text-3xl font-medium mb-2 drop-shadow-lg">
                {image.title}
              </h3>
            )}
            {image.description && (
              <p className="text-white/70 text-sm md:text-base drop-shadow-lg">{image.description}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Counter & Progress */}
      <motion.div 
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={prestigeTransition}
      >
        <div className="flex items-center gap-3">
          <span 
            className="text-white/80 text-sm font-light tracking-wider"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-white font-medium">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-white/40">/</span>
            <span>{String(allImages.length).padStart(2, '0')}</span>
          </span>
          
          {/* Progress bar */}
          <div className="w-16 h-px bg-white/20 hidden md:block overflow-hidden">
            <motion.div 
              className="h-full bg-white/60 gpu"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (currentIndex + 1) / allImages.length }}
              transition={prestigeTransition}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Keyboard hints */}
      <motion.div
        className="absolute bottom-6 right-6 text-white/40 text-xs hidden md:flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...prestigeTransition, delay: 0.3 }}
      >
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">→</kbd>
          <span className="ml-1">Navigate</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">ESC</kbd>
          <span className="ml-1">Close</span>
        </span>
      </motion.div>
    </motion.div>
  )
}

export default memo(Lightbox)
