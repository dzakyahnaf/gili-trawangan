import Image from "next/image";
import { Shield, Users, Heart, Award } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { translations, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "RH Tour & Travel — Mitra terpercaya untuk wisata di Gili Trawangan, Lombok.",
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const t = translations[locale] || translations.id;

  return (
    <div className="pt-16 lg:pt-20 pb-20">
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <Image src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920&auto=format&fit=crop" alt="About" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-gili-900/80 to-gili-700/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">{t.nav.about}</h1>
          <p className="text-gili-200 text-lg">{locale === "en" ? "The story behind RH Tour & Travel" : "Cerita di balik RH Tour & Travel"}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">RH Tour & Travel</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {locale === "en" 
              ? "We are a trusted travel service provider in Gili Trawangan, Lombok. With years of experience, we are committed to providing the best holiday experience for every tourist visiting this tropical paradise."
              : "Kami adalah penyedia jasa wisata terpercaya di Gili Trawangan, Lombok. Dengan pengalaman bertahun-tahun, kami berkomitmen memberikan pengalaman liburan terbaik bagi setiap wisatawan yang mengunjungi surga tropis ini."}
          </p>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {locale === "en"
              ? "From snorkeling in crystal clear waters, diving with turtles, island hopping to the 3 Gilis, to stunning sunset cruises — we provide everything you need for a perfect holiday."
              : "Dari snorkeling di perairan kristal jernih, diving bersama penyu, island hopping ke 3 Gili, hingga sunset cruise yang memukau — kami menyediakan semua yang Anda butuhkan untuk liburan sempurna."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: locale === "en" ? "Safety" : "Keamanan", desc: locale === "en" ? "International safety standards in every activity" : "Standar keselamatan internasional di setiap aktivitas" },
            { icon: Users, title: locale === "en" ? "Professional" : "Profesional", desc: locale === "en" ? "Certified and experienced guide team" : "Tim pemandu bersertifikat dan berpengalaman" },
            { icon: Heart, title: locale === "en" ? "Service" : "Pelayanan", desc: locale === "en" ? "Personalized service and care for every guest" : "Layanan personal dan perhatian untuk setiap tamu" },
            { icon: Award, title: locale === "en" ? "Trusted" : "Terpercaya", desc: locale === "en" ? "Hundreds of satisfied tourists with our services" : "Ratusan wisatawan puas dengan layanan kami" },
          ].map((v) => (
            <div key={v.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gili-50 flex items-center justify-center">
                <v.icon className="w-8 h-8 text-gili-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-gili-600 to-gili-700 rounded-2xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">{locale === "en" ? "Ready for an Adventure?" : "Siap Berpetualang?"}</h3>
          <p className="text-gili-200 mb-6">{locale === "en" ? "Contact us now to plan your dream holiday" : "Hubungi kami sekarang untuk merencanakan liburan impian Anda"}</p>
          <a href="https://wa.me/6287793082501" className="inline-flex px-8 py-3 rounded-xl bg-accent-500 text-gili-900 font-bold hover:bg-accent-400 hover:shadow-lg transition-all">
            {locale === "en" ? "Contact Us" : "Hubungi Kami"}
          </a>
        </div>
      </div>
    </div>
  );
}
