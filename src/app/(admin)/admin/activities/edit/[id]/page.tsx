import AdminSidebar from "@/components/admin/AdminSidebar";
import ActivityForm from "../../ActivityForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function EditActivityPage({ params }: Props) {
  const activity = await prisma.activity.findUnique({
    where: { id: params.id },
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
