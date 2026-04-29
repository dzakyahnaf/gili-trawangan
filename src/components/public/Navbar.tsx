"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Paket Wisata", href: "/packages" },
  { label: "Aktivitas", href: "/activities" },
  { label: "Fast Boat", href: "/fastboat" },
  { label: "Speedboat", href: "/speedboat" },
  { label: "Tentang", href: "/about" },
  { label: "Kontak", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow relative">
              <Image 
                src="/logos/logo-boat.png" 
                alt="Logo RH Tour" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <span className={`font-bold text-lg leading-none ${isSolid ? "text-gray-900" : "text-white"}`}>
                RH Tour
              </span>
              <span className={`block text-[10px] leading-none ${isSolid ? "text-ocean-600" : "text-ocean-200"}`}>
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isSolid
                    ? "text-gray-700 hover:text-ocean-600 hover:bg-ocean-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="ml-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-coral-500 to-coral-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg ${isSolid ? "text-gray-900" : "text-white"}`}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden pb-4 animate-slide-down">
            <div className="bg-white rounded-2xl shadow-2xl p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-ocean-50 hover:text-ocean-600 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="block text-center mt-2 px-4 py-3 rounded-xl bg-linear-to-r from-coral-500 to-coral-600 text-white font-semibold"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
