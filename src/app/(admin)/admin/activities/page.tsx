import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatRupiah } from "@/lib/utils";
import { getActivities } from "@/app/actions/admin";

export default async function AdminActivitiesPage() {
  const allActivities = await getActivities();
  
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Aktivitas</h1>
          <button className="px-4 py-2 rounded-xl bg-ocean-500 text-white text-sm font-semibold hover:bg-ocean-600 transition-colors">+ Tambah Aktivitas</button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 text-left">
              {["Nama","Durasi","Harga","Kategori","Max Pax","Status","Aksi"].map(h => (
                <th key={h} className="px-4 py-3 font-semibold text-gray-500">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {allActivities.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{a.name}</td>
                  <td className="px-4 py-3">{a.duration}</td>
                  <td className="px-4 py-3 font-semibold text-ocean-600">{formatRupiah(a.price)}</td>
                  <td className="px-4 py-3 capitalize">{a.category}</td>
                  <td className="px-4 py-3">{a.maxPax}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${a.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{a.isActive ? "Active" : "Inactive"}</span></td>
                  <td className="px-4 py-3"><button className="text-ocean-600 hover:underline text-xs font-semibold">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminSidebar>
  );
}
