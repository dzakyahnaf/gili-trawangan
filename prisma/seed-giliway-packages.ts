import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding giliway packages...");

  const newPackages = [
    {
      slug: "horseback-riding-experience-in-gili-meno",
      title: "Horseback Riding Experience in Gili Meno",
      subtitle: "Add a touch of magic to your island getaway",
      category: "activity",
      description: "Add a touch of magic to your island getaway with an approximately 1-hour horseback riding experience along the beautiful beaches. Available on Gili Air, Gili Trawangan, and Gili Meno. You can enjoy a flexible starting time, allowing you to ride during the stunning sunrise or the golden sunset. A friendly guide or instructor will assist you throughout the ride, and the package conveniently includes a hotel or meeting-point pickup at your chosen starting island.",
      duration: "1 Jam",
      price: 500000,
      priceChild: 500000,
      coverImage: "https://www.giliway.com/tour-packages/images/tour/horseback-riding-experience-in-gili-meno-17.jpeg",
      includes: ["Hotel/meeting-point pickup on Gili Meno", "Horseback riding experience", "Friendly guide/instructor"],
      excludes: ["Meals & drinks", "Personal expenses"],
      programs: ["Horseback riding experience", "Sunset/Sunrise riding"],
      itinerary: [
        { day: 1, title: "Horse Riding", activities: ["Flexible Starting Time: Sunrise or Sunset", "Hotel/meeting-point pickup on Gili Meno", "Approx. 1 hour horse riding"] }
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
      description: "Experience the calm morning sea and beautiful sunrise views from the water with this exclusive fishing trip. Starting at 6 am in front of the Jungle Bar in Gili Trawangan, this experience takes you to prime fishing spots selected by local experts familiar with the waters of Gili and Lombok. It is perfectly suitable for both beginners and experienced anglers. Packages are available for private or small groups (max 4 persons). It includes all necessary fishing gear, rods, an experienced local guide, and an optional barbeque if you catch fish during the trip.",
      duration: "3 - 5 Jam",
      price: 2250000,
      priceChild: 2250000,
      coverImage: "https://www.giliway.com/tour-packages/images/tour/sunrise-fishing-trip-gili-trawangan-67.jpeg",
      includes: ["Fishing gear & rod", "Experienced local fishing guide", "Boat trip to fishing spots", "Optional BBQ if you Catch Fish", "Private or small group experience"],
      excludes: ["Transportation to/from meeting point", "Meals & drinks", "Personal expenses", "Tips/gratuities"],
      programs: ["Sunrise Fishing", "Boat Trip", "Optional BBQ"],
      itinerary: [
        { day: 1, title: "Fishing Trip", activities: ["06:00 am - Meeting Point: Front of Jungle Bar Gili Trawangan", "Experience the calm morning sea and beautiful sunrise views", "Fishing spots selected by local experts", "Optional barbeque if you catch fish during the trip"] }
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
