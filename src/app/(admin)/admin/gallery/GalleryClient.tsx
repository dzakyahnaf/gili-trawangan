"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { createGalleryItem, deleteGalleryItem } from "@/app/actions/admin";
import { X, Upload, Loader2, Trash2 } from "lucide-react";

interface Props {
  initialGallery: Array<{
    id: string;
    imageUrl: string;
    caption: string | null;
    category: string;
  }>;
}

export default function GalleryClient({ initialGallery }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("package");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("File gambar wajib diunggah.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("category", category);

    setError("");
    startTransition(async () => {
      try {
        await createGalleryItem(formData);
        setIsOpen(false);
        setCaption("");
        setFile(null);
      } catch (err: any) {
        setError(err.message || "Gagal mengunggah foto.");
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini?")) return;
    startTransition(async () => {
      try {
        await deleteGalleryItem(id);
      } catch (err: any) {
        alert(err.message || "Gagal menghapus foto.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors flex items-center gap-2"
        >
          <Upload className="w-4 h-4" /> Upload Foto
        </button>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialGallery.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group relative">
            <div className="relative h-48 bg-gray-100">
              <Image 
                src={img.imageUrl} 
                alt={img.caption || ""} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover" 
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
                  {img.caption || "Tanpa Keterangan"}
                </p>
                <p className="text-xs text-gray-400 capitalize">{img.category}</p>
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                disabled={isPending}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Upload Foto Baru</h2>
              <p className="text-xs text-gray-400">Pilih gambar dan masukkan kategori galeri.</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Pilih Gambar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gili-50 file:text-gili-700 hover:file:bg-gili-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Keterangan / Caption</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Contoh: Berenang bersama penyu di Gili"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                >
                  <option value="package">Paket Wisata</option>
                  <option value="activity">Aktivitas</option>
                  <option value="speedboat">Speedboat</option>
                  <option value="snorkeling">Snorkeling</option>
                  <option value="lombok">Lombok Tour</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 font-semibold text-xs transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-gili-500 text-white font-semibold text-xs hover:bg-gili-600 transition-colors flex items-center gap-1.5 shadow-md shadow-gili-100 disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Mengunggah...
                    </>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
