import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Clock, Zap, ShieldCheck, Lock } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { translations, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Paket Wisata",
  description: "Pilih paket wisata terbaik di Gili Trawangan & Lombok. Mulai dari day trip hingga 4 hari 3 malam.",
};

export default async function PackagesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const t = translations[locale] || translations.id;

  const allPackages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });
  return (
    <div className="pt-16 lg:pt-20 pb-20">
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <Image 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop" 
          alt="Packages" 
          fill 
          priority
          sizes="100vw"
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-linear-to-r from-gili-900/80 to-gili-700/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">{t.nav.packages}</h1>
          <p className="text-gili-200 text-lg">{locale === "en" ? "Find your dream holiday package" : "Temukan paket liburan impian Anda"}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allPackages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-gray-100"
            >
              <div className="relative h-52 overflow-hidden">
                <Image src={pkg.coverImage} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-gili-500/90 text-white text-xs font-semibold backdrop-blur-sm">{pkg.duration}</span>
                  {pkg.isFeatured && <span className="px-3 py-1 rounded-full bg-accent-500 text-gili-900 text-xs font-semibold">⭐ Featured</span>}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="font-bold text-gray-900 mb-1 group-hover:text-gili-500 transition-colors line-clamp-2">{pkg.title}</h2>
                {pkg.subtitle && <p className="text-gili-500 text-sm font-medium mb-2">{pkg.subtitle}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}</span>
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" />{t.featuredPkg.instantBooking}</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" />{t.featuredPkg.easyCancel}</span>
                  <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" />{t.featuredPkg.secure}</span>
                </div>
                <div className="flex items-end justify-between pt-3 border-t border-gray-100 mt-auto">
                  <div>
                    <p className="text-xs text-gray-400">{t.featuredPkg.startFrom}</p>
                    <p className="text-xl font-bold text-gili-600">{formatCurrency(pkg.price, locale)}</p>
                    <p className="text-xs text-gray-400">{t.featuredPkg.perPerson}</p>
                  </div>
                  <span className="px-4 py-2 rounded-xl bg-accent-500 text-gili-900 text-xs font-bold group-hover:bg-accent-400 transition-colors shadow-sm">
                    {t.featuredPkg.bookNow}
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
