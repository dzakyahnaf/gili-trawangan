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
  console.log("Clearing existing packages...");
  await prisma.package.deleteMany({});

  const packagesData = [
    {
      slug: "open-trip-lombok",
      title: "Open Trip Lombok",
      subtitle: "Sharing Trip Seru Setiap Weekend",
      category: "tour",
      description: "Paket Open Trip Lombok ini didesain khusus untuk Anda yang ingin menghemat budget traveling sekaligus mendapatkan teman baru dari berbagai daerah. Bersifat sharing trip dan berangkat setiap weekend (Jumat - Minggu).",
      duration: "3 Hari 2 Malam",
      price: 1500000,
      priceChild: 1100000,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-open-Trip-lombok.png",
      includes: [
        "Kalungan Selendang sebagai souvenir penjemputan",
        "2 Malam Menginap di Fizz Hotel (Bintang 2) / Setara",
        "Private AC Transport Standar Pariwisata + Driver + BBM",
        "Makan 3x Sehari Sesuai Program",
        "Snorkeling Sharing di Gili Trawangan & Gili Meno",
        "Boat Trip Pink Beach & Pulau Pasir",
        "Local Guide & Tour Leader profesional",
        "Semua Tiket Masuk Objek Wisata & Parkir",
        "Air Mineral Selama Tour",
        "Dokumentasi Under Water Camera",
        "Protocol Kesehatan (Masker & Hand Sanitizer)"
      ],
      excludes: [
        "Tiket Pesawat PP dari kota asal",
        "Tips Driver/Guide (Sukarela)",
        "Pengeluaran Pribadi (Cidomo, Sepeda, Laundry, dll)"
      ],
      programs: [
        "Explore Pink Beach & Snorkeling Gili Petelu",
        "Snorkeling Gili Trawangan & Gili Meno",
        "Sasak Mandalika Cultural Tour"
      ],
      itinerary: [
        {
          day: 1,
          title: "Pick Up Airport – Tour Pink Beach – Check In Hotel",
          activities: [
            "Penjemputan di Airport Lombok oleh crew kami dengan kalungan selendang tenun sasak",
            "Perjalanan menuju Pelabuhan Tanjung Luar di Lombok Timur",
            "Menyeberang menggunakan perahu charter untuk snorkeling di Gili Gambir (spot terumbu karang indah)",
            "Snorkeling di Gili Petelu dengan jutaan spot ikan hias berwarna-warni",
            "Makan siang ala piknik dengan menu seafood segar langsung disajikan di Pink Beach 1",
            "Explore Bukit Tangsi yang memiliki panorama laut biru spektakuler",
            "Mengunjungi Pink Beach 2 yang berpasir pink lembut bersih",
            "Singgah di Pulau Pasir, fenomena jembatan pasir putih unik di tengah laut",
            "Kembali ke pelabuhan, perjalanan pulang dan makan malam dengan menu Sate Rembiga khas Lombok",
            "Check in hotel, free program"
          ]
        },
        {
          day: 2,
          title: "Snorkeling Gili Trawangan – Gili Meno",
          activities: [
            "Sarapan pagi yang lezat di hotel",
            "Photo stop di spot ikonik Villa Hantu dan Bukit Malimbu dengan view 3 Gili",
            "Menuju Pelabuhan Bangsal/Teluk Nara",
            "Mulai snorkeling trip di Gili Meno (spot patung bawah laut yang legendaris, terumbu karang, & patung)",
            "Berenang bersama penyu ramah di Gili Trawangan",
            "Makan siang di restoran pinggir pantai Gili Trawangan",
            "Waktu bebas untuk menjelajahi Gili Trawangan menggunakan sepeda atau andong cidomo (opsional)",
            "Kembali ke Lombok, singgah di pusat oleh-oleh khas Lombok (kaos, mutiara, madu, dll)",
            "Makan malam romantis menikmati sunset di Pantai Senggigi",
            "Kembali ke hotel, free program"
          ]
        },
        {
          day: 3,
          title: "Check Out Hotel – Sasak Mandalika Tour – Airport",
          activities: [
            "Sarapan pagi dan check out hotel",
            "Mengunjungi Kampung Tenun Sukarara (belajar menenun & berfoto menggunakan baju adat suku Sasak)",
            "Mengunjungi Kampung Adat Sasak Sade (melihat rumah adat berlantai tanah liat & tradisi suku Sasak)",
            "Makan siang nikmat dengan menu Ayam Taliwang khas Lombok",
            "Wisata Pantai Kuta Mandalika dengan pasir berbentuk merica yang bersih",
            "Berfoto di Bukit Seger dengan view Sirkuit Internasional Mandalika dari ketinggian",
            "Mengunjungi Pantai Tanjung Aan yang legendaris & soft tracking di Bukit Merese",
            "Drop ke Airport Lombok, perjalanan selesai dan sampai jumpa di trip selanjutnya!"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 50,
    },
    {
      slug: "one-day-trip-lombok",
      title: "One Day Trip Lombok",
      subtitle: "Pilihan Liburan Hemat 1 Hari Penuh",
      category: "tour",
      description: "One Day Trip Lombok didesain khusus bagi Anda yang memiliki waktu liburan singkat namun ingin merasakan pengalaman terbaik di Lombok. Tersedia beberapa pilihan rute terpopuler yang dapat disesuaikan dengan keinginan Anda.",
      duration: "1 Hari",
      price: 400000,
      priceChild: 300000,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-one-day-Trip-lombok.png",
      includes: [
        "Transportasi AC Pariwisata PP + Driver + BBM",
        "1x Makan Siang dengan menu khas lokal",
        "Tiket Masuk Semua Objek Wisata sesuai rute",
        "Pemandu Wisata lokal profesional / Driver Guide",
        "Air Mineral Selama Tour",
        "Sewa Perahu PP (khusus untuk rute snorkeling/gili)"
      ],
      excludes: [
        "Tiket Pesawat PP dari kota asal",
        "Tips Driver/Guide (Sukarela)",
        "Pengeluaran pribadi di luar program"
      ],
      programs: [
        "Opsi A: Explore Gili Trawangan & Gili Meno",
        "Opsi B: Sasak Tour & Mandalika Area",
        "Opsi C: Explore Pink Beach & Pulau Pasir",
        "Opsi D: Snorkeling Trip Gili Nanggu, Tangkong & Kedis"
      ],
      itinerary: [
        {
          day: 1,
          title: "Opsi A - Explore Gili Trawangan & Gili Meno",
          activities: [
            "Penjemputan di meeting point yang disepakati (Hotel/Airport Lombok)",
            "Perjalanan menyusuri pesisir barat, singgah foto di Villa Hantu & Bukit Malimbu",
            "Menyeberang ke Gili menggunakan perahu charter dari Pelabuhan Bangsal/Teluk Nara",
            "Snorkeling di Gili Meno menikmati spot terumbu karang indah & patung bawah laut romantis",
            "Berenang bersama penyu hijau di Gili Trawangan",
            "Makan siang lezat di restoran pinggir pantai Gili Trawangan",
            "Eksplorasi Gili Trawangan dengan sepeda santai atau menaiki cidomo keliling pulau (opsional)",
            "Kembali ke Pulau Lombok, mampir ke pusat kerajinan dan oleh-oleh khas Lombok",
            "Drop kembali ke hotel atau Airport, tour 1 hari selesai"
          ]
        },
        {
          day: 2,
          title: "Opsi B - Sasak Tour & Mandalika Area",
          activities: [
            "Penjemputan di meeting point (Hotel/Airport Lombok)",
            "Mengunjungi Kampung Tenun Sukarara (mencoba menenun kain tradisional & foto berbusana adat Sasak)",
            "Mengunjungi Desa Adat Sade (menyaksikan kehidupan tradisional suku Sasak asli di rumah bambu kuno)",
            "Makan siang lezat dengan menu Ayam Taliwang pedas manis khas Lombok",
            "Wisata Pantai Kuta Mandalika dengan keunikan pasir putih seukuran biji merica",
            "Menikmati view megah Pertamina Mandalika International Circuit dari atas Bukit Seger",
            "Mengunjungi Pantai Tanjung Aan & tracking ringan ke Bukit Merese menikmati hamparan samudera Hindia",
            "Mampir berbelanja oleh-oleh khas Lombok sebelum diantarkan kembali ke lokasi penjemputan"
          ]
        },
        {
          day: 3,
          title: "Opsi C - Explore Pink Beach, Pulau Pasir & Gili Petelu",
          activities: [
            "Penjemputan pagi di lokasi penjemputan",
            "Perjalanan menuju Lombok Timur, tiba di Pelabuhan Tanjung Luar",
            "Naik perahu snorkeling menuju Gili Gambir & Gili Petelu",
            "Menikmati makan siang menu seafood segar ala piknik langsung di tepi Pink Beach 1",
            "Mendaki Bukit Tangsi menikmati hembusan angin laut dan lanskap menawan",
            "Bermain air di jembatan pasir putih di tengah lautan (Pulau Pasir)",
            "Kembali ke Lombok, singgah di toko oleh-oleh, lalu diantar kembali ke lokasi penjemputan"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 30,
    },
    {
      slug: "menginap-di-gili-trawangan",
      title: "Menginap di Gili Trawangan",
      subtitle: "Rasakan Eksotisme Menginap & Snorkeling di Gili",
      category: "package",
      description: "Paket Over Night Gili Trawangan didesain khusus bagi Anda yang ingin menikmati keindahan eksotis Gili Trawangan secara mendalam, mulai dari keindahan bawah laut hingga suasana malam pulau yang hidup tanpa polusi kendaraan.",
      duration: "3 Hari 2 Malam",
      price: 1450000,
      priceChild: 1050000,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-over-night-gili-trawangan.png",
      includes: [
        "Welcome kalungan Selendang Tenun sasak khas sebagai souvenir",
        "2 Malam Menginap di Hotel pilihan di Gili Trawangan / Lombok",
        "Private AC Transport Standar Pariwisata + Driver + BBM",
        "Makan 3X Sehari (2x Sarapan, 2x Makan Siang, 2x Makan Malam)",
        "Perahu Penyeberangan PP Lombok - Gili Trawangan",
        "Private Snorkeling Trip 3 Spot (Gili Trawangan, Meno, Air) + Alat Lengkap",
        "Pemandu wisata / Local Guide berpengalaman",
        "Semua Tiket Masuk Objek Wisata & Parkir",
        "Air Mineral Selama Tour",
        "Protocol Kesehatan (Masker & Hand Sanitizer)"
      ],
      excludes: [
        "Tiket Pesawat PP",
        "Tips Driver/Guide",
        "Sewa Sepeda/Cidomo di Gili Trawangan"
      ],
      programs: [
        "Sasak Mandalika Cultural Tour",
        "Private Snorkeling 3 Gili & Over Night Gili Trawangan",
        "Shopping & City Tour"
      ],
      itinerary: [
        {
          day: 1,
          title: "Pick Up Airport – Sasak Mandalika Tour – Gili Trawangan",
          activities: [
            "Crew kami menyambut kedatangan Anda di Airport Lombok dengan kalungan selendang tenun Sasak",
            "Mengunjungi Kampung Tenun Sukarara (mencoba menenun & berfoto menggunakan baju adat Lombok)",
            "Mengunjungi Desa Adat Sade (melihat adat istiadat suku Sasak asli)",
            "Makan siang dengan menu lokal di Mandalika resto",
            "Wisata Pantai Kuta Mandalika",
            "Berfoto di Bukit Seger menikmati view Sirkuit Mandalika",
            "Mengunjungi Pantai Tanjung Aan & Bukit Merese menikmati sunset",
            "Menuju Pelabuhan Bangsal/Teluk Nara untuk menyeberang ke Gili Trawangan",
            "Check in hotel pilihan di Gili Trawangan, makan malam romantis di pinggir pantai, free program"
          ]
        },
        {
          day: 2,
          title: "Private Snorkeling Trip 3 Gili – Sunset Cycling",
          activities: [
            "Sarapan pagi di hotel Gili Trawangan",
            "Mulai Private Snorkeling Trip menggunakan Glass Bottom Boat menuju spot patung bawah laut di Gili Meno",
            "Berenang bersama penyu liar di spot penyu Gili Trawangan",
            "Snorkeling melihat terumbu karang indah di Gili Air",
            "Makan siang disajikan di restoran pinggir pantai Gili Air / Meno",
            "Kembali ke Gili Trawangan untuk istirahat",
            "Sore hari bersepeda santai keliling pulau menikmati sunset menawan di Gili Sunset Point",
            "Makan malam seafood segar di pasar malam Gili Trawangan / lokal resto",
            "Menikmati hiburan malam Gili Trawangan, kembali ke hotel"
          ]
        },
        {
          day: 3,
          title: "Gili Trawangan – Mataram City Tour – Airport",
          activities: [
            "Sarapan pagi dan check out hotel",
            "Menyeberang kembali ke Pulau Lombok menggunakan perahu",
            "Mengunjungi pusat oleh-oleh khas Lombok (kerajinan mutiara, madu sumbawa, kaos lombok, dll)",
            "Mataram City Tour mengunjungi landmark kota Mataram",
            "Makan siang menu Ayam Taliwang legendaris",
            "Diantar menuju Airport Lombok untuk kepulangan, trip selesai!"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 40,
    },
    {
      slug: "paket-honeymoon-lombok",
      title: "Paket Honeymoon Lombok",
      subtitle: "Bulan Madu Mewah dan Romantis di Lombok",
      category: "honeymoon",
      description: "Buat momen awal pernikahan Anda tak terlupakan dengan Paket Honeymoon Lombok 3 Hari 2 Malam. Dilengkapi akomodasi romantis dengan dekorasi khusus, romantic candle light dinner di pantai Senggigi, private snorkeling trip, dan destinasi honeymoon terbaik.",
      duration: "3 Hari 2 Malam",
      price: 2000000,
      priceChild: 0,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-honeymoon-Trip-lombok.png",
      includes: [
        "Akomodasi Hotel Romantis 2 Malam + Dekorasi Honeymoon Kamar Khusus",
        "Private AC Transport Pariwisata Standar VIP + Driver + BBM",
        "1x Romantic Candle Light Dinner di pinggir Pantai Senggigi",
        "Private Boat Snorkeling Trip 3 Gili + Dokumentasi Underwater",
        "Makan sesuai program (2x Sarapan, 2x Makan Siang, 2x Makan Malam)",
        "Welcome drink segar & kalungan selendang tenun Sasak",
        "Tiket masuk semua objek wisata & parkir",
        "Air mineral dingin selama tour"
      ],
      excludes: [
        "Tiket Pesawat PP",
        "Tips Driver/Guide (Sukarela)",
        "Pengeluaran pribadi di luar program"
      ],
      programs: [
        "Honeymoon Sasak Mandalika Tour",
        "Private Snorkeling Trip 3 Gili & Romantic Dinner",
        "Shopping khas Lombok & Airport Drop"
      ],
      itinerary: [
        {
          day: 1,
          title: "Penjemputan di Airport – Sasak Mandalika Tour – Romantic Dinner",
          activities: [
            "Penjemputan eksklusif oleh driver-guide ramah kami di Airport Lombok dengan kalungan selendang tenun Sasak",
            "Mengunjungi Kampung Tenun Sukarara (berpose mesra bersama pasangan menggunakan busana adat Sasak Lambung/Pegon)",
            "Mengunjungi Desa Adat Sade (melihat keharmonisan hidup suku adat Sasak)",
            "Makan siang romantis di restoran lokal Mandalika",
            "Mengunjungi Pantai Kuta Mandalika yang indah",
            "Mengabadikan momen bersama pasangan di Bukit Seger berlatar belakang Sirkuit Mandalika",
            "Menikmati sore yang tenang dan sunset indah dari puncak Bukit Merese",
            "Romantic Candle Light Dinner di pinggir Pantai Senggigi dengan desiran ombak syahdu",
            "Check-in hotel pilihan (kamar telah didekorasi romantis bertema Honeymoon), free program"
          ]
        },
        {
          day: 2,
          title: "Private Snorkeling 3 Gili – Sunset Senggigi Beach",
          activities: [
            "Sarapan pagi romantis di hotel",
            "Photo stop di Villa Hantu & Bukit Malimbu menikmati panorama samudera yang luas",
            "Menuju pelabuhan untuk menaiki Private Boat Snorkeling",
            "Snorkeling berdua mengelilingi Gili Meno (spot patung bawah laut & penyu)",
            "Singgah di pulau Gili Trawangan untuk makan siang di restoran pantai yang asri",
            "Waktu bebas menikmati keindahan Gili Trawangan bersama pasangan (sepeda tandem/cidomo opsional)",
            "Kembali ke Lombok, makan malam lezat di restoran tepi pantai Senggigi",
            "Kembali ke hotel, menikmati malam romantis berdua"
          ]
        },
        {
          day: 3,
          title: "Check Out Hotel – Mataram City – Pusat Oleh-oleh – Airport",
          activities: [
            "Sarapan pagi di hotel & check out",
            "Mengunjungi pusat oleh-oleh khas Lombok (mutiara air tawar/laut premium, kaos khas Lombok, madu, dll)",
            "Mengunjungi kota Mataram untuk city tour singkat",
            "Makan siang spesial dengan menu Ayam Taliwang legendaris",
            "Transfer ke Airport Lombok untuk keberangkatan kembali, bulan madu romantis selesai!"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 2,
    },
    {
      slug: "paket-tour-lombok-2-hari-1-malam",
      title: "Paket Tour Lombok 2 Hari 1 Malam",
      subtitle: "Trip Hemat Durasi Singkat Penuh Makna",
      category: "package",
      description: "Paket Tour Lombok 2 Hari 1 Malam sangat diminati oleh wisatawan karena durasinya yang singkat namun memiliki program wisata yang sangat padat dan efisien mencakup destinasi terpopuler di Lombok dengan budget super hemat.",
      duration: "2 Hari 1 Malam",
      price: 870000,
      priceChild: 650000,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Biru-dan-Putih-Ilustrasi-Bunga-Kartu-Ucapan-Terima-Kasih-Untuk-Guru-1.png",
      includes: [
        "Akomodasi Hotel 1 Malam di Area Senggigi / Mataram (Bintang 2/3)",
        "Private AC Transport + Driver ramah + BBM",
        "Makan 3x (1x Sarapan, 2x Makan Siang, 1x Makan Malam)",
        "Tiket Masuk Objek Wisata & Parkir",
        "Air Mineral Dingin Selama Perjalanan"
      ],
      excludes: [
        "Tiket Pesawat PP",
        "Tips Driver/Guide",
        "Sewa alat snorkeling & boat di Gili"
      ],
      programs: [
        "Sasak Mandalika Area Cultural Tour",
        "Explore Pantai Kuta & Bukit Merese",
        "Mataram City Tour & Pusat Oleh-oleh"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival Airport – Sasak Mandalika Tour – Check In Hotel",
          activities: [
            "Penjemputan hangat oleh crew kami di Airport Lombok dengan kalungan selendang tenun Sasak",
            "Mengunjungi Kampung Tenun Sukarara (belajar memintal benang tradisional & foto memakai pakaian adat Sasak)",
            "Mengunjungi Desa Adat Sade (melihat budaya & rumah adat berlantai tanah dicampur kotoran kerbau)",
            "Makan siang dengan menu Ayam Taliwang khas Lombok",
            "Eksplorasi Pantai Kuta Mandalika dengan pasir mericanya",
            "Melihat megahnya Sirkuit Internasional Mandalika dari atas Bukit Seger",
            "Menikmati sunset memukau di Pantai Tanjung Aan / Bukit Merese",
            "Makan malam dengan menu sate rembiga khas Lombok",
            "Check in hotel, free program"
          ]
        },
        {
          day: 2,
          title: "Check Out Hotel – Gili Trawangan Trip – Airport",
          activities: [
            "Sarapan pagi di hotel dan check out",
            "Perjalanan menyusuri jalan pesisir Senggigi yang indah, foto stop di Villa Hantu & Bukit Malimbu",
            "Menuju Pelabuhan untuk menyeberang ke Gili Trawangan menggunakan perahu",
            "Tiba di Gili Trawangan, menikmati snorkeling / berjalan-jalan santai (aktivitas pribadi)",
            "Makan siang disajikan di restoran lokal Gili Trawangan",
            "Kembali ke Lombok, berkunjung ke pusat oleh-oleh khas Lombok (mutiara, kaos lombok, madu, cemilan dll)",
            "Transfer langsung menuju Airport Lombok untuk penerbangan pulang, trip selesai!"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 40,
    },
    {
      slug: "trip-lombok-3-hari-2-malam",
      title: "Trip Lombok 3 Hari 2 Malam",
      subtitle: "Trip Paling Ideal Eksplorasi Lombok",
      category: "package",
      description: "Trip Lombok 3 Hari 2 Malam adalah paket wisata paling ideal dan terpopuler dengan durasi yang sangat pas untuk mengeksplorasi keindahan bawah laut Gili Trawangan serta eksotisme wisata budaya Sasak Mandalika.",
      duration: "3 Hari 2 Malam",
      price: 1422000,
      priceChild: 990000,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-Trip-lombok-3h2m.png",
      includes: [
        "Akomodasi Hotel 2 Malam di Area Senggigi / Mataram",
        "Private AC Transport Standar Pariwisata + Driver + BBM",
        "Makan sesuai program (2x Sarapan, 2x Makan Siang, 2x Makan Malam)",
        "Pemandu Wisata / Driver Guide berpengalaman",
        "Boat PP Lombok - Gili Trawangan",
        "Tiket Masuk Objek Wisata & Biaya Parkir",
        "Air Mineral Selama Perjalanan"
      ],
      excludes: [
        "Tiket Pesawat PP",
        "Tips Driver/Guide",
        "Sewa Sepeda / Alat Snorkeling / Cidomo"
      ],
      programs: [
        "Pick Up Airport & Sasak Mandalika Tour",
        "Explore & Snorkeling 3 Gili (Trawangan, Meno, Air)",
        "Mataram City Tour & Transfer Out"
      ],
      itinerary: [
        {
          day: 1,
          title: "Penjemputan di Airport – Sasak Tour & Mandalika Area",
          activities: [
            "Crew kami menyambut Anda di Airport Lombok dengan kalungan selendang kain tenun Sasak",
            "Mengunjungi Kampung Tenun Sukarara (mencoba menenun & foto berbusana adat Lombok)",
            "Mengunjungi Desa Adat Sade (melihat adat istiadat suku Sasak asli)",
            "Makan siang dengan menu Ayam Taliwang legendaris",
            "Wisata Pantai Kuta Mandalika yang indah",
            "Melihat panorama Sirkuit Mandalika dari atas Bukit Seger",
            "Menikmati keindahan sunset spektakuler di Bukit Merese / Pantai Tanjung Aan",
            "Makan malam dengan menu sate rembiga khas Lombok",
            "Check in hotel, free program"
          ]
        },
        {
          day: 2,
          title: "Explore Gili Trawangan & Gili Meno (Snorkeling Trip)",
          activities: [
            "Sarapan pagi lezat di hotel",
            "Photo stop di Villa Hantu & Bukit Malimbu menikmati panorama laut biru",
            "Menuju Pelabuhan Bangsal/Teluk Nara untuk menyeberang",
            "Snorkeling sharing menikmati keindahan patung bawah laut di Gili Meno",
            "Berenang bersama penyu ramah di Gili Trawangan",
            "Makan siang di restoran pinggir pantai Gili Trawangan",
            "Jelajah pulau Gili Trawangan menggunakan sepeda atau andong cidomo (opsional)",
            "Kembali ke Lombok, berkunjung ke pusat oleh-oleh khas Lombok (kaos, mutiara, madu, dll)",
            "Makan malam romantis di Pantai Senggigi sambil menikmati sunset",
            "Kembali ke hotel, free program"
          ]
        },
        {
          day: 3,
          title: "Check Out Hotel – Mataram City – Airport",
          activities: [
            "Sarapan pagi di hotel dan check out",
            "Mataram City Tour mengunjungi tempat bersejarah & landmark kota Mataram",
            "Belanja oleh-oleh kerajinan khas Lombok yang berkualitas",
            "Makan siang menu lokal yang lezat sebelum ke bandara",
            "Diantar ke Airport Lombok untuk kepulangan, perjalanan selesai!"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 40,
    },
    {
      slug: "liburan-lombok-4-hari-3-malam",
      title: "Liburan Lombok 4 Hari 3 Malam",
      subtitle: "Paket Eksplorasi Lombok Terlengkap",
      category: "package",
      description: "Paket Liburan Lombok 4 Hari 3 Malam sangat cocok bagi Anda yang ingin mengeksplorasi keindahan alam Lombok secara lengkap. Paket ini mencakup rute snorkeling Gili Trawangan, keindahan Pantai Pink Lombok Timur, dan budaya Sasak Mandalika.",
      duration: "4 Hari 3 Malam",
      price: 1900000,
      priceChild: 1350000,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-Trip-lombok-4h3m.png",
      includes: [
        "Akomodasi Hotel 3 Malam di Area Senggigi / Mataram",
        "Private AC Transport Standar Pariwisata + Driver + BBM",
        "Makan sesuai program (3x Sarapan, 3x Makan Siang, 3x Makan Malam)",
        "Boat Charter untuk Tour Pantai Pink & Gili Trawangan",
        "Pemandu Wisata / Local Guide profesional",
        "Tiket Masuk Objek Wisata & Parkir",
        "Air Mineral Dingin Selama Tour"
      ],
      excludes: [
        "Tiket Pesawat PP",
        "Tips Driver/Guide",
        "Pengeluaran pribadi (Cidomo, Sepeda, Laundry)"
      ],
      programs: [
        "Explore Pink Beach & Snorkeling Gili Petelu",
        "Sasak Tour & Mandalika Cultural Area",
        "Snorkeling Gili Trawangan & Gili Meno",
        "Shopping & Airport Transfer"
      ],
      itinerary: [
        {
          day: 1,
          title: "Penjemputan di Airport – Explore Pink Beach – Gili Petelu – Pulau Pasir",
          activities: [
            "Penyambutan hangat di Airport Lombok dengan kalungan selendang kain tenun Sasak",
            "Perjalanan menuju Pelabuhan Tanjung Luar Lombok Timur",
            "Snorkeling menikmati keindahan terumbu karang di Gili Gambir",
            "Snorkeling berenang bersama ikan hias di Gili Petelu",
            "Makan siang ala piknik dengan menu seafood segar langsung di tepi Pink Beach 1",
            "Mendaki Bukit Tangsi menikmati panorama samudra lepas yang memukau",
            "Bermain di Pulau Pasir unik yang hanya muncul saat air laut surut",
            "Kembali ke pelabuhan, perjalanan pulang dan makan malam Sate Rembiga khas Lombok",
            "Check in hotel, free program"
          ]
        },
        {
          day: 2,
          title: "Sasak Tour & Mandalika Area",
          activities: [
            "Sarapan pagi lezat di hotel",
            "Mengunjungi Kampung Tenun Sukarara (mencoba menenun kain tradisional & foto memakai pakaian adat)",
            "Mengunjungi Desa Adat Sade (menyaksikan kehidupan tradisional warga suku Sasak asli)",
            "Makan siang dengan menu Ayam Taliwang khas Lombok",
            "Menikmati Pantai Kuta Mandalika",
            "Berfoto di Bukit Seger menikmati view Sirkuit Mandalika",
            "Soft tracking di Bukit Merese menikmati sunset samudera Hindia yang spektakuler",
            "Makan malam spesial di restoran lokal, kembali ke hotel"
          ]
        },
        {
          day: 3,
          title: "Explore Gili Trawangan & Gili Meno",
          activities: [
            "Sarapan pagi di hotel",
            "Photo stop di Villa Hantu & Bukit Malimbu menikmati panorama laut",
            "Menuju Pelabuhan Bangsal/Teluk Nara untuk menyeberang",
            "Snorkeling di Gili Meno menikmati keindahan terumbu karang & patung bawah laut",
            "Berenang bersama penyu hijau di Gili Trawangan",
            "Makan siang di restoran pantai Gili Trawangan",
            "Explore Gili Trawangan dengan sepeda santai keliling pulau (opsional)",
            "Kembali ke Lombok, makan malam di Pantai Senggigi sambil menikmati sunset",
            "Drop ke hotel, free program"
          ]
        },
        {
          day: 4,
          title: "Mataram City – Oleh-oleh – Airport",
          activities: [
            "Sarapan pagi dan check out hotel",
            "Berkunjung ke pusat oleh-oleh khas Lombok (kerajinan mutiara, kaos lombok, susu kuda liar, dll)",
            "Mengunjungi landmark bersejarah di kota Mataram",
            "Makan siang nikmat sebelum diantar ke bandara",
            "Drop langsung ke Airport Lombok untuk penerbangan pulang, trip selesai!"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 40,
    },
    {
      slug: "wisata-lombok-5-hari-4-malam",
      title: "Paket Wisata Lombok 5 Hari 4 Malam",
      subtitle: "Eksplorasi Super Komplit Lombok & Sembalun Rinjani",
      category: "package",
      description: "Paket Wisata Lombok 5 Hari 4 Malam adalah paket liburan paling komplit untuk menjelajahi seluruh surga tersembunyi di Lombok. Menawarkan pengalaman mengesankan mulai dari snorkeling 3 Gili, Pantai Pink, budaya Sasak, hingga petualangan alam di kaki Gunung Rinjani (Sembalun).",
      duration: "5 Hari 4 Malam",
      price: 2600000,
      priceChild: 1850000,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-Trip-lombok-5h4m.png",
      includes: [
        "Akomodasi Hotel 4 Malam di Senggigi / Mataram",
        "Private AC Transport Standar Pariwisata + Driver + BBM",
        "Makan sesuai program (4x Sarapan, 4x Makan Siang, 4x Makan Malam)",
        "Perahu charter untuk penyeberangan Gili Trawangan & Pantai Pink",
        "Pemandu Wisata profesional / Driver Guide",
        "Tiket Masuk Objek Wisata & Parkir",
        "Air Mineral Dingin Selama Tour"
      ],
      excludes: [
        "Tiket Pesawat PP",
        "Tips Driver/Guide",
        "Pengeluaran pribadi di luar program"
      ],
      programs: [
        "Pick Up Airport & Sasak Mandalika Tour",
        "Explore Gili Trawangan & Gili Meno Snorkeling",
        "Agro Wisata Sembalun Kaki Gunung Rinjani",
        "Tour Pantai Pink & Pulau Pasir Lombok Timur",
        "Shopping & Transfer Out"
      ],
      itinerary: [
        {
          day: 1,
          title: "Penjemputan di Airport – Sasak Tour & Mandalika Area",
          activities: [
            "Penyambutan dengan kalungan selendang tenun Sasak di Airport Lombok oleh crew kami",
            "Mengunjungi Kampung Tenun Sukarara (mencoba menenun & foto berbusana adat Lombok)",
            "Mengunjungi Desa Adat Sade (melihat kehidupan asli suku Sasak di rumah tradisional)",
            "Makan siang di restoran lokal setempat",
            "Wisata Pantai Kuta Mandalika yang indah",
            "Berfoto di Bukit Seger dengan view Sirkuit Mandalika",
            "Menikmati sunset menawan di Bukit Merese / Pantai Tanjung Aan",
            "Makan malam dengan menu Sate Rembiga khas Lombok",
            "Check in hotel, free program"
          ]
        },
        {
          day: 2,
          title: "Explore Gili Trawangan & Gili Meno",
          activities: [
            "Sarapan pagi di hotel",
            "Photo stop di Villa Hantu & Bukit Malimbu",
            "Menyeberang ke Gili menggunakan perahu",
            "Snorkeling menikmati keindahan terumbu karang & patung bawah laut Gili Meno",
            "Berenang bersama penyu di Gili Trawangan",
            "Makan siang lezat disajikan di restoran Gili Trawangan",
            "Keliling Gili Trawangan bersepeda santai atau cidomo (opsional)",
            "Kembali ke Lombok, menikmati sunset dinner di Pantai Senggigi",
            "Drop ke hotel, free program"
          ]
        },
        {
          day: 3,
          title: "Agro Wisata Sembalun Kaki Gunung Rinjani",
          activities: [
            "Sarapan pagi di hotel",
            "Perjalanan menuju Desa Sembalun yang berhawa sejuk di kaki Gunung Rinjani",
            "Singgah di Hutan Pusuk Sembalun menyapa monyet-monyet liar yang bersahabat",
            "Menikmati panorama Bukit Selong dengan pemandangan petak sawah warna-warni memukau",
            "Makan siang di Balenta Resto Sembalun",
            "Bermain dan berfoto di kebun Strawberry yang bisa dipetik sendiri",
            "Menyusuri keindahan taman bunga Sembalun",
            "Kembali ke kota, makan malam di restoran lokal dengan iringan live music",
            "Drop ke hotel, free program"
          ]
        },
        {
          day: 4,
          title: "Tour Pantai Pink & Pulau Pasir",
          activities: [
            "Sarapan pagi di hotel",
            "Perjalanan menuju Pelabuhan Tanjung Luar Lombok Timur",
            "Menaiki perahu menuju Gili Gambir & Gili Petelu untuk snorkeling",
            "Makan siang seafood segar ala piknik disajikan di Pink Beach 1",
            "Explore Bukit Tangsi & bermain pasir lembut di Pantai Pink 2",
            "Mengunjungi Pulau Pasir unik di tengah laut",
            "Kembali ke Lombok, makan malam di lokal resto",
            "Kembali ke hotel, istirahat"
          ]
        },
        {
          day: 5,
          title: "Mataram City – Oleh-oleh – Airport",
          activities: [
            "Sarapan pagi dan check out hotel",
            "Belanja kerajinan mutiara berkualitas & oleh-oleh khas Lombok",
            "City tour singkat di kota Mataram",
            "Makan siang menu Ayam Taliwang sebelum diantar ke Airport Lombok",
            "Drop ke bandara, liburan selesai!"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 40,
    },
    {
      slug: "honeymoon-lombok-2-hari-1-malam",
      title: "Honeymoon Lombok 2 Hari 1 Malam",
      subtitle: "Bulan Madu Singkat Romantis Berkesan",
      category: "honeymoon",
      description: "Paket Honeymoon Lombok 2 Hari 1 Malam kami desain khusus untuk Anda dan pasangan yang ingin menikmati bulan madu romantis penuh kesan di Lombok dalam durasi singkat namun padat dengan fasilitas kamar dekorasi khusus, private boat, dan candle light dinner.",
      duration: "2 Hari 1 Malam",
      price: 2000000,
      priceChild: 0,
      coverImage: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-honeymoon-lombok-2h1m.png",
      includes: [
        "Akomodasi Hotel 1 Malam + Dekorasi Kamar Honeymoon romantis",
        "Private AC Transport Pariwisata Standar VIP + Driver + BBM",
        "Private Boat Snorkeling Trip Gili Trawangan & Gili Meno",
        "1x Romantic Dinner tepi pantai Senggigi",
        "Makan sesuai program (1x Sarapan, 2x Makan Siang, 1x Makan Malam)",
        "Welcome drink segar & kalungan selendang tenun Sasak",
        "Tiket masuk semua objek wisata & parkir",
        "Air mineral selama tour"
      ],
      excludes: [
        "Tiket Pesawat PP",
        "Tips Driver/Guide",
        "Pengeluaran pribadi di luar program"
      ],
      programs: [
        "Private Boat Snorkeling Gili Trawangan & Meno",
        "Romantic Dinner Tepi Pantai",
        "Honeymoon Sasak Mandalika Tour"
      ],
      itinerary: [
        {
          day: 1,
          title: "Pick Up Airport – Explore Gili Trawangan & Gili Meno – Romantic Dinner",
          activities: [
            "Penjemputan eksklusif di Airport Lombok dengan kalungan selendang tenun Sasak",
            "Photo stop di Villa Hantu & Bukit Malimbu",
            "Menuju pelabuhan untuk menaiki Private Boat Snorkeling",
            "Snorkeling berdua bersama pasangan mengelilingi Gili Meno (melihat spot patung bawah laut)",
            "Snorkeling dan berenang bersama penyu di Gili Trawangan",
            "Makan siang romantis di restoran pinggir pantai Gili Trawangan",
            "Kembali ke Lombok, menikmati Romantic Dinner berdua di pinggir pantai Senggigi yang indah",
            "Check-in hotel romantis (kamar telah didekorasi romantis bertema Honeymoon), free program"
          ]
        },
        {
          day: 2,
          title: "Check Out Hotel – Sasak Mandalika Tour – Airport",
          activities: [
            "Sarapan pagi romantis di hotel dan check out",
            "Mengunjungi Kampung Tenun Sukarara (berfoto menggunakan busana adat suku Sasak bersama pasangan)",
            "Mengunjungi Desa Adat Sade (melihat budaya suku Sasak asli)",
            "Makan siang lezat dengan menu Ayam Taliwang khas Lombok",
            "Wisata Pantai Kuta Mandalika",
            "Berfoto dengan pasangan berlatarkan Sirkuit Mandalika dari puncak Bukit Seger",
            "Pantai Tanjung Aan & Bukit Merese menikmati hembusan angin laut romantis",
            "Transfer langsung menuju Airport Lombok untuk penerbangan pulang, trip honeymoon selesai!"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 2,
    }
  ];

  for (const pkg of packagesData) {
    await prisma.package.create({
      data: pkg,
    });
    console.log(`Seeded package: ${pkg.title}`);
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
    { imageUrl: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80", caption: "Underwater Statues Gili Meno", category: "snorkeling" },
    { imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", caption: "Swimming with Sea Turtles", category: "snorkeling" },
    { imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80", caption: "Breathtaking Sunset View", category: "snorkeling" },
    { imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", caption: "White Sand Beaches", category: "package" },
    { imageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80", caption: "Crystal Clear Waters", category: "package" },
    { imageUrl: "https://images.unsplash.com/photo-1546500840-ae38253aba9b?w=800&q=80", caption: "Vibrant Coral Reefs", category: "snorkeling" },
    { imageUrl: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80", caption: "Mount Rinjani Summit", category: "activity" },
    { imageUrl: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80", caption: "Sendang Gile Waterfall", category: "activity" },
    { imageUrl: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&q=80&w=1000", caption: "Kuta Lombok Coastline", category: "activity" }
  ];

  await prisma.gallery.deleteMany({}); // Clear existing to prevent duplicates
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
