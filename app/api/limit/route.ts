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
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d391b2a9fe7291ab51599a",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3920aa9fe7291ab515aab",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3922fa9fe7291ab515b15",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d39253a9fe7291ab515b7f",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3932aa9fe7291ab515c1b",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3934da9fe7291ab515c5f",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3936aa9fe7291ab515ca3",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3938da9fe7291ab515ce7",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cd845407267769d54bd3",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cdb95407267769d54c1c",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cde95407267769d54e6a",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3ce0e5407267769d55113",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cef4b756c333aef19a04",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cf0fb756c333aef19a4e",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cf36b756c333aef19a8f",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cf5cb756c333aef19acc",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cf79b756c333aef19b1a",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cfbfb756c333aef19b96",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3cffdb756c333aef19cc0",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3d02fb756c333aef19db6",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3d052b756c333aef19e84",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3d06fb756c333aef19f1d",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3d091b756c333aef19fc7",
    "https://stag-app.csnonprod.com/launch-api/manage/deploy/68d3d0adb756c333aef1a0a0",
  ];

  const results: ApiResult[] = [];
  const errors: ApiResult[] = [];

  try {
    const batchSize = 16;
    const totalBatches = Math.ceil(apiEndpoints.length / batchSize);
    
    console.log(`Processing ${apiEndpoints.length} endpoints in ${totalBatches} batches of ${batchSize} (all batches in parallel)`);

    // Create all batches
    const batches: string[][] = [];
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * batchSize;
      const endIndex = Math.min(startIndex + batchSize, apiEndpoints.length);
      const batch = apiEndpoints.slice(startIndex, endIndex);
      batches.push(batch);
    }

    // Process all batches in parallel
    const allBatchPromises: Promise<ApiResult[]>[] = batches.map(async (batch, batchIndex): Promise<ApiResult[]> => {
      console.log(`Starting batch ${batchIndex + 1}/${totalBatches} (${batch.length} URLs)`);
      
      // Process URLs within this batch in parallel
      const batchPromises: Promise<ApiResult>[] = batch.map(async (url, index): Promise<ApiResult> => {
        const globalIndex = (batchIndex * batchSize) + index;
        try {
          console.log(`Making POST call ${globalIndex + 1}/${apiEndpoints.length}: ${url}`);
          
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
            console.log(`✅ Success for ${url}: ${response.status}`);
          } else {
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
          console.log(`❌ Network error for ${url}:`, error);
          return errorResult;
        }
      });

      // Wait for all URLs in this batch to complete
      const batchResults = await Promise.all(batchPromises);
      console.log(`Completed batch ${batchIndex + 1}/${totalBatches}`);
      return batchResults;
    });

    // Wait for all batches to complete
    const allBatchResults = await Promise.all(allBatchPromises);
    
    // Flatten results and separate successes from errors
    allBatchResults.flat().forEach(result => {
      if (result.success) {
        results.push(result);
      } else {
        errors.push(result);
      }
    });

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
