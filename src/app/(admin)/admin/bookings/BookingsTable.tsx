"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Search, Filter, Download } from "lucide-react";

interface Props {
  bookings: any[];
}

const sc: Record<string, string> = { 
  confirmed: "bg-green-100 text-green-700", 
  pending: "bg-yellow-100 text-yellow-700", 
  paid: "bg-blue-100 text-blue-700", 
  cancelled: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-500",
  failed: "bg-red-100 text-red-700"
};

export default function BookingsTable({ bookings }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter logic
  const filtered = bookings.filter((b) => {
    const product = b.package || b.activity || b.fastBoatSchedule || b.speedboat;
    const productName = product ? ('title' in product ? product.title : 'name' in product ? product.name : '') : '';
    
    const matchesSearch = 
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || b.status === statusFilter || b.paymentStatus === statusFilter;
    const matchesType = typeFilter === "all" || b.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // CSV Export logic
  function handleExportCSV() {
    if (filtered.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }

    const headers = ["Booking Code", "Customer Name", "Customer Email", "Customer Phone", "Type", "Product", "Booking Date", "Adults", "Children", "Total Price", "Payment Status", "Status"];
    const rows = filtered.map((b) => {
      const product = b.package || b.activity || b.fastBoatSchedule || b.speedboat;
      const productName = product ? ('title' in product ? product.title : 'name' in product ? product.name : '') : 'N/A';
      return [
        b.bookingCode,
        `"${b.customerName.replace(/"/g, '""')}"`,
        b.customerEmail,
        b.customerPhone,
        b.type,
        `"${productName.replace(/"/g, '""')}"`,
        new Date(b.bookingDate).toLocaleDateString("id-ID"),
        b.adults,
        b.children,
        b.totalPrice,
        b.paymentStatus,
        b.status,
      ];
    });

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kode booking, nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-gray-50/50"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto items-center justify-end">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-white"
          >
            <option value="all">Semua Tipe</option>
            <option value="package">Package</option>
            <option value="activity">Activity</option>
            <option value="fastboat">Fastboat</option>
            <option value="speedboat">Speedboat</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gili-500 bg-white"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-gili-500 text-white text-xs font-semibold hover:bg-gili-600 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Table grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left bg-gray-50/50">
                {["Kode", "Nama", "Produk", "Tipe", "Tanggal", "Pax", "Total Price", "Bayar", "Status", "Aksi"].map((h) => (
                  <th key={h} className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-10 text-center text-gray-400">
                    Tidak ditemukan data booking yang cocok.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => {
                  const product = b.package || b.activity || b.fastBoatSchedule || b.speedboat;
                  let productName = "N/A";
                  if (product) {
                    if ("title" in product) productName = product.title;
                    else if ("name" in product) productName = product.name;
                  }
                  
                  return (
                    <tr key={b.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-gili-600">{b.bookingCode}</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{b.customerName}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-[150px] truncate" title={productName}>{productName}</td>
                      <td className="px-6 py-4 text-gray-600 capitalize">{b.type}</td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {new Date(b.bookingDate).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {b.adults} Ad, {b.children} Ch
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                        {formatRupiah(b.totalPrice)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${sc[b.paymentStatus]}`}>
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${sc[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="text-gili-600 hover:text-gili-800 hover:underline text-xs font-semibold"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
