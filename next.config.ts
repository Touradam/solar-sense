import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/SEPT-LLC',
  assetPrefix: '/SEPT-LLC',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
