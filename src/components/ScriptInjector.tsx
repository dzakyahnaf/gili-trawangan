import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

/**
 * Cached query for site settings — revalidates every 60 seconds.
 * This prevents a DB query on every single page request.
 */
const getCachedSettings = unstable_cache(
  async () => {
    const rows = await prisma.siteContent.findMany({
      where: { group: "settings" },
    });
    const map: Record<string, string> = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return map;
  },
  ["site-settings"],
  { revalidate: 60 }
);

interface ScriptInjectorProps {
  position: "head" | "body" | "footer";
}

/**
 * Server component that reads scripts from DB and injects them at the
 * specified position (head / body / footer) via dangerouslySetInnerHTML.
 */
export async function ScriptInjector({ position }: ScriptInjectorProps) {
  const settings = await getCachedSettings();
  const key = `script_${position}`;
  const script = settings[key];

  if (!script || script.trim().length === 0) return null;

  return <div dangerouslySetInnerHTML={{ __html: script }} />;
}

/**
 * Server component that injects the WhatsApp number from DB as a global
 * variable so client components can read it without a DB query.
 */
export async function WaNumberInjector() {
  const settings = await getCachedSettings();
  const waNumber = settings.wa_number;

  if (!waNumber || waNumber.trim().length === 0) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__WA_NUMBER="${waNumber}";`,
      }}
    />
  );
}

/**
 * Returns whether admin has filled in head/body scripts in the DB.
 * Used by layout.tsx to decide whether to skip the hardcoded GTM components.
 */
export async function hasAdminScripts(): Promise<{ head: boolean; body: boolean }> {
  const settings = await getCachedSettings();
  return {
    head: !!(settings.script_head && settings.script_head.trim().length > 0),
    body: !!(settings.script_body && settings.script_body.trim().length > 0),
  };
}
