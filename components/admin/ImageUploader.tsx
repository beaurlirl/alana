'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploaderProps {
  onImageUploaded: (filename: string) => void
}

export default function ImageUploader({ onImageUploaded }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError('')
    
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
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
        onImageUploaded(data.filename)
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch (err) {
      setError('Upload failed. Please try again.')
      console.error('Upload error:', err)
    } finally {
      setIsUploading(false)
    }
  }, [onImageUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: isUploading,
  })

  return (
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
                Supports: JPG, PNG, GIF, WebP (max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}

