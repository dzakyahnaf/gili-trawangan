"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Shield, Users, Clock, HeadphonesIcon, ChevronDown, MapPin, Phone, MessageCircle, Waves, Mountain, Map, Ship, Sailboat, Car, Zap, ShieldCheck, Lock } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { useLang } from "@/components/LangProvider";
import HeroSlider from "@/components/public/HeroSlider";

interface HomeClientProps {
  featured: Array<{
    id: string; slug: string; title: string; coverImage: string;
    duration: string; price: number; isFeatured: boolean; subtitle: string | null;
  }>;
  recentActivities: Array<{
    id: string; slug: string; name: string; coverImage: string;
    duration: string; price: number; category: string;
  }>;
  recentTestimonials: Array<{
    id: string; name: string; origin: string; comment: string; rating: number;
  }>;
  gallery: Array<{
    id: string; imageUrl: string; caption: string | null;
  }>;
  parsedFaqs: Array<{ q: string; a: string }>;
}

export default function HomeClient({ featured, recentActivities, recentTestimonials, gallery, parsedFaqs }: HomeClientProps) {
  const { t } = useLang();

  const serviceCategories = [
    { icon: Waves, label: t.services.snorkeling, href: "/packages", color: "from-blue-500 to-blue-600" },
    { icon: Mountain, label: t.services.activities, href: "/activities", color: "from-green-500 to-green-600" },
    { icon: Map, label: t.services.packages, href: "/packages", color: "from-purple-500 to-purple-600" },
    { icon: Ship, label: t.services.fastboat, href: "/fastboat", color: "from-orange-500 to-orange-600" },
    { icon: Sailboat, label: t.services.speedboat, href: "/speedboat", color: "from-teal-500 to-teal-600" },
    { icon: Car, label: t.services.carRental, href: "/contact", color: "from-red-500 to-red-600" },
  ];

  return (
    <>
      {/* ===== 1. HERO WITH SLIDER ===== */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <HeroSlider />
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-accent-400 font-semibold mb-4 tracking-widest uppercase text-sm animate-fade-in">
            {t.hero.welcome}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            {t.hero.title1}
            <span className="block gradient-text">{t.hero.title2}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto animate-fade-in">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/packages" className="px-8 py-4 rounded-2xl bg-accent-500 text-gili-900 font-bold text-lg shadow-2xl hover:bg-accent-400 hover:scale-105 transition-all">
              {t.hero.cta1}
            </Link>
            <Link href="/fastboat" className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-all">
              {t.hero.cta2}
            </Link>
          </div>
        </div>
        <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-float z-20">
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      {/* ===== 2. SERVICE CATEGORY ICONS ===== */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent-500 font-semibold mb-2 uppercase tracking-wider text-sm">{t.services.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.services.title}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {serviceCategories.map((cat) => (
              <Link key={cat.label} href={cat.href} className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-8 h-8 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-sm text-center group-hover:text-gili-500 transition-colors">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. SEARCH / FILTER ===== */}
      <section className="py-12 bg-gili-500">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">{t.filter.title}</h2>
            <p className="text-gili-200 text-sm mt-2">{t.filter.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gili-200 mb-2">{t.filter.departFrom}</label>
              <select className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-800 font-medium border-0 focus:ring-2 focus:ring-accent-500 outline-none appearance-none cursor-pointer">
                <option value="">{t.filter.allLocations}</option>
                <option value="gili-air">Gili Air</option>
                <option value="gili-meno">Gili Meno</option>
                <option value="gili-trawangan">Gili Trawangan</option>
                <option value="lombok">Lombok</option>
                <option value="bali">Bali</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gili-200 mb-2">{t.filter.tourType}</label>
              <select className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-800 font-medium border-0 focus:ring-2 focus:ring-accent-500 outline-none appearance-none cursor-pointer">
                <option value="">{t.filter.allTypes}</option>
                <option value="private">{t.filter.privateTour}</option>
                <option value="sharing">{t.filter.sharingGroup}</option>
                <option value="snorkeling">Snorkeling</option>
                <option value="diving">{t.filter.divingTour}</option>
                <option value="island-hopping">{t.filter.islandHopping}</option>
                <option value="sunset">{t.filter.sunsetTrip}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gili-200 mb-2">{t.filter.departTime}</label>
              <select className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-800 font-medium border-0 focus:ring-2 focus:ring-accent-500 outline-none appearance-none cursor-pointer">
                <option value="">{t.filter.allTimes}</option>
                <option value="07:00">07:00 AM</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="13:00">13:00 PM</option>
                <option value="15:00">15:00 PM</option>
                <option value="anytime">{t.filter.anytime}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. GOOGLE REVIEWS WIDGET ===== */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent-500 font-semibold mb-2 uppercase tracking-wider text-sm">{t.testimonials.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTestimonials.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">&ldquo;{item.comment}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-gili-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.origin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
              <Image src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_42x14dp.png" alt="Google" width={42} height={14} />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{t.testimonials.basedOn}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. FEATURED PACKAGES ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent-500 font-semibold mb-2 uppercase tracking-wider text-sm">{t.featuredPkg.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.featuredPkg.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((pkg) => (
              <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="relative h-52 overflow-hidden">
                  <Image src={pkg.coverImage} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-gili-500/90 text-white text-xs font-semibold backdrop-blur-sm">
                    {pkg.isFeatured ? `⭐ ${t.featuredPkg.featured}` : pkg.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gili-500 transition-colors line-clamp-2">{pkg.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" />{t.featuredPkg.instantBooking}</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" />{t.featuredPkg.easyCancel}</span>
                    <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" />{t.featuredPkg.secure}</span>
                  </div>
                  <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xl font-bold text-gili-600">{formatRupiah(pkg.price)}</p>
                      <p className="text-xs text-gray-400">{t.featuredPkg.perPerson}</p>
                    </div>
                    <span className="px-4 py-2 rounded-xl bg-accent-500 text-gili-900 text-xs font-bold group-hover:bg-accent-400 transition-colors shadow-sm">
                      {t.featuredPkg.bookNow}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/packages" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gili-500 text-gili-600 font-semibold hover:bg-gili-500 hover:text-white transition-all">
              {t.featuredPkg.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 6. ACTIVITIES ===== */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent-500 font-semibold mb-2 uppercase tracking-wider text-sm">{t.activitiesSection.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.activitiesSection.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentActivities.map((act) => (
              <Link key={act.id} href={`/activities/${act.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="relative h-52 overflow-hidden">
                  <Image src={act.coverImage} alt={act.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-gili-500/90 text-white text-xs font-semibold backdrop-blur-sm">{act.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gili-500 transition-colors">{act.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{act.duration}</span>
                    <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" />{t.featuredPkg.instantBooking}</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" />{t.featuredPkg.easyCancel}</span>
                    <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" />{t.featuredPkg.secure}</span>
                  </div>
                  <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xl font-bold text-gili-600">{formatRupiah(act.price)}</p>
                      <p className="text-xs text-gray-400">{t.featuredPkg.perPerson}</p>
                    </div>
                    <span className="px-4 py-2 rounded-xl bg-accent-500 text-gili-900 text-xs font-bold group-hover:bg-accent-400 transition-colors shadow-sm">{t.featuredPkg.bookNow}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/activities" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-accent-500 text-accent-600 font-semibold hover:bg-accent-500 hover:text-gili-900 transition-all">
              {t.activitiesSection.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 7. WHY CHOOSE US ===== */}
      <section className="py-20 bg-linear-to-br from-gili-600 to-gili-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold">{t.whyUs.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: t.whyUs.safety, desc: t.whyUs.safetyDesc },
              { icon: Users, title: t.whyUs.expertGuide, desc: t.whyUs.expertGuideDesc },
              { icon: Clock, title: t.whyUs.bestPrice, desc: t.whyUs.bestPriceDesc },
              { icon: HeadphonesIcon, title: t.whyUs.support, desc: t.whyUs.supportDesc },
            ].map((f) => (
              <div key={f.title} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <f.icon className="w-8 h-8 text-accent-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gili-200 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. GALLERY ===== */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent-500 font-semibold mb-2 uppercase tracking-wider text-sm">{t.gallery.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.gallery.title}</h2>
          </div>
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {gallery.map((img) => (
              <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden group relative">
                <Image src={img.imageUrl} alt={img.caption || "Gili Trawangan"} width={600} height={400} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end">
                  <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. MEETING POINT MAP ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent-500 font-semibold mb-2 uppercase tracking-wider text-sm">{t.meetingPoint.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.meetingPoint.title}</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg h-80">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.5!2d116.0267!3d-8.3521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSama+Sama+Reggae+Bar!5e0!3m2!1sen!2sid!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Meeting Point Map" />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gili-50 flex items-center justify-center shrink-0"><MapPin className="w-6 h-6 text-gili-600" /></div>
                <div>
                  <h3 className="font-bold text-gray-900">Sama-Sama Reggae Bar</h3>
                  <p className="text-gray-500 text-sm">Gili Trawangan, Lombok, NTB, Indonesia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center shrink-0"><Phone className="w-6 h-6 text-accent-600" /></div>
                <div>
                  <h3 className="font-bold text-gray-900">WhatsApp</h3>
                  <a href="https://wa.me/6287793082501" className="text-gili-600 hover:underline">+62 877-9308-2501</a>
                </div>
              </div>
              <a href="https://wa.me/6287793082501?text=Halo%20RH%20Tour%2C%20saya%20ingin%20bertanya" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-lg">
                <MessageCircle className="w-5 h-5" />{t.meetingPoint.chatWa}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. FAQ ===== */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent-500 font-semibold mb-2 uppercase tracking-wider text-sm">{t.faq.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {parsedFaqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-gray-900 hover:text-gili-600 transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-gray-600 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. CTA FINAL ===== */}
      <section className="py-20 bg-linear-to-r from-gili-600 via-gili-700 to-gili-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-gili-200 mb-8 text-lg">{t.cta.subtitle}</p>
          <Link href="/booking" className="inline-flex px-10 py-4 rounded-2xl bg-accent-500 text-gili-900 text-lg font-bold shadow-2xl hover:bg-accent-400 hover:scale-105 transition-all">
            {t.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
