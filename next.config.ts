import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/skills',  
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store', 
          },
        ],
      },
    ];
  },
};

export default nextConfig;
