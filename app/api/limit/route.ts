import { NextResponse } from "next/server";

interface ApiResult {
  url: string;
  status: number;
  success: boolean;
  message: string;
  response?: unknown;
}

export async function POST() {
  console.log("Starting POST calls to all API endpoints");
  
  // Define all your API endpoints
  const apiEndpoints = [
    // Your existing Contentstack deployment URLs
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39ccc5c07cde10214bb0",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39da791e8b259ff3c9bc",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39e519579a4282152f10",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39f6791e8b259ff3c9e8",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3a03791e8b259ff3c9f8",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3a1019579a4282152f3c",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3b18b14703834eca1dea",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3b30b14703834eca1dfe",
  ];

  const results: ApiResult[] = [];
  const errors: ApiResult[] = [];

  try {
    // Process all URLs in parallel for better performance
    const promises: Promise<ApiResult>[] = apiEndpoints.map(async (url, index): Promise<ApiResult> => {
      try {
        console.log(`Making POST call ${index + 1}/${apiEndpoints.length}: ${url}`);
        
        // Determine if it's an internal or external URL
        const isInternal = url.startsWith('/api/');
        const fullUrl = isInternal ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${url}` : url;
        
        const response = await fetch(fullUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any required headers for authentication
            // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
          },
          // Add any required body data
          body: JSON.stringify({ 
            timestamp: new Date().toISOString(),
            source: 'post-all-endpoint'
          })
        });

        let responseData;
        try {
          responseData = await response.json();
        } catch {
          responseData = await response.text();
        }

        const result: ApiResult = {
          url: url,
          status: response.status,
          success: response.ok,
          message: response.ok ? 'Success' : `Failed with status ${response.status}`,
          response: responseData
        };

        if (response.ok) {
          results.push(result);
          console.log(`✅ Success for ${url}: ${response.status}`);
        } else {
          errors.push(result);
          console.log(`❌ Error for ${url}: ${response.status}`);
        }

        return result;
      } catch (error) {
        const errorResult: ApiResult = {
          url: url,
          status: 0,
          success: false,
          message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
        errors.push(errorResult);
        console.log(`❌ Network error for ${url}:`, error);
        return errorResult;
      }
    });

    // Wait for all requests to complete
    await Promise.all(promises);

    const response = NextResponse.json({
      success: true,
      message: `POST calls completed. ${results.length} successful, ${errors.length} failed`,
      summary: {
        total: apiEndpoints.length,
        successful: results.length,
        failed: errors.length
      },
      results: results,
      errors: errors,
      timestamp: new Date().toISOString()
    }, { status: 200 });

    return response;

  } catch (error) {
    console.error("Unexpected error during POST calls:", error);
    return NextResponse.json({
      success: false,
      message: "Unexpected error occurred during POST calls",
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
