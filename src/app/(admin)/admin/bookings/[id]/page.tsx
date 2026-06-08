import AdminSidebar from "@/components/admin/AdminSidebar";
import BookingDetailClient from "./BookingDetailClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({ params }: Props) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      package: true,
      activity: true,
      fastBoatSchedule: {
        include: { fastBoat: true }
      },
      speedboat: true,
    }
  });

  if (!booking) {
    notFound();
  }

  return (
    <AdminSidebar>
      <BookingDetailClient booking={booking} />
    </AdminSidebar>
  );
}
