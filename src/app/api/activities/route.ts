import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.activity.findMany({ where: { isActive: true } });
  return NextResponse.json({ success: true, data });
}
