import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/skills',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=60, s-maxage=120',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
