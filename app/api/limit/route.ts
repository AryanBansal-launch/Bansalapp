import { NextResponse } from "next/server";

interface ApiResult {
  url: string;
  status: number;
  success: boolean;
  message: string;
}

export async function POST() {
  console.log("Starting cache priming for all deployments");
  
  const urls = [
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39ccc5c07cde10214bb0",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39da791e8b259ff3c9bc",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39e519579a4282152f10",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd39f6791e8b259ff3c9e8",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3a03791e8b259ff3c9f8",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3a1019579a4282152f3c",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3b18b14703834eca1dea",
    "https://au-launch-api.contentstack.com/manage/deploy/68cd3b30b14703834eca1dfe"
  ];

  const results: ApiResult[] = [];
  const errors: ApiResult[] = [];

  try {
    // Process all URLs in parallel for better performance
    const promises: Promise<ApiResult>[] = urls.map(async (url, index): Promise<ApiResult> => {
      try {
        console.log(`Hitting URL ${index + 1}: ${url}`);
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any required headers for authentication
            // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
          },
          // Add any required body data
          // body: JSON.stringify({ key: 'value' })
        });

        const result: ApiResult = {
          url: url,
          status: response.status,
          success: response.ok,
          message: response.ok ? 'Success' : `Failed with status ${response.status}`
        };

        if (response.ok) {
          results.push(result);
          console.log(`✅ Success for URL ${index + 1}: ${response.status}`);
        } else {
          errors.push(result);
          console.log(`❌ Error for URL ${index + 1}: ${response.status}`);
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
        console.log(`❌ Network error for URL ${index + 1}:`, error);
        return errorResult;
      }
    });

    // Wait for all requests to complete
    await Promise.all(promises);

    const response = NextResponse.json({
      success: true,
      message: `Cache priming completed. ${results.length} successful, ${errors.length} failed`,
      summary: {
        total: urls.length,
        successful: results.length,
        failed: errors.length
      },
      results: results,
      errors: errors
    }, { status: 200 });

    return response;

  } catch (error) {
    console.error("Unexpected error during cache priming:", error);
    return NextResponse.json({
      success: false,
      message: "Unexpected error occurred during cache priming",
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
