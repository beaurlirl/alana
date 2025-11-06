import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'

function checkAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin-auth')
  return authCookie?.value === 'true'
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { filename } = await request.json()
    
    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 })
    }

    const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
    
    try {
      await unlink(filepath)
      return NextResponse.json({ success: true })
    } catch (error) {
      // File might not exist, that's okay
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}

