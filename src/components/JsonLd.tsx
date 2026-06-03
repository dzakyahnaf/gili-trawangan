/**
 * Reusable JSON-LD structured data component.
 * Renders a <script type="application/ld+json"> tag in the page head.
 */

type JsonLdData = Record<string, unknown>;

interface JsonLdProps {
  data: JsonLdData;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness schema for RH Tour & Travel */
export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "TouristAttraction", "TravelAgency"],
        name: "RH Tour & Travel",
        image: "https://www.rhtourandtravel.com/logos/logo-boat.png",
        url: "https://www.rhtourandtravel.com",
        telephone: "+6287793082501",
        email: "rhtourandtravel3003@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sama-Sama Reggae Bar",
          addressLocality: "Gili Trawangan",
          addressRegion: "Lombok Utara, Nusa Tenggara Barat",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -8.352125,
          longitude: 116.037107,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "22:00",
        },
        priceRange: "$$",
        description:
          "Paket wisata terlengkap di Gili Trawangan, Lombok. Snorkeling, diving, island hopping, fast boat & speedboat charter. Booking mudah, harga terjangkau!",
        sameAs: ["https://www.tiktok.com/@rhtourandtravel30"],
      }}
    />
  );
}

/** FAQPage schema — pass array of {question, answer} */
export function FAQPageJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

/** BreadcrumbList schema */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
