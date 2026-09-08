import { NextResponse } from "next/server";

export async function GET(request) {
  // Check common Vercel, Cloudflare, and proxy geo headers
  const countryHeader =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-real-ip-country") ||
    "OTHER";

  return NextResponse.json({
    success: true,
    country: countryHeader.toUpperCase(),
  });
}
