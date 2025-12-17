'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { PortfolioImage, PortfolioData, Collection } from '@/lib/data'
import Lightbox from '@/components/Lightbox'
import { getImageUrl } from '@/lib/image-url'

// Enhanced loading skeleton with shimmer
function LoadingSkeleton() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        <div className="h-12 w-64 bg-charcoal/5 rounded mb-4 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>
        <div className="h-4 w-48 bg-charcoal/5 rounded mb-12 animate-pulse" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div 
                className="aspect-[3/4] bg-charcoal/5 rounded relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                />
              </div>
              <div className="h-6 w-32 bg-charcoal/5 rounded animate-pulse" />
              <div className="h-4 w-24 bg-charcoal/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

// Category card with enhanced hover effects
function CategoryCard({ 
  category, 
  images, 
  collectionCount, 
  onClick,
  index
}: { 
  category: string
  images: PortfolioImage[]
  collectionCount: number
  onClick: () => void
  index: number
}) {
  const firstImage = images[0]
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLButtonElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.button
      ref={cardRef}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group text-left w-full"
    >
      <div className="relative aspect-[3/4] bg-cream-dark overflow-hidden mb-4">
        {firstImage && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={getImageUrl(firstImage.filename)}
              alt={category}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        )}
        
        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Category name overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white font-migra text-3xl font-medium drop-shadow-lg">
            Explore
          </span>
        </motion.div>

        {/* Corner frame */}
        <motion.div
          className="absolute inset-4 border border-white/30 pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      
      <motion.h3 
        className="font-migra text-2xl font-medium mb-1"
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {category}
      </motion.h3>
      <p className="text-sm text-charcoal/60">
        {collectionCount} {collectionCount === 1 ? 'collection' : 'collections'} • {images.length} {images.length === 1 ? 'photo' : 'photos'}
      </p>
    </motion.button>
  )
}

// Image grid item with enhanced animations
function ImageGridItem({
  image,
  index,
  onClick
}: {
  image: PortfolioImage
  index: number
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-30px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[3/4] bg-cream-dark overflow-hidden cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={getImageUrl(image.filename)}
          alt={image.title || 'Portfolio image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </motion.div>
      
      {/* Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* View icon */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
          <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </motion.div>
      
      {/* Title overlay */}
      {image.title && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-white font-medium text-sm drop-shadow-lg">{image.title}</h3>
        </motion.div>
      )}

      {/* Index number */}
      <motion.span
        className="absolute top-3 left-3 text-xs text-white/70 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>
    </motion.div>
  )
}

// Back button with animation
function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      className="group flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal mb-8 transition-colors"
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.svg 
        className="w-4 h-4 transition-transform group-hover:-translate-x-1"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
      </motion.svg>
      <span>{label}</span>
    </motion.button>
  )
}

export default function Collections() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/portfolio')
      const portfolioData = await response.json()
      setData(portfolioData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-charcoal/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-charcoal/50">Failed to load collections</p>
        </motion.div>
      </main>
    )
  }

  // Get collections for selected category
  const categoryCollections = selectedCategory
    ? (data.collections || []).filter(c => c.category === selectedCategory)
    : []
  
  // Get images based on selection
  const getFilteredImages = () => {
    if (selectedCollection && selectedCollection !== '__VIEW_ALL__') {
      return data.images.filter(img => img.collection === selectedCollection)
    }
    if (selectedCategory) {
      return data.images.filter(img => img.category === selectedCategory)
    }
    return []
  }

  const sortedImages = [...getFilteredImages()].sort((a, b) => a.order - b.order)

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24 relative">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                className="h-px bg-accent flex-grow max-w-12"
                initial={{ scaleX: 0 }}
                animate={isHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ originX: 0 }}
              />
              <span className="text-sm uppercase tracking-widest text-accent">Browse</span>
            </div>
            
            <div className="overflow-hidden">
              <motion.h1 
                className="font-migra text-4xl md:text-5xl lg:text-6xl font-medium"
                initial={{ y: '100%' }}
                animate={isHeaderInView ? { y: 0 } : { y: '100%' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Collections
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-charcoal/60 mt-4"
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Select a category to view collections and photos
            </motion.p>
          </motion.div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Select Category */}
          {!selectedCategory && (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {data.categories.map((category, index) => {
                const categoryImages = data.images.filter(img => img.category === category)
                const collectionCount = (data.collections || []).filter(c => c.category === category).length
                
                return (
                  <CategoryCard
                    key={category}
                    category={category}
                    images={categoryImages}
                    collectionCount={collectionCount}
                    onClick={() => setSelectedCategory(category)}
                    index={index}
                  />
                )
              })}
            </motion.div>
          )}

          {/* STEP 2: View Collections OR All Category Images */}
          {selectedCategory && !selectedCollection && (
            <motion.div
              key="collections"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <BackButton 
                onClick={() => setSelectedCategory(null)} 
                label="Back to categories" 
              />

              <motion.h2 
                className="font-migra text-3xl font-medium mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {selectedCategory}
              </motion.h2>
              <motion.p 
                className="text-charcoal/60 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {categoryCollections.length > 0 
                  ? 'Select a collection to view specific photos' 
                  : 'Viewing all photos in this category'
                }
              </motion.p>

              {/* Collections Grid */}
              {categoryCollections.length > 0 ? (
                <>
                  <motion.button
                    onClick={() => setSelectedCollection('__VIEW_ALL__')}
                    className="px-6 py-3 mb-8 text-sm border border-charcoal/20 hover:border-accent hover:bg-accent hover:text-cream transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="relative z-10">View all {selectedCategory} photos</span>
                  </motion.button>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryCollections.map((collection, index) => {
                      const collectionImages = data.images.filter(img => img.collection === collection.name)
                      const firstImage = collectionImages[0]
                      
                      return (
                        <CategoryCard
                          key={collection.name}
                          category={collection.name}
                          images={collectionImages}
                          collectionCount={0}
                          onClick={() => setSelectedCollection(collection.name)}
                          index={index}
                        />
                      )
                    })}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sortedImages.map((image, index) => (
                    <ImageGridItem
                      key={image.id}
                      image={image}
                      index={index}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: View Collection Images */}
          {selectedCollection && (
            <motion.div
              key="images"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <BackButton 
                onClick={() => setSelectedCollection(null)} 
                label={`Back to ${selectedCategory} collections`} 
              />

              {selectedCollection !== '__VIEW_ALL__' && (
                <motion.h2 
                  className="font-migra text-3xl font-medium mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {selectedCollection}
                </motion.h2>
              )}

              {sortedImages.length === 0 ? (
                <motion.div 
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-charcoal/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-charcoal/50">No images in this collection yet.</p>
                </motion.div>
              ) : (
                <>
                  <motion.p 
                    className="text-sm text-charcoal/50 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {sortedImages.length} {sortedImages.length === 1 ? 'image' : 'images'}
                  </motion.p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedImages.map((image, index) => (
                      <ImageGridItem
                        key={image.id}
                        image={image}
                        index={index}
                        onClick={() => setSelectedImage(image)}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
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
    </main>
  )
}
