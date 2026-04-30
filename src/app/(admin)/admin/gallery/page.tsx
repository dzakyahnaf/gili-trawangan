import AdminSidebar from "@/components/admin/AdminSidebar";
import Image from "next/image";
import { getGallery } from "@/app/actions/admin";

export default async function AdminGalleryPage() {
  const allGallery = await getGallery();
  
  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
          <button className="px-4 py-2 rounded-xl bg-gili-500 text-white text-sm font-semibold">+ Upload Foto</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allGallery.map((img) => (
            <div key={img.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative h-40">
                <Image src={img.imageUrl} alt={img.caption || ""} fill className="object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{img.caption}</p>
                  <p className="text-xs text-gray-400 capitalize">{img.category}</p>
                </div>
                <button className="text-red-500 hover:text-red-700 text-xs font-semibold">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminSidebar>
  );
}
