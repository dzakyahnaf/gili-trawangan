import AdminSidebar from "@/components/admin/AdminSidebar";
import { getBookings } from "@/app/actions/admin";
import BookingsTable from "./BookingsTable";

export default async function AdminBookingsPage() {
  const allBookings = await getBookings();
  
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Booking</h1>
          <p className="text-xs text-gray-400">Pantau transaksi pesanan masuk, status pembayaran, dan manifest.</p>
        </div>

        <BookingsTable bookings={allBookings} />
      </div>
    </AdminSidebar>
  );
}
