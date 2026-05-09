"use client";
import ServiceDetailTemplate from "@/components/public/ServiceDetailTemplate";
import { notFound, useParams } from "next/navigation";
import { useLang } from "@/components/LangProvider";

const RINJANI_DATA: Record<string, any> = {
  "2d1n-summit": {
    price: "US$ 150",
    images: ["https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Trekking Summit Rinjani 2 Days 1 Night",
      description: "Conquer the summit of Mount Rinjani in just 2 days. This package is designed for experienced trekkers who want to reach the peak (3726m) quickly. Enjoy the most breathtaking sunrise in Indonesia.",
      highlights: ["Rinjani Summit 3726m", "Sembalun Crater Rim", "Panoramic Sunrise View", "Professional Support"],
      itinerary: [
        { time: "Day 1", title: "Sembalun to Crater Rim", desc: "Start from Sembalun village. Hike through savannahs and forests to reach the crater rim (2639m)." },
        { time: "Day 2", title: "Summit Attack & Descent", desc: "Wake up at 2 AM for the summit climb. Watch the sunrise from the peak, then descent back to Sembalun." }
      ],
      includes: ["Trekking Guide & Porters", "Tents & Camping Gear", "Meals during trek", "Rinjani Entrance Fee", "Transport to Sembalun"],
      excludes: ["Tipping for guide", "Personal trekking gear", "Warm jacket/gloves"]
    },
    id: {
      title: "Trekking Puncak Rinjani 2 Hari 1 Malam",
      description: "Taklukkan puncak Gunung Rinjani hanya dalam 2 hari. Paket ini dirancang untuk pendaki berpengalaman yang ingin mencapai puncak (3726m) dengan cepat. Nikmati matahari terbenam yang paling menakjubkan di Indonesia.",
      highlights: ["Puncak Rinjani 3726m", "Pelawangan Sembalun", "Pemandangan Sunrise Panoramik", "Dukungan Profesional"],
      itinerary: [
        { time: "Hari 1", title: "Sembalun ke Pelawangan", desc: "Mulai dari desa Sembalun. Mendaki melalui sabana dan hutan untuk mencapai pelawangan (2639m)." },
        { time: "Hari 2", title: "Mendaki Puncak & Turun", desc: "Bangun jam 2 pagi untuk pendakian puncak. Lihat matahari terbit dari puncak, lalu turun kembali ke Sembalun." }
      ],
      includes: ["Pemandu & Porter Trekking", "Tenda & Peralatan Berkemah", "Makan selama pendakian", "Biaya Masuk Rinjani", "Transportasi ke Sembalun"],
      excludes: ["Tip untuk pemandu", "Alat pendakian pribadi", "Jaket hangat/sarung tangan"]
    }
  },
  "3d2n-summit": {
    price: "US$ 185",
    images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Trekking Summit Rinjani 3 Days 2 Night",
      description: "The complete Rinjani experience. This 3-day trek includes the summit attack, a descent to the Segara Anak crater lake, a soak in the hot springs, and a second camp at Senaru crater rim.",
      highlights: ["Summit 3726m", "Segara Anak Lake", "Hot Springs", "Senaru Crater Rim"],
      itinerary: [
        { time: "Day 1", title: "Sembalun to Crater Rim", desc: "Start the trek and camp at Sembalun Rim." },
        { time: "Day 2", title: "Summit & Lake", desc: "Sunrise at summit, descent to the lake and hot springs. Climb to Senaru Rim." },
        { time: "Day 3", title: "Senaru Rim to Finish", desc: "Sunrise at Senaru Rim, long descent to Senaru village." }
      ],
      includes: ["Guide & Porters", "Tents & Sleeping Gear", "All Meals (B,L,D)", "Park Fees", "Transfers"],
      excludes: ["Personal gear", "Tips", "Flashlight"]
    },
    id: {
      title: "Trekking Puncak Rinjani 3 Hari 2 Malam",
      description: "Pengalaman Rinjani yang lengkap. Pendakian 3 hari ini mencakup pendakian puncak, turun ke danau Segara Anak, berendam di pemandian air panas, dan berkemah kedua di Pelawangan Senaru.",
      highlights: ["Puncak 3726m", "Danau Segara Anak", "Pemandian Air Panas", "Pelawangan Senaru"],
      itinerary: [
        { time: "Hari 1", title: "Sembalun ke Pelawangan", desc: "Mulai pendakian dan berkemah di Pelawangan Sembalun." },
        { time: "Hari 2", title: "Puncak & Danau", desc: "Sunrise di puncak, turun ke danau dan air panas. Mendaki ke Pelawangan Senaru." },
        { time: "Hari 3", title: "Pelawangan Senaru ke Finish", desc: "Sunrise di Pelawangan Senaru, turun panjang ke desa Senaru." }
      ],
      includes: ["Pemandu & Porter", "Tenda & Alat Tidur", "Semua Makan (Pagi, Siang, Malam)", "Biaya Taman Nasional", "Transfer"],
      excludes: ["Alat pribadi", "Tip", "Senter"]
    }
  }
};

export default function RinjaniDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLang();

  if (!slug || !RINJANI_DATA[slug]) {
    return notFound();
  }

  const data = RINJANI_DATA[slug];
  const localizedData = {
    ...data,
    ...(data[locale] || data.en)
  };

  return <ServiceDetailTemplate {...localizedData} />;
}
