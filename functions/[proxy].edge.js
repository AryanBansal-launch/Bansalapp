import { v4 as uuidv4 } from 'uuid';

export default function handler(request) {
  console.log("This is an edge functions test for asset proxy");
  const url = new URL(request.url);
  console.log("URL coming to edge:",url);
  const pathname = url.pathname;
  console.log("Pathname:",pathname);
  // const hostname = url.hostname;
  // console.log(hostname);
  // const filename = pathname.split("/").pop();
  // console.log("Filename:",filename);
  if(pathname.includes('/v3/assets')){
    // const myhostname = 'https://images.contentstack.io';
    console.log("This is a Contentstack asset request");
    
    const newreqHeaders = new Headers(request.headers);
    
    newreqHeaders.set('x-launch-deploymentuid', uuidv4());
    // newreqHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    // newreqHeaders.set('Pragma', 'no-cache');


    const newRequest = new Request('https://images.contentstack.io'+ pathname, {
            redirect: 'follow',
            cf: {
                  cacheTtl: 0,
                  cacheEverything: true,
                  cacheTtlByStatus: { "200-599": 0 },
                  bypassCache: true,
                },
          });
          return fetch(newRequest);
  
    // const originResponse = await fetch('https://images.contentstack.io' + pathname, {
    //   method: request.method,
    //   body: request.body,
    //   headers: newreqHeaders,
    //   cf: {
    //     cacheTtl: 0,
    //     cacheEverything: true,
    //     cacheTtlByStatus: { "200-599": 0 }
    //   },
    // });

    // // Clone response & set custom cache header
    // const newresHeaders = new Headers(originResponse.headers);
    // newresHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    // newresHeaders.set('Pragma', 'no-cache');

    // return new Response(originResponse.body, {
    //   status: originResponse.status,
    //   statusText: originResponse.statusText,
    //   headers: newresHeaders
    // });
  }

  return fetch(request);
}



