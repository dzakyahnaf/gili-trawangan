"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- PACKAGES ---
export async function getPackages() {
  return await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deletePackage(id: string) {
  await prisma.package.delete({ where: { id } });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/");
}

// --- ACTIVITIES ---
export async function getActivities() {
  return await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// --- FASTBOATS ---
export async function getFastBoats() {
  return await prisma.fastBoat.findMany({
    orderBy: { createdAt: "desc" },
    include: { schedules: true }
  });
}

// --- SPEEDBOATS ---
export async function getSpeedboats() {
  return await prisma.speedboat.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// --- TESTIMONIALS ---
export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// --- GALLERY ---
export async function getGallery() {
  return await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// --- BOOKINGS ---
export async function getBookings() {
  return await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      package: true,
      activity: true,
      fastBoatSchedule: {
        include: { fastBoat: true }
      },
      speedboat: true,
    }
  });
}

export async function updateBookingStatus(id: string, status: string) {
  await prisma.booking.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/bookings");
}

export async function updatePaymentStatus(id: string, status: string) {
  await prisma.booking.update({
    where: { id },
    data: { paymentStatus: status }
  });
  revalidatePath("/admin/bookings");
}

// --- ANALYTICS ---
export async function getDashboardStats() {
  const [totalBookings, pendingPayments, totalRevenue, recentBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { paymentStatus: "pending" } }),
    prisma.booking.aggregate({
      _sum: { totalPrice: true },
      where: { paymentStatus: "paid" }
    }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        package: true,
        activity: true,
      }
    })
  ]);

  return {
    totalBookings,
    pendingPayments,
    totalRevenue: totalRevenue._sum.totalPrice || 0,
    recentBookings,
  };
}
