"use client";

import { useState, useTransition } from "react";
import { deleteActivity } from "@/app/actions/activity";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Edit2, Trash2, CheckCircle, XCircle, ExternalLink } from "lucide-react";

interface Props {
  packages: any[];
  category: string;
  categoryLabel: string;
}

export default function ActivityTable({ packages, category, categoryLabel }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string, name: string) {
    if (!confirm(`Apakah Anda yakin ingin menghapus paket "${name}"?`)) return;

    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteActivity(id, category);
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
            {["Nama Paket", "Durasi", "Harga IDR", "Harga USD", "Max Pax", "Status", "Aksi"].map((h) => (
              <th key={h} className="px-6 py-4 font-semibold text-gray-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {packages.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                Belum ada paket {categoryLabel}. Klik "+ Tambah Paket" untuk mulai.
              </td>
            </tr>
          ) : (
            packages.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs">
                  <div className="truncate">{p.name}</div>
                  {p.nameEn && (
                    <div className="text-xs text-gray-400 truncate">{p.nameEn}</div>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600">{p.duration}</td>
                <td className="px-6 py-4 font-bold text-gili-600">{formatRupiah(p.price)}</td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  {p.priceUSD ? `US$ ${p.priceUSD}` : "—"}
                </td>
                <td className="px-6 py-4 text-gray-600">{p.maxPax} pax</td>
                <td className="px-6 py-4">
                  <span
                     className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      p.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
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
                      href={`/${category}/${p.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 text-xs"
                      title="Lihat di website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/${category}/edit/${p.id}`}
                      className="inline-flex items-center gap-1 text-gili-600 hover:text-gili-700 hover:underline text-xs font-semibold"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
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
