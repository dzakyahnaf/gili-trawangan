"use client";
import { useLang } from "@/components/LangProvider";
import ServiceCard from "@/components/public/ServiceCard";
import Image from "next/image";
import { Car, Ship, MapPin, ShieldCheck, Zap, MessageCircle, Clock } from "lucide-react";

export default function PrivateSpeedboatCarPage() {
  const { t } = useLang();

  const services = [
    {
      title: "Private Speed Boat: Lombok – Gili Air – Gili Trawangan – Gili Meno",
      price: "US$ 15",
      duration: "Per Way",
      image: "https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2024-10-29-at-08.48.49-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.jpeg",
      href: "/private-speed-boat-and-car/speedboat-charter",
      isPrivate: true
    },
    {
      title: "Private Speed Boat and Car",
      price: "US$ 35",
      duration: "2 Hours",
      image: "https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/4521-inside-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.png",
      href: "/private-speed-boat-and-car/combo-transfer",
      isPrivate: true
    },
    {
      title: "Private Car",
      price: "US$ 15",
      duration: "2 Hours",
      image: "https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/toyota-avanza-baru-diprediksi-punya-turbo-yuk-cermati-serbaserbinya-ise-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.jpg",
      href: "/private-speed-boat-and-car/car-transfer",
      isPrivate: true
    }
  ];

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
        />
        <div className="absolute inset-0 bg-[#32314F]/60" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <ServiceCard key={idx} {...s} />
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-8 text-[#FDD973]">{t.listingPages.whyBookPrivateTitle}</h2>
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
