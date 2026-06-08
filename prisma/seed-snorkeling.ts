import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding snorkeling packages...");

  // Clean up old activity data first (the 2 placeholder records)
  await prisma.activity.deleteMany({
    where: { category: "snorkeling" },
  });

  const snorkelingPackages = [
    {
      slug: "shared-snorkeling-3-spots",
      name: "Snorkeling Sharing Dengan Grup, Selama 4 Jam",
      nameEn: "Shared Snorkeling With The Group, During 4 Hours",
      description:
        "Bergabunglah dengan perjalanan snorkeling publik kami yang populer. Kami mengunjungi tiga tempat utama di sekitar Kepulauan Gili: patung-patung di Meno, penyu di Trawangan, dan karang biru di Gili Air.",
      descriptionEn:
        "Join our popular public snorkeling trip. We visit three main spots around the Gili Islands: the statues at Meno, the turtles at Trawangan, and the blue coral at Gili Air.",
      highlights: ["Patung Bawah Laut Meno", "Turtle Point", "Taman Ikan Gili Air"],
      highlightsEn: ["Meno Wall Statues", "Turtle Point", "Gili Air Fish Garden"],
      itinerary: [
        { time: "09:00 / 13:00", title: "Pertemuan", desc: "Bertemu di kantor pelabuhan untuk pengepasan alat." },
        { time: "+30m", title: "Keberangkatan", desc: "Kapal berangkat bersama grup." },
        { time: "1j", title: "Gili Meno", desc: "Snorkeling di area patung." },
        { time: "2j", title: "Turtle Point", desc: "Berenang bersama penyu." },
        { time: "3j", title: "Gili Air", desc: "Istirahat makan siang dan lokasi snorkeling terakhir." },
      ],
      itineraryEn: [
        { time: "09:00 / 13:00", title: "Meeting", desc: "Meet at harbor office for gear fitting." },
        { time: "+30m", title: "Departure", desc: "Boat departs with the group." },
        { time: "1h", title: "Gili Meno", desc: "Snorkeling at the statues." },
        { time: "2h", title: "Turtle Point", desc: "Swimming with turtles." },
        { time: "3h", title: "Gili Air", desc: "Lunch break and final snorkeling spot." },
      ],
      includes: ["Alat Snorkeling", "Jaket Pelampung", "Kapten Kapal", "Kapal Sharing"],
      includesEn: ["Snorkeling Gear", "Life Jacket", "Boat Captain", "Shared Boat"],
      excludes: ["Makan Siang", "Foto Gopro", "Handuk"],
      excludesEn: ["Lunch", "Gopro Photo", "Towels"],
      price: 150000,
      priceUSD: 10,
      coverImage: "/images/snorkeling1.jpg",
      duration: "4 Jam",
      schedule: ["09:00", "13:00"],
      meetingPoint: "Sama-Sama Reggae, Gili Trawangan",
      category: "snorkeling",
      minPax: 1,
      maxPax: 15,
      isActive: true,
    },
    {
      slug: "shared-snorkeling-sunset",
      name: "Snorkeling Sharing Dan Tur Sunset",
      nameEn: "Shared Snorkeling And Sunset Trip",
      description:
        "Cara terbaik untuk mengakhiri hari. Snorkeling di sore hari dan nikmati matahari terbenam yang indah dari kapal di antara Kepulauan Gili.",
      descriptionEn:
        "The best way to end the day. Snorkel in the afternoon and enjoy a beautiful sunset from the boat between the Gili Islands.",
      highlights: ["Matahari Terbenam dari Kapal", "Turtle Point", "Patung Meno"],
      highlightsEn: ["Sunset from Boat", "Turtle Point", "Meno Statues"],
      itinerary: [
        { time: "15:00", title: "Pertemuan", desc: "Berkumpul di pelabuhan." },
        { time: "15:30", title: "Snorkeling", desc: "Menggunakan dua spot utama saat cahaya mulai lembut." },
        { time: "17:30", title: "Melihat Sunset", desc: "Bersantai di kapal saat matahari mulai terbenam." },
      ],
      itineraryEn: [
        { time: "15:00", title: "Meeting", desc: "Gather at the harbor." },
        { time: "15:30", title: "Snorkeling", desc: "Visit two main spots while the light is soft." },
        { time: "17:30", title: "Sunset Watch", desc: "Relax on the boat as the sun dips below the horizon." },
      ],
      includes: ["Alat Snorkeling", "Jaket Pelampung", "Kapal & Kapten", "Grup Sharing"],
      includesEn: ["Snorkeling Gear", "Life Jacket", "Boat & Captain", "Shared Group"],
      excludes: ["Minuman", "Makan Malam", "Foto Pribadi"],
      excludesEn: ["Drinks", "Dinner", "Personal Photos"],
      price: 150000,
      priceUSD: 10,
      coverImage: "/images/snorkeling2.jpg",
      duration: "2 Jam",
      schedule: ["15:00"],
      meetingPoint: "Sama-Sama Reggae, Gili Trawangan",
      category: "snorkeling",
      minPax: 1,
      maxPax: 15,
      isActive: true,
    },
    {
      slug: "private-snorkeling-2-hours",
      name: "Snorkeling Privat Selama 2 Jam Dengan 3 Spot",
      nameEn: "Private Snorkeling For 2 Hours With 3 Spots",
      description:
        "Perjalanan snorkeling yang singkat namun eksklusif. Sempurna bagi mereka yang memiliki waktu terbatas namun tetap ingin merasakan pengalaman kapal privat mengunjungi 3 spot terbaik.",
      descriptionEn:
        "A quick but exclusive snorkeling trip. Perfect for those with limited time who still want a private boat experience visiting the top 3 spots.",
      highlights: ["Patung Meno", "Turtle Point", "Taman Gili Air"],
      highlightsEn: ["Meno Statues", "Turtle Point", "Gili Air Garden"],
      itinerary: [
        { time: "Mulai", title: "Waktu Fleksibel", desc: "Pilih waktu keberangkatan Anda sendiri." },
        { time: "30m", title: "Spot 1", desc: "Patung di Gili Meno." },
        { time: "1j", title: "Spot 2", desc: "Penyu di Gili Trawangan." },
        { time: "1j 30m", title: "Spot 3", desc: "Pemberian makan ikan di Gili Air." },
      ],
      itineraryEn: [
        { time: "Start", title: "Flexible Timing", desc: "Choose your own departure time." },
        { time: "30m", title: "Spot 1", desc: "Statues at Gili Meno." },
        { time: "1h", title: "Spot 2", desc: "Turtles at Gili Trawangan." },
        { time: "1h 30m", title: "Spot 3", desc: "Fish feeding at Gili Air." },
      ],
      includes: ["Kapal Privat", "Kapten", "Alat Snorkeling", "Jaket Pelampung", "Air Mineral"],
      includesEn: ["Private Boat", "Captain", "Gear", "Life Jackets", "Mineral Water"],
      excludes: ["Makan Siang", "Foto", "Penjemputan"],
      excludesEn: ["Lunch", "Photos", "Pickups"],
      price: 850000,
      priceUSD: 60,
      coverImage: "/images/snorkeling3.jpg",
      duration: "2 Jam",
      schedule: ["Fleksibel"],
      meetingPoint: "Sama-Sama Reggae, Gili Trawangan",
      category: "snorkeling",
      minPax: 1,
      maxPax: 6,
      isActive: true,
    },
    {
      slug: "private-snorkeling-4-hours",
      name: "Snorkeling Privat Selama 4 Jam Dengan 4 Spot Snorkeling",
      nameEn: "Private Snorkeling For 4 Hours With 4 Snorkeling Spots",
      description:
        "Nikmati tur kapal kaca privat di sekitar tiga Kepulauan Gili. Perjalanan 4 jam ini memberi Anda banyak waktu untuk menjelajahi spot bawah laut terbaik tanpa keramaian. Sempurna untuk keluarga atau pasangan romantis.",
      descriptionEn:
        "Enjoy a private glass-bottom boat tour around the three Gili Islands. This 4-hour trip gives you plenty of time to explore the best underwater spots without the crowds. Perfect for families or romantic couples.",
      highlights: [
        "Patung Bawah Laut (Meno)",
        "Turtle Point (Trawangan)",
        "Karang Biru (Air)",
        "Ikan Taman (Air)",
      ],
      highlightsEn: [
        "Underwater Statues (Meno)",
        "Turtle Point (Trawangan)",
        "Blue Coral (Air)",
        "Garden Fish (Air)",
      ],
      itinerary: [
        { time: "Mulai", title: "Titik Kumpul", desc: "Temui kapten Anda di kantor kami dekat pelabuhan." },
        { time: "Stop 1", title: "Patung Gili Meno", desc: "Kunjungi patung bawah laut yang terkenal di dunia oleh Jason deCaires Taylor." },
        { time: "Stop 2", title: "Turtle Point", desc: "Berenang bersama penyu hijau yang lembut di habitat aslinya." },
        { time: "Stop 3", title: "Snorkeling Gili Air", desc: "Jelajahi karang biru yang semarak dan beri makan ribuan ikan warna-warni." },
      ],
      itineraryEn: [
        { time: "Start", title: "Meeting Point", desc: "Meet your captain at our office near the harbor." },
        { time: "Stop 1", title: "Gili Meno Statues", desc: "Visit the world-famous underwater statues by Jason deCaires Taylor." },
        { time: "Stop 2", title: "Turtle Point", desc: "Swim with gentle green sea turtles in their natural habitat." },
        { time: "Stop 3", title: "Gili Air Snorkeling", desc: "Explore the vibrant blue corals and feed thousands of colorful fish." },
      ],
      includes: [
        "Kapal Kaca Privat",
        "Peralatan Snorkeling",
        "Jaket Pelampung",
        "Kapten Profesional",
        "Air Mineral",
      ],
      includesEn: [
        "Private Glass Bottom Boat",
        "Snorkeling Equipment",
        "Life Jackets",
        "Professional Captain",
        "Mineral Water",
      ],
      excludes: ["Makan siang di pulau", "Foto Gopro (Opsional)", "Jemputan Hotel"],
      excludesEn: ["Lunch on the island", "Gopro Photos (Optional)", "Hotel Pickup"],
      price: 1500000,
      priceUSD: 100,
      coverImage: "/images/snorkeling5.jpg",
      duration: "4 Jam",
      schedule: ["Fleksibel"],
      meetingPoint: "Sama-Sama Reggae, Gili Trawangan",
      category: "snorkeling",
      minPax: 1,
      maxPax: 8,
      isActive: true,
    },
    {
      slug: "private-snorkeling-6-hours",
      name: "Snorkeling Privat Selama 6 Jam",
      nameEn: "Private Snorkeling During 6 Hours",
      description:
        "Hari snorkeling terbaik. 6 jam penuh dengan kapal privat Anda sendiri. Jelajahi terumbu karang tersembunyi, berhenti di pulau mana pun untuk makan siang, dan nikmati indahnya perairan Gili.",
      descriptionEn:
        "The ultimate snorkeling day. 6 full hours with your own private boat. Explore hidden reefs, stop at any of the islands for lunch, and enjoy the beautiful Gili waters.",
      highlights: [
        "Semua 3 Kepulauan Gili",
        "Spot Karang Tersembunyi",
        "Island Hopping",
        "Kebebasan Penuh 6 Jam",
      ],
      highlightsEn: [
        "All 3 Gili Islands",
        "Hidden Reef Spots",
        "Island Hopping",
        "6 Hours Freedom",
      ],
      itinerary: [
        { time: "09:00", title: "Keberangkatan", desc: "Mulai kapan pun Anda siap." },
        { time: "Pagi", title: "Eksplorasi Pagi", desc: "Kunjungi semua spot snorkeling utama sebelum ramai." },
        { time: "12:00", title: "Makan Siang di Pulau", desc: "Berhenti di Gili Meno atau Gili Air untuk makan siang santai di pantai." },
        { time: "Siang/Sore", title: "Snorkeling Sore", desc: "Temukan terumbu karang rahasia yang hanya diketahui oleh kapten kami." },
        { time: "15:00", title: "Kembali", desc: "Kembali ke pulau Anda." },
      ],
      itineraryEn: [
        { time: "09:00", title: "Departure", desc: "Start whenever you are ready." },
        { time: "AM", title: "Morning Exploration", desc: "Visit all main snorkeling spots before they get crowded." },
        { time: "12:00", title: "Island Lunch", desc: "Stop at Gili Meno or Gili Air for a relaxed beach lunch." },
        { time: "PM", title: "Afternoon Snorkel", desc: "Discover secret reefs known only to our captains." },
        { time: "15:00", title: "Return", desc: "Back to your island after an unforgettable trip." },
      ],
      includes: ["Kapal Privat", "Kapten", "Semua Alat", "Jaket Pelampung", "Pendingin dengan Air"],
      includesEn: ["Private Boat", "Captain", "All Gear", "Life Jackets", "Cooler with Water"],
      excludes: ["Biaya makan siang", "Bir/Soda", "Biaya masuk ke Konservasi Penyu Meno"],
      excludesEn: ["Lunch costs", "Beer/Soda", "Entry fees to Meno Turtle Sanctuary"],
      price: 2000000,
      priceUSD: 135,
      coverImage: "/images/snorkeling1.jpg",
      duration: "6 Jam",
      schedule: ["Fleksibel"],
      meetingPoint: "Sama-Sama Reggae, Gili Trawangan",
      category: "snorkeling",
      minPax: 1,
      maxPax: 8,
      isActive: true,
    },
  ];

  for (const pkg of snorkelingPackages) {
    await prisma.activity.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
    console.log(`✓ Seeded: ${pkg.name}`);
  }

  console.log("✅ Snorkeling seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
