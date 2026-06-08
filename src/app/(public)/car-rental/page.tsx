import Image from "next/image";
import Link from "next/link";
import { Car, MapPin, CheckCircle2, ShieldCheck, Zap, MessageCircle, Clock, User, Fuel } from "lucide-react";
import { cookies } from "next/headers";
import { getActivities } from "@/app/actions/activity";
import { translations, type Locale } from "@/lib/i18n";
import { getWhatsAppLink } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sewa Mobil Lombok dengan Sopir & Bensin",
  description:
    "Layanan sewa mobil privat terbaik di Lombok. Tersedia Airport Transfer, Sewa Mobil Harian, dan Perjalanan Jarak Pendek. Sopir ramah, mobil bersih, harga terjangkau.",
};

export default async function CarRentalPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const isEn = locale === "en";

  const packages = await getActivities("car-rental");

  const destinations = [
    { 
      name: isEn ? "Senggigi" : "Senggigi", 
      desc: isEn ? "Main tourist hub in Lombok" : "Pusat wisata utama di Lombok" 
    },
    { 
      name: isEn ? "Mataram City" : "Kota Mataram", 
      desc: isEn ? "Capital city for shopping and culture" : "Ibu kota untuk belanja dan budaya" 
    },
    { 
      name: isEn ? "Kuta Lombok" : "Kuta Lombok", 
      desc: isEn ? "Famous for surfing and pristine beaches" : "Terkenal dengan selancar dan pantai yang murni" 
    },
    { 
      name: isEn ? "Senaru / Sembalun" : "Senaru / Sembalun", 
      desc: isEn ? "Gateways to Mount Rinjani" : "Pintu masuk ke Gunung Rinjani" 
    },
    { 
      name: isEn ? "Pink Beach" : "Pink Beach", 
      desc: isEn ? "Stunning pink sand in East Lombok" : "Pasir merah muda yang menakjubkan di Lombok Timur" 
    },
    { 
      name: isEn ? "Sekotong" : "Sekotong", 
      desc: isEn ? "Quiet beaches and hidden gems" : "Pantai yang tenang dan permata tersembunyi" 
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center justify-center">
        <Image 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
          alt="Lombok Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {isEn ? "Private Car Service" : "Sewa Mobil Pribadi"}
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {isEn 
              ? "Explore Lombok island comfortably with our professional private drivers."
              : "Jelajahi pulau Lombok dengan nyaman bersama pengemudi pribadi profesional kami."}
          </p>
        </div>
      </section>

      {/* Intro Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-gili-50 flex items-center justify-center mb-3"><Car className="w-6 h-6 text-gili-500" /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{isEn ? "New Vehicles" : "Armada Baru"}</p>
              <p className="text-lg font-bold text-gray-900">{isEn ? "Modern Fleet" : "Mobil Modern"}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center mb-3"><User className="w-6 h-6 text-accent-600" /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{isEn ? "Professional" : "Profesional"}</p>
              <p className="text-lg font-bold text-gray-900">{isEn ? "English Speaking" : "Bisa Bahasa Inggris"}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-3"><Fuel className="w-6 h-6 text-green-600" /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{isEn ? "Inclusive" : "Inklusif"}</p>
              <p className="text-lg font-bold text-gray-900">{isEn ? "Petrol Included" : "Sudah Termasuk BBM"}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3"><Clock className="w-6 h-6 text-blue-600" /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{isEn ? "Flexible" : "Fleksibel"}</p>
              <p className="text-lg font-bold text-gray-900">{isEn ? "24/7 Available" : "Tersedia 24/7"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isEn ? "Our Rental Packages" : "Paket Sewa Mobil Kami"}
            </h2>
            <p className="text-gray-500">
              {isEn ? "Choose the best option for your travel needs in Lombok." : "Pilih opsi terbaik untuk kebutuhan perjalanan Anda di Lombok."}
            </p>
          </div>
          {packages.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>Paket sewa mobil belum tersedia.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((service) => {
                const title = isEn ? (service.nameEn || service.name) : service.name;
                const desc = isEn ? (service.descriptionEn || service.description) : service.description;
                const unit = service.meetingPoint || ""; // Price unit suffix (e.g. per day, per way)
                const priceStr = isEn
                  ? service.priceUSD
                    ? `US$ ${service.priceUSD}`
                    : `US$ ${Math.round(service.price / 17000)}`
                  : `Rp ${service.price.toLocaleString("id-ID")}`;

                return (
                  <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col">
                    <div className="relative h-56">
                      <Image src={service.coverImage} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <p className="text-accent-400 font-bold text-2xl">{priceStr}</p>
                        <p className="text-white text-xs font-medium">{unit}</p>
                      </div>
                    </div>
                    <div className="p-6 grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                    <div className="p-6 pt-0">
                      <Link 
                        href={getWhatsAppLink(`Halo RH Tour, saya ingin pesan ${title}`)}
                        className="block w-full py-3.5 rounded-xl bg-gili-500 text-white font-bold text-center hover:bg-gili-600 transition-all text-sm"
                      >
                        {isEn ? "Book This Car" : "Pesan Mobil Ini"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEn ? "Popular Destinations" : "Destinasi Populer"}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isEn 
                  ? "We provide car services to all areas across Lombok. Whether you need a simple transfer from the airport to Bangsal port or a full day tour exploring the hidden waterfalls and southern beaches, we've got you covered."
                  : "Kami menyediakan layanan mobil ke seluruh wilayah di Lombok. Baik Anda memerlukan transfer sederhana dari bandara ke pelabuhan Bangsal atau tur seharian menjelajahi air terjun tersembunyi dan pantai selatan, kami siap membantu Anda."}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {destinations.map((dest, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-500 mt-2 shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{dest.name}</p>
                      <p className="text-xs text-gray-500">{dest.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?auto=format&fit=crop&q=80&w=1000"
                alt="Lombok Road Trip"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions Card */}
      <section className="pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 text-center text-accent-400 tracking-wide uppercase">
              {isEn ? "All Rentals Include" : "Semua Sewa Termasuk"}
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">{isEn ? "Private Car & AC" : "Mobil Pribadi & AC"}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">{isEn ? "Professional Driver" : "Sopir Profesional"}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">{isEn ? "Petrol / Fuel" : "Bensin / BBM"}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">{isEn ? "Flexible Pickup" : "Penjemputan Fleksibel"}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">{isEn ? "Wait at Airport" : "Menunggu di Bandara"}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">{isEn ? "Safe & Clean" : "Aman & Bersih"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-accent-500 text-gili-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            {isEn ? "Book Your Ride Now" : "Pesan Perjalanan Anda Sekarang"}
          </h2>
          <p className="font-medium mb-10 text-gili-800/80">
            {isEn 
              ? "Available 24 hours for emergency transfers or planned tours. Instant confirmation via WhatsApp."
              : "Tersedia 24 jam untuk transfer darurat atau tur terencana. Konfirmasi instan via WhatsApp."}
          </p>
          <Link 
            href={getWhatsAppLink()}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gili-500 text-white font-bold text-lg hover:scale-105 transition-all shadow-xl"
          >
            <MessageCircle className="w-6 h-6" /> {isEn ? "Chat with Driver" : "Chat dengan Sopir"}
          </Link>
        </div>
      </section>
    </main>
  );
}
