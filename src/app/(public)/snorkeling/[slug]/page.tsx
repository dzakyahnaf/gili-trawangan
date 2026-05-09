"use client";
import ServiceDetailTemplate from "@/components/public/ServiceDetailTemplate";
import { notFound, useParams } from "next/navigation";
import { useLang } from "@/components/LangProvider";

const SNORKELING_DATA: Record<string, any> = {
  "shared-snorkeling-3-spots": {
    price: "US$ 12",
    images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Shared Snorkeling With The Group, During 4 Hours",
      description: "Join our popular public snorkeling trip. We visit three main spots around the Gili Islands: the statues at Meno, the turtles at Trawangan, and the blue coral at Gili Air.",
      highlights: ["Meno Wall Statues", "Turtle Point", "Gili Air Fish Garden"],
      itinerary: [
        { time: "09:00 / 13:00", title: "Meeting", desc: "Meet at harbor office for gear fitting." },
        { time: "+30m", title: "Departure", desc: "Boat departs with the group." },
        { time: "1h", title: "Gili Meno", desc: "Snorkeling at the statues." },
        { time: "2h", title: "Turtle Point", desc: "Swimming with turtles." },
        { time: "3h", title: "Gili Air", desc: "Lunch break and final snorkeling spot." }
      ],
      includes: ["Snorkeling Gear", "Life Jacket", "Boat Captain", "Shared Boat"],
      excludes: ["Lunch", "Gopro Photo", "Towels"]
    },
    id: {
      title: "Snorkeling Sharing Dengan Grup, Selama 4 Jam",
      description: "Bergabunglah dengan perjalanan snorkeling publik kami yang populer. Kami mengunjungi tiga tempat utama di sekitar Kepulauan Gili: patung-patung di Meno, penyu di Trawangan, dan karang biru di Gili Air.",
      highlights: ["Patung Bawah Laut Meno", "Turtle Point", "Taman Ikan Gili Air"],
      itinerary: [
        { time: "09:00 / 13:00", title: "Pertemuan", desc: "Bertemu di kantor pelabuhan untuk pengepasan alat." },
        { time: "+30m", title: "Keberangkatan", desc: "Kapal berangkat bersama grup." },
        { time: "1j", title: "Gili Meno", desc: "Snorkeling di area patung." },
        { time: "2j", title: "Turtle Point", desc: "Berenang bersama penyu." },
        { time: "3j", title: "Gili Air", desc: "Istirahat makan siang dan lokasi snorkeling terakhir." }
      ],
      includes: ["Alat Snorkeling", "Jaket Pelampung", "Kapten Kapal", "Kapal Sharing"],
      excludes: ["Makan Siang", "Foto Gopro", "Handuk"]
    }
  },
  "shared-snorkeling-sunset": {
    price: "US$ 13",
    images: ["https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "SHARED SNORKELING AND SUNSET TRIP",
      description: "The best way to end the day. Snorkel in the afternoon and enjoy a beautiful sunset from the boat between the Gili Islands.",
      highlights: ["Sunset from Boat", "Turtle Point", "Meno Statues"],
      itinerary: [
        { time: "15:00", title: "Meeting", desc: "Gather at the harbor." },
        { time: "15:30", title: "Snorkeling", desc: "Visit two main spots while the light is soft." },
        { time: "17:30", title: "Sunset Watch", desc: "Relax on the boat as the sun dips below the horizon." }
      ],
      includes: ["Snorkeling Gear", "Life Jacket", "Boat & Captain", "Shared Group"],
      excludes: ["Drinks", "Dinner", "Personal Photos"]
    },
    id: {
      title: "SNORKELING SHARING DAN TUR SUNSET",
      description: "Cara terbaik untuk mengakhiri hari. Snorkeling di sore hari dan nikmati matahari terbenam yang indah dari kapal di antara Kepulauan Gili.",
      highlights: ["Matahari Terbenam dari Kapal", "Turtle Point", "Patung Meno"],
      itinerary: [
        { time: "15:00", title: "Pertemuan", desc: "Berkumpul di pelabuhan." },
        { time: "15:30", title: "Snorkeling", desc: "Mengunjungi dua spot utama saat cahaya mulai lembut." },
        { time: "17:30", title: "Melihat Sunset", desc: "Bersantai di kapal saat matahari mulai terbenam." }
      ],
      includes: ["Alat Snorkeling", "Jaket Pelampung", "Kapal & Kapten", "Grup Sharing"],
      excludes: ["Minuman", "Makan Malam", "Foto Pribadi"]
    }
  },
  "private-snorkeling-2-hours": {
    price: "US$ 35",
    images: ["https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Private Snorkeling For 2 Hours With 3 Spots",
      description: "A quick but exclusive snorkeling trip. Perfect for those with limited time who still want a private boat experience visiting the top 3 spots.",
      highlights: ["Meno Statues", "Turtle Point", "Gili Air Garden"],
      itinerary: [
        { time: "Start", title: "Flexible Timing", desc: "Choose your own departure time." },
        { time: "30m", title: "Spot 1", desc: "Statues at Gili Meno." },
        { time: "1h", title: "Spot 2", desc: "Turtles at Gili Trawangan." },
        { time: "1h 30m", title: "Spot 3", desc: "Fish feeding at Gili Air." }
      ],
      includes: ["Private Boat", "Captain", "Gear", "Life Jackets", "Mineral Water"],
      excludes: ["Lunch", "Photos", "Pickups"]
    },
    id: {
      title: "Snorkeling Privat Selama 2 Jam Dengan 3 Spot",
      description: "Perjalanan snorkeling yang singkat namun eksklusif. Sempurna bagi mereka yang memiliki waktu terbatas namun tetap ingin merasakan pengalaman kapal privat mengunjungi 3 spot terbaik.",
      highlights: ["Patung Meno", "Turtle Point", "Taman Gili Air"],
      itinerary: [
        { time: "Mulai", title: "Waktu Fleksibel", desc: "Pilih waktu keberangkatan Anda sendiri." },
        { time: "30m", title: "Spot 1", desc: "Patung di Gili Meno." },
        { time: "1j", title: "Spot 2", desc: "Penyu di Gili Trawangan." },
        { time: "1j 30m", title: "Spot 3", desc: "Pemberian makan ikan di Gili Air." }
      ],
      includes: ["Kapal Privat", "Kapten", "Alat", "Jaket Pelampung", "Air Mineral"],
      excludes: ["Makan Siang", "Foto", "Penjemputan"]
    }
  },
  "private-snorkeling-sunset": {
    price: "US$ 40",
    images: ["https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "PRIVATE SNORKELING AND SUNSET TRIP",
      description: "Enjoy a private snorkeling session followed by a breathtaking sunset view from your private boat. This romantic and exclusive trip is perfect for couples and small groups.",
      highlights: ["Private Boat", "3 Snorkeling Spots", "Sunset on the boat", "Turtle Point"],
      itinerary: [
        { time: "16:00", title: "Departure", desc: "Start your private journey from the beach." },
        { time: "16:30", title: "Snorkeling", desc: "Visit top spots including the underwater statues and turtle point." },
        { time: "17:30", title: "Sunset Watch", desc: "Relax on the boat as the sky turns golden." },
        { time: "18:15", title: "Return", desc: "Head back to the shore after a magical experience." }
      ],
      includes: ["Private Boat", "Captain", "Full Gear", "Life Jackets", "Mineral Water"],
      excludes: ["Lunch/Dinner", "GoPro Photos", "Personal Expenses"]
    },
    id: {
      title: "SNORKELING PRIVAT DAN TUR SUNSET",
      description: "Nikmati sesi snorkeling privat diikuti oleh pemandangan matahari terbenam yang memukau dari kapal privat Anda. Perjalanan romantis dan eksklusif ini sangat cocok untuk pasangan dan grup kecil.",
      highlights: ["Kapal Privat", "3 Spot Snorkeling", "Sunset di kapal", "Turtle Point"],
      itinerary: [
        { time: "16:00", title: "Keberangkatan", desc: "Mulai perjalanan privat Anda dari pantai." },
        { time: "16:30", title: "Snorkeling", desc: "Kunjungi spot terbaik termasuk patung bawah laut dan turtle point." },
        { time: "17:30", title: "Melihat Sunset", desc: "Bersantai di kapal saat langit berubah menjadi keemasan." },
        { time: "18:15", title: "Kembali", desc: "Kembali ke pantai setelah pengalaman yang ajaib." }
      ],
      includes: ["Kapal Privat", "Kapten", "Alat Lengkap", "Jaket Pelampung", "Air Mineral"],
      excludes: ["Makan Siang/Malam", "Foto GoPro", "Biaya Pribadi"]
    }
  },
  "private-snorkeling-4-hours": {
    price: "US$ 50",
    images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Private Snorkeling For 4 Hours With 4 Snorkeling Spots",
      description: "Enjoy a private glass-bottom boat tour around the three Gili Islands. This 4-hour trip gives you plenty of time to explore the best underwater spots without the crowds. Perfect for families or romantic couples.",
      highlights: ["Underwater Statues (Meno)", "Turtle Point (Trawangan)", "Blue Coral (Air)", "Garden Fish (Air)"],
      itinerary: [
        { time: "Start", title: "Meeting Point", desc: "Meet your captain at our office near the harbor." },
        { time: "Stop 1", title: "Gili Meno Statues", desc: "Visit the world-famous underwater statues by Jason deCaires Taylor." },
        { time: "Stop 2", title: "Turtle Point", desc: "Swim with gentle green sea turtles in their natural habitat." },
        { time: "Stop 3", title: "Gili Air Snorkeling", desc: "Explore the vibrant blue corals and feed thousands of colorful fish." }
      ],
      includes: ["Private Glass Bottom Boat", "Snorkeling Equipment", "Life Jackets", "Professional Captain", "Mineral Water"],
      excludes: ["Lunch on the island", "Gopro Photos (Optional)", "Hotel Pickup"]
    },
    id: {
      title: "Snorkeling Privat Selama 4 Jam Dengan 4 Spot Snorkeling",
      description: "Nikmati tur kapal kaca privat di sekitar tiga Kepulauan Gili. Perjalanan 4 jam ini memberi Anda banyak waktu untuk menjelajahi spot bawah laut terbaik tanpa keramaian. Sempurna untuk keluarga atau pasangan romantis.",
      highlights: ["Patung Bawah Laut (Meno)", "Turtle Point (Trawangan)", "Karang Biru (Air)", "Ikan Taman (Air)"],
      itinerary: [
        { time: "Mulai", title: "Titik Kumpul", desc: "Temui kapten Anda di kantor kami dekat pelabuhan." },
        { time: "Stop 1", title: "Patung Gili Meno", desc: "Kunjungi patung bawah laut yang terkenal di dunia oleh Jason deCaires Taylor." },
        { time: "Stop 2", title: "Turtle Point", desc: "Berenang bersama penyu hijau yang lembut di habitat aslinya." },
        { time: "Stop 3", title: "Snorkeling Gili Air", desc: "Jelajahi karang biru yang semarak dan beri makan ribuan ikan warna-warni." }
      ],
      includes: ["Kapal Kaca Privat", "Peralatan Snorkeling", "Jaket Pelampung", "Kapten Profesional", "Air Mineral"],
      excludes: ["Makan siang di pulau", "Foto Gopro (Opsional)", "Jemputan Hotel"]
    }
  },
  "private-snorkeling-8-hours": {
    price: "US$ 85",
    images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Private Snorkellng During 8 Hours",
      description: "The ultimate snorkeling day. 8 full hours with your own private boat. Explore hidden reefs, stop at any of the islands for lunch, and enjoy the sunset from the water.",
      highlights: ["All 3 Gili Islands", "Hidden Reef Spots", "Island Hopping", "Full Day Freedom"],
      itinerary: [
        { time: "09:00", title: "Departure", desc: "Start whenever you are ready." },
        { time: "AM", title: "Morning Exploration", desc: "Visit all main snorkeling spots before they get crowded." },
        { time: "13:00", title: "Island Lunch", desc: "Stop at Gili Meno or Gili Air for a relaxed beach lunch." },
        { time: "PM", title: "Afternoon Snorkel", desc: "Discover secret reefs known only to our captains." },
        { time: "17:00", title: "Return", desc: "Back to your island just before sunset." }
      ],
      includes: ["Private Boat", "Captain", "All Gear", "Life Jackets", "Cooler with Water"],
      excludes: ["Lunch costs", "Beer/Soda", "Entry fees to Meno Turtle Sanctuary"]
    },
    id: {
      title: "Snorkeling Privat Selama 8 Jam",
      description: "Hari snorkeling terbaik. 8 jam penuh dengan kapal privat Anda sendiri. Jelajahi terumbu karang tersembunyi, berhenti di pulau mana pun untuk makan siang, dan nikmati matahari terbenam dari air.",
      highlights: ["Semua 3 Kepulauan Gili", "Spot Karang Tersembunyi", "Island Hopping", "Kebebasan Penuh Seharian"],
      itinerary: [
        { time: "09:00", title: "Keberangkatan", desc: "Mulai kapan pun Anda siap." },
        { time: "Pagi", title: "Eksplorasi Pagi", desc: "Kunjungi semua spot snorkeling utama sebelum ramai." },
        { time: "13:00", title: "Makan Siang di Pulau", desc: "Berhenti di Gili Meno atau Gili Air untuk makan siang santai di pantai." },
        { time: "Siang/Sore", title: "Snorkeling Sore", desc: "Temukan terumbu karang rahasia yang hanya diketahui oleh kapten kami." },
        { time: "17:00", title: "Kembali", desc: "Kembali ke pulau Anda sesaat sebelum matahari terbenam." }
      ],
      includes: ["Kapal Privat", "Kapten", "Semua Alat", "Jaket Pelampung", "Pendingin dengan Air"],
      excludes: ["Biaya makan siang", "Bir/Soda", "Biaya masuk ke Konservasi Penyu Meno"]
    }
  }
};

export default function SnorkelingDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLang();

  if (!slug || !SNORKELING_DATA[slug]) {
    return notFound();
  }

  const data = SNORKELING_DATA[slug];
  const localizedData = {
    ...data,
    ...(data[locale] || data.en)
  };

  return <ServiceDetailTemplate {...localizedData} />;
}
