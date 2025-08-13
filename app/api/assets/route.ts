import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return a test Contentstack asset URL
    const assetUrl = "v3/assets/blt41b5d34d676c7949/blt12253853eb06f352/project thumbnail.png";
    
    return NextResponse.json({ 
      success: true, 
      assetUrl: assetUrl,
      fullUrl: `https://images.contentstack.io/${assetUrl}`
    });
  } catch (error) {
    console.error("Error in assets API:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Internal server error" 
    }, { status: 500 });
  }
}