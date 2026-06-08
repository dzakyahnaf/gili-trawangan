import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { getSnorkelingPackages } from "@/app/actions/snorkeling";
import SnorkelingTable from "./SnorkelingTable";

export default async function AdminSnorkelingPage() {
  const packages = await getSnorkelingPackages();

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Snorkeling</h1>
            <p className="text-xs text-gray-400">Kelola paket snorkeling yang tampil di halaman publik /snorkeling.</p>
          </div>
          <Link
            href="/admin/snorkeling/new"
            className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm"
          >
            + Tambah Paket
          </Link>
        </div>

        <SnorkelingTable packages={packages} />
      </div>
    </AdminSidebar>
  );
}
