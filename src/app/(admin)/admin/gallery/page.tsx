import AdminSidebar from "@/components/admin/AdminSidebar";
import { getGallery } from "@/app/actions/admin";
import GalleryClient from "./GalleryClient";

export default async function AdminGalleryPage() {
  const allGallery = await getGallery();
  
  return (
    <AdminSidebar>
      <GalleryClient initialGallery={allGallery} />
    </AdminSidebar>
  );
}

