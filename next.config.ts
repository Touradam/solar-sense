import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // No basePath needed for Hostinger (root domain hosting)
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
