import AdminSidebar from "@/components/admin/AdminSidebar";
import ActivityForm from "@/components/admin/activity/ActivityForm";

export default function NewCarRentalPage() {
  return (
    <AdminSidebar>
      <ActivityForm category="car-rental" categoryLabel="Sewa Mobil" />
    </AdminSidebar>
  );
}
