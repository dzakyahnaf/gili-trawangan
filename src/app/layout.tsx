import type { Metadata } from "next";
import { LangProvider } from "@/components/LangProvider";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
