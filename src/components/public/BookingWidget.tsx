"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

const categories = [
  { value: "snorkeling", label: "🤿 Snorkeling" },
  { value: "lombok-tour", label: "🗺️ Lombok Tour" },
  { value: "rinjani-tracking", label: "⛰️ Rinjani Tracking" },
  { value: "fastboat", label: "🚢 Fast Boat" },
  { value: "private-speed-boat-and-car", label: "⚡ Private Speedboat" },
  { value: "packages", label: "🏖️ Paket Wisata Lengkap" },
];

const tripTypes = [
  { value: "sharing", label: "Sharing Trip (Gabung Rombongan)" },
  { value: "private", label: "Private Trip (Eksklusif)" },
];

/**
 * BookingWidget — quick-booking / inquiry search form embedded in the Hero.
 * Converts directly to WhatsApp (most common conversion path for Indonesian tourists).
 */
export default function BookingWidget() {
  const [category, setCategory] = useState("");
  const [tripType, setTripType] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    const selectedCat =
      categories.find((c) => c.value === category)?.label || "wisata";
    const selectedType =
      tripTypes.find((t) => t.value === tripType)?.label || "";
    const selectedDate = date
      ? new Date(date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

    const parts = [`Halo RH Tour & Travel!`];
    parts.push(`Saya tertarik dengan paket ${selectedCat}.`);
    if (selectedType) parts.push(`Tipe: ${selectedType}.`);
    if (selectedDate) parts.push(`Tanggal perjalanan: ${selectedDate}.`);
    parts.push(`Mohon info ketersediaan dan harganya. Terima kasih 😊`);

    const msg = parts.join(" ");
    window.open(
      getWhatsAppLink(msg),
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Minimum date = today
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-slide-up">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Kategori Wisata */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-white text-gray-800 font-medium rounded-xl px-4 py-3.5 pr-10 text-sm focus:ring-2 focus:ring-accent-500 outline-none cursor-pointer border-0 shadow-sm"
              aria-label="Pilih Kategori Wisata"
            >
              <option value="">🏝️ Pilih Kategori Wisata</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Tipe Trip */}
          <div className="relative">
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="w-full appearance-none bg-white text-gray-800 font-medium rounded-xl px-4 py-3.5 pr-10 text-sm focus:ring-2 focus:ring-accent-500 outline-none cursor-pointer border-0 shadow-sm"
              aria-label="Pilih Tipe Trip"
            >
              <option value="">👥 Tipe Trip</option>
              {tripTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Tanggal */}
          <div className="relative">
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white text-gray-800 font-medium rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-accent-500 outline-none border-0 shadow-sm cursor-pointer"
              aria-label="Pilih Tanggal Perjalanan"
            />
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSearch}
          className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent-500 text-gili-900 font-bold text-base hover:bg-accent-400 active:scale-[0.98] transition-all shadow-lg hover:shadow-accent-500/30"
          aria-label="Pesan via WhatsApp"
        >
          <Search className="w-5 h-5" />
          Pesan Sekarang via WhatsApp
        </button>
      </div>

      {/* Trust micro-copy */}
      <p className="text-center text-white/70 text-xs mt-3 tracking-wide">
        ⚡ Respon dalam 5 menit &nbsp;·&nbsp; 🔒 Booking aman &nbsp;·&nbsp; 💯
        Harga terjangkau
      </p>
    </div>
  );
}
