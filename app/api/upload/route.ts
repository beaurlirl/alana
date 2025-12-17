import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { validateImageFile } from '@/lib/validation'

// Route segment config for larger uploads
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

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
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.-]/g, '')
      .toLowerCase()
    const filename = `${timestamp}-${sanitizedName}`

    // If Vercel Blob is configured, use it (production)
    if (hasBlobCredentials()) {
      const blob = await put(filename, file, {
        access: 'public',
        addRandomSuffix: false,
      })

      return NextResponse.json({ 
        success: true, 
        filename: blob.url,
        url: blob.url
      })
    }
    
    // Otherwise, save locally (development)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Ensure uploads directory exists
    await mkdir(uploadsDir, { recursive: true })
    
    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const filePath = path.join(uploadsDir, filename)
    await writeFile(filePath, buffer)
    
    return NextResponse.json({ 
      success: true, 
      filename: filename,  // Just the filename for local files
      url: `/uploads/${filename}`
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
