"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus, deleteBooking } from "@/app/actions/admin";
import { formatRupiah } from "@/lib/utils";
import { ArrowLeft, Loader2, Calendar, Mail, Phone, Globe, User, Award, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface Props {
  booking: any;
}

const sc: Record<string, string> = { 
  confirmed: "bg-green-100 text-green-700 border-green-200", 
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200", 
  paid: "bg-blue-100 text-blue-700 border-blue-200", 
  cancelled: "bg-red-100 text-red-700 border-red-200",
  expired: "bg-gray-100 text-gray-500 border-gray-200",
  failed: "bg-red-100 text-red-700 border-red-200"
};

export default function BookingDetailClient({ booking }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [paymentStatus, setPaymentStatus] = useState(booking.paymentStatus);
  const [status, setStatus] = useState(booking.status);

  const product = booking.package || booking.activity || booking.fastBoatSchedule || booking.speedboat;
  const productName = product ? ('title' in product ? product.title : 'name' in product ? product.name : '') : 'N/A';

  function handleSaveStatus() {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        await updateBookingStatus(booking.id, paymentStatus, status);
        setSuccess("Status booking berhasil diperbarui!");
      } catch (err: any) {
        setError(err.message || "Gagal memperbarui status.");
      }
    });
  }

  function handleDelete() {
    if (!confirm("Apakah Anda yakin ingin menghapus data booking ini secara permanen?")) return;

    startTransition(async () => {
      try {
        await deleteBooking(booking.id);
        router.push("/admin/bookings");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Gagal menghapus booking.");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Booking</h1>
            <p className="text-xs text-gray-400">Kode Booking: <span className="font-mono font-bold text-gili-600">{booking.bookingCode}</span></p>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 border border-red-200 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 font-semibold text-xs transition-all flex items-center gap-1.5"
        >
          Hapus Booking
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-xs text-green-700 font-medium">
          ✨ {success}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Detail Customer & Product */}
        <div className="md:col-span-2 space-y-6">
          {/* Customer Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm tracking-wider uppercase flex items-center gap-1.5 text-gray-400">
              <User className="w-4 h-4" /> Informasi Pelanggan
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-xs font-semibold text-gray-400">Nama Lengkap</span>
                <span className="text-gray-950 font-semibold">{booking.customerName}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400">Kebangsaan</span>
                <span className="text-gray-950 font-semibold flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-gray-400" /> {booking.nationality || "—"}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400">Email</span>
                <span className="text-gray-950 font-semibold flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" /> {booking.customerEmail}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400">No. WhatsApp</span>
                <span className="text-gray-950 font-semibold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> {booking.customerPhone}
                </span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-gray-50">
                <span className="block text-xs font-semibold text-gray-400 mb-1">Permintaan Khusus (Special Request)</span>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-xl text-xs whitespace-pre-wrap leading-relaxed">
                  {booking.specialRequest || "Tidak ada permintaan khusus."}
                </p>
              </div>
            </div>
          </div>

          {/* Product Detail Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm tracking-wider uppercase flex items-center gap-1.5 text-gray-400">
              <Award className="w-4 h-4" /> Detail Produk & Rencana Perjalanan
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-xs font-semibold text-gray-400">Nama Layanan/Produk</span>
                <span className="text-gray-950 font-bold text-base text-gili-600">{productName}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400">Tipe Produk</span>
                <span className="text-gray-950 font-semibold capitalize">{booking.type}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400">Tanggal Booking/Keberangkatan</span>
                <span className="text-gray-950 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {new Date(booking.bookingDate).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400">Jumlah Penumpang (Pax)</span>
                <span className="text-gray-950 font-semibold">
                  {booking.adults} Dewasa {booking.children > 0 && `, ${booking.children} Anak`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Actions & Total Price */}
        <div className="space-y-6">
          {/* Price & Billing Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Total Pembayaran</span>
            <div className="text-3xl font-extrabold text-gili-600">{formatRupiah(booking.totalPrice)}</div>
            <div className="border-t border-gray-50 pt-3 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-400">Status Pembayaran</span>
                <span className={`px-2 py-0.5 rounded-full uppercase text-[9px] font-bold ${sc[booking.paymentStatus]}`}>
                  {booking.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-400">Status Booking</span>
                <span className={`px-2 py-0.5 rounded-full uppercase text-[9px] font-bold ${sc[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="font-bold text-gray-950 text-sm">Update Status</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 mb-1">Status Pembayaran</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-white"
                >
                  <option value="pending">PENDING</option>
                  <option value="paid">PAID (Lunas)</option>
                  <option value="failed">FAILED (Gagal)</option>
                  <option value="expired">EXPIRED</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 mb-1">Status Keberangkatan</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-white"
                >
                  <option value="pending">PENDING</option>
                  <option value="confirmed">CONFIRMED (Dikonfirmasi)</option>
                  <option value="completed">COMPLETED (Selesai)</option>
                  <option value="cancelled">CANCELLED (Dibatalkan)</option>
                </select>
              </div>

              <button
                onClick={handleSaveStatus}
                disabled={isPending}
                className="w-full py-2.5 rounded-xl bg-gili-500 text-white font-semibold text-xs hover:bg-gili-600 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
