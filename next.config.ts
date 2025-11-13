import type { NextConfig } from "next";

// Only use basePath in production (GitHub Pages)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/SEPT-LLC' : '',
  assetPrefix: isProd ? '/SEPT-LLC' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
