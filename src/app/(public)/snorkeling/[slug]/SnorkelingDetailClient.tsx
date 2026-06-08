"use client";

import ServiceDetailTemplate from "@/components/public/ServiceDetailTemplate";
import { useLang } from "@/components/LangProvider";

interface SnorkelingData {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  highlights: string[];
  highlightsEn: string[];
  itinerary: { time?: string; title: string; desc?: string }[];
  itineraryEn: { time?: string; title: string; desc?: string }[];
  includes: string[];
  includesEn: string[];
  excludes: string[];
  excludesEn: string[];
  price: number;
  priceUSD: number | null;
  duration: string;
  coverImage: string;
}

export default function SnorkelingDetailClient({ data }: { data: SnorkelingData }) {
  const { locale } = useLang();
  const isEn = locale === "en";

  // Build the localized props to pass to ServiceDetailTemplate
  const localizedData = {
    title: isEn && data.nameEn ? data.nameEn : data.name,
    description: isEn && data.descriptionEn ? data.descriptionEn : data.description,
    price: isEn
      ? data.priceUSD
        ? `US$ ${data.priceUSD}`
        : `US$ ${Math.round(data.price / 17000)}`
      : `Rp ${data.price.toLocaleString("id-ID")}`,
    images: [data.coverImage], // ServiceDetailTemplate expects an array of images
    highlights: isEn && data.highlightsEn.length > 0 ? data.highlightsEn : data.highlights,
    itinerary: isEn && data.itineraryEn.length > 0 ? data.itineraryEn : data.itinerary,
    includes: isEn && data.includesEn.length > 0 ? data.includesEn : data.includes,
    excludes: isEn && data.excludesEn.length > 0 ? data.excludesEn : data.excludes,
  };

  return <ServiceDetailTemplate {...localizedData} />;
}
