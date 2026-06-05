import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { getSpeedboats } from "@/app/actions/admin";
import SpeedboatsTable from "./SpeedboatsTable";

export default async function AdminSpeedboatsPage() {
  const allSpeedboats = await getSpeedboats();
  
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Charter Speedboat</h1>
            <p className="text-xs text-gray-400">Kelola daftar sewa kapal cepat privat dan car charter.</p>
          </div>
          <Link href="/admin/speedboats/new" className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm">+ Tambah Speedboat</Link>
        </div>

        <SpeedboatsTable speedboats={allSpeedboats} />
      </div>
    </AdminSidebar>
  );
}
