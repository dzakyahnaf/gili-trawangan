import AdminSidebar from "@/components/admin/AdminSidebar";
import SpeedboatForm from "../../SpeedboatForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function EditSpeedboatPage({ params }: Props) {
  const speedboat = await prisma.speedboat.findUnique({
    where: { id: params.id },
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
