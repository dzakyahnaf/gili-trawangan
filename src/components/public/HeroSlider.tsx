"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1558235213-9a3d46387063?q=80&w=1920&auto=format&fit=crop",
    alt: "Pemandangan udara perahu di perairan Gili Trawangan",
  },
  {
    src: "https://images.unsplash.com/photo-1525946803233-8986dfef369a?q=80&w=1920&auto=format&fit=crop",
    alt: "Sunset di pantai Gili Trawangan dengan berkuda",
  },
  {
    src: "https://images.unsplash.com/photo-1544256743-3482782e5699?q=80&w=1920&auto=format&fit=crop",
    alt: "Penyu berenang di perairan jernih Gili Trawangan",
  },
  {
    src: "https://images.unsplash.com/photo-1549488497-256686153673?q=80&w=1920&auto=format&fit=crop",
    alt: "Panorama laguna Gili Trawangan dengan perahu tradisional",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        aria-label="Slide berikutnya"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-accent-500 w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
