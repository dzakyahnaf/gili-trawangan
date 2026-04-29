import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.package.findMany({ where: { isActive: true } });
  return NextResponse.json({ success: true, data });
}
