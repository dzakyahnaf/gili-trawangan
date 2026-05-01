import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Clock, Users, MapPin, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speedboat Charter",
  description: "Private speedboat charter di Gili Trawangan. Half day, full day, island hopping & sunset cruise.",
};

export default async function SpeedboatPage() {
  const allSpeedboats = await prisma.speedboat.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });
  return (
    <div className="pt-16 lg:pt-20 pb-20">
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <Image src="https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?q=80&w=1920&auto=format&fit=crop" alt="Speedboat" fill className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-gili-900/80 to-gili-700/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">Speedboat Charter</h1>
          <p className="text-gili-200 text-lg">Private speedboat untuk petualangan eksklusif</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {allSpeedboats.map((sb) => (
            <div key={sb.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
              <div className="relative h-56 overflow-hidden">
                <Image src={sb.images[0]} alt={sb.name} fill className="object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gili-500/90 text-white text-xs font-semibold backdrop-blur-sm">{sb.duration}</div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-xl text-gray-900">{sb.name}</h3>
                <p className="text-gray-500 text-sm">{sb.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gili-500" />{sb.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4 text-gili-500" />Maks {sb.capacity} pax</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-2">Rute:</p>
                  <div className="flex flex-wrap gap-2">
                    {sb.routes.map((r) => (
                      <span key={r} className="flex items-center gap-1 text-xs bg-gili-50 text-gili-700 rounded-lg px-2 py-1">
                        <MapPin className="w-3 h-3" />{r}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-2">Fasilitas:</p>
                  <div className="flex flex-wrap gap-2">
                    {sb.facilities.map((f) => (
                      <span key={f} className="flex items-center gap-1 text-xs bg-green-50 text-green-700 rounded-lg px-2 py-1">
                        <Check className="w-3 h-3" />{f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-2xl font-bold text-gili-600">{formatRupiah(sb.price)}</p>
                    <p className="text-xs text-gray-400">/{sb.priceUnit}</p>
                  </div>
                  <Link href={`/booking?type=speedboat&id=${sb.id}`} className="px-6 py-3 rounded-xl bg-accent-500 text-gili-900 font-bold hover:bg-accent-400 hover:shadow-lg transition-all">
                    Pesan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
