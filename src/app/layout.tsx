import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="id" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
