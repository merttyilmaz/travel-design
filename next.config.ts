import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "travelshopbooking.com",
      },
      {
        protocol: "https",
        hostname: "d2lpxiu1sq3srq.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
