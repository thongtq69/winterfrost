/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xuanhieuit.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.careerviet.vn',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
