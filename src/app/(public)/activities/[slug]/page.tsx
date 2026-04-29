import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Check, X, Clock, Users, MapPin, Calendar } from "lucide-react";

export async function generateStaticParams() {
  const allActivities = await prisma.activity.findMany({ select: { slug: true } });
  return allActivities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const act = await prisma.activity.findUnique({ where: { slug } });
  if (!act) return { title: "Not Found" };
  return { title: act.name, description: act.description.slice(0, 160) };
}

export default async function ActivityDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const act = await prisma.activity.findUnique({ where: { slug } });
  if (!act) notFound();

  return (
    <div className="pt-20 pb-20">
      <div className="relative h-72 lg:h-96">
        <Image src={act.coverImage} alt={act.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-ocean-500 text-white text-xs font-semibold mb-3">{act.category}</span>
          <h1 className="text-3xl lg:text-5xl font-bold text-white">{act.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-gray-600"><Clock className="w-5 h-5 text-ocean-500" />{act.duration}</div>
            <div className="flex items-center gap-2 text-gray-600"><Users className="w-5 h-5 text-ocean-500" />Maks {act.maxPax} pax</div>
            <div className="flex items-center gap-2 text-gray-600"><MapPin className="w-5 h-5 text-ocean-500" />{act.meetingPoint}</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi</h2>
            <p className="text-gray-600 leading-relaxed">{act.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Jadwal</h2>
            <div className="flex flex-wrap gap-3">
              {act.schedule.map((s) => (
                <span key={s} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-ocean-50 text-ocean-700 font-medium">
                  <Calendar className="w-4 h-4" />{s}
                </span>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-bold text-green-800 mb-3">✅ Termasuk</h3>
              <ul className="space-y-2">
                {act.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-green-700"><Check className="w-4 h-4 mt-0.5 shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-6">
              <h3 className="font-bold text-red-800 mb-3">❌ Tidak Termasuk</h3>
              <ul className="space-y-2">
                {act.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-red-700"><X className="w-4 h-4 mt-0.5 shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
            <div>
              <p className="text-sm text-gray-400">Harga</p>
              <p className="text-3xl font-bold text-ocean-600">{formatRupiah(act.price)}</p>
              <p className="text-sm text-gray-400">/orang</p>
            </div>
            <Link href={`/booking?type=activity&id=${act.id}`} className="block text-center w-full py-4 rounded-xl bg-linear-to-r from-coral-500 to-coral-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
              Book Now
            </Link>
            <a href={`https://wa.me/6287793082501?text=Halo%20RH%20Tour%2C%20saya%20tertarik%20${encodeURIComponent(act.name)}`} className="block text-center w-full py-3 rounded-xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 transition-colors">
              💬 Tanya via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
