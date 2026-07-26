import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    // Tells Next.js to pre-optimize these large packages for faster dev server startup
    // and smaller production bundles via better tree-shaking
    optimizePackageImports: ['lucide-react', 'motion'],
  },
  // Compress responses in production
  compress: true,
};

export default nextConfig;
