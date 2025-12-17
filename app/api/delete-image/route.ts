import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { unlink } from 'fs/promises'
import path from 'path'

function checkAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin-auth')
  return authCookie?.value === 'true'
}

// Check if Vercel Blob is configured
function hasBlobCredentials(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
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

    // If it's a Vercel Blob URL, delete from Blob
    if (filename.startsWith('https://') && hasBlobCredentials()) {
      try {
        await del(filename)
      } catch {
        // File might not exist, that's okay
      }
    } 
    // If it's a local file (doesn't start with http), delete locally
    else if (!filename.startsWith('http')) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'uploads', filename)
        await unlink(filePath)
      } catch {
        // File might not exist, that's okay
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
