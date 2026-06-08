import Image from "next/image";
import ServiceCard from "@/components/public/ServiceCard";
import { getSnorkelingPackages } from "@/app/actions/snorkeling";
import { cookies } from "next/headers";
import { translations, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paket Snorkeling Gili Trawangan",
  description:
    "Paket snorkeling terbaik di Gili Trawangan. Sharing trip & private boat dengan panduan berpengalaman. Harga terjangkau mulai Rp 150.000.",
};

export default async function SnorkelingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const t = translations[locale] || translations.id;

  const packages = await getSnorkelingPackages();

  return (
    <main className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/snorkeling3.jpg"
          alt="Snorkeling Package"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gili-600/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tight">
          {t.nav.snorkeling}
        </h1>
      </section>

      {/* Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        {packages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Paket snorkeling belum tersedia. Hubungi kami untuk informasi lebih lanjut.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <ServiceCard
                key={pkg.id}
                title={locale === "en" ? (pkg.nameEn || pkg.name) : pkg.name}
                price={
                  locale === "en"
                    ? pkg.priceUSD
                      ? `US$ ${pkg.priceUSD}`
                      : `US$ ${Math.round(pkg.price / 17000)}`
                    : `Rp ${pkg.price.toLocaleString("id-ID")}`
                }
                duration={pkg.duration}
                image={pkg.coverImage}
                href={`/snorkeling/${pkg.slug}`}
                isPrivate={pkg.slug.includes("private")}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
