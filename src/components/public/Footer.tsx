"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Share2, Camera, Video } from "lucide-react";
import { useLang } from "@/components/LangProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#131313] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow relative">
                <Image
                  src="/logos/logo-boat.png"
                  alt="Logo RH Tour"
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xl text-white">RH Tour & Travel</span>
            </Link>
            <p className="text-sm leading-relaxed">
              {t.footer.about}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-500 hover:text-gili-900 transition-all"><Camera className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-500 hover:text-gili-900 transition-all"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-500 hover:text-gili-900 transition-all"><Video className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">{t.footer.navigation}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/packages" className="hover:text-accent-400 transition-colors">{t.nav.packages}</Link></li>
              <li><Link href="/activities" className="hover:text-accent-400 transition-colors">{t.nav.activities}</Link></li>
              <li><Link href="/fastboat" className="hover:text-accent-400 transition-colors">{t.nav.fastboat}</Link></li>
              <li><Link href="/speedboat" className="hover:text-accent-400 transition-colors">{t.nav.speedboat}</Link></li>
              <li><Link href="/booking/status" className="hover:text-accent-400 transition-colors">{t.footer.checkStatus}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">{t.footer.contactUs}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-accent-500 shrink-0" />
                <span>Sama-Sama Reggae Bar, Gili Trawangan, Lombok Utara</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-accent-500 shrink-0" />
                <a href="https://wa.me/6287793082501" className="hover:text-white transition-colors">+62 877-9308-2501</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-accent-500 shrink-0" />
                <a href="mailto:rhtourandtravel3003@gmail.com" className="hover:text-white transition-colors">rhtourandtravel3003@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-white font-bold mb-6">{t.footer.location}</h3>
            <div className="rounded-xl overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.046399435552!2d116.03710711534346!3d-8.352125994008272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcde0f0d6b5e5af%3A0x6730045f2e8f8f2b!2sSama-Sama%20Reggae%20Bar!5e0!3m2!1sen!2sid!4v1678891234567!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Lokasi Kami"
              />
            </div>
          </div>
        </div>

        {/* Support & Quick Links */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-6 justify-center text-xs text-gray-500 mb-6">
            <Link href="/about" className="hover:text-accent-400 transition-colors">{t.footer.aboutUs}</Link>
            <Link href="/contact" className="hover:text-accent-400 transition-colors">{t.nav.contact}</Link>
            <a href="#" className="hover:text-accent-400 transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-accent-400 transition-colors">{t.footer.privacy}</a>
          </div>
          <p className="text-center text-xs text-gray-600">
            © {new Date().getFullYear()} RH Tour & Travel Gili Trawangan. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
