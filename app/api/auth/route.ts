import { NextRequest, NextResponse } from 'next/server'
import { checkPassword } from '@/lib/auth'
import { authSchema } from '@/lib/validation'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = authSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: validationResult.error.flatten().fieldErrors,
        }, 
        { status: 400 }
      )
    }

    const { password } = validationResult.data
    
    if (checkPassword(password)) {
      const response = NextResponse.json({ success: true })
      
      // Set a cookie to maintain authentication
      response.cookies.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      })
      
      return response
    }
    
    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

