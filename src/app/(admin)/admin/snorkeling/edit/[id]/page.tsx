import AdminSidebar from "@/components/admin/AdminSidebar";
import SnorkelingForm from "../../SnorkelingForm";
import { getSnorkelingPackageById } from "@/app/actions/snorkeling";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSnorkelingPage({ params }: Props) {
  const { id } = await params;
  const pkg = await getSnorkelingPackageById(id);

  if (!pkg) return notFound();

  return (
    <AdminSidebar>
      <SnorkelingForm initialData={pkg} />
    </AdminSidebar>
  );
}
