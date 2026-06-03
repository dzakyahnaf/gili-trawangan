import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rinjani Trekking & Tracking",
  description:
    "Paket trekking Gunung Rinjani, Lombok. Summit trek 2D1N, 3D2N, 4D3N. Pemandangan danau Segara Anak, sunrise di puncak 3.726 mdpl. Guide profesional & peralatan lengkap.",
  openGraph: {
    title: "Rinjani Trekking & Tracking | RH Tour & Travel",
    description:
      "Paket trekking Gunung Rinjani Lombok. Summit trek dengan guide profesional & peralatan lengkap.",
    images: ["/og-image.png"],
  },
};

export default function RinjaniTrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
