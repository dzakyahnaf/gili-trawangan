import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminContentPage() {
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Konten Halaman</h1>
        <div className="grid gap-6">
          {[
            { group: "Hero Section", fields: [{ key: "hero_title", label: "Judul Hero", value: "Jelajahi Keajaiban Gili Trawangan" }, { key: "hero_subtitle", label: "Sub Judul", value: "Paket wisata terlengkap — snorkeling, diving, island hopping & fast boat." }] },
            { group: "About", fields: [{ key: "about_text", label: "Teks Tentang Kami", value: "Kami adalah penyedia jasa wisata terpercaya di Gili Trawangan..." }] },
          ].map((section) => (
            <div key={section.group} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h2 className="font-bold text-gray-900">{section.group}</h2>
              {section.fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{f.label}</label>
                  <textarea defaultValue={f.value} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ocean-500 outline-none text-sm" />
                </div>
              ))}
              <button className="px-4 py-2 rounded-xl bg-ocean-500 text-white text-sm font-semibold hover:bg-ocean-600 transition-colors">Simpan</button>
            </div>
          ))}
        </div>
      </div>
    </AdminSidebar>
  );
}
