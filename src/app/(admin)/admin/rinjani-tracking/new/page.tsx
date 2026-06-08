import AdminSidebar from "@/components/admin/AdminSidebar";
import ActivityForm from "@/components/admin/activity/ActivityForm";

export default function NewRinjaniPage() {
  return (
    <AdminSidebar>
      <ActivityForm category="rinjani-tracking" categoryLabel="Rinjani Tracking" />
    </AdminSidebar>
  );
}
