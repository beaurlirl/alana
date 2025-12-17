'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Collection } from '@/lib/data'

interface ImageUploaderProps {
  onImageUploaded: (filename: string, category: string, collection: string) => void
  categories: string[]
  collections: Collection[]
}

export default function ImageUploader({ onImageUploaded, categories, collections }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [uploadedFilename, setUploadedFilename] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('')
  const [newCollectionName, setNewCollectionName] = useState('')
  const [showNewCollection, setShowNewCollection] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError('')
    
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        // Show category selection modal
        setUploadedFilename(data.filename)
        setShowCategoryModal(true)
        setIsUploading(false)
      } else {
        setError(data.error || 'Upload failed')
        setIsUploading(false)
      }
    } catch (err) {
      setError('Upload failed. Please try again.')
      console.error('Upload error:', err)
      setIsUploading(false)
    }
  }, [])

  const handleCategorySubmit = () => {
    if (!selectedCategory) {
      setError('Please select a category')
      return
    }

    let finalCollection = selectedCollection
    if (showNewCollection && newCollectionName.trim()) {
      finalCollection = newCollectionName.trim()
    }

    onImageUploaded(uploadedFilename, selectedCategory, finalCollection)
    
    // Reset modal
    setShowCategoryModal(false)
    setUploadedFilename('')
    setSelectedCategory('')
    setSelectedCollection('')
    setNewCollectionName('')
    setShowNewCollection(false)
  }

  const categoryCollections = collections.filter(c => c.category === selectedCategory)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: isUploading,
  })

  return (
    <>
      <div>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-charcoal bg-gray-100'
              : 'border-gray-300 hover:border-charcoal'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto"></div>
              <p className="text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <p className="text-lg font-medium">
                  {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or click to select a file
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Supports: JPG, PNG, GIF, WebP (max 50MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Category & Collection Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="font-migra text-2xl font-medium mb-6">Categorize Image</h3>
            
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setSelectedCollection('')
                    setShowNewCollection(false)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-charcoal"
                >
                  <option value="">Choose category...</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Collection Selection */}
              {selectedCategory && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Collection (Optional)
                  </label>
                  {!showNewCollection ? (
                    <>
                      <select
                        value={selectedCollection}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-charcoal mb-2"
                      >
                        <option value="">No collection</option>
                        {categoryCollections.map((collection) => (
                          <option key={collection.name} value={collection.name}>
                            {collection.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setShowNewCollection(true)}
                        className="text-sm text-charcoal hover:opacity-60"
                      >
                        + Create new collection
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        placeholder="e.g., Vogue Italia Spring 2024"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-charcoal mb-2"
                      />
                      <button
                        onClick={() => {
                          setShowNewCollection(false)
                          setNewCollectionName('')
                        }}
                        className="text-sm text-gray-600 hover:opacity-60"
                      >
                        ← Back to existing collections
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-4">{error}</p>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowCategoryModal(false)
                  setError('')
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCategorySubmit}
                className="flex-1 px-4 py-2 bg-charcoal text-white rounded hover:bg-charcoal/80"
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

