import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { getActivities } from "@/app/actions/activity";
import ActivityTable from "@/components/admin/activity/ActivityTable";

export default async function AdminLombokTourPage() {
  const packages = await getActivities("lombok-tour");

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lombok Tour</h1>
            <p className="text-xs text-gray-400">Kelola paket Lombok Tour yang tampil di halaman publik /lombok-tour.</p>
          </div>
          <Link
            href="/admin/lombok-tour/new"
            className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm"
          >
            + Tambah Paket
          </Link>
        </div>

        <ActivityTable packages={packages} category="lombok-tour" categoryLabel="Lombok Tour" />
      </div>
    </AdminSidebar>
  );
}
