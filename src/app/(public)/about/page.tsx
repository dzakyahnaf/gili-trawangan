import Image from "next/image";
import { Shield, Users, Heart, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "RH Tour & Travel — Mitra terpercaya untuk wisata di Gili Trawangan, Lombok.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
        <Image src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=80" alt="About" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/80 to-ocean-700/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">Tentang Kami</h1>
          <p className="text-ocean-200 text-lg">Cerita di balik RH Tour & Travel</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">RH Tour & Travel</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Kami adalah penyedia jasa wisata terpercaya di Gili Trawangan, Lombok. Dengan pengalaman bertahun-tahun, kami berkomitmen memberikan pengalaman liburan terbaik bagi setiap wisatawan yang mengunjungi surga tropis ini.
          </p>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Dari snorkeling di perairan kristal jernih, diving bersama penyu, island hopping ke 3 Gili, hingga sunset cruise yang memukau — kami menyediakan semua yang Anda butuhkan untuk liburan sempurna.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "Keamanan", desc: "Standar keselamatan internasional di setiap aktivitas" },
            { icon: Users, title: "Profesional", desc: "Tim pemandu bersertifikat dan berpengalaman" },
            { icon: Heart, title: "Pelayanan", desc: "Layanan personal dan perhatian untuk setiap tamu" },
            { icon: Award, title: "Terpercaya", desc: "Ratusan wisatawan puas dengan layanan kami" },
          ].map((v) => (
            <div key={v.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-ocean-50 flex items-center justify-center">
                <v.icon className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-2xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Siap Berpetualang?</h3>
          <p className="text-ocean-200 mb-6">Hubungi kami sekarang untuk merencanakan liburan impian Anda</p>
          <a href="https://wa.me/6287793082501" className="inline-flex px-8 py-3 rounded-xl bg-white text-ocean-600 font-bold hover:shadow-lg transition-shadow">
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
