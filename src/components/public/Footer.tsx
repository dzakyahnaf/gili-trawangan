import Link from "next/link";
import { Anchor, Mail, Phone, MapPin, Share2, Camera, Video } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-coral-500 flex items-center justify-center shadow-lg">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">RH Tour & Travel</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Penyedia jasa wisata terpercaya di Gili Trawangan, Lombok. Kami berkomitmen memberikan pengalaman liburan terbaik dengan standar keamanan tinggi.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-ocean-500 hover:text-white transition-all"><Camera className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-ocean-500 hover:text-white transition-all"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-ocean-500 hover:text-white transition-all"><Video className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Navigasi</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/packages" className="hover:text-ocean-400 transition-colors">Paket Wisata</Link></li>
              <li><Link href="/activities" className="hover:text-ocean-400 transition-colors">Aktivitas</Link></li>
              <li><Link href="/fastboat" className="hover:text-ocean-400 transition-colors">Fast Boat</Link></li>
              <li><Link href="/speedboat" className="hover:text-ocean-400 transition-colors">Speedboat</Link></li>
              <li><Link href="/booking/status" className="hover:text-ocean-400 transition-colors">Cek Status Booking</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-6">Bantuan</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-ocean-400 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="hover:text-ocean-400 transition-colors">Kontak</Link></li>
              <li><a href="#" className="hover:text-ocean-400 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-ocean-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-ocean-400 transition-colors">Pusat Bantuan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Kontak Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-coral-500 shrink-0" />
                <span>Sama-Sama Reggae Bar, Gili Trawangan, Lombok Utara</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-coral-500 shrink-0" />
                <a href="https://wa.me/6287793082501" className="hover:text-white transition-colors">+62 877-9308-2501</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-coral-500 shrink-0" />
                <a href="mailto:rhtourandtravel3003@gmail.com" className="hover:text-white transition-colors">rhtourandtravel3003@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs">
          <p>© {new Date().getFullYear()} RH Tour & Travel Gili Trawangan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
