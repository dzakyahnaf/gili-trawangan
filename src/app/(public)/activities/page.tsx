import Link from "next/link";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Clock, Users, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aktivitas Wisata",
  description: "Snorkeling, diving, island hopping, sunset cruise & lebih banyak aktivitas seru di Gili Trawangan.",
};

export default async function ActivitiesPage() {
  const allActivities = await prisma.activity.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });
  return (
    <div className="pt-24 pb-20">
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <Image src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80" alt="Activities" fill className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-ocean-900/80 to-ocean-700/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">Aktivitas Wisata</h1>
          <p className="text-ocean-200 text-lg">Petualangan seru menanti Anda</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allActivities.map((act) => (
            <Link key={act.id} href={`/activities/${act.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="relative h-52 overflow-hidden">
                <Image src={act.coverImage} alt={act.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-ocean-500 text-white text-xs font-semibold">{act.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">{act.name}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{act.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />Maks {act.maxPax}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />Gili Trawangan</span>
                </div>
                <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xl font-bold text-ocean-600">{formatRupiah(act.price)}</p>
                    <p className="text-xs text-gray-400">/orang</p>
                  </div>
                  <span className="px-4 py-2 rounded-xl bg-ocean-50 text-ocean-600 text-sm font-semibold group-hover:bg-ocean-500 group-hover:text-white transition-colors">Detail →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
