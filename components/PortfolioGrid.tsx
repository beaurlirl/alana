'use client'

import { useState, useRef, memo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { PortfolioImage } from '@/lib/data'
import Lightbox from './Lightbox'
import { getImageUrl } from '@/lib/image-url'

// Prestige transition config
const prestigeTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1]
}

interface PortfolioGridProps {
  images: PortfolioImage[]
}

// Memoized image card with GPU-optimized animations
const ImageCard = memo(function ImageCard({ 
  image, 
  index, 
  onClick 
}: { 
  image: PortfolioImage
  index: number
  onClick: () => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }, [onClick])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        ...prestigeTransition,
        delay: (index % 6) * 0.1,
      }}
      className="group relative aspect-[3/4] bg-cream-dark overflow-hidden cursor-pointer gpu"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="listitem"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`View ${image.title || 'portfolio image'} in lightbox`}
      style={{ 
        willChange: isHovered ? 'transform' : 'auto',
      }}
    >
      {/* Image with zoom effect - GPU optimized */}
      <div
        className="absolute inset-0 transition-transform duration-400 ease-prestige gpu"
        style={{
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        <Image
          src={getImageUrl(image.filename)}
          alt={image.title || 'Portfolio image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      
      {/* Gradient overlay - opacity only transition */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent transition-opacity duration-400 ease-prestige"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Shine effect on hover - transform only */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-transform duration-600 ease-prestige gpu"
        style={{
          transform: isHovered ? 'translateX(100%) translateY(100%)' : 'translateX(-100%) translateY(-100%)',
        }}
      />
      
      {/* Corner frame on hover - opacity and scale */}
      <div
        className="absolute inset-4 border border-white/30 pointer-events-none transition-all duration-400 ease-prestige gpu"
        style={{ 
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0.95)',
        }}
      />

      {/* View indicator */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-prestige gpu"
        style={{ 
          opacity: isHovered ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.8})`,
        }}
      >
        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>
      
      {/* Info overlay */}
      {(image.title || image.description) && (
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-400 ease-prestige"
          style={{ 
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          {image.title && (
            <h3 className="text-white font-migra text-xl font-medium mb-1 drop-shadow-lg">
              {image.title}
            </h3>
          )}
          {image.description && (
            <p className="text-white/80 text-sm line-clamp-2 drop-shadow-lg">
              {image.description}
            </p>
          )}
        </div>
      )}

      {/* Index number */}
      <span
        className="absolute top-4 left-4 text-xs text-white/60 font-light tracking-wider transition-opacity duration-400 ease-prestige"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  )
})

function PortfolioGrid({ images }: PortfolioGridProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const sortedImages = [...images].sort((a, b) => a.order - b.order)
  
  const handleImageClick = useCallback((image: PortfolioImage) => {
    setSelectedImage(image)
  }, [])
  
  const handleClose = useCallback(() => {
    setSelectedImage(null)
  }, [])

  return (
    <>
      <section 
        ref={sectionRef}
        id="portfolio" 
        className="min-h-screen px-6 md:px-12 lg:px-24 py-20 relative"
        aria-label="Portfolio gallery"
      >
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />
        
        <div className="max-w-screen-2xl mx-auto">
          {/* Header with animated reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={prestigeTransition}
            className="mb-16"
          >
            <div className="overflow-hidden">
              <motion.h2 
                className="font-migra text-4xl md:text-6xl lg:text-7xl font-medium"
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : { y: '100%' }}
                transition={{ ...prestigeTransition, delay: 0.1 }}
              >
                Portfolio
              </motion.h2>
            </div>
            <motion.div
              className="h-px bg-gradient-to-r from-charcoal/30 via-accent to-transparent max-w-md mt-4 gpu"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ ...prestigeTransition, delay: 0.2, duration: 0.6 }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.p
              className="mt-4 text-charcoal/60 max-w-md"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ ...prestigeTransition, delay: 0.3 }}
            >
              A curated selection of editorial, commercial, and artistic work
            </motion.p>
          </motion.div>

          {sortedImages.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...prestigeTransition, delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-dashed border-charcoal/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-charcoal/40">No images yet. Add some from the admin panel.</p>
            </motion.div>
          ) : (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              role="list"
            >
              {sortedImages.map((image, index) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  index={index}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          )}

          {/* Image count */}
          {sortedImages.length > 0 && (
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ ...prestigeTransition, delay: 0.5 }}
            >
              <span className="text-sm text-charcoal/40 tracking-wider uppercase">
                {sortedImages.length} {sortedImages.length === 1 ? 'image' : 'images'}
              </span>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={handleClose}
            allImages={sortedImages}
            onNavigate={setSelectedImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(PortfolioGrid)
