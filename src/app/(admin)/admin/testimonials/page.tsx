import AdminSidebar from "@/components/admin/AdminSidebar";
import { getTestimonials } from "@/app/actions/admin";
import TestimonialsClient from "./TestimonialsClient";

export default async function AdminTestimonialsPage() {
  const allTestimonials = await getTestimonials();
  return (
    <AdminSidebar>
      <TestimonialsClient initialTestimonials={allTestimonials} />
    </AdminSidebar>
  );
}

