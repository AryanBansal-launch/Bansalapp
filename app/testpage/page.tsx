import React from 'react'

const page = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/assets`);
    const data = await response.json();
    console.log("API response:", data);
    
    return (
      <div>
        <h1>Test Page - Contentstack Assets</h1>
        
        <div style={{ margin: '20px 0' }}>
          <h3>Image via API (JSON response):</h3>
          <p>Asset URL: {data.assetUrl}</p>
          <p>Full URL: {data.fullUrl}</p>
        </div>
        
        <div style={{ margin: '20px 0' }}>
          <h3>Image via Edge Function (proxied):</h3>
          <p>This should work now with the new edge function route!</p>
          <img 
            src="/api/v3/assets/blt41b5d34d676c7949/blt12253853eb06f352/project thumbnail.png" 
            alt="test via edge function" 
            style={{ maxWidth: '300px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h3>Test URLs:</h3>
          <p><strong>Edge Function URL:</strong> <code>/api/v3/assets/blt41b5d34d676c7949/blt12253853eb06f352/project thumbnail.png</code></p>
          <p><strong>Direct Contentstack URL:</strong> <code>https://images.contentstack.io/v3/assets/blt41b5d34d676c7949/blt12253853eb06f352/project thumbnail.png</code></p>
          <p><strong>Expected Result:</strong> Both should show the same image, with the edge function proxying the request.</p>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in test page:", error);
    return (
      <div>
        <h1>Test Page - Error</h1>
        <p>Error loading assets: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    )
  }
}

export default page
