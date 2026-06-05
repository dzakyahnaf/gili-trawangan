"use client";

import { useState, useTransition } from "react";
import { deleteSpeedboat } from "@/app/actions/admin";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";

interface Props {
  speedboats: any[];
}

export default function SpeedboatsTable({ speedboats }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus charter speedboat ini? Semua gambar terkait di Cloudinary juga akan dihapus secara permanen.")) return;
    
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteSpeedboat(id);
      } catch (err: any) {
        alert(err.message || "Gagal menghapus speedboat.");
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
            {["Nama", "Harga", "Kapasitas", "Durasi", "Status", "Aksi"].map((h) => (
              <th key={h} className="px-6 py-4 font-semibold text-gray-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {speedboats.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                Belum ada charter speedboat terdaftar.
              </td>
            </tr>
          ) : (
            speedboats.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate">{s.name}</td>
                <td className="px-6 py-4 font-bold text-gili-600">
                  {formatRupiah(s.price)}{" "}
                  <span className="text-[10px] text-gray-400 font-normal">/{s.priceUnit === "per_boat" ? "boat" : s.priceUnit === "per_pax" ? "pax" : "trip"}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{s.capacity} pax max</td>
                <td className="px-6 py-4 text-gray-600">{s.duration}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {s.isActive ? (
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
                      href={`/admin/speedboats/edit/${s.id}`}
                      className="inline-flex items-center gap-1 text-gili-600 hover:text-gili-700 hover:underline text-xs font-semibold"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(s.id)}
                      disabled={isPending && deletingId === s.id}
                      className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 hover:underline text-xs font-semibold disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {deletingId === s.id ? "Hapus..." : "Hapus"}
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
