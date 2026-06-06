import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding giliway packages...");

  const newPackages = [
    {
      slug: "private-horseback-riding-experience-gili-air",
      title: "Private Horseback Riding Experience Gili Air",
      subtitle: "Enjoy a scenic beach ride on Gili Air with sunrise or sunset views",
      category: "activity",
      description: "Experience the beauty of Gili Air in a unique and unforgettable way with a private horseback riding experience along the island's scenic beach. Ride peacefully along the coastline while enjoying breathtaking ocean views, fresh sea breeze, and the relaxed atmosphere that makes Gili Air one of the most charming islands in Lombok. This horseback riding experience is suitable for beginners and experienced riders alike. Accompanied by a friendly local guide, you will enjoy a calm and comfortable ride around selected beach areas with flexible departure times available during sunrise or sunset for the best island atmosphere and photo opportunities. Whether you are traveling as a couple, with friends, or as a solo traveler, this experience offers a memorable way to explore the natural beauty of Gili Air while creating stunning moments by the beach.",
      duration: "1 Jam",
      price: 500000,
      priceChild: 500000,
      coverImage: "https://www.giliway.com/images/tour/private-horseback-riding-experience-gili-air-58.jpeg",
      includes: [
        "Private horseback riding experience",
        "Friendly local guide/instructor",
        "Hotel or meeting point pickup in Gili Air",
        "Approximately 1-hour horseback riding session"
      ],
      excludes: [
        "Meals and drinks",
        "Personal expenses",
        "Professional photography services",
        "Tips for guide/instructor"
      ],
      programs: [
        "Private horseback riding experience",
        "Sunrise or Sunset riding",
        "Beach & ocean views",
        "Photography opportunities"
      ],
      itinerary: [
        {
          day: 1,
          title: "Private Horseback Riding Experience",
          activities: [
            "Hotel or meeting point pickup in Gili Air",
            "Short introduction and safety briefing before starting",
            "Relaxing horseback ride along the beautiful coastline of Gili Air",
            "Choose sunrise or sunset departure for the best lighting and views",
            "Return to starting point or accommodation area in Gili Air"
          ]
        }
      ],
      isActive: true,
      isFeatured: false,
      maxPax: 10,
    },
    {
      slug: "sunrise-fishing-trip-gili-trawangan",
      title: "Sunrise Fishing Trip Gili Trawangan",
      subtitle: "Experience the calm morning sea and beautiful sunrise views",
      category: "tour",
      description: "Experience the calm morning sea and beautiful sunrise views from the water with this exclusive private fishing trip. Starting at 6 AM from the front of Jungle Bar in Gili Trawangan, this experience takes you to prime fishing spots selected by experienced local fishermen familiar with the waters around the Gili Islands and Lombok. The trip is perfectly suitable for both beginners and experienced anglers. Available as a private or small group experience (max 4 persons), it includes high-quality fishing rods, bait, safety gear, and an experienced local fishing guide. If you're lucky enough to catch fish during the trip, you can enjoy an optional barbeque right on the spot. Common catches include tuna, mahi-mahi, giant trevally, snapper, and grouper.",
      duration: "3 - 5 Jam",
      price: 2250000,
      priceChild: 2250000,
      coverImage: "https://www.giliway.com/images/tour/private-sunrise-fishing-trip-gili-trawangan-48.jpeg",
      includes: [
        "Boat trip to fishing spots",
        "Experienced local fishing guide",
        "High-quality fishing rods & equipment",
        "Bait & safety gear",
        "Optional BBQ if you catch fish",
        "Private or small group experience (max 4 persons)"
      ],
      excludes: [
        "Hotel pickup/drop-off to meeting point",
        "Meals & drinks",
        "Personal expenses",
        "Tips for guide/crew"
      ],
      programs: [
        "Sunrise Fishing Trip",
        "Boat Trip to Prime Spots",
        "Optional Fresh BBQ"
      ],
      itinerary: [
        {
          day: 1,
          title: "Sunrise Fishing Trip",
          activities: [
            "06:00 AM — Meeting point: Front of Jungle Bar, Gili Trawangan",
            "Depart by boat during the stunning sunrise over Gili waters",
            "Fishing at prime spots selected by experienced local fishermen",
            "Catch species like tuna, mahi-mahi, giant trevally, snapper, and grouper",
            "Optional barbeque if you catch fish during the trip",
            "Return to Gili Trawangan after 3-5 hours of fishing"
          ]
        }
      ],
      isActive: true,
      isFeatured: true,
      maxPax: 4,
    }
  ];

  for (const pkg of newPackages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
    console.log(`Seeded package: ${pkg.title}`);
  }

  console.log("Finished seeding giliway packages.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
