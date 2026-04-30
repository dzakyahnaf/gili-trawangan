import AdminSidebar from "@/components/admin/AdminSidebar";
import { DollarSign, Calendar, TrendingUp, Clock } from "lucide-react";
import { getDashboardStats } from "@/app/actions/admin";
import { formatRupiah } from "@/lib/utils";

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminDashboardPage() {
  const statsData = await getDashboardStats();
  
  const stats = [
    { label: "Total Booking", value: statsData.totalBookings.toString(), icon: Calendar, color: "bg-gili-50 text-gili-600" },
    { label: "Booking Pending", value: statsData.pendingPayments.toString(), icon: Clock, color: "bg-yellow-50 text-yellow-600" },
    { label: "Total Revenue", value: formatRupiah(statsData.totalRevenue), icon: DollarSign, color: "bg-green-50 text-green-600" },
    { label: "Average Order", value: formatRupiah(statsData.totalBookings > 0 ? statsData.totalRevenue / statsData.totalBookings : 0), icon: TrendingUp, color: "bg-accent-50 text-accent-600" },
  ];

  const recentBookings = statsData.recentBookings;
  return (
    <AdminSidebar>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Selamat datang, Admin RH Tour & Travel</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
                  <s.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Booking Terbaru</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-500">Kode</th>
                  <th className="px-6 py-3 font-semibold text-gray-500">Nama</th>
                  <th className="px-6 py-3 font-semibold text-gray-500">Produk</th>
                  <th className="px-6 py-3 font-semibold text-gray-500">Tanggal</th>
                  <th className="px-6 py-3 font-semibold text-gray-500">Total</th>
                  <th className="px-6 py-3 font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => {
                  const product = b.package || b.activity || b.fastBoatSchedule || b.speedboat;
                  const productName = product ? ('title' in product ? product.title : 'name' in product ? product.name : 'Unknown') : 'Unknown';
                  return (
                    <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-semibold text-gili-600">{b.bookingCode}</td>
                      <td className="px-6 py-4 text-gray-900">{b.customerName}</td>
                      <td className="px-6 py-4 text-gray-600 truncate max-w-[150px]">{productName}</td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{new Date(b.bookingDate).toLocaleDateString("id-ID")}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{formatRupiah(b.totalPrice)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusColors[b.status] || "bg-gray-100 text-gray-500"}`}>
                          {b.status}
                        </span>
                      </td>
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
