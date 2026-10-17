import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [160, 240, 320, 480],
  },
  poweredByHeader: false,
};

export default nextConfig;
