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
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    await savePortfolioData(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}

