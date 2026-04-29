# 🌊 RH Tour & Travel — Gili Trawangan Travel Website
## PROJECT PLAN & TECHNICAL DOCUMENTATION

> **Versi:** 1.1.0  
> **Dibuat:** 2026  
> **Next.js:** 16.2 (latest stable)  
> **Client:** RH Tour & Travel  
> **Kontak:** WA +6287793082501 | Email: rhtourandtravel3003@gmail.com  
> **Meeting Point:** Sama-Sama Reggae Bar, Gili Trawangan

---

## 📋 DAFTAR ISI

1. [Overview Proyek](#1-overview-proyek)
2. [Tech Stack](#2-tech-stack)
3. [Struktur Folder](#3-struktur-folder)
4. [Database Schema](#4-database-schema)
5. [Halaman & Fitur Frontend](#5-halaman--fitur-frontend)
6. [Konten Website (Seed Data)](#6-konten-website-seed-data)
7. [API Routes Backend](#7-api-routes-backend)
8. [Sistem Booking & Payment (Midtrans)](#8-sistem-booking--payment-midtrans)
9. [CMS Admin Panel](#9-cms-admin-panel)
10. [Environment Variables](#10-environment-variables)
11. [Deployment Guide](#11-deployment-guide)
12. [Alur Kerja Developer](#12-alur-kerja-developer)
13. [Panduan Admin Panel](#13-panduan-admin-panel)
14. [Maintenance & Support](#14-maintenance--support)

---

## 1. OVERVIEW PROYEK

### Deskripsi
Website travel lengkap untuk wisata di **Gili Trawangan, Lombok** yang menyediakan:
- Informasi paket wisata (snorkeling, diving, island hopping, dll)
- Halaman Fast Boat & Speedboat dengan jadwal & harga real
- Sistem booking real-time dengan integrasi **Midtrans payment gateway**
- CMS admin panel untuk kelola seluruh konten
- Konfirmasi booking otomatis via Email

### Tujuan Bisnis
- Memudahkan wisatawan memesan aktivitas & transportasi ke Gili Trawangan
- Memberikan pengalaman booking yang smooth, transparan & terpercaya
- Memudahkan operator (RH Tour & Travel) mengelola booking & konten mandiri

### Meeting Point
**Sama-Sama Reggae Bar, Gili Trawangan**
- Koordinat: `-8.3521, 116.0267` (di pesisir utara Gili Trawangan)
- Google Maps: https://maps.google.com/?q=Sama+Sama+Reggae+Gili+Trawangan
- Embed Maps wajib tampil di halaman Contact & setiap halaman paket wisata

---

## 2. TECH STACK

| Layer | Teknologi | Versi / Keterangan |
|---|---|---|
| Frontend | **Next.js 16.2** (App Router) | Latest stable — Turbopack default, React 19.2, Cache Components |
| Language | TypeScript | Strict mode, native TS config (`next.config.ts`) |
| Styling | Tailwind CSS v4 + shadcn/ui | CSS-first config (no `tailwind.config.js`), design system |
| Bundler | **Turbopack** (stable) | Default di Next.js 16, 5-10x faster Fast Refresh |
| React | **React 19.2** | View Transitions, useEffectEvent, Activity component |
| React Compiler | Built-in (stable) | Auto-memoization, zero manual `useMemo`/`useCallback` |
| Backend | Next.js API Routes (Route Handlers) | Serverless, co-located di `app/api/` |
| Network Proxy | `proxy.ts` | Pengganti Middleware di Next.js 16 |
| Database | PostgreSQL via **Supabase** | Managed DB, free tier |
| ORM | **Prisma 6** | Type-safe query builder |
| Auth (Admin) | **Auth.js v5** (NextAuth) | JWT session, Prisma adapter |
| Storage | **Cloudinary** | Upload & optimize gambar |
| Payment | **Midtrans Snap** | Indonesia payment gateway |
| Email | Nodemailer + Gmail SMTP | Notifikasi booking otomatis |
| Deploy FE | **Vercel** | Auto-deploy dari GitHub, edge network |
| Deploy DB | **Supabase** | PostgreSQL managed + Realtime |
| Maps | Google Maps Embed API | Meeting point map |

### ⚠️ Breaking Changes Next.js 16 yang Perlu Diperhatikan

1. **`params` & `searchParams` sekarang async** — wajib `await props.params`
   ```typescript
   // ✅ Next.js 16 (benar)
   export default async function Page(props: PageProps<'/packages/[slug]'>) {
     const { slug } = await props.params
     // ...
   }
   // ❌ Next.js 14 (tidak lagi valid)
   export default function Page({ params }: { params: { slug: string } }) { ... }
   ```

2. **`proxy.ts` menggantikan `middleware.ts`** untuk network boundary (redirect, rewrite, auth guard). Gunakan `proxy.ts` di root project.

3. **Cache Components** — caching sekarang opt-in menggunakan `use cache` directive, bukan implicit. Semua page/layout/API route bersifat **dynamic by default**.

4. **Turbopack File System Caching** (stable di 16.1) — aktif otomatis, compile restart jauh lebih cepat.

5. **React Compiler** — aktifkan di `next.config.ts` untuk auto-memoization:
   ```typescript
   const nextConfig = {
     reactCompiler: true, // ← stable di Next.js 16
   }
   ```

---

## 3. STRUKTUR FOLDER

```
rh-gili-travel/
├── app/                          # Next.js 16 App Router
│   ├── (public)/                 # Public pages layout
│   │   ├── page.tsx              # Landing page / Home
│   │   ├── activities/           # Halaman listing aktivitas
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx   # Detail aktivitas (async params!)
│   │   ├── packages/             # Paket wisata
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx   # async props.params
│   │   ├── fastboat/
│   │   │   └── page.tsx
│   │   ├── speedboat/
│   │   │   └── page.tsx
│   │   ├── booking/
│   │   │   ├── page.tsx          # Form booking
│   │   │   ├── payment/page.tsx  # Midtrans Snap
│   │   │   └── status/page.tsx   # Status booking
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── (admin)/                  # Admin panel layout
│   │   ├── admin/
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── packages/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── activities/
│   │   │   ├── fastboats/
│   │   │   ├── speedboats/
│   │   │   ├── gallery/
│   │   │   ├── testimonials/
│   │   │   └── content/
│   ├── api/                      # Route Handlers (Next.js 16)
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── bookings/route.ts
│   │   ├── bookings/[id]/route.ts
│   │   ├── bookings/status/[code]/route.ts
│   │   ├── packages/route.ts
│   │   ├── packages/[id]/route.ts
│   │   ├── activities/route.ts
│   │   ├── fastboats/route.ts
│   │   ├── speedboats/route.ts
│   │   ├── payment/
│   │   │   ├── create/route.ts
│   │   │   └── webhook/route.ts  # Midtrans webhook
│   │   ├── upload/route.ts       # Cloudinary upload
│   │   └── send-email/route.ts
│   ├── globals.css               # Tailwind v4 CSS-first config
│   └── layout.tsx                # Root layout
├── proxy.ts                      # ⭐ Next.js 16: menggantikan middleware.ts
│                                 # Gunakan untuk auth guard admin routes
├── components/
│   ├── ui/                       # shadcn/ui base components
│   ├── public/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PackageCard.tsx
│   │   ├── ActivityCard.tsx
│   │   ├── BookingForm.tsx
│   │   ├── AvailabilityCalendar.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── FAQSection.tsx
│   │   ├── FastBoatScheduleTable.tsx
│   │   └── MeetingPointMap.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── DataTable.tsx
│       ├── ImageUploader.tsx
│       └── RichTextEditor.tsx
├── lib/
│   ├── prisma.ts
│   ├── midtrans.ts
│   ├── cloudinary.ts
│   ├── email.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── images/
│   └── logo/
├── types/
│   └── index.ts
├── .env.local
├── next.config.ts                # ⭐ TypeScript config (native di Next.js 16)
└── package.json
```

---

## 4. DATABASE SCHEMA

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== AUTH ====================
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  createdAt DateTime @default(now())
}

// ==================== PAKET WISATA ====================
model Package {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String    // "Lombok 4 Days/3 Nights"
  subtitle      String?
  description   String    @db.Text
  duration      String    // "4 Hari / 3 Malam"
  price         Int       // dalam Rupiah
  priceChild    Int?      // harga anak-anak
  currency      String    @default("IDR")
  coverImage    String    // Cloudinary URL
  images        String[]  // array of Cloudinary URLs
  includes      String[]  // apa yang termasuk
  excludes      String[]  // apa yang tidak termasuk
  itinerary     Json      // array of ItineraryDay
  programs      String[]  // list program/aktivitas
  isActive      Boolean   @default(true)
  isFeatured    Boolean   @default(false)
  maxPax        Int       @default(20)
  category      String    // "package" | "activity" | "tour"
  bookings      Booking[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// Contoh struktur itinerary (JSON):
// [
//   { "day": 1, "title": "Arrival & Welcome", "activities": ["Check in hotel", "Snorkeling sunset"] },
//   { "day": 2, "title": "Island Hopping", "activities": ["Gili Meno", "Gili Air", "Turtle spotting"] }
// ]

// ==================== AKTIVITAS ====================
model Activity {
  id          String    @id @default(cuid())
  slug        String    @unique
  name        String    // "Snorkeling Trip", "Diving", "Island Hopping"
  description String    @db.Text
  price       Int
  priceChild  Int?
  duration    String    // "4 jam", "Full Day"
  coverImage  String
  images      String[]
  includes    String[]
  excludes    String[]
  schedule    String[]  // ["08:00 - 12:00", "13:00 - 17:00"]
  maxPax      Int       @default(15)
  isActive    Boolean   @default(true)
  category    String    // "snorkeling" | "diving" | "island-hopping" | "sunset" | "fishing"
  meetingPoint String  @default("Sama-Sama Reggae, Gili Trawangan")
  bookings    Booking[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// ==================== FAST BOAT ====================
model FastBoat {
  id          String    @id @default(cuid())
  name        String    // "Ekajaya Fast Ferry", "BlueWater Express"
  slug        String    @unique
  description String    @db.Text
  capacity    Int
  speed       String    // "35 knot"
  facilities  String[]  // ["AC", "Sun Deck", "Life Jacket", "GPS", "TV/LCD"]
  images      String[]
  isActive    Boolean   @default(true)
  schedules   FastBoatSchedule[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model FastBoatSchedule {
  id          String    @id @default(cuid())
  fastBoat    FastBoat  @relation(fields: [fastBoatId], references: [id])
  fastBoatId  String
  from        String    // "Padang Bai (Bali)"
  to          String    // "Gili Trawangan"
  departure   String    // "08:00"
  arrival     String    // "09:30"
  price       Int       // Rupiah
  priceChild  Int?
  isActive    Boolean   @default(true)
  bookings    Booking[]
  createdAt   DateTime  @default(now())
}

// ==================== SPEEDBOAT ====================
model Speedboat {
  id          String    @id @default(cuid())
  name        String    // "Private Speedboat Charter"
  slug        String    @unique
  description String    @db.Text
  capacity    Int       // maks penumpang
  price       Int       // harga per trip/hari
  priceUnit   String    @default("per trip") // "per trip" | "per hari"
  duration    String    // "4 jam", "Full Day"
  facilities  String[]
  routes      String[]  // destinasi yang bisa dituju
  images      String[]
  isActive    Boolean   @default(true)
  bookings    Booking[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// ==================== BOOKING ====================
model Booking {
  id              String    @id @default(cuid())
  bookingCode     String    @unique // RH-2025-XXXXX
  
  // Customer Info
  customerName    String
  customerEmail   String
  customerPhone   String
  customerAddress String?
  nationality     String?
  
  // Booking Detail
  type            String    // "package" | "activity" | "fastboat" | "speedboat"
  packageId       String?
  activityId      String?
  fastBoatScheduleId String?
  speedboatId     String?
  
  package         Package?  @relation(fields: [packageId], references: [id])
  activity        Activity? @relation(fields: [activityId], references: [id])
  fastBoatSchedule FastBoatSchedule? @relation(fields: [fastBoatScheduleId], references: [id])
  speedboat       Speedboat? @relation(fields: [speedboatId], references: [id])
  
  bookingDate     DateTime  // tanggal aktivitas/keberangkatan
  adults          Int       @default(1)
  children        Int       @default(0)
  specialRequest  String?   @db.Text
  
  // Pricing
  subtotal        Int
  discount        Int       @default(0)
  total           Int
  currency        String    @default("IDR")
  
  // Payment
  paymentStatus   String    @default("pending") // pending | paid | failed | cancelled | refunded
  paymentMethod   String?   // "credit_card" | "bca_va" | "gopay" | "qris" | dsb
  midtransOrderId String?   @unique
  midtransToken   String?
  paidAt          DateTime?
  
  // Booking Status
  status          String    @default("pending") // pending | confirmed | cancelled | completed
  confirmedAt     DateTime?
  cancelledAt     DateTime?
  notes           String?   @db.Text // catatan admin
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// ==================== GALLERY ====================
model Gallery {
  id          String    @id @default(cuid())
  imageUrl    String
  caption     String?
  category    String    // "snorkeling" | "diving" | "beach" | "hotel" | "island"
  isActive    Boolean   @default(true)
  order       Int       @default(0)
  createdAt   DateTime  @default(now())
}

// ==================== TESTIMONIAL ====================
model Testimonial {
  id          String    @id @default(cuid())
  name        String
  origin      String    // "Jakarta, Indonesia"
  avatar      String?
  rating      Int       // 1-5
  comment     String    @db.Text
  date        String    // "Januari 2025"
  isActive    Boolean   @default(true)
  isVerified  Boolean   @default(false)
  createdAt   DateTime  @default(now())
}

// ==================== SITE CONTENT ====================
model SiteContent {
  id      String  @id @default(cuid())
  key     String  @unique // "hero_title", "hero_subtitle", "faq_1_q", "faq_1_a"
  value   String  @db.Text
  type    String  // "text" | "html" | "json"
  group   String  // "hero" | "faq" | "about" | "contact"
  updatedAt DateTime @updatedAt
}

// ==================== AVAILABILITY ====================
model Availability {
  id          String    @id @default(cuid())
  productId   String    // packageId atau activityId
  productType String    // "package" | "activity"
  date        DateTime
  maxSlots    Int
  bookedSlots Int       @default(0)
  isBlocked   Boolean   @default(false) // admin bisa blokir tanggal
  createdAt   DateTime  @default(now())
}
```

---

## 5. HALAMAN & FITUR FRONTEND

### 5.1 Landing Page (`/`)

**Sections:**
1. **Hero Section** — Full-screen background video/foto Gili Trawangan, headline, subheadline, 2 CTA button ("Lihat Paket Wisata" + "Pesan Fast Boat")
2. **Stats Bar** — "500+ Happy Travelers", "10+ Aktivitas", "4.9★ Rating"
3. **Featured Packages** — 3 kartu paket unggulan (card dengan foto, judul, durasi, harga, tombol booking)
4. **Activities Section** — Grid 6 aktivitas (Snorkeling, Diving, Island Hopping, Sunset Cruise, Fishing, Glass Bottom Boat)
5. **Why Choose Us** — 4 keunggulan (Safety First, Expert Guide, Best Price, 24/7 Support)
6. **Gallery** — Masonry grid foto-foto wisata (minimum 9 foto)
7. **Testimonials** — Carousel review customer
8. **Meeting Point Map** — Google Maps embed Sama-Sama Reggae + alamat + WA button
9. **FAQ Section** — Accordion FAQ umum
10. **Footer** — Kontak, Navigasi, Sosmed, Metode Pembayaran

### 5.2 Halaman Paket Wisata (`/packages`)

**Listing:**
- Filter berdasarkan durasi (1 Hari, 2D1N, 3D2N, 4D3N)
- Sort: Harga, Rating, Popularitas
- Card: foto, judul, durasi, harga/orang, tag aktivitas, tombol "Lihat Detail"

**Detail Paket (`/packages/[slug]`):**
- Foto utama + gallery carousel
- Judul, durasi, harga
- Deskripsi lengkap
- **Program** (list aktivitas yang termasuk)
- **Itinerary per Hari** (accordion per hari)
- **Include / Exclude** (2 kolom)
- Sidebar booking: pilih tanggal, jumlah dewasa, jumlah anak, total harga otomatis
- Tombol "Book Now" → redirect ke `/booking`
- Sticky CTA di mobile

### 5.3 Halaman Aktivitas (`/activities`)

Sama struktur dengan paket, tapi lebih fokus ke:
- Jadwal aktivitas (pagi/sore)
- Durasi (jam)
- Kapasitas grup
- Meeting point (Sama-Sama Reggae)

### 5.4 Halaman Fast Boat (`/fastboat`)

**Konten yang tampil:**
- Search/Filter form: Dari → Ke → Tanggal
- **Tabel Jadwal** (lihat Seed Data di Bab 6)
- Card per operator boat:
  - Nama Boat
  - Deskripsi singkat
  - Rute & jadwal unggulan
  - Kapasitas & kecepatan
  - Foto kapal
  - Fasilitas (icon-based)
  - Harga per orang
  - Tombol "Pesan Sekarang"

**Operator yang tampil (data pre-seed):**
1. **Ekajaya Fast Ferry** — Mulai Rp 280.000
2. **BlueWater Express** — Mulai Rp 350.000
3. **Gili Getaway** — Mulai Rp 300.000
4. **Gili Gili Fast Boat** — Mulai Rp 275.000
5. **Golden Queen Fastboat** — Mulai Rp 290.000
6. **Karuniya Luxury Fast Boat** — Mulai Rp 500.000

### 5.5 Halaman Speedboat (`/speedboat`)

**Konten:**
- Hero banner speedboat charter
- Card paket speedboat:
  - **Private Speedboat Charter (Half Day)** — 4 jam, maks 10 pax
  - **Private Speedboat Charter (Full Day)** — 8 jam, maks 10 pax
  - **Speedboat Island Hopping** — 5 jam, Gili Trawangan + Gili Meno + Gili Air
  - **Sunset Speedboat Cruise** — 2 jam
- Rute yang bisa dipilih
- Fasilitas (snorkeling gear, cooler box, life jacket)
- Form inquiry/booking

### 5.6 Halaman Booking (`/booking`)

**Step 1 — Pilih Produk:**
- Pilih jenis: Paket / Aktivitas / Fast Boat / Speedboat
- Dropdown pilih produk spesifik
- Kalender ketersediaan (highlight tanggal available)

**Step 2 — Detail Pemesan:**
- Nama lengkap, Email, No HP (WA), Kewarganegaraan
- Jumlah dewasa & anak-anak
- Permintaan khusus / catatan
- Ringkasan order + total harga

**Step 3 — Pembayaran:**
- Tombol "Bayar Sekarang" → trigger Midtrans Snap popup
- Pilihan bayar: Transfer Bank, VA, GoPay, QRIS, Kartu Kredit
- Loading state saat menunggu konfirmasi

**Step 4 — Konfirmasi:**
- Halaman sukses dengan booking code
- Email konfirmasi otomatis terkirim ke customer
- Tombol "Cek Status Booking"

### 5.7 Halaman Status Booking (`/booking/status`)

- Input booking code atau cek via email
- Tampilkan: status booking, detail produk, tanggal, jumlah pax, status pembayaran
- Timeline: Booking Dibuat → Pembayaran → Konfirmasi → Selesai

### 5.8 Halaman About & Contact

**About:**
- Cerita singkat RH Tour & Travel
- Nilai-nilai perusahaan
- Tim (opsional foto)

**Contact:**
- Form kontak (nama, email, pesan)
- Info kontak: WA +6287793082501, Email rhtourandtravel3003@gmail.com
- **Google Maps Embed** Sama-Sama Reggae Gili Trawangan
- Jam operasional

---

## 6. KONTEN WEBSITE (SEED DATA)

### 6.1 Paket Wisata

#### Paket 1: Gili Trawangan Day Trip
- **Durasi:** 1 Hari
- **Harga:** Rp 350.000/orang
- **Deskripsi:** Nikmati Gili Trawangan dalam sehari penuh, mulai dari snorkeling di spot terbaik hingga menikmati sunset yang memukau.
- **Program:** Snorkeling 3 titik, Naik cidomo, Makan siang seafood lokal, Sunset di pantai
- **Include:** Transfer perahu PP dari Bangsal, snorkeling equipment, pemandu, makan siang, air mineral
- **Exclude:** Minuman beralkohol, penginapan, tiket masuk Gili Trawangan (jika ada)
- **Itinerary:**
  - 07:30 — Kumpul di Meeting Point (Sama-Sama Reggae)
  - 08:00 — Snorkeling titik 1 (Biorock)
  - 09:30 — Snorkeling titik 2 (Turtle Point)
  - 11:00 — Snorkeling titik 3 (Sunset Reef)
  - 12:30 — Makan siang di restoran lokal
  - 14:00 — Free time, jelajah pulau naik cidomo
  - 17:00 — Nonton sunset di pantai barat
  - 18:00 — Kembali ke meeting point, selesai

#### Paket 2: Lombok 2 Hari / 1 Malam
- **Durasi:** 2 Hari / 1 Malam
- **Harga:** Rp 850.000/orang
- **Deskripsi:** Paket hemat nikmati keindahan Gili Trawangan semalam, lengkap dengan snorkeling, island hopping, dan penginapan.
- **Program:** Snorkeling, Island Hopping (3 Gili), Penginapan, Breakfast
- **Include:** Fast boat PP Bali-Gili Trawangan, penginapan 1 malam (twin share), breakfast, snorkeling trip, pemandu wisata
- **Exclude:** Makan siang & makan malam, minuman, pengeluaran pribadi
- **Itinerary:**
  - **Hari 1:**
    - 07:00 — Jemput di hotel Bali (opsional add-on)
    - 08:00 — Keberangkatan fast boat dari Padang Bai
    - 09:30 — Tiba di Gili Trawangan, check in penginapan
    - 11:00 — Snorkeling trip 3 titik
    - 13:00 — Makan siang (mandiri)
    - 14:00 — Island Hopping Gili Meno & Gili Air
    - 17:30 — Sunset di pantai barat
    - 19:00 — Makan malam bebas di strip Gili Trawangan
  - **Hari 2:**
    - 07:30 — Sarapan di penginapan
    - 09:00 — Free activity / eksplor pulau
    - 11:00 — Check out & packing
    - 11:25 — Fast boat balik ke Bali
    - 13:00 — Tiba di Padang Bai / Serangan

#### Paket 3: Lombok 4 Hari / 3 Malam ⭐ (Featured)
- **Durasi:** 4 Hari / 3 Malam
- **Harga:** Rp 2.200.000/orang
- **Deskripsi:** Paket terlengkap untuk merasakan keajaiban Gili Trawangan & Lombok. Dari bawah laut yang jernih hingga puncak Rinjani, semua bisa!
- **Program:** Fast boat, Snorkeling, Diving intro, Island Hopping, Rinjani Trekking (opsional), Waterfall tour, Cultural tour Lombok
- **Include:** Fast boat PP, penginapan 3 malam, breakfast, snorkeling trip, diving intro 1 dive, semua transport lokal, pemandu, air mineral
- **Exclude:** Makan siang & makan malam, aktivitas opsional (trekking Rinjani Rp 450.000), pengeluaran pribadi, tip guide
- **Itinerary:**
  - **Hari 1 (Arrival):** Fast boat pagi, check in, snorkeling sore, sunset dinner
  - **Hari 2 (Gili Islands):** Island Hopping 3 Gili, snorkeling turtle point, cidomo ride, beach bar
  - **Hari 3 (Diving & Free):** Intro dive 1 site, free afternoon, night market Gili Trawangan
  - **Hari 4 (Departure):** Breakfast, checkout, fast boat balik Bali

#### Paket 4: Honeymoon Gili Trawangan (3D2N)
- **Durasi:** 3 Hari / 2 Malam
- **Harga:** Rp 3.500.000/pasang
- **Deskripsi:** Paket romantis untuk pasangan dengan penginapan bungalow pinggir pantai, private sunset cruise, dan candle dinner.
- **Include:** Fast boat PP, bungalow deluxe 2 malam, breakfast, private sunset speedboat 2 jam, candle dinner, welcome drink, bunga kamar

### 6.2 Aktivitas

| # | Nama | Harga | Durasi | Jadwal | Kapasitas |
|---|------|-------|--------|--------|-----------|
| 1 | Snorkeling Trip (3 Titik) | Rp 200.000/org | 4 jam | 08:00 & 13:00 | 15 pax |
| 2 | Snorkeling Private | Rp 400.000/org | 3 jam | Fleksibel | 6 pax |
| 3 | Intro Diving (1 Dive) | Rp 550.000/org | 3 jam | 08:00 & 13:30 | 6 pax |
| 4 | Fun Diving (2 Dives) | Rp 750.000/org | 4 jam | 08:00 | 4 pax |
| 5 | Island Hopping 3 Gili | Rp 250.000/org | 5 jam | 09:00 | 20 pax |
| 6 | Sunset Cruise | Rp 300.000/org | 2 jam | 17:00 | 15 pax |
| 7 | Glass Bottom Boat | Rp 150.000/org | 2 jam | 10:00 & 14:00 | 12 pax |
| 8 | Sea Turtle Watching | Rp 175.000/org | 2 jam | 08:00 & 14:00 | 10 pax |
| 9 | Fishing Trip | Rp 350.000/org | 4 jam | 05:00 & 15:00 | 8 pax |
| 10 | Night Snorkeling | Rp 300.000/org | 2 jam | 19:00 | 8 pax |

### 6.3 Fast Boat — Data Real

#### A. Ekajaya Fast Ferry
- **Deskripsi:** Kapal aluminium 34 meter, 4 mesin Volvo D16 750HP, kapasitas 210 penumpang, kecepatan 35 knot. Beroperasi sejak lama dengan catatan keselamatan terbaik.
- **Fasilitas:** AC, Sun Deck, Kursi premium, TV LCD/DVD, GPS, Radio kapal-darat, Life raft, Fire extinguisher, Toilet, Life jacket
- **Harga:** Mulai Rp 280.000/orang (one way)

**Jadwal Ekajaya (Rute Gili Trawangan):**

| Dari | Ke | Berangkat | Tiba | Harga (est.) |
|------|----|-----------|------|--------------|
| Padang Bai (Bali) | Gili Trawangan | 08:00 | 09:30 | Rp 350.000 |
| Padang Bai (Bali) | Gili Trawangan | 09:00 | 10:30 | Rp 350.000 |
| Padang Bai (Bali) | Gili Trawangan | 12:30 | 14:30 | Rp 350.000 |
| Serangan (Bali) | Gili Trawangan | 08:00 | 11:15 | Rp 400.000 |
| Serangan (Bali) | Gili Trawangan | 14:30 | 17:00 | Rp 400.000 |
| Gili Trawangan | Padang Bai (Bali) | 09:00 | 10:30 | Rp 350.000 |
| Gili Trawangan | Padang Bai (Bali) | 10:00 | 12:00 | Rp 350.000 |
| Gili Trawangan | Padang Bai (Bali) | 15:00 | 16:30 | Rp 350.000 |
| Gili Trawangan | Serangan (Bali) | 11:00 | 14:30 | Rp 400.000 |
| Gili Trawangan | Serangan (Bali) | 11:45 | 16:45 | Rp 400.000 |

#### B. BlueWater Express
- **Deskripsi:** Didirikan 2005, pioneer rute Bali–Gili Islands sejak 2006. Catatan keselamatan 100%, mengutamakan keamanan, profesionalisme, dan kepuasan tamu.
- **Fasilitas:** AC, Sun Deck, Kursi nyaman, Toilet, Life jacket, GPS Navigation, Staff profesional

**Jadwal BlueWater Express (Rute Gili Trawangan):**

| Dari | Ke | Berangkat | Tiba |
|------|----|-----------|------|
| Padang Bai (Bali) | Gili Trawangan | 08:00 | 09:30 |
| Padang Bai (Bali) | Gili Trawangan | 12:15 | 13:45 |
| Serangan (Bali) | Gili Trawangan | 08:00 | 11:00 |
| Serangan (Bali) | Gili Trawangan | 11:00 | 13:45 |
| Gili Trawangan | Padang Bai (Bali) | 09:55 | 12:25 |
| Gili Trawangan | Padang Bai (Bali) | 11:25 | 13:55 |
| Gili Trawangan | Serangan (Bali) | 11:25 | 14:55 |
| Gili Trawangan | Serangan (Bali) | 14:10 | 17:55 |

> ⚠️ Jadwal dapat berubah sesuai kondisi cuaca. Konfirmasi selalu via WA/Email.

### 6.4 Speedboat (Private Charter)

| Nama Paket | Harga | Kapasitas | Durasi |
|------------|-------|-----------|--------|
| Private Speedboat Half Day | Rp 1.200.000/trip | Maks 8 pax | 4 jam |
| Private Speedboat Full Day | Rp 2.000.000/trip | Maks 8 pax | 8 jam |
| Island Hopping 3 Gili (Private) | Rp 1.500.000/trip | Maks 10 pax | 5 jam |
| Sunset Speedboat Cruise | Rp 800.000/trip | Maks 8 pax | 2 jam |
| Snorkeling Speedboat Trip | Rp 1.000.000/trip | Maks 8 pax | 4 jam |

**Rute tersedia:** Gili Trawangan, Gili Meno, Gili Air, Bangsal, Pink Beach, Senggigi

**Fasilitas:** Life jacket, Snorkeling gear (tersedia), Cooler box, Kapten berpengalaman

---

## 7. API ROUTES BACKEND

### 7.1 Bookings API

```
GET    /api/bookings                # Semua booking (admin only)
GET    /api/bookings/[id]           # Detail booking
POST   /api/bookings                # Buat booking baru
PUT    /api/bookings/[id]           # Update status booking (admin)
DELETE /api/bookings/[id]           # Hapus booking (admin)
GET    /api/bookings/status/[code]  # Cek status booking by code (public)
```

### 7.2 Packages & Activities API

```
GET    /api/packages                # List semua paket (public)
GET    /api/packages/[slug]         # Detail paket (public)
POST   /api/packages                # Buat paket (admin)
PUT    /api/packages/[id]           # Update paket (admin)
DELETE /api/packages/[id]           # Hapus paket (admin)

GET    /api/activities              # List aktivitas (public)
GET    /api/activities/[slug]       # Detail aktivitas (public)
POST   /api/activities              # Buat aktivitas (admin)
PUT    /api/activities/[id]         # Update (admin)
DELETE /api/activities/[id]         # Hapus (admin)
```

### 7.3 Fast Boat & Speedboat API

```
GET    /api/fastboats               # List fast boat (public)
GET    /api/fastboats/[slug]        # Detail + jadwal (public)
GET    /api/fastboats/search        # Cari jadwal (from, to, date)
POST   /api/fastboats               # Buat (admin)
PUT    /api/fastboats/[id]          # Update (admin)

GET    /api/speedboats              # List speedboat (public)
POST   /api/speedboats              # Buat (admin)
PUT    /api/speedboats/[id]         # Update (admin)
```

### 7.4 Payment API (Midtrans)

```
POST   /api/payment/create          # Buat transaksi, return snap_token
POST   /api/payment/webhook         # Terima notifikasi Midtrans (status update)
GET    /api/payment/status/[orderId] # Cek status transaksi
```

### 7.5 Availability API

```
GET    /api/availability?productId=xxx&productType=package&month=2025-07
POST   /api/availability            # Buat/update slot (admin)
```

### 7.6 Upload & Content API

```
POST   /api/upload                  # Upload gambar ke Cloudinary
GET    /api/content                 # Ambil semua site content
PUT    /api/content/[key]           # Update konten (admin)
GET    /api/gallery                 # List galeri (public)
POST   /api/gallery                 # Upload galeri (admin)
DELETE /api/gallery/[id]            # Hapus foto galeri (admin)
GET    /api/testimonials            # List testimonial (public)
POST   /api/testimonials            # Buat testimonial (admin)
```

---

## 8. SISTEM BOOKING & PAYMENT (MIDTRANS)

### 8.1 Flow Booking

```
Customer isi form
    ↓
POST /api/bookings → generate bookingCode (RH-2025-XXXXX)
    ↓
POST /api/payment/create → Midtrans buat transaksi → return snap_token
    ↓
Frontend tampilkan Midtrans Snap popup (modal payment)
    ↓
Customer bayar (VA/GoPay/QRIS/CC)
    ↓
Midtrans kirim webhook ke POST /api/payment/webhook
    ↓
Update paymentStatus = "paid", status = "confirmed"
    ↓
Kirim email konfirmasi ke customer (Nodemailer)
    ↓
Admin mendapat notifikasi WA/Email (opsional)
```

### 8.2 Implementasi Midtrans (`lib/midtrans.ts`)

```typescript
import midtransClient from 'midtrans-client';

export const snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === 'production',
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

// Contoh buat transaksi
export async function createTransaction(booking: Booking) {
  const parameter = {
    transaction_details: {
      order_id: booking.midtransOrderId,
      gross_amount: booking.total,
    },
    customer_details: {
      first_name: booking.customerName,
      email: booking.customerEmail,
      phone: booking.customerPhone,
    },
    item_details: [
      {
        id: booking.packageId || booking.activityId,
        price: booking.total,
        quantity: 1,
        name: 'Booking - RH Tour & Travel',
      }
    ],
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/status`,
    }
  };
  
  return await snap.createTransaction(parameter);
}
```

### 8.3 Email Template (Nodemailer)

```typescript
// lib/email.ts
export async function sendBookingConfirmation(booking: Booking) {
  const html = `
    <h2>Booking Confirmed! 🎉</h2>
    <p>Halo ${booking.customerName},</p>
    <p>Booking Anda telah dikonfirmasi dengan detail:</p>
    <ul>
      <li>Kode Booking: <strong>${booking.bookingCode}</strong></li>
      <li>Tanggal: ${booking.bookingDate}</li>
      <li>Total: Rp ${booking.total.toLocaleString('id-ID')}</li>
      <li>Meeting Point: Sama-Sama Reggae, Gili Trawangan</li>
    </ul>
    <p>📍 Meeting Point Maps: https://maps.google.com/?q=Sama+Sama+Reggae+Gili+Trawangan</p>
    <p>📱 WhatsApp: +6287793082501</p>
    <p>📧 Email: rhtourandtravel3003@gmail.com</p>
  `;
  
  await transporter.sendMail({
    from: '"RH Tour & Travel" <rhtourandtravel3003@gmail.com>',
    to: booking.customerEmail,
    subject: `Konfirmasi Booking ${booking.bookingCode} - RH Tour & Travel`,
    html,
  });
}
```

### 8.4 Webhook Handler

```typescript
// app/api/payment/webhook/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  
  // Verifikasi signature Midtrans
  const signatureKey = crypto
    .createHash('sha512')
    .update(`${body.order_id}${body.status_code}${body.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
    .digest('hex');
  
  if (signatureKey !== body.signature_key) {
    return new Response('Invalid signature', { status: 403 });
  }
  
  if (body.transaction_status === 'capture' || body.transaction_status === 'settlement') {
    await prisma.booking.update({
      where: { midtransOrderId: body.order_id },
      data: {
        paymentStatus: 'paid',
        status: 'confirmed',
        paymentMethod: body.payment_type,
        paidAt: new Date(),
      }
    });
    
    // Kirim email konfirmasi
    const booking = await prisma.booking.findUnique({
      where: { midtransOrderId: body.order_id }
    });
    if (booking) await sendBookingConfirmation(booking);
  }
  
  return new Response('OK', { status: 200 });
}
```

---

## 9. CMS ADMIN PANEL

### 9.1 Login Admin (`/admin/login`)

- Form email + password
- NextAuth credentials provider
- Session JWT, expire 8 jam
- Protected routes dengan middleware

### 9.2 Dashboard (`/admin/dashboard`)

Tampilkan:
- Total booking bulan ini
- Booking pending (butuh konfirmasi)
- Revenue bulan ini
- Chart booking per minggu (Recharts)
- 5 booking terbaru

### 9.3 Manajemen Booking (`/admin/bookings`)

**List View:**
- Tabel: Kode, Nama, Produk, Tanggal, Pax, Total, Status Bayar, Status Booking, Aksi
- Filter: Status, Tanggal, Produk
- Export CSV

**Detail Booking:**
- Semua info customer & booking
- Tombol: Konfirmasi / Batalkan / Tandai Selesai
- Ubah status manual
- Tambah catatan admin
- Kirim ulang email konfirmasi

### 9.4 CRUD Paket Wisata (`/admin/packages`)

Form fields:
- Judul, Slug (auto-generate)
- Kategori, Durasi
- Deskripsi (rich text editor - TipTap atau Quill)
- Harga (dewasa & anak)
- Upload foto utama + galeri (drag & drop, upload ke Cloudinary)
- Include / Exclude (tag input)
- Program (tag input)
- Itinerary builder (per hari: add day, input aktivitas per hari)
- Toggle: Active, Featured
- Kapasitas maks

### 9.5 CRUD Fast Boat & Speedboat

**Fast Boat:**
- Info dasar boat (nama, deskripsi, kapasitas, kecepatan)
- Upload foto-foto boat
- Fasilitas (checklist)
- **Jadwal Management:** Tabel jadwal dengan CRUD per jadwal (dari-ke-jam-harga)

**Speedboat:**
- Info paket, harga, kapasitas, durasi
- Fasilitas, rute

### 9.6 Galeri (`/admin/gallery`)

- Drag & drop upload multiple foto
- Assign kategori per foto
- Atur urutan tampil (drag reorder)
- Toggle active/inactive

### 9.7 Konten Halaman (`/admin/content`)

Edit langsung dari dashboard:
- Hero title & subtitle
- About text
- FAQ (Q&A pairs, add/delete)
- Testimonial (nama, komentar, rating, asal)

---

## 10. ENVIRONMENT VARIABLES

Buat file `.env.local` di root project:

```env
# Database (Supabase)
DATABASE_URL="postgresql://USER:PASSWORD@db.supabase.co:5432/DATABASE"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Midtrans
MIDTRANS_SERVER_KEY="SB-Mid-server-xxxxxxxxxxxx"   # Sandbox
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="SB-Mid-client-xxxxxxxxxxxx"
# Production:
# MIDTRANS_SERVER_KEY="Mid-server-xxxxxxxxxxxx"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (Gmail SMTP)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="rhtourandtravel3003@gmail.com"
EMAIL_PASS="your-gmail-app-password"  # Gunakan App Password, bukan password utama

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## 11. DEPLOYMENT GUIDE

### 11.1 Setup Database Supabase

1. Buat akun di https://supabase.com
2. Buat project baru → catat `DATABASE_URL`
3. `npx prisma db push` — sinkronkan schema ke Supabase
4. `npx prisma db seed` — isi data awal (paket, aktivitas, jadwal boat)

### 11.2 Setup Cloudinary

1. Buat akun https://cloudinary.com
2. Dashboard → Settings → catat Cloud Name, API Key, API Secret
3. Buat upload preset `rh-travel` (unsigned, untuk upload dari admin)

### 11.3 Setup Midtrans

1. Daftar https://dashboard.midtrans.com
2. Mode Sandbox untuk development, Production untuk live
3. Settings → Access Keys → catat Server Key & Client Key
4. Settings → Configuration → Notification URL: `https://yourdomain.com/api/payment/webhook`

### 11.4 Setup Gmail App Password

1. Buka Google Account → Security → 2-Step Verification (aktifkan)
2. Security → App Passwords → buat password untuk "Mail"
3. Gunakan password ini di `EMAIL_PASS`

### 11.5 Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables di Vercel Dashboard
# Project → Settings → Environment Variables → paste semua dari .env.local
```

### 11.6 Konfigurasi `next.config.ts` (TypeScript Native)

```typescript
// next.config.ts  ← bukan .js di Next.js 16
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,           // auto-memoization stable
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  experimental: {
    cacheComponents: true,       // Cache Components / PPR
  },
}

export default nextConfig
```

### 11.7 `proxy.ts` — Auth Guard Admin (Pengganti Middleware)

```typescript
// proxy.ts (di root project, Next.js 16)
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { ProxyConfig } from 'next/proxy'

export default {
  async redirect(request) {
    const session = await auth()
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = request.nextUrl.pathname === '/admin/login'

    if (isAdminRoute && !isLoginPage && !session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (isLoginPage && session) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  },
  matcher: ['/admin/:path*'],
} satisfies ProxyConfig
```

### 11.8 Contoh Dynamic Page dengan Async Params (Next.js 16)

```typescript
// app/(public)/packages/[slug]/page.tsx
import type { PageProps } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

// ⭐ Next.js 16: props.params sekarang async
export default async function PackageDetailPage(
  props: PageProps<'/packages/[slug]'>
) {
  const { slug } = await props.params  // ← wajib await

  const pkg = await prisma.package.findUnique({
    where: { slug, isActive: true },
  })

  if (!pkg) notFound()

  return <div>{/* render UI */}</div>
}

// Gunakan generateStaticParams untuk SSG
export async function generateStaticParams() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    select: { slug: true },
  })
  return packages.map(p => ({ slug: p.slug }))
}
```

### 11.9 Cache Components (Opsional — Optimasi Performa)

```typescript
// Contoh menggunakan Cache Components untuk data statis
// (jadwal fast boat tidak berubah tiap request)

// app/(public)/fastboat/page.tsx
import { unstable_cache as cache } from 'next/cache'

const getSchedules = cache(
  async () => prisma.fastBoatSchedule.findMany({ where: { isActive: true } }),
  ['fastboat-schedules'],
  { revalidate: 3600 } // revalidate tiap 1 jam
)

export default async function FastBoatPage() {
  const schedules = await getSchedules()
  return <FastBoatScheduleTable schedules={schedules} />
}
```

### 11.10 Setup Domain (Opsional)

1. Beli domain di Niagahoster/Namecheap
2. Vercel → Project → Settings → Domains → Add domain
3. Update DNS records sesuai instruksi Vercel

---

## 12. ALUR KERJA DEVELOPER

### 12.1 Setup Project Lokal

```bash
# Init project dengan Next.js 16 (latest)
npx create-next-app@latest rh-gili-travel --typescript --tailwind --app --turbopack
cd rh-gili-travel

# Install dependencies
npm install prisma @prisma/client @auth/prisma-adapter next-auth@beta
npm install midtrans-client nodemailer cloudinary
npm install @tiptap/react @tiptap/starter-kit     # Rich text editor
npm install recharts                               # Chart admin
npm install react-day-picker                       # Kalender booking
npm install react-dropzone                         # Upload foto
npm install bcryptjs                               # Hash password admin
npm install zod react-hook-form @hookform/resolvers
npm install @types/nodemailer @types/bcryptjs

# Setup Prisma
npx prisma init
# Edit schema di prisma/schema.prisma (lihat Bab 4)
npx prisma generate
npx prisma db push

# Setup shadcn/ui (Tailwind v4 compatible)
npx shadcn@latest init
npx shadcn@latest add button card input form table badge dialog

# Setup React Compiler (opsional tapi direkomendasikan)
# Tambah di next.config.ts:
# reactCompiler: true

# Generate TypeScript page types (fitur baru Next.js 16)
npx next typegen

# Jalankan dev server (Turbopack aktif otomatis)
npm run dev
```

### 12.2 Urutan Pengerjaan yang Disarankan

```
Sprint 1 (3-4 hari):
├── Setup project Next.js 16.2 + Tailwind v4 + shadcn/ui
├── DB schema Prisma + Supabase, seed data
├── Landing Page UI (Hero, Packages, Activities, Gallery, Testimonial, FAQ, Footer)
└── Navbar + Footer + proxy.ts auth guard

Sprint 2 (3-4 hari):
├── Halaman Packages listing & detail (async params ✓)
├── Halaman Activities
├── Halaman Fast Boat (tabel jadwal + Cache Component)
└── Halaman Speedboat

Sprint 3 (3-4 hari):
├── Form Booking multi-step
├── Availability Calendar
├── Integrasi Midtrans Snap
└── Halaman Status Booking + Webhook handler

Sprint 4 (3-4 hari):
├── Auth.js v5 admin login + proxy.ts guard
├── Admin Dashboard + Booking management
├── CRUD Packages & Activities
└── CRUD Fast Boat & Schedules

Sprint 5 (2-3 hari):
├── Cloudinary image upload
├── Gallery & Testimonial management
├── Site Content CRUD (hero, FAQ)
└── Email konfirmasi (Nodemailer)

Sprint 6 (2-3 hari):
├── npx next typegen → generate type-safe page types
├── React Compiler aktifkan + performance audit
├── Testing (booking flow, payment, email, mobile)
└── Deploy Vercel + Supabase production
```

### 12.3 Konvensi Koding

- **Naming:** camelCase untuk variables/functions, PascalCase untuk components
- **Folder:** feature-based di `components/`, flat di `lib/`
- **API Response:**
  ```typescript
  // Success
  { success: true, data: {...} }
  // Error
  { success: false, error: "message" }
  ```
- **Booking Code Format:** `RH-YYYY-XXXXX` (e.g. `RH-2025-A8K2M`)
- **Harga selalu dalam Rupiah (integer)**
- **Semua tanggal dalam ISO 8601 (UTC)**

---

## 13. PANDUAN ADMIN PANEL

### Login
- URL: `https://yourdomain.com/admin/login`
- Gunakan email & password yang sudah dibuat saat setup

### Menambah Paket Wisata Baru
1. Masuk Admin → Paket Wisata → Tambah Baru
2. Isi semua field (judul, harga, deskripsi)
3. Upload foto (drag & drop, minimal 3 foto)
4. Tambahkan Include/Exclude (tekan Enter setelah tiap item)
5. Bangun Itinerary per hari menggunakan Itinerary Builder
6. Klik Simpan → otomatis aktif di website

### Konfirmasi Booking
1. Admin → Booking → cari booking dengan status "Pending"
2. Klik detail booking
3. Jika pembayaran sudah masuk → klik "Konfirmasi"
4. Customer otomatis mendapat email konfirmasi
5. Ubah status ke "Completed" setelah trip selesai

### Upload Foto Galeri
1. Admin → Galeri → Tambah Foto
2. Drag & drop foto (bisa multiple sekaligus)
3. Assign kategori (snorkeling, beach, island, dll)
4. Atur urutan dengan drag reorder
5. Toggle active untuk tampilkan/sembunyikan di homepage

---

## 14. MAINTENANCE & SUPPORT

### Bug Fixing
- Periode: 30 hari setelah go-live
- Lapor via WA +6287793082501 atau email
- Response time: maks 24 jam
- Hotfix untuk bug kritis: maks 4 jam

### Backup Database
- Supabase otomatis backup harian
- Export manual: Admin Supabase → Table Editor → Export

### Update Jadwal Boat
- Admin → Fast Boat → pilih operator → kelola Jadwal
- Klik tambah/edit/hapus jadwal
- Perubahan langsung tampil di website

### Monitoring
- Vercel Analytics untuk traffic
- Midtrans Dashboard untuk payment
- Supabase Dashboard untuk database

---

## 📞 KONTAK KLIEN

| Info | Detail |
|------|--------|
| Bisnis | RH Tour & Travel |
| WhatsApp | +6287793082501 |
| Email | rhtourandtravel3003@gmail.com |
| Meeting Point | Sama-Sama Reggae Bar, Gili Trawangan |
| Koordinat | -8.3521, 116.0267 |

---

> **Catatan untuk Developer:**
> - Gunakan **Next.js 16.2** (`npx create-next-app@latest`). Jangan downgrade ke v14/v15.
> - `params` dan `searchParams` **wajib di-await** di semua dynamic routes (breaking change v16).
> - Gunakan `proxy.ts` bukan `middleware.ts` untuk auth guard.
> - `next.config.ts` (TypeScript) bukan `.js`.
> - Selalu gunakan environment sandbox Midtrans selama development.
> - Jangan pernah commit `.env.local` ke Git. Gunakan `.env.example` sebagai template.
> - Jalankan `npx next typegen` setelah setup untuk auto-generate type-safe page types.

*Dokumentasi ini dibuat oleh AI Developer Assistant — update sesuai kebutuhan tim.*