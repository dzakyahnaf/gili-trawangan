import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrency(amount: number, locale: string = "id"): string {
  if (locale === "en") {
    const usdAmount = amount / 17000;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(usdAmount);
  }
  
  return formatRupiah(amount);
}

export function generateBookingCode(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RH-${year}-${code}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getWhatsAppLink(message?: string): string {
  const phone = "6287793082501";
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ""}`;
}

export function getPackageCoverImage(slug: string, dbImage?: string): string {
  const mapping: Record<string, string> = {
    "open-trip-lombok": "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=800",
    "one-day-trip-lombok": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
    "menginap-di-gili-trawangan": "/images/snorkeling2.jpg",
    "paket-honeymoon-lombok": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    "paket-tour-lombok-2-hari-1-malam": "/images/air-terjun.jpg",
    "trip-lombok-3-hari-2-malam": "/images/lombok2.jpg",
    "paket-tour-lombok-4-hari-3-malam": "/images/lombok1.jpg"
  };
  return mapping[slug] || dbImage || "/images/lombok1.jpg";
}
