
// export default async function handler(request) {
//   const locale = request.headers.get("x-locale") || "";
//   if(!locale) {
//     console.log("Access denied - Locale is not set");
//     return new Response("Forbidden. Your locale is not set.", { status: 403 });
//   }
//   return fetch(request);
// }
import jwt from '@tsndr/cloudflare-worker-jwt';

export default async function handler(request, context) {
  const oauthCredentials = {
    OAUTH_CLIENT_ID: context.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET: context.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
    OAUTH_REDIRECT_URI: context.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URL: context.env.NEXT_PUBLIC_OAUTH_TOKEN_URL
  };
  console.log("oauthCredentials: in proxy edge function");
  console.log(oauthCredentials);
  if (request.url.includes('_next') || request.url.includes('favicon.ico')) {
    return fetch(request);
  }

  if (request.url.includes('/login')) {
    return fetch(request);
  }

  if (request.url.includes('/oauth/callback')) {
    const authCode = new URL(request.url).searchParams.get('code');
    if (authCode) {
      const tokens = await exchangeAuthCodeForTokens(authCode, oauthCredentials);
      const jwtToken = await createJwtToken(tokens, oauthCredentials);
      const response = redirectTo('/');
      const modifiedResponse = setCookie(response, 'jwt', jwtToken);
      return modifiedResponse;
    }
  }

  const cookies = parseCookies(request.headers.get('cookie') || '');
  const jwtToken = cookies['jwt'];

  if (jwtToken) {
    try {
      const verified = await jwt.verify(jwtToken, oauthCredentials.OAUTH_CLIENT_SECRET);
      if (verified) {
        return fetch(request);
      } else {
        const decoded = jwt.decode(jwtToken);
        if (decoded.payload.exp < timeNow()) {
          const newToken = await refreshJwtToken(decoded.payload.refreshToken, oauthCredentials);

          const response = await fetch(request);
          const modifiedResponse = setCookie(response, 'jwt', newToken);
          return modifiedResponse;
        }
      }
    } catch (err) {
      console.log(err);
      return redirectToLogin();
    }
  }
  return redirectToLogin();
}

function parseCookies(cookieString) {
  return cookieString.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=').map(c => c.trim());
    acc[key] = value;
    return acc;
  }, {});
}

function setCookie(response, name, value) {
  const modifiedResponse = new Response(response.body, response);
  modifiedResponse.headers.set('Set-Cookie', `${name}=${value}; Path=/; HttpOnly`);
  return modifiedResponse;
}

function redirectToLogin() {
  return redirectTo('/login');
}

function timeNow() {
  return Math.floor(Date.now() / 1000);
}

function redirectTo(path) {
  const response = new Response(undefined, {
    status: 307,
    headers: {
      'Location': path
    }
  });
  return response;
}

async function exchangeAuthCodeForTokens(authCode, oauthCredentials) {
  const response = await fetch(oauthCredentials.OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: oauthCredentials.OAUTH_CLIENT_ID,
      client_secret: oauthCredentials.OAUTH_CLIENT_SECRET,
      code: authCode,
      redirect_uri: oauthCredentials.OAUTH_REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  });
  const tokens = await response.json();
  if (!response.ok) {
    throw new Error(`Token exchange failed: ${JSON.stringify(tokens)}`);
  }

  return tokens;
}

async function createJwtToken({ access_token, refresh_token, expires_in }, oauthCredentials) {
  const exp = timeNow() + expires_in;
  return jwt.sign({ accessToken: access_token, refreshToken: refresh_token, exp }, oauthCredentials.OAUTH_CLIENT_SECRET);
}

async function refreshJwtToken(refreshToken, oauthCredentials) {
  const response = await fetch(oauthCredentials.OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: oauthCredentials.OAUTH_CLIENT_ID,
      client_secret: oauthCredentials.OAUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  });
  const tokens = await response.json();
  if (!response.ok) {
    throw new Error(`Token refresh failed: ${JSON.stringify(tokens)}`);
  }
  return createJwtToken(tokens, oauthCredentials);
}






// export const config = {
//   runtime: "edge", // Important for Next.js
// };

// export default async function handler(request) {
//   const url = new URL(request.url);
//   console.log("[Edge] Incoming request:", url.href);

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




// //edge function to fix the RSC issue
// export default async function handler(request) {
//   const parsedUrl = new URL(request.url);
//   const route = parsedUrl.pathname;
  
//   // Conditionally call functions based on route or other conditions
//   if (route.startsWith('/assets/')) {
//     return await image_proxy_function(request);
//   }
  
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


// export default function handler(request) {
//   console.log("This is an edge functions test for asset proxy");
//   const url = new URL(request.url);
//   console.log("URL coming to edge:",url);
//   const pathname = url.pathname;
//   console.log("Pathname:",pathname);
//   // const hostname = url.hostname;
//   // console.log(hostname);
//   // const filename = pathname.split("/").pop();
//   // console.log("Filename:",filename);
//   if(pathname.includes('/v3/assets')){
//     const myhostname = 'https://images.contentstack.io';
//     console.log("This is a Contentstack asset request");
    
//     // Create headers with custom cache settings
//     const headers = new Headers(request.headers);
//     headers.set('Cache-Control', 'no-store'); // Cache for 1 year
    
//     const newRequest = new Request(myhostname + pathname, {
//       headers: headers,
//       method: request.method,
//       body: request.body,
//       redirect: 'follow'
//     });
//     return fetch(newRequest);
//   }
//   else{
//     return fetch(request);
//   }
// }



