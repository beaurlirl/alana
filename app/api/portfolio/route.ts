import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData } from '@/lib/data'

function checkAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin-auth')
  return authCookie?.value === 'true'
}

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Portfolio GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Simple validation - just check it's an object with required fields
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    // Ensure images array exists
    if (!Array.isArray(data.images)) {
      data.images = []
    }
    
    // Ensure collections array exists  
    if (!Array.isArray(data.collections)) {
      data.collections = []
    }
    
    // Ensure categories array exists
    if (!Array.isArray(data.categories)) {
      data.categories = ['Editorial', 'Commercial', 'Runway']
    }

    await savePortfolioData(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Portfolio POST error:', error)
    return NextResponse.json({ 
      error: 'Failed to save data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

