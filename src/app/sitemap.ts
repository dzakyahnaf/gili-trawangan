import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.rhtourandtravel.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/snorkeling`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fastboat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/speedboat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/private-speed-boat-and-car`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/car-rental`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lombok-tour`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/rinjani-tracking`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/booking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic routes — packages from database
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  });

  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${BASE_URL}/packages/${pkg.slug}`,
    lastModified: pkg.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic routes — snorkeling slugs (hardcoded in page, list them here)
  const snorkelingSlugs = [
    "shared-snorkeling-3-spots",
    "shared-snorkeling-sunset",
    "private-snorkeling-2-hours",
    "private-snorkeling-4-hours",
    "private-snorkeling-6-hours",
  ];

  const snorkelingRoutes: MetadataRoute.Sitemap = snorkelingSlugs.map(
    (slug) => ({
      url: `${BASE_URL}/snorkeling/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Dynamic routes — speedboats from database
  const speedboats = await prisma.speedboat.findMany({
    where: { isActive: true },
    select: { id: true, updatedAt: true },
  });

  const speedboatRoutes: MetadataRoute.Sitemap = speedboats.map((sb) => ({
    url: `${BASE_URL}/speedboat/${sb.id}`,
    lastModified: sb.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...packageRoutes,
    ...snorkelingRoutes,
    ...speedboatRoutes,
  ];
}
