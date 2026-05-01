import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Anchor, Users, Zap, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fast Boat",
  description: "Jadwal & harga fast boat Bali ke Gili Trawangan. Ekajaya, BlueWater Express & operator terpercaya lainnya.",
};

export default async function FastBoatPage() {
  const allFastBoats = await prisma.fastBoat.findMany({
    where: { isActive: true },
    include: { schedules: true },
  });
  return (
    <div className="pt-16 lg:pt-20 pb-20">
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <Image src="https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?q=80&w=1920&auto=format&fit=crop" alt="Fast Boat" fill className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-gili-900/80 to-gili-700/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">Fast Boat</h1>
          <p className="text-gili-200 text-lg">Jadwal & harga fast boat ke Gili Trawangan</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Info Banner */}
        <div className="bg-linear-to-r from-gili-50 to-gili-100 rounded-2xl p-6 border border-gili-200">
          <p className="text-gili-800 font-medium">⚠️ Jadwal dapat berubah sesuai kondisi cuaca. Konfirmasi selalu via WhatsApp atau Email sebelum booking.</p>
        </div>

        {/* Operators */}
        {allFastBoats.map((boat) => (
          <div key={boat.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-3 gap-0">
              {/* Boat Info */}
              <div className="p-8 bg-linear-to-br from-gili-600 to-gili-800 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Anchor className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{boat.name}</h2>
                </div>
                <p className="text-gili-200 text-sm mb-6">{boat.description}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm"><Users className="w-4 h-4" />{boat.capacity} pax</div>
                  <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4" />{boat.speed}</div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Fasilitas:</p>
                  <div className="flex flex-wrap gap-2">
                    {boat.facilities.map((f) => (
                      <span key={f} className="flex items-center gap-1 text-xs bg-white/10 rounded-lg px-2 py-1">
                        <Check className="w-3 h-3" />{f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="lg:col-span-2 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Jadwal & Harga</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left">
                        <th className="pb-3 pr-4 font-semibold text-gray-500">Dari</th>
                        <th className="pb-3 pr-4 font-semibold text-gray-500">Ke</th>
                        <th className="pb-3 pr-4 font-semibold text-gray-500">Berangkat</th>
                        <th className="pb-3 pr-4 font-semibold text-gray-500">Tiba</th>
                        <th className="pb-3 pr-4 font-semibold text-gray-500">Harga</th>
                        <th className="pb-3 font-semibold text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {boat.schedules.map((s) => (
                        <tr key={s.id} className="border-b border-gray-50 hover:bg-gili-50/50 transition-colors">
                          <td className="py-3 pr-4 text-gray-700">{s.from}</td>
                          <td className="py-3 pr-4 text-gray-700">{s.to}</td>
                          <td className="py-3 pr-4 font-semibold text-gray-900">{s.departure}</td>
                          <td className="py-3 pr-4 text-gray-600">{s.arrival}</td>
                          <td className="py-3 pr-4 font-bold text-gili-600">{formatRupiah(s.price)}</td>
                          <td className="py-3">
                            <Link href={`/booking?type=fastboat&id=${s.id}`} className="px-4 py-1.5 rounded-lg bg-accent-500 text-gili-900 text-xs font-bold hover:bg-accent-400 transition-colors">
                              Pesan
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
