import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/public/HomeClient";
import { getPackageCoverImage } from "@/lib/utils";

export default async function HomePage() {
  const rawFeatured = await prisma.package.findMany({
    where: { isFeatured: true, isActive: true },
    take: 4,
    select: { id: true, slug: true, title: true, coverImage: true, duration: true, price: true, isFeatured: true, subtitle: true },
  });

  const featured = rawFeatured.map(pkg => ({
    ...pkg,
    coverImage: getPackageCoverImage(pkg.slug, pkg.coverImage)
  }));



  const recentTestimonials = await prisma.testimonial.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, origin: true, comment: true, rating: true },
  });

  const gallery = await prisma.gallery.findMany({
    take: 9,
    orderBy: { createdAt: "desc" },
    select: { id: true, imageUrl: true, caption: true },
  });

  const siteFaqs = await prisma.siteContent.findMany({
    where: { group: "faq" },
  });

  const parsedFaqs = siteFaqs.map(f => JSON.parse(f.value));

  return (
    <HomeClient
      featured={featured}

      recentTestimonials={recentTestimonials}
      gallery={gallery}
      parsedFaqs={parsedFaqs}
    />
  );
}
