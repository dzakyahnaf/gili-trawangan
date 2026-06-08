import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { getActivities } from "@/app/actions/activity";
import ActivityTable from "@/components/admin/activity/ActivityTable";

export default async function AdminCarRentalPage() {
  const packages = await getActivities("car-rental");

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sewa Mobil (Car Rental)</h1>
            <p className="text-xs text-gray-400">Kelola paket Sewa Mobil yang tampil di halaman publik /car-rental.</p>
          </div>
          <Link
            href="/admin/car-rental/new"
            className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm"
          >
            + Tambah Paket
          </Link>
        </div>

        <ActivityTable packages={packages} category="car-rental" categoryLabel="Sewa Mobil" />
      </div>
    </AdminSidebar>
  );
}
