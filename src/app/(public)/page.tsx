import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/public/HomeClient";

export default async function HomePage() {
  const featured = await prisma.package.findMany({
    where: { isFeatured: true, isActive: true },
    take: 4,
    select: { id: true, slug: true, title: true, coverImage: true, duration: true, price: true, isFeatured: true, subtitle: true },
  });

  const recentActivities = await prisma.activity.findMany({
    where: { isActive: true },
    take: 4,
    select: { id: true, slug: true, name: true, coverImage: true, duration: true, price: true, category: true },
  });

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
      recentActivities={recentActivities}
      recentTestimonials={recentTestimonials}
      gallery={gallery}
      parsedFaqs={parsedFaqs}
    />
  );
}
