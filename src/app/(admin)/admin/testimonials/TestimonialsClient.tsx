"use client";

import { useState, useTransition } from "react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions/admin";
import { X, Plus, Edit2, Trash2, Star, Loader2 } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  origin: string;
  rating: number;
  comment: string;
  date: string;
}

interface Props {
  initialTestimonials: TestimonialItem[];
}

export default function TestimonialsClient({ initialTestimonials }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Form states
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");

  function openNewModal() {
    setEditId(null);
    setName("");
    setOrigin("");
    setRating(5);
    setComment("");
    setDate(new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }));
    setError("");
    setIsOpen(true);
  }

  function openEditModal(t: TestimonialItem) {
    setEditId(t.id);
    setName(t.name);
    setOrigin(t.origin);
    setRating(t.rating);
    setComment(t.comment);
    setDate(t.date);
    setError("");
    setIsOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !origin.trim() || !comment.trim() || !date.trim()) {
      setError("Semua field wajib diisi.");
      return;
    }

    const payload = { name, origin, rating, comment, date };
    setError("");

    startTransition(async () => {
      try {
        if (editId) {
          await updateTestimonial(editId, payload);
        } else {
          await createTestimonial(payload);
        }
        setIsOpen(false);
      } catch (err: any) {
        setError(err.message || "Gagal menyimpan testimonial.");
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus testimonial ini?")) return;
    startTransition(async () => {
      try {
        await deleteTestimonial(id);
      } catch (err: any) {
        alert(err.message || "Gagal menghapus testimonial.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Testimonial</h1>
        <button
          onClick={openNewModal}
          className="px-4 py-2 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {initialTestimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3 relative group">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(t)}
                  className="text-gray-500 hover:text-gili-600 p-1 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-gray-500 hover:text-red-600 p-1 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">&ldquo;{t.comment}&rdquo;</p>
            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-50">
              <div>
                <span className="font-semibold text-gray-900">{t.name}</span> · <span className="text-gray-400">{t.origin}</span>
              </div>
              <span className="text-gray-400 text-xs">{t.date}</span>
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
              <h2 className="text-lg font-bold text-gray-900">
                {editId ? "Edit Testimonial" : "Tambah Testimonial Baru"}
              </h2>
              <p className="text-xs text-gray-400">Masukkan ulasan pelanggan di bawah ini.</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Customer</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: John Doe"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Asal / Negara</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Contoh: Australia"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                  >
                    <option value={5}>⭐ 5 Stars</option>
                    <option value={4}>⭐ 4 Stars</option>
                    <option value={3}>⭐ 3 Stars</option>
                    <option value={2}>⭐ 2 Stars</option>
                    <option value={1}>⭐ 1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Bulan/Tahun</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Contoh: Juni 2026"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Ulasan / Komentar</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Tulis ulasan customer di sini..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 resize-none bg-gray-50"
                  required
                />
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
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
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
