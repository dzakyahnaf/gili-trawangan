import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "www.gstatic.com" },
      { protocol: "https", hostname: "gilisnorkelingtour.com" },
      { protocol: "https", hostname: "www.giliway.com" },
    ],
  },
  serverExternalPackages: ["@prisma/client"],
};
  
export default nextConfig;
