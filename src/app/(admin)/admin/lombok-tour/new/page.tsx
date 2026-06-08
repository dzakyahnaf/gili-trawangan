import AdminSidebar from "@/components/admin/AdminSidebar";
import ActivityForm from "@/components/admin/activity/ActivityForm";

export default function NewLombokTourPage() {
  return (
    <AdminSidebar>
      <ActivityForm category="lombok-tour" categoryLabel="Lombok Tour" />
    </AdminSidebar>
  );
}
