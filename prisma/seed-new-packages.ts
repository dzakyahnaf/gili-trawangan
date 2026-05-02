import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding new packages...");

  const newPackages = [
    {
      slug: "booking-trip-1-hari",
      title: "Booking Trip 1 Hari",
      subtitle: "Jelajah Gili Trawangan Sehari Penuh",
      category: "tour",
      description: "Paket trip 1 hari penuh untuk menjelajahi keindahan Gili Trawangan, cocok bagi Anda yang memiliki waktu liburan singkat namun ingin pengalaman maksimal.",
      duration: "1 Hari",
      price: 300000,
      priceChild: 200000,
      coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      includes: ["Pemandu lokal", "Makan siang", "Sepeda keliling pulau", "Air mineral"],
      excludes: ["Penginapan", "Transportasi ke pelabuhan", "Pengeluaran pribadi"],
      programs: ["Keliling pulau", "Snorkeling spot", "Makan siang seafood", "Sunset point"],
      itinerary: [
        { day: 1, title: "Day Trip", activities: ["08:00 — Berkumpul di meeting point", "09:00 — Bersepeda keliling pulau", "11:00 — Snorkeling", "13:00 — Makan siang", "15:00 — Free time & relaksasi", "17:00 — Menikmati sunset", "18:00 — Trip selesai"] }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 15,
    },
    {
      slug: "booking-trip-3-hari-2-malam",
      title: "Booking Trip 3 Hari 2 Malam",
      subtitle: "Liburan Ideal di Gili Trawangan",
      category: "package",
      description: "Paket liburan 3 hari 2 malam yang dirancang khusus untuk memberikan pengalaman liburan yang santai namun berkesan di Gili Trawangan.",
      duration: "3 Hari / 2 Malam",
      price: 1500000,
      priceChild: 1000000,
      coverImage: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
      includes: ["Fast boat PP", "Penginapan 2 malam", "Breakfast", "Snorkeling trip 3 spot", "Pemandu wisata"],
      excludes: ["Makan siang & makan malam", "Minuman beralkohol", "Pengeluaran pribadi"],
      programs: ["Snorkeling 3 spot", "Island Hopping", "Waktu bebas bersantai"],
      itinerary: [
        { day: 1, title: "Kedatangan & Bersantai", activities: ["08:00 — Penyeberangan Fast boat", "09:30 — Tiba di Gili Trawangan & Check-in", "12:00 — Waktu bebas", "17:30 — Menikmati sunset"] },
        { day: 2, title: "Eksplorasi Bawah Laut", activities: ["08:00 — Sarapan", "09:30 — Snorkeling Trip 3 Spot", "13:00 — Makan siang (Personal expense)", "15:00 — Island Hopping", "18:00 — Kembali ke penginapan"] },
        { day: 3, title: "Kepulangan", activities: ["08:00 — Sarapan", "10:00 — Waktu bebas & beli oleh-oleh", "11:00 — Check-out", "11:30 — Fast boat kembali"] }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 20,
    }
  ];

  for (const pkg of newPackages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
    console.log(`Seeded package: ${pkg.title}`);
  }

  console.log("Finished seeding new packages.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
