import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  let userName = 'Not authenticated'
  
  try {
    if (session) {
      const sessionData = JSON.parse(decodeURIComponent(session.value))
      userName = sessionData?.user?.name || 'Unknown'
    }
  } catch (e) {
    // Session parsing failed
  }

  console.log('Current user name is:', userName)
  console.log('=== Request Details ===')
  console.log('Path:', request.nextUrl.pathname)
  console.log('Headers:', Object.fromEntries(request.headers))
  console.log('Session:', session)

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/auth/:path*',
    '/login',
    '/dashboard/:path*'
  ]
} 