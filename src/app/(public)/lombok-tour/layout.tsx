import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paket Tour Lombok",
  description:
    "Paket tour Lombok lengkap: one day trip, 2 hari 1 malam, honeymoon, hingga 5 hari 4 malam. Kunjungi pantai Kuta Lombok, Sasak, air terjun & destinasi terbaik.",
  openGraph: {
    title: "Paket Tour Lombok | RH Tour & Travel",
    description:
      "Paket tour Lombok lengkap dari one day trip hingga 5D4N. Pantai, budaya & petualangan!",
    images: ["/og-image.png"],
  },
};

export default function LombokTourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
