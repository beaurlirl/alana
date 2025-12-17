'use client'

import { motion, useScroll, useTransform, MotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { getImageUrl } from '@/lib/image-url'

interface HeroProps {
  images?: Array<{ id: string; filename: string; title?: string; order: number; isHero?: boolean }>
}

interface ImageLayerProps {
  image: { id: string; filename: string; title?: string }
  index: number
  scrollYProgress: MotionValue<number>
  startProgress: number
  endProgress: number
}

function ImageLayer({ image, index, scrollYProgress, startProgress, endProgress }: ImageLayerProps) {
  const opacity = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.08, endProgress - 0.08, endProgress],
    [0, 1, 1, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress],
    [1.15, 1, 1, 1.05]
  )

  const y = useTransform(
    scrollYProgress,
    [startProgress, endProgress],
    [30, -30]
  )

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 bg-cream-dark"
    >
      {image.filename ? (
        <>
          <Image
            src={getImageUrl(image.filename)}
            alt={image.title || 'Portfolio image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-charcoal/10" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-charcoal/30">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-charcoal/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-migra">{index + 1}</span>
            </div>
            <p className="text-sm uppercase tracking-wider">Hero Image {index + 1}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Text character animation component
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero({ images = [] }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Smooth scroll progress for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Parallax transforms - reduced range to prevent content from going out of view
  const textY = useTransform(smoothProgress, [0, 1], [0, 30])
  const imageFrameY = useTransform(smoothProgress, [0, 1], [0, -20])

  // Filter only images marked as hero/featured, then sort and limit
  const heroImageLimit = 8
  const heroImages = images.filter(img => img.isHero === true)
  const sortedImages = [...heroImages].sort((a, b) => a.order - b.order)
  const limitedImages = sortedImages.slice(0, heroImageLimit)

  const displayImages = limitedImages.length > 0 ? limitedImages : [
    { id: '1', filename: '', title: 'Image 1' },
    { id: '2', filename: '', title: 'Image 2' },
    { id: '3', filename: '', title: 'Image 3' },
    { id: '4', filename: '', title: 'Image 4' },
  ]

  // Calculate section height based on number of images
  const sectionHeight = `${displayImages.length * 100}vh`

  // Measurement items with stagger
  const measurements = [
    { label: 'Height', value: '[Your Height]' },
    { label: 'Bust', value: '[Measurement]' },
    { label: 'Waist', value: '[Measurement]' },
    { label: 'Hips', value: '[Measurement]' },
    { label: 'Shoe', value: '[Size]' },
    { label: 'Hair', value: '[Color]' },
    { label: 'Eyes', value: '[Color]' },
  ]

  return (
    <section 
      ref={sectionRef} 
      className="relative" 
      style={{ minHeight: sectionHeight }}
      aria-label="Hero section with scroll-triggered images"
    >
      <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-24 py-12 pt-28 md:pt-24 lg:pt-20 overflow-hidden">
        <div className="max-w-screen-2xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Left Panel - Static Info */}
            <motion.div
              style={{ y: textY }}
              className="space-y-4 md:space-y-6 relative z-10"
            >
              {/* Title with character animation */}
              <div className="overflow-hidden">
                <motion.p 
                  className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-charcoal/80"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  Model
                </motion.p>
              </div>

              {/* Measurements with staggered reveal */}
              <div className="grid grid-cols-2 md:block gap-x-6 gap-y-3 md:space-y-3 text-sm md:text-base">
                {measurements.map((item, index) => (
                  <motion.p 
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group"
                  >
                    <span className="opacity-50 group-hover:opacity-80 transition-opacity duration-300">{item.label}:</span>{' '}
                    <span className="group-hover:text-accent transition-colors duration-300">{item.value}</span>
                  </motion.p>
                ))}
              </div>

              {/* Description with fade in */}
              <motion.p 
                className="text-base md:text-lg text-charcoal/60 max-w-md leading-relaxed pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                Editorial, commercial, and runway work. Available for bookings worldwide.
              </motion.p>

              {/* Decorative line */}
              <motion.div
                className="h-px bg-gradient-to-r from-charcoal/20 via-accent/40 to-transparent max-w-xs"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* Right Panel - Scroll-triggered Images */}
            <motion.div 
              className="relative z-0"
              style={{ y: imageFrameY }}
            >
              {/* Decorative frame */}
              <motion.div
                className="absolute -inset-3 md:-inset-4 border border-charcoal/10 pointer-events-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Corner accents */}
              <motion.div
                className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-accent"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Image container */}
              <motion.div 
                className="relative aspect-[3/4] max-h-[70vh] lg:max-h-[75vh] overflow-hidden bg-cream-dark"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {displayImages.map((image, index) => {
                  const startProgress = index / displayImages.length
                  const endProgress = (index + 1) / displayImages.length

                  return (
                    <ImageLayer
                      key={image.id}
                      image={image}
                      index={index}
                      scrollYProgress={scrollYProgress}
                      startProgress={startProgress}
                      endProgress={endProgress}
                    />
                  )
                })}
                
                {/* Image counter */}
                <motion.div
                  className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-sm text-cream px-3 py-1.5 text-xs tracking-wider"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  {displayImages.length} IMAGES
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.span 
          className="text-xs uppercase tracking-widest text-charcoal/40"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
        </motion.span>
        <div className="w-[1px] h-12 bg-charcoal/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent to-transparent"
          />
        </div>
      </motion.div>

      {/* Floating accent orb */}
      <motion.div
        className="fixed bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl pointer-events-none hidden lg:block"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  )
}
