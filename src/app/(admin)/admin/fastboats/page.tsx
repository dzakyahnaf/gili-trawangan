import AdminSidebar from "@/components/admin/AdminSidebar";
import { getFastBoats } from "@/app/actions/admin";

export default async function AdminFastBoatsPage() {
  const allFastBoats = await getFastBoats();
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Fast Boat</h1>
          <button className="px-4 py-2 rounded-xl bg-gili-500 text-white text-sm font-semibold">+ Tambah Operator</button>
        </div>
        {allFastBoats.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{b.name}</h2>
              <button className="text-gili-600 hover:underline text-sm font-semibold">Edit</button>
            </div>
            <p className="text-gray-500 text-sm">{b.description}</p>
            <p className="text-sm text-gray-600">Kapasitas: {b.capacity} | Speed: {b.speed} | Jadwal: {b.schedules?.length || 0} rute</p>
          </div>
        ))}
      </div>
    </AdminSidebar>
  );
}
