export default async function handler(request) {
    const path = request.params.path;
    console.log("Path:", path);
  
    // Build the original Contentstack asset URL
    const originUrl = `https://images.contentstack.io/v3/assets/blt41b5d34d676c7949/bltfb5d4aaa3e3acde1/67c16b49730ebc6334030e5f/${path}`;
  
    // Example: add Contentstack Image API params (resize, format, etc.)
    const optimizedUrl = `${originUrl}?quality=80&auto=webp`; 
  
    // Fetch the optimized asset
    const response = await fetch(optimizedUrl);
    
    // console.log("Response status:", response.status);
    // console.log("Content-Type:", response.headers.get('Content-Type'));
    // console.log("Request URL:", optimizedUrl);
  
    if (!response.ok) {
      console.log("Response not OK, status:", response.status);
      return new Response("Asset not found", { status: 404 });
    }
    
    // Check if we got JSON instead of an image (error response)
    // const contentType = response.headers.get('Content-Type');
    // if (contentType && contentType.includes('application/json')) {
    //   console.log("Got JSON response instead of image, likely an error");
    //   const errorData = response.json();
    //   console.log("Error data:", errorData);
    //   return new Response("Asset not found or error from Contentstack", { status: 404 });
    // }
  
    // Create new response with correct content type for images
    // const newHeaders = new Headers(response.headers);
    
    // Ensure proper content type for images
    
    // If no content type or it's wrong, determine from file extension
    // if (!contentType || contentType.includes('text/html') || contentType.includes('document')) {
    //   const extension = path.split('.').pop()?.toLowerCase();
    //   switch (extension) {
    //     case 'jpg':
    //     case 'jpeg':
    //       contentType = 'image/jpeg';
    //       break;
    //     case 'png':
    //       contentType = 'image/png';
    //       break;
    //     case 'gif':
    //       contentType = 'image/gif';
    //       break;
    //     case 'webp':
    //       contentType = 'image/webp';
    //       break;
    //     case 'svg':
    //       contentType = 'image/svg+xml';
    //       break;
    //     default:
    //       contentType = 'image/jpeg';
    //   }
    // }
    
    // newHeaders.set('Content-Type', contentType);
    // console.log("Final Content-Type:", contentType);
    
    // return new Response(response.body, {
    //   status: response.status,
    //   statusText: response.statusText,
    //   headers: newHeaders
    // });
    return response;
  }




