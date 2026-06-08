import Image from "next/image";
import ServiceCard from "@/components/public/ServiceCard";
import { getActivities } from "@/app/actions/activity";
import { cookies } from "next/headers";
import { translations, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paket Pendakian Gunung Rinjani Lombok",
  description:
    "Paket pendakian Rinjani terbaik. Tersedia paket 2D1N, 3D2N, dan 4D3N via Sembalun - Torean. Pemandu & porter berpengalaman, pelayanan profesional.",
};

export default async function RinjaniTrackingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const t = translations[locale] || translations.id;

  const packages = await getActivities("rinjani-tracking");

  return (
    <main className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/rinjani-tracking-header.jpg"
          alt="Rinjani Tracking"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gili-600/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tight">
          {t.nav.rinjani}
        </h1>
      </section>

      {/* Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        {packages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Paket pendakian Gunung Rinjani belum tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => {
              const title = locale === "en" ? (pkg.nameEn || pkg.name) : pkg.name;
              const unit = pkg.meetingPoint || "";
              const priceStr = locale === "en"
                ? pkg.priceUSD
                  ? `US$ ${pkg.priceUSD}${unit}`
                  : `US$ ${Math.round(pkg.price / 17000)}${unit}`
                : `Rp ${pkg.price.toLocaleString("id-ID")}${unit}`;

              return (
                <ServiceCard
                  key={pkg.id}
                  title={title}
                  price={priceStr}
                  duration={pkg.duration}
                  image={pkg.coverImage}
                  href={`/rinjani-tracking/${pkg.slug}`}
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
