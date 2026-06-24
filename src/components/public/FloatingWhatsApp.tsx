"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { getWhatsAppLink, getWhatsAppNumber } from "@/lib/utils";

/**
 * FloatingWhatsApp — sticky bottom-right chat widget.
 * - Pulses on load to grab attention.
 * - Click opens an inline mini-chat popup (premium UX).
 * - "Mulai Chat" opens the real WhatsApp conversation.
 * - Auto-opens after 8 seconds on first visit (stored in sessionStorage).
 */
export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  // Auto-open after 8s on first visit per session
  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem("wa_widget_opened");
    if (alreadyOpened) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasAutoOpened(true);
      sessionStorage.setItem("wa_widget_opened", "1");
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const defaultMessage =
    "Halo RH Tour & Travel, saya ingin menanyakan paket wisata ke Gili Trawangan 😊";

  const handleSend = () => {
    const msg = message.trim() || defaultMessage;
    const link = getWhatsAppLink(msg);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* ===== POPUP MINI-CHAT ===== */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-5 z-50 w-80 rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-slide-up"
        >
          {/* Header */}
          <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-green-300 flex items-center justify-center text-green-900 font-bold text-lg shadow-inner">
                RH
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075e54] rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm leading-none">
                RH Tour &amp; Travel
              </p>
              <p className="text-green-300 text-xs mt-0.5">
                🟢 Online — Respon cepat
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Tutup chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="bg-[#ece5dd] px-4 py-5 space-y-3">
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-[#075e54] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">
                R
              </div>
              <div className="bg-white rounded-xl rounded-tl-none px-3 py-2 shadow-sm max-w-[85%]">
                <p className="text-gray-800 text-sm leading-relaxed">
                  Halo! 👋 Ada yang bisa kami bantu untuk rencana liburan ke{" "}
                  <span className="font-semibold text-[#075e54]">
                    Gili Trawangan
                  </span>
                  ? Ketik pertanyaan Anda di bawah 😊
                </p>
                <p className="text-gray-400 text-[10px] text-right mt-1">
                  {new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="bg-[#f0f0f0] px-3 py-3 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan Anda..."
              className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none text-gray-800 placeholder-gray-400 border-0 shadow-sm"
              autoFocus
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-[#075e54] flex items-center justify-center text-white hover:bg-[#128c7e] transition-colors shadow-md"
              aria-label="Kirim ke WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===== FAB BUTTON ===== */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full bg-[#25d366] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 group"
        aria-label="Chat via WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30 group-hover:opacity-0" />
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.001 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.944-1.417A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.94 7.94 0 01-4.287-1.253l-.308-.183-3.179.912.877-3.099-.2-.318A7.959 7.959 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
          </svg>
        )}
      </button>
    </>
  );
}
