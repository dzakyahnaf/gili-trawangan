import { notFound } from "next/navigation";
import { getActivityBySlug } from "@/app/actions/activity";
import ActivityDetailClient from "@/components/public/ActivityDetailClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getActivityBySlug(slug, "rinjani-tracking");
  if (!pkg) return {};
  return {
    title: `${pkg.name} | Rinjani Tracking`,
    description: pkg.description,
  };
}

export default async function RinjaniDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = await getActivityBySlug(slug, "rinjani-tracking");

  if (!pkg) return notFound();

  // Serialize the Prisma object to a plain object
  const data = {
    id: pkg.id,
    slug: pkg.slug,
    category: pkg.category,
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
    meetingPoint: pkg.meetingPoint ?? "",
  };

  return <ActivityDetailClient data={data} />;
}
