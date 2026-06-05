import AdminSidebar from "@/components/admin/AdminSidebar";
import { getContentSettings } from "@/app/actions/admin";
import ContentClient from "./ContentClient";

export default async function AdminContentPage() {
  const settings = await getContentSettings();
  
  return (
    <AdminSidebar>
      <ContentClient initialSettings={settings} />
    </AdminSidebar>
  );
}

