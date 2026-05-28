"use client";
import { useLang } from "@/components/LangProvider";
import ServiceCard from "@/components/public/ServiceCard";
import Image from "next/image";

export default function SnorkelingPage() {
  const { t, locale } = useLang();

  const services = [
    {
      title: locale === "id" ? "Snorkeling Sharing Dengan Grup, Selama 4 Jam" : "Shared Snorkeling With The Group, During 4 Hours",
      price: locale === "id" ? "Rp 150.000" : "US$ 10",
      duration: locale === "id" ? "4 Jam" : "4 Hours",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/shared-snorkeling-3-spots",
      isPrivate: false
    },
    {
      title: locale === "id" ? "SNORKELING SHARING DAN TUR SUNSET" : "SHARED SNORKELING AND SUNSET TRIP",
      price: locale === "id" ? "Rp 150.000" : "US$ 10",
      duration: locale === "id" ? "2 Jam" : "2 Hours",
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/shared-snorkeling-sunset",
      isPrivate: false
    },
    {
      title: locale === "id" ? "Snorkeling Privat Selama 2 Jam Dengan 3 Spot" : "Private Snorkeling For 2 Hours With 3 Spots",
      price: locale === "id" ? "Rp 850.000" : "US$ 60",
      duration: locale === "id" ? "2 Jam" : "2 Hours",
      image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/private-snorkeling-2-hours",
      isPrivate: true
    },
    {
      title: locale === "id" ? "SNORKELING PRIVAT DAN TUR SUNSET" : "PRIVATE SNORKELING AND SUNSET TRIP",
      price: locale === "id" ? "Rp 600.000" : "US$ 40",
      duration: locale === "id" ? "2 Jam" : "2 Hours",
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/private-snorkeling-sunset",
      isPrivate: true
    },
    {
      title: locale === "id" ? "Snorkeling Privat Selama 4 Jam Dengan 4 Spot Snorkeling" : "Private Snorkeling For 4 Hours With 4 Snorkeling Spots",
      price: locale === "id" ? "Rp 1.500.000" : "US$ 100",
      duration: locale === "id" ? "4 Jam" : "4 Hours",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/private-snorkeling-4-hours",
      isPrivate: true
    },
    {
      title: locale === "id" ? "Snorkeling Privat Selama 6 Jam" : "Private Snorkeling During 6 Hours",
      price: locale === "id" ? "Rp 2.000.000" : "US$ 135",
      duration: locale === "id" ? "6 Jam" : "6 Hours",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/private-snorkeling-6-hours",
      isPrivate: true
    }
  ];

  return (
    <main className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=2000"
          alt="Snorkeling Package"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gili-600/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tight">
          {t.nav.snorkeling}
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
