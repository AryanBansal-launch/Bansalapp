import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`https://cdn.contentstack.io/v3/content_types/common_page/entries/bltbd861b1a14f9288e`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api_key": process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
        "access_token": process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
      }, 
    })
    // Handle GET request - return some data or status
    // return NextResponse.json({ 
    //   success: true, 
    //   message: "Data API endpoint is working", 
    //   method: "GET",
    //   timestamp: new Date().toISOString()
    // });
    return response;
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON request body
    console.log("Received Data:", body);

    // Example: Simulate saving data (replace with actual database logic)
    return NextResponse.json({ success: true, message: "Data received from API call", data: body });
  } catch (error) {
    console.error("Error processing request:", error); // Log the error
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
