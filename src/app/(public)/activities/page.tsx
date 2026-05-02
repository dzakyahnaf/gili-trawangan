import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Clock, Users, MapPin, Zap, ShieldCheck, Lock } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { translations, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Aktivitas Wisata",
  description: "Snorkeling, diving, island hopping, sunset cruise & lebih banyak aktivitas seru di Gili Trawangan.",
};

export default async function ActivitiesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const t = translations[locale] || translations.id;

  const allActivities = await prisma.activity.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });
  return (
    <div className="pt-16 lg:pt-20 pb-20">
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <Image 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920&auto=format&fit=crop" 
          alt="Activities" 
          fill 
          priority
          sizes="100vw"
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-linear-to-r from-gili-900/80 to-gili-700/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">{t.nav.activities}</h1>
          <p className="text-gili-200 text-lg">{locale === "en" ? "Exciting adventures await you" : "Petualangan seru menanti Anda"}</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allActivities.map((act) => (
            <Link key={act.id} href={`/activities/${act.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100">
              <div className="relative h-52 overflow-hidden">
                <Image src={act.coverImage} alt={act.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-gili-500/90 text-white text-xs font-semibold backdrop-blur-sm">{act.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gili-500 transition-colors">{act.name}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{act.duration}</span>
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" />{t.featuredPkg.instantBooking}</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" />{t.featuredPkg.easyCancel}</span>
                  <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" />{t.featuredPkg.secure}</span>
                </div>
                <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xl font-bold text-gili-600">{formatCurrency(act.price, locale)}</p>
                    <p className="text-xs text-gray-400">{t.featuredPkg.perPerson}</p>
                  </div>
                  <span className="px-4 py-2 rounded-xl bg-accent-500 text-gili-900 text-xs font-bold group-hover:bg-accent-400 transition-colors shadow-sm">{t.featuredPkg.bookNow}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
