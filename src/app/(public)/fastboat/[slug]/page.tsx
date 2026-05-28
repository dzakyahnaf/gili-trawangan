"use client";
import ServiceDetailTemplate from "@/components/public/ServiceDetailTemplate";
import { notFound, useParams } from "next/navigation";
import { useLang } from "@/components/LangProvider";

const FASTBOAT_DATA: Record<string, any> = {
  "super-scoot-fast-boat-sanur-lembongan-penida-gili-lombok-route": {
    title: "Super Scoot Fast Boat: Sanur – Lembongan – Penida – Gili – Lombok Route:",
    price: "US$ 30",
    images: ["/images/boat1.jpg"],
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
    images: ["/images/boat2.jpg"],
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
    images: ["/images/Wanderlust-Fast-Boat.jpg"],
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
    images: ["/images/virendra-fast-boat.jpg"],
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
    images: ["/images/gili-gili-fast-boat.jpg"],
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
    images: ["/images/eka-jaya-fast-boat.jpg"],
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
  },
  "d-camel-fast-ferry": {
    images: ["/images/dcamel-fast-ferry.jpg"],
    en: {
      title: "D'Camel Fast Ferry: Bali - Nusa Penida - Lombok - Gili",
      description: "D'Camel Fast Ferry offers professional sea transfer services across Bali, Nusa Lembongan, Lombok, and Gili Trawangan. The perfect choice for island-hoppers seeking flexibility and comfort.",
      highlights: ["Multi-destination network", "Professional marine crew", "Multiple daily runs", "Spacious luggage room"],
      itinerary: [
        { time: "08:30", title: "Sanur Check-in", desc: "Arrive at Sanur harbor for boarding passes." },
        { time: "09:30", title: "Set Sail", desc: "Cruising towards Gili Trawangan or Lombok." },
        { time: "12:00", title: "Island Arrival", desc: "Arrive at your dream island destination." }
      ],
      includes: ["Fast boat ticket", "AC cabin", "Safety vests", "Luggage handling"],
      excludes: ["Land transfers", "Personal expenses"]
    },
    id: {
      title: "D'Camel Fast Ferry: Bali - Nusa Penida - Lombok - Gili",
      description: "D'Camel Fast Ferry menawarkan layanan transfer laut profesional di seluruh Bali, Nusa Lembongan, Lombok, dan Gili Trawangan. Pilihan sempurna untuk penjelajah pulau yang mencari fleksibilitas dan kenyamanan.",
      highlights: ["Jaringan multi-destinasi", "Kru laut profesional", "Banyak rute harian", "Ruang bagasi luas"],
      itinerary: [
        { time: "08:30", title: "Check-in Sanur", desc: "Tiba di pelabuhan Sanur untuk boarding pass." },
        { time: "09:30", title: "Berlayar", desc: "Berlayar menuju Gili Trawangan atau Lombok." },
        { time: "12:00", title: "Tiba di Pulau", desc: "Tiba di destinasi pulau impian Anda." }
      ],
      includes: ["Tiket kapal cepat", "Kabin AC", "Rompi penyelamat", "Penanganan bagasi"],
      excludes: ["Transfer darat", "Pengeluaran pribadi"]
    }
  }
};

export default function FastBoatDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLang();
  
  if (!slug || !FASTBOAT_DATA[slug]) {
    return notFound();
  }

  const data = FASTBOAT_DATA[slug];
  const price = slug === "eka-jaya-fast-boat-gili-to-padang-bai"
    ? (locale === "id" ? "Rp 650.000" : "US$ 45")
    : (locale === "id" ? "Rp 400.000" : "US$ 28");

  const localizedData = {
    ...data,
    price,
    ...(data[locale] || data.en)
  };

  return <ServiceDetailTemplate {...localizedData} />;
}
