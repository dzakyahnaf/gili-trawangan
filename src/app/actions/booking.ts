"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(formData: any) {
  const {
    type,
    productId,
    customerName,
    customerEmail,
    customerPhone,
    nationality,
    bookingDate,
    adults,
    children,
    totalPrice,
    specialRequest,
  } = formData;

  // Generate a random booking code
  const bookingCode = `RH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  try {
    const booking = await prisma.booking.create({
      data: {
        bookingCode,
        type,
        customerName,
        customerEmail,
        customerPhone,
        nationality,
        bookingDate: new Date(bookingDate),
        adults: parseInt(adults),
        children: parseInt(children || "0"),
        totalPrice: parseInt(totalPrice),
        specialRequest,
        paymentStatus: "pending",
        status: "pending",
        // Polymorphic reference
        packageId: type === "package" ? productId : undefined,
        activityId: type === "activity" ? productId : undefined,
        fastBoatSchedId: type === "fastboat" ? productId : undefined,
        speedboatId: type === "speedboat" ? productId : undefined,
      },
    });

    revalidatePath("/admin/bookings");
    return { success: true, bookingCode: booking.bookingCode };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function getBookingByCode(code: string) {
  return await prisma.booking.findUnique({
    where: { bookingCode: code },
    include: {
      package: true,
      activity: true,
      fastBoatSchedule: {
        include: { fastBoat: true }
      },
      speedboat: true,
    },
  });
}
