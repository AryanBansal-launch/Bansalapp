import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["images.contentstack.io"], 
  // },
  async headers() {
    return [
      {
        source: '/skills',  
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=300', 
          },
        ],
      },
      {
        source: '/projects',  
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store', 
          },
        ],
      },
      {
        source: '/testpage',  
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store', 
          },
        ],
      },
      {
        source: '/load',  
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
