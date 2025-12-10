import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // API Routeを使うためexportモードは無効化が必要です
  // basePath: "/test", // User Pages (username.github.io) are served from root
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
