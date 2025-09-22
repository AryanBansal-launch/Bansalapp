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
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39ccc5c07cde10214bb0",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39da791e8b259ff3c9bc",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39e519579a4282152f10",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39f6791e8b259ff3c9e8",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3a03791e8b259ff3c9f8",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3a1019579a4282152f3c",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3b18b14703834eca1dea",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3b30b14703834eca1dfe",
    "https://au-launch-api.contentstack.com/manage/deploy/68d122d9d2a0f9f6f87e9b8d",
    "https://au-launch-api.contentstack.com/manage/deploy/68d1234e568cab788e537da8",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12398568cab788e537dc1",
    "https://au-launch-api.contentstack.com/manage/deploy/68d123c4568cab788e537deb",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12414d2a0f9f6f87e9bfe",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12434603a6be4ca2c6aa6",
    "https://au-launch-api.contentstack.com/manage/deploy/68d1270b603a6be4ca2c6ab5",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12727d2a0f9f6f87e9c5e",
    "https://au-launch-api.contentstack.com/manage/deploy/68d1278a603a6be4ca2c6afa",
    "https://au-launch-api.contentstack.com/manage/deploy/68d127a8d2a0f9f6f87e9c91",
    "https://au-launch-api.contentstack.com/manage/deploy/68d127ec568cab788e537ecd",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12816d2a0f9f6f87e9cd1",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12847d2a0f9f6f87e9d1f",
    "https://au-launch-api.contentstack.com/manage/deploy/68d128c1568cab788e537f4f",
    "https://au-launch-api.contentstack.com/manage/deploy/68d1295f568cab788e537f8f",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12981568cab788e537fad",
    "https://au-launch-api.contentstack.com/manage/deploy/68d1299ed2a0f9f6f87e9e7d",
    "https://au-launch-api.contentstack.com/manage/deploy/68d129bb84ed2420ef849378",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12a0f603a6be4ca2c6c98",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12a43568cab788e538032",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12a6684ed2420ef8493e8",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12ac9603a6be4ca2c6cf2",
    "https://au-launch-api.contentstack.com/manage/deploy/68d12b17603a6be4ca2c6d22"
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
