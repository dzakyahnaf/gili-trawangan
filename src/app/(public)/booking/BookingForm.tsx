"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatRupiah } from "@/lib/utils";
import { Calendar, Users, ChevronRight, ChevronLeft, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { createBooking } from "@/app/actions/booking";
import Link from "next/link";

const bookingSchema = z.object({
  customerName: z.string().min(3, "Nama minimal 3 karakter"),
  customerEmail: z.string().email("Email tidak valid"),
  customerPhone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  nationality: z.string().min(2, "Kewarganegaraan harus diisi"),
  bookingDate: z.string().min(1, "Tanggal harus dipilih"),
  adults: z.number().min(1, "Minimal 1 dewasa"),
  children: z.number().min(0),
  specialRequest: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export interface BookingProduct {
  id: string;
  title?: string;
  name?: string;
  price: number;
  priceChild?: number | null;
  coverImage?: string;
  logo?: string;
}

interface BookingFormProps {
  product: BookingProduct;
  type: string;
}

export default function BookingForm({ product, type }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      bookingDate: new Date().toISOString().split("T")[0],
    },
  });

  const watchAdults = useWatch({ control, name: "adults" }) || 1;
  const watchChildren = useWatch({ control, name: "children" }) || 0;

  // Calculate total price
  const calculateTotal = () => {
    if (type === "package" || type === "activity") {
      const adultPrice = product.price * watchAdults;
      const childPrice = (product.priceChild || 0) * watchChildren;
      return adultPrice + childPrice;
    }
    if (type === "fastboat") {
      return product.price * (watchAdults + watchChildren);
    }
    if (type === "speedboat") {
      return product.price; // Fixed price per boat
    }
    return 0;
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    const result = await createBooking({
      ...data,
      type,
      productId: product.id,
      totalPrice: calculateTotal(),
    });

    if (result.success) {
      setSuccessCode(result.bookingCode!);
    } else {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
    setIsSubmitting(false);
  };

  if (successCode) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-10 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Pemesanan Berhasil!</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Terima kasih telah memesan bersama RH Tour. Kode booking Anda adalah:
        </p>
        <div className="bg-ocean-50 py-4 px-6 rounded-2xl border-2 border-dashed border-ocean-300 inline-block">
          <span className="text-2xl font-mono font-bold text-ocean-600">{successCode}</span>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/booking/status?code=${successCode}`} className="px-8 py-3 bg-ocean-500 text-white rounded-xl font-bold shadow-lg shadow-ocean-500/20">
            Cek Status Pembayaran
          </Link>
          <Link href="/" className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">
            Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form Steps */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 space-y-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-ocean-500" />
                Detail Perjalanan
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Tanggal Keberangkatan</label>
                  <input
                    type="date"
                    {...register("bookingDate")}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ocean-500 outline-none transition-all"
                  />
                  {errors.bookingDate && <p className="text-red-500 text-xs">{errors.bookingDate.message}</p>}
                </div>

                {type !== "speedboat" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Jumlah Peserta (Dewasa)</label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setValue("adults", Math.max(1, watchAdults - 1))}
                        className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold w-6 text-center">{watchAdults}</span>
                      <button
                        type="button"
                        onClick={() => setValue("adults", watchAdults + 1)}
                        className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {product.priceChild && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Jumlah Peserta (Anak-anak)</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setValue("children", Math.max(0, watchChildren - 1))}
                      className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold w-6 text-center">{watchChildren}</span>
                    <button
                      type="button"
                      onClick={() => setValue("children", watchChildren + 1)}
                      className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 bg-ocean-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-ocean-600 transition-all"
              >
                Lanjutkan ke Data Pemesan
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Customer Info */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 space-y-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-coral-500" />
                Data Diri Pemesan
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                  <input
                    {...register("customerName")}
                    placeholder="Masukkan nama sesuai identitas"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 outline-none transition-all"
                  />
                  {errors.customerName && <p className="text-red-500 text-xs">{errors.customerName.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <input
                      {...register("customerEmail")}
                      placeholder="email@contoh.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 outline-none transition-all"
                    />
                    {errors.customerEmail && <p className="text-red-500 text-xs">{errors.customerEmail.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Nomor Telepon (WhatsApp)</label>
                    <input
                      {...register("customerPhone")}
                      placeholder="08123xxx"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 outline-none transition-all"
                    />
                    {errors.customerPhone && <p className="text-red-500 text-xs">{errors.customerPhone.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Kewarganegaraan</label>
                  <input
                    {...register("nationality")}
                    placeholder="Contoh: Indonesia, Australia, dll"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 outline-none transition-all"
                  />
                  {errors.nationality && <p className="text-red-500 text-xs">{errors.nationality.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Permintaan Khusus (Opsional)</label>
                  <textarea
                    {...register("specialRequest")}
                    placeholder="Alergi makanan, jemputan hotel, dll"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-coral-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 py-4 bg-coral-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-coral-600 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Konfirmasi & Pesan Sekarang"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>

      {/* Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24 space-y-6">
          <h3 className="font-bold text-gray-900 border-b pb-4">Ringkasan Pesanan</h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <Image src={product.coverImage || product.logo || ""} alt={product.title || product.name || ""} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 leading-tight">{product.title || product.name}</h4>
                <p className="text-xs text-ocean-500 mt-1 capitalize">{type}</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {watchAdults} Dewasa x {formatRupiah(product.price)}
                </span>
                <span className="font-semibold">{formatRupiah(product.price * watchAdults)}</span>
              </div>
              {watchChildren > 0 && product.priceChild && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {watchChildren} Anak x {formatRupiah(product.priceChild)}
                  </span>
                  <span className="font-semibold">{formatRupiah(product.priceChild * watchChildren)}</span>
                </div>
              )}
              {type === "fastboat" && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {watchAdults + watchChildren} Penumpang x {formatRupiah(product.price)}
                  </span>
                  <span className="font-semibold">{formatRupiah(product.price * (watchAdults + watchChildren))}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Pembayaran</span>
                <span className="text-xl font-bold text-ocean-600">{formatRupiah(calculateTotal())}</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center">
                Dengan mengklik tombol pesanan, Anda menyetujui syarat & ketentuan yang berlaku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
