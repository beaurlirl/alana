import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'

function checkAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin-auth')
  return authCookie?.value === 'true'
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { filename } = body
    
    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 })
    }

    // Delete from Vercel Blob
    try {
      await del(filename)
      return NextResponse.json({ success: true })
    } catch (error) {
      // File might not exist, that's okay
      console.log('Delete error (file may not exist):', error)
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}

