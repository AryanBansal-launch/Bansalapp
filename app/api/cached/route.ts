import { NextRequest, NextResponse } from "next/server";
import { getSkillsResCached } from "@/helper";

export async function GET(req: NextRequest) {
  try {
    const q=req.nextUrl.searchParams.get("query") || "";
    const skills = await getSkillsResCached(q,"/skills");
    const response = NextResponse.json(skills, { status: 200 });

    // Add cache headers (10 minutes)
    response.headers.set(
      "Cache-Control",
      "s-maxage=600"
    );

    return "hello world";
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
