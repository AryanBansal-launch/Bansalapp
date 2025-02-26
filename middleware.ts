//trying midleware for redirection
//the url is not re-written, the page that is rendered is of /contact but url remains as /test2
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/contact', request.url))
  }
}
