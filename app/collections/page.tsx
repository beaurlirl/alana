'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PortfolioImage, PortfolioData, Collection } from '@/lib/data'

export default function Collections() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [selectedCollection, setSelectedCollection] = useState<string>('All')
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
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal"></div>
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

  // Get all unique collections for filtering
  const allCollections = ['All', ...data.categories, ...(data.collections || []).map(c => c.name)]
  
  const filteredImages = selectedCollection === 'All' 
    ? data.images 
    : data.categories.includes(selectedCollection)
      ? data.images.filter(img => img.category === selectedCollection)
      : data.images.filter(img => img.collection === selectedCollection)

  const sortedImages = [...filteredImages].sort((a, b) => a.order - b.order)

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-migra text-4xl md:text-5xl lg:text-6xl font-medium mb-8">
          Collections
        </h1>

        {/* Collection Filters */}
        <div className="space-y-4 mb-12">
          {/* All button and Categories on same line */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCollection('All')}
              className={`px-4 py-2 text-sm transition-all ${
                selectedCollection === 'All'
                  ? 'bg-charcoal text-cream'
                  : 'bg-transparent border border-charcoal/20 hover:border-charcoal/40'
              }`}
            >
              All
            </button>

            {/* Categories */}
            {data.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCollection(category)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  selectedCollection === category
                    ? 'bg-charcoal text-cream'
                    : 'bg-transparent border border-charcoal/20 hover:border-charcoal/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Collections under each category */}
          {data.categories.map((category) => {
            const categoryCollections = (data.collections || []).filter(c => c.category === category)
            if (categoryCollections.length === 0) return null
            
            return (
              <div key={`${category}-collections`} className="flex flex-wrap gap-2 ml-6">
                {categoryCollections.map((collection) => (
                  <button
                    key={collection.name}
                    onClick={() => setSelectedCollection(collection.name)}
                    className={`px-3 py-1.5 text-sm transition-all ${
                      selectedCollection === collection.name
                        ? 'bg-charcoal/80 text-cream'
                        : 'bg-charcoal/10 hover:bg-charcoal/20'
                    }`}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            )
          })}
        </div>

        {/* Images Grid */}
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
              >
                <Image
                  src={`/uploads/${image.filename}`}
                  alt={image.title || 'Portfolio image'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                
                {image.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-medium text-sm">
                      {image.title}
                    </h3>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  )
}

