import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Check, X, MapPin, Clock, Users, ChevronDown } from "lucide-react";
import type { ItineraryDay } from "@/types";

export async function generateStaticParams() {
  const allPackages = await prisma.package.findMany({ select: { slug: true } });
  return allPackages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const pkg = await prisma.package.findUnique({ where: { slug } });
  if (!pkg) return { title: "Not Found" };
  return { title: pkg.title, description: pkg.description.slice(0, 160) };
}

export default async function PackageDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const pkg = await prisma.package.findUnique({ where: { slug } });
  if (!pkg) notFound();

  const itinerary = pkg.itinerary as unknown as ItineraryDay[];

  return (
    <div className="pt-20 pb-20">
      {/* Hero Image */}
      <div className="relative h-80 lg:h-[28rem]">
        <Image src={pkg.coverImage} alt={pkg.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-ocean-500 text-white text-xs font-semibold mb-3">{pkg.duration}</span>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">{pkg.title}</h1>
          {pkg.subtitle && <p className="text-ocean-200 text-lg">{pkg.subtitle}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 grid lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Quick Info */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-gray-600"><Clock className="w-5 h-5 text-ocean-500" />{pkg.duration}</div>
            <div className="flex items-center gap-2 text-gray-600"><Users className="w-5 h-5 text-ocean-500" />Maks {pkg.maxPax} pax</div>
            <div className="flex items-center gap-2 text-gray-600"><MapPin className="w-5 h-5 text-ocean-500" />Gili Trawangan</div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi</h2>
            <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
          </div>

          {/* Programs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Program</h2>
            <div className="flex flex-wrap gap-2">
              {pkg.programs.map((p) => (
                <span key={p} className="px-4 py-2 rounded-xl bg-ocean-50 text-ocean-700 text-sm font-medium">{p}</span>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h2>
            <div className="space-y-3">
              {itinerary.map((day) => (
                <details key={day.day} className="group bg-sand-50 rounded-2xl overflow-hidden" open={day.day === 1}>
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-gray-900">
                    <span>Hari {day.day}: {day.title}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="px-6 pb-4 space-y-2">
                    {day.activities.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-ocean-400 mt-1.5 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          {/* Include / Exclude */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-bold text-green-800 mb-3">✅ Termasuk</h3>
              <ul className="space-y-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-green-700">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-6">
              <h3 className="font-bold text-red-800 mb-3">❌ Tidak Termasuk</h3>
              <ul className="space-y-2">
                {pkg.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-red-700">
                    <X className="w-4 h-4 mt-0.5 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
            <div>
              <p className="text-sm text-gray-400">Harga mulai dari</p>
              <p className="text-3xl font-bold text-ocean-600">{formatRupiah(pkg.price)}</p>
              <p className="text-sm text-gray-400">/orang</p>
            </div>
            {pkg.priceChild && (
              <div className="text-sm text-gray-500">
                Anak-anak: <span className="font-semibold text-ocean-600">{formatRupiah(pkg.priceChild)}</span>/anak
              </div>
            )}
            <Link
              href={`/booking?type=package&id=${pkg.id}`}
              className="block text-center w-full py-4 rounded-xl bg-gradient-to-r from-coral-500 to-coral-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Book Now
            </Link>
            <a
              href={`https://wa.me/6287793082501?text=Halo%20RH%20Tour%2C%20saya%20tertarik%20paket%20${encodeURIComponent(pkg.title)}`}
              className="block text-center w-full py-3 rounded-xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 transition-colors"
            >
              💬 Tanya via WhatsApp
            </a>
            <div className="bg-sand-50 rounded-xl p-4 text-sm">
              <p className="font-semibold text-gray-900 mb-1">📍 Meeting Point</p>
              <p className="text-gray-500">Sama-Sama Reggae Bar, Gili Trawangan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
