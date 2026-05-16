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
      title: "Mount Rinjani Trekking 3 Days 2 Nights (Sembalun - Torean)",
      description: "A 3-day Rinjani trekking package starting from Sembalun and descending via the exotic Torean route (Jurassic Park route). Includes pickup, Lombok tour, and summit attack to 3,726 masl.",
      highlights: ["Rinjani Summit 3,726m", "Segara Anak Lake", "Natural Hot Springs", "Exotic Torean Route", "Lombok Tour"],
      itinerary: [
        { time: "Preparation", title: "Pickup & Lombok Tour", desc: "Pickup (max 2 PM). Tour to Sade Village, Mandalika, Tanjung Aan. Check-in at Sembalun accommodation & briefing." },
        { time: "Day 1", title: "Sembalun to Sembalun Crater Rim", desc: "Start trekking from Sembalun after breakfast. Pass through Pos 1, 2, 3, and camp at Sembalun Crater Rim." },
        { time: "Day 2", title: "Rinjani Summit & Segara Anak Lake", desc: "Wake up at 1 AM for summit attack. Return to crater rim for breakfast, then descend to Segara Anak Lake and natural hot springs." },
        { time: "Day 3", title: "Segara Anak Lake to Torean", desc: "Descend via Torean route (Jurassic Park route). Arrive at Torean village in the afternoon and transfer to your next destination." }
      ],
      includes: ["Trekking Guide & Porters", "Tents & Sleeping Gear", "Meals during trek", "Transport & Pickup", "Lombok Tour (Day 0)"],
      excludes: ["Flight tickets", "Personal trekking gear", "Guide & porter tips"]
    },
    id: {
      title: "Pendakian Rinjani 3 Hari 2 Malam (Rute Sembalun - Torean)",
      description: "Paket pendakian Rinjani 3 Hari 2 Malam melalui rute Sembalun dan turun melalui jalur Torean yang eksotis (Jalur Jurassic Park). Termasuk penjemputan, wisata Lombok (Sade, Mandalika), dan pendakian puncak 3.726 mdpl.",
      highlights: ["Puncak Rinjani 3.726 mdpl", "Danau Segara Anak", "Pemandian Air Panas Alami", "Jalur Eksotis Torean", "Wisata Lombok"],
      itinerary: [
        { time: "Persiapan", title: "Penjemputan & Wisata Lombok", desc: "Penjemputan (maks 14.00). Wisata ke Desa Adat Sade, Mandalika, Tanjung Aan. Check-in penginapan di Sembalun & briefing." },
        { time: "Hari 1", title: "Sembalun ke Pelawangan Sembalun", desc: "Mulai pendakian dari Sembalun setelah sarapan. Melewati Pos 1, 2, 3, dan berkemah di Pelawangan Sembalun." },
        { time: "Hari 2", title: "Puncak Rinjani & Danau Segara Anak", desc: "Bangun pukul 01.00 untuk summit attack. Turun ke Pelawangan untuk sarapan, lalu lanjut ke Danau Segara Anak dan pemandian air panas alami." },
        { time: "Hari 3", title: "Danau Segara Anak ke Torean", desc: "Turun melalui jalur Torean (Jalur Jurassic Park). Tiba di Dusun Torean sore hari dan transfer ke tujuan selanjutnya." }
      ],
      includes: ["Pemandu & Porter", "Tenda & Alat Tidur", "Makan selama pendakian", "Transportasi & Penjemputan", "Wisata Lombok (Day 0)"],
      excludes: ["Tiket pesawat", "Alat pendakian pribadi", "Tip guide & porter"]
    }
  },
  "4d3n-summit": {
    price: "US$ 235",
    images: ["https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Mount Rinjani Trekking 4 Days 3 Nights (Sembalun - Torean)",
      description: "A more relaxed 4-day Rinjani trekking package via Sembalun and Torean routes. Includes pickup, Lombok tour, Rinjani summit, Segara Anak lake, and an extra night of camping at Birisan Nangka.",
      highlights: ["Rinjani Summit 3,726m", "Segara Anak Lake", "Natural Hot Springs", "Birisan Nangka Camp", "Lombok Tour"],
      itinerary: [
        { time: "Preparation", title: "Pickup & Lombok Tour", desc: "Pickup (max 2 PM). Tour to Sade Village, Mandalika, Tanjung Aan. Check-in at Sembalun accommodation & briefing." },
        { time: "Day 1", title: "Sembalun to Sembalun Crater Rim", desc: "Start trekking from Sembalun after breakfast. Pass through Pos 1, 2, 3, and camp at Sembalun Crater Rim." },
        { time: "Day 2", title: "Rinjani Summit & Segara Anak Lake", desc: "Wake up at 1 AM for summit attack. Return to crater rim for breakfast, then descend to Segara Anak Lake and natural hot springs." },
        { time: "Day 3", title: "Segara Anak Lake to Birisan Nangka", desc: "Prepare to hike to Birisan Nangka camp. Enjoy the scenic Torean route and camp for the night." },
        { time: "Day 4", title: "Birisan Nangka to Torean Basecamp", desc: "Descend to Torean Basecamp and finish the trekking program." }
      ],
      includes: ["Trekking Guide & Porters", "Tents & Sleeping Gear", "Meals during trek", "Transport & Pickup", "Lombok Tour (Day 0)"],
      excludes: ["Flight tickets", "Personal trekking gear", "Guide & porter tips"]
    },
    id: {
      title: "Pendakian Rinjani 4 Hari 3 Malam (Rute Sembalun - Torean)",
      description: "Paket pendakian Rinjani 4 Hari 3 Malam yang lebih santai melalui rute Sembalun dan Torean. Termasuk penjemputan, wisata Lombok, puncak Rinjani, Segara Anak, dan ekstra camping di Birisan Nangka.",
      highlights: ["Puncak Rinjani 3.726 mdpl", "Danau Segara Anak", "Pemandian Air Panas Alami", "Camping Birisan Nangka", "Wisata Lombok"],
      itinerary: [
        { time: "Persiapan", title: "Penjemputan & Wisata Lombok", desc: "Penjemputan (maks 14.00). Wisata ke Desa Adat Sade, Mandalika, Tanjung Aan. Check-in penginapan di Sembalun & briefing." },
        { time: "Hari 1", title: "Sembalun ke Pelawangan Sembalun", desc: "Mulai pendakian dari Sembalun setelah sarapan. Melewati Pos 1, 2, 3, dan berkemah di Pelawangan Sembalun." },
        { time: "Hari 2", title: "Puncak Rinjani & Danau Segara Anak", desc: "Bangun pukul 01.00 untuk summit attack. Turun ke Pelawangan untuk sarapan, lalu lanjut ke Danau Segara Anak dan pemandian air panas alami." },
        { time: "Hari 3", title: "Danau Segara Anak ke Birisan Nangka", desc: "Persiapan menuju area camp Birisan Nangka. Menikmati panorama jalur Torean hingga tiba di camp untuk bermalam." },
        { time: "Hari 4", title: "Birisan Nangka ke Basecamp Torean", desc: "Turun menuju Basecamp Torean dan program selesai." }
      ],
      includes: ["Pemandu & Porter", "Tenda & Alat Tidur", "Makan selama pendakian", "Transportasi & Penjemputan", "Wisata Lombok (Day 0)"],
      excludes: ["Tiket pesawat", "Alat pendakian pribadi", "Tip guide & porter"]
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
