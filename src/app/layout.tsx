import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { LangProvider } from "@/components/LangProvider";
import { type Locale } from "@/lib/i18n";
import { GTMScript, GTMNoScript } from "@/components/GoogleTagManager";
import { PageViewTracker } from "@/components/PageViewTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rhtourandtravel.com"),
  title: {
    default: "RH Tour & Travel — Wisata Gili Trawangan",
    template: "%s | RH Tour & Travel",
  },
  description:
    "Paket wisata terlengkap di Gili Trawangan, Lombok. Snorkeling, diving, island hopping, fast boat & speedboat charter. Booking mudah, harga terjangkau!",
  keywords: [
    "Gili Trawangan",
    "wisata Lombok",
    "snorkeling Gili",
    "fast boat Bali Gili",
    "tour Gili Trawangan",
    "RH Tour Travel",
    "paket wisata Lombok",
    "speedboat charter Gili",
    "diving Gili Trawangan",
    "island hopping Gili",
  ],
  authors: [{ name: "RH Tour & Travel" }],
  icons: {
    icon: "/logos/logo-boat.png",
    shortcut: "/logos/logo-boat.png",
    apple: "/logos/logo-boat.png",
  },
  alternates: {
    canonical: "https://www.rhtourandtravel.com",
  },
  openGraph: {
    title: "RH Tour & Travel — Wisata Gili Trawangan",
    description:
      "Paket wisata terlengkap di Gili Trawangan, Lombok. Snorkeling, fast boat, speedboat charter & island tour.",
    type: "website",
    locale: "id_ID",
    url: "https://www.rhtourandtravel.com",
    siteName: "RH Tour & Travel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RH Tour & Travel — Wisata Gili Trawangan, Lombok",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RH Tour & Travel — Wisata Gili Trawangan",
    description:
      "Paket wisata terlengkap di Gili Trawangan, Lombok. Snorkeling, fast boat & speedboat charter.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFY || "mjhkhV_nSwPJqrsXnnagdN3kQe2ScA91Dt8qPWhF2fI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout(
  props: { children: React.ReactNode }
) {
  const cookieStore = await cookies();
  const initialLocale = (cookieStore.get("NEXT_LOCALE")?.value || "id") as Locale;
  const { children } = props;

  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logos/logo-boat.png" type="image/png" />
        <link rel="shortcut icon" href="/logos/logo-boat.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logos/logo-boat.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        {/* GTM NoScript fallback — must be first in body */}
        <GTMNoScript />

        <LangProvider initialLocale={initialLocale}>{children}</LangProvider>

        {/* GTM Script — placed in body per Next.js 16 best practice */}
        <GTMScript />

        {/* SPA page view tracker for GTM */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </body>
    </html>
  );
}
