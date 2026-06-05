import { PrismaClient } from "@prisma/client";

const getDatabaseUrl = () => {
  let url = process.env.DATABASE_URL || "";
  if (!url) return undefined;

  const isServerlessOrBuild =
    process.env.VERCEL === "1" ||
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PHASE === "phase-production-build";

  if (isServerlessOrBuild) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set("connection_limit", "2");
      if (urlObj.port === "6543") {
        urlObj.searchParams.set("pgbouncer", "true");
      }
      return urlObj.toString();
    } catch {
      if (url.includes("connection_limit=")) {
        url = url.replace(/connection_limit=\d+/, "connection_limit=2");
      } else {
        const separator = url.includes("?") ? "&" : "?";
        url = `${url}${separator}connection_limit=2`;
      }
      return url;
    }
  }

  return url;
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(
    getDatabaseUrl()
      ? {
          datasources: {
            db: {
              url: getDatabaseUrl(),
            },
          },
        }
      : undefined
  );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
