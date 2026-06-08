"use client";

import ServiceDetailTemplate from "@/components/public/ServiceDetailTemplate";
import { useLang } from "@/components/LangProvider";

interface ActivityData {
  id: string;
  slug: string;
  category: string;
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
  meetingPoint?: string;
}

export default function ActivityDetailClient({ data }: { data: ActivityData }) {
  const { locale } = useLang();
  const isEn = locale === "en";

  // Check if there is a custom unit suffix in meetingPoint (e.g. "/pax", "per day", "per way", etc.)
  const unit = data.meetingPoint ? `${data.meetingPoint}` : "";

  // Build the localized props to pass to ServiceDetailTemplate
  let priceStr = "";
  if (data.category === "lombok-tour") {
    priceStr = isEn
      ? `US$ ${data.priceUSD} / US$ ${Math.round((data.priceUSD || 70) / 4)} per pax (min. 4)`
      : `Rp ${(data.price / 1000).toLocaleString("id-ID")}K / Rp ${(data.price / 4000).toLocaleString("id-ID")}K per pax (min. 4)`;
  } else if (data.category === "private-speed-boat-and-car") {
    if (data.slug === "speedboat-charter") {
      priceStr = isEn ? "US$ 28 per way (max. 4 pax)" : "Rp 400.000 sekali jalan (max. 4 pax)";
    } else if (data.slug === "combo-transfer") {
      priceStr = isEn ? "US$ 55 per way (min. 4 pax)" : "Rp 800.000 sekali jalan (min. 4 pax)";
    } else if (data.slug === "car-transfer") {
      priceStr = isEn ? "US$ 25/pax" : "Rp 350.000/pax";
    } else if (data.slug === "full-day-car-combo") {
      priceStr = isEn ? "US$ 50 / 10 hours" : "Rp 750.000 / 10 jam";
    } else {
      priceStr = isEn
        ? data.priceUSD ? `US$ ${data.priceUSD}${unit}` : `US$ ${Math.round(data.price / 17000)}${unit}`
        : `Rp ${data.price.toLocaleString("id-ID")}${unit}`;
    }
  } else {
    priceStr = isEn
      ? data.priceUSD
        ? `US$ ${data.priceUSD}${unit}`
        : `US$ ${Math.round(data.price / 17000)}${unit}`
      : `Rp ${data.price.toLocaleString("id-ID")}${unit}`;
  }

  const localizedData = {
    title: isEn && data.nameEn ? data.nameEn : data.name,
    description: isEn && data.descriptionEn ? data.descriptionEn : data.description,
    price: priceStr,
    images: [data.coverImage],
    highlights: isEn && data.highlightsEn.length > 0 ? data.highlightsEn : data.highlights,
    itinerary: isEn && data.itineraryEn.length > 0 ? data.itineraryEn : data.itinerary,
    includes: isEn && data.includesEn.length > 0 ? data.includesEn : data.includes,
    excludes: isEn && data.excludesEn.length > 0 ? data.excludesEn : data.excludes,
  };

  return <ServiceDetailTemplate {...localizedData} />;
}
