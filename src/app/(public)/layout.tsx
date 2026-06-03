import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.rhtourandtravel.com" },
        ]}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
