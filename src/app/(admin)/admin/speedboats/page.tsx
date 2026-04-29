import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatRupiah } from "@/lib/utils";
import { getSpeedboats } from "@/app/actions/admin";

export default async function AdminSpeedboatsPage() {
  const allSpeedboats = await getSpeedboats();
  
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Speedboat</h1>
          <button className="px-4 py-2 rounded-xl bg-ocean-500 text-white text-sm font-semibold">+ Tambah Speedboat</button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 text-left">
              {["Nama","Harga","Kapasitas","Durasi","Status","Aksi"].map(h => (
                <th key={h} className="px-4 py-3 font-semibold text-gray-500">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {allSpeedboats.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 font-semibold text-ocean-600">{formatRupiah(s.price)}</td>
                  <td className="px-4 py-3">{s.capacity} pax</td>
                  <td className="px-4 py-3">{s.duration}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{s.isActive ? "Active" : "Inactive"}</span></td>
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
