"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Package, Waves, Ship, Sailboat, Image, MessageSquare, FileText, LogOut, Anchor, Menu, X } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Paket Wisata", href: "/admin/packages", icon: Package },
  { label: "Aktivitas", href: "/admin/activities", icon: Waves },
  { label: "Fast Boat", href: "/admin/fastboats", icon: Ship },
  { label: "Speedboat", href: "/admin/speedboats", icon: Sailboat },
  { label: "Galeri", href: "/admin/gallery", icon: Image },
  { label: "Testimonial", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Konten", href: "/admin/content", icon: FileText },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gili-900 text-white transform transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-2 px-6 h-16 border-b border-gili-800">
          <Anchor className="w-6 h-6 text-accent-400" />
          <span className="font-bold">RH Admin</span>
          <button onClick={() => setOpen(false)} className="lg:hidden ml-auto"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === item.href ? "bg-gili-600 text-white" : "text-gray-400 hover:text-white hover:bg-gili-800"
              }`}
            >
              <item.icon className="w-5 h-5" />{item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gili-800">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-gili-800 w-full transition-colors">
            <LogOut className="w-5 h-5" />Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <button onClick={() => setOpen(true)} className="lg:hidden mr-4"><Menu className="w-6 h-6" /></button>
          <h2 className="font-semibold text-gray-900">Admin Panel</h2>
        </header>
        <main className="p-6">{children}</main>
      </div>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}
