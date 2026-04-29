import { prisma } from "@/lib/prisma";
import BookingForm from "./BookingForm";
import { notFound } from "next/navigation";

export default async function BookingPage(props: {
  searchParams: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await props.searchParams;

  if (!type || !id) {
    // If no type/id, show general booking or redirect
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Silakan Pilih Produk Terlebih Dahulu</h1>
        <p className="text-gray-500 mb-8">Anda harus memilih paket atau aktivitas sebelum melakukan pemesanan.</p>
        <div className="flex gap-4 justify-center">
          <a href="/packages" className="px-6 py-3 bg-ocean-500 text-white rounded-xl">Lihat Paket</a>
          <a href="/activities" className="px-6 py-3 bg-coral-500 text-white rounded-xl">Lihat Aktivitas</a>
        </div>
      </div>
    );
  }

  let product: any = null;

  if (type === "package") {
    product = await prisma.package.findUnique({ where: { id } });
  } else if (type === "activity") {
    product = await prisma.activity.findUnique({ where: { id } });
  } else if (type === "fastboat") {
    product = await prisma.fastBoatSchedule.findUnique({
      where: { id },
      include: { fastBoat: true },
    });
  } else if (type === "speedboat") {
    product = await prisma.speedboat.findUnique({ where: { id } });
  }

  if (!product) notFound();

  return (
    <div className="pt-24 pb-20 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Formulir Pemesanan</h1>
          <p className="text-gray-500">Lengkapi data di bawah ini untuk mengonfirmasi pesanan Anda.</p>
        </div>

        <BookingForm product={product} type={type} />
      </div>
    </div>
  );
}
