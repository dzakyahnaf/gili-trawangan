// Mock data for development - replaces DB queries

export const packages = [
  {
    id: "pkg-1", slug: "gili-trawangan-day-trip", title: "Gili Trawangan Day Trip",
    subtitle: "Snorkeling & Sunset dalam Sehari", category: "tour",
    description: "Nikmati Gili Trawangan dalam sehari penuh, mulai dari snorkeling di spot terbaik hingga menikmati sunset yang memukau.",
    duration: "1 Hari", price: 350000, priceChild: 250000, currency: "IDR",
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
    ],
    includes: ["Transfer perahu PP dari Bangsal","Snorkeling equipment","Pemandu","Makan siang","Air mineral"],
    excludes: ["Minuman beralkohol","Penginapan","Tiket masuk Gili Trawangan"],
    programs: ["Snorkeling 3 titik","Naik cidomo","Makan siang seafood lokal","Sunset di pantai"],
    itinerary: [
      { day: 1, title: "Day Trip", activities: ["07:30 — Kumpul di Meeting Point","08:00 — Snorkeling titik 1 (Biorock)","09:30 — Snorkeling titik 2 (Turtle Point)","11:00 — Snorkeling titik 3 (Sunset Reef)","12:30 — Makan siang","14:00 — Free time, jelajah pulau","17:00 — Sunset","18:00 — Selesai"] }
    ],
    isActive: true, isFeatured: true, maxPax: 20,
  },
  {
    id: "pkg-2", slug: "lombok-2-hari-1-malam", title: "Lombok 2 Hari / 1 Malam",
    subtitle: "Snorkeling + Island Hopping + Penginapan", category: "package",
    description: "Paket hemat nikmati keindahan Gili Trawangan semalam, lengkap dengan snorkeling, island hopping, dan penginapan.",
    duration: "2 Hari / 1 Malam", price: 850000, priceChild: 600000, currency: "IDR",
    coverImage: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"],
    includes: ["Fast boat PP Bali-Gili","Penginapan 1 malam","Breakfast","Snorkeling trip","Pemandu wisata"],
    excludes: ["Makan siang & makan malam","Minuman","Pengeluaran pribadi"],
    programs: ["Snorkeling","Island Hopping (3 Gili)","Penginapan","Breakfast"],
    itinerary: [
      { day: 1, title: "Arrival & Explore", activities: ["08:00 — Fast boat dari Padang Bai","09:30 — Tiba di Gili Trawangan","11:00 — Snorkeling trip","14:00 — Island Hopping","17:30 — Sunset"] },
      { day: 2, title: "Free & Departure", activities: ["07:30 — Sarapan","09:00 — Free activity","11:00 — Check out","11:25 — Fast boat balik"] }
    ],
    isActive: true, isFeatured: true, maxPax: 20,
  },
  {
    id: "pkg-3", slug: "lombok-4-hari-3-malam", title: "Lombok 4 Hari / 3 Malam",
    subtitle: "Paket Terlengkap Gili & Lombok", category: "package",
    description: "Paket terlengkap untuk merasakan keajaiban Gili Trawangan & Lombok. Dari bawah laut hingga puncak Rinjani!",
    duration: "4 Hari / 3 Malam", price: 2200000, priceChild: 1500000, currency: "IDR",
    coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80"],
    includes: ["Fast boat PP","Penginapan 3 malam","Breakfast","Snorkeling trip","Diving intro","Transport lokal","Pemandu","Air mineral"],
    excludes: ["Makan siang & malam","Trekking Rinjani (Rp 450.000)","Pengeluaran pribadi","Tip guide"],
    programs: ["Fast boat","Snorkeling","Diving intro","Island Hopping","Cultural tour Lombok"],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Fast boat pagi","Check in","Snorkeling sore","Sunset dinner"] },
      { day: 2, title: "Gili Islands", activities: ["Island Hopping 3 Gili","Snorkeling turtle point","Cidomo ride"] },
      { day: 3, title: "Diving & Free", activities: ["Intro dive 1 site","Free afternoon","Night market"] },
      { day: 4, title: "Departure", activities: ["Breakfast","Checkout","Fast boat balik Bali"] }
    ],
    isActive: true, isFeatured: true, maxPax: 15,
  },
  {
    id: "pkg-4", slug: "honeymoon-gili-trawangan", title: "Honeymoon Gili Trawangan",
    subtitle: "Paket Romantis untuk Pasangan", category: "package",
    description: "Paket romantis untuk pasangan dengan penginapan bungalow pinggir pantai, private sunset cruise, dan candle dinner.",
    duration: "3 Hari / 2 Malam", price: 3500000, priceChild: null, currency: "IDR",
    coverImage: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80"],
    includes: ["Fast boat PP","Bungalow deluxe 2 malam","Breakfast","Private sunset speedboat","Candle dinner","Welcome drink"],
    excludes: ["Makan siang","Pengeluaran pribadi","Aktivitas tambahan"],
    programs: ["Private sunset cruise","Candle dinner","Snorkeling private","Island tour"],
    itinerary: [
      { day: 1, title: "Arrival & Romance", activities: ["Fast boat","Check in bungalow","Welcome drink","Private sunset cruise","Candle dinner"] },
      { day: 2, title: "Island Paradise", activities: ["Breakfast","Snorkeling private","Free time","Sunset"] },
      { day: 3, title: "Departure", activities: ["Breakfast","Checkout","Fast boat balik"] }
    ],
    isActive: true, isFeatured: false, maxPax: 2,
  },
];

export const activities = [
  { id: "act-1", slug: "snorkeling-trip", name: "Snorkeling Trip (3 Titik)", price: 200000, priceChild: 150000, duration: "4 jam", schedule: ["08:00 - 12:00","13:00 - 17:00"], maxPax: 15, category: "snorkeling", coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", description: "Jelajahi keindahan bawah laut Gili Trawangan di 3 titik snorkeling terbaik.", images: [], includes: ["Snorkeling gear","Pemandu","Air mineral"], excludes: ["Makan","Foto underwater"], isActive: true, meetingPoint: "Sama-Sama Reggae, Gili Trawangan" },
  { id: "act-2", slug: "snorkeling-private", name: "Snorkeling Private", price: 400000, priceChild: 300000, duration: "3 jam", schedule: ["Fleksibel"], maxPax: 6, category: "snorkeling", coverImage: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80", description: "Snorkeling private dengan boat pribadi.", images: [], includes: ["Private boat","Snorkeling gear","Pemandu"], excludes: ["Makan","Foto"], isActive: true, meetingPoint: "Sama-Sama Reggae, Gili Trawangan" },
  { id: "act-3", slug: "intro-diving", name: "Intro Diving (1 Dive)", price: 550000, priceChild: null, duration: "3 jam", schedule: ["08:00 - 11:00","13:30 - 16:30"], maxPax: 6, category: "diving", coverImage: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80", description: "Pengalaman diving pertama dengan instruktur profesional bersertifikat.", images: [], includes: ["Full diving gear","Instruktur","Sertifikat"], excludes: ["Foto underwater","Transport"], isActive: true, meetingPoint: "Sama-Sama Reggae, Gili Trawangan" },
  { id: "act-4", slug: "fun-diving", name: "Fun Diving (2 Dives)", price: 750000, priceChild: null, duration: "4 jam", schedule: ["08:00 - 12:00"], maxPax: 4, category: "diving", coverImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", description: "2 dive sites untuk diver bersertifikat.", images: [], includes: ["Full gear","Dive guide","Air mineral"], excludes: ["Foto","Transport"], isActive: true, meetingPoint: "Sama-Sama Reggae, Gili Trawangan" },
  { id: "act-5", slug: "island-hopping", name: "Island Hopping 3 Gili", price: 250000, priceChild: 175000, duration: "5 jam", schedule: ["09:00 - 14:00"], maxPax: 20, category: "island-hopping", coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", description: "Kunjungi Gili Trawangan, Gili Meno, dan Gili Air dalam 1 trip.", images: [], includes: ["Boat PP","Pemandu","Air mineral"], excludes: ["Makan","Tiket masuk"], isActive: true, meetingPoint: "Sama-Sama Reggae, Gili Trawangan" },
  { id: "act-6", slug: "sunset-cruise", name: "Sunset Cruise", price: 300000, priceChild: 200000, duration: "2 jam", schedule: ["17:00 - 19:00"], maxPax: 15, category: "sunset", coverImage: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80", description: "Nikmati sunset spektakuler dari atas kapal.", images: [], includes: ["Boat","Welcome drink","Snack"], excludes: ["Makan malam","Alkohol"], isActive: true, meetingPoint: "Sama-Sama Reggae, Gili Trawangan" },
  { id: "act-7", slug: "glass-bottom-boat", name: "Glass Bottom Boat", price: 150000, priceChild: 100000, duration: "2 jam", schedule: ["10:00 - 12:00","14:00 - 16:00"], maxPax: 12, category: "island-hopping", coverImage: "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80", description: "Lihat keindahan bawah laut tanpa perlu basah.", images: [], includes: ["Boat","Pemandu"], excludes: ["Makan","Minuman"], isActive: true, meetingPoint: "Sama-Sama Reggae, Gili Trawangan" },
  { id: "act-8", slug: "sea-turtle-watching", name: "Sea Turtle Watching", price: 175000, priceChild: 125000, duration: "2 jam", schedule: ["08:00 - 10:00","14:00 - 16:00"], maxPax: 10, category: "snorkeling", coverImage: "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800&q=80", description: "Berenang bersama penyu laut di habitat aslinya.", images: [], includes: ["Snorkeling gear","Pemandu"], excludes: ["Foto","Makan"], isActive: true, meetingPoint: "Sama-Sama Reggae, Gili Trawangan" },
];

export const fastBoats = [
  {
    id: "fb-1", slug: "ekajaya-fast-ferry", name: "Ekajaya Fast Ferry",
    description: "Kapal aluminium 34 meter, 4 mesin Volvo D16 750HP, kapasitas 210 penumpang, kecepatan 35 knot.",
    capacity: 210, speed: "35 knot",
    facilities: ["AC","Sun Deck","Kursi premium","TV LCD","GPS","Life jacket","Toilet"],
    images: ["https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80"],
    isActive: true,
    schedules: [
      { id: "fbs-1", from: "Padang Bai (Bali)", to: "Gili Trawangan", departure: "08:00", arrival: "09:30", price: 350000 },
      { id: "fbs-2", from: "Padang Bai (Bali)", to: "Gili Trawangan", departure: "09:00", arrival: "10:30", price: 350000 },
      { id: "fbs-3", from: "Padang Bai (Bali)", to: "Gili Trawangan", departure: "12:30", arrival: "14:30", price: 350000 },
      { id: "fbs-4", from: "Serangan (Bali)", to: "Gili Trawangan", departure: "08:00", arrival: "11:15", price: 400000 },
      { id: "fbs-5", from: "Gili Trawangan", to: "Padang Bai (Bali)", departure: "09:00", arrival: "10:30", price: 350000 },
      { id: "fbs-6", from: "Gili Trawangan", to: "Padang Bai (Bali)", departure: "15:00", arrival: "16:30", price: 350000 },
    ],
  },
  {
    id: "fb-2", slug: "bluewater-express", name: "BlueWater Express",
    description: "Pioneer rute Bali–Gili Islands sejak 2006. Catatan keselamatan 100%.",
    capacity: 180, speed: "32 knot",
    facilities: ["AC","Sun Deck","Kursi nyaman","Toilet","Life jacket","GPS"],
    images: ["https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80"],
    isActive: true,
    schedules: [
      { id: "fbs-7", from: "Padang Bai (Bali)", to: "Gili Trawangan", departure: "08:00", arrival: "09:30", price: 350000 },
      { id: "fbs-8", from: "Padang Bai (Bali)", to: "Gili Trawangan", departure: "12:15", arrival: "13:45", price: 350000 },
      { id: "fbs-9", from: "Gili Trawangan", to: "Padang Bai (Bali)", departure: "09:55", arrival: "12:25", price: 350000 },
      { id: "fbs-10", from: "Gili Trawangan", to: "Padang Bai (Bali)", departure: "11:25", arrival: "13:55", price: 350000 },
    ],
  },
];

export const speedboats = [
  { id: "sb-1", slug: "private-half-day", name: "Private Speedboat Half Day", price: 1200000, capacity: 8, duration: "4 jam", priceUnit: "per trip", description: "Charter speedboat pribadi untuk jelajah Gili selama setengah hari.", facilities: ["Life jacket","Snorkeling gear","Cooler box","Kapten berpengalaman"], routes: ["Gili Trawangan","Gili Meno","Gili Air"], images: ["https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80"], isActive: true },
  { id: "sb-2", slug: "private-full-day", name: "Private Speedboat Full Day", price: 2000000, capacity: 8, duration: "8 jam", priceUnit: "per trip", description: "Seharian penuh menjelajah kepulauan dengan speedboat pribadi.", facilities: ["Life jacket","Snorkeling gear","Cooler box","Kapten berpengalaman","Makan siang"], routes: ["Gili Trawangan","Gili Meno","Gili Air","Pink Beach","Senggigi"], images: ["https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80"], isActive: true },
  { id: "sb-3", slug: "island-hopping-private", name: "Island Hopping 3 Gili (Private)", price: 1500000, capacity: 10, duration: "5 jam", priceUnit: "per trip", description: "Island hopping private ke 3 Gili islands.", facilities: ["Life jacket","Snorkeling gear","Cooler box"], routes: ["Gili Trawangan","Gili Meno","Gili Air"], images: ["https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80"], isActive: true },
  { id: "sb-4", slug: "sunset-speedboat-cruise", name: "Sunset Speedboat Cruise", price: 800000, capacity: 8, duration: "2 jam", priceUnit: "per trip", description: "Nikmati sunset terbaik dari atas speedboat pribadi.", facilities: ["Life jacket","Welcome drink","Snack"], routes: ["Gili Trawangan","Gili Meno"], images: ["https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80"], isActive: true },
];

export const testimonials = [
  { id: "t-1", name: "Sarah Johnson", origin: "Sydney, Australia", rating: 5, comment: "Amazing snorkeling experience! The guide was very professional and we saw so many sea turtles. Highly recommended!", date: "Maret 2025", avatar: null, isActive: true, isVerified: true },
  { id: "t-2", name: "Budi Santoso", origin: "Jakarta, Indonesia", rating: 5, comment: "Paket 4 hari 3 malam benar-benar worth it! Semua terorganisir dengan baik. Gili Trawangan memang surga!", date: "Februari 2025", avatar: null, isActive: true, isVerified: true },
  { id: "t-3", name: "Emma Wilson", origin: "London, UK", rating: 4, comment: "Beautiful island, great service. The fast boat was comfortable and on time. Will definitely come back!", date: "Januari 2025", avatar: null, isActive: true, isVerified: true },
  { id: "t-4", name: "Yuki Tanaka", origin: "Tokyo, Japan", rating: 5, comment: "Best diving experience in Indonesia! The coral reefs are stunning and the water is crystal clear.", date: "Desember 2024", avatar: null, isActive: true, isVerified: true },
  { id: "t-5", name: "Andi Pratama", origin: "Surabaya, Indonesia", rating: 5, comment: "Honeymoon package nya luar biasa! Candle dinner di pinggir pantai sangat romantis. Terima kasih RH Tour!", date: "Januari 2025", avatar: null, isActive: true, isVerified: true },
];

export const galleryImages = [
  { id: "g-1", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", caption: "Snorkeling di Gili Trawangan", category: "snorkeling" },
  { id: "g-2", imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80", caption: "Underwater Paradise", category: "snorkeling" },
  { id: "g-3", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", caption: "Gili Islands", category: "island" },
  { id: "g-4", imageUrl: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=600&q=80", caption: "Sunset di Gili Trawangan", category: "beach" },
  { id: "g-5", imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&q=80", caption: "Diving Adventure", category: "diving" },
  { id: "g-6", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", caption: "Crystal Clear Water", category: "beach" },
  { id: "g-7", imageUrl: "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=600&q=80", caption: "Sea Turtle", category: "snorkeling" },
  { id: "g-8", imageUrl: "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=600&q=80", caption: "Tropical Beach", category: "beach" },
  { id: "g-9", imageUrl: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&q=80", caption: "Fast Boat", category: "island" },
];

export const faqs = [
  { q: "Bagaimana cara booking paket wisata?", a: "Pilih paket yang diinginkan, isi form booking dengan data diri, lalu lakukan pembayaran melalui metode yang tersedia (Transfer Bank, GoPay, QRIS, dll)." },
  { q: "Apakah bisa reschedule atau cancel booking?", a: "Reschedule bisa dilakukan H-3 sebelum tanggal keberangkatan. Pembatalan H-7 mendapat refund 100%, H-3 refund 50%." },
  { q: "Di mana meeting point untuk semua aktivitas?", a: "Meeting point di Sama-Sama Reggae Bar, Gili Trawangan. Koordinat: -8.3521, 116.0267" },
  { q: "Apakah tersedia asuransi perjalanan?", a: "Semua aktivitas sudah termasuk asuransi dasar. Untuk asuransi tambahan bisa ditambahkan saat booking." },
  { q: "Apakah aman untuk anak-anak?", a: "Ya! Kami menyediakan life jacket untuk semua ukuran dan pemandu yang berpengalaman menangani wisatawan anak-anak." },
  { q: "Bagaimana jika cuaca buruk?", a: "Jika cuaca tidak memungkinkan, kami akan reschedule ke tanggal terdekat atau refund penuh." },
];
