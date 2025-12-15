import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '/peggy-blog-web';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? repoName : undefined,
  assetPrefix: isProd ? repoName : undefined,
};

export default nextConfig;
