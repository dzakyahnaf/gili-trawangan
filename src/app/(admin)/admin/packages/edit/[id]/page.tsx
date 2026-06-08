import AdminSidebar from "@/components/admin/AdminSidebar";
import PackageForm from "../../PackageForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPackagePage({ params }: Props) {
  const { id } = await params;
  const pkg = await prisma.package.findUnique({
    where: { id },
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
