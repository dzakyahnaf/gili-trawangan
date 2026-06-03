// Google Tag Manager DataLayer helpers
// All Google Ads tags are managed via GTM dashboard — no hardcoded scripts needed.

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/** Push arbitrary data to GTM DataLayer */
export function pushToDataLayer(data: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
}

/** Track page view — needed for SPA navigation in Next.js */
export function trackPageView(url: string) {
  pushToDataLayer({
    event: "pageview",
    page: url,
  });
}

/** Track booking conversion — hook this to Google Ads Conversion tag in GTM */
export function trackBookingConversion(packageName: string, value: number) {
  pushToDataLayer({
    event: "booking_conversion",
    package_name: packageName,
    value: value,
    currency: "IDR",
  });
}

/** Track WhatsApp click — useful for Google Ads click-through analysis */
export function trackWAClick(source: string) {
  pushToDataLayer({
    event: "whatsapp_click",
    source: source,
  });
}
