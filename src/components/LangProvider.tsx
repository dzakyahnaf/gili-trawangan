"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Locale, type TranslationKeys } from "@/lib/i18n";

interface LangContextType {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("rh-lang", l);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "id" ? "en" : "id";
      if (typeof window !== "undefined") {
        localStorage.setItem("rh-lang", next);
      }
      return next;
    });
  }, []);

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
