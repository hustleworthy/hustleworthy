import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle case-sensitive redirects for specific review slugs
  // Redirect uppercase variants to lowercase to avoid duplicate content
  if (pathname === '/reviews/Bigcashweb') {
    return NextResponse.redirect(
      new URL('/reviews/bigcashweb', request.url),
      { status: 301 } // Permanent redirect
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/reviews/:path*',
}
