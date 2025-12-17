'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { PortfolioImage, PortfolioData, Collection } from '@/lib/data'
import Lightbox from '@/components/Lightbox'
import { getImageUrl } from '@/lib/image-url'

// Enhanced loading skeleton with shimmer
function LoadingSkeleton() {
  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-12 px-4 md:px-12 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        <div className="h-10 w-48 bg-charcoal/5 rounded mb-3 animate-pulse" />
        <div className="h-4 w-36 bg-charcoal/5 rounded mb-8 animate-pulse" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div 
                className="aspect-[3/4] bg-charcoal/5 rounded relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                />
              </div>
              <div className="h-5 w-24 bg-charcoal/5 rounded animate-pulse" />
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
  const isInView = useInView(cardRef, { once: true, margin: "-30px" })

  return (
    <motion.button
      ref={cardRef}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group text-left w-full"
    >
      <div className="relative aspect-[3/4] bg-cream-dark overflow-hidden mb-3">
        {firstImage && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={getImageUrl(firstImage.filename)}
              alt={category}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </motion.div>
        )}
        
        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Category name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3 className="text-white font-migra text-lg md:text-xl font-medium drop-shadow-lg">
            {category}
          </h3>
          <p className="text-white/70 text-xs md:text-sm">
            {collectionCount > 0 ? `${collectionCount} collections` : `${images.length} photos`}
          </p>
        </div>
      </div>
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
  const isInView = useInView(cardRef, { once: true, margin: "-20px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[3/4] bg-cream-dark overflow-hidden cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
        className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* View icon */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
          <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Back button with animation
function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      className="group flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal mb-4 transition-colors"
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg 
        className="w-4 h-4"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
      </svg>
      <span>{label}</span>
    </motion.button>
  )
}

function CollectionsContent() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<PortfolioData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for category URL parameter on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

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
      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
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
    <main className="min-h-screen pt-20 md:pt-24 pb-12 px-4 md:px-12 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* STEP 1: Select Category */}
          {!selectedCategory && (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1 
                className="font-migra text-3xl md:text-4xl lg:text-5xl font-medium mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Collections
              </motion.h1>
              <motion.p 
                className="text-charcoal/60 text-sm md:text-base mb-6 md:mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Select a category to browse
              </motion.p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
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
              </div>
            </motion.div>
          )}

          {/* STEP 2: View Collections OR All Category Images */}
          {selectedCategory && !selectedCollection && (
            <motion.div
              key="collections"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BackButton 
                onClick={() => setSelectedCategory(null)} 
                label="Back to categories" 
              />

              <h2 className="font-migra text-2xl md:text-3xl font-medium mb-1">
                {selectedCategory}
              </h2>
              <p className="text-charcoal/60 text-sm mb-6">
                {categoryCollections.length > 0 
                  ? 'Select a collection or view all' 
                  : `${sortedImages.length} photos`
                }
              </p>

              {/* Collections Grid */}
              {categoryCollections.length > 0 ? (
                <>
                  <button
                    onClick={() => setSelectedCollection('__VIEW_ALL__')}
                    className="px-4 py-2 mb-6 text-sm border border-charcoal/20 hover:border-accent hover:bg-accent hover:text-cream transition-all duration-300"
                  >
                    View all photos
                  </button>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
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
              transition={{ duration: 0.3 }}
            >
              <BackButton 
                onClick={() => setSelectedCollection(null)} 
                label={`Back to ${selectedCategory}`} 
              />

              {selectedCollection !== '__VIEW_ALL__' && (
                <h2 className="font-migra text-2xl md:text-3xl font-medium mb-1">
                  {selectedCollection}
                </h2>
              )}
              
              <p className="text-charcoal/60 text-sm mb-6">
                {sortedImages.length} {sortedImages.length === 1 ? 'photo' : 'photos'}
              </p>

              {sortedImages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-charcoal/50">No images in this collection yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
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

export default function Collections() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CollectionsContent />
    </Suspense>
  )
}
