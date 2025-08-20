import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true, message: "Empty response" }, { status: 200 });
  return response;
}