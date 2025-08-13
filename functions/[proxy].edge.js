// import { v4 as uuidv4 } from 'uuid';

// export default function handler(request) {
//   // console.log("This is an edge functions test for asset proxy");
//   const url = new URL(request.url);
//   // console.log("URL coming to edge:",url);
//   const pathname = url.pathname;
//   // console.log("Pathname:",pathname);
//   if(pathname.includes('/v3/assets')){
//     // const myhostname = 'https://images.contentstack.io';
//     console.log("This is a Contentstack asset request");
//     console.log("old request:",request.url);
    
//     const newreqHeaders = new Headers(request.headers);
    
//     newreqHeaders.set('x-launch-deploymentuid', uuidv4());
//     // newreqHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate');
//     // newreqHeaders.set('Pragma', 'no-cache');


//     const newRequest = new Request('https://images.contentstack.io'+ pathname, {
//             redirect: 'follow',
//             cf: {
//                   cacheTtl: 0,
//                   cacheEverything: true,
//                   cacheTtlByStatus: { "200-599": 0 },
//                   bypassCache: true,
//                 },
//           });
//           console.log("New request:",newRequest.url);
//           return fetch(newRequest);
  
//     // const originResponse = await fetch('https://images.contentstack.io' + pathname, {
//     //   method: request.method,
//     //   body: request.body,
//     //   headers: newreqHeaders,
//     //   cf: {
//     //     cacheTtl: 0,
//     //     cacheEverything: true,
//     //     cacheTtlByStatus: { "200-599": 0 }
//     //   },
//     // });

//     // // Clone response & set custom cache header
//     // const newresHeaders = new Headers(originResponse.headers);
//     // newresHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate');
//     // newresHeaders.set('Pragma', 'no-cache');

//     // return new Response(originResponse.body, {
//     //   status: originResponse.status,
//     //   statusText: originResponse.statusText,
//     //   headers: newresHeaders
//     // });
//   }

//   return fetch(request);
// }

// export default function handler() {
//   return fetch('https://jsonplaceholder.typicode.com/posts');
// }

// export const config = {
//   runtime: "edge", // Important for Next.js
// };

// export default async function handler(request) {
//   const url = new URL(request.url);
//   console.log("[Edge] Incoming request:", url.href);
//   const filename = url.pathname.split("/").pop();
//   console.log("[Edge] Filename:", filename);

//   if (url.pathname.startsWith("/v3/assets/")) {
//     console.log("[Edge] Asset request detected for:", url.pathname);

//     const fastlyUrl = `https://images.contentstack.io${url.pathname}`;
//     console.log("[Edge] Fetching from Fastly URL:", fastlyUrl);

//     const fastlyResponse = await fetch(fastlyUrl, {
//       cf: {
//         cacheTtl: 0,           // No Cloudflare cache for fetch
//         cacheEverything: false
//       }
//     });

//     console.log("[Edge] Fastly response status:", fastlyResponse.status);
//     console.log("[Edge] Fastly response cache-control:", fastlyResponse.headers.get("cache-control"));

//     const newHeaders = new Headers(fastlyResponse.headers);
//     newHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
//     newHeaders.set("Pragma", "no-cache");
//     newHeaders.set("Expires", "0");
//     newHeaders.set("CDN-Cache-Control", "no-store"); // For Cloudflare CDN
//     newHeaders.set("Vary", "Accept-Encoding");

//     console.log("[Edge] Returning response to browser with headers:", Object.fromEntries(newHeaders.entries()));

//     return new Response(fastlyResponse.body, {
//       status: fastlyResponse.status,
//       headers: newHeaders
//     });
//   }

//   console.log("[Edge] Non-asset request, passing through.");
//   return fetch(request);
// }

export default function handler(request, context) {
    const parsedUrl = new URL(request.url);
    const route = parsedUrl.pathname;
    if (route === '/appliances') {
      const response = {
        time: new Date()
      }
      return new Response(JSON.stringify(response))
    }
    return fetch(request)
   }