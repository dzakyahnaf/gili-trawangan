import Link from "next/link";
import Image from "next/image";
import { Star, Shield, Users, Clock, HeadphonesIcon, ChevronDown, MapPin, Phone, MessageCircle } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const featured = await prisma.package.findMany({
    where: { isFeatured: true, isActive: true },
    take: 3,
  });

  const recentActivities = await prisma.activity.findMany({
    where: { isActive: true },
    take: 6,
  });

  const recentTestimonials = await prisma.testimonial.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const gallery = await prisma.gallery.findMany({
    take: 9,
    orderBy: { createdAt: "desc" },
  });

  const siteFaqs = await prisma.siteContent.findMany({
    where: { group: "faq" },
  });

  const parsedFaqs = siteFaqs.map(f => JSON.parse(f.value));

  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=80"
          alt="Gili Trawangan Paradise"
          fill
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-ocean-300 font-medium mb-4 tracking-widest uppercase text-sm animate-fade-in">
            🌊 Welcome to Paradise
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Jelajahi Keajaiban
            <span className="block bg-gradient-to-r from-ocean-300 to-coral-400 bg-clip-text text-transparent">
              Gili Trawangan
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto animate-fade-in">
            Paket wisata terlengkap — snorkeling, diving, island hopping & fast boat. Booking mudah, harga terjangkau!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              href="/packages"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-semibold text-lg shadow-2xl hover:shadow-ocean-500/30 hover:scale-105 transition-all"
            >
              Lihat Paket Wisata
            </Link>
            <Link
              href="/fastboat"
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Pesan Fast Boat
            </Link>
          </div>
        </div>
        <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-float">
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      {/* ===== 2. STATS BAR ===== */}
      <section id="stats" className="bg-gradient-to-r from-ocean-600 to-ocean-700 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { val: "500+", label: "Happy Travelers" },
            { val: "10+", label: "Aktivitas Wisata" },
            { val: "4.9★", label: "Rating" },
            { val: "24/7", label: "Support" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl lg:text-4xl font-bold">{s.val}</p>
              <p className="text-ocean-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 3. FEATURED PACKAGES ===== */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-ocean-500 font-semibold mb-2">Paket Unggulan</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Pilih Petualangan Anda</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src={pkg.coverImage} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-semibold">
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">{pkg.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Mulai dari</p>
                      <p className="text-xl font-bold text-ocean-600">{formatRupiah(pkg.price)}</p>
                      <p className="text-xs text-gray-400">/orang</p>
                    </div>
                    <span className="px-4 py-2 rounded-xl bg-ocean-50 text-ocean-600 text-sm font-semibold group-hover:bg-ocean-500 group-hover:text-white transition-colors">
                      Detail →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/packages" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-ocean-500 text-ocean-600 font-semibold hover:bg-ocean-500 hover:text-white transition-all">
              Lihat Semua Paket
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 4. ACTIVITIES ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-coral-500 font-semibold mb-2">Aktivitas Seru</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Apa yang Bisa Kamu Lakukan?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentActivities.map((act) => (
              <Link
                key={act.id}
                href={`/activities/${act.slug}`}
                className="group relative rounded-2xl overflow-hidden h-64 shadow-md hover:shadow-xl transition-all"
              >
                <Image src={act.coverImage} alt={act.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-bold text-white text-lg">{act.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-ocean-300 font-semibold">{formatRupiah(act.price)}</span>
                    <span className="text-white/70 text-sm">{act.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/activities" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-coral-500 text-coral-600 font-semibold hover:bg-coral-500 hover:text-white transition-all">
              Lihat Semua Aktivitas
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 5. WHY CHOOSE US ===== */}
      <section className="py-20 bg-gradient-to-br from-ocean-600 to-ocean-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold">Kenapa Pilih Kami?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Safety First", desc: "Semua aktivitas dilengkapi peralatan keselamatan standar internasional" },
              { icon: Users, title: "Expert Guide", desc: "Pemandu wisata berpengalaman & bersertifikat" },
              { icon: Clock, title: "Best Price", desc: "Harga terbaik dengan kualitas layanan premium" },
              { icon: HeadphonesIcon, title: "24/7 Support", desc: "Tim support siap membantu kapan saja via WhatsApp" },
            ].map((f) => (
              <div key={f.title} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <f.icon className="w-8 h-8 text-ocean-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-ocean-200 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. GALLERY ===== */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-ocean-500 font-semibold mb-2">Galeri</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Momen Tak Terlupakan</h2>
          </div>
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {gallery.map((img) => (
              <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden group relative">
                <Image src={img.imageUrl} alt={img.caption || ""} width={600} height={400} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end">
                  <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. TESTIMONIALS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-coral-500 font-semibold mb-2">Testimoni</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Kata Mereka</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTestimonials.map((t) => (
              <div key={t.id} className="bg-sand-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">&ldquo;{t.comment}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-400 to-coral-400 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.origin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. MEETING POINT MAP ===== */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-ocean-500 font-semibold mb-2">Meeting Point</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Temui Kami Di Sini</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.5!2d116.0267!3d-8.3521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSama+Sama+Reggae+Bar!5e0!3m2!1sen!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Meeting Point Map"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-ocean-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Sama-Sama Reggae Bar</h3>
                  <p className="text-gray-500 text-sm">Gili Trawangan, Lombok, NTB, Indonesia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coral-100 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-coral-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">WhatsApp</h3>
                  <a href="https://wa.me/6287793082501" className="text-ocean-600 hover:underline">+62 877-9308-2501</a>
                </div>
              </div>
              <a
                href="https://wa.me/6287793082501?text=Halo%20RH%20Tour%2C%20saya%20ingin%20bertanya"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. FAQ ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-ocean-500 font-semibold mb-2">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Pertanyaan Umum</h2>
          </div>
          <div className="space-y-4">
            {parsedFaqs.map((faq, i) => (
              <details key={i} className="group bg-sand-50 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-gray-900 hover:text-ocean-600 transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-gray-600 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. CTA FINAL ===== */}
      <section className="py-20 bg-gradient-to-r from-ocean-600 via-ocean-700 to-ocean-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Siap Berpetualang?</h2>
          <p className="text-ocean-200 mb-8 text-lg">Pesan sekarang dan dapatkan pengalaman terbaik di Gili Trawangan!</p>
          <Link
            href="/booking"
            className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-coral-500 to-coral-600 text-white text-lg font-bold shadow-2xl hover:scale-105 transition-all"
          >
            Pesan Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
