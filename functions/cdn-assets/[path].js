export default async function handler(request, response) {
    const path = request.params.path;
    console.log("Path:", path);
  
    // Build the original Contentstack asset URL
    const originUrl = `https://images.contentstack.io/v3/assets/blt41b5d34d676c7949/bltfb5d4aaa3e3acde1/67c16b49730ebc6334030e5f/${path}`;
  
    // Example: add Contentstack Image API params (resize, format, etc.)
    const optimizedUrl = `${originUrl}?quality=80&auto=webp`; 
  
    // Fetch the optimized asset
    const myresponse = await fetch(optimizedUrl);
    
  
    if (!myresponse.ok) {
      console.log("Response not OK, status:", response.status);
      response.status(404).json({ error: "Asset not found" });
    }
    
    const newHeaders = new Headers(myresponse.headers);
    newHeaders.set('Content-Type', 'image/png');
    
    response.status(myresponse.status).send(myresponse.body, { headers: newHeaders });

  }




