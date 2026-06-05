"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createFastBoat,
  updateFastBoat,
  deleteFastBoat,
  createFastBoatSchedule,
  updateFastBoatSchedule,
  deleteFastBoatSchedule,
} from "@/app/actions/admin";
import { formatRupiah } from "@/lib/utils";
import { Loader2, Plus, Edit2, Trash2, Calendar, Clock, Ship, Check, X } from "lucide-react";
import Image from "next/image";

interface Props {
  initialOperators: any[];
}

export default function FastBoatsClient({ initialOperators }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Modals status
  const [showBoatModal, setShowBoatModal] = useState(false);
  const [showSchedModal, setShowSchedModal] = useState(false);

  // Operator form state
  const [boatId, setBoatId] = useState<string | null>(null);
  const [boatName, setBoatName] = useState("");
  const [boatDesc, setBoatDesc] = useState("");
  const [boatSpeed, setBoatSpeed] = useState("");
  const [boatCapacity, setBoatCapacity] = useState("");
  const [boatFacilities, setBoatFacilities] = useState("");
  const [boatLogo, setBoatLogo] = useState<File | null>(null);
  const [boatActive, setBoatActive] = useState(true);

  // Schedule form state
  const [schedId, setSchedId] = useState<string | null>(null);
  const [schedBoatId, setSchedBoatId] = useState("");
  const [schedFrom, setSchedFrom] = useState("");
  const [schedTo, setSchedTo] = useState("");
  const [schedDeparture, setSchedDeparture] = useState("");
  const [schedArrival, setSchedArrival] = useState("");
  const [schedPrice, setSchedPrice] = useState("");

  // Operator modal triggers
  function openAddBoat() {
    setBoatId(null);
    setBoatName("");
    setBoatDesc("");
    setBoatSpeed("");
    setBoatCapacity("");
    setBoatFacilities("");
    setBoatLogo(null);
    setBoatActive(true);
    setError("");
    setShowBoatModal(true);
  }

  function openEditBoat(boat: any) {
    setBoatId(boat.id);
    setBoatName(boat.name || "");
    setBoatDesc(boat.description || "");
    setBoatSpeed(boat.speed || "");
    setBoatCapacity(boat.capacity?.toString() || "");
    setBoatFacilities(boat.facilities?.join("\n") || "");
    setBoatLogo(null);
    setBoatActive(boat.isActive !== false);
    setError("");
    setShowBoatModal(true);
  }

  function handleDeleteBoat(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus operator ini? Semua jadwal yang terhubung juga akan dihapus.")) return;
    startTransition(async () => {
      try {
        await deleteFastBoat(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || "Gagal menghapus operator.");
      }
    });
  }

  // Schedule modal triggers
  function openAddSched(operatorId: string) {
    setSchedId(null);
    setSchedBoatId(operatorId);
    setSchedFrom("");
    setSchedTo("");
    setSchedDeparture("");
    setSchedArrival("");
    setSchedPrice("");
    setError("");
    setShowSchedModal(true);
  }

  function openEditSched(sched: any) {
    setSchedId(sched.id);
    setSchedBoatId(sched.fastBoatId);
    setSchedFrom(sched.from || "");
    setSchedTo(sched.to || "");
    setSchedDeparture(sched.departure || "");
    setSchedArrival(sched.arrival || "");
    setSchedPrice(sched.price?.toString() || "");
    setError("");
    setShowSchedModal(true);
  }

  function handleDeleteSched(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) return;
    startTransition(async () => {
      try {
        await deleteFastBoatSchedule(id);
        router.refresh();
      } catch (err: any) {
        alert(err.message || "Gagal menghapus jadwal.");
      }
    });
  }

  // Submissions
  function handleBoatSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!boatName.trim()) {
      setError("Nama operator wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("name", boatName);
    formData.append("description", boatDesc);
    formData.append("speed", boatSpeed);
    formData.append("capacity", boatCapacity);
    formData.append("facilities", boatFacilities);
    formData.append("isActive", boatActive.toString());
    if (boatLogo) {
      formData.append("logo", boatLogo);
    }

    startTransition(async () => {
      try {
        if (boatId) {
          await updateFastBoat(boatId, formData);
        } else {
          await createFastBoat(formData);
        }
        setShowBoatModal(false);
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Gagal menyimpan operator.");
      }
    });
  }

  function handleSchedSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!schedFrom.trim() || !schedTo.trim() || !schedDeparture.trim() || !schedArrival.trim()) {
      setError("Semua field jadwal wajib diisi.");
      return;
    }

    const priceNum = parseInt(schedPrice) || 0;
    if (priceNum < 0) {
      setError("Harga tidak boleh negatif.");
      return;
    }

    const payload = {
      fastBoatId: schedBoatId,
      from: schedFrom,
      to: schedTo,
      departure: schedDeparture,
      arrival: schedArrival,
      price: priceNum,
    };

    startTransition(async () => {
      try {
        if (schedId) {
          await updateFastBoatSchedule(schedId, payload);
        } else {
          await createFastBoatSchedule(payload);
        }
        setShowSchedModal(false);
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Gagal menyimpan jadwal.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fast Boat Operators</h1>
          <p className="text-xs text-gray-400">Kelola armada kapal cepat, jadwal keberangkatan, dan rute.</p>
        </div>
        <button
          onClick={openAddBoat}
          className="px-4 py-2.5 rounded-xl bg-gili-500 text-white text-sm font-semibold hover:bg-gili-600 transition-colors shadow-sm"
        >
          + Tambah Operator
        </button>
      </div>

      <div className="space-y-6">
        {initialOperators.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-400">
            Belum ada operator fast boat terdaftar.
          </div>
        ) : (
          initialOperators.map((boat) => (
            <div key={boat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {boat.logo ? (
                    <div className="relative w-20 h-12 rounded-lg border border-gray-100 bg-gray-50 overflow-hidden shrink-0">
                      <Image src={boat.logo} alt={boat.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-12 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0">
                      <Ship className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-900">{boat.name}</h2>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${boat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {boat.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 max-w-2xl">{boat.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">
                      <span>Kapasitas: <strong className="text-gray-600">{boat.capacity} Pax</strong></span>
                      <span>Speed: <strong className="text-gray-600">{boat.speed}</strong></span>
                      {boat.facilities?.length > 0 && (
                        <span>Fasilitas: <strong className="text-gray-600">{boat.facilities.join(", ")}</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditBoat(boat)}
                    className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-gili-600 hover:bg-gray-50 transition-colors"
                    title="Edit Operator"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBoat(boat.id)}
                    className="p-2 rounded-xl border border-gray-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Hapus Operator"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rute & Jadwal */}
              <div className="border-t border-gray-50 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-700 tracking-wider uppercase flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> Jadwal Keberangkatan
                  </h3>
                  <button
                    onClick={() => openAddSched(boat.id)}
                    className="px-3 py-1 rounded-lg bg-gili-50 text-gili-700 text-xs font-bold hover:bg-gili-100 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Jadwal
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-50">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-50 text-gray-400 font-semibold">
                        <th className="px-4 py-2">Dari</th>
                        <th className="px-4 py-2">Ke</th>
                        <th className="px-4 py-2"><span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Berangkat</span></th>
                        <th className="px-4 py-2">Tiba</th>
                        <th className="px-4 py-2">Harga</th>
                        <th className="px-4 py-2 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {boat.schedules?.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-4 text-center text-gray-400">
                            Belum ada jadwal keberangkatan untuk operator ini.
                          </td>
                        </tr>
                      ) : (
                        boat.schedules.map((sched: any) => (
                          <tr key={sched.id} className="hover:bg-gray-50/20 text-gray-700 font-medium">
                            <td className="px-4 py-2.5 capitalize">{sched.from}</td>
                            <td className="px-4 py-2.5 capitalize">{sched.to}</td>
                            <td className="px-4 py-2.5">{sched.departure}</td>
                            <td className="px-4 py-2.5">{sched.arrival}</td>
                            <td className="px-4 py-2.5 font-bold text-gili-600">{formatRupiah(sched.price)}</td>
                            <td className="px-4 py-2.5 text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => openEditSched(sched)}
                                  className="text-gili-600 hover:text-gili-800 font-semibold"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteSched(sched.id)}
                                  className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Operator Modal */}
      {showBoatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowBoatModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-gray-900 text-lg">
              {boatId ? "Edit Operator Fast Boat" : "Tambah Operator Fast Boat Baru"}
            </h3>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleBoatSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Nama Kapal/Operator</label>
                <input
                  type="text"
                  value={boatName}
                  onChange={(e) => setBoatName(e.target.value)}
                  placeholder="Contoh: Eka Jaya, Bluewater Express"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Deskripsi Singkat</label>
                <textarea
                  value={boatDesc}
                  onChange={(e) => setBoatDesc(e.target.value)}
                  placeholder="Ceritakan tentang operator kapal ini..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Kapasitas Penumpang (Pax)</label>
                  <input
                    type="number"
                    value={boatCapacity}
                    onChange={(e) => setBoatCapacity(e.target.value)}
                    placeholder="Contoh: 150"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Kecepatan Kapal (Speed)</label>
                  <input
                    type="text"
                    value={boatSpeed}
                    onChange={(e) => setBoatSpeed(e.target.value)}
                    placeholder="Contoh: 35 Knots"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Fasilitas Kapal (Satu per baris)</label>
                <textarea
                  value={boatFacilities}
                  onChange={(e) => setBoatFacilities(e.target.value)}
                  placeholder="Contoh:&#10;AC Cabin&#10;Toilet&#10;TV & Music"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Logo Operator</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBoatLogo(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-gili-50 file:text-gili-700 hover:file:bg-gili-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="boatActive"
                  checked={boatActive}
                  onChange={(e) => setBoatActive(e.target.checked)}
                  className="w-4 h-4 rounded-md border-gray-300 text-gili-500 focus:ring-gili-500"
                />
                <label htmlFor="boatActive" className="text-gray-700 font-medium cursor-pointer">Aktifkan Operator Ini</label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setShowBoatModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 bg-gili-500 text-white rounded-xl hover:bg-gili-600 font-semibold flex items-center gap-1"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showSchedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowSchedModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-gray-900 text-lg">
              {schedId ? "Edit Jadwal Keberangkatan" : "Tambah Jadwal Keberangkatan Baru"}
            </h3>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSchedSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Dari Pelabuhan</label>
                  <input
                    type="text"
                    value={schedFrom}
                    onChange={(e) => setSchedFrom(e.target.value)}
                    placeholder="Contoh: Padangbai"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Ke Pelabuhan</label>
                  <input
                    type="text"
                    value={schedTo}
                    onChange={(e) => setSchedTo(e.target.value)}
                    placeholder="Contoh: Gili Trawangan"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Waktu Keberangkatan</label>
                  <input
                    type="text"
                    value={schedDeparture}
                    onChange={(e) => setSchedDeparture(e.target.value)}
                    placeholder="Contoh: 09:30"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Waktu Kedatangan</label>
                  <input
                    type="text"
                    value={schedArrival}
                    onChange={(e) => setSchedArrival(e.target.value)}
                    placeholder="Contoh: 11:00"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Harga Tiket (IDR)</label>
                <input
                  type="number"
                  value={schedPrice}
                  onChange={(e) => setSchedPrice(e.target.value)}
                  placeholder="Contoh: 350000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gili-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setShowSchedModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 bg-gili-500 text-white rounded-xl hover:bg-gili-600 font-semibold flex items-center gap-1"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
