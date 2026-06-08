import AdminSidebar from "@/components/admin/AdminSidebar";
import ActivityForm from "@/components/admin/activity/ActivityForm";
import { getActivityById } from "@/app/actions/activity";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLombokTourPage({ params }: Props) {
  const { id } = await params;
  const pkg = await getActivityById(id);

  if (!pkg) return notFound();

  // Serialize itinerary fields which are Json type in Prisma
  const serialized = {
    ...pkg,
    itinerary: pkg.itinerary ? JSON.parse(JSON.stringify(pkg.itinerary)) : [],
    itineraryEn: pkg.itineraryEn ? JSON.parse(JSON.stringify(pkg.itineraryEn)) : [],
  };

  return (
    <AdminSidebar>
      <ActivityForm initialData={serialized} category="lombok-tour" categoryLabel="Lombok Tour" />
    </AdminSidebar>
  );
}
