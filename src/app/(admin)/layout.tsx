import type { Metadata } from "next";

export const metadata: Metadata = { title: { default: "Admin Panel", template: "%s | RH Admin" } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
