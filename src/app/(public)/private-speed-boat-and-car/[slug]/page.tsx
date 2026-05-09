"use client";
import ServiceDetailTemplate from "@/components/public/ServiceDetailTemplate";
import { notFound, useParams } from "next/navigation";
import { useLang } from "@/components/LangProvider";

const SPEEDBOAT_CAR_DATA: Record<string, any> = {
  "speedboat-charter": {
    price: "US$ 35",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Private Speedboat Charter (Gili - Lombok)",
      description: "The fastest way to travel between the Gili Islands and mainland Lombok. Our private speedboat service avoids the long wait times of public boats. We operate 24/7 from Teluk Nare and Bangsal port.",
      highlights: ["15 Minutes Crossing", "24/7 Availability", "Safe & Comfortable", "Direct to your destination"],
      itinerary: [
        { time: "Pickup", title: "Any Gili Island", desc: "Our boat will pick you up at the nearest beach or harbor." },
        { time: "Crossing", title: "Speedboat Trip", desc: "Enjoy a smooth 15-minute ride across the turquoise waters." },
        { time: "Arrival", title: "Teluk Nare / Bangsal", desc: "Direct arrival at our private jetty with car pickup waiting." }
      ],
      includes: ["Private Speedboat Charter", "Life Jackets", "Professional Captain", "Port Fees"],
      excludes: ["Porter service on island", "Land transport (Book Combo for this)", "Tipping"]
    },
    id: {
      title: "Sewa Speedboat Privat (Gili - Lombok)",
      description: "Cara tercepat untuk bepergian antara Kepulauan Gili dan daratan Lombok. Layanan speedboat privat kami menghindari waktu tunggu lama kapal publik. Kami beroperasi 24/7 dari pelabuhan Teluk Nare dan Bangsal.",
      highlights: ["Penyeberangan 15 Menit", "Tersedia 24/7", "Aman & Nyaman", "Langsung ke tujuan Anda"],
      itinerary: [
        { time: "Jemput", title: "Pulau Gili Mana Pun", desc: "Kapal kami akan menjemput Anda di pantai atau pelabuhan terdekat." },
        { time: "Menyeberang", title: "Perjalanan Speedboat", desc: "Nikmati perjalanan 15 menit yang lancar melintasi perairan biru kehijauan." },
        { time: "Tiba", title: "Teluk Nare / Bangsal", desc: "Tiba langsung di dermaga pribadi kami dengan penjemputan mobil yang sudah menunggu." }
      ],
      includes: ["Sewa Speedboat Privat", "Jaket Pelampung", "Kapten Profesional", "Biaya Pelabuhan"],
      excludes: ["Layanan porter di pulau", "Transportasi darat (Pesan Combo untuk ini)", "Tip"]
    }
  },
  "combo-transfer": {
    price: "US$ 55",
    images: ["https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Combo: Speedboat + Car (Gili to Airport)",
      description: "The most seamless way to get from Gili Trawangan, Meno, or Air to Lombok International Airport. Includes a private speedboat to Teluk Nare and a private car directly to the airport.",
      highlights: ["Speedboat & Car Linked", "Instant Connection", "Stress-free Travel", "Door-to-Airport"],
      itinerary: [
        { time: "Start", title: "Gili Pickup", desc: "Private boat picks you up from the island." },
        { time: "Crossing", title: "Teluk Nare", desc: "15 minute crossing to the mainland." },
        { time: "Land", title: "Private Car", desc: "Driver meets you at the boat and takes you to the airport (1.5 - 2h)." }
      ],
      includes: ["Private Speedboat", "Private AC Car", "Driver", "Port Fees", "Petrol"],
      excludes: ["Porters", "Meals", "Tipping"]
    },
    id: {
      title: "Combo: Speedboat + Mobil (Gili ke Bandara)",
      description: "Cara paling mulus untuk berangkat dari Gili Trawangan, Meno, atau Air ke Bandara Internasional Lombok. Termasuk speedboat privat ke Teluk Nare dan mobil privat langsung ke bandara.",
      highlights: ["Speedboat & Mobil Terhubung", "Koneksi Instan", "Perjalanan Tanpa Stres", "Pintu ke Bandara"],
      itinerary: [
        { time: "Mulai", title: "Jemputan Gili", desc: "Kapal privat menjemput Anda dari pulau." },
        { time: "Menyeberang", title: "Teluk Nare", desc: "15 menit penyeberangan ke daratan." },
        { time: "Darat", title: "Mobil Privat", desc: "Sopir menemui Anda di kapal dan mengantar Anda ke bandara (1,5 - 2 jam)." }
      ],
      includes: ["Speedboat Privat", "Mobil Ber-AC Privat", "Sopir", "Biaya Pelabuhan", "Bensin"],
      excludes: ["Porter", "Makan", "Tip"]
    }
  },
  "car-transfer": {
    price: "US$ 25",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Private Car Transfer (Lombok Island)",
      description: "Private car transfer between any two points on mainland Lombok. Perfect for airport runs or getting from the port to your next hotel.",
      highlights: ["Airport Transfer", "Bangsal/Teluk Nare Port", "Senggigi Area", "Kuta Lombok"],
      itinerary: [
        { time: "Start", title: "Pickup", desc: "Meet your driver at the airport or your hotel lobby." },
        { time: "Trip", title: "Direct Drive", desc: "Comfortable AC car with professional driver." },
        { time: "End", title: "Dropoff", desc: "Safe arrival at your destination." }
      ],
      includes: ["Private AC Car", "Professional Driver", "Petrol / Fuel", "Luggage Space"],
      excludes: ["Parking fees", "Toll fees (if any)", "Tipping"]
    },
    id: {
      title: "Transfer Mobil Privat (Pulau Lombok)",
      description: "Transfer mobil privat antara dua titik mana pun di daratan Lombok. Sempurna untuk antar-jemput bandara atau dari pelabuhan ke hotel Anda berikutnya.",
      highlights: ["Antar Jemput Bandara", "Pelabuhan Bangsal/Teluk Nare", "Area Senggigi", "Kuta Lombok"],
      itinerary: [
        { time: "Mulai", title: "Jemput", desc: "Temui sopir Anda di bandara atau lobi hotel Anda." },
        { time: "Perjalanan", title: "Berkendara Langsung", desc: "Mobil ber-AC yang nyaman dengan sopir profesional." },
        { time: "Selesai", title: "Dropoff", desc: "Tiba dengan aman di tujuan Anda." }
      ],
      includes: ["Mobil Ber-AC Privat", "Sopir Profesional", "Bensin / BBM", "Ruang Bagasi"],
      excludes: ["Biaya parkir", "Biaya tol (jika ada)", "Tip"]
    }
  },
  "full-day-car": {
    price: "US$ 60",
    images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Full Day Car Service (10 Hours)",
      description: "Rent a private car and driver for a full 10 hours. Explore any part of Lombok with a flexible itinerary. Your driver knows all the best spots and can recommend places to eat.",
      highlights: ["Flexible Itinerary", "Local Expert Driver", "10 Hours Coverage", "Safe & Comfortable"],
      itinerary: [
        { time: "Start", title: "Morning Pickup", desc: "Start whenever you want." },
        { time: "Day", title: "Custom Route", desc: "Visit waterfalls, beaches, or markets as you wish." },
        { time: "End", title: "Evening Dropoff", desc: "Finish back at your hotel or the port." }
      ],
      includes: ["Private AC Car", "English Speaking Driver", "Petrol", "10 Hours Service"],
      excludes: ["Entrance fees", "Meals", "Parking/Tipping"]
    },
    id: {
      title: "Layanan Mobil Seharian (10 Jam)",
      description: "Sewa mobil privat dan sopir selama 10 jam penuh. Jelajahi bagian mana pun dari Lombok dengan rencana perjalanan yang fleksibel. Sopir Anda mengetahui semua spot terbaik dan dapat merekomendasikan tempat makan.",
      highlights: ["Rencana Perjalanan Fleksibel", "Sopir Ahli Lokal", "Cakupan 10 Jam", "Aman & Nyaman"],
      itinerary: [
        { time: "Mulai", title: "Jemputan Pagi", desc: "Mulai kapan pun Anda mau." },
        { time: "Siang", title: "Rute Kustom", desc: "Kunjungi air terjun, pantai, atau pasar sesuai keinginan Anda." },
        { time: "Selesai", title: "Dropoff Sore", desc: "Selesai kembali di hotel atau pelabuhan Anda." }
      ],
      includes: ["Mobil Ber-AC Privat", "Sopir Bisa Berbahasa Inggris", "Bensin", "Layanan 10 Jam"],
      excludes: ["Biaya masuk", "Makan", "Parkir/Tip"]
    }
  }
};

export default function SpeedboatCarDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLang();

  if (!slug || !SPEEDBOAT_CAR_DATA[slug]) {
    return notFound();
  }

  const data = SPEEDBOAT_CAR_DATA[slug];
  const localizedData = {
    ...data,
    ...(data[locale] || data.en)
  };

  return <ServiceDetailTemplate {...localizedData} />;
}
