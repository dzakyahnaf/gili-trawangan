"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPackage, updatePackage } from "@/app/actions/admin";
import { Loader2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

interface Props {
  initialData?: any; // Package model
}

export default function PackageForm({ initialData }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [category, setCategory] = useState(initialData?.category || "family");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [priceChild, setPriceChild] = useState(initialData?.priceChild?.toString() || "");
  const [minPax, setMinPax] = useState(initialData?.minPax?.toString() || "1");
  const [maxPax, setMaxPax] = useState(initialData?.maxPax?.toString() || "100");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isActive, setIsActive] = useState(initialData?.isActive !== false);

  const [programs, setPrograms] = useState(initialData?.programs?.join("\n") || "");
  const [includes, setIncludes] = useState(initialData?.includes?.join("\n") || "");
  const [excludes, setExcludes] = useState(initialData?.excludes?.join("\n") || "");

  // Itinerary state
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    initialData?.itinerary
      ? (typeof initialData.itinerary === "string" ? JSON.parse(initialData.itinerary) : initialData.itinerary)
      : [{ day: 1, title: "", activities: [] }]
  );

  const [file, setFile] = useState<File | null>(null);

  function handleAddDay() {
    setItinerary([...itinerary, { day: itinerary.length + 1, title: "", activities: [] }]);
  }

  function handleRemoveDay(index: number) {
    const next = itinerary.filter((_, i) => i !== index).map((day, idx) => ({
      ...day,
      day: idx + 1,
    }));
    setItinerary(next);
  }

  function handleItineraryChange(index: number, field: string, val: string) {
    const next = [...itinerary];
    if (field === "title") {
      next[index].title = val;
    } else if (field === "activities") {
      next[index].activities = val.split("\n").map(s => s.trim()).filter(Boolean);
    }
    setItinerary(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Judul wajib diisi.");
      return;
    }

    const priceNum = parseInt(price) || 0;
    if (priceNum < 0) {
      setError("Harga tidak boleh negatif.");
      return;
    }

    const priceChildNum = priceChild ? parseInt(priceChild) : null;
    if (priceChildNum !== null && priceChildNum < 0) {
      setError("Harga anak tidak boleh negatif.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("priceChild", priceChild);
    formData.append("minPax", minPax);
    formData.append("maxPax", maxPax);
    formData.append("isFeatured", isFeatured.toString());
    formData.append("isActive", isActive.toString());
    formData.append("programs", programs);
    formData.append("includes", includes);
    formData.append("excludes", excludes);
    formData.append("itinerary", JSON.stringify(itinerary));

    if (file) {
      formData.append("coverImage", file);
    }

    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updatePackage(initialData.id, formData);
        } else {
          await createPackage(formData);
        }
        router.push("/admin/packages");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Gagal menyimpan paket.");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/packages" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {initialData ? "Edit Paket Wisata" : "Tambah Paket Wisata Baru"}
          </h1>
          <p className="text-xs text-gray-400">Silakan lengkapi detail informasi paket wisata.</p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Detail Utama */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Informasi Utama</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Judul Paket</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: 3 Days 2 Nights Gili Trawangan Escape"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Sub Judul / Tagline (Optional)</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Contoh: Best seller package with private boat snorkeling"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Durasi</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Contoh: 3 Hari 2 Malam / 1 Hari"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
              >
                <option value="honeymoon">Honeymoon</option>
                <option value="family">Family / Keluarga</option>
                <option value="group">Group / Rombongan</option>
                <option value="daytrip">Day Trip / Harian</option>
                <option value="snorkeling">Snorkeling</option>
                <option value="lombok">Lombok Tour</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Deskripsi Lengkap</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Jelaskan detail tentang keunikan paket wisata ini..."
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
              required
            />
          </div>
        </div>

        {/* Harga & Kapasitas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Harga & Kapasitas</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Harga Dewasa (IDR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contoh: 1500000"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Harga Anak (IDR) - Optional</label>
              <input
                type="number"
                value={priceChild}
                onChange={(e) => setPriceChild(e.target.value)}
                placeholder="Contoh: 750000"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Minimal Pax</label>
              <input
                type="number"
                value={minPax}
                onChange={(e) => setMinPax(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Maksimal Pax</label>
              <input
                type="number"
                value={maxPax}
                onChange={(e) => setMaxPax(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Gambar Cover & Highlight */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Cover & Highlight</h2>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Gambar Cover</label>
            {initialData?.coverImage && (
              <div className="relative w-40 h-24 rounded-xl overflow-hidden mb-3 border border-gray-200 bg-gray-50">
                <Image src={initialData.coverImage} alt="cover" fill className="object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gili-50 file:text-gili-700 hover:file:bg-gili-100"
              required={!initialData}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Program Highlight (Satu per baris)</label>
              <textarea
                value={programs}
                onChange={(e) => setPrograms(e.target.value)}
                rows={4}
                placeholder="Contoh:&#10;Private boat snorkeling&#10;Sunset tour at Gili Trawangan"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Fasilitas Termasuk (Satu per baris)</label>
              <textarea
                value={includes}
                onChange={(e) => setIncludes(e.target.value)}
                rows={4}
                placeholder="Contoh:&#10;Snorkeling gear&#10;Lunch box & Mineral water"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Tidak Termasuk (Satu per baris)</label>
              <textarea
                value={excludes}
                onChange={(e) => setExcludes(e.target.value)}
                rows={4}
                placeholder="Contoh:&#10;Personal expenses&#10;Tipping guide"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-base">Itinerary Program</h2>
            <button
              type="button"
              onClick={handleAddDay}
              className="px-3 py-1.5 rounded-lg bg-gili-50 text-gili-700 text-xs font-bold hover:bg-gili-100 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Hari
            </button>
          </div>

          <div className="space-y-4">
            {itinerary.map((day, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gili-700">Hari {day.day}</span>
                  {itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDay(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">Judul Aktivitas Hari Ini</label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => handleItineraryChange(idx, "title", e.target.value)}
                      placeholder="Contoh: Penjemputan di Airport & Snorkeling Trip"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">Kegiatan Rinci (Satu per baris)</label>
                    <textarea
                      value={day.activities.join("\n")}
                      onChange={(e) => handleItineraryChange(idx, "activities", e.target.value)}
                      rows={3}
                      placeholder="Contoh:&#10;08:00 - Penjemputan di Bandara&#10;10:00 - Naik boat ke Gili Air&#10;13:00 - Makan siang bersama"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pengaturan Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Status & Visibility</h2>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded-md border-gray-300 text-gili-500 focus:ring-gili-500"
              />
              Tampilkan sebagai Paket Unggulan (Featured)
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded-md border-gray-300 text-gili-500 focus:ring-gili-500"
              />
              Aktif / Publikasikan Halaman
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/packages"
            className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold text-sm transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-xl bg-gili-500 text-white font-semibold text-sm hover:bg-gili-600 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Paket"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
