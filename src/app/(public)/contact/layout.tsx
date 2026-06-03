import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi RH Tour & Travel untuk booking wisata Gili Trawangan & Lombok. WhatsApp, email, atau kunjungi kantor kami di Sama-Sama Reggae Bar, Gili Trawangan.",
  openGraph: {
    title: "Hubungi Kami | RH Tour & Travel",
    description:
      "Hubungi RH Tour & Travel via WhatsApp, email, atau kunjungi kantor kami di Gili Trawangan.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
