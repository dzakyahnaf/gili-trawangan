import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { getPackages } from "@/app/actions/admin";

export default async function AdminPackagesPage() {
  const allPackages = await getPackages();
  
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Paket Wisata</h1>
          <Link href="/admin/packages/new" className="px-4 py-2 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors">+ Tambah Paket</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 text-left">
              {["Judul","Durasi","Harga","Kategori","Featured","Status","Aksi"].map(h => (
                <th key={h} className="px-4 py-3 font-semibold text-gray-500">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {allPackages.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{p.title}</td>
                  <td className="px-4 py-3">{p.duration}</td>
                  <td className="px-4 py-3 font-semibold text-gili-600">{formatRupiah(p.price)}</td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3">{p.isFeatured ? "⭐" : "—"}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{p.isActive ? "Active" : "Inactive"}</span></td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/admin/packages/edit/${p.id}`} className="text-gili-600 hover:underline text-xs font-semibold">Edit</Link>
                    <button className="text-red-500 hover:underline text-xs font-semibold">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminSidebar>
  );
}
