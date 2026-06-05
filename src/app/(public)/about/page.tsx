import { prisma } from "@/lib/prisma";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  const contentRows = await prisma.siteContent.findMany({
    where: {
      key: {
        in: ["about_text_id", "about_text_en"],
      },
    },
  });

  const contentMap = contentRows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <AboutClient
      aboutTextId={contentMap.about_text_id}
      aboutTextEn={contentMap.about_text_en}
    />
  );
}

