"use client";

import { useState, useTransition } from "react";
import { Plus, Search, Edit2, Trash2, Shield, Mail, User, X } from "lucide-react";
import { createAdmin, updateAdmin, deleteAdmin } from "@/app/actions/admin";

interface UserAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

interface UsersClientProps {
  initialUsers: UserAdmin[];
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState<UserAdmin[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAdmin | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setPassword("");
    setRole("admin");
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserAdmin) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword(""); // Leave blank unless changing
    setRole(user.role);
    setError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Nama wajib diisi");
    if (!email.trim()) return setError("Email wajib diisi");
    if (!editingUser && !password.trim()) return setError("Password wajib diisi");
    if (!editingUser && password.length < 6) return setError("Password minimal 6 karakter");
    if (editingUser && password.trim() && password.length < 6) {
      return setError("Password baru minimal 6 karakter");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    startTransition(async () => {
      try {
        if (editingUser) {
          await updateAdmin(editingUser.id, formData);
          setUsers((prev) =>
            prev.map((u) =>
              u.id === editingUser.id
                ? { ...u, name, email, role }
                : u
            )
          );
        } else {
          await createAdmin(formData);
          // Reload page data or update state
          // For simplicity, we trigger reload or fetch since prisma create sets auto ID
          window.location.reload();
        }
        setIsModalOpen(false);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan.");
      }
    });
  };

  const handleDelete = async (id: string, emailStr: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus admin "${emailStr}"?`)) {
      startTransition(async () => {
        try {
          await deleteAdmin(id);
          setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err: any) {
          alert(err.message || "Gagal menghapus admin");
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola akun administrator yang memiliki akses ke dashboard ini
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-gili-600 hover:bg-gili-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Tambah Admin
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md bg-white rounded-xl shadow-xs border border-gray-200">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-5 h-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-gili-500 text-sm"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 text-sm">
                    Tidak ada admin ditemukan
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gili-100 flex items-center justify-center text-gili-600 font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === "superadmin"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-gili-50 text-gili-700 border border-gili-200"
                      }`}>
                        <Shield className="w-3.5 h-3.5" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 text-gray-500 hover:text-gili-600 hover:bg-gili-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Admin"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id, user.email)}
                          disabled={users.length <= 1}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            users.length <= 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-500 hover:text-red-600 hover:bg-red-50"
                          }`}
                          title="Hapus Admin"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-bold text-gray-900">
                {editingUser ? "Edit Akun Admin" : "Tambah Akun Admin"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Admin Utama"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gili-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@email.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gili-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Password {editingUser && "(Kosongkan jika tidak diubah)"}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={editingUser ? "••••••••" : "Min. 6 karakter"}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gili-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Role Akses
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gili-500 outline-none text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              {error && (
                <div className="text-red-500 text-xs bg-red-50 rounded-lg p-3 border border-red-200">
                  {error}
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2.5 rounded-xl bg-gili-600 hover:bg-gili-700 text-white font-semibold text-sm disabled:opacity-50 shadow-xs cursor-pointer"
                >
                  {isPending ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
