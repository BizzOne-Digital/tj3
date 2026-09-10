import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose", "mongodb", "bcryptjs", "jsonwebtoken", "nodemailer"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    localPatterns: [
      { pathname: "/api/uploads/**" },
      { pathname: "/images/**" },
      { pathname: "/hero-bg.jpg" },
      { pathname: "/logo.png" },
      { pathname: "/logo.jpg" },
      { pathname: "/apple-icon.png" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
