import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fast Boat Bali — Gili Trawangan & Lombok",
  description:
    "Jadwal & harga fast boat dari Bali (Sanur, Padang Bai, Serangan) ke Gili Trawangan & Lombok. Super Scoot, Wijaya Buyuk, D'Camel & lainnya. Mulai Rp 400.000.",
  openGraph: {
    title: "Fast Boat Bali — Gili Trawangan & Lombok | RH Tour & Travel",
    description:
      "Jadwal lengkap fast boat Bali ke Gili Trawangan & Lombok. Booking mudah, harga terjangkau!",
    images: ["/og-image.png"],
  },
};

export default function FastboatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
