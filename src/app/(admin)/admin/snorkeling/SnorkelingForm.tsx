"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSnorkelingPackage, updateSnorkelingPackage } from "@/app/actions/snorkeling";
import { Loader2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ItineraryItem {
  time?: string;
  title: string;
  desc?: string;
}

interface Props {
  initialData?: any;
}

export default function SnorkelingForm({ initialData }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // === Indonesian fields ===
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [highlights, setHighlights] = useState<string>(
    (initialData?.highlights || []).join("\n")
  );
  const [includes, setIncludes] = useState<string>(
    (initialData?.includes || []).join("\n")
  );
  const [excludes, setExcludes] = useState<string>(
    (initialData?.excludes || []).join("\n")
  );
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(
    initialData?.itinerary
      ? typeof initialData.itinerary === "string"
        ? JSON.parse(initialData.itinerary)
        : initialData.itinerary
      : [{ time: "", title: "", desc: "" }]
  );

  // === English fields ===
  const [nameEn, setNameEn] = useState(initialData?.nameEn || "");
  const [descriptionEn, setDescriptionEn] = useState(initialData?.descriptionEn || "");
  const [highlightsEn, setHighlightsEn] = useState<string>(
    (initialData?.highlightsEn || []).join("\n")
  );
  const [includesEn, setIncludesEn] = useState<string>(
    (initialData?.includesEn || []).join("\n")
  );
  const [excludesEn, setExcludesEn] = useState<string>(
    (initialData?.excludesEn || []).join("\n")
  );
  const [itineraryEn, setItineraryEn] = useState<ItineraryItem[]>(
    initialData?.itineraryEn
      ? typeof initialData.itineraryEn === "string"
        ? JSON.parse(initialData.itineraryEn)
        : initialData.itineraryEn
      : [{ time: "", title: "", desc: "" }]
  );

  // === Pricing & Meta ===
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [priceUSD, setPriceUSD] = useState(initialData?.priceUSD?.toString() || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [schedule, setSchedule] = useState<string>(
    (initialData?.schedule || []).join("\n")
  );
  const [meetingPoint, setMeetingPoint] = useState(
    initialData?.meetingPoint || "Sama-Sama Reggae, Gili Trawangan"
  );
  const [maxPax, setMaxPax] = useState(initialData?.maxPax?.toString() || "15");
  const [isActive, setIsActive] = useState(initialData?.isActive !== false);
  const [file, setFile] = useState<File | null>(null);

  // Itinerary helpers
  function handleItineraryChange(
    lang: "id" | "en",
    index: number,
    field: keyof ItineraryItem,
    val: string
  ) {
    if (lang === "id") {
      const next = [...itinerary];
      next[index] = { ...next[index], [field]: val };
      setItinerary(next);
    } else {
      const next = [...itineraryEn];
      next[index] = { ...next[index], [field]: val };
      setItineraryEn(next);
    }
  }

  function addItineraryItem() {
    setItinerary([...itinerary, { time: "", title: "", desc: "" }]);
    setItineraryEn([...itineraryEn, { time: "", title: "", desc: "" }]);
  }

  function removeItineraryItem(index: number) {
    setItinerary(itinerary.filter((_, i) => i !== index));
    setItineraryEn(itineraryEn.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Nama paket (ID) wajib diisi."); return; }
    if (!nameEn.trim()) { setError("Nama paket (EN) wajib diisi."); return; }
    const priceNum = parseInt(price) || 0;
    if (priceNum <= 0) { setError("Harga IDR wajib diisi."); return; }

    const fd = new FormData();
    fd.append("name", name);
    fd.append("nameEn", nameEn);
    fd.append("description", description);
    fd.append("descriptionEn", descriptionEn);
    fd.append("highlights", highlights);
    fd.append("highlightsEn", highlightsEn);
    fd.append("includes", includes);
    fd.append("includesEn", includesEn);
    fd.append("excludes", excludes);
    fd.append("excludesEn", excludesEn);
    fd.append("itinerary", JSON.stringify(itinerary));
    fd.append("itineraryEn", JSON.stringify(itineraryEn));
    fd.append("price", price);
    fd.append("priceUSD", priceUSD);
    fd.append("duration", duration);
    fd.append("schedule", schedule);
    fd.append("meetingPoint", meetingPoint);
    fd.append("maxPax", maxPax);
    fd.append("isActive", isActive.toString());
    if (file) fd.append("coverImage", file);

    // Keep local path if it already exists and file is not uploaded
    const localImagePathOverride = (e.currentTarget as HTMLFormElement).elements.namedItem("localImagePath") as HTMLInputElement;
    if (!file && localImagePathOverride && localImagePathOverride.value.trim()) {
      fd.append("localImagePath", localImagePathOverride.value.trim());
    }

    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateSnorkelingPackage(initialData.id, fd);
        } else {
          await createSnorkelingPackage(fd);
        }
        router.push("/admin/snorkeling");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Gagal menyimpan paket.");
      }
    });
  }

  const inputCls = "w-full px-3 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500";
  const textareaCls = `${inputCls} resize-none`;
  const labelCls = "block text-xs font-semibold text-gray-500 mb-1";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/snorkeling" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {initialData ? "Edit Paket Snorkeling" : "Tambah Paket Snorkeling Baru"}
          </h1>
          <p className="text-xs text-gray-400">
            Isi semua field Indonesia dan Inggris agar switch bahasa berfungsi di website.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* === NAMA & DESKRIPSI === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b pb-2">Nama & Deskripsi</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nama Paket 🇮🇩</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Snorkeling Privat 4 Jam" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Package Name 🇬🇧</label>
              <input type="text" value={nameEn} onChange={(e) => setNameEn(e.target.value)}
                placeholder="Example: Private Snorkeling 4 Hours" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Deskripsi 🇮🇩</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                rows={4} placeholder="Deskripsi dalam Bahasa Indonesia..." className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Description 🇬🇧</label>
              <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)}
                rows={4} placeholder="Description in English..." className={textareaCls} />
            </div>
          </div>
        </div>

        {/* === HIGHLIGHT === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b pb-2">Highlights (Satu per baris)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Highlights 🇮🇩</label>
              <textarea value={highlights} onChange={(e) => setHighlights(e.target.value)}
                rows={4} placeholder={"Patung Bawah Laut Meno\nTurtle Point\nTaman Ikan Gili Air"}
                className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Highlights 🇬🇧</label>
              <textarea value={highlightsEn} onChange={(e) => setHighlightsEn(e.target.value)}
                rows={4} placeholder={"Meno Wall Statues\nTurtle Point\nGili Air Fish Garden"}
                className={textareaCls} />
            </div>
          </div>
        </div>

        {/* === INCLUDES / EXCLUDES === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b pb-2">Termasuk & Tidak Termasuk (Satu per baris)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Termasuk 🇮🇩</label>
              <textarea value={includes} onChange={(e) => setIncludes(e.target.value)}
                rows={4} placeholder={"Alat Snorkeling\nJaket Pelampung\nKapten Kapal"}
                className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Includes 🇬🇧</label>
              <textarea value={includesEn} onChange={(e) => setIncludesEn(e.target.value)}
                rows={4} placeholder={"Snorkeling Gear\nLife Jacket\nBoat Captain"}
                className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Tidak Termasuk 🇮🇩</label>
              <textarea value={excludes} onChange={(e) => setExcludes(e.target.value)}
                rows={3} placeholder={"Makan Siang\nFoto GoPro\nHanduk"}
                className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Excludes 🇬🇧</label>
              <textarea value={excludesEn} onChange={(e) => setExcludesEn(e.target.value)}
                rows={3} placeholder={"Lunch\nGoPro Photos\nTowels"}
                className={textareaCls} />
            </div>
          </div>
        </div>

        {/* === ITINERARY === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="font-bold text-gray-900 text-base">Itinerary / Timeline</h2>
            <button type="button" onClick={addItineraryItem}
              className="px-3 py-1.5 rounded-lg bg-gili-50 text-gili-700 text-xs font-bold hover:bg-gili-100 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {itinerary.map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gili-600">Step {idx + 1}</span>
                  {itinerary.length > 1 && (
                    <button type="button" onClick={() => removeItineraryItem(idx)}
                      className="text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {/* ID */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">🇮🇩 Indonesia</label>
                    <input type="text" value={item.time || ""} placeholder="Waktu (cth: 09:00)"
                      onChange={(e) => handleItineraryChange("id", idx, "time", e.target.value)}
                      className={inputCls + " text-xs"} />
                    <input type="text" value={item.title} placeholder="Judul *"
                      onChange={(e) => handleItineraryChange("id", idx, "title", e.target.value)}
                      className={inputCls + " text-xs"} required />
                    <textarea value={item.desc || ""} placeholder="Deskripsi singkat"
                      onChange={(e) => handleItineraryChange("id", idx, "desc", e.target.value)}
                      rows={2} className={textareaCls + " text-xs"} />
                  </div>
                  {/* EN */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">🇬🇧 English</label>
                    <input type="text" value={itineraryEn[idx]?.time || ""} placeholder="Time (e.g. 09:00)"
                      onChange={(e) => handleItineraryChange("en", idx, "time", e.target.value)}
                      className={inputCls + " text-xs"} />
                    <input type="text" value={itineraryEn[idx]?.title || ""} placeholder="Title *"
                      onChange={(e) => handleItineraryChange("en", idx, "title", e.target.value)}
                      className={inputCls + " text-xs"} />
                    <textarea value={itineraryEn[idx]?.desc || ""} placeholder="Short description"
                      onChange={(e) => handleItineraryChange("en", idx, "desc", e.target.value)}
                      rows={2} className={textareaCls + " text-xs"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === HARGA & META === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b pb-2">Harga, Durasi & Detail</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Harga IDR (Rp)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                placeholder="150000" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Harga USD ($)</label>
              <input type="number" value={priceUSD} onChange={(e) => setPriceUSD(e.target.value)}
                placeholder="10" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Durasi</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
                placeholder="cth: 4 Jam / 4 Hours" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Jadwal (Satu per baris)</label>
              <textarea value={schedule} onChange={(e) => setSchedule(e.target.value)}
                rows={2} placeholder={"09:00\n13:00"} className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Meeting Point</label>
              <input type="text" value={meetingPoint} onChange={(e) => setMeetingPoint(e.target.value)}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Maks. Pax</label>
              <input type="number" value={maxPax} onChange={(e) => setMaxPax(e.target.value)}
                className={inputCls} />
            </div>
          </div>
        </div>

        {/* === COVER IMAGE === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b pb-2">Cover Image</h2>
          {initialData?.coverImage && (
            <div className="relative w-40 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <Image src={initialData.coverImage} alt="cover" fill className="object-cover" />
            </div>
          )}
          <input type="file" accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gili-50 file:text-gili-700 hover:file:bg-gili-100"
            required={!initialData} />
          <p className="text-xs text-gray-400">
            💡 Untuk gambar lokal dari /public/images/, masukkan path di field di bawah ini.
          </p>
          {/* Local image path override */}
          <div>
            <label className={labelCls}>Atau gunakan path lokal (cth: /images/snorkeling3.jpg)</label>
            <input type="text" name="localImagePath" placeholder="/images/snorkeling3.jpg"
              defaultValue={initialData?.coverImage?.startsWith("/images") ? initialData.coverImage : ""}
              className={inputCls} />
          </div>
        </div>

        {/* === STATUS === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 text-base border-b pb-2 mb-4">Status</h2>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-gili-500 focus:ring-gili-500" />
            Aktif / Tampilkan di website
          </label>
        </div>

        {/* === BUTTONS === */}
        <div className="flex justify-end gap-3">
          <Link href="/admin/snorkeling"
            className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold text-sm transition-colors">
            Batal
          </Link>
          <button type="submit" disabled={isPending}
            className="px-6 py-2.5 rounded-xl bg-gili-500 text-white font-semibold text-sm hover:bg-gili-600 transition-all flex items-center gap-1.5 disabled:opacity-50">
            {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : "Simpan Paket"}
          </button>
        </div>
      </form>
    </div>
  );
}
