"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { translations, type Locale, type TranslationKeys } from "@/lib/i18n";

interface LangContextType {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children, initialLocale = "id" }: { children: ReactNode, initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  useEffect(() => {
    // Sync with localStorage on mount if needed, but cookie is primary source of truth now
    const saved = localStorage.getItem("rh-lang") as Locale;
    if (saved && saved !== initialLocale) {
      setLocaleState(saved);
      document.cookie = `NEXT_LOCALE=${saved}; path=/; max-age=31536000`;
      router.refresh();
    }
  }, [initialLocale, router]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("rh-lang", l);
      document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000`;
      router.refresh();
    }
  }, [router]);

  const toggleLocale = useCallback(() => {
    const next = locale === "id" ? "en" : "id";
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("rh-lang", next);
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
      router.refresh();
    }
  }, [locale, router]);

  const t = translations[locale];

  return (
    <LangContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
