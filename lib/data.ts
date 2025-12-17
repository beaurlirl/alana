import { kv } from '@vercel/kv'
import { unstable_noStore as noStore } from 'next/cache'
import fs from 'fs'
import path from 'path'

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
const LOCAL_DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

const defaultData: PortfolioData = {
  images: [],
  heroImage: '',
  modelName: 'Alana Cavanzo',
  heroTagline: 'Model',
  categories: ['Editorial', 'Commercial', 'Runway'],
  collections: [],
}

// Read from local JSON file
function readLocalData(): PortfolioData {
  try {
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      const fileContent = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8')
      const data = JSON.parse(fileContent)
      return normalizeData(data)
    }
  } catch (error) {
    console.error('Error reading local data:', error)
  }
  return defaultData
}

// Write to local JSON file
function writeLocalData(data: PortfolioData): void {
  try {
    const dirPath = path.dirname(LOCAL_DATA_PATH)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing local data:', error)
  }
}

// Normalize data to ensure consistency
function normalizeData(data: PortfolioData): PortfolioData {
  return {
    ...defaultData,
    ...data,
    images: (data.images || []).map((img, index) => ({
      ...img,
      isHero: img.isHero === true || img.isHero === ('true' as unknown as boolean),
      order: typeof img.order === 'number' ? img.order : index,
    })),
    categories: data.categories || defaultData.categories,
    collections: data.collections || [],
  }
}

// Check if we have KV credentials
function hasKVCredentials(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export async function getPortfolioData(): Promise<PortfolioData> {
  noStore()
  
  // If no KV credentials, use local JSON file
  if (!hasKVCredentials()) {
    return readLocalData()
  }
  
  try {
    const data = await kv.get<PortfolioData>(KV_KEY)
    
    if (data) {
      return normalizeData(data)
    }
    
    // If no data in KV, try local file first, then default
    const localData = readLocalData()
    if (localData.images.length > 0) {
      await kv.set(KV_KEY, localData)
      return localData
    }
    
    await kv.set(KV_KEY, defaultData)
    return defaultData
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('KV error, falling back to local:', error)
    }
    return readLocalData()
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const normalizedData = normalizeData(data)
  
  // Always save to local file as backup
  writeLocalData(normalizedData)
  
  // If KV is available, save there too
  if (hasKVCredentials()) {
    try {
      await kv.set(KV_KEY, normalizedData)
    } catch (error) {
      console.error('KV save error:', error)
      throw new Error('Failed to save to database')
    }
  }
}
