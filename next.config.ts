import type { NextConfig } from "next";

// Only use basePath in production (GitHub Pages)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/solar-sense' : '',
  assetPrefix: isProd ? '/solar-sense' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
