import AdminSidebar from "@/components/admin/AdminSidebar";
import BookingDetailClient from "./BookingDetailClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function BookingDetailPage({ params }: Props) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
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
