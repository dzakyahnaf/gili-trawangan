import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Rinjani, Lombok Tour, Car Rental, and Private Transport packages...");

  // 1. Delete existing activities with these categories to avoid duplicates
  await prisma.activity.deleteMany({
    where: {
      category: {
        in: ["rinjani-tracking", "lombok-tour", "car-rental", "private-speed-boat-and-car"]
      }
    }
  });

  const activities = [
    // ==========================================
    // RINJANI TRACKING
    // ==========================================
    {
      slug: "2d1n-summit",
      category: "rinjani-tracking",
      name: "Pendakian Puncak Rinjani 2 Hari 1 Malam",
      nameEn: "Trekking Summit Rinjani 2 Days 1 Night",
      description: "Taklukkan puncak Gunung Rinjani hanya dalam 2 hari. Paket ini dirancang untuk pendaki berpengalaman yang ingin mencapai puncak (3726m) dengan cepat. Nikmati matahari terbenam yang paling menakjubkan di Indonesia.",
      descriptionEn: "Conquer the summit of Mount Rinjani in just 2 days. This package is designed for experienced trekkers who want to reach the peak (3726m) quickly. Enjoy the most breathtaking sunrise in Indonesia.",
      price: 3150000,
      priceUSD: 210,
      duration: "2 Hari / 1 Malam",
      coverImage: "/images/rinjani-tracking1.jpg",
      meetingPoint: "Sembalun Basecamp",
      maxPax: 15,
      isActive: true,
      highlights: ["Puncak Rinjani 3726m", "Pelawangan Sembalun", "Pemandangan Sunrise Panoramik", "Dukungan Profesional"],
      highlightsEn: ["Rinjani Summit 3726m", "Sembalun Crater Rim", "Panoramic Sunrise View", "Professional Support"],
      includes: ["Pemandu & Porter Trekking", "Tenda & Peralatan Berkemah", "Makan selama pendakian", "Biaya Masuk Rinjani", "Transportasi ke Sembalun"],
      includesEn: ["Trekking Guide & Porters", "Tents & Camping Gear", "Meals during trek", "Rinjani Entrance Fee", "Transport to Sembalun"],
      excludes: ["Tip untuk pemandu", "Alat pendakian pribadi", "Jaket hangat/sarung tangan"],
      excludesEn: ["Tipping for guide", "Personal trekking gear", "Warm jacket/gloves"],
      itinerary: [
        { time: "Hari 1", title: "Sembalun ke Pelawangan", desc: "Mulai dari desa Sembalun. Mendaki melalui sabana dan hutan untuk mencapai pelawangan (2639m)." },
        { time: "Hari 2", title: "Mendaki Puncak & Turun", desc: "Bangun jam 2 pagi untuk pendakian puncak. Lihat matahari terbit dari puncak, lalu turun kembali ke Sembalun." }
      ],
      itineraryEn: [
        { time: "Day 1", title: "Sembalun to Crater Rim", desc: "Start from Sembalun village. Hike through savannahs and forests to reach the crater rim (2639m)." },
        { time: "Day 2", title: "Summit Attack & Descent", desc: "Wake up at 2 AM for the summit climb. Watch the sunrise from the peak, then descent back to Sembalun." }
      ]
    },
    {
      slug: "3d2n-summit",
      category: "rinjani-tracking",
      name: "Pendakian Rinjani 3 Hari 2 Malam (Rute Sembalun - Torean)",
      nameEn: "Mount Rinjani Trekking 3 Days 2 Nights (Sembalun - Torean)",
      description: "Paket pendakian Rinjani 3 Hari 2 Malam melalui rute Sembalun dan turun melalui jalur Torean yang eksotis (Jalur Jurassic Park). Termasuk penjemputan, wisata Lombok (Sade, Mandalika), dan pendakian puncak 3.726 mdpl.",
      descriptionEn: "A 3-day Rinjani trekking package starting from Sembalun and descending via the exotic Torean route (Jurassic Park route). Includes pickup, Lombok tour, and summit attack to 3,726 masl.",
      price: 4100000,
      priceUSD: 275,
      duration: "3 Hari / 2 Malam",
      coverImage: "/images/rinjani-tracking2.jpg",
      meetingPoint: "Sembalun / Torean",
      maxPax: 15,
      isActive: true,
      highlights: ["Puncak Rinjani 3.726 mdpl", "Danau Segara Anak", "Pemandian Air Panas Alami", "Jalur Eksotis Torean", "Wisata Lombok"],
      highlightsEn: ["Rinjani Summit 3,726m", "Segara Anak Lake", "Natural Hot Springs", "Exotic Torean Route", "Lombok Tour"],
      includes: ["Pemandu & Porter", "Tenda & Alat Tidur", "Makan selama pendakian", "Transportasi & Penjemputan", "Wisata Lombok (Day 0)"],
      includesEn: ["Trekking Guide & Porters", "Tents & Sleeping Gear", "Meals during trek", "Transport & Pickup", "Lombok Tour (Day 0)"],
      excludes: ["Tiket pesawat", "Alat pendakian pribadi", "Tip guide & porter"],
      excludesEn: ["Flight tickets", "Personal trekking gear", "Guide & porter tips"],
      itinerary: [
        { time: "Persiapan", title: "Penjemputan & Wisata Lombok", desc: "Penjemputan (maks 14.00). Wisata ke Desa Adat Sade, Mandalika, Tanjung Aan. Check-in penginapan di Sembalun & briefing." },
        { time: "Hari 1", title: "Sembalun ke Pelawangan Sembalun", desc: "Mulai pendakian dari Sembalun setelah sarapan. Melewati Pos 1, 2, 3, dan berkemah di Pelawangan Sembalun." },
        { time: "Hari 2", title: "Puncak Rinjani & Danau Segara Anak", desc: "Bangun pukul 01.00 untuk summit attack. Turun ke Pelawangan untuk sarapan, lalu lanjut ke Danau Segara Anak dan pemandian air panas alami." },
        { time: "Hari 3", title: "Danau Segara Anak ke Torean", desc: "Turun melalui jalur Torean (Jalur Jurassic Park). Tiba di Dusun Torean sore hari dan transfer ke tujuan selanjutnya." }
      ],
      itineraryEn: [
        { time: "Preparation", title: "Pickup & Lombok Tour", desc: "Pickup (max 2 PM). Tour to Sade Village, Mandalika, Tanjung Aan. Check-in at Sembalun accommodation & briefing." },
        { time: "Day 1", title: "Sembalun to Sembalun Crater Rim", desc: "Start trekking from Sembalun after breakfast. Pass through Pos 1, 2, 3, and camp at Sembalun Crater Rim." },
        { time: "Day 2", title: "Rinjani Summit & Segara Anak Lake", desc: "Wake up at 1 AM for summit attack. Return to crater rim for breakfast, then descend to Segara Anak Lake and natural hot springs." },
        { time: "Day 3", title: "Segara Anak Lake to Torean", desc: "Descend via Torean route (Jurassic Park route). Arrive at Torean village in the afternoon and transfer to your next destination." }
      ]
    },
    {
      slug: "4d3n-summit",
      category: "rinjani-tracking",
      name: "Pendakian Rinjani 4 Hari 3 Malam (Rute Sembalun - Torean)",
      nameEn: "Mount Rinjani Trekking 4 Days 3 Nights (Sembalun - Torean)",
      description: "Paket pendakian Rinjani 4 Hari 3 Malam yang lebih santai melalui rute Sembalun dan Torean. Termasuk penjemputan, wisata Lombok, puncak Rinjani, Segara Anak, dan ekstra camping di Birisan Nangka.",
      descriptionEn: "A more relaxed 4-day Rinjani trekking package via Sembalun and Torean routes. Includes pickup, Lombok tour, Rinjani summit, Segara Anak lake, and an extra night of camping at Birisan Nangka.",
      price: 4450000,
      priceUSD: 300,
      duration: "4 Hari / 3 Malam",
      coverImage: "/images/rinjani-tracking3.avif",
      meetingPoint: "Sembalun / Torean",
      maxPax: 15,
      isActive: true,
      highlights: ["Puncak Rinjani 3.726 mdpl", "Danau Segara Anak", "Pemandian Air Panas Alami", "Camping Birisan Nangka", "Wisata Lombok"],
      highlightsEn: ["Rinjani Summit 3,726m", "Segara Anak Lake", "Natural Hot Springs", "Birisan Nangka Camp", "Lombok Tour"],
      includes: ["Pemandu & Porter", "Tenda & Alat Tidur", "Makan selama pendakian", "Transportasi & Penjemputan", "Wisata Lombok (Day 0)"],
      includesEn: ["Trekking Guide & Porters", "Tents & Sleeping Gear", "Meals during trek", "Transport & Pickup", "Lombok Tour (Day 0)"],
      excludes: ["Tiket pesawat", "Alat pendakian pribadi", "Tip guide & porter"],
      excludesEn: ["Flight tickets", "Personal trekking gear", "Guide & porter tips"],
      itinerary: [
        { time: "Persiapan", title: "Penjemputan & Wisata Lombok", desc: "Penjemputan (maks 14.00). Wisata ke Desa Adat Sade, Mandalika, Tanjung Aan. Check-in penginapan di Sembalun & briefing." },
        { time: "Hari 1", title: "Sembalun ke Pelawangan Sembalun", desc: "Mulai pendakian dari Sembalun setelah sarapan. Melewati Pos 1, 2, 3, dan berkemah di Pelawangan Sembalun." },
        { time: "Hari 2", title: "Puncak Rinjani & Danau Segara Anak", desc: "Bangun pukul 01.00 untuk summit attack. Turun ke Pelawangan untuk sarapan, lalu lanjut ke Danau Segara Anak dan pemandian air panas alami." },
        { time: "Hari 3", title: "Danau Segara Anak ke Birisan Nangka", desc: "Persiapan menuju area camp Birisan Nangka. Menikmati panorama jalur Torean hingga tiba di camp untuk bermalam." },
        { time: "Hari 4", title: "Birisan Nangka ke Basecamp Torean", desc: "Turun menuju Basecamp Torean dan program selesai." }
      ],
      itineraryEn: [
        { time: "Preparation", title: "Pickup & Lombok Tour", desc: "Pickup (max 2 PM). Tour to Sade Village, Mandalika, Tanjung Aan. Check-in at Sembalun accommodation & briefing." },
        { time: "Day 1", title: "Sembalun to Sembalun Crater Rim", desc: "Start trekking from Sembalun after breakfast. Pass through Pos 1, 2, 3, and camp at Sembalun Crater Rim." },
        { time: "Day 2", title: "Rinjani Summit & Segara Anak Lake", desc: "Wake up at 1 AM for summit attack. Return to crater rim for breakfast, then descend to Segara Anak Lake and natural hot springs." },
        { time: "Day 3", title: "Segara Anak Lake to Birisan Nangka", desc: "Prepare to hike to Birisan Nangka camp. Enjoy the scenic Torean route and camp for the night." },
        { time: "Day 4", title: "Birisan Nangka to Torean Basecamp", desc: "Descend to Torean Basecamp and finish the trekking program." }
      ]
    },

    // ==========================================
    // LOMBOK TOUR
    // ==========================================
    {
      slug: "waterfall-senaru-tour",
      category: "lombok-tour",
      name: "Tur Air Terjun (Senaru)",
      nameEn: "Waterfall (Senaru) Tour",
      description: "Jelajahi air terjun paling terkenal di Lombok. Tur ini membawa Anda ke kaki Gunung Rinjani untuk menyaksikan keindahan air terjun Sendang Gile dan Tiu Kelep. Nikmati hutan tropis yang subur dan udara pegunungan yang menyegarkan.",
      descriptionEn: "Explore the most famous waterfalls in Lombok. This tour takes you to the foot of Mount Rinjani to witness the majestic Sendang Gile and Tiu Kelep waterfalls. Enjoy the lush tropical jungle and refreshing mountain air.",
      price: 1000000,
      priceUSD: 70,
      duration: "Seharian Penuh",
      coverImage: "/images/air-terjun.jpg",
      meetingPoint: "Lobi Hotel / Pelabuhan",
      maxPax: 10,
      isActive: true,
      highlights: ["Air Terjun Sendang Gile", "Air Terjun Tiu Kelep", "Malimbu Sunset Point", "Hutan Monyet Pusuk"],
      highlightsEn: ["Sendang Gile Waterfall", "Tiu Kelep Waterfall", "Malimbu Sunset Point", "Monkey Forest Pusuk"],
      includes: ["Mobil Ber-AC Privat", "Sopir Berbahasa Inggris", "Bensin / BBM", "Biaya Masuk", "Air Mineral"],
      includesEn: ["Private AC Car", "English Speaking Driver", "Petrol / Fuel", "Entrance Fees", "Mineral Water"],
      excludes: ["Makan Siang", "Biaya Pribadi", "Tip untuk Pemandu"],
      excludesEn: ["Lunch", "Personal Expenses", "Tips for Guide"],
      itinerary: [
        { time: "09:00", title: "Jemputan dari Hotel", desc: "Sopir kami akan menjemput Anda di hotel/pelabuhan." },
        { time: "10:30", title: "Bukit Malimbu", desc: "Berhenti sejenak untuk pemandangan panoramik Kepulauan Gili." },
        { time: "12:00", title: "Desa Senaru", desc: "Tiba di desa Senaru dan makan siang." },
        { time: "13:00", title: "Sendang Gile", desc: "Jalan santai ke air terjun pertama." },
        { time: "14:00", title: "Tiu Kelep", desc: "Soft trekking melalui hutan dan sungai ke air terjun besar." },
        { time: "16:00", title: "Hutan Monyet", desc: "Kunjungi monyet liar dalam perjalanan kembali." }
      ],
      itineraryEn: [
        { time: "09:00", title: "Pickup from Hotel", desc: "Our driver will pick you up at your hotel/port." },
        { time: "10:30", title: "Malimbu Hill", desc: "Short stop for panoramic views of Gili Islands." },
        { time: "12:00", title: "Senaru Village", desc: "Arrival at Senaru village and lunch." },
        { time: "13:00", title: "Sendang Gile", desc: "Easy walk to the first waterfall." },
        { time: "14:00", title: "Tiu Kelep", desc: "Soft trekking through jungle and rivers to the big waterfall." },
        { time: "16:00", title: "Monkey Forest", desc: "Visit the wild monkeys on the way back." }
      ]
    },
    {
      slug: "waterfall-benang-kelambu-tour",
      category: "lombok-tour",
      name: "Tur Air Terjun (Benang Kelambu)",
      nameEn: "Waterfall (Benang Kelambu) Tour",
      description: "Air terjun Benang Kelambu terletak di Lombok Tengah. Airnya mengalir melalui tanaman lebat, menciptakan efek seperti kelambu. Tur ini juga mencakup kunjungan ke air terjun Benang Stokel di dekatnya.",
      descriptionEn: "Benang Kelambu waterfall is located in Central Lombok. The water flows through thick plants, creating a curtain-like effect (Kelambu). This tour also includes a visit to the nearby Benang Stokel waterfall.",
      price: 1000000,
      priceUSD: 70,
      duration: "Seharian Penuh",
      coverImage: "/images/air-terjun2.jpg",
      meetingPoint: "Lobi Hotel / Pelabuhan",
      maxPax: 10,
      isActive: true,
      highlights: ["Air Terjun Benang Kelambu", "Air Terjun Benang Stokel", "Terasering Padi yang Subur", "Pasar Buah Lokal"],
      highlightsEn: ["Benang Kelambu (Curtain) Waterfall", "Benang Stokel Waterfall", "Lush Rice Terraces", "Local Fruit Market"],
      includes: ["Mobil Ber-AC Privat", "Sopir/Pemandu", "Biaya Masuk", "Air Mineral"],
      includesEn: ["Private AC Car", "Driver/Guide", "Entrance Fees", "Mineral Water"],
      excludes: ["Makan Siang", "Tip", "Barang Pribadi"],
      excludesEn: ["Lunch", "Tipping", "Personal Items"],
      itinerary: [
        { time: "09:00", title: "Jemputan Hotel", desc: "Sopir kami menjemput Anda untuk perjalanan ke Lombok Tengah." },
        { time: "11:00", title: "Tiba di Geopark", desc: "Briefing dan mulai berjalan kaki ke air terjun." },
        { time: "12:00", title: "Benang Stokel", desc: "Kunjungi air terjun kembar terlebih dahulu." },
        { time: "13:00", title: "Benang Kelambu", desc: "Nikmati air terjun kelambu dan berfoto." },
        { time: "15:00", title: "Jalan di Sawah", desc: "Jelajahi pertanian di sekitarnya." }
      ],
      itineraryEn: [
        { time: "09:00", title: "Hotel Pickup", desc: "Our driver picks you up for the journey to Central Lombok." },
        { time: "11:00", title: "Arrive at Geopark", desc: "Briefing and start of the walk to the falls." },
        { time: "12:00", title: "Benang Stokel", desc: "Visit the twin falls first." },
        { time: "13:00", title: "Benang Kelambu", desc: "Enjoy the curtain waterfall and take photos." },
        { time: "15:00", title: "Rice Terrace Walk", desc: "Explore the surrounding agriculture." }
      ]
    },
    {
      slug: "pink-beach-tour",
      category: "lombok-tour",
      name: "Tur Pink Beach",
      nameEn: "Pink Beach Tour",
      description: "Kunjungi Pink Beach yang terkenal di Lombok Timur. Pasirnya mendapatkan rona merah muda dari fragmen karang merah. Tur ini mencakup island hopping dengan kapal ke Pulau Pasir dan Gili Petelu untuk snorkeling.",
      descriptionEn: "Visit the famous Pink Beach in East Lombok. The sand gets its pink hue from fragments of red coral. This tour includes boat hopping to Sand Island and Gili Petelu for snorkeling.",
      price: 1000000,
      priceUSD: 70,
      duration: "Seharian Penuh",
      coverImage: "/images/lombok1.jpg",
      meetingPoint: "Lobi Hotel / Pelabuhan",
      maxPax: 10,
      isActive: true,
      highlights: ["Pink Beach (Pantai Tangsi)", "Pulau Pasir", "Snorkeling Gili Petelu", "Pohon Purba"],
      highlightsEn: ["Pink Beach (Pantai Tangsi)", "Sand Island (Pulau Pasir)", "Gili Petelu Snorkeling", "Ancient Trees (Pohon Purba)"],
      includes: ["Mobil Privat", "Kapal Privat", "Alat Snorkeling", "Kotak Makan Siang", "Biaya Masuk"],
      includesEn: ["Private Car", "Private Boat", "Snorkeling Gear", "Lunch Box", "Entrance Fees"],
      excludes: ["Tip", "Minuman Beralkohol"],
      excludesEn: ["Tipping", "Alcoholic drinks"],
      itinerary: [
        { time: "08:00", title: "Jemputan Pagi", desc: "Perjalanan panjang ke pelabuhan Lombok Timur." },
        { time: "10:30", title: "Menyeberang Kapal", desc: "Kapal privat ke area pink beach." },
        { time: "11:00", title: "Snorkeling Gili Petelu", desc: "Visibilitas dan terumbu karang yang bagus." },
        { time: "13:00", title: "Santai di Pink Beach", desc: "Makan siang dan waktu pantai." },
        { time: "15:00", title: "Pulau Pasir", desc: "Berhenti di pulau yang menghilang." }
      ],
      itineraryEn: [
        { time: "08:00", title: "Early Pickup", desc: "Long drive to East Lombok harbor." },
        { time: "10:30", title: "Boat Crossing", desc: "Private boat to the pink beach area." },
        { time: "11:00", title: "Snorkeling Gili Petelu", desc: "Great visibility and corals." },
        { time: "13:00", title: "Pink Beach Relax", desc: "Lunch and beach time." },
        { time: "15:00", title: "Sand Island", desc: "Stop at the disappearing island." }
      ]
    },
    {
      slug: "kuta-lombok-tour",
      category: "lombok-tour",
      name: "Tur Kuta Lombok",
      nameEn: "Kuta Lombok Tour",
      description: "Temukan pesisir selatan Lombok. Kunjungi desa tradisional Sade, lalu menuju ke pantai kelas dunia Kuta, Tanjung Aan, dan Bukit Merese untuk pemandangan yang spektakuler.",
      descriptionEn: "Discover the southern coast of Lombok. Visit the traditional Sade village, then head to the world-class beaches of Kuta, Tanjung Aan, and Bukit Merese for spectacular views.",
      price: 1000000,
      priceUSD: 70,
      duration: "Seharian Penuh",
      coverImage: "/images/lombok2.jpg",
      meetingPoint: "Lobi Hotel / Pelabuhan",
      maxPax: 10,
      isActive: true,
      highlights: ["Desa Tradisional Sade/Ende", "Pantai Kuta", "Pantai Tanjung Aan", "Sunset Bukit Merese"],
      highlightsEn: ["Sade/Ende Traditional Village", "Kuta Beach", "Tanjung Aan Beach", "Merese Hill Sunset"],
      includes: ["Mobil Ber-AC Privat", "Sopir", "Bensin", "Biaya Masuk", "Air Mineral"],
      includesEn: ["Private AC Car", "Driver", "Petrol", "Entrance Fees", "Mineral Water"],
      excludes: ["Makan Siang", "Donasi Desa", "Tip"],
      excludesEn: ["Lunch", "Village donations", "Tipping"],
      itinerary: [
        { time: "09:00", title: "Jemputan", desc: "Mulai perjalanan ke Lombok Selatan." },
        { time: "10:30", title: "Desa Sade", desc: "Pelajari tentang budaya Sasak dan menenun." },
        { time: "12:00", title: "Pantai Kuta", desc: "Jelajahi pusat wilayah selatan." },
        { time: "14:00", title: "Tanjung Aan", desc: "Bersantai di pantai berpasir merica." },
        { time: "16:30", title: "Bukit Merese", desc: "Pendakian singkat untuk pemandangan matahari terbenam." }
      ],
      itineraryEn: [
        { time: "09:00", title: "Pickup", desc: "Start the journey to South Lombok." },
        { time: "10:30", title: "Sade Village", desc: "Learn about Sasak culture and weaving." },
        { time: "12:00", title: "Kuta Beach", desc: "Explore the center of the south." },
        { time: "14:00", title: "Tanjung Aan", desc: "Relax on the pepper sand beach." },
        { time: "16:30", title: "Merese Hill", desc: "Short trek for sunset views." }
      ]
    },
    {
      slug: "city-tour",
      category: "lombok-tour",
      name: "Tur Kota",
      nameEn: "City Tour",
      description: "Jelajahi pusat budaya dan sejarah Lombok. Tur ini membawa Anda melalui pasar tradisional, kuil bersejarah, dan kehidupan kota Mataram yang semarak.",
      descriptionEn: "Explore the cultural and historical heart of Lombok. This tour takes you through traditional markets, historic temples, and the vibrant city life of Mataram.",
      price: 1000000,
      priceUSD: 70,
      duration: "Seharian Penuh",
      coverImage: "/images/lombok3.jpg",
      meetingPoint: "Lobi Hotel / Pelabuhan",
      maxPax: 10,
      isActive: true,
      highlights: ["Istana Air Mayura", "Pura Lingsar", "Islamic Center Mataram", "Pasar Tradisional Bertais"],
      highlightsEn: ["Mayura Water Palace", "Lingsar Temple", "Mataram Islamic Center", "Bertais Traditional Market"],
      includes: ["Mobil Privat Ber-AC", "Sopir Berbahasa Inggris", "Biaya Masuk", "Air Mineral", "Biaya Parkir"],
      includesEn: ["Private Car with AC", "English Speaking Driver", "Entrance Fees", "Mineral Water", "Parking Fees"],
      excludes: ["Makan Siang", "Belanja Pribadi", "Tip untuk Pemandu"],
      excludesEn: ["Lunch", "Personal Shopping", "Tips for Guide"],
      itinerary: [
        { time: "09:00", title: "Jemputan Hotel", desc: "Mulai hari Anda dengan jemputan privat yang nyaman." },
        { time: "10:30", title: "Mayura & Lingsar", desc: "Kunjungi istana air bersejarah dan pura unik yang digunakan oleh dua agama." },
        { time: "12:30", title: "Makan Siang", desc: "Nikmati masakan lokal Lombok di kota." },
        { time: "14:30", title: "Islamic Center Mataram", desc: "Saksikan arsitektur megah dari masjid agung." },
        { time: "16:30", title: "Belanja", desc: "Kunjungi pasar tradisional untuk mutiara dan souvenir lokal." }
      ],
      itineraryEn: [
        { time: "09:00", title: "Hotel Pickup", desc: "Start your day with a comfortable private pickup." },
        { time: "10:30", title: "Mayura & Lingsar", desc: "Visit the historic water palace and the unique temple shared by two religions." },
        { time: "12:30", title: "Lunch", desc: "Enjoy local Lombok cuisine in the city." },
        { time: "14:30", title: "Mataram Islamic Center", desc: "Witness the magnificent architecture of the grand mosque." },
        { time: "16:30", title: "Shopping", desc: "Visit traditional markets for pearls and local souvenirs." }
      ]
    },

    // ==========================================
    // CAR RENTAL
    // ==========================================
    {
      slug: "airport-transfer",
      category: "car-rental",
      name: "Antar Jemput Bandara",
      nameEn: "Airport Transfer",
      description: "Transportasi privat dari Bandara Internasional Lombok menuju Pelabuhan Bangsal atau Teluk Nare.",
      descriptionEn: "Private transfer from Lombok International Airport to Bangsal Port or Teluk Nare.",
      price: 400000,
      priceUSD: 25,
      duration: "Sekali Jalan",
      coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
      meetingPoint: "Bandara Lombok",
      maxPax: 6,
      isActive: true,
      highlights: ["Antar Jemput Privat", "Langsung ke Pelabuhan", "Bebas Repot", "Nyaman & Cepat"],
      highlightsEn: ["Private Transfer", "Direct to Port", "Hassle-Free", "Comfortable & Fast"],
      includes: ["Mobil Ber-AC Privat", "Sopir Profesional", "Bensin / BBM", "Ruang Bagasi"],
      includesEn: ["Private AC Car", "Professional Driver", "Petrol / Fuel", "Luggage Space"],
      excludes: ["Biaya parkir", "Tip"],
      excludesEn: ["Parking fees", "Tipping"],
      itinerary: [],
      itineraryEn: []
    },
    {
      slug: "full-day-car",
      category: "car-rental",
      name: "Sewa Mobil Harian",
      nameEn: "Full Day Car Service",
      description: "Sewa mobil privat dengan sopir untuk menjelajahi destinasi mana pun di Lombok. Fleksibel dan nyaman.",
      descriptionEn: "Private car with driver to explore any destination in Lombok. Flexible and comfortable.",
      price: 900000,
      priceUSD: 60,
      duration: "10 Jam",
      coverImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000",
      meetingPoint: "Lobi Hotel / Bandara",
      maxPax: 6,
      isActive: true,
      highlights: ["Fleksibilitas Rute", "Sopir Berpengalaman", "Durasi 10 Jam", "Nyaman & Aman"],
      highlightsEn: ["Route Flexibility", "Experienced Driver", "10 Hours Duration", "Comfortable & Safe"],
      includes: ["Mobil Ber-AC Privat", "Sopir Profesional", "Bensin / BBM"],
      includesEn: ["Private AC Car", "Professional Driver", "Petrol / Fuel"],
      excludes: ["Biaya masuk wisata", "Parkir/Tip"],
      excludesEn: ["Entrance fees", "Parking/Tipping"],
      itinerary: [],
      itineraryEn: []
    },
    {
      slug: "short-distance-trip",
      category: "car-rental",
      name: "Perjalanan Jarak Pendek",
      nameEn: "Short Distance Trip",
      description: "Transportasi privat cepat antar lokasi terdekat di Lombok.",
      descriptionEn: "Quick private transport between nearby locations in Lombok.",
      price: 250000,
      priceUSD: 15,
      duration: "Per Trip",
      coverImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000",
      meetingPoint: "Ditentukan pelanggan",
      maxPax: 6,
      isActive: true,
      highlights: ["Transportasi Cepat", "Sopir Siap Sedia", "Harga Terjangkau"],
      highlightsEn: ["Quick Transfer", "Driver Ready", "Affordable Price"],
      includes: ["Mobil Ber-AC Privat", "Sopir Profesional", "Bensin / BBM"],
      includesEn: ["Private AC Car", "Professional Driver", "Petrol / Fuel"],
      excludes: ["Tip"],
      excludesEn: ["Tipping"],
      itinerary: [],
      itineraryEn: []
    },

    // ==========================================
    // PRIVATE SPEEDBOAT & CAR
    // ==========================================
    {
      slug: "speedboat-charter",
      category: "private-speed-boat-and-car",
      name: "Sewa Speedboat Privat (Gili - Lombok)",
      nameEn: "Private Speedboat Charter (Gili - Lombok)",
      description: "Cara tercepat untuk bepergian antara Kepulauan Gili dan daratan Lombok. Layanan speedboat privat kami menghindari waktu tunggu lama kapal publik. Kami beroperasi 24/7 dari pelabuhan Teluk Nare dan Bangsal.",
      descriptionEn: "The fastest way to travel between the Gili Islands and mainland Lombok. Our private speedboat service avoids the long wait times of public boats. We operate 24/7 from Teluk Nare and Bangsal port.",
      price: 400000,
      priceUSD: 28,
      duration: "15 Menit",
      coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
      meetingPoint: "Pantai / Pelabuhan terdekat",
      maxPax: 4,
      isActive: true,
      highlights: ["Penyeberangan 15 Menit", "Tersedia 24/7", "Aman & Nyaman", "Langsung ke tujuan Anda"],
      highlightsEn: ["15 Minutes Crossing", "24/7 Availability", "Safe & Comfortable", "Direct to your destination"],
      includes: ["Sewa Speedboat Privat", "Jaket Pelampung", "Kapten Profesional", "Biaya Pelabuhan"],
      includesEn: ["Private Speedboat Charter", "Life Jackets", "Professional Captain", "Port Fees"],
      excludes: ["Layanan porter di pulau", "Transportasi darat (Pesan Combo untuk ini)", "Tip"],
      excludesEn: ["Porter service on island", "Land transport (Book Combo for this)", "Tipping"],
      itinerary: [
        { time: "Jemput", title: "Pulau Gili Mana Pun", desc: "Kapal kami akan menjemput Anda di pantai atau pelabuhan terdekat." },
        { time: "Menyeberang", title: "Perjalanan Speedboat", desc: "Nikmati perjalanan 15 menit yang lancar melintasi perairan biru kehijauan." },
        { time: "Tiba", title: "Teluk Nare / Bangsal", desc: "Tiba langsung di dermaga pribadi kami dengan penjemputan mobil yang sudah menunggu." }
      ],
      itineraryEn: [
        { time: "Pickup", title: "Any Gili Island", desc: "Our boat will pick you up at the nearest beach or harbor." },
        { time: "Crossing", title: "Speedboat Trip", desc: "Enjoy a smooth 15-minute ride across the turquoise waters." },
        { time: "Arrival", title: "Teluk Nare / Bangsal", desc: "Direct arrival at our private jetty with car pickup waiting." }
      ]
    },
    {
      slug: "combo-transfer",
      category: "private-speed-boat-and-car",
      name: "Combo: Speedboat + Mobil (Gili ke Bandara)",
      nameEn: "Combo: Speedboat + Car (Gili to Airport)",
      description: "Cara paling mulus untuk berangkat dari Gili Trawangan, Meno, atau Air ke Bandara Internasional Lombok. Termasuk speedboat privat ke Teluk Nare dan mobil privat langsung ke bandara.",
      descriptionEn: "The most seamless way to get from Gili Trawangan, Meno, or Air to Lombok International Airport. Includes a private speedboat to Teluk Nare and a private car directly to the airport.",
      price: 800000,
      priceUSD: 55,
      duration: "2 Jam",
      coverImage: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=1000",
      meetingPoint: "Pantai / Lobi Hotel di Gili",
      maxPax: 4,
      isActive: true,
      highlights: ["Speedboat & Mobil Terhubung", "Koneksi Instan", "Perjalanan Tanpa Stres", "Pintu ke Bandara"],
      highlightsEn: ["Speedboat & Car Linked", "Instant Connection", "Stress-free Travel", "Door-to-Airport"],
      includes: ["Speedboat Privat", "Mobil Ber-AC Privat", "Sopir", "Biaya Pelabuhan", "Bensin"],
      includesEn: ["Private Speedboat", "Private AC Car", "Driver", "Port Fees", "Petrol"],
      excludes: ["Porter", "Makan", "Tip"],
      excludesEn: ["Porters", "Meals", "Tipping"],
      itinerary: [
        { time: "Mulai", title: "Jemputan Gili", desc: "Kapal privat menjemput Anda dari pulau." },
        { time: "Menyeberang", title: "Teluk Nare", desc: "15 menit penyeberangan ke daratan." },
        { time: "Darat", title: "Mobil Privat", desc: "Sopir menemui Anda di kapal dan mengantar Anda ke bandara (1,5 - 2 jam)." }
      ],
      itineraryEn: [
        { time: "Start", title: "Gili Pickup", desc: "Private boat picks you up from the island." },
        { time: "Crossing", title: "Teluk Nare", desc: "15 minute crossing to the mainland." },
        { time: "Land", title: "Private Car", desc: "Driver meets you at the boat and takes you to the airport (1.5 - 2h)." }
      ]
    },
    {
      slug: "car-transfer",
      category: "private-speed-boat-and-car",
      name: "Transfer Mobil Privat (Pulau Lombok)",
      nameEn: "Private Car Transfer (Lombok Island)",
      description: "Transfer mobil privat antara dua titik mana pun di daratan Lombok. Sempurna untuk antar-jemput bandara atau dari pelabuhan ke hotel Anda berikutnya.",
      descriptionEn: "Private car transfer between any two points on mainland Lombok. Perfect for airport runs or getting from the port to your next hotel.",
      price: 350000,
      priceUSD: 25,
      duration: "Sesuai rute",
      coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
      meetingPoint: "Bandara / Lobi Hotel",
      maxPax: 6,
      isActive: true,
      highlights: ["Antar Jemput Bandara", "Pelabuhan Bangsal/Teluk Nare", "Area Senggigi", "Kuta Lombok"],
      highlightsEn: ["Airport Transfer", "Bangsal/Teluk Nare Port", "Senggigi Area", "Kuta Lombok"],
      includes: ["Mobil Ber-AC Privat", "Sopir Profesional", "Bensin / BBM", "Ruang Bagasi"],
      includesEn: ["Private AC Car", "Professional Driver", "Petrol / Fuel", "Luggage Space"],
      excludes: ["Biaya parkir", "Biaya tol (jika ada)", "Tip"],
      excludesEn: ["Parking fees", "Toll fees (if any)", "Tipping"],
      itinerary: [
        { time: "Mulai", title: "Jemput", desc: "Temui sopir Anda di bandara atau lobi hotel Anda." },
        { time: "Perjalanan", title: "Berkendara Langsung", desc: "Mobil ber-AC yang nyaman dengan sopir profesional." },
        { time: "Selesai", title: "Dropoff", desc: "Tiba dengan aman di tujuan Anda." }
      ],
      itineraryEn: [
        { time: "Start", title: "Pickup", desc: "Meet your driver at the airport or your hotel lobby." },
        { time: "Trip", title: "Direct Drive", desc: "Comfortable AC car with professional driver." },
        { time: "End", title: "Dropoff", desc: "Safe arrival at your destination." }
      ]
    },
    {
      slug: "full-day-car-combo",
      category: "private-speed-boat-and-car",
      name: "Layanan Mobil Seharian (10 Jam)",
      nameEn: "Full Day Car Service (10 Hours)",
      description: "Sewa mobil privat dan sopir selama 10 jam penuh. Jelajahi bagian mana pun dari Lombok dengan rencana perjalanan yang fleksibel. Sopir Anda mengetahui semua spot terbaik dan dapat merekomendasikan tempat makan.",
      descriptionEn: "Rent a private car and driver for a full 10 hours. Explore any part of Lombok with a flexible itinerary. Your driver knows all the best spots and can recommend places to eat.",
      price: 750000,
      priceUSD: 50,
      duration: "10 Jam",
      coverImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000",
      meetingPoint: "Ditentukan pelanggan",
      maxPax: 6,
      isActive: true,
      highlights: ["Rencana Perjalanan Fleksibel", "Sopir Ahli Lokal", "Cakupan 10 Jam", "Aman & Nyaman"],
      highlightsEn: ["Flexible Itinerary", "Local Expert Driver", "10 Hours Coverage", "Safe & Comfortable"],
      includes: ["Mobil Ber-AC Privat", "Sopir Bisa Berbahasa Inggris", "Bensin", "Layanan 10 Jam"],
      includesEn: ["Private AC Car", "English Speaking Driver", "Petrol", "10 Hours Service"],
      excludes: ["Biaya masuk", "Makan", "Parkir/Tip"],
      excludesEn: ["Entrance fees", "Meals", "Parking/Tipping"],
      itinerary: [
        { time: "Mulai", title: "Jemputan Pagi", desc: "Mulai kapan pun Anda mau." },
        { time: "Siang", title: "Rute Kustom", desc: "Kunjungi air terjun, pantai, atau pasar sesuai keinginan Anda." },
        { time: "Selesai", title: "Dropoff Sore", desc: "Selesai kembali di hotel atau pelabuhan Anda." }
      ],
      itineraryEn: [
        { time: "Start", title: "Morning Pickup", desc: "Start whenever you want." },
        { time: "Day", title: "Custom Route", desc: "Visit waterfalls, beaches, or markets as you wish." },
        { time: "End", title: "Evening Dropoff", desc: "Finish back at your hotel or the port." }
      ]
    }
  ];

  for (const act of activities) {
    await prisma.activity.create({
      data: act
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
