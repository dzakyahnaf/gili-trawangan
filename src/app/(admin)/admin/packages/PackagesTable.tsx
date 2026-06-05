"use client";

import { useState, useTransition } from "react";
import { deletePackage } from "@/app/actions/admin";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Edit2, Trash2, Star, CheckCircle, XCircle } from "lucide-react";

interface Props {
  packages: any[];
}

export default function PackagesTable({ packages }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus paket wisata ini? Gambar cover di Cloudinary juga akan dihapus secara permanen.")) return;
    
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deletePackage(id);
      } catch (err: any) {
        alert(err.message || "Gagal menghapus paket.");
      } finally {
        setDeletingId(null);
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left bg-gray-50/50">
            {["Judul", "Durasi", "Harga", "Kategori", "Featured", "Status", "Aksi"].map((h) => (
              <th key={h} className="px-6 py-4 font-semibold text-gray-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {packages.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                Belum ada paket wisata terdaftar.
              </td>
            </tr>
          ) : (
            packages.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate">{p.title}</td>
                <td className="px-6 py-4 text-gray-600">{p.duration}</td>
                <td className="px-6 py-4 font-bold text-gili-600">{formatRupiah(p.price)}</td>
                <td className="px-6 py-4 text-gray-600 capitalize">{p.category}</td>
                <td className="px-6 py-4">
                  {p.isFeatured ? (
                    <span className="flex items-center gap-1 text-amber-500 font-medium">
                      <Star className="w-4 h-4 fill-amber-400" /> Yes
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${p.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.isActive ? (
                      <>
                        <CheckCircle className="w-3 h-3" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Inactive
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/packages/edit/${p.id}`}
                      className="inline-flex items-center gap-1 text-gili-600 hover:text-gili-700 hover:underline text-xs font-semibold"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={isPending && deletingId === p.id}
                      className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 hover:underline text-xs font-semibold disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {deletingId === p.id ? "Hapus..." : "Hapus"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
