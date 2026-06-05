"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface SiteSettings {
  script_head: string;
  script_body: string;
  script_footer: string;
  wa_number: string;
}

const SETTINGS_KEYS: (keyof SiteSettings)[] = [
  "script_head",
  "script_body",
  "script_footer",
  "wa_number",
];

/**
 * Read all site settings (group = "settings") as key-value object.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const rows = await prisma.siteContent.findMany({
    where: { group: "settings" },
  });

  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }

  return {
    script_head: map.script_head ?? "",
    script_body: map.script_body ?? "",
    script_footer: map.script_footer ?? "",
    wa_number: map.wa_number ?? "",
  };
}

/**
 * Upsert all 4 settings keys at once.
 */
export async function saveSiteSettings(data: SiteSettings) {
  const ops = SETTINGS_KEYS.map((key) =>
    prisma.siteContent.upsert({
      where: { key },
      update: { value: data[key] ?? "" },
      create: { key, value: data[key] ?? "", group: "settings" },
    })
  );

  await prisma.$transaction(ops);

  // Revalidate all public pages so scripts get re-rendered
  revalidatePath("/", "layout");
}
