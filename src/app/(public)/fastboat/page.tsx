"use client";
import { useLang } from "@/components/LangProvider";
import ServiceCard from "@/components/public/ServiceCard";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FastBoatPage() {
  const { t, locale } = useLang();

  const schedules = [
    { operator: "Super Scoot Fast Boat", from: "Sanur", to: "Gili / Lombok", dep: "08:00", arr: "12:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "Wijaya Buyuk Fast Boat", from: "Sanur", to: "Gili / Lombok", dep: "08:30", arr: "12:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "Wanderlust Fast Boat", from: "Sanur", to: "Gili / Lombok", dep: "09:00", arr: "13:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "Wahana Virendra Fast Boat", from: "Padang Bai", to: "Gili / Lombok", dep: "09:00", arr: "11:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "Gili-Gili Fast Boat", from: "Padang Bai", to: "Gili / Lombok", dep: "09:30", arr: "11:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "Eka Jaya Fast Boat", from: "Padang Bai", to: "Gili / Lombok", dep: "10:00", arr: "12:00", price: locale === "id" ? "Rp 650.000" : "US$ 45" },
    { operator: "D'Camel Fast Ferry", from: "Sanur", to: "Gili Trawangan", dep: "09:30", arr: "12:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Gili Trawangan", to: "Sanur", dep: "12:30", arr: "16:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Sanur", to: "Bangsal (LBK)", dep: "09:30", arr: "13:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Bangsal (LBK)", to: "Sanur", dep: "13:10", arr: "16:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Serangan", to: "Lembongan", dep: "09:00", arr: "09:45", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Lembongan", to: "Serangan", dep: "16:00", arr: "16:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Serangan", to: "Gili Trawangan", dep: "09:00", arr: "12:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Gili Trawangan", to: "Serangan", dep: "12:30", arr: "16:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Serangan", to: "Bangsal (LBK)", dep: "09:00", arr: "13:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Bangsal (LBK)", to: "Serangan", dep: "13:10", arr: "16:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Lembongan", to: "Padang Bai", dep: "10:00", arr: "10:20", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Padang Bai", to: "Lembongan", dep: "15:00", arr: "15:20", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Lembongan", to: "Gili Trawangan", dep: "10:00", arr: "12:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Gili Trawangan", to: "Lembongan", dep: "12:30", arr: "15:20", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Lembongan", to: "Bangsal (LBK)", dep: "10:00", arr: "13:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Bangsal (LBK)", to: "Lembongan", dep: "13:10", arr: "15:20", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Padang Bai", to: "Gili Trawangan", dep: "10:30", arr: "12:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Gili Trawangan", to: "Padang Bai", dep: "12:30", arr: "14:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Padang Bai", to: "Bangsal (LBK)", dep: "10:30", arr: "13:00", price: locale === "id" ? "Rp 400.000" : "US$ 28" },
    { operator: "D'Camel Fast Ferry", from: "Bangsal (LBK)", to: "Padang Bai", dep: "13:10", arr: "14:30", price: locale === "id" ? "Rp 400.000" : "US$ 28" }
  ];

  return (
    <main className="pt-20 bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/boat1.jpg"
          alt="Daily Fast Boat"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gili-600/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tight">
          {t.nav.fastboat}
        </h1>
      </section>

      {/* Intro Text */}
      <section className="py-12 bg-neutral-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            {t.listingPages.fastboatIntro}
          </p>
        </div>
      </section>

      {/* Schedule Table */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.listingPages.fastboatScheduleTitle}</h2>
          <p className="text-gray-500">{t.listingPages.fastboatScheduleDesc}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gili-600 text-white">
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.listingPages.scheduleRoute}</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.listingPages.scheduleDeparture}</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.listingPages.scheduleArrival}</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.listingPages.schedulePrice}</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.listingPages.scheduleBooking}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schedules.map((s, i) => (
                  <tr key={i} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="font-bold text-gray-900 mb-1">{s.operator}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {s.from} <ArrowRight className="w-4 h-4 text-accent-500" /> {s.to}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-gray-600 font-medium">{s.dep}</td>
                    <td className="px-6 py-6 text-gray-600 font-medium">{s.arr}</td>
                    <td className="px-6 py-6 font-black text-gili-600 text-lg">{s.price}</td>
                    <td className="px-6 py-6">
                      <a href="https://wa.me/6287793082501" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500 text-gili-900 font-bold text-xs hover:bg-accent-400 transition-all">
                        {t.listingPages.scheduleBook}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard 
            title="Super Scoot Fast Boat: Sanur – Lembongan – Penida – Gili – Lombok Route:"
            price={locale === "id" ? "Mulai Rp 400.000" : "Start from US$ 28"}
            duration="4 hours | SANUR - LEMBONGAN - GILI - LOMBOK"
            image="/images/boat1.jpg"
            href="/fastboat/super-scoot-fast-boat-sanur-lembongan-penida-gili-lombok-route"
            isPrivate={false}
          />
          <ServiceCard 
            title="Wijaya Buyuk Fast Boat: Sanur – Lembongan – Penida – Gili – Lombok Route:"
            price={locale === "id" ? "Mulai Rp 400.000" : "Start from US$ 28"}
            duration="4 hours | SANUR - LEMBONGAN - PENIDA - GILI - LOMBOK"
            image="/images/boat2.jpg"
            href="/fastboat/wijaya-buyuk-fast-boat-sanur-lembongan-penida-gili-lombok-route"
            isPrivate={false}
          />
          <ServiceCard 
            title="Wanderlust Fast Boat: Sanur – Lembongan – Penida – Gili – Lombok Route:"
            price={locale === "id" ? "Mulai Rp 400.000" : "Start from US$ 28"}
            duration="4 hours | SANUR - LEMBONGAN - PENIDA - GILI - LOMBOK"
            image="/images/Wanderlust-Fast-Boat.jpg"
            href="/fastboat/wanderlust-fast-boat-sanur-lembongan-penida-gili-lombok-route"
            isPrivate={false}
          />
          <ServiceCard 
            title="Wahana Virendra Fast Boat: Gili to Padang Bai Route:"
            price={locale === "id" ? "Mulai Rp 400.000" : "Start from US$ 28"}
            duration="2 hours | PADANG BAI - GILI - LOMBOK"
            image="/images/virendra-fast-boat.jpg"
            href="/fastboat/wahana-virendra-fast-boat-gili-to-padang-bai-route"
            isPrivate={false}
          />
          <ServiceCard 
            title="Gili-Gili Fast Boat: Gili to Padang Bai Route:"
            price={locale === "id" ? "Mulai Rp 400.000" : "Start from US$ 28"}
            duration="2 hours | PADANG BAI - GILI - LOMBOK"
            image="/images/gili-gili-fast-boat.jpg"
            href="/fastboat/gili-gili-fast-boat-gili-to-padang-bai-route"
            isPrivate={false}
          />
          <ServiceCard 
            title="Eka Jaya Fast Boat: Gili to Padang Bai"
            price={locale === "id" ? "Mulai Rp 650.000" : "Start from US$ 45"}
            duration="2 hours | PADANG BAI - GILI - LOMBOK"
            image="/images/eka-jaya-fast-boat.jpg"
            href="/fastboat/eka-jaya-fast-boat-gili-to-padang-bai"
            isPrivate={false}
          />
          <ServiceCard 
            title="D'Camel Fast Ferry"
            price={locale === "id" ? "Mulai Rp 400.000" : "Start from US$ 28"}
            duration="Daily | BALI - NUSA PENIDA - LOMBOK - GILI"
            image="/images/dcamel-fast-ferry.jpg"
            href="/fastboat/d-camel-fast-ferry"
            isPrivate={false}
          />
        </div>
      </section>
    </main>
  );
}
