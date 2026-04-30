"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Globe } from "lucide-react";
import { useLang } from "@/components/LangProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t, toggleLocale } = useLang();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.packages, href: "/packages" },
    { label: t.nav.activities, href: "/activities" },
    { label: t.nav.fastboat, href: "/fastboat" },
    { label: t.nav.speedboat, href: "/speedboat" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (q.includes("snorkel") || q.includes("paket") || q.includes("package")) {
        router.push("/packages");
      } else if (q.includes("aktiv") || q.includes("diving") || q.includes("activity")) {
        router.push("/activities");
      } else if (q.includes("fast") || q.includes("boat")) {
        router.push("/fastboat");
      } else if (q.includes("speed")) {
        router.push("/speedboat");
      } else if (q.includes("kontak") || q.includes("contact")) {
        router.push("/contact");
      } else {
        router.push("/packages");
      }
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gili-500 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow relative">
              <Image
                src="/logos/logo-boat.png"
                alt="Logo RH Tour"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-lg leading-none text-white">
                RH Tour
              </span>
              <span className="block text-[10px] leading-none text-accent-300">
                & Travel
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-accent-400 bg-white/10"
                    : "text-white/90 hover:text-accent-400 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Pencarian"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
              aria-label="Ganti bahasa"
            >
              <Globe className="w-4 h-4" />
              {locale === "id" ? "EN" : "ID"}
            </button>

            <Link
              href="/booking"
              className="ml-1 px-5 py-2.5 rounded-xl bg-accent-500 text-gili-900 text-sm font-semibold shadow-lg hover:bg-accent-400 hover:shadow-xl hover:scale-105 transition-all"
            >
              {t.nav.bookNow}
            </Link>
          </div>

          {/* Mobile: Search + Lang + Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-white"
              aria-label="Pencarian"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-white text-xs font-bold bg-white/10"
            >
              <Globe className="w-3.5 h-3.5" />
              {locale === "id" ? "EN" : "ID"}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-white"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {searchOpen && (
          <div className="pb-4 animate-slide-down">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-accent-500 shadow-lg"
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden pb-4 animate-slide-down">
            <div className="bg-white rounded-2xl shadow-2xl p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-gili-50 text-gili-600"
                      : "text-gray-700 hover:bg-gili-50 hover:text-gili-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="block text-center mt-2 px-4 py-3 rounded-xl bg-accent-500 text-gili-900 font-semibold"
              >
                {t.nav.bookNow}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
