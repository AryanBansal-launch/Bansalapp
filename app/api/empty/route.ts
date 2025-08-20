import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: "Empty response" }, { status: 200 });
  return response;
}