"use client";
import { useLang } from "@/components/LangProvider";
import ServiceCard from "@/components/public/ServiceCard";
import Image from "next/image";

export default function SnorkelingPage() {
  const { t } = useLang();

  const services = [
    {
      title: "Shared Snorkeling With The Group, During 4 Hours",
      price: "US$ 12",
      duration: "4 Hours",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/shared-snorkeling-3-spots",
      isPrivate: false
    },
    {
      title: "SHARED SNORKELING AND SUNSET TRIP",
      price: "US$ 13",
      duration: "2 Hours",
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/shared-snorkeling-sunset",
      isPrivate: false
    },
    {
      title: "Private Snorkeling For 2 Hours With 3 Spots",
      price: "US$ 35",
      duration: "2 Hours",
      image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/private-snorkeling-2-hours",
      isPrivate: true
    },
    {
      title: "PRIVATE SNORKELING AND SUNSET TRIP",
      price: "US$ 40",
      duration: "2 Hours",
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/private-snorkeling-sunset",
      isPrivate: true
    },
    {
      title: "Private Snorkeling For 4 Hours With 4 Snorkeling Spots",
      price: "US$ 50",
      duration: "4 Hours",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/private-snorkeling-4-hours",
      isPrivate: true
    },
    {
      title: "Private Snorkellng During 8 Hours",
      price: "US$ 85",
      duration: "8 Hours",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000",
      href: "/snorkeling/private-snorkeling-8-hours",
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
