import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/skills',  // You can modify this path if needed
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate', // Ensures no caching
          },
        ],
      },
    ];
  },
};

export default nextConfig;
