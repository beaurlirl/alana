import { z } from 'zod'

// Auth validation
export const authSchema = z.object({
  password: z.string().min(1, 'Password is required'),
})

// Portfolio image validation
export const portfolioImageSchema = z.object({
  id: z.string(),
  filename: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().min(0),
  category: z.string().optional(),
  collection: z.string().optional(),
})

// Collection validation
export const collectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required'),
  category: z.string().min(1, 'Category is required'),
})

// Portfolio data validation
export const portfolioDataSchema = z.object({
  images: z.array(portfolioImageSchema),
  heroImage: z.string().optional(),
  modelName: z.string().optional(),
  heroTagline: z.string().optional(),
  categories: z.array(z.string()),
  collections: z.array(collectionSchema),
})

// Delete image validation
export const deleteImageSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
})

// File upload validation
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
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
      error: 'File size exceeds 10MB limit.',
    }
  }

  return { valid: true }
}

