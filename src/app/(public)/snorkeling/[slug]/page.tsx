import { notFound } from "next/navigation";
import { getSnorkelingPackageBySlug } from "@/app/actions/snorkeling";
import SnorkelingDetailClient from "./SnorkelingDetailClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getSnorkelingPackageBySlug(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} | RH Tour Snorkeling`,
    description: pkg.description,
  };
}

export default async function SnorkelingDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = await getSnorkelingPackageBySlug(slug);

  if (!pkg) return notFound();

  // Serialize the Prisma object to a plain object (itinerary is Json type)
  const data = {
    id: pkg.id,
    slug: pkg.slug,
    name: pkg.name,
    nameEn: pkg.nameEn ?? "",
    description: pkg.description,
    descriptionEn: pkg.descriptionEn ?? "",
    highlights: pkg.highlights,
    highlightsEn: pkg.highlightsEn,
    itinerary: pkg.itinerary as { time?: string; title: string; desc?: string }[],
    itineraryEn: pkg.itineraryEn as { time?: string; title: string; desc?: string }[],
    includes: pkg.includes,
    includesEn: pkg.includesEn,
    excludes: pkg.excludes,
    excludesEn: pkg.excludesEn,
    price: pkg.price,
    priceUSD: pkg.priceUSD,
    duration: pkg.duration,
    coverImage: pkg.coverImage,
  };

  return <SnorkelingDetailClient data={data} />;
}
