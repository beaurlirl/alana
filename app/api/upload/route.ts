import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { ensureUploadsDirectory } from '@/lib/data'

function checkAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin-auth')
  return authCookie?.value === 'true'
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

    // Ensure uploads directory exists
    await ensureUploadsDirectory()

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, '-')
    const filename = `${timestamp}-${originalName}`

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
    await writeFile(filepath, buffer)

    return NextResponse.json({ 
      success: true, 
      filename,
      url: `/uploads/${filename}`
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

