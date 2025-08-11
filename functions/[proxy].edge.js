//edge function to fix the RSC issue
// export default async function handler(request) {
//   const parsedUrl = new URL(request.url);
//   const route = parsedUrl.pathname;
  
  
//   if (route === '/example') {
//     return await example_edge_function(request);
//   }
  
//   // For all other routes, use RSC function
//   return await rsc_edge_function(request);
// }

// //1. Edge function to fix the RSC issue
// const rsc_edge_function = async (request) => {
//   const RSC_REDIRECT_PATHS = [
//     '/about','/projects','/skills'
//   ];
//   const RSC_HEADER = 'Rsc';
//   const RSC_HEADER_VALUE = '1';
//   const RSC_QUERY_PARAM = 'rsc';
//     console.log("This is an edge functions test");
//     const parsedUrl = new URL(request.url);
//     const route = parsedUrl.pathname;
//     const rscQueryParamExists = !!parsedUrl.searchParams.get(RSC_QUERY_PARAM);
//     const rscHeaderExists = request.headers.get(RSC_HEADER) === RSC_HEADER_VALUE;
//     const isRscRedirectPath = RSC_REDIRECT_PATHS.indexOf(route) > -1;
  
//     if (isRscRedirectPath && !rscQueryParamExists && rscHeaderExists) {
//         const modifiedRequest = new Request(request);
//         modifiedRequest.headers.delete(RSC_HEADER);
//         return fetch(modifiedRequest);
//     }
//     return fetch(request);
//   }

//   //2. Edge function to handle the example route
//   const example_edge_function = async (request) => {
//     const parsedUrl = new URL(request.url);
//     const route = parsedUrl.pathname;
//     if (route === '/example') {
//       const response = {
//         time: new Date()
//       }
//       return new Response(JSON.stringify(response))
//     }
//     return fetch(request)
//    }


// const CONTENTSTACK_CDN_HOST = 'https://images.contentstack.io';

// const PROXY_PATH = '/assets/';

// //3. Edge function to handle Contentstack asset proxy
// const image_proxy_function = async (request) => {
//   // 1. Parse the incoming request URL
//   const url = new URL(request.url);
//   const pathname = url.pathname;

//   // 2. Check if the requested path starts with our designated proxy path
//   if (pathname.startsWith(PROXY_PATH)) {
//     // Extract the asset path after /assets/
//     const assetPath = pathname.replace(PROXY_PATH, '');
    
//     // Construct the Contentstack CDN URL by combining the host with the asset path
//     const targetUrl = CONTENTSTACK_CDN_HOST + '/v3/assets/' + assetPath + url.search;

//     console.log(`Proxying asset request for: ${pathname} -> to -> ${targetUrl}`);

//     // 3. Create a new Request object to fetch the asset from Contentstack CDN
//     const newRequest = new Request(targetUrl, {
//       headers: request.headers,
//       method: request.method,
//       body: request.body,
//       redirect: 'follow'
//     });

//     try {
//       // 4. Fetch the asset from Contentstack CDN
//       const response = await fetch(newRequest);

//       // 5. Return the CDN's response directly to the user
//       return response;

//     } catch (error) {
//       console.error('Failed to fetch from Contentstack CDN:', error);
//       return new Response('Error fetching asset from Contentstack.', { status: 502 });
//     }
//   }

//   // 6. If the path does NOT match our proxy path, just fetch the request normally
//   return fetch(request);
// }


//3. Edge function to handle Contentstack asset proxy


// export default async function handler(request) {
//   // const hostname = url.hostname;
//   // console.log(hostname);
//   // const filename = pathname.split("/").pop();
//   // console.log("Filename:",filename);
//   const url = new URL(request.url);
//   const pathname = url.pathname;
//   if(pathname.includes('/v3/assets')){
//     console.log("This is an edge functions test for asset proxy");
//     console.log("URL coming to edge:",url);
//     console.log("Pathname:",pathname);
//     const myhostname = 'https://images.contentstack.io';
//     console.log("This is a Contentstack asset request");
    
//     // Create headers with custom cache settings
//     const headers = new Headers(request.headers);
//     headers.set('Cache-Control', 'no-store');
    
//     const newRequest = new Request(myhostname + pathname, {
//       headers: headers,
//       method: request.method,
//       body: request.body,
//       redirect: 'follow'
//     });
//     const newURL = new URL(newRequest.url);
//     console.log("New modifiedURL:",newURL);
//     console.log("New headers:",newRequest.headers.get('Cache-Control'));
//     // const newresponse= await fetch(newRequest);
//     // newresponse.headers.set('Cache-Control', 'no-store');
//     // return newresponse;
//     return fetch(newRequest);
//   }
//   else{
//     return fetch(request);
//   }
// }

//chatgpt suggested way
export default async function handler(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.includes('/v3/assets')) {
    console.log("Proxying Contentstack asset:", pathname);

    const newreqHeaders = new Headers(request.headers);
    newreqHeaders.set('Cache-Control', 'no-store , s-maxage=0');

    // Fetch original asset
    const originResponse = await fetch('https://images.contentstack.io' + pathname, {
      method: request.method,
      body: request.body,
      headers: newreqHeaders,
      cf: {
        cacheTtl: 0,
        cacheEverything: true,
        cacheTtlByStatus: { "200-599": 0 }
      },
    });

    // Clone response & set custom cache header
    const newresHeaders = new Headers(originResponse.headers);
    newresHeaders.set('Cache-Control', 'no-store, s-maxage=0');

    return new Response(originResponse.body, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers: newresHeaders
    });
  }

  return fetch(request);
}
