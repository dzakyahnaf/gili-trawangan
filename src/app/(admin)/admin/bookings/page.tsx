import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatRupiah } from "@/lib/utils";
import { getBookings } from "@/app/actions/admin";

const sc: Record<string, string> = { 
  confirmed: "bg-green-100 text-green-700", 
  pending: "bg-yellow-100 text-yellow-700", 
  paid: "bg-blue-100 text-blue-700", 
  cancelled: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-500",
  failed: "bg-red-100 text-red-700"
};

export default async function AdminBookingsPage() {
  const allBookings = await getBookings();
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Booking</h1>
          <button className="px-4 py-2 rounded-xl bg-ocean-500 text-white text-sm font-semibold hover:bg-ocean-600 transition-colors">Export CSV</button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 text-left">
                {["Kode","Nama","Produk","Tipe","Tanggal","Pax","Total","Bayar","Status","Aksi"].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {allBookings.map((b) => {
                  const product = b.package || b.activity || b.fastBoatSchedule || b.speedboat;
                  const productName = (product as any)?.title || (product as any)?.name;
                  return (
                    <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono font-semibold text-ocean-600">{b.bookingCode}</td>
                      <td className="px-4 py-3">{b.customerName}</td>
                      <td className="px-4 py-3 truncate max-w-[150px]">{productName}</td>
                      <td className="px-4 py-3 capitalize">{b.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{new Date(b.bookingDate).toLocaleDateString("id-ID")}</td>
                      <td className="px-4 py-3">{b.adults} Ad, {b.children} Ch</td>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap">{formatRupiah(b.totalPrice)}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${sc[b.paymentStatus]}`}>{b.paymentStatus}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${sc[b.status]}`}>{b.status}</span></td>
                      <td className="px-4 py-3"><Link href={`/admin/bookings/${b.id}`} className="text-ocean-600 hover:underline text-xs font-semibold">Detail</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
}
