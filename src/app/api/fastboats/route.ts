import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.fastBoat.findMany({ 
    where: { isActive: true },
    include: { schedules: true }
  });
  return NextResponse.json({ success: true, data });
}
