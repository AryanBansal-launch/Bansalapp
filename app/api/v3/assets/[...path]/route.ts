import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/").slice(4); 
    // slice(4) because path is /api/v3/assets/...
    const assetPath = segments.join("/");

    const externalUrl = `https://images.contentstack.io/v3/assets/${assetPath}`;

    const res = await fetch(externalUrl);
    if (!res.ok) return NextResponse.error();

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "application/octet-stream";

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
