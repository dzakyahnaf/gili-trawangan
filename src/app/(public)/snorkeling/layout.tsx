import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snorkeling Tour Gili Trawangan",
  description:
    "Paket snorkeling terbaik di Gili Trawangan. Snorkeling sharing & private, kunjungi 3 Gili Islands, berenang bersama penyu, dan lihat patung bawah laut. Mulai Rp 150.000.",
  openGraph: {
    title: "Snorkeling Tour Gili Trawangan | RH Tour & Travel",
    description:
      "Paket snorkeling terbaik di Gili Trawangan. Sharing & private trip ke 3 Gili Islands. Berenang bersama penyu!",
    images: ["/og-image.png"],
  },
};

export default function SnorkelingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
