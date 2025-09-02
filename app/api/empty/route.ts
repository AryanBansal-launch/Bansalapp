import { NextResponse } from "next/server";

export async function GET() {
  console.log("Origin call");
  const response = NextResponse.json({ success: true, message: "Empty response" }, { status: 200 });
  return response;
}
