import AdminSidebar from "@/components/admin/AdminSidebar";
import { getSiteSettings } from "@/app/actions/settings";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola script tracking, iklan, dan nomor WhatsApp dari sini.
          </p>
        </div>
        <SettingsForm initialSettings={settings} />
      </div>
    </AdminSidebar>
  );
}
