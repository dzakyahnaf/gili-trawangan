import Image from "next/image";
import ServiceCard from "@/components/public/ServiceCard";
import { getActivities } from "@/app/actions/activity";
import { cookies } from "next/headers";
import { translations, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paket Lombok Tour & Wisata Harian",
  description:
    "Pilihan paket wisata Lombok terbaik. Tur Air Terjun Senaru, Air Terjun Benang Kelambu, Pink Beach Tour, Kuta Lombok Tour, dan City Tour. Hubungi kami sekarang.",
};

export default async function LombokTourPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const t = translations[locale] || translations.id;

  const packages = await getActivities("lombok-tour");

  return (
    <main className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/lombok1.jpg"
          alt="Lombok Tour Package"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gili-600/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tight">
          {t.nav.lombokTour}
        </h1>
      </section>

      {/* Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        {packages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Paket wisata Lombok belum tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => {
              const title = locale === "en" ? (pkg.nameEn || pkg.name) : pkg.name;
              
              // Custom price format for Lombok Tour packages:
              // IDR: Rp 1.000K / Rp 250K per pax (min. 4)
              // USD: US$ 70 / US$ 18 per pax (min. 4)
              const priceStr = locale === "en"
                ? `US$ ${pkg.priceUSD} / US$ ${Math.round((pkg.priceUSD || 70) / 4)} per pax (max. 4)`
                : `Rp ${(pkg.price / 1000).toLocaleString("id-ID")}K / Rp ${(pkg.price / 4000).toLocaleString("id-ID")}K per pax (max. 4)`;

              return (
                <ServiceCard
                  key={pkg.id}
                  title={title}
                  price={priceStr}
                  duration={locale === "en" ? "Full Day" : "Seharian Penuh"}
                  image={pkg.coverImage}
                  href={`/lombok-tour/${pkg.slug}`}
                  isPrivate={true}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
