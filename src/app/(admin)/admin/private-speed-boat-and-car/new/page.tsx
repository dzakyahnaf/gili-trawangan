import AdminSidebar from "@/components/admin/AdminSidebar";
import ActivityForm from "@/components/admin/activity/ActivityForm";

export default function NewPrivateSpeedboatCarPage() {
  return (
    <AdminSidebar>
      <ActivityForm category="private-speed-boat-and-car" categoryLabel="Speedboat & Car" />
    </AdminSidebar>
  );
}
