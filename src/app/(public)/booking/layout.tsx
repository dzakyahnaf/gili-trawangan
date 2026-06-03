import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Wisata",
  description:
    "Booking paket wisata Gili Trawangan & Lombok secara online. Pilih paket, isi data, bayar — konfirmasi instan. Pembayaran aman via Midtrans.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Booking Wisata | RH Tour & Travel",
    description:
      "Booking paket wisata Gili Trawangan & Lombok secara online. Konfirmasi instan!",
    images: ["/og-image.png"],
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
