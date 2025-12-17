'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PortfolioImage } from '@/lib/data'
import { getImageUrl } from '@/lib/image-url'
import { Collection } from '@/lib/data'

interface ImageManagerProps {
  images: PortfolioImage[]
  categories: string[]
  collections: Collection[]
  onReorder: (images: PortfolioImage[]) => void
  onUpdate: (image: PortfolioImage) => void
  onDelete: (image: PortfolioImage) => void
}

export default function ImageManager({ images, categories, collections, onReorder, onUpdate, onDelete }: ImageManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '', collection: '' })
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const sortedImages = [...images].sort((a, b) => a.order - b.order)

  const handleEdit = (image: PortfolioImage) => {
    setEditingId(image.id)
    setEditForm({
      title: image.title || '',
      description: image.description || '',
      category: image.category || '',
      collection: image.collection || '',
    })
  }

  const handleSaveEdit = (image: PortfolioImage) => {
    onUpdate({
      ...image,
      title: editForm.title,
      description: editForm.description,
      category: editForm.category,
      collection: editForm.collection,
    })
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({ title: '', description: '', category: '', collection: '' })
  }

  // Get collections for selected category
  const getCollectionsForCategory = (category: string) => {
    return collections.filter(c => c.category === category)
  }

  const handleDelete = (image: PortfolioImage) => {
    if (confirm('Are you sure you want to delete this image? This cannot be undone.')) {
      onDelete(image)
    }
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = sortedImages.findIndex(img => img.id === draggedId)
    const targetIndex = sortedImages.findIndex(img => img.id === targetId)

    const newImages = [...sortedImages]
    const [draggedImage] = newImages.splice(draggedIndex, 1)
    newImages.splice(targetIndex, 0, draggedImage)

    // Update order
    const reorderedImages = newImages.map((img, index) => ({
      ...img,
      order: index,
    }))

    onReorder(reorderedImages)
    setDraggedId(null)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
  }

  if (sortedImages.length === 0) {
    return (
      <div className="text-center py-12 bg-cream rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No images yet. Upload your first image above.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedImages.map((image) => (
        <div
          key={image.id}
          draggable
          onDragStart={(e) => handleDragStart(e, image.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, image.id)}
          onDragEnd={handleDragEnd}
          className={`bg-cream rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
            draggedId === image.id ? 'opacity-50' : ''
          } cursor-move`}
        >
          {/* Image Preview */}
          <div className="relative aspect-[3/4] bg-gray-100">
            <Image
              src={getImageUrl(image.filename)}
              alt={image.title || 'Portfolio image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              #{image.order + 1}
            </div>
            
            {/* Hero/Featured Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                const newIsHero = image.isHero !== true
                onUpdate({ ...image, isHero: newIsHero })
              }}
              className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded transition-all ${
                image.isHero === true
                  ? 'bg-yellow-500 text-white shadow-lg' 
                  : 'bg-white/90 text-gray-700 hover:bg-white'
              }`}
              title={image.isHero === true ? 'Remove from homepage' : 'Feature on homepage'}
            >
              {image.isHero === true ? '⭐ Featured' : '☆ Feature'}
            </button>
          </div>

          {/* Image Info */}
          <div className="p-4 space-y-3">
            {editingId === image.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Title (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-charcoal"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description (optional)"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-charcoal resize-none"
                />
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value, collection: '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-charcoal"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {editForm.category && (
                  <select
                    value={editForm.collection}
                    onChange={(e) => setEditForm({ ...editForm, collection: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-charcoal"
                  >
                    <option value="">Select Collection</option>
                    {getCollectionsForCategory(editForm.category).map((collection) => (
                      <option key={collection.name} value={collection.name}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(image)}
                    className="flex-1 px-3 py-1.5 bg-charcoal text-white rounded text-sm hover:bg-charcoal/80 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 px-3 py-1.5 bg-gray-200 text-charcoal rounded text-sm hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="min-h-[70px]">
                  {image.title && (
                    <h3 className="font-medium text-sm mb-1 line-clamp-1">{image.title}</h3>
                  )}
                  {(image.category || image.collection) && (
                    <div className="flex flex-wrap gap-1 mb-1">
                      {image.category && (
                        <span className="text-xs bg-charcoal text-white px-2 py-0.5 rounded">
                          {image.category}
                        </span>
                      )}
                      {image.collection && (
                        <span className="text-xs bg-charcoal/10 px-2 py-0.5 rounded">
                          {image.collection}
                        </span>
                      )}
                    </div>
                  )}
                  {image.description && (
                    <p className="text-xs text-gray-600 line-clamp-2">{image.description}</p>
                  )}
                  {!image.title && !image.description && !image.category && !image.collection && (
                    <p className="text-xs text-gray-400 italic">No details added</p>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2 border-t">
                  <button
                    onClick={() => handleEdit(image)}
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-charcoal rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(image)}
                    className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

