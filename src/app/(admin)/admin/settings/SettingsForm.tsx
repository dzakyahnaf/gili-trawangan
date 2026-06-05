"use client";

import { useState, useTransition } from "react";
import { saveSiteSettings, type SiteSettings } from "@/app/actions/settings";
import { Code, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  initialSettings: SiteSettings;
}

export function SettingsForm({ initialSettings }: Props) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleChange(key: keyof SiteSettings, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await saveSiteSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Script Head */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Code className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Header Script (GTM Head)</h2>
            <p className="text-xs text-gray-400">
              Script yang disisipkan di dalam tag <code>&lt;head&gt;</code>. Cocok untuk Google Tag Manager, Meta Pixel, atau analytics lainnya.
            </p>
          </div>
        </div>
        <textarea
          value={settings.script_head}
          onChange={(e) => handleChange("script_head", e.target.value)}
          rows={6}
          placeholder="<!-- Paste GTM head script di sini -->"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gili-500 focus:border-gili-500 outline-none text-sm font-mono bg-gray-50 resize-y"
          spellCheck={false}
        />
      </div>

      {/* Script Body */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <Code className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Body Script (After &lt;body&gt;)</h2>
            <p className="text-xs text-gray-400">
              Script yang disisipkan tepat setelah tag <code>&lt;body&gt;</code>. Biasanya untuk GTM <code>&lt;noscript&gt;</code> fallback.
            </p>
          </div>
        </div>
        <textarea
          value={settings.script_body}
          onChange={(e) => handleChange("script_body", e.target.value)}
          rows={6}
          placeholder="<!-- Paste GTM noscript / body script di sini -->"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gili-500 focus:border-gili-500 outline-none text-sm font-mono bg-gray-50 resize-y"
          spellCheck={false}
        />
      </div>

      {/* Script Footer */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Code className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Footer Script</h2>
            <p className="text-xs text-gray-400">
              Script yang disisipkan sebelum tag <code>&lt;/body&gt;</code>. Cocok untuk live chat widget, retargeting pixel, atau tracking tambahan.
            </p>
          </div>
        </div>
        <textarea
          value={settings.script_footer}
          onChange={(e) => handleChange("script_footer", e.target.value)}
          rows={6}
          placeholder="<!-- Paste footer tracking script di sini -->"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gili-500 focus:border-gili-500 outline-none text-sm font-mono bg-gray-50 resize-y"
          spellCheck={false}
        />
      </div>

      {/* WhatsApp Number */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Nomor WhatsApp</h2>
            <p className="text-xs text-gray-400">
              Nomor WhatsApp yang tampil di seluruh website. Format angka saja tanpa +, spasi, atau strip. Contoh: <code>6287793082501</code>
            </p>
          </div>
        </div>
        <input
          type="text"
          value={settings.wa_number}
          onChange={(e) => handleChange("wa_number", e.target.value.replace(/\D/g, ""))}
          placeholder="6287793082501"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gili-500 focus:border-gili-500 outline-none text-sm font-mono"
        />
        {settings.wa_number && (
          <p className="text-xs text-gray-400">
            Preview: <a href={`https://wa.me/${settings.wa_number}`} target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">wa.me/{settings.wa_number}</a>
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 rounded-xl bg-gili-500 text-white font-bold hover:bg-gili-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-gili-200"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            "💾 Simpan Pengaturan"
          )}
        </button>
        {saved && (
          <span className="flex items-center gap-2 text-green-600 font-semibold text-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5" />
            Pengaturan berhasil disimpan!
          </span>
        )}
      </div>
    </form>
  );
}
