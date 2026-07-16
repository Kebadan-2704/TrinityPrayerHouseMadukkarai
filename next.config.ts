import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Automatically serve images as WebP/AVIF — reduces image payload by 30-50%
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc',
      },
    ],
  },
  // Tree-shake heavy packages — only the icons/functions actually used are bundled
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
