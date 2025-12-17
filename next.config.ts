import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-5b269ede3a39498185ad4ed137bf812c.r2.dev",
      },
    ],
  },
};

export default nextConfig;
