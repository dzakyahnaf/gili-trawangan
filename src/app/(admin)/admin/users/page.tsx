import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdmins } from "@/app/actions/admin";
import UsersClient from "./UsersClient";

export default async function AdminUsersPage() {
  const allAdmins = await getAdmins();
  return (
    <AdminSidebar>
      <UsersClient initialUsers={allAdmins} />
    </AdminSidebar>
  );
}
