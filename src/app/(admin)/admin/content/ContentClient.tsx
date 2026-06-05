"use client";

import { useState, useTransition } from "react";
import { saveContentSettings, ContentSettings } from "@/app/actions/admin";
import { Loader2, Save } from "lucide-react";

interface Props {
  initialSettings: ContentSettings;
}

export default function ContentClient({ initialSettings }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // States
  const [heroTitleId, setHeroTitleId] = useState(initialSettings.hero_title_id);
  const [heroTitleEn, setHeroTitleEn] = useState(initialSettings.hero_title_en);
  const [heroSubtitleId, setHeroSubtitleId] = useState(initialSettings.hero_subtitle_id);
  const [heroSubtitleEn, setHeroSubtitleEn] = useState(initialSettings.hero_subtitle_en);
  const [aboutTextId, setAboutTextId] = useState(initialSettings.about_text_id);
  const [aboutTextEn, setAboutTextEn] = useState(initialSettings.about_text_en);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        await saveContentSettings({
          hero_title_id: heroTitleId,
          hero_title_en: heroTitleEn,
          hero_subtitle_id: heroSubtitleId,
          hero_subtitle_en: heroSubtitleEn,
          about_text_id: aboutTextId,
          about_text_en: aboutTextEn,
        });
        setSuccess("Konten berhasil disimpan!");
      } catch (err: any) {
        setError(err.message || "Gagal menyimpan konten.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Konten Halaman</h1>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-xs text-green-600 font-medium">
          ✅ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Hero Section</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Judul Hero (Indonesia)</label>
              <textarea
                value={heroTitleId}
                onChange={(e) => setHeroTitleId(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-gray-50 focus:bg-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Judul Hero (English)</label>
              <textarea
                value={heroTitleEn}
                onChange={(e) => setHeroTitleEn(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-gray-50 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Sub Judul Hero (Indonesia)</label>
              <textarea
                value={heroSubtitleId}
                onChange={(e) => setHeroSubtitleId(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-gray-50 focus:bg-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Sub Judul Hero (English)</label>
              <textarea
                value={heroSubtitleEn}
                onChange={(e) => setHeroSubtitleEn(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-gray-50 focus:bg-white transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Tentang Kami Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base">Tentang Kami (About Page)</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Teks Tentang Kami (Indonesia)</label>
              <textarea
                value={aboutTextId}
                onChange={(e) => setAboutTextId(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-gray-50 focus:bg-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Teks Tentang Kami (English)</label>
              <textarea
                value={aboutTextEn}
                onChange={(e) => setAboutTextEn(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-gray-50 focus:bg-white transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 rounded-xl bg-gili-500 text-white font-semibold text-sm hover:bg-gili-600 transition-all flex items-center gap-2 shadow-md shadow-gili-100 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
