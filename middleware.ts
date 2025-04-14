// //trying midleware for redirection
// //the url is not re-written, the page that is rendered is of /contact but url remains as /test2
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith('/test2')) {
//     return NextResponse.rewrite(new URL('/contact', request.url))
//   }
// }

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (request.nextUrl.pathname === '/testpage') {
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=60');
  }
  return response;
}

export const config = {
  matcher: ['/testpage'], // Add more paths as needed
};
