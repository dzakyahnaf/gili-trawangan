"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag as nextRevalidateTag, unstable_cache } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

const revalidateTag = (tag: string) => {
  (nextRevalidateTag as any)(tag);
};

// =====================================================
// READ
// =====================================================

// Cached read: revalidates when admin mutates data via revalidateTag
const _getActivitiesCached = (category: string) =>
  unstable_cache(
    () =>
      prisma.activity.findMany({
        where: { category },
        orderBy: { createdAt: "asc" },
      }),
    [`activities-${category}`],
    { tags: ["activities", `activities-${category}`] }
  )();

export async function getActivities(category: string) {
  return _getActivitiesCached(category);
}

const _getActivityBySlugCached = (slug: string, category: string) =>
  unstable_cache(
    () =>
      prisma.activity.findFirst({
        where: { slug, category, isActive: true },
      }),
    [`activity-slug-${slug}-${category}`],
    { tags: ["activities", `activities-${category}`, `activity-${slug}`] }
  )();

export async function getActivityBySlug(slug: string, category: string) {
  return _getActivityBySlugCached(slug, category);
}

export async function getActivityById(id: string) {
  return await prisma.activity.findUnique({ where: { id } });
}

// =====================================================
// CREATE
// =====================================================

export async function createActivity(category: string, formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const priceUSD = formData.get("priceUSD") ? parseInt(formData.get("priceUSD") as string) : null;
  const duration = formData.get("duration") as string;
  const meetingPoint = formData.get("meetingPoint") as string || "";
  const maxPax = parseInt(formData.get("maxPax") as string) || 100;
  const isActive = formData.get("isActive") === "true";

  const highlights = parseLines(formData.get("highlights") as string);
  const highlightsEn = parseLines(formData.get("highlightsEn") as string);
  const includes = parseLines(formData.get("includes") as string);
  const includesEn = parseLines(formData.get("includesEn") as string);
  const excludes = parseLines(formData.get("excludes") as string);
  const excludesEn = parseLines(formData.get("excludesEn") as string);
  const schedule = parseLines(formData.get("schedule") as string);
  const itinerary = parseJson(formData.get("itinerary") as string);
  const itineraryEn = parseJson(formData.get("itineraryEn") as string);

  if (!name?.trim()) throw new Error("Nama paket (ID) wajib diisi.");
  if (!nameEn?.trim()) throw new Error("Nama paket (EN) wajib diisi.");
  if (price <= 0) throw new Error("Harga IDR wajib diisi.");

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const existing = await prisma.activity.findFirst({ where: { slug, category } });
  if (existing) throw new Error("Paket dengan nama/slug serupa sudah ada di kategori ini.");

  // Handle image
  let coverImage = "";
  const localPath = formData.get("localImagePath") as string;
  const file = formData.get("coverImage") as File;

  if (file && file.size > 0) {
    coverImage = await uploadImage(file);
  } else if (localPath?.trim() && localPath.startsWith("/images")) {
    coverImage = localPath.trim();
  } else {
    throw new Error("Gambar cover wajib diunggah atau path lokal harus diisi.");
  }

  await prisma.activity.create({
    data: {
      slug,
      name,
      nameEn: nameEn || null,
      description,
      descriptionEn: descriptionEn || null,
      highlights,
      highlightsEn,
      includes,
      includesEn,
      excludes,
      excludesEn,
      itinerary,
      itineraryEn,
      price,
      priceUSD,
      duration,
      schedule,
      meetingPoint,
      maxPax,
      minPax: 1,
      coverImage,
      category,
      isActive,
    },
  });

  revalidateTag("activities");
  revalidateTag(`activities-${category}`);
  revalidatePath(`/admin/${category}`);
  revalidatePath(`/${category}`);
  revalidatePath("/");
}

// =====================================================
// UPDATE
// =====================================================

export async function updateActivity(id: string, category: string, formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const priceUSD = formData.get("priceUSD") ? parseInt(formData.get("priceUSD") as string) : null;
  const duration = formData.get("duration") as string;
  const meetingPoint = formData.get("meetingPoint") as string || "";
  const maxPax = parseInt(formData.get("maxPax") as string) || 100;
  const isActive = formData.get("isActive") === "true";

  const highlights = parseLines(formData.get("highlights") as string);
  const highlightsEn = parseLines(formData.get("highlightsEn") as string);
  const includes = parseLines(formData.get("includes") as string);
  const includesEn = parseLines(formData.get("includesEn") as string);
  const excludes = parseLines(formData.get("excludes") as string);
  const excludesEn = parseLines(formData.get("excludesEn") as string);
  const schedule = parseLines(formData.get("schedule") as string);
  const itinerary = parseJson(formData.get("itinerary") as string);
  const itineraryEn = parseJson(formData.get("itineraryEn") as string);

  if (!name?.trim()) throw new Error("Nama paket (ID) wajib diisi.");
  if (price <= 0) throw new Error("Harga IDR wajib diisi.");

  const current = await prisma.activity.findUnique({ where: { id } });
  if (!current) throw new Error("Paket tidak ditemukan.");

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const existing = await prisma.activity.findFirst({ where: { slug, category, id: { not: id } } });
  if (existing) throw new Error("Paket dengan nama/slug serupa sudah ada di kategori ini.");

  // Handle image
  let coverImage = current.coverImage;
  const localPath = formData.get("localImagePath") as string;
  const file = formData.get("coverImage") as File;

  if (file && file.size > 0) {
    if (current.coverImage && current.coverImage.startsWith("http")) {
      await deleteImage(current.coverImage);
    }
    coverImage = await uploadImage(file);
  } else if (localPath?.trim() && localPath.startsWith("/images")) {
    coverImage = localPath.trim();
  }

  await prisma.activity.update({
    where: { id },
    data: {
      slug,
      name,
      nameEn: nameEn || null,
      description,
      descriptionEn: descriptionEn || null,
      highlights,
      highlightsEn,
      includes,
      includesEn,
      excludes,
      excludesEn,
      itinerary,
      itineraryEn,
      price,
      priceUSD,
      duration,
      schedule,
      meetingPoint,
      maxPax,
      coverImage,
      isActive,
    },
  });

  revalidateTag("activities");
  revalidateTag(`activities-${category}`);
  revalidateTag(`activity-${slug}`);
  revalidateTag(`activity-${current.slug}`);
  revalidatePath(`/admin/${category}`);
  revalidatePath(`/${category}/${slug}`);
  revalidatePath(`/${category}/${current.slug}`);
  revalidatePath(`/${category}`);
  revalidatePath("/");
}

// =====================================================
// DELETE
// =====================================================

export async function deleteActivity(id: string, category: string) {
  const item = await prisma.activity.findUnique({ where: { id } });
  if (item) {
    if (item.coverImage && item.coverImage.startsWith("http")) {
      await deleteImage(item.coverImage);
    }
    await prisma.activity.delete({ where: { id } });
  }
  revalidateTag("activities");
  revalidateTag(`activities-${category}`);
  revalidatePath(`/admin/${category}`);
  revalidatePath(`/${category}`);
  revalidatePath("/");
}

// =====================================================
// HELPERS
// =====================================================

function parseLines(raw: string): string[] {
  return (raw || "").split("\n").map((s) => s.trim()).filter(Boolean);
}

function parseJson(raw: string): any {
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
