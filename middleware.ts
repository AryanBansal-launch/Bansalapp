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
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();
//   if (request.nextUrl.pathname === '/testpage') {
//     response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=60');
//   }
//   return response;
// }

// export const config = {
//   matcher: ['/testpage'], // Add more paths as needed
// };

import { NextResponse } from "next/server";
import http from "http";

let started = false;

export function middleware() {
  // ❌ BAD PRACTICE: starting a server inside middleware
  if (!started) {
    http
      .createServer((req, res) => {
        res.end("Hello from rogue server!");
      })
      .listen(4000); // 🚨 will throw EADDRINUSE in Launch
    started = true;
    console.log("🚨 Started rogue server on port 4000");
  }

  return NextResponse.next();
}

