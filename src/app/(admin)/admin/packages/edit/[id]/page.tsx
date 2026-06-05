import AdminSidebar from "@/components/admin/AdminSidebar";
import PackageForm from "../../PackageForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function EditPackagePage({ params }: Props) {
  const pkg = await prisma.package.findUnique({
    where: { id: params.id },
  });

  if (!pkg) {
    notFound();
  }

  return (
    <AdminSidebar>
      <PackageForm initialData={pkg} />
    </AdminSidebar>
  );
}
