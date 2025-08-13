import { NextRequest, NextResponse } from "next/server";
import { getSkillsRes } from "@/helper";

export async function GET() {
  try {
    // 
    const skills = await getSkillsRes("/skills");
    const response = NextResponse.json(skills, { status: 200 });

    // Add cache headers (10 minutes)
    response.headers.set(
      "Cache-Control",
      "public, max-age=600, s-maxage=600, stale-while-revalidate=60"
    );

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
