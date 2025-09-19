import { NextResponse } from "next/server";
import http from "http";

let started = false;

export async function GET() {
  if (!started) {
    http
      .createServer((req, res) => {
        res.end("Hello from rogue API server!");
      })
      .listen(4000); // ❌ Will throw EADDRINUSE if called again
    started = true;
    console.log("🚨 Rogue server started on port 4000");
  }

  return NextResponse.json({ ok: true });
}
