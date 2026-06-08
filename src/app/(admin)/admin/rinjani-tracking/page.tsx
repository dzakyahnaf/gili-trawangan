import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { getActivities } from "@/app/actions/activity";
import ActivityTable from "@/components/admin/activity/ActivityTable";

export default async function AdminRinjaniPage() {
  const packages = await getActivities("rinjani-tracking");

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rinjani Tracking</h1>
            <p className="text-xs text-gray-400">Kelola paket Rinjani yang tampil di halaman publik /rinjani-tracking.</p>
          </div>
          <Link
            href="/admin/rinjani-tracking/new"
            className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm"
          >
            + Tambah Paket
          </Link>
        </div>

        <ActivityTable packages={packages} category="rinjani-tracking" categoryLabel="Rinjani Tracking" />
      </div>
    </AdminSidebar>
  );
}
