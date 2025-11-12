'use client'

import { useState, useEffect } from 'react'
import { PortfolioData, PortfolioImage, Collection } from '@/lib/data'
import ImageUploader from './ImageUploader'
import ImageManager from './ImageManager'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [newCollection, setNewCollection] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showAddCollection, setShowAddCollection] = useState(false)

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

  const saveData = async (newData: PortfolioData) => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      })

      if (response.ok) {
        setData(newData)
        setSaveMessage('Saved successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('Failed to save')
      }
    } catch (error) {
      console.error('Failed to save data:', error)
      setSaveMessage('Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUploaded = (filename: string, category: string, collection: string) => {
    if (!data) return

    const newImage: PortfolioImage = {
      id: Date.now().toString(),
      filename,
      title: '',
      description: '',
      order: data.images.length,
      category: category || undefined,
      collection: collection || undefined,
    }

    // If a new collection was created during upload, add it to collections
    const collections = data.collections || []
    if (collection && category && !collections.some(c => c.name === collection && c.category === category)) {
      saveData({
        ...data,
        images: [...data.images, newImage],
        collections: [...collections, { name: collection, category }]
      })
    } else {
      saveData({
        ...data,
        images: [...data.images, newImage],
      })
    }
  }

  const handleImagesReordered = (images: PortfolioImage[]) => {
    if (!data) return
    saveData({ ...data, images })
  }

  const handleImageUpdated = (updatedImage: PortfolioImage) => {
    if (!data) return

    const updatedImages = data.images.map(img =>
      img.id === updatedImage.id ? updatedImage : img
    )

    saveData({ ...data, images: updatedImages })
  }

  const handleImageDeleted = async (image: PortfolioImage) => {
    if (!data) return

    // Delete the file
    try {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: image.filename }),
      })
    } catch (error) {
      console.error('Failed to delete file:', error)
    }

    // Remove from data
    const updatedImages = data.images.filter(img => img.id !== image.id)
    saveData({ ...data, images: updatedImages })
  }

  const handleAddCollection = () => {
    if (!data || !newCollection.trim() || !selectedCategory) return

    const collections = data.collections || []
    const collectionExists = collections.some(c => c.name === newCollection.trim() && c.category === selectedCategory)
    
    if (!collectionExists) {
      saveData({
        ...data,
        collections: [...collections, { name: newCollection.trim(), category: selectedCategory }]
      })
    }
    setNewCollection('')
    setSelectedCategory('')
    setShowAddCollection(false)
  }

  const handleDeleteCollection = (collection: Collection) => {
    if (!data) return
    
    if (confirm(`Delete collection "${collection.name}"? Images will not be deleted.`)) {
      saveData({
        ...data,
        collections: (data.collections || []).filter(c => !(c.name === collection.name && c.category === collection.category))
      })
    }
  }

  // Group collections by category
  const getCollectionsByCategory = (category: string) => {
    return (data?.collections || []).filter(c => c.category === category)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <header className="bg-cream shadow-sm sticky top-0 z-10">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </header>

        <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 space-y-12">
          <section>
            <div className="h-10 w-64 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="h-48 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </section>

          <section>
            <div className="h-10 w-64 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-cream rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load data</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-cream shadow-sm sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <h1 className="font-migra text-2xl font-medium">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className="text-sm text-green-600">{saveMessage}</span>
            )}
            {isSaving && (
              <span className="text-sm text-gray-600">Saving...</span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              View Site →
            </a>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-charcoal text-white rounded hover:bg-charcoal/80 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 space-y-12">
        {/* Collections Management Section */}
        <section>
          <h2 className="font-migra text-3xl font-medium mb-6">Manage Collections</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-sm opacity-60 mb-6">Organize photos by category (Editorial, Commercial, Runway) and create specific collections for shoots</p>
            
            {/* Display collections by category */}
            <div className="space-y-6 mb-6">
              {data.categories.map((category) => (
                <div key={category}>
                  <h3 className="font-medium text-sm mb-2 text-charcoal">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {getCollectionsByCategory(category).length > 0 ? (
                      getCollectionsByCategory(category).map((collection) => (
                        <div
                          key={`${collection.category}-${collection.name}`}
                          className="flex items-center gap-2 bg-charcoal/10 px-3 py-1.5 rounded text-sm"
                        >
                          <span>{collection.name}</span>
                          <button
                            onClick={() => handleDeleteCollection(collection)}
                            className="text-red-600 hover:text-red-800 text-xs font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No collections yet</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {showAddCollection ? (
              <div className="space-y-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-charcoal"
                >
                  <option value="">Select Category First</option>
                  {data.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {selectedCategory && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCollection}
                      onChange={(e) => setNewCollection(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCollection()}
                      placeholder="e.g., Vogue Italia Spring 2024"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-charcoal"
                      autoFocus
                    />
                    <button
                      onClick={handleAddCollection}
                      className="px-6 py-2 bg-charcoal text-white rounded hover:bg-charcoal/80 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowAddCollection(false)
                    setNewCollection('')
                    setSelectedCategory('')
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddCollection(true)}
                className="px-4 py-2 bg-charcoal text-white rounded hover:bg-charcoal/80 transition-colors text-sm"
              >
                + New Collection
              </button>
            )}
          </div>
        </section>

        {/* Hero Images Note */}
        <section>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              💡 <strong>Tip:</strong> Tag images as &ldquo;Featured&rdquo; in the Image Manager below to display them in the homepage hero scroll effect
            </p>
          </div>
        </section>

        {/* Upload Section */}
        <section>
          <h2 className="font-migra text-3xl font-medium mb-6">Upload New Image</h2>
          <ImageUploader 
            onImageUploaded={handleImageUploaded}
            categories={data.categories}
            collections={data.collections || []}
          />
        </section>

        {/* Image Management Section */}
        <section>
          <h2 className="font-migra text-3xl font-medium mb-6">
            Manage Images ({data.images.length})
          </h2>
          <ImageManager
            images={data.images}
            categories={data.categories}
            collections={data.collections || []}
            onReorder={handleImagesReordered}
            onUpdate={handleImageUpdated}
            onDelete={handleImageDeleted}
          />
        </section>
      </main>
    </div>
  )
}

