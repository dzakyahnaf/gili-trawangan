import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Speedboat & Car Charter Lombok",
  description:
    "Charter speedboat privat dan sewa mobil di Lombok & Gili Trawangan. Half day, full day, sunset cruise, airport transfer. Harga mulai Rp 850.000.",
  openGraph: {
    title: "Private Speedboat & Car Charter | RH Tour & Travel",
    description:
      "Charter speedboat privat & sewa mobil di Lombok. Half day, full day & sunset cruise.",
    images: ["/og-image.png"],
  },
};

export default function PrivateSpeedboatCarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
