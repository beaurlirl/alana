import { NextRequest, NextResponse } from 'next/server'
import { checkPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
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
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

