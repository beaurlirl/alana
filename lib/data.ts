import { kv } from '@vercel/kv'
import { unstable_noStore as noStore } from 'next/cache'

export interface PortfolioImage {
  id: string
  filename: string
  title?: string
  description?: string
  order: number
  category?: string
  collection?: string
  isHero?: boolean
}

export interface Collection {
  name: string
  category: string
}

export interface PortfolioData {
  images: PortfolioImage[]
  heroImage?: string
  modelName?: string
  heroTagline?: string
  categories: string[]
  collections: Collection[]
}

const KV_KEY = 'portfolio-data'

const defaultData: PortfolioData = {
  images: [],
  heroImage: '',
  modelName: 'Alana Cabanzo',
  heroTagline: 'Model',
  categories: ['Editorial', 'Commercial', 'Runway'],
  collections: [],
}

export async function getPortfolioData(): Promise<PortfolioData> {
  // Disable caching - always fetch fresh data
  noStore()
  
  try {
    const data = await kv.get<PortfolioData>(KV_KEY)
    
    if (data) {
      // Normalize data to ensure consistency
      return {
        ...defaultData,
        ...data,
        images: (data.images || []).map(img => ({
          ...img,
          // Ensure isHero is always a proper boolean
          isHero: img.isHero === true || img.isHero === ('true' as unknown as boolean),
          // Ensure order is a number
          order: typeof img.order === 'number' ? img.order : 0,
        })),
        categories: data.categories || defaultData.categories,
        collections: data.collections || [],
      }
    }
    
    // Initialize with default data if none exists
    await kv.set(KV_KEY, defaultData)
    return defaultData
  } catch (error) {
    // Log error but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error('KV get error:', error)
    }
    return defaultData
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    // Normalize before saving
    const normalizedData: PortfolioData = {
      ...data,
      images: (data.images || []).map((img, index) => ({
        ...img,
        isHero: img.isHero === true,
        order: typeof img.order === 'number' ? img.order : index,
      })),
    }
    
    await kv.set(KV_KEY, normalizedData)
  } catch (error) {
    console.error('KV save error:', error)
    throw new Error('Failed to save to database')
  }
}
