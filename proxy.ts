import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('authToken')?.value
  
  // Root redirect
  if (pathname === '/') {
    const destination = token ? '/dashboard' : '/login'
    return NextResponse.redirect(new URL(destination, request.url))
  }
  
  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/ai-usage']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Public routes (redirect to dashboard if logged in)
  const publicRoutes = ['/login', '/register']
  const isPublic = publicRoutes.some(route => pathname.startsWith(route))
  
  if (isPublic && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}