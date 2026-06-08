import AdminSidebar from "@/components/admin/AdminSidebar";
import ActivityForm from "../../ActivityForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditActivityPage({ params }: Props) {
  const { id } = await params;
  const activity = await prisma.activity.findUnique({
    where: { id },
  });

  if (!activity) {
    notFound();
  }

  return (
    <AdminSidebar>
      <ActivityForm initialData={activity} />
    </AdminSidebar>
  );
}
