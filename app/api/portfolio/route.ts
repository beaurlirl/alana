import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData } from '@/lib/data'

// Revalidate every 60 seconds for GET requests
export const revalidate = 60

function checkAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin-auth')
  return authCookie?.value === 'true'
}

export async function GET() {
  try {
    const data = await getPortfolioData()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Portfolio GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Validate required structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      )
    }
    
    await savePortfolioData(data)
    
    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    console.error('Portfolio POST error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to save data', details: errorMessage },
      { status: 500 }
    )
  }
}
