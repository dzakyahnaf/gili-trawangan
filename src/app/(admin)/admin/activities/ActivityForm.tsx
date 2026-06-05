"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createActivity, updateActivity } from "@/app/actions/admin";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  initialData?: any; // Activity model
}

export default function ActivityForm({ initialData }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Fields
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [meetingPoint, setMeetingPoint] = useState(initialData?.meetingPoint || "");
  const [category, setCategory] = useState(initialData?.category || "snorkeling");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [priceChild, setPriceChild] = useState(initialData?.priceChild?.toString() || "");
  const [minPax, setMinPax] = useState(initialData?.minPax?.toString() || "1");
  const [maxPax, setMaxPax] = useState(initialData?.maxPax?.toString() || "100");
  const [isActive, setIsActive] = useState(initialData?.isActive !== false);

  const [schedule, setSchedule] = useState(initialData?.schedule?.join("\n") || "");
  const [includes, setIncludes] = useState(initialData?.includes?.join("\n") || "");
  const [excludes, setExcludes] = useState(initialData?.excludes?.join("\n") || "");

  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama aktivitas wajib diisi.");
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
    formData.append("name", name);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("meetingPoint", meetingPoint);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("priceChild", priceChild);
    formData.append("minPax", minPax);
    formData.append("maxPax", maxPax);
    formData.append("isActive", isActive.toString());
    formData.append("schedule", schedule);
    formData.append("includes", includes);
    formData.append("excludes", excludes);

    if (file) {
      formData.append("coverImage", file);
    }

    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateActivity(initialData.id, formData);
        } else {
          await createActivity(formData);
        }
        router.push("/admin/activities");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Gagal menyimpan aktivitas.");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/activities" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {initialData ? "Edit Aktivitas Wisata" : "Tambah Aktivitas Wisata Baru"}
          </h1>
          <p className="text-xs text-gray-400">Lengkapi detail informasi untuk aktivitas pariwisata.</p>
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
              <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Aktivitas</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: 3-Spot Snorkeling Trip Gili Islands"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Durasi</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Contoh: 4 Jam / Setengah Hari"
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
                <option value="snorkeling">Snorkeling</option>
                <option value="diving">Diving / Penyelaman</option>
                <option value="cruise">Cruise / Sunset Tour</option>
                <option value="watersport">Watersport</option>
                <option value="cycling">Cycling / Sepeda</option>
                <option value="lombok">Lombok Tour</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Meeting Point (Titik Kumpul)</label>
              <input
                type="text"
                value={meetingPoint}
                onChange={(e) => setMeetingPoint(e.target.value)}
                placeholder="Contoh: RH Tour Office, Gili Trawangan Harbour"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Deskripsi Lengkap</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Jelaskan detail ulasan tentang aktivitas ini..."
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
              required
            />
          </div>
        </div>

        {/* Harga & Pax */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Harga & Kapasitas</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Harga Dewasa (IDR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contoh: 350000"
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
                placeholder="Contoh: 175000"
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

        {/* Media & Highlight */}
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
              <label className="block text-xs font-semibold text-gray-500 mb-1">Jadwal / Jam (Satu per baris)</label>
              <textarea
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                rows={4}
                placeholder="Contoh:&#10;Pagi: 09:00 - 13:00&#10;Sore: 14:00 - 18:00"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Termasuk (Satu per baris)</label>
              <textarea
                value={includes}
                onChange={(e) => setIncludes(e.target.value)}
                rows={4}
                placeholder="Contoh:&#10;Glass Bottom Boat&#10;Snorkeling Equipment&#10;Professional Guide"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Tidak Termasuk (Satu per baris)</label>
              <textarea
                value={excludes}
                onChange={(e) => setExcludes(e.target.value)}
                rows={4}
                placeholder="Contoh:&#10;Lunch&#10;Gopro rental&#10;Tips for guide"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Pengaturan Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Status & Visibility</h2>

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

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/activities"
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
              "Simpan Aktivitas"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
