import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBookingCode } from "@/lib/utils";

export async function GET() {
  const data = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      package: true,
      activity: true,
      fastBoatSchedule: { include: { fastBoat: true } },
      speedboat: true,
    }
  });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const code = generateBookingCode();
  
  try {
    const booking = await prisma.booking.create({
      data: {
        bookingCode: code,
        type: body.type,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        nationality: body.nationality,
        bookingDate: new Date(body.bookingDate),
        adults: body.adults,
        children: body.children || 0,
        totalPrice: body.totalPrice,
        specialRequest: body.specialRequest,
        paymentStatus: "pending",
        status: "pending",
        packageId: body.packageId,
        activityId: body.activityId,
        fastBoatSchedId: body.fastBoatSchedId,
        speedboatId: body.speedboatId,
      }
    });
    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    console.error("API Booking Error:", error);
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 });
  }
}
