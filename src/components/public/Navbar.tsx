"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Globe, ChevronDown } from "lucide-react";
import { useLang } from "@/components/LangProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t, toggleLocale } = useLang();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const serviceLinks = [
    { label: t.nav.packages, href: "/packages" },
    { label: t.nav.rinjani, href: "/rinjani-tracking" },
    { label: t.nav.fastboat, href: "/fastboat" },
    { label: t.nav.snorkeling, href: "/snorkeling" },
    { label: t.nav.lombokTour, href: "/lombok-tour" },
    { label: t.nav.privateSpeedboatCar, href: "/private-speed-boat-and-car" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", h);
      window.removeEventListener("mousedown", handleClickOutside);
    };
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
      } else if (q.includes("fast") || q.includes("boat")) {
        router.push("/fastboat");
      } else if (q.includes("speed")) {
        router.push("/private-speed-boat-and-car");
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
                sizes="100px"
                className="object-cover"
                priority
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
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-accent-400 bg-white/10"
                  : "text-white/90 hover:text-accent-400 hover:bg-white/10"
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Our Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  serviceLinks.some(link => pathname === link.href)
                    ? "text-accent-400 bg-white/10"
                    : "text-white/90 hover:text-accent-400 hover:bg-white/10"
                }`}
              >
                {t.nav.ourServices}
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 animate-slide-up border border-gray-100">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        pathname === link.href
                          ? "bg-gili-50 text-gili-600 font-semibold"
                          : "text-gray-700 hover:bg-gili-50 hover:text-gili-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-accent-400 bg-white/10"
                  : "text-white/90 hover:text-accent-400 hover:bg-white/10"
              }`}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-accent-400 bg-white/10"
                  : "text-white/90 hover:text-accent-400 hover:bg-white/10"
              }`}
            >
              {t.nav.contact}
            </Link>

            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Pencarian"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 mx-2">
              <span className={`text-xs font-bold transition-colors ${locale === "id" ? "text-white" : "text-white/50"}`}>
                ID
              </span>
              <button
                onClick={toggleLocale}
                className="w-11 h-6 rounded-full bg-white/20 relative shadow-inner border border-white/10 hover:bg-white/30 transition-colors"
                aria-label="Ganti bahasa"
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                    locale === "en" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-bold transition-colors ${locale === "en" ? "text-white" : "text-white/50"}`}>
                EN
              </span>
            </div>

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
            <div className="flex items-center gap-1.5 mx-1">
              <span className={`text-[10px] font-bold ${locale === "id" ? "text-white" : "text-white/60"}`}>
                ID
              </span>
              <button
                onClick={toggleLocale}
                className="w-9 h-5 rounded-full bg-white/20 relative border border-white/10"
                aria-label="Ganti bahasa"
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                    locale === "en" ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-[10px] font-bold ${locale === "en" ? "text-white" : "text-white/60"}`}>
                EN
              </span>
            </div>
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
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  pathname === "/" ? "bg-gili-50 text-gili-600" : "text-gray-700 hover:bg-gili-50 hover:text-gili-600"
                }`}
              >
                {t.nav.home}
              </Link>

              {/* Mobile Our Services */}
              <div className="px-4 py-3 border-t border-gray-100 mt-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.nav.ourServices}</p>
                <div className="grid grid-cols-1 gap-1">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        pathname === link.href ? "text-gili-600 font-bold bg-gili-50" : "text-gray-600 hover:text-gili-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors border-t border-gray-100 ${
                  pathname === "/about" ? "bg-gili-50 text-gili-600" : "text-gray-700 hover:bg-gili-50 hover:text-gili-600"
                }`}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  pathname === "/contact" ? "bg-gili-50 text-gili-600" : "text-gray-700 hover:bg-gili-50 hover:text-gili-600"
                }`}
              >
                {t.nav.contact}
              </Link>
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
