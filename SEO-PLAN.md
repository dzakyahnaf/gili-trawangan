Bagus, saya sudah lihat websitenya. Ini jawaban lengkap dan terverifikasi untuk kamu.

---

## ✅ Apakah yang Dikatakan Client Benar?

**Sebagian benar, tapi terminologinya perlu diluruskan.** Ini yang sebenarnya dimaksud:

| Yang Client Sebut | Maksud Sebenarnya |
|---|---|
| **Embed Head** | Google Tag Manager script di `<head>` |
| **Embed Body** | GTM `<noscript>` iframe tepat setelah `<body>` buka |
| **Embed Footer** | ⚠️ Ini **tidak standar** — kemungkinan maksudnya script tambahan (remarketing/conversion pixel) sebelum `</body>`, atau mereka salah paham |
| **Link WA input manual** | Nomor WA di-hardcode langsung, bukan dari database |

> **Catatan penting:** Google Ads **tidak butuh 3 tempat**. Cara paling benar & modern adalah **Google Tag Manager (GTM)** — cukup pasang GTM, lalu semua tag Google Ads dikelola dari dashboard GTM tanpa perlu sentuh kode lagi.

---

## 🏗️ Arsitektur yang Direkomendasikan (Next.js + Vercel)

```
GTM (1x pasang di kode)
 └── Google Ads Global Site Tag
 └── Google Ads Conversion Tracking
 └── Google Analytics GA4
 └── Remarketing Pixel
 └── (tag lain di masa depan)
```

Dengan GTM, client bisa tambah/ubah tag sendiri tanpa minta kamu deploy ulang.

---

## 📁 Implementasi Detail — Next.js App Router

### Langkah 1: Buat GTM Account

1. Buka [tagmanager.google.com](https://tagmanager.google.com)
2. Buat container baru → pilih **Web**
3. Dapatkan **GTM-XXXXXXX** (Container ID)

---

### Langkah 2: Setup Environment Variable

Di Vercel dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Juga buat file `.env.local` di project lokal:
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

### Langkah 3: Buat GTM Component

Buat file baru: `src/components/GoogleTagManager.tsx`

```tsx
// src/components/GoogleTagManager.tsx
import Script from 'next/script'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export function GTMScript() {
  if (!GTM_ID) return null

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  )
}

export function GTMNoScript() {
  if (!GTM_ID) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
```

---

### Langkah 4: Pasang di Root Layout

Edit `src/app/layout.tsx`:

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { GTMScript, GTMNoScript } from '@/components/GoogleTagManager'

export const metadata: Metadata = {
  // ... metadata kamu yang sudah ada
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* ✅ EMBED HEAD — GTM Script */}
        <GTMScript />
      </head>
      <body>
        {/* ✅ EMBED BODY — GTM NoScript fallback */}
        <GTMNoScript />

        {children}

        {/* ✅ "EMBED FOOTER" — kalau client minta script tambahan di sini */}
        {/* Contoh: script khusus sebelum body tutup */}
      </body>
    </html>
  )
}
```

---

### Langkah 5: Setup DataLayer untuk Conversion Tracking

Buat file: `src/lib/gtm.ts`

```typescript
// src/lib/gtm.ts
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// Push event ke GTM DataLayer
export function pushToDataLayer(data: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)
  }
}

// Track page view (untuk SPA navigation)
export function trackPageView(url: string) {
  pushToDataLayer({
    event: 'pageview',
    page: url,
  })
}

// Track konversi booking
export function trackBookingConversion(packageName: string, value: number) {
  pushToDataLayer({
    event: 'booking_conversion',
    package_name: packageName,
    value: value,
    currency: 'IDR',
  })
}

// Track klik WhatsApp
export function trackWAClick(source: string) {
  pushToDataLayer({
    event: 'whatsapp_click',
    source: source,
  })
}
```

Tambahkan type declaration: `src/types/global.d.ts`

```typescript
// src/types/global.d.ts
interface Window {
  dataLayer: Record<string, unknown>[]
}
```

---

### Langkah 6: Track Page Views (Next.js SPA)

⚠️ **Penting untuk Next.js!** Next.js adalah SPA, page navigation tidak reload halaman, jadi GTM tidak otomatis track. Buat component:

```tsx
// src/components/PageViewTracker.tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { trackPageView } from '@/lib/gtm'

export function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    trackPageView(url)
  }, [pathname, searchParams])

  return null
}
```

Pasang di layout, wrap dengan Suspense:

```tsx
// di layout.tsx — tambahkan ini
import { Suspense } from 'react'
import { PageViewTracker } from '@/components/PageViewTracker'

// di dalam <body>:
<Suspense fallback={null}>
  <PageViewTracker />
</Suspense>
```

---

### Langkah 7: WhatsApp Link — Best Practice

```tsx
// src/components/WhatsAppButton.tsx
'use client'

import { trackWAClick } from '@/lib/gtm'

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '6287726633595'
const WA_MESSAGE = encodeURIComponent('Halo RH Tour, saya ingin bertanya tentang paket wisata')

interface WAButtonProps {
  source?: string
  label?: string
}

export function WhatsAppButton({ source = 'general', label = 'Chat WhatsApp' }: WAButtonProps) {
  const handleClick = () => {
    trackWAClick(source) // Track di Google Ads
  }

  return (
    
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {label}
    </a>
  )
}
```

Di `.env.local`:
```
NEXT_PUBLIC_WA_NUMBER=6287726633595
```

> ☝️ **"Input manual"** yang dimaksud client = nomor WA bisa diganti tanpa coding. Solusinya dengan environment variable di Vercel, client cukup hubungi kamu dan kamu ganti di dashboard Vercel — tidak perlu push kode baru.

---

## 🎯 Setup Google Ads di GTM Dashboard

Setelah GTM terpasang di kode, masuk ke GTM dashboard:

1. **Tags** → New → **Google Ads Conversion Tracking**
   - Masukkan Conversion ID & Conversion Label dari Google Ads
   - Trigger: Custom Event `booking_conversion`

2. **Tags** → New → **Google Ads Remarketing**
   - Trigger: All Pages

3. **Tags** → New → **GA4 Configuration**
   - Masukkan Measurement ID (`G-XXXXXXXX`)
   - Trigger: All Pages

---

## 🔍 SEO Best Practice yang Masih Perlu Ditambah

Saya cek websitemu, beberapa hal yang belum optimal:

```tsx
// src/app/layout.tsx — tambahkan ke metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://www.rhtourandtravel.com'),
  
  // ✅ Sudah ada yang ini
  title: 'RH Tour & Travel — Wisata Gili Trawangan',
  description: 'Paket wisata terlengkap...',

  // ❌ Belum ada — tambahkan ini:
  alternates: {
    canonical: 'https://www.rhtourandtravel.com',
    languages: {
      'id-ID': '/id',
      'en-US': '/en',
    },
  },
  openGraph: {
    images: [
      {
        url: '/og-image.jpg', // buat gambar 1200x630px
        width: 1200,
        height: 630,
        alt: 'RH Tour & Travel Gili Trawangan',
      },
    ],
  },
  // Verifikasi Google Search Console
  verification: {
    google: 'XXXXXXXXXXXXXXXX', // dari Google Search Console
  },
}
```

Tambahkan juga `src/app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.rhtourandtravel.com', priority: 1 },
    { url: 'https://www.rhtourandtravel.com/packages', priority: 0.9 },
    { url: 'https://www.rhtourandtravel.com/snorkeling', priority: 0.8 },
    { url: 'https://www.rhtourandtravel.com/fastboat', priority: 0.8 },
    // ... halaman lainnya
  ]
}
```

Dan `src/app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.rhtourandtravel.com/sitemap.xml',
  }
}
```

---

## 📋 Checklist Deploy

- [ ] GTM Container ID sudah di Vercel env vars
- [ ] WA Number sudah di Vercel env vars
- [ ] `GTMScript` & `GTMNoScript` terpasang di layout
- [ ] `PageViewTracker` terpasang di layout
- [ ] Google Ads tag dikonfigurasi di GTM dashboard
- [ ] GTM sudah di-**Publish** (bukan hanya save)
- [ ] Test dengan GTM Preview mode sebelum publish
- [ ] Submit sitemap ke Google Search Console
- [ ] Verifikasi domain di Google Search Console

---

**Kesimpulan:** Cara client mendeskripsikan (head/body/footer) itu terminologi umum yang benar secara konsep, tapi implementasi terbaik untuk Next.js adalah via **GTM + `next/script`** — bukan hardcode script manual. Ini lebih maintainable dan client bisa update tag Google Ads sendiri kapan pun tanpa perlu deploy ulang.