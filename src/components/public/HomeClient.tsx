"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Shield, Users, Clock, HeadphonesIcon, ChevronDown, MapPin, Phone, MessageCircle, Waves, Mountain, Map, Ship, Sailboat, Car, Zap, ShieldCheck, Lock } from "lucide-react";
import { formatCurrency, getWhatsAppLink, getWhatsAppDisplay } from "@/lib/utils";
import { useLang } from "@/components/LangProvider";
import HeroSlider from "@/components/public/HeroSlider";

interface HomeClientProps {
  featured: Array<{
    id: string; slug: string; title: string; coverImage: string;
    duration: string; price: number; isFeatured: boolean; subtitle: string | null;
  }>;
  recentActivities?: any[];
  recentTestimonials: Array<{
    id: string; name: string; origin: string; comment: string; rating: number;
  }>;
  gallery: Array<{
    id: string; imageUrl: string; caption: string | null;
  }>;
  parsedFaqs: Array<{ q: string; a: string }>;
}

export default function HomeClient({ featured, recentActivities, recentTestimonials, gallery, parsedFaqs }: HomeClientProps) {
  const { t, locale } = useLang();

  // Custom premium detailed vector illustrations for categories
  const SnorkelingIcon = () => (
    <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="snorkelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <path d="M4 52C12 52 16 48 24 48C32 48 36 52 44 52C52 52 56 48 60 48" stroke="url(#snorkelGrad)" strokeWidth="3" strokeLinecap="round" />
      <rect x="12" y="16" width="32" height="20" rx="10" fill="url(#snorkelGrad)" fillOpacity="0.15" stroke="url(#snorkelGrad)" strokeWidth="3" />
      <circle cx="21" cy="26" r="5" stroke="url(#snorkelGrad)" strokeWidth="2.5" fill="white" fillOpacity="0.3" />
      <circle cx="35" cy="26" r="5" stroke="url(#snorkelGrad)" strokeWidth="2.5" fill="white" fillOpacity="0.3" />
      <path d="M26 26H30" stroke="url(#snorkelGrad)" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 10V30C44 36 40 40 34 40" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 40C32 40 30 38 30 36" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="48" cy="16" r="2" fill="#38bdf8" />
    </svg>
  );

  const TourIcon = () => (
    <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tourGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
      </defs>
      <rect x="12" y="20" width="40" height="30" rx="6" fill="url(#tourGrad)" fillOpacity="0.15" stroke="url(#tourGrad)" strokeWidth="3" />
      <path d="M24 20V12C24 9.8 25.8 8 28 8H36C38.2 8 40 9.8 40 12V20" stroke="url(#tourGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="20" x2="22" y2="50" stroke="url(#tourGrad)" strokeWidth="2.5" />
      <line x1="42" y1="20" x2="42" y2="50" stroke="url(#tourGrad)" strokeWidth="2.5" />
      <path d="M32 28L34 33L39 35L34 37L32 42L30 37L25 35L30 33Z" fill="#eab308" />
    </svg>
  );

  const RinjaniIcon = () => (
    <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rinjaniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <circle cx="46" cy="20" r="8" fill="#eab308" fillOpacity="0.8" />
      <path d="M6 48L26 14L46 48H6Z" fill="url(#rinjaniGrad)" fillOpacity="0.15" stroke="url(#rinjaniGrad)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 24L26 14L32 24L29 21.5L26 23L23 21.5Z" fill="white" stroke="url(#rinjaniGrad)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M34 48L44 30L54 48H34Z" fill="url(#rinjaniGrad)" fillOpacity="0.3" stroke="url(#rinjaniGrad)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 48C20 44 24 40 32 40C40 40 44 48 52 48" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  const LombokIcon = () => (
    <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lombokGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <path d="M32 4C20 4 10 14 10 26C10 40 32 58 32 58C32 58 54 40 54 26C54 14 44 4 32 4Z" fill="url(#lombokGrad)" fillOpacity="0.15" stroke="url(#lombokGrad)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M28 42C29 34 33 30 36 24" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 24C32 22 26 24 24 26" stroke="url(#lombokGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M36 24C36 18 32 14 28 14" stroke="url(#lombokGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M36 24C40 20 46 20 48 24" stroke="url(#lombokGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M36 24C40 26 44 30 42 34" stroke="url(#lombokGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 42H42" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  const BoatIcon = () => (
    <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="boatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <path d="M4 48H16M8 54H24" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 42L48 42C54 42 58 38 60 32L54 24H22L14 36L14 42Z" fill="url(#boatGrad)" fillOpacity="0.15" stroke="url(#boatGrad)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 24V16H42L46 24H24Z" fill="white" fillOpacity="0.4" stroke="url(#boatGrad)" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="28" y="18" width="4" height="4" rx="1" fill="url(#boatGrad)" />
      <rect x="36" y="18" width="4" height="4" rx="1" fill="url(#boatGrad)" />
      <path d="M24 48C32 44 40 48 48 48C56 48 60 44 60 44" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  const SpeedboatIcon = () => (
    <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" stroke="url(#speedGrad)" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M10 38L38 38C44 38 48 35 50 30L46 22H24L16 32L10 38Z" fill="url(#speedGrad)" fillOpacity="0.15" stroke="url(#speedGrad)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M34 22L38 16H44L46 22" stroke="url(#speedGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 44C16 40 26 44 36 44C46 44 54 40 58 40" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  const ContactIcon = () => (
    <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="contactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      <path d="M12 40V18C12 12.5 16.5 8 22 8H42C47.5 8 52 12.5 52 18V34C52 39.5 47.5 44 42 44H24L12 52V40Z" fill="url(#contactGrad)" fillOpacity="0.15" stroke="url(#contactGrad)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M32 16L34.5 21L40 22L36 26L37.5 31.5L32 28.5L26.5 31.5L28 26L24 22L29.5 21L32 16Z" fill="#eab308" />
      <circle cx="22" cy="24" r="2" fill="url(#contactGrad)" />
      <circle cx="32" cy="24" r="2" fill="url(#contactGrad)" />
      <circle cx="42" cy="24" r="2" fill="url(#contactGrad)" />
    </svg>
  );

  const serviceCategories = [
    { icon: SnorkelingIcon, label: t.services.snorkeling, href: "/snorkeling", color: "from-blue-500/10 to-sky-500/5 border-blue-200" },
    { icon: TourIcon, label: t.services.packages, href: "/packages", color: "from-purple-500/10 to-fuchsia-500/5 border-purple-200" },
    { icon: RinjaniIcon, label: t.services.rinjani, href: "/rinjani-tracking", color: "from-indigo-500/10 to-blue-500/5 border-indigo-200" },
    { icon: LombokIcon, label: t.services.lombokTour, href: "/lombok-tour", color: "from-emerald-500/10 to-teal-500/5 border-emerald-200" },
    { icon: BoatIcon, label: t.services.fastboat, href: "/fastboat", color: "from-orange-500/10 to-amber-500/5 border-orange-200" },
    { icon: SpeedboatIcon, label: t.services.privateSpeedboatCar, href: "/private-speed-boat-and-car", color: "from-teal-500/10 to-cyan-500/5 border-teal-200" },
    { icon: ContactIcon, label: t.nav.contact, href: "/contact", color: "from-red-500/10 to-rose-500/5 border-red-200" },
  ];

  return (
    <>
      {/* ===== 1. HERO WITH SLIDER ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <HeroSlider />
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-14">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
            {serviceCategories.map((cat) => (
              <Link key={cat.label} href={cat.href} className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-100">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${cat.color} border flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon />
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
              <Image src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width={60} height={20} />
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
                <div className="relative w-full aspect-[12/8.4] overflow-hidden">
                  <Image src={pkg.coverImage} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
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
                      <p className="text-xl font-bold text-gili-600">{formatCurrency(pkg.price, locale)}</p>
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
            {[
              {
                id: "g-1",
                imageUrl: "/images/snorkeling1.jpg",
                caption: locale === "id" ? "Patung Bawah Laut Gili Meno" : "Gili Meno Underwater Statues"
              },
              {
                id: "g-2",
                imageUrl: "/images/snorkeling2.jpg",
                caption: locale === "id" ? "Sunset Cruise & Snorkeling" : "Sunset Cruise & Snorkeling"
              },
              {
                id: "g-3",
                imageUrl: "/images/snorkeling3.jpg",
                caption: locale === "id" ? "Berenang Bersama Penyu" : "Swimming with Sea Turtles"
              },
              {
                id: "g-4",
                imageUrl: "/images/snorkeling4.jpg",
                caption: locale === "id" ? "Keindahan Bawah Laut Gili" : "Underwater Paradise of Gili"
              },
              {
                id: "g-5",
                imageUrl: "/images/snorkeling5.jpg",
                caption: locale === "id" ? "Terumbu Karang yang Indah" : "Vibrant Coral Reefs"
              },
              {
                id: "g-6",
                imageUrl: "/images/lombok1.jpg",
                caption: locale === "id" ? "Pantai Pink Lombok Timur" : "East Lombok Pink Beach"
              },
              {
                id: "g-7",
                imageUrl: "/images/lombok2.jpg",
                caption: locale === "id" ? "Garis Pantai Kuta Lombok" : "Kuta Lombok Coastline"
              },
              {
                id: "g-8",
                imageUrl: "/images/lombok3.jpg",
                caption: locale === "id" ? "Pusat Kota & Budaya Mataram" : "Mataram Cultural City Tour"
              },
              {
                id: "g-9",
                imageUrl: "/images/air-terjun.jpg",
                caption: locale === "id" ? "Keindahan Air Terjun Sendang Gile" : "Beautiful Sendang Gile Waterfall"
              }
            ].map((img) => (
              <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden group relative">
                <Image src={img.imageUrl} alt={img.caption || "Gili Trawangan"} width={600} height={400} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                  <a href={getWhatsAppLink()} className="text-gili-600 hover:underline">{getWhatsAppDisplay()}</a>
                </div>
              </div>
              <a href={getWhatsAppLink("Halo RH Tour, saya ingin bertanya")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-lg">
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
