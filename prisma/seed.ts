import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@rhtour.com" },
    update: {},
    create: {
      email: "admin@rhtour.com",
      password: adminPassword,
      name: "RH Admin",
      role: "admin",
    },
  });

  // 2. Create Packages
  const packagesData = [
    {
      slug: "gili-trawangan-day-trip",
      title: "Gili Trawangan Day Trip",
      subtitle: "Snorkeling & Sunset dalam Sehari",
      category: "tour",
      description: "Nikmati Gili Trawangan dalam sehari penuh, mulai dari snorkeling di spot terbaik hingga menikmati sunset yang memukau.",
      duration: "1 Hari",
      price: 350000,
      priceChild: 250000,
      coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      includes: ["Transfer perahu PP dari Bangsal", "Snorkeling equipment", "Pemandu", "Makan siang", "Air mineral"],
      excludes: ["Minuman beralkohol", "Penginapan", "Tiket masuk Gili Trawangan"],
      programs: ["Snorkeling 3 titik", "Naik cidomo", "Makan siang seafood lokal", "Sunset di pantai"],
      itinerary: [
        { day: 1, title: "Day Trip", activities: ["07:30 — Kumpul di Meeting Point", "08:00 — Snorkeling titik 1 (Biorock)", "09:30 — Snorkeling titik 2 (Turtle Point)", "11:00 — Snorkeling titik 3 (Sunset Reef)", "12:30 — Makan siang", "14:00 — Free time, jelajah pulau", "17:00 — Sunset", "18:00 — Selesai"] }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 20,
    },
    {
      slug: "lombok-2-hari-1-malam",
      title: "Lombok 2 Hari / 1 Malam",
      subtitle: "Snorkeling + Island Hopping + Penginapan",
      category: "package",
      description: "Paket hemat nikmati keindahan Gili Trawangan semalam, lengkap dengan snorkeling, island hopping, dan penginapan.",
      duration: "2 Hari / 1 Malam",
      price: 850000,
      priceChild: 600000,
      coverImage: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
      includes: ["Fast boat PP Bali-Gili", "Penginapan 1 malam", "Breakfast", "Snorkeling trip", "Pemandu wisata"],
      excludes: ["Makan siang & makan malam", "Minuman", "Pengeluaran pribadi"],
      programs: ["Snorkeling", "Island Hopping (3 Gili)", "Penginapan", "Breakfast"],
      itinerary: [
        { day: 1, title: "Arrival & Explore", activities: ["08:00 — Fast boat dari Padang Bai", "09:30 — Tiba di Gili Trawangan", "11:00 — Snorkeling trip", "14:00 — Island Hopping", "17:30 — Sunset"] },
        { day: 2, title: "Free & Departure", activities: ["07:30 — Sarapan", "09:00 — Free activity", "11:00 — Check out", "11:25 — Fast boat balik"] }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 20,
    },
    {
      slug: "lombok-4-hari-3-malam",
      title: "Lombok 4 Hari / 3 Malam",
      subtitle: "Paket Terlengkap Gili & Lombok",
      category: "package",
      description: "Paket terlengkap untuk merasakan keajaiban Gili Trawangan & Lombok. Dari bawah laut hingga puncak Rinjani!",
      duration: "4 Hari / 3 Malam",
      price: 2200000,
      priceChild: 1500000,
      coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      includes: ["Fast boat PP", "Penginapan 3 malam", "Breakfast", "Snorkeling trip", "Diving intro", "Transport lokal", "Pemandu", "Air mineral"],
      excludes: ["Makan siang & malam", "Trekking Rinjani (Rp 450.000)", "Pengeluaran pribadi", "Tip guide"],
      programs: ["Fast boat", "Snorkeling", "Diving intro", "Island Hopping", "Cultural tour Lombok"],
      itinerary: [
        { day: 1, title: "Arrival", activities: ["Fast boat pagi", "Check in", "Snorkeling sore", "Sunset dinner"] },
        { day: 2, title: "Gili Islands", activities: ["Island Hopping 3 Gili", "Snorkeling turtle point", "Cidomo ride"] },
        { day: 3, title: "Diving & Free", activities: ["Intro dive 1 site", "Free afternoon", "Night market"] },
        { day: 4, title: "Departure", activities: ["Breakfast", "Checkout", "Fast boat balik Bali"] }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 15,
    },
    {
      slug: "honeymoon-gili-trawangan",
      title: "Honeymoon Gili Trawangan",
      subtitle: "Paket Romantis untuk Pasangan",
      category: "package",
      description: "Paket romantis untuk pasangan dengan penginapan bungalow pinggir pantai, private sunset cruise, dan candle dinner.",
      duration: "3 Hari / 2 Malam",
      price: 3500000,
      priceChild: 0,
      coverImage: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80",
      includes: ["Fast boat PP", "Bungalow deluxe 2 malam", "Breakfast", "Private sunset speedboat", "Candle dinner", "Welcome drink"],
      excludes: ["Makan siang", "Pengeluaran pribadi", "Aktivitas tambahan"],
      programs: ["Private sunset cruise", "Candle dinner", "Snorkeling private", "Island tour"],
      itinerary: [
        { day: 1, title: "Arrival & Romance", activities: ["Fast boat", "Check in bungalow", "Welcome drink", "Private sunset cruise", "Candle dinner"] },
        { day: 2, title: "Island Paradise", activities: ["Breakfast", "Snorkeling private", "Free time", "Sunset"] },
        { day: 3, title: "Departure", activities: ["Breakfast", "Checkout", "Fast boat balik"] }
      ],
      isActive: true,
      isFeatured: false,
      maxPax: 2,
    },
  ];

  for (const pkg of packagesData) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: pkg,
    });
  }

  // 3. Create Activities
  const activitiesData = [
    {
      slug: "snorkeling-trip",
      name: "Snorkeling Trip (3 Titik)",
      price: 200000,
      priceChild: 150000,
      duration: "4 jam",
      schedule: ["08:00 - 12:00", "13:00 - 17:00"],
      maxPax: 15,
      category: "snorkeling",
      coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      description: "Jelajahi keindahan bawah laut Gili Trawangan di 3 titik snorkeling terbaik.",
      meetingPoint: "Sama-Sama Reggae, Gili Trawangan",
      includes: ["Snorkeling gear", "Pemandu", "Air mineral"],
      excludes: ["Makan", "Foto underwater"],
      isActive: true,
    },
    {
      slug: "snorkeling-private",
      name: "Snorkeling Private",
      price: 400000,
      priceChild: 300000,
      duration: "3 jam",
      schedule: ["Fleksibel"],
      maxPax: 6,
      category: "snorkeling",
      coverImage: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
      description: "Snorkeling private dengan boat pribadi.",
      meetingPoint: "Sama-Sama Reggae, Gili Trawangan",
      includes: ["Private boat", "Snorkeling gear", "Pemandu"],
      excludes: ["Makan", "Foto"],
      isActive: true,
    },
  ];

  for (const act of activitiesData) {
    await prisma.activity.upsert({
      where: { slug: act.slug },
      update: {},
      create: act,
    });
  }

  // 4. Create FastBoats
  await prisma.fastBoat.create({
    data: {
      name: "Ekajaya Fast Ferry",
      description: "Kapal aluminium 34 meter, 4 mesin Volvo D16 750HP, kapasitas 210 penumpang, kecepatan 35 knot.",
      capacity: 210,
      speed: "35 knot",
      facilities: ["AC", "Sun Deck", "Kursi premium", "TV LCD", "GPS", "Life jacket", "Toilet"],
      schedules: {
        create: [
          { from: "Padang Bai (Bali)", to: "Gili Trawangan", departure: "08:00", arrival: "09:30", price: 350000 },
          { from: "Padang Bai (Bali)", to: "Gili Trawangan", departure: "09:00", arrival: "10:30", price: 350000 },
          { from: "Gili Trawangan", to: "Padang Bai (Bali)", departure: "15:00", arrival: "16:30", price: 350000 },
        ]
      }
    }
  });

  // 5. Create Speedboats
  await prisma.speedboat.create({
    data: {
      name: "Private Speedboat Half Day",
      price: 1200000,
      capacity: 8,
      duration: "4 jam",
      priceUnit: "per trip",
      description: "Charter speedboat pribadi untuk jelajah Gili selama setengah hari.",
      facilities: ["Life jacket", "Snorkeling gear", "Cooler box", "Kapten berpengalaman"],
      routes: ["Gili Trawangan", "Gili Meno", "Gili Air"],
      images: ["https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80"],
      isActive: true,
    }
  });

  // 6. Create Testimonials
  const testimonialsData = [
    { name: "Sarah Johnson", origin: "Sydney, Australia", rating: 5, comment: "Amazing snorkeling experience! The guide was very professional and we saw so many sea turtles. Highly recommended!", date: "Maret 2025" },
    { name: "Budi Santoso", origin: "Jakarta, Indonesia", rating: 5, comment: "Paket 4 hari 3 malam benar-benar worth it! Semua terorganisir dengan baik. Gili Trawangan memang surga!", date: "Februari 2025" },
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t });
  }

  // 7. Create Site Content (FAQ)
  const faqs = [
    { key: "faq-1", group: "faq", value: JSON.stringify({ q: "Bagaimana cara booking paket wisata?", a: "Pilih paket yang diinginkan, isi form booking dengan data diri, lalu lakukan pembayaran melalui metode yang tersedia." }) },
  ];

  for (const f of faqs) {
    await prisma.siteContent.upsert({
      where: { key: f.key },
      update: {},
      create: f,
    });
  }

  // 8. Create Gallery
  const galleryData = [
    { imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", caption: "Keindahan bawah laut Gili", category: "snorkeling" },
    { imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80", caption: "Sunset di Gili Trawangan", category: "package" },
    { imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", caption: "Pulau eksotis", category: "package" },
    { imageUrl: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80", caption: "Honeymoon romantis", category: "package" },
    { imageUrl: "https://images.unsplash.com/photo-1596464522927-14e4eb178b61?w=800&q=80", caption: "Aktivitas liburan", category: "activity" },
    { imageUrl: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=800&q=80", caption: "Perjalanan laut", category: "speedboat" }
  ];

  for (const g of galleryData) {
    await prisma.gallery.create({ data: g });
  }

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
