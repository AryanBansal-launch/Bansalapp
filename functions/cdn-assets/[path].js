export default async function handler(request, response) {
    const path = request.params.path;
    console.log("Path:", path);
  
    // Build the Contentstack asset URL
    const contentstackUrl = `https://images.contentstack.io/v3/assets/blt41b5d34d676c7949/bltfb5d4aaa3e3acde1/67c16b49730ebc6334030e5f/${path}`;
    
    // Add optimization parameters
    const optimizedUrl = `${contentstackUrl}?quality=80&auto=webp`;
    
    console.log("Fetching from:", optimizedUrl);
  
    try {
      // Fetch the image from Contentstack
      const imageResponse = await fetch(optimizedUrl);
      
      console.log("Response status:", imageResponse.status);
      console.log("Content-Type:", imageResponse.headers.get('Content-Type'));
      
      if (!imageResponse.ok) {
        console.log("Image not found, status:", imageResponse.status);
        return response.status(404).json({ error: "Image not found" });
      }
      
      // Get the image buffer
      const imageBuffer = await imageResponse.arrayBuffer();
      
      // Set appropriate headers
      response.setHeader('Content-Type', imageResponse.headers.get('Content-Type') || 'image/png');
      response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      
      // Send the image
      response.status(200).send(Buffer.from(imageBuffer));
      
    } catch (error) {
      console.error("Error fetching image:", error);
      return response.status(500).json({ error: "Error fetching image" });
    }
}