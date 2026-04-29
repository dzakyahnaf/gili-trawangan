import Link from "next/link";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paket Wisata",
  description: "Pilih paket wisata terbaik di Gili Trawangan & Lombok. Mulai dari day trip hingga 4 hari 3 malam.",
};

export default async function PackagesPage() {
  const allPackages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <Image src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=80" alt="Packages" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/80 to-ocean-700/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">Paket Wisata</h1>
          <p className="text-ocean-200 text-lg">Temukan paket liburan impian Anda</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {allPackages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <Image src={pkg.coverImage} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-ocean-500 text-white text-xs font-semibold">{pkg.duration}</span>
                  {pkg.isFeatured && <span className="px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-semibold">⭐ Featured</span>}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-ocean-600 transition-colors">{pkg.title}</h2>
                {pkg.subtitle && <p className="text-ocean-500 text-sm font-medium mb-3">{pkg.subtitle}</p>}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{pkg.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.programs.slice(0, 4).map((p) => (
                    <span key={p} className="px-2 py-1 rounded-lg bg-ocean-50 text-ocean-600 text-xs">{p}</span>
                  ))}
                </div>
                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">Mulai dari</p>
                    <p className="text-2xl font-bold text-ocean-600">{formatRupiah(pkg.price)}</p>
                    <p className="text-xs text-gray-400">/orang</p>
                  </div>
                  <span className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ocean-500 to-ocean-600 text-white text-sm font-semibold group-hover:shadow-lg transition-shadow">
                    Lihat Detail
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
