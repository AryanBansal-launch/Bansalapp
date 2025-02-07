import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/skills",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate", // Disable caching
          },
        ],
      },
    ];
  },
};

export default nextConfig;
