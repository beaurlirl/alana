import { kv } from '@vercel/kv'

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
  try {
    // Try to get data from Vercel KV
    const data = await kv.get<PortfolioData>(KV_KEY)
    
    if (data) {
      return data
    }
    
    // If no data exists, initialize with default
    await kv.set(KV_KEY, defaultData)
    return defaultData
  } catch (error) {
    console.error('KV get error:', error)
    // Fallback to default data if KV fails
    return defaultData
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    await kv.set(KV_KEY, data)
    console.log('Data saved to Vercel KV successfully')
  } catch (error) {
    console.error('KV save error:', error)
    throw new Error('Failed to save to database')
  }
}

