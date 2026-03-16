import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// 開発環境（npm run dev）のみ、ローカルの D1/R2 バインディングを起動する
// データは .wrangler/state/ に永続化される
if (process.env.NODE_ENV === "development") {
  setupDevPlatform({ persist: true });
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.kindai-boxing.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;
