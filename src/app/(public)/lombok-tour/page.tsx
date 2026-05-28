"use client";
import { useLang } from "@/components/LangProvider";
import ServiceCard from "@/components/public/ServiceCard";
import Image from "next/image";

export default function LombokTourPage() {
  const { t, locale } = useLang();

  const services = [
    {
      title: locale === "id" ? "Tur Air Terjun (Senaru)" : "Waterfall (Senaru) Tour",
      price: locale === "id" ? "Rp 1.000K / Rp 250K per pax (min. 4)" : "US$ 70 / US$ 18 per pax (min. 4)",
      duration: locale === "id" ? "Seharian Penuh" : "Full Day",
      image: "/images/air-terjun.jpg",
      href: "/lombok-tour/waterfall-senaru-tour",
      isPrivate: true
    },
    {
      title: locale === "id" ? "Tur Air Terjun (Benang Kelambu)" : "Waterfall (Benang Kelambu) Tour",
      price: locale === "id" ? "Rp 1.000K / Rp 250K per pax (min. 4)" : "US$ 70 / US$ 18 per pax (min. 4)",
      duration: locale === "id" ? "Seharian Penuh" : "Full Day",
      image: "/images/air-terjun2.jpg",
      href: "/lombok-tour/waterfall-benang-kelambu-tour",
      isPrivate: true
    },
    {
      title: locale === "id" ? "Tur Pink Beach" : "Pink Beach Tour",
      price: locale === "id" ? "Rp 1.000K / Rp 250K per pax (min. 4)" : "US$ 70 / US$ 18 per pax (min. 4)",
      duration: locale === "id" ? "Seharian Penuh" : "Full Day",
      image: "/images/lombok1.jpg",
      href: "/lombok-tour/pink-beach-tour",
      isPrivate: true
    },
    {
      title: locale === "id" ? "Tur Kuta Lombok" : "Kuta Lombok Tour",
      price: locale === "id" ? "Rp 1.000K / Rp 250K per pax (min. 4)" : "US$ 70 / US$ 18 per pax (min. 4)",
      duration: locale === "id" ? "Seharian Penuh" : "Full Day",
      image: "/images/lombok2.jpg",
      href: "/lombok-tour/kuta-lombok-tour",
      isPrivate: true
    },
    {
      title: locale === "id" ? "Tur Kota" : "City Tour",
      price: locale === "id" ? "Rp 1.000K / Rp 250K per pax (min. 4)" : "US$ 70 / US$ 18 per pax (min. 4)",
      duration: locale === "id" ? "Seharian Penuh" : "Full Day",
      image: "/images/lombok3.jpg",
      href: "/lombok-tour/city-tour",
      isPrivate: true
    }
  ];

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
        />
        <div className="absolute inset-0 bg-gili-600/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tight">
          {t.nav.lombokTour}
        </h1>
      </section>

      {/* Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <ServiceCard key={idx} {...s} />
          ))}
        </div>
      </section>
    </main>
  );
}
