import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('contentType') || 'homepage';
    
    // Fetch from Contentstack API
    const response = await fetch(
      `${process.env.CONTENTSTACK_API_BASE_URL}/v3/content_types/${contentType}/entries?environment=${process.env.CONTENTSTACK_ENVIRONMENT}`,
      {
        method: 'GET',
        headers: {
          'api_key': process.env.CONTENTSTACK_API_KEY!,
          'access_token': process.env.CONTENTSTACK_DELIVERY_TOKEN!,
          'Content-Type': 'application/json',
        },
        // Cache the response
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Contentstack API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      data: data.entries,
      count: data.entries.length
    });

  } catch (error) {
    console.error('Contentstack fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch from Contentstack' },
      { status: 500 }
    );
  }
}
