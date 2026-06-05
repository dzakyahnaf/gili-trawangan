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

export function getWhatsAppNumber(): string {
  // Priority: DB value (injected as window global) > env var > hardcoded fallback
  if (typeof window !== "undefined" && (window as any).__WA_NUMBER) {
    return (window as any).__WA_NUMBER;
  }
  return process.env.NEXT_PUBLIC_WA_NUMBER || "6287793082501";
}

export function getWhatsAppLink(message?: string): string {
  const phone = getWhatsAppNumber();
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ""}`;
}

export function getWhatsAppDisplay(): string {
  const num = getWhatsAppNumber();
  // Format: +62 877-9308-2501
  return `+${num.slice(0, 2)} ${num.slice(2, 5)}-${num.slice(5, 9)}-${num.slice(9)}`;
}

export function getPackageCoverImage(slug: string, dbImage?: string): string {
  const mapping: Record<string, string> = {
    "open-trip-lombok": "/images/generate/open-trip-lombok.png",
    "one-day-trip-lombok": "/images/generate/one-day-trip-lombok.png",
    "menginap-di-gili-trawangan": "/images/generate/menginap-di-gili-trawangan.png",
    "paket-honeymoon-lombok": "/images/generate/paket-honeymoon-lombok.png",
    "paket-tour-lombok-2-hari-1-malam": "/images/generate/paket-tour-lombok-2-hari-1-malam.png",
    "trip-lombok-3-hari-2-malam": "/images/generate/trip-lombok-3-hari-2-malam.png",
    "liburan-lombok-4-hari-3-malam": "/images/generate/liburan-lombok-4-hari-3-malam.png",
    "wisata-lombok-5-hari-4-malam": "/images/generate/wisata-lombok-5-hari-4-malam.png",
    "honeymoon-lombok-2-hari-1-malam": "/images/generate/honeymoon-lombok-2-hari-1-malam.png"
  };
  return mapping[slug] || dbImage || "/images/generate/trip-lombok-3-hari-2-malam.png";
}
