import Image from "next/image";
import ServiceCard from "@/components/public/ServiceCard";
import { getActivities } from "@/app/actions/activity";
import { cookies } from "next/headers";
import { translations, type Locale } from "@/lib/i18n";
import { Zap, ShieldCheck, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sewa Speedboat & Mobil Privat Lombok Gili",
  description:
    "Layanan transportasi privat tercepat dan terpercaya antara Kepulauan Gili dan Lombok. Tersedia persewaan speedboat privat, mobil privat, dan paket combo transfer.",
};

export default async function PrivateSpeedboatCarPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const isEn = locale === "en";
  const t = translations[locale] || translations.id;

  const packages = await getActivities("private-speed-boat-and-car");

  return (
    <main className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000"
          alt="Private Speedboat & Car"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gili-600/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tight">
          {t.nav.privateSpeedboatCar}
        </h1>
      </section>

      {/* Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.listingPages.transportTitle}</h2>
          <p className="text-gray-500">{t.listingPages.transportDesc}</p>
        </div>
        {packages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Paket transportasi privat belum tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => {
              const title = isEn ? (pkg.nameEn || pkg.name) : pkg.name;
              
              // Custom price format for private-speed-boat-and-car packages:
              let priceStr = "";
              if (pkg.slug === "speedboat-charter") {
                priceStr = isEn ? "US$ 28 per way (max. 4 pax)" : "Rp 400.000 sekali jalan (max. 4 pax)";
              } else if (pkg.slug === "combo-transfer") {
                priceStr = isEn ? "US$ 55 per way (min. 4 pax)" : "Rp 800.000 sekali jalan (min. 4 pax)";
              } else if (pkg.slug === "car-transfer") {
                priceStr = isEn ? "US$ 25/pax" : "Rp 350.000/pax";
              } else if (pkg.slug === "full-day-car-combo") {
                priceStr = isEn ? "US$ 50 / 10 hours" : "Rp 750.000 / 10 jam";
              } else {
                const unit = pkg.meetingPoint || "";
                priceStr = isEn
                  ? pkg.priceUSD ? `US$ ${pkg.priceUSD}${unit}` : `US$ ${Math.round(pkg.price / 17000)}${unit}`
                  : `Rp ${pkg.price.toLocaleString("id-ID")}${unit}`;
              }

              return (
                <ServiceCard
                  key={pkg.id}
                  title={title}
                  price={priceStr}
                  duration={isEn ? "Per Way" : "Sekali Jalan"}
                  image={pkg.coverImage}
                  href={`/private-speed-boat-and-car/${pkg.slug}`}
                  isPrivate={true}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-8 text-accent-300">{t.listingPages.whyBookPrivateTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-white/10 rounded-3xl">
              <Zap className="w-10 h-10 text-accent-400 mx-auto mb-4" />
              <h4 className="font-bold mb-2">{t.listingPages.instantPickup}</h4>
              <p className="text-white/40 text-xs">{t.listingPages.instantPickupDesc}</p>
            </div>
            <div className="p-6 border border-white/10 rounded-3xl">
              <ShieldCheck className="w-10 h-10 text-accent-400 mx-auto mb-4" />
              <h4 className="font-bold mb-2">{t.listingPages.doorToDoor}</h4>
              <p className="text-white/40 text-xs">{t.listingPages.doorToDoorDesc}</p>
            </div>
            <div className="p-6 border border-white/10 rounded-3xl">
              <Clock className="w-10 h-10 text-accent-400 mx-auto mb-4" />
              <h4 className="font-bold mb-2">{t.listingPages.available247}</h4>
              <p className="text-white/40 text-xs">{t.listingPages.available247Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
