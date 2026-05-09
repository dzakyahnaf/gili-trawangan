"use client";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Star, ShieldCheck, Zap, Clock, MessageCircle, MapPin } from "lucide-react";
import { useLang } from "@/components/LangProvider";

interface ServiceDetailProps {
  title: string;
  price: string;
  images: string[];
  description: string;
  highlights: string[];
  itinerary: { time?: string; title: string; desc?: string }[];
  includes: string[];
  excludes: string[];
}

export default function ServiceDetailTemplate({ title, price, images, description, highlights, itinerary, includes, excludes }: ServiceDetailProps) {
  const { t } = useLang();

  return (
    <main className="pt-16 lg:pt-20 bg-neutral-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-32 bg-[#32314F] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={images[0]} alt="Background" fill sizes="100vw" className="object-cover blur-sm" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-accent-400 font-bold">
            <Star className="w-5 h-5 fill-accent-400" />
            <Star className="w-5 h-5 fill-accent-400" />
            <Star className="w-5 h-5 fill-accent-400" />
            <Star className="w-5 h-5 fill-accent-400" />
            <Star className="w-5 h-5 fill-accent-400" />
            <span className="text-white/80 ml-2">(4.9/5 Rating)</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Slider / Gallery */}
            <div className="relative h-96 lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image src={images[0]} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw" className="object-cover" />
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">{t.serviceDetail.overview}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-accent-600" />
                  </div>
                  <span className="font-bold text-gray-800">{h}</span>
                </div>
              ))}
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">{t.serviceDetail.itinerary}</h2>
              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {itinerary.map((item, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-4 border-accent-400 flex items-center justify-center z-10">
                      <Clock className="w-4 h-4 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{item.time && <span className="text-accent-600 mr-2">{item.time}</span>}{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-[2rem] p-8 border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-6">{t.serviceDetail.priceIncludes}</h3>
                <ul className="space-y-3">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-green-700 font-medium">
                      <Check className="w-5 h-5 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-[2rem] p-8 border border-red-100">
                <h3 className="text-xl font-bold text-red-800 mb-6">{t.serviceDetail.priceExcludes}</h3>
                <ul className="space-y-3">
                  {excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-red-700 font-medium">
                      <X className="w-5 h-5 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2">{t.serviceDetail.priceStartsFrom}</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-black text-gili-600">{price}</span>
                <span className="text-gray-400 text-sm">{t.serviceDetail.perPerson}</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-600 bg-neutral-50 p-4 rounded-2xl">
                  <Zap className="w-5 h-5 text-accent-500" /> {t.serviceDetail.instantBooking}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-600 bg-neutral-50 p-4 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-accent-500" /> {t.serviceDetail.verifiedTour}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-600 bg-neutral-50 p-4 rounded-2xl">
                  <MapPin className="w-5 h-5 text-accent-500" /> {t.serviceDetail.topRatedSpot}
                </div>
              </div>

              <Link 
                href={`https://wa.me/6287793082501?text=Halo%20RH%20Tour%2C%20saya%20ingin%20tanya%20detail%20mengenai%20${title}`}
                className="block w-full py-5 rounded-[1.5rem] bg-accent-500 text-gili-900 font-black text-center shadow-lg hover:bg-accent-400 hover:scale-[1.02] transition-all"
              >
                {t.serviceDetail.bookNow}
              </Link>
              <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-tighter">{t.serviceDetail.whatsappResponse}</p>
            </div>

            <div className="bg-[#32314F] rounded-[2rem] p-8 text-white shadow-xl">
              <h4 className="font-bold mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-accent-400 fill-accent-400" /> {t.serviceDetail.whyUs}</h4>
              <p className="text-white/60 text-xs leading-relaxed mb-6">
                {t.serviceDetail.whyUsDesc}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-accent-400">
                  <ShieldCheck className="w-4 h-4" /> {t.serviceDetail.securePayment}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-accent-400">
                  <ShieldCheck className="w-4 h-4" /> {t.serviceDetail.noHiddenFees}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
