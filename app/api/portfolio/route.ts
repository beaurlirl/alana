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
    
    console.log('Received data to save:', JSON.stringify(data, null, 2))
    
    // Just save whatever we get - no validation
    await savePortfolioData(data)
    
    console.log('Save successful')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Portfolio POST error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error details:', errorMessage)
    return NextResponse.json({ 
      error: 'Failed to save data',
      details: errorMessage
    }, { status: 500 })
  }
}

