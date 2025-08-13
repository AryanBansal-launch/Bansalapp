import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const assetPath = `/v3/assets/${path}`;
    
    console.log("[Edge] Asset request detected for:", assetPath);
    
    // Construct the Contentstack CDN URL
    const contentstackUrl = `https://images.contentstack.io${assetPath}`;
    console.log("[Edge] Fetching from Contentstack URL:", contentstackUrl);

    // Fetch the asset from Contentstack CDN
    const response = await fetch(contentstackUrl, {
      method: 'GET',
      headers: {
        'User-Agent': request.headers.get('User-Agent') || 'Next.js Edge Function',
      },
    });

    console.log("[Edge] Contentstack response status:", response.status);

    if (!response.ok) {
      console.error("[Edge] Contentstack response not ok:", response.status, response.statusText);
      return new Response('Asset not found', { status: response.status });
    }

    // Get the response body and headers
    const body = await response.arrayBuffer();
    const headers = new Headers(response.headers);

    // Set cache control headers to prevent caching
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    headers.set('CDN-Cache-Control', 'no-store');
    headers.set('Vary', 'Accept-Encoding');

    console.log("[Edge] Returning asset with headers:", Object.fromEntries(headers.entries()));

    return new Response(body, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("[Edge] Error proxying asset:", error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
