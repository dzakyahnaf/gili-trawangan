"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { signIn } = await import("next-auth/react");
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah");
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-ocean-600 to-ocean-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-xl overflow-hidden mb-4 relative">
            <Image 
              src="/logos/logo-boat.png" 
              alt="Logo RH Tour" 
              fill 
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-ocean-300 text-sm mt-1">RH Tour & Travel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@rhtour.com" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 outline-none" />
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-ocean-500 to-ocean-600 text-white font-semibold disabled:opacity-50 hover:shadow-lg transition-all">
            <LogIn className="w-5 h-5" />{loading ? "Masuk..." : "Masuk"}
          </button>
          <p className="text-xs text-gray-400 text-center">Demo: admin@rhtour.com / admin123</p>
        </form>
      </div>
    </div>
  );
}
