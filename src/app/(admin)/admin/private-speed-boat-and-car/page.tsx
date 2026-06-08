import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { getActivities } from "@/app/actions/activity";
import ActivityTable from "@/components/admin/activity/ActivityTable";

export default async function AdminPrivateSpeedboatCarPage() {
  const packages = await getActivities("private-speed-boat-and-car");

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Speedboat & Car</h1>
            <p className="text-xs text-gray-400">Kelola paket Private Speedboat & Car yang tampil di halaman publik /private-speed-boat-and-car.</p>
          </div>
          <Link
            href="/admin/private-speed-boat-and-car/new"
            className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm"
          >
            + Tambah Paket
          </Link>
        </div>

        <ActivityTable packages={packages} category="private-speed-boat-and-car" categoryLabel="Speedboat & Car" />
      </div>
    </AdminSidebar>
  );
}
