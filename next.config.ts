import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose", "mongodb", "bcryptjs", "jsonwebtoken"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    localPatterns: [
      {
        pathname: "/api/uploads/**",
      },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
