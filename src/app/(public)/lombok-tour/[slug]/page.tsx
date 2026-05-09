"use client";
import ServiceDetailTemplate from "@/components/public/ServiceDetailTemplate";
import { notFound, useParams } from "next/navigation";
import { useLang } from "@/components/LangProvider";

const LOMBOK_TOUR_DATA: Record<string, any> = {
  "city-tour": {
    price: "US$ 85",
    images: ["https://images.unsplash.com/photo-1533142262417-ad51619053dc?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "City Tour",
      description: "Explore the cultural and historical heart of Lombok. This tour takes you through traditional markets, historic temples, and the vibrant city life of Mataram.",
      highlights: ["Mayura Water Palace", "Lingsar Temple", "Mataram Islamic Center", "Bertais Traditional Market"],
      itinerary: [
        { time: "09:00", title: "Hotel Pickup", desc: "Start your day with a comfortable private pickup." },
        { time: "10:30", title: "Mayura & Lingsar", desc: "Visit the historic water palace and the unique temple shared by two religions." },
        { time: "12:30", title: "Lunch", desc: "Enjoy local Lombok cuisine in the city." },
        { time: "14:30", title: "Mataram Islamic Center", desc: "Witness the magnificent architecture of the grand mosque." },
        { time: "16:30", title: "Shopping", desc: "Visit traditional markets for pearls and local souvenirs." }
      ],
      includes: ["Private Car with AC", "English Speaking Driver", "Entrance Fees", "Mineral Water", "Parking Fees"],
      excludes: ["Lunch", "Personal Shopping", "Tips for Guide"]
    },
    id: {
      title: "Tur Kota",
      description: "Jelajahi pusat budaya dan sejarah Lombok. Tur ini membawa Anda melalui pasar tradisional, kuil bersejarah, dan kehidupan kota Mataram yang semarak.",
      highlights: ["Istana Air Mayura", "Pura Lingsar", "Islamic Center Mataram", "Pasar Tradisional Bertais"],
      itinerary: [
        { time: "09:00", title: "Jemputan Hotel", desc: "Mulai hari Anda dengan jemputan privat yang nyaman." },
        { time: "10:30", title: "Mayura & Lingsar", desc: "Kunjungi istana air bersejarah dan pura unik yang digunakan oleh dua agama." },
        { time: "12:30", title: "Makan Siang", desc: "Nikmati masakan lokal Lombok di kota." },
        { time: "14:30", title: "Islamic Center Mataram", desc: "Saksikan arsitektur megah dari masjid agung." },
        { time: "16:30", title: "Belanja", desc: "Kunjungi pasar tradisional untuk mutiara dan souvenir lokal." }
      ],
      includes: ["Mobil Privat Ber-AC", "Sopir Berbahasa Inggris", "Biaya Masuk", "Air Mineral", "Biaya Parkir"],
      excludes: ["Makan Siang", "Belanja Pribadi", "Tip untuk Pemandu"]
    }
  },
  "kuta-lombok-tour": {
    price: "US$ 85",
    images: ["https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Kuta Lombok Tour",
      description: "Discover the southern coast of Lombok. Visit the traditional Sade village, then head to the world-class beaches of Kuta, Tanjung Aan, and Bukit Merese for spectacular views.",
      highlights: ["Sade/Ende Traditional Village", "Kuta Beach", "Tanjung Aan Beach", "Merese Hill Sunset"],
      itinerary: [
        { time: "09:00", title: "Pickup", desc: "Start the journey to South Lombok." },
        { time: "10:30", title: "Sade Village", desc: "Learn about Sasak culture and weaving." },
        { time: "12:00", title: "Kuta Beach", desc: "Explore the center of the south." },
        { time: "14:00", title: "Tanjung Aan", desc: "Relax on the pepper sand beach." },
        { time: "16:30", title: "Merese Hill", desc: "Short trek for sunset views." }
      ],
      includes: ["Private AC Car", "Driver", "Petrol", "Entrance Fees", "Mineral Water"],
      excludes: ["Lunch", "Village donations", "Tipping"]
    },
    id: {
      title: "Tur Kuta Lombok",
      description: "Temukan pesisir selatan Lombok. Kunjungi desa tradisional Sade, lalu menuju ke pantai kelas dunia Kuta, Tanjung Aan, dan Bukit Merese untuk pemandangan yang spektakuler.",
      highlights: ["Desa Tradisional Sade/Ende", "Pantai Kuta", "Pantai Tanjung Aan", "Sunset Bukit Merese"],
      itinerary: [
        { time: "09:00", title: "Jemputan", desc: "Mulai perjalanan ke Lombok Selatan." },
        { time: "10:30", title: "Desa Sade", desc: "Pelajari tentang budaya Sasak dan menenun." },
        { time: "12:00", title: "Pantai Kuta", desc: "Jelajahi pusat wilayah selatan." },
        { time: "14:00", title: "Tanjung Aan", desc: "Bersantai di pantai berpasir merica." },
        { time: "16:30", title: "Bukit Merese", desc: "Pendakian singkat untuk pemandangan matahari terbenam." }
      ],
      includes: ["Mobil Ber-AC Privat", "Sopir", "Bensin", "Biaya Masuk", "Air Mineral"],
      excludes: ["Makan Siang", "Donasi Desa", "Tip"]
    }
  },
  "pink-beach-tour": {
    price: "US$ 95",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Pink Beach Tour",
      description: "Visit the famous Pink Beach in East Lombok. The sand gets its pink hue from fragments of red coral. This tour includes boat hopping to Sand Island and Gili Petelu for snorkeling.",
      highlights: ["Pink Beach (Pantai Tangsi)", "Sand Island (Pulau Pasir)", "Gili Petelu Snorkeling", "Ancient Trees (Pohon Purba)"],
      itinerary: [
        { time: "08:00", title: "Early Pickup", desc: "Long drive to East Lombok harbor." },
        { time: "10:30", title: "Boat Crossing", desc: "Private boat to the pink beach area." },
        { time: "11:00", title: "Snorkeling Gili Petelu", desc: "Great visibility and corals." },
        { time: "13:00", title: "Pink Beach Relax", desc: "Lunch and beach time." },
        { time: "15:00", title: "Sand Island", desc: "Stop at the disappearing island." }
      ],
      includes: ["Private Car", "Private Boat", "Snorkeling Gear", "Lunch Box", "Entrance Fees"],
      excludes: ["Tipping", "Alcoholic drinks"]
    },
    id: {
      title: "Tur Pink Beach",
      description: "Kunjungi Pink Beach yang terkenal di Lombok Timur. Pasirnya mendapatkan rona merah muda dari fragmen karang merah. Tur ini mencakup island hopping dengan kapal ke Pulau Pasir dan Gili Petelu untuk snorkeling.",
      highlights: ["Pink Beach (Pantai Tangsi)", "Pulau Pasir", "Snorkeling Gili Petelu", "Pohon Purba"],
      itinerary: [
        { time: "08:00", title: "Jemputan Pagi", desc: "Perjalanan panjang ke pelabuhan Lombok Timur." },
        { time: "10:30", title: "Menyeberang Kapal", desc: "Kapal privat ke area pink beach." },
        { time: "11:00", title: "Snorkeling Gili Petelu", desc: "Visibilitas dan terumbu karang yang bagus." },
        { time: "13:00", title: "Santai di Pink Beach", desc: "Makan siang dan waktu pantai." },
        { time: "15:00", title: "Pulau Pasir", desc: "Berhenti di pulau yang menghilang." }
      ],
      includes: ["Mobil Privat", "Kapal Privat", "Alat Snorkeling", "Kotak Makan Siang", "Biaya Masuk"],
      excludes: ["Tip", "Minuman Beralkohol"]
    }
  },
  "waterfall-benang-kelambu-tour": {
    price: "US$ 85",
    images: ["https://images.unsplash.com/photo-1548318281-7da3f84ced16?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Waterfall (Benang Kelambu) Tour",
      description: "Benang Kelambu waterfall is located in Central Lombok. The water flows through thick plants, creating a curtain-like effect (Kelambu). This tour also includes a visit to the nearby Benang Stokel waterfall.",
      highlights: ["Benang Kelambu (Curtain) Waterfall", "Benang Stokel Waterfall", "Lush Rice Terraces", "Local Fruit Market"],
      itinerary: [
        { time: "09:00", title: "Hotel Pickup", desc: "Our driver picks you up for the journey to Central Lombok." },
        { time: "11:00", title: "Arrive at Geopark", desc: "Briefing and start of the walk to the falls." },
        { time: "12:00", title: "Benang Stokel", desc: "Visit the twin falls first." },
        { time: "13:00", title: "Benang Kelambu", desc: "Enjoy the curtain waterfall and take photos." },
        { time: "15:00", title: "Rice Terrace Walk", desc: "Explore the surrounding agriculture." }
      ],
      includes: ["Private AC Car", "Driver/Guide", "Entrance Fees", "Mineral Water"],
      excludes: ["Lunch", "Tipping", "Personal Items"]
    },
    id: {
      title: "Tur Air Terjun (Benang Kelambu)",
      description: "Air terjun Benang Kelambu terletak di Lombok Tengah. Airnya mengalir melalui tanaman lebat, menciptakan efek seperti kelambu. Tur ini juga mencakup kunjungan ke air terjun Benang Stokel di dekatnya.",
      highlights: ["Air Terjun Benang Kelambu", "Air Terjun Benang Stokel", "Terasering Padi yang Subur", "Pasar Buah Lokal"],
      itinerary: [
        { time: "09:00", title: "Jemputan Hotel", desc: "Sopir kami menjemput Anda untuk perjalanan ke Lombok Tengah." },
        { time: "11:00", title: "Tiba di Geopark", desc: "Briefing dan mulai berjalan kaki ke air terjun." },
        { time: "12:00", title: "Benang Stokel", desc: "Kunjungi air terjun kembar terlebih dahulu." },
        { time: "13:00", title: "Benang Kelambu", desc: "Nikmati air terjun kelambu dan berfoto." },
        { time: "15:00", title: "Jalan di Sawah", desc: "Jelajahi pertanian di sekitarnya." }
      ],
      includes: ["Mobil Ber-AC Privat", "Sopir/Pemandu", "Biaya Masuk", "Air Mineral"],
      excludes: ["Makan Siang", "Tip", "Barang Pribadi"]
    }
  },
  "waterfall-senaru-tour": {
    price: "US$ 85",
    images: ["https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1000"],
    en: {
      title: "Waterfall (Senaru) Tour",
      description: "Explore the most famous waterfalls in Lombok. This tour takes you to the foot of Mount Rinjani to witness the majestic Sendang Gile and Tiu Kelep waterfalls. Enjoy the lush tropical jungle and refreshing mountain air.",
      highlights: ["Sendang Gile Waterfall", "Tiu Kelep Waterfall", "Malimbu Sunset Point", "Monkey Forest Pusuk"],
      itinerary: [
        { time: "09:00", title: "Pickup from Hotel", desc: "Our driver will pick you up at your hotel/port." },
        { time: "10:30", title: "Malimbu Hill", desc: "Short stop for panoramic views of Gili Islands." },
        { time: "12:00", title: "Senaru Village", desc: "Arrival at Senaru village and lunch." },
        { time: "13:00", title: "Sendang Gile", desc: "Easy walk to the first waterfall." },
        { time: "14:00", title: "Tiu Kelep", desc: "Soft trekking through jungle and rivers to the big waterfall." },
        { time: "16:00", title: "Monkey Forest", desc: "Visit the wild monkeys on the way back." }
      ],
      includes: ["Private AC Car", "English Speaking Driver", "Petrol / Fuel", "Entrance Fees", "Mineral Water"],
      excludes: ["Lunch", "Personal Expenses", "Tips for Guide"]
    },
    id: {
      title: "Tur Air Terjun (Senaru)",
      description: "Jelajahi air terjun paling terkenal di Lombok. Tur ini membawa Anda ke kaki Gunung Rinjani untuk menyaksikan keindahan air terjun Sendang Gile dan Tiu Kelep. Nikmati hutan tropis yang subur dan udara pegunungan yang menyegarkan.",
      highlights: ["Air Terjun Sendang Gile", "Air Terjun Tiu Kelep", "Malimbu Sunset Point", "Hutan Monyet Pusuk"],
      itinerary: [
        { time: "09:00", title: "Jemputan dari Hotel", desc: "Sopir kami akan menjemput Anda di hotel/pelabuhan." },
        { time: "10:30", title: "Bukit Malimbu", desc: "Berhenti sejenak untuk pemandangan panoramik Kepulauan Gili." },
        { time: "12:00", title: "Desa Senaru", desc: "Tiba di desa Senaru dan makan siang." },
        { time: "13:00", title: "Sendang Gile", desc: "Jalan santai ke air terjun pertama." },
        { time: "14:00", title: "Tiu Kelep", desc: "Soft trekking melalui hutan dan sungai ke air terjun besar." },
        { time: "16:00", title: "Hutan Monyet", desc: "Kunjungi monyet liar dalam perjalanan kembali." }
      ],
      includes: ["Mobil Ber-AC Privat", "Sopir Berbahasa Inggris", "Bensin / BBM", "Biaya Masuk", "Air Mineral"],
      excludes: ["Makan Siang", "Biaya Pribadi", "Tip untuk Pemandu"]
    }
  }
};

export default function LombokTourDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLang();

  if (!slug || !LOMBOK_TOUR_DATA[slug]) {
    return notFound();
  }

  const data = LOMBOK_TOUR_DATA[slug];
  const localizedData = {
    ...data,
    ...(data[locale] || data.en)
  };

  return <ServiceDetailTemplate {...localizedData} />;
}
