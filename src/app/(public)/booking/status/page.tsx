import { getBookingByCode } from "@/app/actions/booking";
import { formatRupiah } from "@/lib/utils";
import { CheckCircle2, Clock, MapPin, Phone, Mail, User, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BookingStatusPage(props: {
  searchParams: Promise<{ code: string }>;
}) {
  const { code } = await props.searchParams;
  if (!code) notFound();

  const booking = await getBookingByCode(code);
  if (!booking) notFound();

  const product = booking.package || booking.activity || booking.fastBoatSchedule || booking.speedboat;
  const productName = product ? ('title' in product ? product.title : 'name' in product ? product.name : '') : '';

  return (
    <div className="pt-24 pb-20 bg-sand-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header Status */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className={`p-8 text-center text-white ${
            booking.paymentStatus === "paid" ? "bg-green-500" : "bg-ocean-600"
          }`}>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              {booking.paymentStatus === "paid" ? (
                <CheckCircle2 className="w-10 h-10" />
              ) : (
                <Clock className="w-10 h-10" />
              )}
            </div>
            <h1 className="text-2xl font-bold mb-2">
              Status Pembayaran: {booking.paymentStatus === "paid" ? "Sudah Dibayar" : "Menunggu Pembayaran"}
            </h1>
            <p className="opacity-90">Kode Booking: <span className="font-mono font-bold tracking-wider">{booking.bookingCode}</span></p>
          </div>

          <div className="p-8 space-y-8">
            {/* Details Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-ocean-500" />
                  Informasi Pelanggan
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Nama:</span> <span className="font-medium">{booking.customerName}</span></p>
                  <p className="flex items-center gap-1"><Mail className="w-3 h-3 text-gray-400" /> {booking.customerEmail}</p>
                  <p className="flex items-center gap-1"><Phone className="w-3 h-3 text-gray-400" /> {booking.customerPhone}</p>
                  <p><span className="text-gray-500">Kebangsaan:</span> {booking.nationality}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-ocean-500" />
                  Detail Pesanan
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Produk:</span> <span className="font-bold text-ocean-600">{productName}</span></p>
                  <p><span className="text-gray-500">Tanggal:</span> {new Date(booking.bookingDate).toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
                  <p><span className="text-gray-500">Peserta:</span> {booking.adults} Dewasa {booking.children > 0 ? `, ${booking.children} Anak` : ""}</p>
                  <p className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gray-400" /> Sama-Sama Reggae Bar (Meeting Point)</p>
                </div>
              </div>
            </div>

            {/* Total Section */}
            <div className="bg-sand-50 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Yang Harus Dibayar</p>
                <p className="text-3xl font-bold text-ocean-600">{formatRupiah(booking.totalPrice)}</p>
              </div>
              {booking.paymentStatus === "pending" && (
                <button className="w-full sm:w-auto px-8 py-4 bg-coral-500 text-white rounded-xl font-bold shadow-lg shadow-coral-500/30 hover:scale-105 transition-all">
                  Bayar Sekarang (Midtrans)
                </button>
              )}
            </div>

            {/* Support */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500 mb-3">Butuh bantuan atau ingin konfirmasi manual?</p>
              <a
                href={`https://wa.me/6287793082501?text=Halo%20RH%20Tour%2C%20saya%20sudah%20memesan%20dengan%20kode%20${booking.bookingCode}`}
                className="inline-flex items-center gap-2 text-green-600 font-bold hover:underline"
              >
                Hubungi Kami di WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-ocean-600 font-medium hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
