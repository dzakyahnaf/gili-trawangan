import AdminSidebar from "@/components/admin/AdminSidebar";
import { getFastBoats } from "@/app/actions/admin";
import FastBoatsClient from "./FastBoatsClient";

export default async function AdminFastBoatsPage() {
  const allFastBoats = await getFastBoats();
  
  return (
    <AdminSidebar>
      <FastBoatsClient initialOperators={allFastBoats} />
    </AdminSidebar>
  );
}
