import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/test2')) {
    return NextResponse.rewrite(new URL('/contact', request.url))
  }
}