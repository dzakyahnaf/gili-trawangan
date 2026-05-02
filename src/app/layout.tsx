import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LangProvider } from "@/components/LangProvider";
import { type Locale } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "RH Tour & Travel" }],
  openGraph: {
    title: "RH Tour & Travel — Wisata Gili Trawangan",
    description: "Paket wisata terlengkap di Gili Trawangan, Lombok.",
    type: "website",
    locale: "id_ID",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        <LangProvider initialLocale={initialLocale}>{children}</LangProvider>
      </body>
    </html>
  );
}
