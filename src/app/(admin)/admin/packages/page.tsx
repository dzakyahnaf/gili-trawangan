import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { getPackages } from "@/app/actions/admin";
import PackagesTable from "./PackagesTable";

export default async function AdminPackagesPage() {
  const allPackages = await getPackages();
  
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paket Wisata</h1>
            <p className="text-xs text-gray-400">Kelola dan tawarkan paket wisata terbaik Anda.</p>
          </div>
          <Link href="/admin/packages/new" className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm">+ Tambah Paket</Link>
        </div>

        <PackagesTable packages={allPackages} />
      </div>
    </AdminSidebar>
  );
}
