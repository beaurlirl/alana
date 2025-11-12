import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { deleteImageSchema } from '@/lib/validation'

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
    
    // Validate input
    const validationResult = deleteImageSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation error',
          details: validationResult.error.flatten().fieldErrors,
        }, 
        { status: 400 }
      )
    }

    const { filename } = validationResult.data
    
    // Delete from Vercel Blob
    // filename is now a full URL from Vercel Blob
    try {
      await del(filename)
      return NextResponse.json({ success: true })
    } catch (error) {
      // File might not exist, that's okay
      console.error('Delete error (non-critical):', error)
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}

// Configure runtime for Vercel
export const runtime = 'edge'

