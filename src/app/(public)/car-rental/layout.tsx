import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sewa Mobil & Rental Car Lombok",
  description:
    "Layanan sewa mobil dan rental car di Lombok. Airport transfer, private driver, city tour. Tersedia 24 jam, konfirmasi instan via WhatsApp.",
  openGraph: {
    title: "Sewa Mobil & Rental Car Lombok | RH Tour & Travel",
    description:
      "Layanan sewa mobil Lombok 24 jam. Airport transfer, private driver & city tour. Konfirmasi instan!",
    images: ["/og-image.png"],
  },
};

export default function CarRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
