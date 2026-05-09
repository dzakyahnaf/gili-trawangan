"use client";
import { useLang } from "@/components/LangProvider";
import ServiceCard from "@/components/public/ServiceCard";
import Image from "next/image";

export default function LombokTourPage() {
  const { t } = useLang();

  const services = [
    {
      title: "Waterfall (Senaru) Tour",
      price: "US$ 85",
      duration: "Full Day",
      image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1000",
      href: "/lombok-tour/waterfall-senaru-tour",
      isPrivate: true
    },
    {
      title: "Waterfall (Benang Kelambu) Tour",
      price: "US$ 85",
      duration: "Full Day",
      image: "https://images.unsplash.com/photo-1548318281-7da3f84ced16?auto=format&fit=crop&q=80&w=1000",
      href: "/lombok-tour/waterfall-benang-kelambu-tour",
      isPrivate: true
    },
    {
      title: "Pink Beach Tour",
      price: "US$ 95",
      duration: "Full Day",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
      href: "/lombok-tour/pink-beach-tour",
      isPrivate: true
    },
    {
      title: "Kuta Lombok Tour",
      price: "US$ 85",
      duration: "Full Day",
      image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=1000",
      href: "/lombok-tour/kuta-lombok-tour",
      isPrivate: true
    },
    {
      title: "City Tour",
      price: "US$ 85",
      duration: "Full Day",
      image: "https://images.unsplash.com/photo-1533142262417-ad51619053dc?auto=format&fit=crop&q=80&w=1000",
      href: "/lombok-tour/city-tour",
      isPrivate: true
    }
  ];

  return (
    <main className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=2000"
          alt="Lombok Tour Package"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#32314F]/60" />
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
