'use client'

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'
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
    [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress],
    [0, 1, 1, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress],
    [1.1, 1, 1, 1.1]
  )

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 bg-gray-100"
    >
      {image.filename ? (
        <Image
          src={getImageUrl(image.filename)}
          alt={image.title || 'Portfolio image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <p className="text-sm uppercase tracking-wider">Hero Image {index + 1}</p>
        </div>
      )}
    </motion.div>
  )
}

export default function Hero({ images = [] }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Filter only images marked as hero/featured, then sort and limit
  const heroImageLimit = 8
  const heroImages = images.filter(img => img.isHero === true)
  const sortedImages = [...heroImages].sort((a, b) => a.order - b.order)
  const limitedImages = sortedImages.slice(0, heroImageLimit)
  
  // Debug logging
  console.log('Hero - Total images:', images.length)
  console.log('Hero - Featured images:', heroImages.length)
  console.log('Hero - Images with isHero:', images.map(img => ({ id: img.id, isHero: img.isHero })))
  
  const displayImages = limitedImages.length > 0 ? limitedImages : [
    { id: '1', filename: '', title: 'Image 1' },
    { id: '2', filename: '', title: 'Image 2' },
    { id: '3', filename: '', title: 'Image 3' },
    { id: '4', filename: '', title: 'Image 4' },
  ]

  // Calculate section height based on number of images
  const sectionHeight = `${displayImages.length * 100}vh`

  return (
    <section 
      ref={sectionRef} 
      className="relative" 
      style={{ minHeight: sectionHeight }}
      aria-label="Hero section with scroll-triggered images"
    >
      <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-24 py-20 pt-32 md:py-20">
        <div className="max-w-screen-2xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Panel - Static Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide">
                Model
              </p>

              {/* Measurements - Two columns on mobile, single column on desktop */}
              <div className="grid grid-cols-2 md:block gap-x-4 gap-y-2 md:space-y-2 text-sm md:text-base">
                <p><span className="opacity-60">Height:</span> [Your Height]</p>
                <p><span className="opacity-60">Bust:</span> [Measurement]</p>
                <p><span className="opacity-60">Waist:</span> [Measurement]</p>
                <p><span className="opacity-60">Hips:</span> [Measurement]</p>
                <p><span className="opacity-60">Shoe:</span> [Size]</p>
                <p><span className="opacity-60">Hair:</span> [Color]</p>
                <p><span className="opacity-60">Eyes:</span> [Color]</p>
              </div>

              <p className="text-base md:text-lg opacity-60 max-w-md leading-relaxed pt-2">
                Editorial, commercial, and runway work. Available for bookings worldwide.
              </p>
            </motion.div>

            {/* Right Panel - Scroll-triggered Images */}
            <div className="relative aspect-[3/4] overflow-hidden">
              {displayImages.map((image, index) => {
                // Calculate opacity based on scroll position
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
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[1px] h-16 bg-accent/40 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 64, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-accent to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}

