"use client";
import { useLang } from "@/components/LangProvider";
import ServiceCard from "@/components/public/ServiceCard";
import Image from "next/image";

export default function RinjaniTrackingPage() {
  const { t } = useLang();

  const services = [
    {
      title: "Trekking Summit Rinjani 2 Days 1 Night",
      price: "US$ 150",
      duration: "2D / 1N",
      image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=1000",
      href: "/rinjani-tracking/2d1n-summit",
      isPrivate: true
    },
    {
      title: "Trekking Rinjani 3 Days 2 Night (Sembalun - Torean)",
      price: "US$ 185",
      duration: "3D / 2N",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000",
      href: "/rinjani-tracking/3d2n-summit",
      isPrivate: true
    },
    {
      title: "Trekking Rinjani 4 Days 3 Night (Sembalun - Torean)",
      price: "US$ 235",
      duration: "4D / 3N",
      image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=1000",
      href: "/rinjani-tracking/4d3n-summit",
      isPrivate: true
    }
  ];

  return (
    <main className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=2000"
          alt="Rinjani Tracking"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gili-600/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tight">
          {t.nav.rinjani}
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
