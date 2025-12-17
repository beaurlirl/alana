'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { PortfolioImage } from '@/lib/data'
import Lightbox from './Lightbox'
import { getImageUrl } from '@/lib/image-url'

interface PortfolioGridProps {
  images: PortfolioImage[]
}

// Individual image card with enhanced animations
function ImageCard({ 
  image, 
  index, 
  onClick 
}: { 
  image: PortfolioImage; 
  index: number; 
  onClick: () => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{ 
        duration: 0.7, 
        delay: (index % 6) * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative aspect-[3/4] bg-cream-dark overflow-hidden cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`View ${image.title || 'portfolio image'} in lightbox`}
    >
      {/* Image with zoom effect */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={getImageUrl(image.filename)}
          alt={image.title || 'Portfolio image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
      
      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%', y: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%', y: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      
      {/* Corner frame on hover */}
      <motion.div
        className="absolute inset-4 border border-white/30 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* View indicator */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </motion.div>
      
      {/* Info overlay */}
      {(image.title || image.description) && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.div>
      )}

      {/* Index number */}
      <motion.span
        className="absolute top-4 left-4 text-xs text-white/60 font-light tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>
    </motion.div>
  )
}

export default function PortfolioGrid({ images }: PortfolioGridProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const sortedImages = [...images].sort((a, b) => a.order - b.order)

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
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="overflow-hidden">
              <motion.h2 
                className="font-migra text-4xl md:text-6xl lg:text-7xl font-medium"
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Portfolio
              </motion.h2>
            </div>
            <motion.div
              className="h-px bg-gradient-to-r from-charcoal/30 via-accent to-transparent max-w-md mt-4"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="mt-4 text-charcoal/60 max-w-md"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              A curated selection of editorial, commercial, and artistic work
            </motion.p>
          </motion.div>

          {sortedImages.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
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
                  onClick={() => setSelectedImage(image)}
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
              transition={{ duration: 0.6, delay: 0.8 }}
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
            onClose={() => setSelectedImage(null)}
            allImages={sortedImages}
            onNavigate={setSelectedImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}
