'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PortfolioImage, PortfolioData, Collection } from '@/lib/data'
import Lightbox from '@/components/Lightbox'
import { getImageUrl } from '@/lib/image-url'

export default function Collections() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="h-12 w-64 bg-gray-200 rounded mb-8 animate-pulse"></div>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Failed to load collections</p>
      </main>
    )
  }

  // Get collections for selected category
  const categoryCollections = selectedCategory
    ? (data.collections || []).filter(c => c.category === selectedCategory)
    : []
  
  // Get images based on selection
  const getFilteredImages = () => {
    if (selectedCollection) {
      return data.images.filter(img => img.collection === selectedCollection)
    }
    if (selectedCategory) {
      return data.images.filter(img => img.category === selectedCategory)
    }
    return []
  }

  const sortedImages = [...getFilteredImages()].sort((a, b) => a.order - b.order)

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-migra text-4xl md:text-5xl lg:text-6xl font-medium mb-4">
          Collections
        </h1>
        <p className="text-charcoal/60 mb-12">Select a category to view collections and photos</p>

        {/* STEP 1: Select Category */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.categories.map((category) => {
              const categoryImages = data.images.filter(img => img.category === category)
              const firstImage = categoryImages[0]
              const collectionCount = (data.collections || []).filter(c => c.category === category).length
              
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group text-left"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                    {firstImage && (
                      <Image
                        src={getImageUrl(firstImage.filename)}
                        alt={category}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-migra text-2xl font-medium mb-1">{category}</h3>
                  <p className="text-sm text-charcoal/60">
                    {collectionCount} {collectionCount === 1 ? 'collection' : 'collections'} • {categoryImages.length} {categoryImages.length === 1 ? 'photo' : 'photos'}
                  </p>
                </motion.button>
              )
            })}
          </div>
        )}

        {/* STEP 2: View Collections OR All Category Images */}
        {selectedCategory && !selectedCollection && (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal mb-8 transition-colors"
            >
              ← Back to categories
            </button>

            <h2 className="font-migra text-3xl font-medium mb-2">{selectedCategory}</h2>
            <p className="text-charcoal/60 mb-8">
              {categoryCollections.length > 0 
                ? 'Select a collection to view specific photos' 
                : 'Viewing all photos in this category'
              }
            </p>

            {/* Collections Grid */}
            {categoryCollections.length > 0 ? (
              <>
                {/* Option to view all in category */}
                <button
                  onClick={() => setSelectedCollection('__VIEW_ALL__')}
                  className="px-4 py-2 mb-8 text-sm bg-charcoal/10 hover:bg-charcoal/20 transition-colors"
                >
                  View all {selectedCategory} photos
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCollections.map((collection) => {
                    const collectionImages = data.images.filter(img => img.collection === collection.name)
                    const firstImage = collectionImages[0]
                    
                    return (
                      <motion.button
                        key={collection.name}
                        onClick={() => setSelectedCollection(collection.name)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group text-left"
                      >
                        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                          {firstImage && (
                            <Image
                              src={getImageUrl(firstImage.filename)}
                              alt={collection.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 className="font-medium text-lg mb-1">{collection.name}</h3>
                        <p className="text-sm text-charcoal/60">
                          {collectionImages.length} {collectionImages.length === 1 ? 'photo' : 'photos'}
                        </p>
                      </motion.button>
                    )
                  })}
                </div>
              </>
            ) : (
              // If no collections, show all category images
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="relative aspect-[3/4] bg-gray-100 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={getImageUrl(image.filename)}
                      alt={image.title || 'Portfolio image'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {image.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-medium text-sm">{image.title}</h3>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: View Collection Images */}
        {selectedCollection && (
          <div>
            <button
              onClick={() => setSelectedCollection(null)}
              className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal mb-8 transition-colors"
            >
              ← Back to {selectedCategory} collections
            </button>

            {selectedCollection !== '__VIEW_ALL__' && (
              <h2 className="font-migra text-3xl font-medium mb-8">{selectedCollection}</h2>
            )}

            {sortedImages.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p>No images in this collection yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="relative aspect-[3/4] bg-gray-100 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={getImageUrl(image.filename)}
                      alt={image.title || 'Portfolio image'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {image.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-medium text-sm">{image.title}</h3>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

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

