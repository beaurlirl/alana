import fs from 'fs/promises'
import path from 'path'

export interface PortfolioImage {
  id: string
  filename: string
  title?: string
  description?: string
  order: number
  category?: string
  collection?: string
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

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json')

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
    const fileContent = await fs.readFile(dataFilePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // If file doesn't exist, create it with default data
    await ensureDataDirectory()
    await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2))
    return defaultData
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await ensureDataDirectory()
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
}

async function ensureDataDirectory(): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function ensureUploadsDirectory(): Promise<void> {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  try {
    await fs.access(uploadsDir)
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true })
  }
}

