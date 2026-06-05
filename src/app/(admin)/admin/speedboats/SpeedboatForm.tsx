"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSpeedboat, updateSpeedboat } from "@/app/actions/admin";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  initialData?: any; // Speedboat model
}

export default function SpeedboatForm({ initialData }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Fields
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [capacity, setCapacity] = useState(initialData?.capacity?.toString() || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [priceUnit, setPriceUnit] = useState(initialData?.priceUnit || "per_boat");
  const [isActive, setIsActive] = useState(initialData?.isActive !== false);

  const [routes, setRoutes] = useState(initialData?.routes?.join("\n") || "");
  const [facilities, setFacilities] = useState(initialData?.facilities?.join("\n") || "");

  const [files, setFiles] = useState<FileList | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama speedboat wajib diisi.");
      return;
    }

    const priceNum = parseInt(price) || 0;
    if (priceNum < 0) {
      setError("Harga tidak boleh negatif.");
      return;
    }

    const capacityNum = parseInt(capacity) || 0;
    if (capacityNum < 0) {
      setError("Kapasitas tidak boleh negatif.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("capacity", capacity);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("priceUnit", priceUnit);
    formData.append("isActive", isActive.toString());
    formData.append("routes", routes);
    formData.append("facilities", facilities);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }

    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateSpeedboat(initialData.id, formData);
        } else {
          await createSpeedboat(formData);
        }
        router.push("/admin/speedboats");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Gagal menyimpan speedboat.");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/speedboats" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {initialData ? "Edit Charter Speedboat" : "Tambah Charter Speedboat Baru"}
          </h1>
          <p className="text-xs text-gray-400">Lengkapi detail charter speedboat privat.</p>
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
              <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Speedboat</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Private Speedboat Charter Gili Islands"
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
                placeholder="Contoh: One Way / Full Day 8 Hours"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Kapasitas Maksimal (Pax)</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Contoh: 10"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Harga Charter (IDR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contoh: 1200000"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Satuan Harga</label>
              <select
                value={priceUnit}
                onChange={(e) => setPriceUnit(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
              >
                <option value="per_boat">Per Kapal (Per Boat)</option>
                <option value="per_trip">Per Perjalanan (Per Trip)</option>
                <option value="per_pax">Per Penumpang (Per Pax)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Deskripsi Speedboat</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Ceritakan detail ulasan armada & rute speedboat privat ini..."
              className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
              required
            />
          </div>
        </div>

        {/* Gambar & Rute */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Media & Highlight</h2>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Galeri Foto Speedboat (Bisa pilih banyak)</label>
            {initialData?.images && initialData.images.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {initialData.images.map((img: string, idx: number) => (
                  <div key={idx} className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <Image src={img} alt="boat" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gili-50 file:text-gili-700 hover:file:bg-gili-100"
              required={!initialData}
            />
            <p className="text-[10px] text-gray-400 mt-1">Catatan: Mengunggah gambar baru akan menggantikan seluruh galeri foto sebelumnya.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Pilihan Rute Layanan (Satu per baris)</label>
              <textarea
                value={routes}
                onChange={(e) => setRoutes(e.target.value)}
                rows={4}
                placeholder="Contoh:&#10;Teluk Nare - Gili Trawangan&#10;Padangbai - Gili Air"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Fasilitas Termasuk (Satu per baris)</label>
              <textarea
                value={facilities}
                onChange={(e) => setFacilities(e.target.value)}
                rows={4}
                placeholder="Contoh:&#10;Life Jacket&#10;Mineral Water&#10;Captain & Crew"
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
            href="/admin/speedboats"
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
              "Simpan Speedboat"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
