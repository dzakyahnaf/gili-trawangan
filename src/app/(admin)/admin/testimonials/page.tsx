import AdminSidebar from "@/components/admin/AdminSidebar";
import { getTestimonials } from "@/app/actions/admin";
import { Star } from "lucide-react";

export default async function AdminTestimonialsPage() {
  const allTestimonials = await getTestimonials();
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Testimonial</h1>
          <button className="px-4 py-2 rounded-xl bg-ocean-500 text-white text-sm font-semibold">+ Tambah</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {allTestimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">{Array.from({length: t.rating}).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <button className="text-ocean-600 hover:underline text-xs font-semibold">Edit</button>
              </div>
              <p className="text-gray-600 text-sm italic">&ldquo;{t.comment}&rdquo;</p>
              <div className="flex items-center justify-between text-sm">
                <div><span className="font-semibold text-gray-900">{t.name}</span> · <span className="text-gray-400">{t.origin}</span></div>
                <span className="text-gray-400">{new Date(t.createdAt).toLocaleDateString("id-ID")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminSidebar>
  );
}
