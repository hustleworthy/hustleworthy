import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isRemovedWebsiteSlug } from '@/data/removedWebsites'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const reviewSlug = pathname.match(/^\/reviews\/([^/]+)\/?$/)?.[1]

  if (reviewSlug && isRemovedWebsiteSlug(decodeURIComponent(reviewSlug))) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }

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
