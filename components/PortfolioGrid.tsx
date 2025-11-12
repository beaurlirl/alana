'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PortfolioImage } from '@/lib/data'
import Lightbox from './Lightbox'
import { getImageUrl } from '@/lib/image-url'

interface PortfolioGridProps {
  images: PortfolioImage[]
}

export default function PortfolioGrid({ images }: PortfolioGridProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)

  const sortedImages = [...images].sort((a, b) => a.order - b.order)

  return (
    <>
      <section 
        id="portfolio" 
        className="min-h-screen px-6 md:px-12 lg:px-24 py-20"
        aria-label="Portfolio gallery"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-screen-2xl mx-auto"
        >
          <h2 className="font-migra text-4xl md:text-6xl lg:text-7xl font-medium mb-12">
            Portfolio
          </h2>

          {sortedImages.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>No images yet. Add some from the admin panel.</p>
            </div>
          ) : (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
            >
              {sortedImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedImage(image)
                    }
                  }}
                  aria-label={`View ${image.title || 'portfolio image'} in lightbox`}
                >
                  <Image
                    src={getImageUrl(image.filename)}
                    alt={image.title || 'Portfolio image'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {(image.title || image.description) && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.title && (
                        <h3 className="text-white font-migra text-xl font-bold mb-1">
                          {image.title}
                        </h3>
                      )}
                      {image.description && (
                        <p className="text-white/80 text-sm line-clamp-2">
                          {image.description}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
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

