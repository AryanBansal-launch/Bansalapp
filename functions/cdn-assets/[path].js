export default async function handler(request) {
    // const url = new URL(request.url);
    // console.log("URL:", url);
    // Get everything after `/cdn-assets/`
    const path = request.params.path;
    console.log("Path:", path);
  
    // Build the original Contentstack asset URL
    const originUrl = `https://images.contentstack.io/v3/assets/blt41b5d34d676c7949/bltfb5d4aaa3e3acde1/67c16b49730ebc6334030e5f/${path}`;
  
    // Example: add Contentstack Image API params (resize, format, etc.)
    const optimizedUrl = `${originUrl}?quality=80&auto=webp`;
  
    // Fetch the optimized asset
    const response = await fetch(optimizedUrl);
  
    if (!response.ok) {
      return new Response("Asset not found", { status: 404 });
    }
  
    // Stream asset back to client
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable" // cache for 1 year
      },
    });
  }
  