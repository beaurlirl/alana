'use client'

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, memo, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Prestige transition config
const prestigeTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1]
}

interface HeroProps {
  images?: Array<{ id: string; filename: string; title?: string; order: number; isHero?: boolean }>
}

// Category data with images and links
const categories = [
  {
    name: 'Runway',
    image: '/categories/alanadigital.png',
    category: 'Runway'
  },
  {
    name: 'Commercial',
    image: '/categories/alanacommercial.png',
    category: 'Commercial'
  },
  {
    name: 'Editorial',
    image: '/categories/alanaeditorial.png',
    category: 'Editorial'
  }
]

// Memoized measurement item
const MeasurementItem = memo(function MeasurementItem({ 
  label, 
  value, 
  index 
}: { 
  label: string
  value: string
  index: number 
}) {
  return (
    <motion.p 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        ...prestigeTransition,
        delay: 0.3 + index * 0.1,
      }}
      className="group"
    >
      <span className="opacity-50 group-hover:opacity-80 transition-opacity duration-400 ease-prestige">
        {label}:
      </span>{' '}
      <span className="font-medium group-hover:text-accent transition-colors duration-400 ease-prestige">
        {value}
      </span>
    </motion.p>
  )
})

function Hero({ images = [] }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const accumulatedDelta = useRef(0)
  
  // Mouse position for subtle parallax effect on current image
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring for image movement
  const springConfig = { stiffness: 100, damping: 30 }
  const imageX = useSpring(useTransform(mouseX, [-1, 1], [15, -15]), springConfig)
  const imageY = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), springConfig)

  // Handle mouse move for parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width * 2 - 1
    const y = (e.clientY - rect.top) / rect.height * 2 - 1
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  // Navigate to next/previous with animation lock - only move ONE step at a time
  const navigateTo = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return
    
    const canGoNext = direction === 'next' && currentIndex < categories.length - 1
    const canGoPrev = direction === 'prev' && currentIndex > 0
    
    if (!canGoNext && !canGoPrev) {
      accumulatedDelta.current = 0
      return
    }
    
    setIsAnimating(true)
    accumulatedDelta.current = 0
    
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1)
    } else if (canGoPrev) {
      setCurrentIndex(prev => prev - 1)
    }
    
    // Lock for longer to ensure each slide is seen - must wait before next scroll
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }, [currentIndex, isAnimating])

  // Handle scroll/wheel for category navigation - stricter threshold
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    
    // Completely ignore scroll input while animating
    if (isAnimating) {
      accumulatedDelta.current = 0
      return
    }
    
    // Accumulate scroll delta
    accumulatedDelta.current += e.deltaY
    
    // Higher threshold to prevent accidental skipping
    const threshold = 80
    
    if (accumulatedDelta.current > threshold) {
      navigateTo('next')
    } else if (accumulatedDelta.current < -threshold) {
      navigateTo('prev')
    }
  }, [isAnimating, navigateTo])

  // Handle touch for mobile
  const touchStartY = useRef(0)
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Completely ignore touch input while animating
    if (isAnimating) return
    
    const touchEndY = e.changedTouches[0].clientY
    const delta = touchStartY.current - touchEndY
    
    // Higher threshold for touch - require deliberate swipe
    if (Math.abs(delta) > 80) {
      if (delta > 0) {
        navigateTo('next')
      } else {
        navigateTo('prev')
      }
    }
  }, [isAnimating, navigateTo])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleWheel, handleTouchStart, handleTouchEnd])

  // Measurement items
  const measurements = [
    { label: 'Height', value: '5\'5"' },
    { label: 'Waist', value: '27"' },
    { label: 'Shoe', value: '5.5' },
    { label: 'Hair', value: 'Brown' },
    { label: 'Eyes', value: 'Brown' },
  ]

  const currentCategory = categories[currentIndex]

  return (
    <section 
      ref={containerRef}
      className="homepage-locked fixed inset-0 overflow-hidden flex flex-col z-0 bg-cream"
      style={{ touchAction: 'none' }}
      onMouseMove={handleMouseMove}
      aria-label="Hero section with category images"
    >
      {/* Main content area - below fixed header */}
      <div className="flex-1 flex flex-col md:flex-row pt-16 md:pt-20 items-center">
        {/* Left Panel - Measurements - pushed towards center */}
        <div className="w-full md:w-auto px-6 md:pl-[12%] lg:pl-[18%] md:pr-8 lg:pr-12 py-3 md:py-6 flex flex-col justify-center shrink-0">
            <motion.div
            className="space-y-2 md:space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title - BIGGER */}
              <div className="overflow-hidden">
                <motion.p 
                  className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-charcoal/80"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...prestigeTransition, delay: 0.1 }}
                >
                  Model
                </motion.p>
              </div>

            {/* Measurements - BIGGER */}
            <div className="grid grid-cols-2 md:block gap-x-4 gap-y-1.5 md:space-y-2 text-sm md:text-base lg:text-lg">
                {measurements.map((item, index) => (
                  <MeasurementItem
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    index={index}
                  />
                ))}
              </div>

            {/* Description - BIGGER */}
              <motion.p 
              className="text-sm md:text-base text-charcoal/60 max-w-sm leading-relaxed pt-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...prestigeTransition, delay: 0.8 }}
              >
                Editorial, commercial, and runway work. Available for bookings worldwide.
              </motion.p>

              {/* Decorative line */}
              <motion.div
                className="h-px bg-gradient-to-r from-charcoal/20 via-accent/40 to-transparent max-w-xs gpu"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ ...prestigeTransition, delay: 1, duration: 0.8 }}
                style={{ transformOrigin: 'left' }}
              />

            {/* Scroll indicator dots */}
            <div className="flex gap-2 pt-3">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isAnimating && i !== currentIndex) {
                      setIsAnimating(true)
                      accumulatedDelta.current = 0
                      setCurrentIndex(i)
                      setTimeout(() => setIsAnimating(false), 1000)
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === currentIndex 
                      ? 'bg-charcoal w-8' 
                      : 'bg-charcoal/20 w-2 hover:bg-charcoal/40'
                  }`}
                  aria-label={`Go to ${cat.name}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Category Image */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden md:-mt-[5vh] md:pr-[5%] lg:pr-[8%]">
          {/* Decorative vertical line - desktop */}
          <motion.div
            className="hidden md:block absolute right-[3%] lg:right-[5%] top-0 bottom-0 w-px bg-charcoal/10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ ...prestigeTransition, delay: 0.5, duration: 1 }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Category Image & Label - fits in viewport */}
          <div className="w-full flex flex-col items-center justify-center relative px-2 md:px-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div 
                key={currentCategory.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: { duration: 0.5 }
                }}
                className="w-full flex flex-col items-center justify-center"
              >
                <Link
                  href={`/collections?category=${encodeURIComponent(currentCategory.category)}`}
                  className="group flex flex-col items-center w-full justify-center"
                >
                  {/* Image container - larger on mobile, no scale animation */}
                  <motion.div 
                    className="relative w-[180vw] md:w-full md:max-w-[45vw] lg:max-w-[40vw] -ml-[40vw] md:ml-0"
                    style={{ 
                      x: imageX, 
                      y: imageY,
                    }}
                  >
                    <div className="relative w-full h-[50vh] md:h-[65vh]">
                      <Image
                        src={currentCategory.image}
                        alt={currentCategory.name}
                        fill
                        className="object-contain object-center transition-transform duration-700 ease-out-quint group-hover:scale-[1.01]"
                        sizes="(max-width: 768px) 180vw, 50vw"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* Category name - right below image, visible */}
                  <motion.h2 
                    className="font-migra text-3xl md:text-4xl lg:text-5xl text-charcoal italic tracking-wide text-center -mt-2 md:mt-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {currentCategory.name}
                  </motion.h2>
                </Link>
              </motion.div>
            </AnimatePresence>
      </div>

          {/* Arrow link indicator */}
          <motion.div
            className="absolute bottom-20 md:bottom-24 right-6 md:right-[8%] lg:right-[12%] z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href={`/collections?category=${encodeURIComponent(currentCategory.category)}`}
              className="group"
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-charcoal/60 transition-all duration-300 group-hover:text-charcoal group-hover:translate-x-1 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-charcoal/30 uppercase tracking-widest hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.span
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)
