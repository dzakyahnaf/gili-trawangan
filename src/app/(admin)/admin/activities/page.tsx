import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { getActivities } from "@/app/actions/admin";
import ActivitiesTable from "./ActivitiesTable";

export default async function AdminActivitiesPage() {
  const allActivities = await getActivities();
  
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Aktivitas</h1>
            <p className="text-xs text-gray-400">Kelola daftar aktivitas pariwisata & snorkeling.</p>
          </div>
          <Link href="/admin/activities/new" className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm">+ Tambah Aktivitas</Link>
        </div>

        <ActivitiesTable activities={allActivities} />
      </div>
    </AdminSidebar>
  );
}
