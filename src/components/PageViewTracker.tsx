"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/lib/gtm";

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.toString();
    const url = pathname + (search ? `?${search}` : "");
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
