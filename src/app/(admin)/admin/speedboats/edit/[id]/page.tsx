import AdminSidebar from "@/components/admin/AdminSidebar";
import SpeedboatForm from "../../SpeedboatForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSpeedboatPage({ params }: Props) {
  const { id } = await params;
  const speedboat = await prisma.speedboat.findUnique({
    where: { id },
  });

  if (!speedboat) {
    notFound();
  }

  return (
    <AdminSidebar>
      <SpeedboatForm initialData={speedboat} />
    </AdminSidebar>
  );
}
