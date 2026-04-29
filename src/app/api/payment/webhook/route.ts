import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("[WEBHOOK] Midtrans notification:", body);
  // In production: verify signature, update booking status, send email
  return NextResponse.json({ success: true }, { status: 200 });
}
