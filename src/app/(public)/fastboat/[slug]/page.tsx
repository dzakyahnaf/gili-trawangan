"use client";
import ServiceDetailTemplate from "@/components/public/ServiceDetailTemplate";
import { notFound, useParams } from "next/navigation";

const FASTBOAT_DATA: Record<string, any> = {
  "super-scoot-fast-boat-sanur-lembongan-penida-gili-lombok-route": {
    title: "Super Scoot Fast Boat: Sanur – Lembongan – Penida – Gili – Lombok Route:",
    price: "US$ 30",
    images: ["https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/12339158_545798035586200_7994801453908321023_o-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.jpg"],
    description: "Boat Ticket Information\nOperator: Super Scoot Fast Boat\nRoute: Sanur – Lembongan – Penida – Gili – Lombok",
    highlights: ["4 hours duration", "Instan Booking", "Easy Cancel", "Secure"],
    itinerary: [
      { time: "Departure", title: "Sanur", desc: "Departure Point: Sanur. Check-In: 1 hour before departure. Departure Time: [Specify time based on schedule]" },
      { time: "Journey", title: "Fast Boat Transfer", desc: "Duration: Approximately 4 hours (depending on weather and sea conditions)." },
      { time: "Arrival", title: "Gili / Lombok", desc: "Estimated Arrival Time: [Specify time based on schedule]" }
    ],
    includes: [
      "One-way fast boat transfer",
      "Comfortable seating with air-conditioning",
      "Life jackets and safety equipment onboard",
      "Luggage handling (1 large bag and 1 hand-carry per passenger)"
    ],
    excludes: [
      "Hotel transfer (unless specified)",
      "Personal expenses",
      "Extra luggage (may incur additional charges)"
    ]
  },
  "wijaya-buyuk-fast-boat-sanur-lembongan-penida-gili-lombok-route": {
    title: "Wijaya Buyuk Fast Boat: Sanur – Lembongan – Penida – Gili – Lombok Route:",
    price: "US$ 29",
    images: ["https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/Wijaya-Buyuk-4-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.png"],
    description: "Boat Ticket Information\nOperator: Wijaya Buyuk Fast Boat\nRoute: Sanur – Lembongan – Penida – Gili – Lombok",
    highlights: ["4 hours duration", "Instan Booking", "Easy Cancel", "Secure"],
    itinerary: [
      { time: "Departure", title: "Sanur", desc: "Departure Point: Sanur. Check-In: 1 hour before departure. Departure Time: [Specify time based on schedule]" },
      { time: "Journey", title: "Fast Boat Transfer", desc: "Duration: Approximately 4 hours (depending on weather and sea conditions)." },
      { time: "Arrival", title: "Gili / Lombok", desc: "Estimated Arrival Time: [Specify time based on schedule]" }
    ],
    includes: [
      "One-way fast boat transfer",
      "Comfortable seating with air-conditioning",
      "Life jackets and safety equipment onboard",
      "Luggage handling (1 large bag and 1 hand-carry per passenger)"
    ],
    excludes: [
      "Hotel transfer (unless specified)",
      "Personal expenses",
      "Extra luggage (may incur additional charges)"
    ]
  },
  "wanderlust-fast-boat-sanur-lembongan-penida-gili-lombok-route": {
    title: "Wanderlust Fast Boat: Sanur – Lembongan – Penida – Gili – Lombok Route:",
    price: "US$ 29",
    images: ["https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/xglory-prime.JPG.pagespeed.ic_.lN9EKiQo8Y-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.webp"],
    description: "Boat Ticket Information\nOperator: Wanderlust Fast Boat\nRoute: Sanur – Lembongan – Penida – Gili – Lombok",
    highlights: ["4 hours duration", "Instan Booking", "Easy Cancel", "Secure"],
    itinerary: [
      { time: "Departure", title: "Sanur", desc: "Departure Point: Sanur. Check-In: 1 hour before departure. Departure Time: [Specify time based on schedule]" },
      { time: "Journey", title: "Fast Boat Transfer", desc: "Duration: Approximately 4 hours (depending on weather and sea conditions)." },
      { time: "Arrival", title: "Gili / Lombok", desc: "Estimated Arrival Time: [Specify time based on schedule]" }
    ],
    includes: [
      "One-way fast boat transfer",
      "Comfortable seating with air-conditioning",
      "Life jackets and safety equipment onboard",
      "Luggage handling (1 large bag and 1 hand-carry per passenger)"
    ],
    excludes: [
      "Hotel transfer (unless specified)",
      "Personal expenses",
      "Extra luggage (may incur additional charges)"
    ]
  },
  "wahana-virendra-fast-boat-gili-to-padang-bai-route": {
    title: "Wahana Virendra Fast Boat: Gili to Padang Bai Route:",
    price: "US$ 29",
    images: ["https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/maxresdefault-2-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.jpg"],
    description: "Boat Ticket Information\nOperator: Wahana Virendra Fast Boat\nRoute: Gili Islands to Padang Bai, Bali",
    highlights: ["2 hours duration", "Instan Booking", "Easy Cancel", "Secure"],
    itinerary: [
      { time: "Departure", title: "Gili Islands", desc: "Departure Point: Gili Trawangan / Gili Air / Gili Meno (select appropriate island). Check-In: 1 hour before departure. Departure Time: [Specify time based on schedule]" },
      { time: "Journey", title: "Fast Boat Transfer", desc: "Duration: Approximately 1.5 - 2 hours (depending on weather and sea conditions)." },
      { time: "Arrival", title: "Padang Bai, Bali", desc: "Estimated Arrival Time: [Specify time based on schedule]" }
    ],
    includes: [
      "One-way fast boat transfer from Gili Islands to Padang Bai, Bali",
      "Comfortable seating with air-conditioning",
      "Life jackets and safety equipment onboard",
      "Luggage handling (1 large bag and 1 hand-carry per passenger)"
    ],
    excludes: [
      "Hotel transfer in Bali (unless otherwise specified)",
      "Personal expenses",
      "Extra luggage (may incur additional charges)"
    ]
  },
  "gili-gili-fast-boat-gili-to-padang-bai-route": {
    title: "Gili-Gili Fast Boat: Gili to Padang Bai Route:",
    price: "US$ 35",
    images: ["https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/gili-gili-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.jpg"],
    description: "Boat Ticket Information\nOperator: Gili-Gili Fast Boat\nRoute: Gili Islands to Padang Bai, Bali",
    highlights: ["2 hours duration", "Instan Booking", "Easy Cancel", "Secure"],
    itinerary: [
      { time: "Departure", title: "Gili Islands", desc: "Departure Point: Gili Trawangan / Gili Air / Gili Meno (select appropriate island). Check-In: 1 hour before departure. Departure Time: [Specify time based on schedule]" },
      { time: "Journey", title: "Fast Boat Transfer", desc: "Duration: Approximately 1.5 - 2 hours (depending on weather and sea conditions)." },
      { time: "Arrival", title: "Padang Bai, Bali", desc: "Estimated Arrival Time: [Specify time based on schedule]" }
    ],
    includes: [
      "One-way fast boat transfer from Gili Islands to Padang Bai, Bali",
      "Comfortable seating with air-conditioning",
      "Life jackets and safety equipment onboard",
      "Luggage handling (1 large bag and 1 hand-carry per passenger)"
    ],
    excludes: [
      "Hotel transfer in Bali (unless otherwise specified)",
      "Personal expenses",
      "Extra luggage (may incur additional charges)"
    ]
  },
  "eka-jaya-fast-boat-gili-to-padang-bai": {
    title: "Eka Jaya Fast Boat: Gili to Padang Bai",
    price: "US$ 35",
    images: ["https://gilisnorkelingtour.com/wp-content/uploads/elementor/thumbs/1562239814_eka-jaya-fast-boat-cruising-to-gili-trawangan-riee2oag53zae4kim6c6xhkgsqoqmhssmr5d57jhv4.jpg"],
    description: "Boat Ticket Information\nOperator: Eka Jaya Fast Boat\nRoute: Gili Islands to Padang Bai, Bali",
    highlights: ["2 hours duration", "Instan Booking", "Easy Cancel", "Secure"],
    itinerary: [
      { time: "Departure", title: "Gili Islands", desc: "Departure Point: Gili Trawangan / Gili Air / Gili Meno (select appropriate island). Check-In: 1 hour before departure. Departure Time: [Specify time based on schedule]" },
      { time: "Journey", title: "Fast Boat Transfer", desc: "Duration: Approximately 1.5 - 2 hours (depending on weather and sea conditions)." },
      { time: "Arrival", title: "Padang Bai, Bali", desc: "Estimated Arrival Time: [Specify time based on schedule]" }
    ],
    includes: [
      "One-way fast boat transfer from Gili Islands to Padang Bai, Bali",
      "Comfortable seating with air-conditioning",
      "Life jackets and safety equipment onboard",
      "Luggage handling (1 large bag and 1 hand-carry per passenger)"
    ],
    excludes: [
      "Hotel transfer in Bali (unless otherwise specified)",
      "Personal expenses",
      "Extra luggage (may incur additional charges)"
    ]
  }
};

export default function FastBoatDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  
  if (!slug || !FASTBOAT_DATA[slug]) {
    return notFound();
  }

  const data = FASTBOAT_DATA[slug];

  return <ServiceDetailTemplate {...data} />;
}
