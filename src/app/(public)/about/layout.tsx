import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang RH Tour & Travel",
  description:
    "RH Tour & Travel adalah penyedia jasa wisata terpercaya di Gili Trawangan, Lombok. Berpengalaman melayani wisatawan lokal & internasional dengan paket wisata terbaik.",
  openGraph: {
    title: "Tentang RH Tour & Travel — Gili Trawangan",
    description:
      "Penyedia jasa wisata terpercaya di Gili Trawangan, Lombok. Melayani wisatawan lokal & internasional.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
