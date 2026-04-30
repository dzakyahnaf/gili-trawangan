import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi RH Tour & Travel untuk informasi paket wisata, fast boat, dan aktivitas di Gili Trawangan.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontak Kami</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Punya pertanyaan? Kami siap membantu Anda merencanakan liburan impian di Gili Trawangan. Hubungi kami melalui saluran berikut.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Informasi Kontak</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gili-50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gili-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">WhatsApp</p>
                    <a href="https://wa.me/6287793082501" className="text-gray-900 font-semibold hover:text-gili-600 transition-colors">+62 877-9308-2501</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email</p>
                    <a href="mailto:rhtourandtravel3003@gmail.com" className="text-gray-900 font-semibold hover:text-accent-600 transition-colors">rhtourandtravel3003@gmail.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gili-50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gili-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Jam Operasional</p>
                    <p className="text-gray-900 font-semibold">08:00 — 20:00 WITA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Meeting Point</h2>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Sama-Sama Reggae Bar</p>
                  <p className="text-sm text-gray-500">Pesisir Utara, Gili Trawangan, Kabupaten Lombok Utara, NTB.</p>
                </div>
              </div>
              <a 
                href="https://maps.google.com/?q=Sama+Sama+Reggae+Gili+Trawangan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gili-500 text-white text-center rounded-xl font-semibold hover:bg-gili-600 transition-colors"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>

          {/* Map & Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.046399435552!2d116.03710711534346!3d-8.352125994008272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcde0f0d6b5e5af%3A0x6730045f2e8f8f2b!2sSama-Sama%20Reggae%20Bar!5e0!3m2!1sen!2sid!4v1678891234567!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              <form className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gili-500 focus:ring-2 focus:ring-gili-200 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Alamat Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gili-500 focus:ring-2 focus:ring-gili-200 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Pesan Anda</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gili-500 focus:ring-2 focus:ring-gili-200 outline-none transition-all" placeholder="Tuliskan pertanyaan atau detail pesanan Anda..."></textarea>
                </div>
                <button type="submit" className="sm:col-span-2 py-4 bg-gili-500 text-white rounded-xl font-bold hover:bg-gili-600 shadow-lg shadow-gili-200 transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Kirim Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
