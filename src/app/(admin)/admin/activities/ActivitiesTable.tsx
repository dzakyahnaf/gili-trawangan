"use client";

import { useState, useTransition } from "react";
import { deleteActivity } from "@/app/actions/admin";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";

interface Props {
  activities: any[];
}

export default function ActivitiesTable({ activities }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus aktivitas wisata ini? Gambar cover di Cloudinary juga akan dihapus secara permanen.")) return;
    
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteActivity(id);
      } catch (err: any) {
        alert(err.message || "Gagal menghapus aktivitas.");
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
            {["Nama", "Durasi", "Harga", "Kategori", "Max Pax", "Status", "Aksi"].map((h) => (
              <th key={h} className="px-6 py-4 font-semibold text-gray-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {activities.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                Belum ada aktivitas wisata terdaftar.
              </td>
            </tr>
          ) : (
            activities.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate">{a.name}</td>
                <td className="px-6 py-4 text-gray-600">{a.duration}</td>
                <td className="px-6 py-4 font-bold text-gili-600">{formatRupiah(a.price)}</td>
                <td className="px-6 py-4 text-gray-600 capitalize">{a.category}</td>
                <td className="px-6 py-4 text-gray-600">{a.maxPax} pax</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${a.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {a.isActive ? (
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
                      href={`/admin/activities/edit/${a.id}`}
                      className="inline-flex items-center gap-1 text-gili-600 hover:text-gili-700 hover:underline text-xs font-semibold"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id)}
                      disabled={isPending && deletingId === a.id}
                      className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 hover:underline text-xs font-semibold disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {deletingId === a.id ? "Hapus..." : "Hapus"}
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
