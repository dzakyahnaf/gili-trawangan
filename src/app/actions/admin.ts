"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

// --- PACKAGES ---
export async function getPackages() {
  return await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deletePackage(id: string) {
  const pkg = await prisma.package.findUnique({ where: { id } });
  if (pkg) {
    await deleteImage(pkg.coverImage);
    await prisma.package.delete({ where: { id } });
  }
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/");
}

export async function createPackage(formData: FormData) {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const category = formData.get("category") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const priceChild = formData.get("priceChild") ? parseInt(formData.get("priceChild") as string) : null;
  const minPax = parseInt(formData.get("minPax") as string) || 1;
  const maxPax = parseInt(formData.get("maxPax") as string) || 100;
  const isFeatured = formData.get("isFeatured") === "true";
  const isActive = formData.get("isActive") === "true";

  const programs = (formData.get("programs") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const includes = (formData.get("includes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const excludes = (formData.get("excludes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  
  const itineraryRaw = formData.get("itinerary") as string;
  const itinerary = itineraryRaw ? JSON.parse(itineraryRaw) : [];

  if (!title?.trim()) throw new Error("Judul wajib diisi.");
  if (price < 0) throw new Error("Harga tidak boleh negatif.");
  if (priceChild !== null && priceChild < 0) throw new Error("Harga anak tidak boleh negatif.");
  if (minPax < 1) throw new Error("Minimal Pax minimal 1.");
  if (maxPax < minPax) throw new Error("Maksimal Pax tidak boleh kurang dari Minimal Pax.");

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const existing = await prisma.package.findUnique({ where: { slug } });
  if (existing) throw new Error("Paket dengan judul/slug serupa sudah terdaftar.");

  const file = formData.get("coverImage") as File;
  if (!file || file.size === 0) throw new Error("Cover image wajib diunggah.");
  const coverImage = await uploadImage(file);

  await prisma.package.create({
    data: {
      slug,
      title,
      subtitle: subtitle || null,
      description,
      duration,
      category,
      price,
      priceChild,
      minPax,
      maxPax,
      programs,
      includes,
      excludes,
      itinerary,
      coverImage,
      isFeatured,
      isActive,
    }
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/");
}

export async function updatePackage(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const category = formData.get("category") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const priceChild = formData.get("priceChild") ? parseInt(formData.get("priceChild") as string) : null;
  const minPax = parseInt(formData.get("minPax") as string) || 1;
  const maxPax = parseInt(formData.get("maxPax") as string) || 100;
  const isFeatured = formData.get("isFeatured") === "true";
  const isActive = formData.get("isActive") === "true";

  const programs = (formData.get("programs") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const includes = (formData.get("includes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const excludes = (formData.get("excludes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  
  const itineraryRaw = formData.get("itinerary") as string;
  const itinerary = itineraryRaw ? JSON.parse(itineraryRaw) : [];

  if (!title?.trim()) throw new Error("Judul wajib diisi.");
  if (price < 0) throw new Error("Harga tidak boleh negatif.");
  if (priceChild !== null && priceChild < 0) throw new Error("Harga anak tidak boleh negatif.");
  if (minPax < 1) throw new Error("Minimal Pax minimal 1.");
  if (maxPax < minPax) throw new Error("Maksimal Pax tidak boleh kurang dari Minimal Pax.");

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const existing = await prisma.package.findFirst({ where: { slug, id: { not: id } } });
  if (existing) throw new Error("Paket dengan judul/slug serupa sudah terdaftar.");

  const currentPkg = await prisma.package.findUnique({ where: { id } });
  if (!currentPkg) throw new Error("Paket tidak ditemukan.");

  let coverImage = currentPkg.coverImage;
  const file = formData.get("coverImage") as File;
  if (file && file.size > 0) {
    await deleteImage(currentPkg.coverImage);
    coverImage = await uploadImage(file);
  }

  await prisma.package.update({
    where: { id },
    data: {
      slug,
      title,
      subtitle: subtitle || null,
      description,
      duration,
      category,
      price,
      priceChild,
      minPax,
      maxPax,
      programs,
      includes,
      excludes,
      itinerary,
      coverImage,
      isFeatured,
      isActive,
    }
  });

  revalidatePath("/admin/packages");
  revalidatePath(`/packages/${slug}`);
  revalidatePath(`/packages/${currentPkg.slug}`);
  revalidatePath("/packages");
  revalidatePath("/");
}

// --- ACTIVITIES ---
export async function getActivities() {
  return await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteActivity(id: string) {
  const item = await prisma.activity.findUnique({ where: { id } });
  if (item) {
    await deleteImage(item.coverImage);
    await prisma.activity.delete({ where: { id } });
  }
  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  revalidatePath("/");
}

export async function createActivity(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const meetingPoint = formData.get("meetingPoint") as string;
  const category = formData.get("category") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const priceChild = formData.get("priceChild") ? parseInt(formData.get("priceChild") as string) : null;
  const minPax = parseInt(formData.get("minPax") as string) || 1;
  const maxPax = parseInt(formData.get("maxPax") as string) || 100;
  const isActive = formData.get("isActive") === "true";

  const schedule = (formData.get("schedule") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const includes = (formData.get("includes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const excludes = (formData.get("excludes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);

  if (!name?.trim()) throw new Error("Nama aktivitas wajib diisi.");
  if (price < 0) throw new Error("Harga tidak boleh negatif.");
  if (priceChild !== null && priceChild < 0) throw new Error("Harga anak tidak boleh negatif.");
  if (minPax < 1) throw new Error("Minimal Pax minimal 1.");
  if (maxPax < minPax) throw new Error("Maksimal Pax tidak boleh kurang dari Minimal Pax.");

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const existing = await prisma.activity.findUnique({ where: { slug } });
  if (existing) throw new Error("Aktivitas dengan nama/slug serupa sudah terdaftar.");

  const file = formData.get("coverImage") as File;
  if (!file || file.size === 0) throw new Error("Cover image wajib diunggah.");
  const coverImage = await uploadImage(file);

  await prisma.activity.create({
    data: {
      slug,
      name,
      description,
      duration,
      meetingPoint,
      category,
      price,
      priceChild,
      minPax,
      maxPax,
      schedule,
      includes,
      excludes,
      coverImage,
      isActive,
    }
  });

  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  revalidatePath("/");
}

export async function updateActivity(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const meetingPoint = formData.get("meetingPoint") as string;
  const category = formData.get("category") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const priceChild = formData.get("priceChild") ? parseInt(formData.get("priceChild") as string) : null;
  const minPax = parseInt(formData.get("minPax") as string) || 1;
  const maxPax = parseInt(formData.get("maxPax") as string) || 100;
  const isActive = formData.get("isActive") === "true";

  const schedule = (formData.get("schedule") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const includes = (formData.get("includes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const excludes = (formData.get("excludes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);

  if (!name?.trim()) throw new Error("Nama aktivitas wajib diisi.");
  if (price < 0) throw new Error("Harga tidak boleh negatif.");
  if (priceChild !== null && priceChild < 0) throw new Error("Harga anak tidak boleh negatif.");
  if (minPax < 1) throw new Error("Minimal Pax minimal 1.");
  if (maxPax < minPax) throw new Error("Maksimal Pax tidak boleh kurang dari Minimal Pax.");

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const existing = await prisma.activity.findFirst({ where: { slug, id: { not: id } } });
  if (existing) throw new Error("Aktivitas dengan nama/slug serupa sudah terdaftar.");

  const currentAct = await prisma.activity.findUnique({ where: { id } });
  if (!currentAct) throw new Error("Aktivitas tidak ditemukan.");

  let coverImage = currentAct.coverImage;
  const file = formData.get("coverImage") as File;
  if (file && file.size > 0) {
    await deleteImage(currentAct.coverImage);
    coverImage = await uploadImage(file);
  }

  await prisma.activity.update({
    where: { id },
    data: {
      slug,
      name,
      description,
      duration,
      meetingPoint,
      category,
      price,
      priceChild,
      minPax,
      maxPax,
      schedule,
      includes,
      excludes,
      coverImage,
      isActive,
    }
  });

  revalidatePath("/admin/activities");
  revalidatePath(`/activities/${slug}`);
  revalidatePath(`/activities/${currentAct.slug}`);
  revalidatePath("/activities");
  revalidatePath("/");
}

// --- FASTBOATS ---
export async function getFastBoats() {
  return await prisma.fastBoat.findMany({
    orderBy: { createdAt: "desc" },
    include: { schedules: true }
  });
}

export async function deleteFastBoat(id: string) {
  const boat = await prisma.fastBoat.findUnique({ where: { id } });
  if (boat) {
    if (boat.logo) await deleteImage(boat.logo);
    await prisma.fastBoat.delete({ where: { id } });
  }
  revalidatePath("/admin/fastboats");
  revalidatePath("/fastboat");
  revalidatePath("/");
}

export async function createFastBoat(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const speed = formData.get("speed") as string;
  const capacity = parseInt(formData.get("capacity") as string) || 0;
  const isActive = formData.get("isActive") === "true";

  const facilities = (formData.get("facilities") as string || "").split("\n").map(s => s.trim()).filter(Boolean);

  if (!name?.trim()) throw new Error("Nama kapal cepat wajib diisi.");
  if (capacity < 0) throw new Error("Kapasitas tidak boleh negatif.");

  let logo = null;
  const file = formData.get("logo") as File;
  if (file && file.size > 0) {
    logo = await uploadImage(file);
  }

  await prisma.fastBoat.create({
    data: {
      name,
      description,
      speed,
      capacity,
      facilities,
      logo,
      isActive,
    }
  });

  revalidatePath("/admin/fastboats");
  revalidatePath("/fastboat");
  revalidatePath("/");
}

export async function updateFastBoat(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const speed = formData.get("speed") as string;
  const capacity = parseInt(formData.get("capacity") as string) || 0;
  const isActive = formData.get("isActive") === "true";

  const facilities = (formData.get("facilities") as string || "").split("\n").map(s => s.trim()).filter(Boolean);

  if (!name?.trim()) throw new Error("Nama kapal cepat wajib diisi.");
  if (capacity < 0) throw new Error("Kapasitas tidak boleh negatif.");

  const current = await prisma.fastBoat.findUnique({ where: { id } });
  if (!current) throw new Error("Kapal cepat tidak ditemukan.");

  let logo = current.logo;
  const file = formData.get("logo") as File;
  if (file && file.size > 0) {
    if (current.logo) await deleteImage(current.logo);
    logo = await uploadImage(file);
  }

  await prisma.fastBoat.update({
    where: { id },
    data: {
      name,
      description,
      speed,
      capacity,
      facilities,
      logo,
      isActive,
    }
  });

  revalidatePath("/admin/fastboats");
  revalidatePath("/fastboat");
  revalidatePath("/");
}

// --- FASTBOAT SCHEDULES ---
export async function createFastBoatSchedule(data: {
  fastBoatId: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
}) {
  if (!data.fastBoatId) throw new Error("Kapal cepat wajib dipilih.");
  if (!data.from?.trim()) throw new Error("Lokasi keberangkatan wajib diisi.");
  if (!data.to?.trim()) throw new Error("Lokasi tujuan wajib diisi.");
  if (!data.departure?.trim()) throw new Error("Waktu keberangkatan wajib diisi.");
  if (!data.arrival?.trim()) throw new Error("Waktu kedatangan wajib diisi.");
  if (data.price < 0) throw new Error("Harga tidak boleh negatif.");

  await prisma.fastBoatSchedule.create({ data });
  revalidatePath("/admin/fastboats");
  revalidatePath("/fastboat");
  revalidatePath("/");
}

export async function updateFastBoatSchedule(
  id: string,
  data: {
    from: string;
    to: string;
    departure: string;
    arrival: string;
    price: number;
  }
) {
  if (!data.from?.trim()) throw new Error("Lokasi keberangkatan wajib diisi.");
  if (!data.to?.trim()) throw new Error("Lokasi tujuan wajib diisi.");
  if (!data.departure?.trim()) throw new Error("Waktu keberangkatan wajib diisi.");
  if (!data.arrival?.trim()) throw new Error("Waktu kedatangan wajib diisi.");
  if (data.price < 0) throw new Error("Harga tidak boleh negatif.");

  await prisma.fastBoatSchedule.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/fastboats");
  revalidatePath("/fastboat");
  revalidatePath("/");
}

export async function deleteFastBoatSchedule(id: string) {
  await prisma.fastBoatSchedule.delete({ where: { id } });
  revalidatePath("/admin/fastboats");
  revalidatePath("/fastboat");
  revalidatePath("/");
}

// --- SPEEDBOATS ---
export async function getSpeedboats() {
  return await prisma.speedboat.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteSpeedboat(id: string) {
  const item = await prisma.speedboat.findUnique({ where: { id } });
  if (item) {
    for (const imgUrl of item.images) {
      await deleteImage(imgUrl);
    }
    await prisma.speedboat.delete({ where: { id } });
  }
  revalidatePath("/admin/speedboats");
  revalidatePath("/private-speed-boat-and-car");
  revalidatePath("/");
}

export async function createSpeedboat(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const priceUnit = formData.get("priceUnit") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const capacity = parseInt(formData.get("capacity") as string) || 0;
  const isActive = formData.get("isActive") === "true";

  const routes = (formData.get("routes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const facilities = (formData.get("facilities") as string || "").split("\n").map(s => s.trim()).filter(Boolean);

  if (!name?.trim()) throw new Error("Nama speedboat wajib diisi.");
  if (price < 0) throw new Error("Harga tidak boleh negatif.");
  if (capacity < 0) throw new Error("Kapasitas tidak boleh negatif.");

  // Handle multiple images (e.g. form fields "images")
  const files = formData.getAll("images") as File[];
  const images: string[] = [];
  for (const file of files) {
    if (file && file.size > 0) {
      const url = await uploadImage(file);
      images.push(url);
    }
  }

  await prisma.speedboat.create({
    data: {
      name,
      description,
      duration,
      priceUnit,
      price,
      capacity,
      routes,
      facilities,
      images,
      isActive,
    }
  });

  revalidatePath("/admin/speedboats");
  revalidatePath("/private-speed-boat-and-car");
  revalidatePath("/");
}

export async function updateSpeedboat(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const priceUnit = formData.get("priceUnit") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const capacity = parseInt(formData.get("capacity") as string) || 0;
  const isActive = formData.get("isActive") === "true";

  const routes = (formData.get("routes") as string || "").split("\n").map(s => s.trim()).filter(Boolean);
  const facilities = (formData.get("facilities") as string || "").split("\n").map(s => s.trim()).filter(Boolean);

  if (!name?.trim()) throw new Error("Nama speedboat wajib diisi.");
  if (price < 0) throw new Error("Harga tidak boleh negatif.");
  if (capacity < 0) throw new Error("Kapasitas tidak boleh negatif.");

  const current = await prisma.speedboat.findUnique({ where: { id } });
  if (!current) throw new Error("Speedboat tidak ditemukan.");

  let images = [...current.images];
  
  // If user uploaded new images, delete old ones and replace
  const files = formData.getAll("images") as File[];
  const newUploadedImages: string[] = [];
  for (const file of files) {
    if (file && file.size > 0) {
      const url = await uploadImage(file);
      newUploadedImages.push(url);
    }
  }

  if (newUploadedImages.length > 0) {
    for (const oldUrl of current.images) {
      await deleteImage(oldUrl);
    }
    images = newUploadedImages;
  }

  await prisma.speedboat.update({
    where: { id },
    data: {
      name,
      description,
      duration,
      priceUnit,
      price,
      capacity,
      routes,
      facilities,
      images,
      isActive,
    }
  });

  revalidatePath("/admin/speedboats");
  revalidatePath("/private-speed-boat-and-car");
  revalidatePath("/");
}

// --- TESTIMONIALS ---
export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createTestimonial(data: {
  name: string;
  origin: string;
  rating: number;
  comment: string;
  date: string;
}) {
  if (!data.name?.trim()) throw new Error("Nama wajib diisi.");
  if (!data.origin?.trim()) throw new Error("Asal/Negara wajib diisi.");
  if (!data.comment?.trim()) throw new Error("Komentar wajib diisi.");
  if (!data.date?.trim()) throw new Error("Bulan/Tahun wajib diisi.");
  if (data.rating < 1 || data.rating > 5) throw new Error("Rating harus antara 1-5.");

  await prisma.testimonial.create({
    data: {
      name: data.name,
      origin: data.origin,
      rating: data.rating,
      comment: data.comment,
      date: data.date,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function updateTestimonial(
  id: string,
  data: {
    name: string;
    origin: string;
    rating: number;
    comment: string;
    date: string;
  }
) {
  if (!data.name?.trim()) throw new Error("Nama wajib diisi.");
  if (!data.origin?.trim()) throw new Error("Asal/Negara wajib diisi.");
  if (!data.comment?.trim()) throw new Error("Komentar wajib diisi.");
  if (!data.date?.trim()) throw new Error("Bulan/Tahun wajib diisi.");
  if (data.rating < 1 || data.rating > 5) throw new Error("Rating harus antara 1-5.");

  await prisma.testimonial.update({
    where: { id },
    data: {
      name: data.name,
      origin: data.origin,
      rating: data.rating,
      comment: data.comment,
      date: data.date,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

// --- GALLERY ---
export async function getGallery() {
  return await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createGalleryItem(formData: FormData) {
  const file = formData.get("image") as File;
  const caption = formData.get("caption") as string;
  const category = formData.get("category") as string;

  if (!file || file.size === 0) {
    throw new Error("File gambar wajib diunggah.");
  }
  if (!category || category.trim().length === 0) {
    throw new Error("Kategori wajib diisi.");
  }

  const imageUrl = await uploadImage(file);
  await prisma.gallery.create({
    data: {
      imageUrl,
      caption: caption || null,
      category,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/");
}

export async function deleteGalleryItem(id: string) {
  const item = await prisma.gallery.findUnique({ where: { id } });
  if (item) {
    await deleteImage(item.imageUrl);
    await prisma.gallery.delete({ where: { id } });
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/");
}

// --- BOOKINGS ---
export async function getBookings() {
  return await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      package: true,
      activity: true,
      fastBoatSchedule: {
        include: { fastBoat: true }
      },
      speedboat: true,
    }
  });
}

export async function updateBookingStatus(
  id: string,
  paymentStatus: string,
  status: string
) {
  await prisma.booking.update({
    where: { id },
    data: { paymentStatus, status },
  });
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${id}`);
}

export async function deleteBooking(id: string) {
  await prisma.booking.delete({ where: { id } });
  revalidatePath("/admin/bookings");
}



// --- ANALYTICS ---
export async function getDashboardStats() {
  const [totalBookings, pendingPayments, totalRevenue, recentBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { paymentStatus: "pending" } }),
    prisma.booking.aggregate({
      _sum: { totalPrice: true },
      where: { paymentStatus: "paid" }
    }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        package: true,
        activity: true,
        fastBoatSchedule: { include: { fastBoat: true } },
        speedboat: true,
      }
    })
  ]);

  return {
    totalBookings,
    pendingPayments,
    totalRevenue: totalRevenue._sum.totalPrice || 0,
    recentBookings,
  };
}

// --- CONTENT EDITORS ---
export interface ContentSettings {
  hero_title_id: string;
  hero_title_en: string;
  hero_subtitle_id: string;
  hero_subtitle_en: string;
  about_text_id: string;
  about_text_en: string;
}

const CONTENT_KEYS: (keyof ContentSettings)[] = [
  "hero_title_id",
  "hero_title_en",
  "hero_subtitle_id",
  "hero_subtitle_en",
  "about_text_id",
  "about_text_en",
];

export async function getContentSettings(): Promise<ContentSettings> {
  const rows = await prisma.siteContent.findMany({
    where: { group: "content" },
  });

  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }

  return {
    hero_title_id: map.hero_title_id ?? "Jelajahi Keajaiban Gili Trawangan",
    hero_title_en: map.hero_title_en ?? "Explore the Magic of Gili Trawangan",
    hero_subtitle_id: map.hero_subtitle_id ?? "Paket wisata terlengkap — snorkeling, diving, island hopping & fast boat.",
    hero_subtitle_en: map.hero_subtitle_en ?? "The most complete tour packages — snorkeling, diving, island hopping & fast boat.",
    about_text_id: map.about_text_id ?? "Kami adalah penyedia jasa wisata terpercaya di Gili Trawangan, Lombok. Dengan pengalaman bertahun-tahun, kami berkomitmen memberikan pengalaman liburan terbaik bagi setiap wisatawan yang mengunjungi surga tropis ini.",
    about_text_en: map.about_text_en ?? "We are a trusted travel service provider in Gili Trawangan, Lombok. With years of experience, we are committed to providing the best holiday experience for every tourist visiting this tropical paradise.",
  };
}

export async function saveContentSettings(data: ContentSettings) {
  if (!data.hero_title_id?.trim()) throw new Error("Judul Hero (ID) wajib diisi.");
  if (!data.hero_title_en?.trim()) throw new Error("Judul Hero (EN) wajib diisi.");
  if (!data.hero_subtitle_id?.trim()) throw new Error("Subtitle Hero (ID) wajib diisi.");
  if (!data.hero_subtitle_en?.trim()) throw new Error("Subtitle Hero (EN) wajib diisi.");
  if (!data.about_text_id?.trim()) throw new Error("Teks Tentang Kami (ID) wajib diisi.");
  if (!data.about_text_en?.trim()) throw new Error("Teks Tentang Kami (EN) wajib diisi.");

  const ops = CONTENT_KEYS.map((key) =>
    prisma.siteContent.upsert({
      where: { key },
      update: { value: data[key] || "" },
      create: { key, value: data[key] || "", group: "content" },
    })
  );

  await prisma.$transaction(ops);

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/content");
}

