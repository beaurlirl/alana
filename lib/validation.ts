import { z } from 'zod'

// Auth validation
export const authSchema = z.object({
  password: z.string().min(1, 'Password is required'),
})

// Portfolio image validation (lenient)
export const portfolioImageSchema = z.object({
  id: z.string(),
  filename: z.string(),
  title: z.string().optional().default(''),
  description: z.string().optional().default(''),
  order: z.number().int().min(0).default(0),
  category: z.string().optional().default(''),
  collection: z.string().optional().default(''),
}).passthrough() // Allow additional fields

// Collection validation
export const collectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required'),
  category: z.string().min(1, 'Category is required'),
})

// Portfolio data validation (lenient for flexibility)
export const portfolioDataSchema = z.object({
  images: z.array(portfolioImageSchema).default([]),
  heroImage: z.string().optional().default(''),
  modelName: z.string().optional().default(''),
  heroTagline: z.string().optional().default(''),
  categories: z.array(z.string()).default(['Editorial', 'Commercial', 'Runway']),
  collections: z.array(collectionSchema).optional().default([]),
}).passthrough() // Allow additional fields without validation

// Delete image validation
export const deleteImageSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
})

// File upload validation
export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB for high-quality portfolio images
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size exceeds 50MB limit.',
    }
  }

  return { valid: true }
}

